/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let landingPageSections = document.querySelectorAll("section"),
  hiddingNavBarTimeout = 1;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getElmDimensions(element) {
  let yAxis = window.innerHeight / 2,
    xAxis = window.innerWidth / 2;
  return [
    element.getBoundingClientRect().left +
      element.getBoundingClientRect().width / 2 -
      xAxis,
    yAxis -
      element.getBoundingClientRect().bottom +
      element.getBoundingClientRect().height / 2,
  ];
}

function getSectDistanceFromCenter(dimensionsArr) {
  let sectDistance = Math.sqrt(
    Math.pow(dimensionsArr[0], 2) + Math.pow(dimensionsArr[1], 2)
  );
  return sectDistance;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function startBuildingNavMenu() {
  let elementFragment = document.createDocumentFragment();
  landingPageSections.forEach((sect, index) => {
    let itsLi = document.createElement("li"),
      itsAnchor = document.createElement("a");
    itsAnchor.href = `#${sect.id}`;
    itsAnchor.innerText = sect.dataset.nav;
    itsAnchor.className = `menu__link${
      index === 0 ? " currently__active" : ""
    }`;
    itsLi.appendChild(itsAnchor);
    elementFragment.appendChild(itsLi);
  });
  navbar__list.appendChild(elementFragment);
}

// Add class 'active' to section when near top of viewport

function setActiveSect() {
  let dimensionsArr = {};
  landingPageSections.forEach((sect, index) => {
    let sectDimension = getElmDimensions(sect);
    dimensionsArr[getSectDistanceFromCenter(sectDimension).toFixed(0)] = index;
  });
  let currentlyActiveSectionIndex =
      dimensionsArr[Math.min(...Object.keys(dimensionsArr))],
    currentlyActiveSection = landingPageSections[currentlyActiveSectionIndex];
  if (currentlyActiveSection.classList.contains("currently__shown")) {
    return;
  }
  document
    .querySelector(".currently__shown")
    .classList.remove("currently__shown");
  document
    .querySelector(".currently__active")
    .classList.remove("currently__active");
  document
    .querySelectorAll(".menu__link")
    [currentlyActiveSectionIndex].classList.add("currently__active");
  currentlyActiveSection.classList.add("currently__shown");
}

// Scroll to anchor ID using scrollTO event

function ulEventListener(e) {
  if (e.target.classList.contains("menu__link")) {
    e.preventDefault();
    let sectToGoToId = e.target.getAttribute("href");
    let ElmoffsetTop = document.querySelector(sectToGoToId).offsetTop;
    scrollTo({ top: ElmoffsetTop, behavior: "smooth" });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", startBuildingNavMenu);
// Scroll to section on link click
navbar__list.addEventListener("click", ulEventListener);
// Set sections as active
window.addEventListener("scroll", setActiveSect);
