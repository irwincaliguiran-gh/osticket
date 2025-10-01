const API_URL = 'https://script.google.com/macros/s/AKfycbw1hL2ieVNC2dOmT2AwUgQgOgTPaNPFH1PfUZ1IDTkVmjygCUnxssirKt9F5Q3_j_JY/exec';
const USERNAME = localStorage.getItem('username');

async function loadTickets() {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'search', query: '' })
  });
  renderTickets(await res.json());
}

function toggleForm() {
  const form = document.getElementById('ticketForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function submitTicket() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('desc').value;
  await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'submit',
      username: USERNAME,
      title,
      description
    })
  });
  loadTickets();
}

async function search() {
  const query = document.getElementById('searchInput').value;
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'search', query })
  });
  renderTickets(await res.json());
}

function renderTickets(tickets) {
  const container = document.getElementById('content');
  container.innerHTML = tickets
    .map(t => `<div><strong>${t.Title}</strong> — ${t.Description} [${t.Status}]</div>`)
    .join('');
}
