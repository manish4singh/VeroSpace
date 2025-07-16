const loginBtn = document.getElementById("loginBtn");
const mobileLoginBtn = document.getElementById("mobileLoginBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeLoginModal = document.getElementById("closeLoginModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

// Open login modal
function openLoginModal() {
  loginModal.classList.add("active");
  document.body.classList.add("no-scroll");
  // Close mobile nav if open
  if (typeof mobileNav !== 'undefined') {
    mobileNav.classList.remove("active");
  }
  if (typeof overlay !== 'undefined') {
    overlay.classList.remove("active");
  }
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openLoginModal();
});

mobileLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openLoginModal();
});

// Close modals
closeLoginModal.addEventListener("click", () => {
  loginModal.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

closeRegisterModal.addEventListener("click", () => {
  registerModal.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

// Close modal when clicking outside
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

registerModal.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

// Switch between modals
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
  // Keep no-scroll class since we're still in a modal
});

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
  // Keep no-scroll class since we're still in a modal
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.remove("active");
  loginModal.classList.add("active");
  // Keep no-scroll class since we're still in a modal
});

// Form submissions
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login form submitted!");
  // Add your login logic here
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Registration form submitted!");
  // Add your registration logic here
});

// Close modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});
