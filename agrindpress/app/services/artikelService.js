// app/services/artikelService.js
// Semua akses dan filter data artikel

import DataLoader from '../core/dataLoader.js';

const ArtikelService = {

  async getAll() {
    const artikel = await DataLoader.loadJSON('artikel.json') || [];
    const galeri  = await DataLoader.loadJSON('galeri.json')  || [];
    return [...artikel, ...galeri];
  },

  async getByKategori(kategori, sub = '') {
    const semua = await this.getAll();
    return semua.filter(a => {
      const cocokKategori = a.kategori === kategori;
      const cocokSub = sub ? a.sub === sub : true;
      return cocokKategori && cocokSub;
    });
  },

  async getById(id) {
    const semua = await this.getAll();
    return semua.find(a => a.id === id) || null;
  },

  async getTerbaru(limit = 6) {
    const semua = await this.getAll();
    return semua
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      .slice(0, limit);
  },

  async getRelated(artikel, limit = 4) {
    const semua = await this.getAll();
    return semua
      .filter(a => a.id !== artikel.id && a.sub === artikel.sub)
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      .slice(0, limit);
  }
};

export default ArtikelService;
