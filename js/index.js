//  For Select elements

const selectElement = document.getElementById("property-for");
const labelElement = document.getElementById("property-label");

selectElement.addEventListener("focus", () => {
  labelElement.textContent = "Please choose Rent or Buy";
});

// Optional: update label when a value is selected
selectElement.addEventListener("change", () => {
  const selectedValue = selectElement.value;
  labelElement.textContent = `You selected: ${
    selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
  }`;
});

//   Price Slider

const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const track = document.getElementById("track");
const minLabel = document.getElementById("min-label");
const maxLabel = document.getElementById("max-label");

function updateSlider() {
  let minVal = parseInt(minRange.value);
  let maxVal = parseInt(maxRange.value);

  // Prevent crossing
  if (maxVal - minVal < 1000) {
    if (event.target === minRange) {
      minRange.value = maxVal - 1000;
    } else {
      maxRange.value = minVal + 1000;
    }
  }

  minVal = parseInt(minRange.value);
  maxVal = parseInt(maxRange.value);

  const rangeWidth = minRange.offsetWidth;
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

minRange.addEventListener("input", updateSlider);
maxRange.addEventListener("input", updateSlider);

// Initialize positions
updateSlider();

//   For Counter

function animateCounter(element, target, duration = 1500) {
  let start = 0;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    // Format as "15K+"
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

document.addEventListener("DOMContentLoaded", () => {
  animateCounter(document.getElementById("trustedCustomers"), 15000, 1200);
  animateCounter(document.getElementById("housesSold"), 20000, 1400);
  animateCounter(document.getElementById("propertyListed"), 75000, 1600);
});

//   For JS Hamburger

const navLeft = document.querySelector(".nav-left");
const navRight = document.querySelector(".nav-right");
const ham = document.querySelector(".menu");

ham.addEventListener("click", () => {
  navLeft.classList.toggle("active");
  navRight.classList.toggle("active");
});

// For Active links
// Get all nav links
const navLinks = document.querySelectorAll(".nav-link");

// Get the current path (without trailing slash)
const currentPath = window.location.pathname.replace(/\/$/, "").toLowerCase();

navLinks.forEach((link) => {
  // Get link's href as a path (remove domain if full URL)
  const linkPath = link.getAttribute("href").replace(/\/$/, "").toLowerCase();

  // Match exact route OR default to home page
  if (
    currentPath.endsWith(linkPath) ||
    (linkPath === "index.html" &&
      (currentPath === "" || currentPath === "/index.html"))
  ) {
    link.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".testimonials-swiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (className) {
        return '<span class="' + className + '">' + "</span>";
      },
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
});

document.addEventListener("DOMContentLoaded", function () {
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
});

