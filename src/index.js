import throttle from "lodash.throttle";

const defaultSettings = {
  className: "current",
  topOffset: 0
};

class ScrollSpy {
  /**
   *
   * @param {Object} settings
   * @param {NodeList} settings.navItems - nav items that are listening to the scroll
   * @param {string} settings.className - className that will be applied to the "current" nav item
   * @param {number} settings.topOffset - offset in pixels to compensate elements such as header in the calculation
   *
   */
  constructor(settings) {
    if (settings.navItems === "undefined") {
      throw new Error(
        "You must provide an element as an HTMLElement or NodeList"
      );
    }

    this.setSettings(settings);
    this.setSections();
    this.addListeners();
    this.spySections();
  }

  setSettings(settings) {
    this.settings = {
      ...defaultSettings,
      ...settings
    };
  }

  setSections() {
    this.sections = Array.from(this.settings.navItems).map(item => {
      const href = item.getAttribute("href");

      if (href === null) {
        throw new Error(
          "Make sure that all the nav items have a href attribute"
        );
      }

      const section = document.querySelector(href);

      if (section === null) {
        throw new Error(
          "Make sure that all the nav items have an asociated section with the href attribute"
        );
      }

      return section;
    });
  }

  addListeners() {
    window.addEventListener(
      "scroll",
      throttle(() => this.spySections(), 100)
    );
  }

  spySections() {
    const visibilityStatus = this.sections.map(section =>
      this.determineVisibility(section)
    );

    this.markSections(visibilityStatus);
  }

  determineVisibility(section) {
    const scrollTop = window.pageYOffset;
    const scrollBottom = scrollTop + window.innerHeight;
    const sectionTop =
      section.getBoundingClientRect().top + scrollTop + this.settings.topOffset;
    const sectionBottom = sectionTop + section.offsetHeight;

    return sectionTop < scrollBottom && sectionBottom > scrollTop;
  }

  markSections(visibilityStatus) {
    let isAlreadyMarked = false;

    this.settings.navItems.forEach((item, index) => {
      if (visibilityStatus[index] && !isAlreadyMarked) {
        isAlreadyMarked = true;
        item.classList.add(this.settings.className);
      } else {
        item.classList.remove(this.settings.className);
      }
    });
  }
}

export default ScrollSpy;
