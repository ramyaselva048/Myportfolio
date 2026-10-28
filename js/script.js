
/* =========================================================
   RAMYA SELVA PORTFOLIO
   MAIN WEBSITE JAVASCRIPT
   Firebase integration compatible
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =====================================================
     1. CURRENT YEAR
  ===================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =====================================================
     2. MOBILE NAVIGATION
  ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMobileMenu() {
    if (navMenu) {
      navMenu.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (menuToggle && navMenu) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("active");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", function (event) {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });
  }


  /* =====================================================
     3. FIREBASE LOGOUT
     Logout is handled in js/auth.js.
     Do not add a duplicate logout handler here.
  ===================================================== */


  /* =====================================================
     4. CONTACT FORM
     Firebase contact submission is handled by the
     module script in index.html.
     Do not add a duplicate submit handler here.
  ===================================================== */


  /* =====================================================
     5. SCROLL REVEAL ANIMATION
  ===================================================== */

  const animatedElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".about-card, " +
    ".skill-card, " +
    ".timeline-item, " +
    ".experience-card, " +
    ".project-card, " +
    ".certificate-card, " +
    ".contact-info, " +
    ".contact-form"
  );

  animatedElements.forEach(function (element) {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    animatedElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    animatedElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }


  /* =====================================================
     6. ACTIVE NAVIGATION LINK
  ===================================================== */

  const sections = document.querySelectorAll("section[id]");
  const navigationLinks = document.querySelectorAll("#navMenu a");
  const navbar = document.querySelector(".navbar");

  function updateActiveNavigation() {
    let currentSection = "";

    const offset = navbar ? navbar.offsetHeight + 40 : 100;

    sections.forEach(function (section) {
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY;

      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        window.scrollY + offset >= sectionTop &&
        window.scrollY + offset < sectionBottom
      ) {
        currentSection = section.id;
      }
    });

    navigationLinks.forEach(function (link) {
      const isActive =
        link.getAttribute("href") === "#" + currentSection;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }


  /* =====================================================
     7. NAVBAR SCROLL EFFECT
  ===================================================== */

  function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }


  /* =====================================================
     SHARED SCROLL HANDLER
  ===================================================== */

  let scrollScheduled = false;

  function handleScroll() {
    if (scrollScheduled) return;

    scrollScheduled = true;

    window.requestAnimationFrame(function () {
      updateActiveNavigation();
      updateNavbar();
      updateHeroParallax();

      scrollScheduled = false;
    });
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  updateActiveNavigation();
  updateNavbar();


  /* =====================================================
     8. PROFILE IMAGE LOAD EFFECT
  ===================================================== */

  const profileImage = document.querySelector(".profile-image");

  if (profileImage) {
    function markImageLoaded() {
      if (profileImage.naturalWidth > 0) {
        profileImage.classList.add("loaded");
      }
    }

    if (profileImage.complete) {
      markImageLoaded();
    } else {
      profileImage.addEventListener("load", markImageLoaded, {
        once: true
      });
    }
  }


  /* =====================================================
     9. SMOOTH SCROLL
  ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      let target;

      try {
        target = document.querySelector(targetId);
      } catch (error) {
        return;
      }

      if (!target) return;

      event.preventDefault();
      closeMobileMenu();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  });


  /* =====================================================
     10. BUTTON RIPPLE EFFECT
  ===================================================== */

  document.querySelectorAll(".btn, .small-btn").forEach(
    function (button) {
      button.addEventListener("click", function (event) {
        if (
          window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
        ) {
          return;
        }

        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        ripple.style.left =
          (event.clientX - rect.left) + "px";

        ripple.style.top =
          (event.clientY - rect.top) + "px";

        button.appendChild(ripple);

        window.setTimeout(function () {
          ripple.remove();
        }, 600);
      });
    }
  );


  /* =====================================================
     11. PROJECT CARD TILT EFFECT
  ===================================================== */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (!reduceMotion.matches) {
    document.querySelectorAll(".project-card").forEach(
      function (card) {
        card.addEventListener("mousemove", function (event) {
          if (window.innerWidth < 900) return;

          const rect = card.getBoundingClientRect();

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          if (!centerX || !centerY) return;

          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          const rotateX = ((y - centerY) / centerY) * -3;
          const rotateY = ((x - centerX) / centerX) * 3;

          card.style.transform =
            "perspective(800px) " +
            "rotateX(" + rotateX + "deg) " +
            "rotateY(" + rotateY + "deg) " +
            "translateY(-8px)";
        });

        card.addEventListener("mouseleave", function () {
          card.style.transform = "";
        });
      }
    );
  }


  /* =====================================================
     12. HERO PARALLAX EFFECT
  ===================================================== */

  const heroOrbOne = document.querySelector(".hero-orb-one");
  const heroOrbTwo = document.querySelector(".hero-orb-two");

  function updateHeroParallax() {
    if (
      window.innerWidth < 700 ||
      reduceMotion.matches
    ) {
      if (heroOrbOne) heroOrbOne.style.transform = "";
      if (heroOrbTwo) heroOrbTwo.style.transform = "";
      return;
    }

    const scrollValue = window.scrollY;

    if (heroOrbOne) {
      heroOrbOne.style.transform =
        "translate3d(0, " + scrollValue * 0.15 + "px, 0)";
    }

    if (heroOrbTwo) {
      heroOrbTwo.style.transform =
        "translate3d(0, " + scrollValue * -0.10 + "px, 0)";
    }
  }

  window.addEventListener(
    "resize",
    updateHeroParallax,
    { passive: true }
  );

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", updateHeroParallax);
  }

  updateHeroParallax();


  /* =====================================================
     13. ESC KEY - CLOSE MOBILE MENU
  ===================================================== */

  // The Escape handler is included in the mobile navigation
  // section above to avoid duplicate keyboard listeners.

});


/* =========================================================
   FIREBASE INTEGRATION NOTES

   - Login, signup, password reset and logout:
     js/auth.js

   - Contact form Firestore submission and Gmail compose:
     index.html Firebase module script

   - This file:
     Website UI, animations and navigation only

   - Do not store passwords in localStorage.
========================================================= */
