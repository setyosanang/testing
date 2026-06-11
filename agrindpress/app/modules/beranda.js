// app/modules/beranda.js

import Navbar      from '../components/navbar.js';
import Footer      from '../components/footer.js';
import Searchbox   from '../components/searchbox.js';
import ArtikelService from '../services/artikelService.js';
import CardArtikel from '../templates/cardArtikel.js';
import DataLoader  from '../core/dataLoader.js';

async function renderHero() {
  const config = await DataLoader.loadJSON('config.json');
  if (!config) return;
  const html = `
    <div class="hero">
      <p class="hero-label">${config.site.singkatan}</p>
      <h1 class="hero-judul">${config.site.nama}</h1>
      <p class="hero-sub">${config.site.tagline}</p>
    </div>`;
  document.getElementById('hero').innerHTML = html;
}

function renderList(containerId, items, renderFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!items || items.length === 0) {
    el.innerHTML = '<p class="kosong">Belum ada konten.</p>';
    return;
  }
  el.innerHTML = items.map(renderFn).join('');
}

async function init() {
  await Navbar.render('navbar');
  await Footer.render('footer');
  await renderHero();
  Searchbox.render('searchbox');

  const terbaru   = await ArtikelService.getTerbaru(6);
  const informasi = await ArtikelService.getByKategori('informasi');
  const artikel   = await ArtikelService.getByKategori('artikel');
  const galeri    = await ArtikelService.getByKategori('artikel', 'galeri-anak-ppa');

  renderList('list-terbaru',   terbaru.slice(0, 4),   a => CardArtikel.render(a));
  renderList('list-informasi', informasi.slice(0, 3), a => CardArtikel.render(a));
  renderList('list-artikel',   artikel.filter(a => a.sub !== 'galeri-anak-ppa').slice(0, 3),
                                                       a => CardArtikel.render(a));
  renderList('list-galeri',    galeri.slice(0, 2),    a => CardArtikel.renderGaleri(a));
}

init();
