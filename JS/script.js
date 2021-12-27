console.log("hello world");

// set current year
const yr = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yr.textContent = currentYear;

// make mobile navigation work
const btnNav = document.querySelector(".menu-mobile-nav");
const header = document.querySelector(".header");
btnNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

// enable smooth scrolling in all browsers
const allLinks = document.querySelectorAll("a:link");
// console.log(allLinks);
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // console.log(e);
    e.preventDefault();
    const href = link.getAttribute("href");
    //   scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      //   console.log(sectionEl);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    // close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      header.classList.toggle("nav-open");
    }
  });
});

// stiky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    // console.log(entry);
    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (entry.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //   in the viewport
    root: null,
    // when ever hero section is 0 % in the viewport
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
