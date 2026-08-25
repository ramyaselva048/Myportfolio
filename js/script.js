/* =========================================================
   RAMYA SELVA PORTFOLIO
   MAIN WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }



    /* =====================================================
       2. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle("active");

                const isOpen =
                    navMenu.classList.contains("active");

                menuToggle.textContent =
                    isOpen ? "✕" : "☰";

            }
        );


        /* Close menu after clicking a link */

        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("active");

                    menuToggle.textContent = "☰";

                }
            );

        });

    }



    /* =====================================================
       3. LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                /* Remove login session */

                localStorage.removeItem(
                    "loggedIn"
                );

                localStorage.removeItem(
                    "loggedInUser"
                );


                /* Go back to login */

                window.location.replace(
                    "login.html"
                );

            }
        );

    }



    /* =====================================================
       4. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                    .getElementById("contactName")
                    .value
                    .trim();


                const email =
                    document
                    .getElementById("contactEmail")
                    .value
                    .trim();


                const message =
                    document
                    .getElementById("contactMessage")
                    .value
                    .trim();


                const status =
                    document.getElementById(
                        "contactStatus"
                    );


                /* Empty field check */

                if (
                    name === "" ||
                    email === "" ||
                    message === ""
                ) {

                    if (status) {

                        status.textContent =
                            "Please fill in all the fields.";

                        status.className =
                            "contact-status error";

                    }

                    return;

                }


                /* Email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    if (status) {

                        status.textContent =
                            "Please enter a valid email address.";

                        status.className =
                            "contact-status error";

                    }

                    return;

                }


                /* Success */

                if (status) {

                    status.textContent =
                        "Thank you! Your message has been received.";

                    status.className =
                        "contact-status success";

                }


                /* Clear form */

                contactForm.reset();

            }
        );

    }



    /* =====================================================
       5. SCROLL REVEAL ANIMATION
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
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


    /* Add animation class */

    animatedElements.forEach(
        function (element) {

            element.classList.add(
                "reveal"
            );

        }
    );


    /* Intersection Observer */

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );



    /* =====================================================
       6. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            "#navMenu a"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 150;


                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            }
        );


        navigationLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute("href");


                if (
                    href ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();



    /* =====================================================
       7. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    function updateNavbar() {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();



    /* =====================================================
       8. PROFILE IMAGE LOAD EFFECT
    ===================================================== */

    const profileImage =
        document.querySelector(
            ".profile-image"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "load",
            function () {

                profileImage.classList.add(
                    "loaded"
                );

            }
        );

    }



    /* =====================================================
       9. SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        const navbarHeight =
                            navbar
                                ? navbar.offsetHeight
                                : 0;


                        const targetPosition =
                            target.offsetTop -
                            navbarHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }

                }
            );

        }
    );



    /* =====================================================
       10. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .small-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.classList.add(
                        "ripple"
                    );


                    const rect =
                        button.getBoundingClientRect();


                    ripple.style.left =
                        (
                            event.clientX -
                            rect.left
                        ) + "px";


                    ripple.style.top =
                        (
                            event.clientY -
                            rect.top
                        ) + "px";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        function () {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );



    /* =====================================================
       11. PROJECT CARD TILT EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    if (
                        window.innerWidth < 900
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                            centerY) * -3;


                    const rotateY =
                        ((x - centerX) /
                            centerX) * 3;


                    card.style.transform =
                        `
                        perspective(800px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "";

                }
            );

        }
    );



    /* =====================================================
       12. HERO PARALLAX EFFECT
    ===================================================== */

    const heroOrbOne =
        document.querySelector(
            ".hero-orb-one"
        );


    const heroOrbTwo =
        document.querySelector(
            ".hero-orb-two"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.innerWidth < 700
            ) {
                return;
            }


            const scrollValue =
                window.scrollY;


            if (heroOrbOne) {

                heroOrbOne.style.transform =
                    `translateY(${scrollValue * 0.15}px)`;

            }


            if (heroOrbTwo) {

                heroOrbTwo.style.transform =
                    `translateY(${scrollValue * -0.10}px)`;

            }

        }
    );



    /* =====================================================
       13. ESC KEY - CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                if (navMenu) {

                    navMenu.classList.remove(
                        "active"
                    );

                }


                if (menuToggle) {

                    menuToggle.textContent =
                        "☰";

                }

            }

        }
    );

});



/* =========================================================
   EXTRA LOGOUT FUNCTION

   இது HTML-ல் onclick="logout()" இருந்தாலும்
   வேலை செய்யும்.
========================================================= */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    localStorage.removeItem(
        "loggedIn"
    );


    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.replace(
        "login.html"
    );

}
