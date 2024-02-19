"use strict";
///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});
// Sticky navigation
const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Submiting form
const form = document.querySelector(".cta-form");
const searchButton = form.querySelector(".search-flight--btn");
const modal = document.querySelector(".modal");
const modalData = document.querySelector(".modal-data");
const passangerFullName = document.querySelector(".passanger-full-name");
const passangerEmail = document.querySelector(".passanger-email");
const passangerDestination = document.querySelector(".passanger-destination");
const passangerDates = document.querySelector(".passanger-dates");
const passangerTicketPrice = document.querySelector(".passanger-ticket-price");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Form validation
searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const departure = document.getElementById("select-from").value;
  const arrival = document.getElementById("select-to").value;
  const classTypeInput = document.querySelector(
    'input[name="class-type"]:checked'
  ).value;

  // Check for date validation
  const departureDate = new Date(document.getElementById("departure").value);
  const returnDate = new Date(document.getElementById("return").value);
  const inputs = form.querySelectorAll("input[required], select[required]");

  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });

  if (!departureDate || !returnDate || departureDate >= returnDate) {
    alert("Please select valid departure and return dates.");
    return;
  }
  // Calculating ticket price
  function calculateTicketPrice() {
    // Pobieranie danych z formularza
    const tripType = document.querySelector(
      'input[name="trip-type"]:checked'
    ).value;
    const classType = document.querySelector(
      'input[name="class-type"]:checked'
    ).value;
    const adults = parseInt(document.getElementById("adults").value);
    const children = parseInt(document.getElementById("children").value);
    const infants = parseInt(document.getElementById("infants").value);

    // Współczynniki cenowe dla różnych klas podróży
    const classPrices = {
      economy: 300,
      business: 600,
      first: 1000,
    };

    // Obliczanie łącznej liczby pasażerów
    const totalPassengers = adults + children + infants;

    // Obliczanie ceny biletów w zależności od klasy podróży
    const totalPrice = classPrices[classType] * totalPassengers;

    return totalPrice;
  }

  if (isValid) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    // Displaying data from the form
    const totalPrice = calculateTicketPrice();
    modal.querySelector(".passanger-ticket-price").innerHTML = `${300}`;
    modal.querySelector(".passanger-full-name").textContent = fullName;
    modal.querySelector(".passanger-email").textContent = email;
    modal.querySelector(
      ".passanger-destination"
    ).textContent = `From: ${departure} To: ${arrival}`;

    const closeModal = function () {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    btnCloseModal.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
  } else {
    alert("Please, fill out the form correctly.");
  }
});
