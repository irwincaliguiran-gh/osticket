const API_URL = 'https://script.google.com/macros/s/AKfycbw1hL2ieVNC2dOmT2AwUgQgOgTPaNPFH1PfUZ1IDTkVmjygCUnxssirKt9F5Q3_j_JY/exec';

function show(formId) {
  document.getElementById('loginForm').style.display = formId === 'loginForm' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = formId === 'registerForm' ? 'block' : 'none';
}

function hashPwd(pwd) {
  return CryptoJS.SHA256(pwd).toString();
}

async function signIn(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = hashPwd(document.getElementById('loginPass').value);
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'login', email, password })
  });
  const { success, message } = await res.json();
  if (success) window.location.href = 'home.html';
  else alert(message);
}

async function register(e) {
  e.preventDefault();
  const userData = {
    action: 'register',
    username: document.getElementById('regUser').value,
    email: document.getElementById('regEmail').value,
    password: hashPwd(document.getElementById('regPass').value),
    contact: document.getElementById('regContact').value,
    department: document.getElementById('regDept').value
  };
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  const { message } = await res.json();
  alert(message);
}
