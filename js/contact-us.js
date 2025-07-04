function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all FAQ items
  const allFaqItems = document.querySelectorAll(".faq-item");
  allFaqItems.forEach((item) => {
    item.classList.remove("active");
  });

  // If the clicked item wasn't active, open it
  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// Ensure proper initialization
document.addEventListener("DOMContentLoaded", function () {
  // The second FAQ item should be active by default (matching the screenshot)
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 1) {
    faqItems[1].classList.add("active");
  }
});

// Add keyboard accessibility
document.addEventListener("keydown", function (e) {
  if (e.target.classList.contains("faq-question")) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFAQ(e.target);
    }
  }
});
