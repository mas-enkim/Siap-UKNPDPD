# MedSiap — Ruang Belajar Pribadi UKMPPD

Aplikasi web pribadi untuk persiapan uji kompetensi. Berisi materi per bidang,
flashcard recall aktif, dan kuis bertimer dengan pembahasan. Progres belajar
tersimpan otomatis di browser (localStorage).

> **Penggunaan pribadi.** Materi di dalamnya berasal dari catatan/akun Anda
> sendiri dan ditujukan hanya untuk belajar pribadi, bukan untuk disebarluaskan.

## Fitur

- **Materi** — telusuri 11 bidang, total ~1.780 bagian, dengan daftar isi & navigasi.
- **Flashcard** — 1.500+ kartu (depan: topik, belakang: inti materi). Tandai
  "sudah paham" / "masih belajar"; progres terlacak per bidang.
- **Kuis** — soal pilihan ganda bertimer, langsung dengan pembahasan & skor.
- **Progres** — persentase penguasaan & skor terbaik, tersimpan di perangkat Anda.

## Menjalankan secara lokal

Butuh **Node.js 18+**.

```bash
npm install      # sekali saja
npm run dev      # buka http://localhost:5173
```

## Build untuk produksi

```bash
npm run build    # hasil ada di folder dist/
npm run preview  # cek hasil build secara lokal
```

## Menambah / mengedit soal kuis

Buka **`src/data/questions.js`**. Setiap soal berformat:

```js
{
  subject: 'Bedah_1',          // cocokkan dgn "key" (lihat src/data/manifest.json)
  vignette: 'Teks kasus...',
  options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
  answer: 0,                   // index jawaban benar (0 = pilihan pertama)
  explanation: 'Pembahasan...'
}
```

Daftar `key` bidang yang valid: lihat `src/data/manifest.json`.

> Contoh soal bawaan dibuat dari materi sebagai template — **verifikasi sendiri**
> kebenarannya dan tambahkan soal Anda sendiri di sini.

## Deploy gratis

Hasil build (`dist/`) adalah situs statis biasa, bisa di-hosting gratis:

**Netlify / Vercel** — hubungkan repo, atau drag-and-drop folder `dist/`.
Build command: `npm run build`, publish directory: `dist`.

**GitHub Pages (otomatis — disarankan)**

Proyek ini sudah menyertakan workflow di `.github/workflows/deploy.yml` yang
mem-build dan men-deploy aplikasi otomatis setiap kali Anda push. Langkahnya:

1. Buat repository baru di GitHub, lalu unggah semua file proyek ini ke branch
   `main` (lewat web "Add file → Upload files", atau `git push`).
2. Buka **Settings → Pages** di repo Anda.
3. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
4. Selesai. Buka tab **Actions** untuk melihat proses build; setelah selesai
   (centang hijau), situs Anda live di
   `https://<username>.github.io/<nama-repo>/`.

Setiap kali Anda mengubah materi atau menambah soal lalu push lagi, situs
otomatis ter-update. Karena `vite.config.js` memakai `base: './'`, aplikasi
tetap berjalan walau berada di subfolder repo.

## Menambah bidang yang hilang

Oftalmologi, Obgin 1, dan Infeksi Tropis tidak disertakan karena file sumbernya
rusak saat dikompresi. Untuk menambahkannya: unduh ulang versi asli dari akun
Anda, ekstrak teksnya, lalu tambahkan ke `src/data/subjects.json` dan
`src/data/flashcards.json` mengikuti struktur bidang yang sudah ada.

## Struktur proyek

```
src/
  App.jsx                 # routing antar tampilan
  useProgress.js          # penyimpanan progres (localStorage)
  index.css               # sistem desain
  components/
    Home.jsx              # beranda + grid bidang
    Subject.jsx           # hub mode belajar per bidang
    Materi.jsx            # pembaca materi + daftar isi
    Flashcards.jsx        # flashcard flip
    Quiz.jsx              # kuis bertimer
  data/
    manifest.json         # daftar bidang
    subjects.json         # isi materi
    flashcards.json       # kartu (dari materi)
    questions.js          # bank soal (EDIT DI SINI)
```
