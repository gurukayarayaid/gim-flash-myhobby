/* Daftar 11 hobi — sesuai PDF "MY HOBBY: Daftar Kata Hobi" (Bahasa Inggris - Kelas 3 SD) */
window.HOBBIES = [
  { id: 'swimming',    word: 'Swimming',         idn: 'berenang',           img: 'assets/hobbies/swimming.jpg' },
  { id: 'football',    word: 'Playing football', idn: 'bermain sepak bola', img: 'assets/hobbies/soccer.jpg' },
  { id: 'dancing',     word: 'Dancing',          idn: 'menari',             img: 'assets/hobbies/dancing.jpg' },
  { id: 'singing',     word: 'Singing',          idn: 'bernyanyi',          img: 'assets/hobbies/singing.jpg' },
  { id: 'reading',     word: 'Reading books',    idn: 'membaca buku',       img: 'assets/hobbies/reading.jpg' },
  { id: 'cycling',     word: 'Riding a bike',    idn: 'bersepeda',          img: 'assets/hobbies/cycling.jpg' },
  { id: 'watching-tv', word: 'Watching TV',      idn: 'menonton TV',        img: 'assets/hobbies/watching-tv.jpg' },
  { id: 'cooking',     word: 'Cooking',          idn: 'memasak',            img: 'assets/hobbies/cooking.jpg' },
  { id: 'drawing',     word: 'Drawing',          idn: 'menggambar',         img: 'assets/hobbies/sketching.jpg' },
  { id: 'shopping',    word: 'Shopping',         idn: 'belanja',            img: 'assets/hobbies/shopping.jpg' },
  { id: 'gardening',   word: 'Gardening',        idn: 'berkebun',           img: 'assets/hobbies/gardening.jpg' }
];

/* Khusus opsi 6 kartu: enam hobi pertama sesuai urutan PDF */
window.HOBBIES_SIX = window.HOBBIES.filter((h) => [
  'swimming', 'football', 'dancing', 'singing', 'reading', 'cycling'
].indexOf(h.id) !== -1);
