// ===============================
// USER AUTH SYSTEM
// ===============================

const currentUser = JSON.parse(localStorage.getItem("user"));

const loginLink = document.querySelector(".login-link");

const signupLink = document.querySelector(".signup-link");

const userInfo = document.querySelector(".user-info");

const username = document.querySelector(".username");

const logoutBtn = document.querySelector(".logout-btn");


if (currentUser) {

  if (loginLink) {
    loginLink.style.display = "none";
  }

  if (signupLink) {
    signupLink.style.display = "none";
  }

  if (userInfo) {
    userInfo.style.display = "flex";
  }

  if (username) {
    username.innerText = `Hi, ${currentUser.name}`;
  }

}


if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("user");

    alert("Logged Out");

    window.location.reload();

  });

}


// ===============================
// DARK MODE
// ===============================

const toggle = document.getElementById("themeToggle");

if (toggle) {

  toggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

      toggle.textContent = "☀️";

    } else {

      toggle.textContent = "🌙";

    }

  });

}


// ===============================
// SIDEBAR MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");

const sideMenu = document.getElementById("sideMenu");

const overlay = document.getElementById("menuOverlay");


if (menuBtn) {

  menuBtn.onclick = () => {

    sideMenu.classList.toggle("open");

    overlay.classList.toggle("active");

  };

}


if (overlay) {

  overlay.onclick = () => {

    sideMenu.classList.remove("open");

    overlay.classList.remove("active");

  };

}


// ===============================
// FILTER SERVICES
// ===============================

function filterServices(category) {

  let cards = document.querySelectorAll(".service-card");

  cards.forEach(card => {

    if (
      category === "all" ||
      card.dataset.category === category
    ) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

}


// ===============================
// SHOW ALL SERVICES
// ===============================

function showAll() {

  filterServices("all");

}


// ===============================
// OPEN BOOKING PAGE
// ===============================

function openBooking(service) {

  localStorage.setItem("selectedService", service);

  window.location = "booking.html";

}


// ===============================
// LOAD SERVICE NAME
// ===============================

if (window.location.pathname.includes("booking.html")) {

  let s = localStorage.getItem("selectedService");

  const serviceName = document.getElementById("serviceName");

  if (s && serviceName) {

    serviceName.innerText = s;

  }

}


// ===============================
// CONFIRM BOOKING
// ===============================

function confirmBooking() {

  alert("Booking Confirmed ✅");

}


// ===============================
// SEARCH SERVICES
// ===============================

function searchService() {

  let input = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  let cards = document.querySelectorAll(".service-card");

  cards.forEach(card => {

    let text = card.innerText.toLowerCase();

    if (text.includes(input)) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

}


// ===============================
// LOGIN MODAL
// ===============================

function openLogin() {

  const modal = document.getElementById("loginModal");

  if (modal) {

    modal.style.display = "flex";

  }

}


function closeLogin() {

  const modal = document.getElementById("loginModal");

  if (modal) {

    modal.style.display = "none";

  }

}


// ===============================
// CLOSE MODAL ON OUTSIDE CLICK
// ===============================

window.onclick = function (event) {

  const modal = document.getElementById("loginModal");

  if (event.target == modal) {

    modal.style.display = "none";

  }

};