const input = document.getElementById('searchInput');
const cards = Array.from(document.querySelectorAll('.card'));
const noResults = document.getElementById('noResults');

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

function doSearch() {
  const raw = input.value || '';
  const filter = normalize(raw);

  // If empty → show all
  if (!filter) {
    cards.forEach(c => c.style.display = '');
    noResults.hidden = true;
    return;
  }

  let anyVisible = false;

  cards.forEach(card => {
    const titleEl = card.querySelector('.card-title');
    const title = titleEl ? normalize(titleEl.textContent) : '';

    if (title === filter) {
      // Exact match → only show this one
      cards.forEach(c => (c.style.display = 'none'));
      card.style.display = '';
      anyVisible = true;
    } else if (title.startsWith(filter)) {
      // Partial match at the start → show it
      card.style.display = '';
      anyVisible = true;
    } else {
      card.style.display = 'none';
    }
  });

  noResults.hidden = anyVisible;
}

input.addEventListener('input', doSearch);
