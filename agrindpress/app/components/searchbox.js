// app/components/searchbox.js
// Input pencarian dengan prediksi kata

import SearchService from '../services/searchService.js';

const Searchbox = {
  render(containerId = 'searchbox', onSubmit) {
    const html = `
      <div class="searchbox-wrap" id="searchbox-wrap">
        <div class="searchbox-inner">
          <input
            type="text"
            id="search-input"
            class="search-input"
            placeholder="Cari artikel, topik, penulis..."
            autocomplete="off"
            aria-label="Cari konten"
          />
          <button class="search-btn" id="search-btn" aria-label="Cari">&#x2315;</button>
        </div>
        <ul class="autocomplete-list" id="autocomplete-list"></ul>
      </div>`;

    const container = document.getElementById(containerId);
    if (container) container.innerHTML = html;

    this._bindEvents(onSubmit);
  },

  _bindEvents(onSubmit) {
    const input = document.getElementById('search-input');
    const list  = document.getElementById('autocomplete-list');
    const btn   = document.getElementById('search-btn');
    if (!input || !list) return;

    let debounce;

    input.addEventListener('input', () => {
      clearTimeout(debounce);
      const q = input.value.trim();
      if (q.length < 2) { list.innerHTML = ''; list.style.display = 'none'; return; }

      debounce = setTimeout(async () => {
        const saran = await SearchService.prediksi(q);
        if (saran.length === 0) { list.innerHTML = ''; list.style.display = 'none'; return; }
        list.innerHTML = saran.map(s =>
          `<li class="autocomplete-item" data-val="${s}">${s}</li>`
        ).join('');
        list.style.display = 'block';
      }, 200);
    });

    list.addEventListener('click', e => {
      if (e.target.classList.contains('autocomplete-item')) {
        input.value = e.target.dataset.val;
        list.innerHTML = '';
        list.style.display = 'none';
        this._submit(input.value, onSubmit);
      }
    });

    btn.addEventListener('click', () => this._submit(input.value, onSubmit));
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') this._submit(input.value, onSubmit);
    });

    // Tutup list saat klik di luar
    document.addEventListener('click', e => {
      if (!e.target.closest('#searchbox-wrap')) {
        list.innerHTML = '';
        list.style.display = 'none';
      }
    });
  },

  _submit(query, onSubmit) {
    if (!query.trim()) return;
    if (onSubmit) {
      onSubmit(query);
    } else {
      window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
    }
  }
};

export default Searchbox;
