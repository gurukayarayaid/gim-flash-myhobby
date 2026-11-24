# FLASH MY HOBBY — Flashcard My Hobby (Bahasa Inggris Kelas 3 SD)

Game edukasi **mode flashcard** bertema **My Hobby** untuk Bahasa Inggris kelas 3 SD.
Cocok untuk desktop, Interactive Flat Panel (IFP), tablet, dan layar sentuh.

## Fitur

- 11 kartu hobi dengan **foto realistik** yang fokus pada satu kegiatan
- Kata dan arti sesuai daftar pada PDF **MY HOBBY — Daftar Kata Hobi** (Bahasa Inggris - Kelas 3 SD)
- Dua arah belajar: **Gambar → Kata** (tebak bahasa Inggrisnya) atau **Kata → Gambar**
- Balik kartu dengan ketuk/klik, tombol, atau `Spasi`; pindah kartu dengan `←` `→` atau geser (swipe)
- Pilih jumlah kartu (6/8/10/11), acak kartu, dan mode sentuh dengan kartu lebih besar
- Opsi **6 kartu** memakai enam hobi tetap: Swimming, Playing football, Dancing, Singing, Reading books, Riding a bike (tombol Acak tetap mengubah urutannya)
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

Semua foto di bawah ini sudah dipangkas dan diubah ukurannya menjadi 1184×880 px. Turunan tetap
mengikuti lisensi asli masing-masing foto.

- `swimming.jpg` — [Shixart1985](https://commons.wikimedia.org/wiki/File:Child_swims_in_a_swimming_pool_on_a_sunny_day_with_water_splashing_around.jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0)
- `soccer.jpg` — [Pavan Prasad](https://commons.wikimedia.org/wiki/File:A-Boy-Playing-Football.jpg), [CC0](https://creativecommons.org/publicdomain/zero/1.0)
- `dancing.jpg` — [Vyacheslav Argenberg](https://commons.wikimedia.org/wiki/File:Pyatigorsk,_Girl_dancing,_jumping,_Russia.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)
- `singing.jpg` — [Okras](https://commons.wikimedia.org/wiki/File:Alisa_Kozhikina_(SPb,_150601)_(1).jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)
- `reading.jpg` — [Gustavo Devito](https://commons.wikimedia.org/wiki/File:Child_reading_board_books_at_a_bookstore.jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0)
- `cycling.jpg` — [Bobo Boom](https://commons.wikimedia.org/wiki/File:Girl_on_a_bicycle_(48153662481).jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0)
- `watching-tv.jpg` — [Rawpixel](https://www.rawpixel.com/image/5941141/free-public-domain-cc0-photo), CC0
- `shopping.jpg` — [FNS Midwest](https://www.flickr.com/photos/149839502@N04/25277579728), Public Domain

Foto hobi lainnya sudah ada di repo sejak awal.
