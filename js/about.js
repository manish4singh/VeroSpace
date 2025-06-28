document.addEventListener("DOMContentLoaded", function () {
  // Debug output to make sure JS is running
  console.log("✅ JS is running");

  const navLinks = document.querySelectorAll(".nav-link");
  console.log("Found", navLinks.length, "nav-link(s)");

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  console.log("Current page:", currentPage);

  navLinks.forEach((link) => {
    const href = link.getAttribute("href").toLowerCase();
    console.log("Comparing", href, "to", currentPage);

    if (
      currentPage === href ||
      (href === "index.html" &&
        (currentPage === "" || currentPage === "index.html"))
    ) {
      link.classList.add("active");
      console.log("✅ Added .active to:", href);
    }
  });
});

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
