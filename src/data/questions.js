// ============================================================================
//  BANK SOAL — file ini bisa Anda EDIT dan TAMBAH sendiri.
// ----------------------------------------------------------------------------
//  Format tiap soal:
//  {
//    subject: "Bedah_1",        // harus cocok dgn "key" di manifest.json
//    vignette: "Teks kasus...", // boleh panjang (vignette klinis)
//    options: ["A", "B", ...],  // 2-5 pilihan
//    answer: 0,                 // INDEX jawaban benar (0 = pilihan pertama)
//    explanation: "Pembahasan..."
//  }
//
//  CATATAN PENTING: Contoh soal di bawah dibuat dari materi Anda sebagai
//  TEMPLATE. Verifikasi sendiri kebenarannya sebelum dijadikan patokan ujian,
//  dan tambahkan soal-soal Anda sendiri di sini.
// ============================================================================

export const QUESTIONS = [
  {
    subject: 'Bedah_1',
    vignette:
      'Seorang pasien korban kecelakaan tiba di IGD. Ia sadar, bisa berjalan sendiri mencari pertolongan, dan tidak memerlukan penanganan medis segera. Berdasarkan sistem triase, pasien ini masuk kategori warna apa?',
    options: ['Merah (immediate)', 'Kuning (urgent)', 'Hijau (delayed)', 'Hitam (unsalvageable)'],
    answer: 2,
    explanation:
      'Kategori HIJAU/delayed adalah prioritas ketiga (area observasi): pasien cedera minimal, dapat berjalan dan mencari pertolongan sendiri, serta tidak memerlukan penanganan medis segera.',
  },
  {
    subject: 'Bedah_1',
    vignette:
      'Dalam primary survey ATLS, urutan penilaian dilakukan secara sistematis. Komponen yang dinilai PERTAMA kali adalah?',
    options: [
      'Breathing & ventilation',
      'Airway & C-spine control',
      'Circulation & bleeding control',
      'Disability',
    ],
    answer: 1,
    explanation:
      'Primary survey mengikuti urutan ABCDE. Yang dinilai pertama adalah Airway dengan kontrol cervical spine (C-spine control), karena patensi jalan napas adalah ancaman jiwa paling cepat fatal.',
  },
  {
    subject: 'Bedah_1',
    vignette:
      'Pada pemeriksaan jalan napas, terdengar suara "snoring" (mengorok). Apa tatalaksana awal yang paling tepat untuk kondisi ini?',
    options: [
      'Suction',
      'Pemasangan OPA (oropharyngeal airway)',
      'Intubasi segera',
      'Krikotiroidotomi',
    ],
    answer: 1,
    explanation:
      'Snoring terjadi karena faring tertutup sebagian oleh soft palate atau epiglottis. Tatalaksananya adalah pembebasan jalan napas dengan OPA (Guedel/Mayo). Gurgling → suction; crowing/spasme laring → intubasi.',
  },
]
