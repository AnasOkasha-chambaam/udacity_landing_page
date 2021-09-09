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
let landingPageSections = document.querySelectorAll("section");

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

function ulEventListener(e) {
  let startTime = performance.now();
  console.log(e.target.classList.contains("menu__link"));
  if (e.target.classList.contains("menu__link")) {
    e.preventDefault();
    let sectToGoToId = e.target.getAttribute("href");
    let ElmoffsetTop = document.querySelector(sectToGoToId).offsetTop;
    scroll({ top: ElmoffsetTop, behavior: "smooth" });
  }
  let endTime = performance.now();
  console.log((endTime - startTime) / 1000, " seconds");
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function startBuildingNavMenu(e) {
  let elementFragment = document.createDocumentFragment();
  landingPageSections.forEach((sect) => {
    let itsLi = document.createElement("li"),
      itsAnchor = document.createElement("a");
    itsAnchor.href = `#${sect.id}`;
    itsAnchor.innerText = sect.dataset.nav;
    itsAnchor.classList.add("menu__link");
    itsLi.appendChild(itsAnchor);
    elementFragment.appendChild(itsLi);
  });
  navbar__list.appendChild(elementFragment);
}

// build the nav

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

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
window.addEventListener('scroll', (e) => {
  let dimensionsArr = {};
  landingPageSections.forEach((sect,index)=>{
    let sectDimension = getElmDimensions(sect);
    dimensionsArr[+(Math.sqrt(Math.pow(sectDimension[0],2)+Math.pow(sectDimension[1],2)).toFixed(0))] = index;
  })
  console.log(dimensionsArr)
})