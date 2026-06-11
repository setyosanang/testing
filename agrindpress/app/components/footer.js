// app/components/footer.js

import DataLoader from '../core/dataLoader.js';

const Footer = {
  async render(containerId = 'footer') {
    const config = await DataLoader.loadJSON('config.json');
    if (!config) return;
    const { site } = config;

    const html = `
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-nama">${site.nama}</span>
            <p class="footer-tagline">${site.tagline}</p>
            <p class="footer-org">${site.organisasi}</p>
          </div>
          <div class="footer-links">
            <a href="pages/tentang.html">Tentang</a>
            <a href="pages/kirim-pesan.html">Kotak Aspirasi</a>
            <a href="pages/search.html">Pencarian</a>
          </div>
          <div class="footer-kontak">
            <span>Kontak:</span>
            <a href="mailto:${site.email_kontak}">${site.email_kontak}</a>
          </div>
        </div>
        <div class="footer-copy">
          &copy; ${site.tahun} ${site.nama} &mdash; ${site.singkatan}
        </div>
      </footer>`;

    const container = document.getElementById(containerId);
    if (container) container.innerHTML = html;
  }
};

export default Footer;
