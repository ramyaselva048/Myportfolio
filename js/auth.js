/* =========================================================
   RAMYA SELVA PORTFOLIO
   AUTHENTICATION JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       LOGIN PAGE
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {


        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const emailInput =
                    document.getElementById(
                        "loginEmail"
                    );


                const passwordInput =
                    document.getElementById(
                        "loginPassword"
                    );


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                const loginButton =
                    document.getElementById(
                        "loginButton"
                    );


                const rememberMe =
                    document.getElementById(
                        "rememberMe"
                    );


                const loginValue =
                    emailInput.value.trim();


                const password =
                    passwordInput.value;


                /* -----------------------------------------
                   CHECK EMPTY FIELDS
                ----------------------------------------- */

                if (
                    loginValue === "" ||
                    password === ""
                ) {

                    showMessage(
                        message,
                        "Please enter your email and password.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   GET REGISTERED USER
                ----------------------------------------- */

                const savedUser =
                    localStorage.getItem(
                        "portfolioUser"
                    );


                if (!savedUser) {

                    showMessage(
                        message,
                        "No account found. Please create an account first.",
                        "error"
                    );

                    return;

                }


                let user;


                try {

                    user =
                        JSON.parse(savedUser);

                } catch (error) {

                    showMessage(
                        message,
                        "Account data is corrupted. Please sign up again.",
                        "error"
                    );

                    localStorage.removeItem(
                        "portfolioUser"
                    );

                    return;

                }


                /* -----------------------------------------
                   CHECK USERNAME / EMAIL
                ----------------------------------------- */

                const enteredValue =
                    loginValue.toLowerCase();


                const registeredEmail =
                    String(user.email)
                    .toLowerCase();


                const registeredName =
                    String(user.name)
                    .toLowerCase();


                const userMatches =
                    enteredValue === registeredEmail ||
                    enteredValue === registeredName;


                /* -----------------------------------------
                   CHECK PASSWORD
                ----------------------------------------- */

                const passwordMatches =
                    password === user.password;


                /* -----------------------------------------
                   INVALID LOGIN
                ----------------------------------------- */

                if (
                    !userMatches ||
                    !passwordMatches
                ) {

                    showMessage(
                        message,
                        "Incorrect email/username or password.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   SUCCESSFUL LOGIN
                ----------------------------------------- */

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                /* Save logged-in user's name */

                localStorage.setItem(
                    "loggedInUser",
                    user.name
                );


                /* Remember me */

                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "rememberMe",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "rememberMe"
                    );

                }


                /* Disable button */

                if (loginButton) {

                    loginButton.disabled = true;

                    loginButton.innerHTML =
                        `
                        <span>
                            Opening Portfolio...
                        </span>

                        <span>
                            ✓
                        </span>
                        `;

                }


                showMessage(
                    message,
                    "Login successful! Welcome back.",
                    "success"
                );


                /* -----------------------------------------
                   GO TO PORTFOLIO
                ----------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    900
                );

            }
        );


        /* ===============================================
           PASSWORD SHOW / HIDE
        =============================================== */

        const passwordToggle =
            document.getElementById(
                "passwordToggle"
            );


        const passwordInput =
            document.getElementById(
                "loginPassword"
            );


        if (
            passwordToggle &&
            passwordInput
        ) {

            passwordToggle.addEventListener(
                "click",
                function () {

                    if (
                        passwordInput.type ===
                        "password"
                    ) {

                        passwordInput.type =
                            "text";

                        passwordToggle.textContent =
                            "🙈";

                    } else {

                        passwordInput.type =
                            "password";

                        passwordToggle.textContent =
                            "👁";

                    }

                }
            );

        }


        /* ===============================================
           FORGOT PASSWORD
        =============================================== */

        const forgotPassword =
            document.getElementById(
                "forgotPassword"
            );


        if (forgotPassword) {

            forgotPassword.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const savedUser =
                        localStorage.getItem(
                            "portfolioUser"
                        );


                    if (!savedUser) {

                        alert(
                            "No account found. Please create an account first."
                        );

                        return;

                    }


                    alert(
                        "For this demo portfolio, please create a new account if you forgot your password."
                    );

                }
            );

        }

    }



    /* =====================================================
       SIGNUP PAGE
    ===================================================== */

    const signupForm =
        document.getElementById(
            "signupForm"
        );


    if (signupForm) {


        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "signupName"
                    );


                const emailInput =
                    document.getElementById(
                        "signupEmail"
                    );


                const passwordInput =
                    document.getElementById(
                        "signupPassword"
                    );


                const confirmInput =
                    document.getElementById(
                        "confirmPassword"
                    );


                const termsCheck =
                    document.getElementById(
                        "termsCheck"
                    );


                const message =
                    document.getElementById(
                        "signupMessage"
                    );


                const signupButton =
                    document.getElementById(
                        "signupButton"
                    );


                const name =
                    nameInput.value.trim();


                const email =
                    emailInput.value.trim();


                const password =
                    passwordInput.value;


                const confirmPassword =
                    confirmInput.value;


                /* -----------------------------------------
                   NAME VALIDATION
                ----------------------------------------- */

                if (name.length < 2) {

                    showMessage(
                        message,
                        "Please enter your full name.",
                        "error"
                    );

                    nameInput.focus();

                    return;

                }


                /* -----------------------------------------
                   EMAIL VALIDATION
                ----------------------------------------- */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    showMessage(
                        message,
                        "Please enter a valid email address.",
                        "error"
                    );

                    emailInput.focus();

                    return;

                }


                /* -----------------------------------------
                   PASSWORD LENGTH
                ----------------------------------------- */

                if (
                    password.length < 6
                ) {

                    showMessage(
                        message,
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    passwordInput.focus();

                    return;

                }


                /* -----------------------------------------
                   PASSWORD MATCH
                ----------------------------------------- */

                if (
                    password !== confirmPassword
                ) {

                    showMessage(
                        message,
                        "Passwords do not match.",
                        "error"
                    );

                    confirmInput.focus();

                    return;

                }


                /* -----------------------------------------
                   TERMS CHECK
                ----------------------------------------- */

                if (
                    !termsCheck.checked
                ) {

                    showMessage(
                        message,
                        "Please accept the terms and conditions.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   CHECK EXISTING ACCOUNT
                ----------------------------------------- */

                const existingUser =
                    localStorage.getItem(
                        "portfolioUser"
                    );


                if (existingUser) {

                    try {

                        const oldUser =
                            JSON.parse(
                                existingUser
                            );


                        if (
                            oldUser.email &&
                            oldUser.email.toLowerCase() ===
                            email.toLowerCase()
                        ) {

                            showMessage(
                                message,
                                "An account with this email already exists.",
                                "error"
                            );

                            return;

                        }

                    } catch (error) {

                        localStorage.removeItem(
                            "portfolioUser"
                        );

                    }

                }


                /* -----------------------------------------
                   CREATE USER
                ----------------------------------------- */

                const newUser = {

                    name: name,

                    email: email,

                    password: password

                };


                /* Save user */

                localStorage.setItem(
                    "portfolioUser",
                    JSON.stringify(newUser)
                );


                /* Make sure user is NOT automatically
                   logged in after signup */

                localStorage.removeItem(
                    "loggedIn"
                );


                localStorage.removeItem(
                    "loggedInUser"
                );


                /* -----------------------------------------
                   SUCCESS MESSAGE
                ----------------------------------------- */

                showMessage(
                    message,
                    "Account created successfully! Redirecting to Login...",
                    "success"
                );


                /* Disable button */

                if (signupButton) {

                    signupButton.disabled = true;

                    signupButton.innerHTML =
                        `
                        <span>
                            Account Created
                        </span>

                        <span>
                            ✓
                        </span>
                        `;

                }


                /* -----------------------------------------
                   GO TO LOGIN PAGE
                ----------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1300
                );

            }
        );


        /* ===============================================
           SIGNUP PASSWORD SHOW / HIDE
        =============================================== */

        setupPasswordToggle(
            "signupPasswordToggle",
            "signupPassword"
        );


        setupPasswordToggle(
            "confirmPasswordToggle",
            "confirmPassword"
        );

    }

});



/* =========================================================
   MESSAGE FUNCTION
========================================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        text;


    element.classList.remove(
        "success",
        "error"
    );


    if (type === "success") {

        element.classList.add(
            "success"
        );

    } else {

        element.classList.add(
            "error"
        );

    }

}



/* =========================================================
   PASSWORD TOGGLE FUNCTION
========================================================= */

function setupPasswordToggle(
    buttonId,
    inputId
) {


    const button =
        document.getElementById(
            buttonId
        );


    const input =
        document.getElementById(
            inputId
        );


    if (
        !button ||
        !input
    ) {

        return;

    }


    button.addEventListener(
        "click",
        function () {


            if (
                input.type ===
                "password"
            ) {

                input.type =
                    "text";

                button.textContent =
                    "🙈";

            } else {

                input.type =
                    "password";

                button.textContent =
                    "👁";

            }

        }
    );

}
