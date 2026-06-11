// app/components/navbar.js
// Menu navigasi dengan dropdown hover

import DataLoader from '../core/dataLoader.js';

const Navbar = {
  async render(containerId = 'navbar') {
    const config = await DataLoader.loadJSON('config.json');
    if (!config) return;

    const nav = config.navigasi;
    const currentPath = window.location.pathname;

    const itemsHtml = nav.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const aktif = currentPath.includes(item.url.split('?')[0]) ? 'aktif' : '';

      if (hasChildren) {
        const childrenHtml = item.children.map(c =>
          `<a href="${c.url}" class="dropdown-item">${c.label}</a>`
        ).join('');
        return `
          <li class="nav-item has-dropdown ${aktif}">
            <a href="${item.url}" class="nav-link">
              ${item.label}
              <span class="arrow">▾</span>
            </a>
            <div class="dropdown-menu">
              ${childrenHtml}
            </div>
          </li>`;
      }

      return `
        <li class="nav-item ${aktif}">
          <a href="${item.url}" class="nav-link">${item.label}</a>
        </li>`;
    }).join('');

    const html = `
      <nav class="navbar" id="main-navbar">
        <div class="navbar-inner">
          <a href="index.html" class="navbar-brand">
            <img src="${config.site.logo}" alt="${config.site.nama}" class="navbar-logo"
              onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <span class="navbar-nama" style="display:none">${config.site.nama}</span>
          </a>
          <button class="hamburger" id="hamburger" aria-label="Buka menu">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-list" id="nav-list">
            ${itemsHtml}
          </ul>
        </div>
      </nav>`;

    const container = document.getElementById(containerId);
    if (container) container.innerHTML = html;

    this._bindEvents();
  },

  _bindEvents() {
    // Hamburger toggle untuk mobile
    const btn = document.getElementById('hamburger');
    const list = document.getElementById('nav-list');
    if (btn && list) {
      btn.addEventListener('click', () => {
        list.classList.toggle('open');
        btn.classList.toggle('open');
      });
    }

    // Dropdown: hover di desktop, klik di mobile
    document.querySelectorAll('.has-dropdown').forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) item.classList.add('show');
      });
      item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) item.classList.remove('show');
      });
      item.querySelector('.nav-link')?.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('show');
        }
      });
    });
  }
};

export default Navbar;
