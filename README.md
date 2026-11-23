# FLASH MY HOBBY — Flashcard My Hobby (Bahasa Inggris Kelas 3 SD)

Game edukasi **mode flashcard** bertema **My Hobby** untuk Bahasa Inggris kelas 3 SD.
Cocok untuk desktop, Interactive Flat Panel (IFP), tablet, dan layar sentuh.

## Fitur

- 11 kartu hobi dengan **foto realistik** yang fokus pada satu kegiatan
- Kata dan arti sesuai daftar pada PDF **MY HOBBY — Daftar Kata Hobi** (Bahasa Inggris - Kelas 3 SD)
- Dua arah belajar: **Gambar → Kata** (tebak bahasa Inggrisnya) atau **Kata → Gambar**
- Balik kartu dengan ketuk/klik, tombol, atau `Spasi`; pindah kartu dengan `←` `→` atau geser (swipe)
- Pilih jumlah kartu (6/8/10/11), acak kartu, dan mode sentuh dengan kartu lebih besar
- Tandai **Sudah hafal** / **Belum hafal**, lalu ulangi hanya kartu yang belum hafal
- Ringkasan hasil berisi daftar kartu, arti bahasa Indonesia, dan statusnya
- Pengaturan terakhir disimpan di `localStorage`

## Menjalankan

Situs statis tanpa build. Buka `index.html` langsung, atau jalankan server statis lokal:

```bash
python -m http.server 8000
```

## Struktur

```
index.html
css/style.css
js/data.js     # daftar 11 hobi (kata Inggris, arti, gambar)
js/app.js      # logika flashcard
assets/hobbies # foto hobi
```

## Kredit gambar

Foto `watching-tv.jpg` dan `shopping.jpg` berasal dari foto stok berlisensi CC0 / Public Domain
(Rawpixel dan FNS Midwest melalui Openverse). Foto hobi lainnya sudah ada di repo sejak awal.
