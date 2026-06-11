// app/templates/cardArtikel.js
// Menghasilkan HTML kartu artikel

import Router from '../core/router.js';

function formatTanggal(str) {
  const d = new Date(str);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function labelSub(sub) {
  const map = {
    'opini': 'Opini',
    'cerpen': 'Cerpen',
    'pengin-cerita': 'Pengin Cerita',
    'galeri-anak-ppa': 'Galeri Anak PPA',
    'perkuliahan': 'Perkuliahan',
    'kegiatan': 'Kegiatan',
    'organisasi': 'Organisasi'
  };
  return map[sub] || sub;
}

const CardArtikel = {
  // Card standar untuk listing
  render(artikel) {
    const url = Router.artikelUrl(artikel.id);
    return `
      <article class="card-artikel">
        <a href="${url}" class="card-thumb-link">
          <img
            src="${artikel.thumbnail}"
            alt="${artikel.judul}"
            class="card-thumb"
            loading="lazy"
            onerror="this.src='assets/img/placeholder.jpg'"
          />
        </a>
        <div class="card-body">
          <span class="card-label">${labelSub(artikel.sub)}</span>
          <h2 class="card-judul">
            <a href="${url}">${artikel.judul}</a>
          </h2>
          <p class="card-ringkasan">${artikel.ringkasan}</p>
          <div class="card-meta">
            <span class="card-penulis">${artikel.penulis}</span>
            <span class="card-sep">&middot;</span>
            <span class="card-tanggal">${formatTanggal(artikel.tanggal)}</span>
            <span class="card-sep">&middot;</span>
            <span class="card-baca">${artikel.estimasi_baca} mnt baca</span>
          </div>
        </div>
      </article>`;
  },

  // Card kecil untuk related posts
  renderKecil(artikel) {
    const url = Router.artikelUrl(artikel.id);
    return `
      <article class="card-kecil">
        <a href="${url}" class="card-kecil-thumb-link">
          <img
            src="${artikel.thumbnail}"
            alt="${artikel.judul}"
            class="card-kecil-thumb"
            loading="lazy"
            onerror="this.src='assets/img/placeholder.jpg'"
          />
        </a>
        <div class="card-kecil-body">
          <span class="card-label">${labelSub(artikel.sub)}</span>
          <h3 class="card-kecil-judul">
            <a href="${url}">${artikel.judul}</a>
          </h3>
          <div class="card-meta">
            <span class="card-tanggal">${formatTanggal(artikel.tanggal)}</span>
          </div>
        </div>
      </article>`;
  },

  // Card galeri (grid foto)
  renderGaleri(galeri) {
    const url = Router.artikelUrl(galeri.id);
    const fotoHtml = (galeri.foto || []).slice(0, 4).map((f, i) =>
      `<img src="${f}" alt="Foto ${i + 1}" class="galeri-foto" loading="lazy"
        onerror="this.src='assets/img/placeholder.jpg'">`
    ).join('');
    return `
      <article class="card-galeri">
        <a href="${url}">
          <div class="galeri-grid">${fotoHtml}</div>
          <div class="card-body">
            <h2 class="card-judul"><a href="${url}">${galeri.judul}</a></h2>
            <div class="card-meta">
              <span class="card-tanggal">${formatTanggal(galeri.tanggal)}</span>
            </div>
          </div>
        </a>
      </article>`;
  }
};

export default CardArtikel;
