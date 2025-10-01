const API_URL = 'YOUR_DEPLOYED_WEBAPP_URL';

function show(id) {
  document.getElementById('loginForm').style.display = id==='loginForm' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = id==='registerForm' ? 'block' : 'none';
}

function hashPwd(pwd) {
  return CryptoJS.SHA256(pwd).toString();
}

async function signIn(event) {
  event.preventDefault();
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

async function register(event) {
  event.preventDefault();
  const data = {
    action: 'register',
    username: document.getElementById('regUser').value,
    email: document.getElementById('regEmail').value,
    password: hashPwd(document.getElementById('regPass').value),
    contact: document.getElementById('regContact').value,
    department: document.getElementById('regDept').value
  };
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const { message } = await res.json();
  alert(message);
}
