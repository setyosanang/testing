// app/modules/kategori.js

import Navbar         from '../components/navbar.js';
import Footer         from '../components/footer.js';
import Searchbox      from '../components/searchbox.js';
import ArtikelService from '../services/artikelService.js';
import CardArtikel    from '../templates/cardArtikel.js';
import Pagination     from '../templates/pagination.js';
import Router         from '../core/router.js';
import CONFIG         from '../core/config.js';

const LABEL = {
  informasi: 'Informasi',
  artikel: 'Artikel',
  perkuliahan: 'Perkuliahan',
  kegiatan: 'Kegiatan',
  organisasi: 'Organisasi',
  opini: 'Opini',
  cerpen: 'Cerpen',
  'pengin-cerita': 'Pengin Cerita',
  'galeri-anak-ppa': 'Galeri Anak PPA'
};

let semuaData = [];
let halamanAktif = 1;

function tampilHalaman(data, hal) {
  const start = (hal - 1) * CONFIG.itemsPerPage;
  const slice = data.slice(start, start + CONFIG.itemsPerPage);
  const isGaleri = slice[0]?.sub === 'galeri-anak-ppa';

  document.getElementById('list-konten').innerHTML =
    slice.length === 0
      ? '<p class="kosong"><span class="kosong-ikon">📭</span><br>Belum ada konten di kategori ini.</p>'
      : slice.map(a => isGaleri ? CardArtikel.renderGaleri(a) : CardArtikel.render(a)).join('');

  document.getElementById('pagination').innerHTML =
    Pagination.render(hal, data.length, CONFIG.itemsPerPage, (h) => {
      halamanAktif = h;
      tampilHalaman(data, h);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

async function init() {
  await Navbar.render('navbar');
  await Footer.render('footer');

  const params = Router.getParams();
  const kategori = params.kategori || '';
  const sub = params.sub || '';
  const judul = LABEL[sub] || LABEL[kategori] || 'Konten';

  document.getElementById('judul-kategori').textContent = judul;
  document.title = `${judul} — AgrindPress`;

  Searchbox.render('searchbox');

  semuaData = await ArtikelService.getByKategori(kategori, sub);
  tampilHalaman(semuaData, 1);
}

init();
