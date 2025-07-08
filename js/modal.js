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
  // Close mobile nav if open
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
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
});

closeRegisterModal.addEventListener("click", () => {
  registerModal.classList.remove("active");
});

// Close modal when clicking outside
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("active");
  }
});

registerModal.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.classList.remove("active");
  }
});

// Switch between modals
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
});

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.remove("active");
  loginModal.classList.add("active");
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
  }
});
