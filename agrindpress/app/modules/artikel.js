// app/modules/artikel.js

import Navbar         from '../components/navbar.js';
import Footer         from '../components/footer.js';
import ArtikelService from '../services/artikelService.js';
import CardArtikel    from '../templates/cardArtikel.js';
import DataLoader     from '../core/dataLoader.js';
import Router         from '../core/router.js';

function formatTanggal(str) {
  return new Date(str).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

async function init() {
  await Navbar.render('navbar');
  await Footer.render('footer');

  const params = Router.getParams();
  const id = params.id;

  if (!id) {
    document.getElementById('artikel-body').innerHTML =
      '<p class="kosong">Artikel tidak ditemukan.</p>';
    return;
  }

  const data = await ArtikelService.getById(id);
  if (!data) {
    document.getElementById('artikel-body').innerHTML =
      '<p class="kosong">Artikel tidak ditemukan.</p>';
    return;
  }

  document.title = `${data.judul} — AgrindPress`;

  // Ambil konten HTML artikel
  const konten = await DataLoader.loadHTML(
    // Sesuaikan path relatif dari /pages/
    '../' + data.file
  );

  // Related posts
  const related = await ArtikelService.getRelated(data, 4);
  const relatedHtml = related.length > 0
    ? `<div class="related-section">
        <h2 class="related-judul">Artikel Terkait</h2>
        ${related.map(a => CardArtikel.renderKecil(a)).join('')}
       </div>`
    : '';

  const html = `
    <main class="artikel-container">
      <span class="artikel-label">${data.sub?.replace(/-/g,' ')}</span>
      <h1 class="artikel-judul">${data.judul}</h1>
      <div class="artikel-meta">
        <span class="artikel-penulis">${data.penulis}</span>
        <span class="card-sep">&middot;</span>
        <span>${formatTanggal(data.tanggal)}</span>
        <span class="card-sep">&middot;</span>
        <span>${data.estimasi_baca} mnt baca</span>
      </div>
      <img
        src="../${data.thumbnail}"
        alt="${data.judul}"
        class="artikel-header-img"
        onerror="this.style.display='none'"
      >
      <div class="artikel-konten">${konten}</div>
      ${relatedHtml}
    </main>`;

  document.getElementById('artikel-body').innerHTML = html;
}

init();
