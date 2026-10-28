
/* =========================================================
   RAMYA SELVA PORTFOLIO
   FIREBASE AUTHENTICATION + FIRESTORE
   Preserves original form IDs and UI features
========================================================= */

import { initializeApp, getApps, getApp } from
  "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile
} from
  "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from
  "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";



/* =========================================================
   1. FIREBASE CONFIGURATION
   Replace with your actual Firebase web app configuration.
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyDKt97iANELaMijliaghYN0D_Fku0bu2v0",
    authDomain: "ramya-portfolio-afe4d.firebaseapp.com",
    projectId: "ramya-portfolio-afe4d",
    storageBucket: "ramya-portfolio-afe4d.firebasestorage.app",
    messagingSenderId: "81907896986",
    appId: "1:81907896986:web:1d63b2e3ac40d8ef538523",
    measurementId: "G-9B7SYT8BG5"
};


/* =========================================================
   2. INITIALIZE FIREBASE
========================================================= */

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


/* =========================================================
   3. MESSAGE HELPER
========================================================= */

function showMessage(element, text, type = "error") {
  if (!element) return;

  element.textContent = text;
  element.classList.remove("success", "error");
  element.classList.add(type);
  element.setAttribute("role", "status");
}


/* =========================================================
   4. FIREBASE ERROR MESSAGES
========================================================= */

function getErrorMessage(error) {
  const messages = {
    "auth/invalid-email":
      "Please enter a valid email address.",

    "auth/invalid-credential":
      "Incorrect email or password.",

    "auth/user-not-found":
      "No account found. Please sign up first.",

    "auth/wrong-password":
      "Incorrect email or password.",

    "auth/email-already-in-use":
      "An account with this email already exists. Please log in.",

    "auth/weak-password":
      "Password must contain at least 6 characters.",

    "auth/too-many-requests":
      "Too many attempts. Please try again later.",

    "auth/network-request-failed":
      "Network error. Check your internet connection.",

    "permission-denied":
      "Firestore permission denied. Check your Firestore Rules.",

    "unavailable":
      "Firebase is temporarily unavailable. Try again."
  };

  return messages[error.code] ||
    "Something went wrong. Please try again.";
}


/* =========================================================
   5. BUTTON LOADING HELPER
========================================================= */

function setButtonLoading(button, loading, normalText) {
  if (!button) return;

  button.disabled = loading;
  button.textContent = loading ? "Please wait..." : normalText;
}


/* =========================================================
   6. PASSWORD SHOW / HIDE
   Original IDs preserved.
========================================================= */

function setupPasswordToggle(buttonId, inputId) {
  const button = document.getElementById(buttonId);
  const input = document.getElementById(inputId);

  if (!button || !input) return;

  button.addEventListener("click", function (event) {
    event.preventDefault();

    const showPassword = input.type === "password";

    input.type = showPassword ? "text" : "password";
    button.textContent = showPassword ? "🙈" : "👁";
  });
}

setupPasswordToggle("passwordToggle", "loginPassword");
setupPasswordToggle("signupPasswordToggle", "signupPassword");
setupPasswordToggle("confirmPasswordToggle", "confirmPassword");


/* =========================================================
   7. LOGIN
   IDs: loginForm, loginEmail, loginPassword,
        loginMessage, loginButton, rememberMe
========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const message = document.getElementById("loginMessage");
    const button = document.getElementById("loginButton");
    const rememberMe = document.getElementById("rememberMe");

    const email = emailInput?.value.trim();
    const password = passwordInput?.value;

    const normalButtonText = button?.textContent || "Login";

    if (!email || !password) {
      showMessage(
        message,
        "Please enter your email and password."
      );
      return;
    }

    try {
      setButtonLoading(button, true, normalButtonText);
      showMessage(message, "Signing in...", "success");

      // Remember Me checked = persist across browser restarts.
      // Unchecked = session persistence.
      await setPersistence(
        auth,
        rememberMe?.checked
          ? browserLocalPersistence
          : browserSessionPersistence
      );

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = credential.user;

      // Preserve existing UI integrations.
      // These contain no password.
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem(
        "loggedInUser",
        user.displayName || user.email || ""
      );

      if (rememberMe?.checked) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      if (button) {
        button.textContent = "Opening Portfolio... ✓";
      }

      showMessage(
        message,
        "Login successful! Welcome back.",
        "success"
      );

      // Allow the success message to appear before redirecting.
      window.setTimeout(function () {
        window.location.assign("./index.html");
      }, 700);

    } catch (error) {
      console.error("Firebase login error:", error);

      showMessage(message, getErrorMessage(error));

      setButtonLoading(button, false, normalButtonText);
    }
  });
}


/* =========================================================
   8. FORGOT PASSWORD
   IDs: forgotPassword, loginEmail, loginMessage
========================================================= */

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {
  forgotPassword.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail")?.value.trim();
    const message = document.getElementById("loginMessage");

    if (!email) {
      showMessage(
        message,
        "Enter your registered email address first."
      );

      document.getElementById("loginEmail")?.focus();
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      showMessage(
        message,
        "If an account exists for this email, a password reset email will be sent.",
        "success"
      );

    } catch (error) {
      console.error("Password reset error:", error);

      showMessage(message, getErrorMessage(error));
    }
  });
}


/* =========================================================
   9. SIGNUP
   IDs: signupForm, signupName, signupEmail,
        signupPassword, confirmPassword, termsCheck,
        signupMessage, signupButton
========================================================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("signupName");
    const emailInput = document.getElementById("signupEmail");
    const passwordInput = document.getElementById("signupPassword");
    const confirmInput = document.getElementById("confirmPassword");
    const termsCheck = document.getElementById("termsCheck");
    const message = document.getElementById("signupMessage");
    const button = document.getElementById("signupButton");

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const password = passwordInput?.value;
    const confirmPassword = confirmInput?.value;

    const normalButtonText = button?.textContent || "Create Account";

    /* Name validation */
    if (!name || name.length < 2 || name.length > 100) {
      showMessage(
        message,
        "Please enter your name (2–100 characters)."
      );

      nameInput?.focus();
      return;
    }

    /* Email validation */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      showMessage(message, "Please enter a valid email address.");
      emailInput?.focus();
      return;
    }

    /* Password validation */
    if (!password || password.length < 6) {
      showMessage(
        message,
        "Password must contain at least 6 characters."
      );

      passwordInput?.focus();
      return;
    }

    /* Confirm password */
    if (password !== confirmPassword) {
      showMessage(message, "Passwords do not match.");
      confirmInput?.focus();
      return;
    }

    /* Terms checkbox */
    if (termsCheck && !termsCheck.checked) {
      showMessage(
        message,
        "Please accept the terms and conditions."
      );
      return;
    }

    let createdUser = null;

    try {
      setButtonLoading(button, true, normalButtonText);
      showMessage(message, "Creating your account...", "success");

      // Create account in Firebase Authentication.
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      createdUser = credential.user;

      // Save display name to Firebase Authentication profile.
      await updateProfile(createdUser, {
        displayName: name
      });

      // Save ONLY name and email to Firestore.
      // Never save password or confirmPassword.
      await setDoc(doc(db, "users", createdUser.uid), {
        name: name,
        email: createdUser.email
      });

      // Keep original behavior: signup does not leave the
      // visitor signed in; send them to the login page.
      await signOut(auth);

      localStorage.removeItem("loggedIn");
      localStorage.removeItem("loggedInUser");

      showMessage(
        message,
        "Account created successfully! Redirecting to Login...",
        "success"
      );

      if (button) {
        button.textContent = "Account Created ✓";
      }

      window.setTimeout(function () {
        window.location.assign("./login.html");
      }, 1000);

    } catch (error) {
      console.error("Firebase signup error:", error);

      if (createdUser) {
        // Auth account exists, but a later step failed.
        // Do not silently report signup as successful.
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error("Sign-out after signup error:", signOutError);
        }

        showMessage(
          message,
          "Your Firebase account was created, but saving the profile failed. Check Firestore Rules and try again after fixing them."
        );
      } else {
        showMessage(message, getErrorMessage(error));
      }

      setButtonLoading(button, false, normalButtonText);
    }
  });
}



/* =========================================================
   10. LOGOUT — FIREBASE AUTHENTICATION
========================================================= */

function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) {
        console.warn(
            "Logout button not found. Check id='logoutBtn' and auth.js loading."
        );
        return;
    }

    // Prevent duplicate event handlers
    if (logoutBtn.dataset.logoutInitialized === "true") {
        return;
    }

    logoutBtn.dataset.logoutInitialized = "true";

    logoutBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        if (logoutBtn.disabled) return;

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        const originalText = logoutBtn.textContent;

        try {
            logoutBtn.disabled = true;
            logoutBtn.textContent = "Logging out...";

            // Sign out from Firebase Authentication
            await signOut(auth);

            // Clear the old local session flags
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("rememberMe");

            // Redirect to login page
            window.location.replace("./login.html");

        } catch (error) {
            console.error("Firebase logout error:", error);

            logoutBtn.disabled = false;
            logoutBtn.textContent = originalText;

            alert("Logout failed. Please check your internet connection and try again.");
        }
    });
}

// Works whether this module loads before or after DOMContentLoaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupLogout, {
        once: true
    });
} else {
    setupLogout();
}



/* =========================================================
   11. EXPORT FIREBASE INSTANCES
========================================================= */

export { app, auth, db };
