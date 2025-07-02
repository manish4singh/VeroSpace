//  For Select elements
const selectElement = document.getElementById("property-for");
const labelElement = document.getElementById("property-label");

if (selectElement && labelElement) {
  selectElement.addEventListener("focus", () => {
    labelElement.textContent = "Please choose Rent or Buy";
  });

  selectElement.addEventListener("change", () => {
    const selectedValue = selectElement.value;
    labelElement.textContent = `You selected: ${
      selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
    }`;
  });
}

//   Price Slider
const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const track = document.getElementById("track");
const minLabel = document.getElementById("min-label");
const maxLabel = document.getElementById("max-label");

function updateSlider() {
  let minVal = Number.parseInt(minRange.value);
  let maxVal = Number.parseInt(maxRange.value);

  if (maxVal - minVal < 1000) {
    if (event.target === minRange) {
      minRange.value = maxVal - 1000;
    } else {
      maxRange.value = minVal + 1000;
    }
  }

  minVal = Number.parseInt(minRange.value);
  maxVal = Number.parseInt(maxRange.value);

  const minPercent = (minVal / 20000) * 100;
  const maxPercent = (maxVal / 20000) * 100;

  track.style.left = `${minPercent}%`;
  track.style.width = `${maxPercent - minPercent}%`;

  minLabel.innerText = `$ ${minVal.toLocaleString()}`;
  maxLabel.innerText = `$ ${maxVal.toLocaleString()}`;

  const containerWidth =
    document.querySelector(".slider-container").offsetWidth;
  minLabel.style.left = `${(minVal / 20000) * containerWidth}px`;
  maxLabel.style.left = `${(maxVal / 20000) * containerWidth}px`;
}

if (minRange && maxRange) {
  minRange.addEventListener("input", updateSlider);
  maxRange.addEventListener("input", updateSlider);
  updateSlider();
}

//   For Counter
function animateCounter(element, target, duration = 1500) {
  const start = 0;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    element.textContent =
      value >= 1000 ? Math.round(value / 1000) + "K+" : value + "+";
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = Math.round(target / 1000) + "K+";
    }
  };
  window.requestAnimationFrame(step);
}

// For Active links
const navLinks = document.querySelectorAll(".nav-link");
const currentPath = window.location.pathname.replace(/\/$/, "").toLowerCase();

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href").replace(/\/$/, "").toLowerCase();
  if (
    currentPath.endsWith(linkPath) ||
    (linkPath === "index.html" &&
      (currentPath === "" || currentPath === "/index.html"))
  ) {
    link.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".menu");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const closeBtn = document.querySelector(".close-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu-content a");

  if (!hamburger || !mobileOverlay) {
    console.error("Hamburger or overlay not found!");
    return;
  }

  function toggleMenu() {
    hamburger.classList.toggle("open");
    mobileOverlay.classList.toggle("active");
  }

  hamburger.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
  menuLinks.forEach((link) => link.addEventListener("click", toggleMenu));
});

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded!");

  // Counter animation
  const trustedCustomers = document.getElementById("trustedCustomers");
  const housesSold = document.getElementById("housesSold");
  const propertyListed = document.getElementById("propertyListed");

  if (trustedCustomers) animateCounter(trustedCustomers, 15000, 1200);
  if (housesSold) animateCounter(housesSold, 20000, 1400);
  if (propertyListed) animateCounter(propertyListed, 75000, 1600);

  // Swiper initialization
  const Swiper = window.Swiper; // Declare Swiper variable here
  if (typeof Swiper !== "undefined") {
    // Testimonials Swiper
    const testimonialsSwiper = document.querySelector(".testimonials-swiper");
    if (testimonialsSwiper) {
      new Swiper(".testimonials-swiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });
    }

    // Properties Swiper
    const propertiesSwiper = document.querySelector(".properties-swiper");
    if (propertiesSwiper) {
      new Swiper(".properties-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 10 },
          700: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    }
  }
});

// Fallback - try to initialize after a short delay if DOM event doesn't fire
setTimeout(() => {
  if (document.readyState === "complete") {
    console.log("Fallback initialization...");
    initHamburgerMenu();
  }
}, 1000);
