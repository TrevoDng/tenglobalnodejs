const form = document.getElementById("login-form");
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const display = document.querySelector('.error')
const userExists = document.getElementById("userExists");
const passwordEye = document.getElementById("password-eye");
const passwordEyeText = document.getElementById("password-eye-text");
const togglePasswordBtn = document.getElementById("toggle-password-btn");

togglePasswordBtn.onclick = () => togglePassword(password, passwordEye, passwordEyeText);

const login = "LOGIN";

form.addEventListener('submit', async (e)=> {
  e.preventDefault()
  display.textContent = ''
  try {
    const res = await fetch(`${window.location.origin}/api/auth/signin`, {
      method: 'POST',
      body: JSON.stringify({ email: email.value, password: password.value }),
      headers: { 'content-Type': 'application/json' }
    })

    if (!res.ok) {
      userExists.innerHTML = "Email or password is incorrect, Please try again!";
      userExists.style.color = "red";
      return display.textContent = `Error: ${res.status} ${res.statusText}`
    }

    const data = await res.json()

    if(data.role === "ADMIN") {

      userExists.innerHTML = "Email or password is incorrect, Please try again!";
      userExists.style.color = "red";
    }

    if(data.role === "USER") {
      userExists.innerHTML = "user login was successful!";
      userExists.style.color = "green";
      location.assign(data.role === 'USER' ? '/tenglobalhome' : '/signin')
    }
    
    //location.assign(data.role === 'USER' ? '/tenglobalhome' : '/signin')
  } catch (err) {
    console.log(err.message)
  }
})

function togglePassword(passwordInput, passwordEye, passwordEyeText) {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordEye.classList.add("fa-eye-slash");
    passwordEye.classList.remove("fa-eye");
    passwordEyeText.innerHTML = "Hide password";
  } else {
    passwordInput.type = "password";
    passwordEye.classList.add("fa-eye");
    passwordEye.classList.remove("fa-eye-slash");
    passwordEyeText.innerHTML = "Show password";
  }
}