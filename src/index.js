import throttle from "lodash.throttle";

const defaultOptions = {
  className: "current",
  topOffset: 0
};

class ScrollSpy {
  constructor(options) {
    this.setOptions(options);
    this.setSections();
    this.addListeners();
    this.spySections();
  }

  setOptions(options) {
    this.options = {
      ...defaultOptions,
      ...options
    };
  }

  setSections() {
    this.sections = Array.from(this.options.navItems).map(item =>
      document.querySelector(item.getAttribute("href"))
    );
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
      section.getBoundingClientRect().top + scrollTop + this.options.topOffset;
    const sectionBottom = sectionTop + section.offsetHeight;

    return sectionTop < scrollBottom && sectionBottom > scrollTop;
  }

  markSections(visibilityStatus) {
    let isAlreadyMarked = false;

    this.options.navItems.forEach(($item, index) => {
      if (visibilityStatus[index] && !isAlreadyMarked) {
        isAlreadyMarked = true;
        $item.classList.add(this.options.className);
      } else {
        $item.classList.remove(this.options.className);
      }
    });
  }
}

export default ScrollSpy;
