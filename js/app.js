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
  hiddingNavBarTimeout,
  pageHeader = document.querySelector(".page__header");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
/**
 * @description calculate the distance between the center of the element and the center of the window in x and y axes.
 * @param {object} element - the element node
 * @returns {object} - [element X axis, element Y axis]
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
/**
 * @description given an array of element x and y values, it calculates the distance
 * @param {object} dimensionsArr - the element vector (array of element X and Y values)
 * @returns {object} - the distance
 */
function getSectDistanceFromCenter(dimensionsArr) {
  let sectDistance = Math.sqrt(
    Math.pow(dimensionsArr[0], 2) + Math.pow(dimensionsArr[1], 2)
  );
  return sectDistance;
}
/**
 * @description disable the pre-set time out and set another one to make the nav disappear when the user stops scrolling for two seconds
 */
function hideNavBar() {
  if (!hiddingNavBarTimeout) {
    hiddingNavBarTimeout = setTimeout(() => {
      pageHeader.style.transform = "translateY(-100%)";
    }, 2000);
  }
  clearTimeout(hiddingNavBarTimeout);
  pageHeader.style.transform = "translateY(0)";
  hiddingNavBarTimeout = setTimeout(() => {
    pageHeader.style.transform = "translateY(-100%)";
  }, 2000);
}
/**
 * @description show and hide the "go up" button according to the progress of the scroll bar
 */
function toggleGoUpBtnStatus() {
  if (window.scrollY > 249) {
    return go__up.classList.add("shown");
  }
  go__up.classList.remove("shown");
}
/**
 * @description scrolls to the top of the page
 */
function scrollToTop() {
  scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
/**
 * @description build the nav bar according to the number of sections on the document
 */
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
/**
 * @description decide which section is shown and give it a class of "currently-shown" and add a class of "currently-active" to the anchor that leades to the section
 */
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
/**
 * @description scroll to the section by clicking an anchor
 * @param {object} e - the event
 */
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
// Hide Nav Bar
window.addEventListener("scroll", hideNavBar);
// show and hide go up button
window.addEventListener("scroll", toggleGoUpBtnStatus);
// scroll to the top
go__up.addEventListener("click", scrollToTop);
