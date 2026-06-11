// app/services/searchService.js
// Pencarian full-text + prediksi kata (autocomplete)

import DataLoader from '../core/dataLoader.js';

const SearchService = {

  async getSemuaData() {
    const artikel = await DataLoader.loadJSON('artikel.json') || [];
    const galeri  = await DataLoader.loadJSON('galeri.json')  || [];
    return [...artikel, ...galeri];
  },

  // Cari berdasarkan kata kunci penuh
  async cari(query) {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase();
    const semua = await this.getSemuaData();
    return semua
      .map(a => {
        const skor = this._hitungSkor(a, q);
        return { ...a, skor };
      })
      .filter(a => a.skor > 0)
      .sort((a, b) => b.skor - a.skor);
  },

  // Prediksi kata untuk autocomplete (maks 6 saran)
  async prediksi(query) {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase();
    const semua = await this.getSemuaData();

    const kandidat = new Set();
    semua.forEach(a => {
      // Ambil kata dari judul
      a.judul.split(' ').forEach(kata => {
        if (kata.toLowerCase().startsWith(q) && kata.length > q.length)
          kandidat.add(kata);
      });
      // Ambil dari tags
      (a.tags || []).forEach(tag => {
        if (tag.toLowerCase().startsWith(q))
          kandidat.add(tag);
      });
    });

    return Array.from(kandidat).slice(0, 6);
  },

  _hitungSkor(a, q) {
    let skor = 0;
    if (a.judul.toLowerCase().includes(q))       skor += 10;
    if (a.ringkasan.toLowerCase().includes(q))   skor += 5;
    if (a.penulis.toLowerCase().includes(q))     skor += 3;
    (a.tags || []).forEach(t => {
      if (t.toLowerCase().includes(q)) skor += 4;
    });
    return skor;
  }
};

export default SearchService;
