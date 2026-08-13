const loginModal = document.querySelector("#login-modal");
const loginLink = document.querySelector('a[href="#login"]');

loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    loginModal.classList.add("open");
});

const closeBtn = document.querySelector("#close-login");
closeBtn.addEventListener("click", (event) => {

    loginModal.classList.remove("open");
});

loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.classList.remove("open");
    };
});

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();// telling browser not to submit until we validate
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    // console.log(email.value);
    // console.log(password.value)
    const loginErrorPassword = document.querySelector("#login-error-password");
    const loginErrorEmail = document.querySelector("#login-error-email");
    const emailPattern = /^[^\s@]+@(gmail\.com|icloud\.com)$/;
    if (!emailPattern.test(email)) {
        loginErrorEmail.textContent = "Please enter a valid email";
        loginErrorEmail.classList.add("show");
        return;
    }
    loginErrorEmail.classList.remove("show");

    if (password.length < 8) {

        loginErrorPassword.textContent = "Password must be at least 8 characters.";
        loginErrorPassword.classList.add("show");
        return;
    }
    loginErrorPassword.classList.remove("show");

    localStorage.setItem("loggedIn", "true");
    loginModal.classList.remove("open");
    window.location.href="dashboard.html";


});
console.log(localStorage.getItem("loggedIn"));

const isLoggedIn = localStorage.getItem("loggedIn");


if (isLoggedIn === "true") {
    loginLink.textContent = "Logout";
}

//logout 
loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    const currentLoginState = localStorage.getItem("loggedIn");
    if (currentLoginState === "true") {
        localStorage.removeItem("loggedIn");
        loginLink.textContent = "Login";
        return;
    }

    loginModal.classList.add("open");
})


const signupModal = document.querySelector("#signup-modal");
const signupLink = document.querySelector('a[href="#signup"]');
const closeSignup = document.querySelector("#close-signup");
//opens the signup form
signupLink.addEventListener("click", (event) => {
    event.preventDefault();
    signupModal.classList.add("open");
});
//closes the signup form
closeSignup.addEventListener("click", () => {
    signupModal.classList.remove("open");
});
//close the signup form if clicked outside
signupModal.addEventListener("click", (event) => {
    if (event.target === signupModal) {
        signupModal.classList.remove("open");
    }
})

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#signup-name").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    const confirmPassword = document.querySelector("#signup-confirm-password").value;


    console.log(name, email, password, confirmPassword);
    const signupErrorEmail = document.querySelector("#signup-error-email");
    const signupErrorPassword = document.querySelector("#signup-error-password");
    const signupErrorConfirm = document.querySelector("#signup-error-confirm");
    const emailPattern = /^[^\s@]+@(gmail\.com|icloud\.com)$/;

    if (!emailPattern.test(email)) {
        signupErrorEmail.textContent = "Please enter a valid email.";
        signupErrorEmail.classList.add("show");
        return;
    }

    signupErrorEmail.classList.remove("show");
    if (password.length < 8) {
        signupErrorPassword.textContent =
            "Password must be at least 8 characters.";
        signupErrorPassword.classList.add("show");
        return;
    }

    signupErrorPassword.classList.remove("show");
    if (password !== confirmPassword) {
        signupErrorConfirm.textContent = "Passwords do not match.";
        signupErrorConfirm.classList.add("show");
        return;
    }

    signupErrorConfirm.classList.remove("show");


    localStorage.setItem("loggedIn","true");
    localStorage.setItem("userName",name);
    localStorage.setItem("userEmail",email);
    signupModal.classList.remove("open");
    window.location.href="dashboard.html";
    loginLink.textContent="Logout";
})


const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const input = button.previousElementSibling;
        if(input.type==="password"){
            input.type="text";
            button.textContent="Hide";
        }
        else{
            input.type="password";
            button.textContent="Show";
        }
    });
});