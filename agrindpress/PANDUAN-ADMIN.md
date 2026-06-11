# Panduan Pengelolaan AgrindPress
### Untuk Pengurus Portal — Non-Programmer

---

## Daftar Isi
1. [Sebelum Mulai](#1-sebelum-mulai)
2. [Menambah Artikel Baru](#2-menambah-artikel-baru)
3. [Menambah Informasi Organisasi](#3-menambah-informasi-organisasi)
4. [Upload Thumbnail & Gambar](#4-upload-thumbnail--gambar)
5. [Mengelola Galeri Anak PPA](#5-mengelola-galeri-anak-ppa)
6. [Mengubah Tampilan & Navigasi](#6-mengubah-tampilan--navigasi)
7. [Deploy ke GitHub Pages](#7-deploy-ke-github-pages)
8. [Troubleshooting Umum](#8-troubleshooting-umum)

---

## 1. Sebelum Mulai

### Tools yang dibutuhkan
- Akun **GitHub** (gratis di github.com)
- Aplikasi **VS Code** (gratis di code.visualstudio.com)
- Ekstensi VS Code: **GitHub Copilot** atau cukup editor teks biasa

### Struktur folder penting yang perlu diingat
```
agrindpress/
├── assets/
│   ├── data/          ← File JSON (database teks)
│   │   ├── artikel.json
│   │   ├── galeri.json
│   │   └── config.json
│   └── img/           ← Semua gambar
│       ├── thumbnails/
│       ├── galeri/
│       └── logo.png
└── content/           ← Isi artikel dalam format HTML sederhana
    ├── artikel/
    │   ├── opini/
    │   ├── cerpen/
    │   ├── pengin-cerita/
    │   └── galeri-anak-ppa/
    └── informasi/
        ├── perkuliahan/
        ├── kegiatan/
        └── organisasi/
```

---

## 2. Menambah Artikel Baru

Setiap artikel membutuhkan **dua langkah**: membuat file konten dan mendaftarkan metadata.

### Langkah 1 — Buat file konten artikel

1. Buka folder `content/artikel/[kategori]/`
   - Opini → `content/artikel/opini/`
   - Cerpen → `content/artikel/cerpen/`
   - Pengin Cerita → `content/artikel/pengin-cerita/`

2. Buat file baru, beri nama dengan format:
   `nama-penulis-judul-singkat.html`

   Contoh: `dika-fermentasi-lokal.html`

3. Isi file dengan format berikut (cukup teks biasa dengan tag HTML sederhana):

```html
<p>Paragraf pertama artikel di sini. Tulis seperti biasa.</p>

<p>Paragraf kedua. Beri jarak dengan baris kosong di antara paragraf.</p>

<h2>Judul Sub-bagian</h2>

<p>Lanjut isi artikel...</p>

<blockquote>
  Kutipan penting bisa ditulis di sini.
</blockquote>

<p>Penutup artikel.</p>
```

> **Catatan:** Tidak perlu menulis `<html>`, `<head>`, atau `<body>`.
> Cukup isi artikelnya saja dengan tag `<p>`, `<h2>`, `<h3>`, dan `<blockquote>`.

### Langkah 2 — Daftarkan metadata di artikel.json

1. Buka file `assets/data/artikel.json`
2. Di dalam tanda kurung siku `[...]`, tambahkan entri baru di **bagian paling atas** (agar muncul sebagai artikel terbaru):

```json
{
  "id": "opini-003",
  "judul": "Judul Artikel Kamu",
  "kategori": "artikel",
  "sub": "opini",
  "penulis": "Nama Penulis",
  "tanggal": "2025-06-15",
  "estimasi_baca": 4,
  "thumbnail": "assets/img/thumbnails/opini-003.jpg",
  "ringkasan": "Dua kalimat ringkasan yang menarik untuk ditampilkan di kartu artikel.",
  "file": "content/artikel/opini/nama-file-artikel.html",
  "tags": ["kata-kunci-1", "kata-kunci-2"]
},
```

**Penjelasan tiap isian:**
| Kolom | Isi |
|---|---|
| `id` | Kode unik. Format: `[sub]-[nomor]`. Jangan sama dengan yang lain. |
| `judul` | Judul lengkap artikel |
| `kategori` | Isi `"artikel"` atau `"informasi"` |
| `sub` | `"opini"`, `"cerpen"`, `"pengin-cerita"`, `"perkuliahan"`, `"kegiatan"`, `"organisasi"` |
| `penulis` | Nama penulis |
| `tanggal` | Format `"YYYY-MM-DD"` contoh `"2025-06-15"` |
| `estimasi_baca` | Perkiraan menit baca (angka) |
| `thumbnail` | Path gambar thumbnail (lihat bagian 4) |
| `ringkasan` | 1-2 kalimat pendek untuk preview |
| `file` | Path ke file HTML konten |
| `tags` | Kata kunci pencarian, dalam tanda kurung siku |

> ⚠️ **Perhatikan koma!** Setiap entri dipisah koma, kecuali entri terakhir.

---

## 3. Menambah Informasi Organisasi

Sama seperti artikel, bedanya:
- File konten masuk ke `content/informasi/[sub]/`
- Metadata masuk ke `assets/data/artikel.json` juga, dengan `"kategori": "informasi"`

Contoh metadata informasi:
```json
{
  "id": "info-003",
  "judul": "Pengumuman Beasiswa Semester Ganjil 2025",
  "kategori": "informasi",
  "sub": "perkuliahan",
  "penulis": "Admin HIMAGRIND",
  "tanggal": "2025-07-01",
  "estimasi_baca": 2,
  "thumbnail": "assets/img/thumbnails/info-003.jpg",
  "ringkasan": "Pendaftaran beasiswa semester ganjil 2025 dibuka mulai 1 Juli. Simak syarat dan ketentuan berikut.",
  "file": "content/informasi/perkuliahan/beasiswa-ganjil-2025.html",
  "tags": ["beasiswa", "akademik"]
},
```

---

## 4. Upload Thumbnail & Gambar

### Ukuran yang direkomendasikan
| Jenis | Ukuran | Format |
|---|---|---|
| Thumbnail artikel | 800 × 500 px | JPG |
| Thumbnail informasi | 800 × 500 px | JPG |
| Cover galeri | 800 × 600 px | JPG |
| Foto galeri | Bebas, min 800px lebar | JPG |
| Logo situs | 200 × 60 px | PNG (transparan) |
| Banner hero | 1200 × 400 px | JPG |

### Cara upload
1. Siapkan gambar di komputer, ubah nama file menjadi deskriptif dan tanpa spasi.
   Contoh: `opini-fermentasi-001.jpg` bukan `WhatsApp Image 2025...jpg`

2. Letakkan gambar di folder yang sesuai:
   - Thumbnail artikel/info → `assets/img/thumbnails/`
   - Foto galeri mingguan → `assets/img/galeri/[id-galeri]/`
   - Logo → `assets/img/logo.png` (timpa file lama)

3. Perbarui path di JSON sesuai lokasi file.

> **Tips:** Kompres gambar sebelum upload agar situs tetap cepat.
> Gunakan **TinyPNG** (tinypng.com) untuk kompres gratis.

---

## 5. Mengelola Galeri Anak PPA

Galeri diperbarui **setiap minggu**. Data galeri disimpan terpisah di `assets/data/galeri.json`.

### Format entri galeri baru

```json
{
  "id": "galeri-003",
  "judul": "Nama Kegiatan — Tanggal",
  "kategori": "artikel",
  "sub": "galeri-anak-ppa",
  "penulis": "Admin HIMAGRIND",
  "tanggal": "2025-06-14",
  "thumbnail": "assets/img/galeri/galeri-003/cover.jpg",
  "ringkasan": "Keterangan singkat kegiatan yang difoto.",
  "foto": [
    "assets/img/galeri/galeri-003/foto-1.jpg",
    "assets/img/galeri/galeri-003/foto-2.jpg",
    "assets/img/galeri/galeri-003/foto-3.jpg",
    "assets/img/galeri/galeri-003/foto-4.jpg"
  ],
  "file": "content/artikel/galeri-anak-ppa/nama-kegiatan-juni-2025.html"
},
```

### Alur kerja mingguan
1. Kumpulkan foto dari anggota
2. Beri nama folder baru: `assets/img/galeri/galeri-[nomor]/`
3. Masukkan foto ke folder tersebut (beri nama `cover.jpg`, `foto-1.jpg`, dst.)
4. Tambahkan entri di `galeri.json` — letakkan di **paling atas** agar tampil terbaru
5. Buat file HTML ringkas di `content/artikel/galeri-anak-ppa/`
6. Commit dan push ke GitHub

---

## 6. Mengubah Tampilan & Navigasi

### Mengubah nama situs, tagline, atau email kontak
Buka `assets/data/config.json`, ubah bagian `"site"`:

```json
"site": {
  "nama": "AgrindPress",          ← Nama portal
  "tagline": "Portal Informasi & Opini HIMAGRIND",
  "organisasi": "Himpunan Mahasiswa...",
  "email_kontak": "kphimagrind@gmail.com",
  "logo": "assets/img/logo.png",
  "tahun": 2025
}
```

### Mengubah warna aksen
Buka `assets/css/main.css`, cari bagian `:root` di paling atas:

```css
:root {
  --bg:     #0a0a0a;   /* Warna latar halaman */
  --aksen:  #84cc16;   /* Warna aksen utama — ubah di sini */
  ...
}
```
Ganti nilai hex dengan warna pilihan. Gunakan **htmlcolorcodes.com** untuk memilih kode warna.

### Menambah item menu
Buka `assets/data/config.json`, bagian `"navigasi"`. Tambahkan item baru:

```json
{
  "label": "Label Menu",
  "url": "pages/nama-halaman.html",
  "children": []
}
```

Untuk menu dengan dropdown, isi `"children"`:

```json
{
  "label": "Kategori Baru",
  "url": "pages/kategori.html?kategori=baru",
  "children": [
    { "label": "Sub 1", "url": "pages/kategori.html?kategori=baru&sub=sub1" },
    { "label": "Sub 2", "url": "pages/kategori.html?kategori=baru&sub=sub2" }
  ]
}
```

### Mengubah jumlah artikel per halaman
Buka `app/core/config.js`, ubah nilai `itemsPerPage`:

```js
itemsPerPage: 8,   // Ubah angka ini
```

---

## 7. Deploy ke GitHub Pages

### Pertama kali setup
1. Buat repositori baru di GitHub (contoh: `agrindpress`)
2. Upload seluruh folder proyek ke repositori
3. Di repositori GitHub, klik **Settings → Pages**
4. Di bagian **Source**, pilih `Deploy from a branch`
5. Pilih branch `main`, folder `/ (root)`
6. Klik **Save**. Tunggu 1-2 menit
7. Situs online di: `https://[username].github.io/agrindpress/`

### Update konten rutin
Setiap kali menambah/mengubah konten:

1. Di VS Code, buka Terminal (`Ctrl+~`)
2. Ketik:
```
git add .
git commit -m "Tambah artikel: judul artikel"
git push
```
3. Tunggu 1-2 menit → perubahan otomatis tampil online

### Cara lebih mudah (tanpa Terminal)
Gunakan **GitHub Desktop** (desktop.github.com):
1. Buka aplikasi
2. Klik **Commit to main**
3. Klik **Push origin**

---

## 8. Troubleshooting Umum

| Masalah | Kemungkinan Penyebab | Solusi |
|---|---|---|
| Artikel tidak muncul | Salah format JSON atau koma hilang | Periksa artikel.json di jsonlint.com |
| Gambar tidak tampil | Path gambar salah | Periksa ejaan path di JSON, pastikan file ada di folder |
| Halaman kosong putih | Error JavaScript | Buka browser → klik kanan → Inspect → Console, lihat pesan merah |
| Form pesan tidak terkirim | ID Formspree belum diisi | Isi `FORMSPREE_ID` di `app/modules/kirimPesan.js` |
| Situs tidak update setelah push | GitHub Pages butuh waktu | Tunggu 2-5 menit, lalu refresh |
| Menu dropdown tidak muncul | File config.json error | Periksa config.json di jsonlint.com |

### Validasi JSON
Sebelum push, selalu periksa file JSON di: **jsonlint.com**
Tempel isi file, klik **Validate JSON**. Jika ada error, perbaiki dulu.

---

*Panduan ini dibuat untuk pengurus HIMAGRIND. Pertanyaan? Hubungi pengembang portal atau kirim email ke kphimagrind@gmail.com*
