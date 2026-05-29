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

  document.getElementById("loginModal").style.display = "flex";

}

function closeLogin() {

  document.getElementById("loginModal").style.display = "none";

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

// ===============================
// LOGIN API
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),

        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Login Successful ✅");

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        window.location.reload();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  });

}

// ===============================
// LOGOUT
// ===============================

function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  alert("Logged Out");

  window.location.reload();

}

// ===============================
// CHECK LOGIN STATUS
// ===============================

const user = localStorage.getItem("user");

if (user) {

  console.log("User Logged In");

}