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

function showLabels() {
  minLabel.classList.add("show-label");
  maxLabel.classList.add("show-label");
}
function hideLabels() {
  minLabel.classList.remove("show-label");
  maxLabel.classList.remove("show-label");
}

[minRange, maxRange].forEach((input) => {
  input.addEventListener("mousedown", showLabels);
  input.addEventListener("touchstart", showLabels);
  input.addEventListener("mouseup", hideLabels);
  input.addEventListener("touchend", hideLabels);
  input.addEventListener("mouseleave", hideLabels);
});

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
let propertiesSwiper;

document.addEventListener("DOMContentLoaded", () => {
  // Counter animation
  const trustedCustomers = document.getElementById("trustedCustomers");
  const housesSold = document.getElementById("housesSold");
  const propertyListed = document.getElementById("propertyListed");

  if (trustedCustomers) animateCounter(trustedCustomers, 15000, 1200);
  if (housesSold) animateCounter(housesSold, 20000, 1400);
  if (propertyListed) animateCounter(propertyListed, 75000, 1600);

  // Swiper initialization
  const Swiper = window.Swiper;
  if (typeof Swiper !== "undefined") {
    // Testimonials Swiper
    // Testimonials Swiper Configuration
    new Swiper(".testimonials-swiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // Add these properties for better responsiveness
      grabCursor: true,
      watchOverflow: true,

      breakpoints: {
        // Mobile devices
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: true,
        },
        // Small tablets
        576: {
          slidesPerView: 1,
          spaceBetween: 30,
          centeredSlides: true,
        },
        // Medium tablets
        768: {
          slidesPerView: 1,
          spaceBetween: 40,
          centeredSlides: true,
        },
        // Desktop
        992: {
          slidesPerView: 2,
          spaceBetween: 50,
          centeredSlides: false,
        },
        // Large desktop
        1200: {
          slidesPerView: 2,
          spaceBetween: 60,
          centeredSlides: false,
        },
      },
    });

    // Properties Swiper
    propertiesSwiper = new Swiper(".properties-swiper", {
      slidesPerView: 1, // 👈 Default for mobile (up to 576px)
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      preloadImages: true,
      updateOnImagesReady: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  // Fix: Update Swiper on resize
  window.addEventListener("resize", () => {
    if (propertiesSwiper) {
      propertiesSwiper.update();
    }
  });
});

setTimeout(() => {
  if (document.readyState === "complete") {
    console.log("Fallback initialization...");
    initHamburgerMenu();
  }
}, 1000);
