async function loadTickets() {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'search', query: '' })
  });
  const tickets = await res.json();
  renderTickets(tickets);
}

function showForm() {
  document.getElementById('ticketForm').style.display = 'block';
}

async function submitTicket(event) {
  event.preventDefault();
  const ticket = {
    action: 'submit',
    title: document.getElementById('title').value,
    description: document.getElementById('desc').value
  };
  await fetch(API_URL, { method: 'POST', body: JSON.stringify(ticket) });
  loadTickets();
}

async function search() {
  const q = document.getElementById('searchInput').value;
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'search', query: q })
  });
  renderTickets(await res.json());
}

function renderTickets(list) {
  const div = document.getElementById('content');
  div.innerHTML = list.map(t => `<div><strong>${t.Title}</strong>: ${t.Description} [${t.Status}]</div>`).join('');
}
