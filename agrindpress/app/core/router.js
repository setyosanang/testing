// app/core/router.js
// Membaca parameter URL untuk navigasi

const Router = {
  getParams() {
    const params = {};
    new URLSearchParams(window.location.search).forEach((v, k) => {
      params[k] = v;
    });
    return params;
  },

  go(url) {
    window.location.href = url;
  },

  // Bangun URL halaman artikel
  artikelUrl(id) {
    return `pages/artikel.html?id=${id}`;
  },

  // Bangun URL kategori
  kategoriUrl(kategori, sub = '') {
    let url = `pages/kategori.html?kategori=${kategori}`;
    if (sub) url += `&sub=${sub}`;
    return url;
  }
};

export default Router;
