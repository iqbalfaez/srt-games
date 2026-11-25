import type {
  KitchenHotspot,
  StaffProfile,
  StorageCompartmentEnv,
  StorageItem,
  SubtopicCode,
} from '../types/game';

/**
 * LEVEL 1 DATASET — Subtopik 2.2: Pengendalian Makanan (Kebersihan Diri & Pakaian)
 * 6 Staff Profiles: 3 Compliant (pass), 3 Non-Compliant (reject)
 */
export const level1Staff: StaffProfile[] = [
  {
    id: 'staff-1',
    staffCode: 'PM-0142',
    name: 'Amirul Hakim bin Azizi',
    role: 'Cef Stesen Memasak',
    subtopic: '2.2',
    category: 'pakaian_pengendali',
    avatar: {
      gender: 'male',
      skinTone: '#e2b48f',
      hairColor: '#1f2937',
      shirtColor: '#f8fafc',
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'Tiada barang kemas',
    gloveStatus: 'clean',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 420,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes: 'Sihat sepenuhnya. Tiada demam, batuk atau luka terbuka.',
    correctDecision: 'pass',
    violationOptions: [
      'Tiada penutup kepala (hairnet)',
      'Suntikan Tifoid telah tamat tempoh',
      'Memakai barang kemas semasa bekerja',
    ],
    correctViolationIndex: -1,
    explanation:
      'Amirul mematuhi sepenuhnya piawaian pengendali makanan KKM: memakai apron bersih, penutup kepala, kasut bertutup, tiada barang kemas, dan memiliki Suntikan Tifoid serta sijil SLPM yang sah.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.2 • Peraturan 30, 31 & 32, Peraturan-Peraturan Kebersihan Makanan 2009',
  },
  {
    id: 'staff-2',
    staffCode: 'PM-0187',
    name: 'Nurul Aina binti Roslan',
    role: 'Pembantu Penyediaan Bahan',
    subtopic: '2.2',
    category: 'pakaian_pengendali',
    avatar: {
      gender: 'female',
      skinTone: '#ecc2a0',
      hairColor: '#27201c',
      shirtColor: '#f1f5f9',
      hijab: false,
    },
    apron: true,
    apronClean: true,
    hairnet: false,
    jewelry: true,
    jewelryDetail: 'Memakai cincin batu & gelang tangan emas',
    gloveStatus: 'none',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 310,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes: 'Sihat. Tiada gejala penyakit berjangkit.',
    correctDecision: 'reject',
    violationOptions: [
      'Tiada penutup kepala & memakai barang kemas (cincin/gelang)',
      'Suntikan Tifoid telah tamat tempoh',
      'Memakai selipar terbuka di dalam dapur',
    ],
    correctViolationIndex: 0,
    explanation:
      'Nurul Aina melanggar etika pakaian dan kebersihan diri kerana tidak memakai penutup kepala (risiko rambut gugur ke dalam makanan) serta memakai cincin dan gelang yang memerangkap bakteria dan berisiko terjatuh ke dalam makanan.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.2 • Peraturan 32 & 33, Peraturan-Peraturan Kebersihan Makanan 2009',
  },
  {
    id: 'staff-3',
    staffCode: 'PM-0205',
    name: 'Faizal bin Kamaruddin',
    role: 'Tukang Masak Sif Pagi',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    avatar: {
      gender: 'male',
      skinTone: '#c89268',
      hairColor: '#111827',
      shirtColor: '#f8fafc',
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'Tiada barang kemas',
    gloveStatus: 'clean',
    footwear: 'slippers',
    typhoidVaccineValid: false,
    typhoidExpiryOffsetDays: -45,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes: 'Kad Suntikan Tifoid tamat tempoh 45 hari lalu. Memakai selipar getah.',
    correctDecision: 'reject',
    violationOptions: [
      'Luka terbuka di jari tanpa plaster kalis air',
      'Suntikan Tifoid tamat tempoh & memakai selipar terbuka',
      'Tidak memakai apron semasa mengendalikan makanan',
    ],
    correctViolationIndex: 1,
    explanation:
      'Pengendali makanan wajib mendapatkan Suntikan Tifoid yang sah (diperbaharui setiap 3 tahun) bagi mencegah penularan demam kepialu (Salmonella typhi). Selain itu, kasut bertutup dan kalis licin wajib dipakai untuk keselamatan serta kebersihan dapur.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.2 • Peraturan 31 (Suntikan Tifoid) & Peraturan 32 (Kasut Bertutup), PPKM 2009',
  },
  {
    id: 'staff-4',
    staffCode: 'PM-0221',
    name: 'Kavitha a/p Subramaniam',
    role: 'Pembantu Pastri & Pencuci Mulut',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    avatar: {
      gender: 'female',
      skinTone: '#b0744f',
      hairColor: '#171717',
      shirtColor: '#f8fafc',
      hijab: false,
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'Tiada barang kemas, kuku pendek & bersih',
    gloveStatus: 'clean',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 580,
    slpmCertValid: true,
    hasOpenWound: true,
    cutsCovered: true,
    healthNotes:
      'Luka calar kecil pada jari telunjuk telah dibalut kemas dengan plaster kalis air biru dan dilindungi sarung tangan pakai buang bersih.',
    correctDecision: 'pass',
    violationOptions: [
      'Luka tidak dibalut dengan plaster kalis air',
      'Sarung tangan kotor dan koyak',
      'Tiada sijil Latihan Pengendali Makanan (SLPM)',
    ],
    correctViolationIndex: -1,
    explanation:
      'Kavitha layak masuk dapur! Luka kecil yang dibalut dengan plaster kalis air berwarna terang (biru) serta dilindungi sarung tangan bersih mematuhi prosedur keselamatan makanan KKM bagi mengelakkan pencemaran biologi.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.2 • Peraturan 33 (Penjagaan Luka & Kebersihan Diri), PPKM 2009',
  },
  {
    id: 'staff-5',
    staffCode: 'PM-0249',
    name: 'Danial Chong Wei Liang',
    role: 'Pengendali Stesen Potong Daging',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    avatar: {
      gender: 'male',
      skinTone: '#f1cfb2',
      hairColor: '#1f2937',
      shirtColor: '#f8fafc',
    },
    apron: true,
    apronClean: false,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'Tiada barang kemas',
    gloveStatus: 'dirty',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 190,
    slpmCertValid: true,
    hasOpenWound: true,
    cutsCovered: false,
    healthNotes:
      'Terdapat luka terbuka tanpa balutan plaster di ibu jari kanan. Apron berlumuran kesan minyak dan sarung tangan telah kotor.',
    correctDecision: 'reject',
    violationOptions: [
      'Suntikan Tifoid tamat tempoh',
      'Luka terbuka tanpa plaster kalis air, sarung tangan & apron kotor',
      'Memakai cincin dan gelang tangan',
    ],
    correctViolationIndex: 1,
    explanation:
      'Luka terbuka yang tidak dibalut membawa bakteria Staphylococcus aureus terus ke dalam makanan. Apron yang kotor dan sarung tangan pakai buang yang tidak ditukar pula menjadi punca pencemaran silang.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.2 • Peraturan 32 & 33, Peraturan-Peraturan Kebersihan Makanan 2009',
  },
  {
    id: 'staff-6',
    staffCode: 'PM-0274',
    name: 'Siti Hajar binti Mohamad',
    role: 'Penyelia Hidangan & Pembungkusan',
    subtopic: '2.2',
    category: 'pakaian_pengendali',
    avatar: {
      gender: 'female',
      skinTone: '#ddb08c',
      hairColor: '#1f2937',
      shirtColor: '#f8fafc',
      hijab: true,
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'Tiada barang kemas atau jam tangan',
    gloveStatus: 'clean',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 710,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes:
      'Tudung diikat kemas bersama penutup kepala, apron cerah bersih, kasut bertutup kalis gelincir, dan kad kesihatan lengkap.',
    correctDecision: 'pass',
    violationOptions: [
      'Memakai selipar terbuka',
      'Apron kotor dan tidak bertukar',
      'Suntikan Tifoid tamat tempoh',
    ],
    correctViolationIndex: -1,
    explanation:
      'Siti Hajar memenuhi semua kriteria kebersihan pengendali makanan KKM. Pakaian lengkap berwarna cerah memudahkan pengesanan kekotoran, dan ketiadaan barang kemas mengelakkan pencemaran fizikal dan mikrob.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.2 • Peraturan 30, 31 & 32, Peraturan-Peraturan Kebersihan Makanan 2009',
  },
];

/**
 * LEVEL 2 DATASET — Subtopik 2.1 (Amalan Kebersihan Dapur) & 2.2 (Pengendalian)
 * 8 Interactive Hotspots across 4 Commercial Kitchen Zones (6 violations, 2 compliant)
 */
export const level2KitchenHotspots: KitchenHotspot[] = [
  {
    id: 'hs-1',
    pinNumber: 1,
    x: 15,
    y: 66,
    zone: 'cuci',
    zoneLabel: 'Zon Cuci',
    title: 'Perangkap Gris Tersumbat & Berbau',
    description:
      'Perangkap gris (grease trap) di bawah singki basuhan penuh dengan lapisan minyak beku, sisa makanan mendap, dan air basuhan bertakung.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'Apakah risiko utama dan tindakan pembetulan bagi perangkap gris yang tersumbat ini?',
    options: [
      'Menarik perosak (lipas/tikus) & saluran tersumbat — wajib dibersihkan dan diselenggara secara berkala.',
      'Hanya mencurah air sejuk supaya lemak membeku dan mudah mengalir ke longkang awam.',
      'Tiada kesalahan sanitasi selagi sinki bahagian atas masih kelihatan bersih.',
    ],
    correctOptionIndex: 0,
    explanation:
      'Perangkap gris yang tidak diselenggara menyebabkan pengumpulan lemak tepu, bau busuk, pembiakan bakteria serta menarik haiwan perosak seperti lipas dan tikus. Ia wajib dibersihkan setiap hari atau mengikut jadual penyelenggaraan KKM.',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.1 • Pengurusan Sistem Saliran & Perangkap Gris Premis Makanan',
  },
  {
    id: 'hs-2',
    pinNumber: 2,
    x: 24,
    y: 34,
    zone: 'cuci',
    zoneLabel: 'Zon Cuci',
    title: 'Singki Cuci Tangan Khusus Pengendali',
    description:
      'Singki cuci tangan berasingan daripada singki basuh bahan mentah, dilengkapi sabun cecair antiseptik, tisu pakai buang, dan poster 7 langkah cuci tangan.',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    isViolation: false,
    question:
      'Bagaimanakah penilaian anda terhadap kemudahan singki cuci tangan ini?',
    options: [
      'Pelanggaran — tisu pakai buang perlu diganti dengan tuala kain guna semula.',
      'Mematuhi piawaian KKM — singki cuci tangan khusus lengkap sabun cecair & pengering pakai buang.',
      'Pelanggaran — singki cuci tangan mesti digabungkan dengan singki basuh ayam mentah.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Tepat sekali! Premis makanan wajib menyediakan singki cuci tangan khusus yang berasingan daripada singki membasuh bahan mentah, lengkap dengan sabun cecair dan tisu pakai buang (elakkan tuala kain kongsi yang membiakkan bakteria).',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.2 • Kemudahan Mencuci Tangan & Kebersihan Pengendali Makanan',
  },
  {
    id: 'hs-3',
    pinNumber: 3,
    x: 42,
    y: 48,
    zone: 'penyediaan',
    zoneLabel: 'Zon Penyediaan',
    title: 'Ayam Mentah Bersebelahan Nasi Masak',
    description:
      'Bekas ayam mentah yang berair diletakkan tepat di sebelah dulang nasi putih yang sudah dimasak tanpa penutup di atas meja penyediaan yang sama.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'Apakah jenis pelanggaran sanitasi yang berlaku pada meja penyediaan ini?',
    options: [
      'Pencemaran fizikal akibat suhu bilik yang terlalu rendah.',
      'Pencemaran silang (cross-contamination) antara makanan mentah dan makanan siap dimakan — perlu diasingkan segera.',
      'Tiada kesalahan kerana kedua-duanya akan dihidangkan dalam masa 30 minit.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Titisan air ayam mentah boleh mengandungi bakteria patogen seperti Salmonella dan Campylobacter yang mencemari nasi siap dimakan. Makanan mentah dan makanan masak mesti sentiasa diasingkan dan bertutup rapat.',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.1 • Pencegahan Pencemaran Silang dalam Penyediaan Makanan',
  },
  {
    id: 'hs-4',
    pinNumber: 4,
    x: 52,
    y: 65,
    zone: 'penyediaan',
    zoneLabel: 'Zon Penyediaan',
    title: 'Papan Pemotong Kayu Retak & Berkulat',
    description:
      'Papan pemotong kayu mempunyai rekahan dalam berwarna kehitaman dan digunakan secara bergilir untuk memotong daging mentah serta ulam-ulaman.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'Apakah tindakan pembetulan terbaik mengikut amalan sanitasi dapur KKM?',
    options: [
      'Bilas dengan air paip biasa dan jemur di luar dapur selama 10 minit.',
      'Buang papan retak dan gantikan dengan papan pemotong berkod warna (cth: merah untuk daging mentah, hijau untuk sayur).',
      'Terbalikkan permukaan papan supaya bahagian retak berada di bawah.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Rekahan pada papan pemotong kayu memerangkap kelembapan, sisa daging dan bakteria yang sukar disanitasi. Gunakan papan pemotong polietilena berkod warna berasingan untuk bahan mentah dan bahan sedia dimakan.',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.1 • Pemilihan & Penjagaan Peralatan Dapur (Kod Warna Papan Pemotong)',
  },
  {
    id: 'hs-5',
    pinNumber: 5,
    x: 68,
    y: 25,
    zone: 'memasak',
    zoneLabel: 'Zon Memasak',
    title: 'Hud Penyedut Asap Berminyak & Menitis',
    description:
      'Penapis hud penyedut asap (exhaust hood) di atas dapur gas dilitupi lapisan minyak hitam melekit yang hampir menitis ke dalam periuk sup.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'Mengapakah hud penyedut asap yang kotor dianggap pelanggaran serius di dapur komersial?',
    options: [
      'Minyak kotor berisiko menitis mencemari makanan di bawahnya serta menjadi bahaya kebakaran dapur.',
      'Ia hanya menjejaskan estetika dapur dan tidak memberi kesan kepada keselamatan makanan.',
      'Lapisan minyak membantu menapis wap air daripada masuk ke dalam cerobong.',
    ],
    correctOptionIndex: 0,
    explanation:
      'Hud penyedut asap yang tidak dicuci menyebabkan titisan gris teroksida jatuh ke dalam makanan (pencemaran kimia/fizikal), melemahkan pengudaraan, dan meningkatkan risiko kebakaran minyak di dapur.',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.1 • Kebersihan Ruang Kerja, Pengudaraan & Keselamatan Dapur',
  },
  {
    id: 'hs-6',
    pinNumber: 6,
    x: 75,
    y: 54,
    zone: 'memasak',
    zoneLabel: 'Zon Memasak',
    title: 'Pengendali Merasa Kuah Guna Senduk Masak',
    description:
      'Tukang masak menyedok kuah kari menggunakan senduk memasak utama, merasanya terus dengan mulut, lalu mencelup semula senduk itu ke dalam periuk.',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    isViolation: true,
    question:
      'Apakah kaedah merasa makanan yang betul mengikut etika pengendalian makanan?',
    options: [
      'Tiup kuah pada senduk utama terlebih dahulu sebelum merasanya supaya bakteria mati.',
      'Gunakan dua sudu berasingan (tuang dari senduk masak ke sudu rasa bersih yang dicuci selepas setiap rasa).',
      'Benarkan tindakan tersebut kerana kuah sedang mendidih pada suhu tinggi.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Mencelup semula sudu yang terkena air liur ke dalam masakan memindahkan mikroorganisma daripada mulut ke seluruh hidangan. Sentiasa gunakan kaedah dua sudu atau sudu pakai buang yang bersih.',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.2 • Amalan Baik Pengendali Makanan Semasa Memasak',
  },
  {
    id: 'hs-7',
    pinNumber: 7,
    x: 61,
    y: 74,
    zone: 'memasak',
    zoneLabel: 'Zon Memasak',
    title: 'Rak Peralatan Keluli Tahan Karat Bersih',
    description:
      'Periuk dan kuali keluli tahan karat telah dicuci, disanitasi, dikeringkan secara udara (air-dried), dan disusun terbalik di atas rak setinggi 30 cm dari lantai.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: false,
    question:
      'Apakah status pematuhan penyimpanan peralatan dapur pada rak ini?',
    options: [
      'Pelanggaran — peralatan mesti dilap menggunakan kain kapas lembap sebelum disimpan.',
      'Pelanggaran — peralatan mesti diletakkan terus di atas lantai supaya tidak jatuh.',
      'Mematuhi piawaian KKM — peralatan kering secara udara, disusun terbalik & sekurang-kurangnya 15 cm dari lantai.',
    ],
    correctOptionIndex: 2,
    explanation:
      'Syabas! Pengeringan udara (air-drying) mengelakkan pencemaran semula daripada kain lap, kedudukan terbalik menghalang habuk/serangga masuk, dan jarak ≥15 cm dari lantai memudahkan pembersihan lantai.',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.1 • Pencucian, Sanitasi & Penyimpanan Peralatan Dapur',
  },
  {
    id: 'hs-8',
    pinNumber: 8,
    x: 89,
    y: 66,
    zone: 'sisa',
    zoneLabel: 'Zon Sisa',
    title: 'Tong Sampah Tanpa Penutup & Tiada Pedal Kaki',
    description:
      'Tong sampah dapur terbuka luas tanpa penutup atau pedal kaki, tidak dilapik plastik sampah, dan sisa makanan melimpah menarik lalat.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'Bagaimanakah ciri tong sampah dapur yang memenuhi piawaian sanitasi KKM?',
    options: [
      'Tong sampah bertutup rapat, dikendalikan dengan pedal kaki, dilapik beg plastik, dan dikosongkan apabila ¾ penuh.',
      'Tong sampah terbuka supaya pekerja tidak perlu menyentuh penutup dengan tangan.',
      'Tong sampah hanya perlu dikosongkan seminggu sekali untuk menjimatkan plastik.',
    ],
    correctOptionIndex: 0,
    explanation:
      'Tong sampah di dapur wajib mempunyai penutup rapat dan pedal kaki agar tangan pengendali tidak tercemar, dilapik plastik sampah untuk elak kebocoran, dan dibuang segera sebelum melimpah bagi mencegah kehadiran lalat dan tikus.',
    textbookReference:
      'KSSM SRT T5 Subtopik 2.1 • Pengurusan Sisa Makanan & Kawalan Makhluk Perosak',
  },
];

/**
 * LEVEL 3 DATASET — Subtopik 2.3: Penyimpanan Makanan, Rantaian Sejuk & FIFO
 */
export const level3Compartments: StorageCompartmentEnv[] = [
  {
    id: 'chiller',
    name: 'Peti Sejuk (Chiller)',
    englishName: 'Chiller Unit',
    ambientTemp: 3,
    idealTempMin: 0,
    idealTempMax: 4,
    idealRangeLabel: '0°C hingga 4°C',
    isAmbientCompliant: true,
    ambientNote: 'Suhu ruang mematuhi zon selamat chiller (di bawah 5°C).',
  },
  {
    id: 'freezer',
    name: 'Peti Sejuk Beku (Freezer)',
    englishName: 'Deep Freezer',
    ambientTemp: -18,
    idealTempMin: -24,
    idealTempMax: -18,
    idealRangeLabel: '≤ -18°C',
    isAmbientCompliant: true,
    ambientNote: 'Suhu ruang beku mematuhi piawaian penyimpanan beku KKM.',
  },
  {
    id: 'dry_store',
    name: 'Stor Kering (Dry Store)',
    englishName: 'Dry Storage',
    ambientTemp: 19,
    idealTempMin: 10,
    idealTempMax: 21,
    idealRangeLabel: '10°C hingga 21°C',
    isAmbientCompliant: true,
    ambientNote: 'Suhu persekitaran kering, berventilasi dan terkawal (≤ 21°C).',
  },
];

/**
 * 6 Storage Items (2 Safe, 4 Unsafe — covering every KSSM Subtopik 2.3 rule):
 * - Cross-contamination shelf order (raw above cooked)
 * - Safe chilled dairy (0–4°C, intact)
 * - Thawing/Danger zone freezer item (-5°C)
 * - Safe vacuum-packed frozen meat (-19°C)
 * - Dented can stored directly on floor (< 15 cm off floor)
 * - Authentic 2-batch FIFO violation in dry store
 */
export const level3StorageItems: StorageItem[] = [
  {
    id: 'store-1',
    name: 'Ayam Mentah Tanpa Penutup (Rak Atas)',
    categoryLabel: 'Protein Mentah',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'chiller',
    currentTemp: 3,
    idealTempMin: 0,
    idealTempMax: 4,
    packagingCondition: 'uncovered',
    packagingLabel: 'Bekas terbuka, cecair darah menitis',
    placementShelf: 'top',
    placementNote: 'Diletakkan di RAK ATAS, tepat di atas bekas sup & nasi masak di rak tengah!',
    dateReceivedOffsetDays: -1,
    expiryOffsetDays: 2,
    fifoComparisonNote: 'Stok tunggal — tarikh terima semalam.',
    isFIFOCompliant: true,
    isSafe: false,
    violationOptions: [
      'Pencemaran silang — ayam mentah terbuka di rak atas makanan masak',
      'Suhu peti sejuk melebihi Zon Suhu Bahaya (60°C)',
      'Tarikh luput produk telah berlalu 30 hari',
    ],
    correctViolationIndex: 0,
    defectReason:
      'Ayam mentah tidak bertutup di rak atas menyebabkan cecair mentah (darah/jus) menitis ke makanan siap dimakan di rak bawah. Makanan masak wajib di rak atas, manakala daging/ayam mentah bertutup rapat wajib di rak paling bawah.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.3 • Susunan Penyimpanan Peti Sejuk & Pencegahan Pencemaran Silang',
  },
  {
    id: 'store-2',
    name: 'Susu Segar Pasteur & Kuih Bertutup',
    categoryLabel: 'Tenusu & Makanan Sedia Dimakan',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'chiller',
    currentTemp: 3,
    idealTempMin: 0,
    idealTempMax: 4,
    packagingCondition: 'intact',
    packagingLabel: 'Bertutup rapat, berlabel tarikh & kedap udara',
    placementShelf: 'middle',
    placementNote: 'Disusun kemas di RAK TENGAH, berasingan daripada bahan mentah di rak bawah.',
    dateReceivedOffsetDays: -2,
    expiryOffsetDays: 6,
    fifoComparisonNote: 'Batch lebih lama diletakkan di bahagian hadapan (FIFO dipatuhi).',
    isFIFOCompliant: true,
    isSafe: true,
    violationOptions: [
      'Suhu melebihi 4°C',
      'Pembungkusan rosak dan terbuka',
      'Pelanggaran susunan rak',
    ],
    correctViolationIndex: -1,
    defectReason:
      'Selamat disimpan! Suhu teras +3°C berada dalam julat selamat chiller (0°C–4°C), pembungkusan bertutup rapat, berlabel jelas, dan mematuhi prinsip FIFO.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.3 • Pengawalan Suhu Peti Sejuk (0°C–4°C) & Pelabelan',
  },
  {
    id: 'store-3',
    name: 'Ikan Siakap Sejuk Beku (Nyahbeku Separa)',
    categoryLabel: 'Hasil Laut Sejuk Beku',
    subtopic: '2.3',
    category: 'suhu_stor',
    compartment: 'freezer',
    currentTemp: -5,
    idealTempMin: -24,
    idealTempMax: -18,
    packagingCondition: 'damaged',
    packagingLabel: 'Plastik koyak, hablur ais besar & tekstur lembik',
    placementShelf: 'middle',
    placementNote: 'Diletakkan berhampiran pintu freezer yang kerap dibuka tutup.',
    dateReceivedOffsetDays: -14,
    expiryOffsetDays: 45,
    fifoComparisonNote: 'Suhu teras ikan meningkat ke -5°C (keluar dari julat beku -18°C).',
    isFIFOCompliant: true,
    isSafe: false,
    violationOptions: [
      'Suhu penyimpanan terlalu tinggi (-5°C, zon nyahbeku tidak selamat) & bungkusan koyak',
      'Diletakkan di stor kering tanpa rak bertingkat',
      'Makanan masak bercampur dengan tin kemek',
    ],
    correctViolationIndex: 0,
    defectReason:
      'Makanan sejuk beku mesti dikekalkan pada suhu -18°C atau lebih rendah. Suhu -5°C menyebabkan nyahbeku separa, kerosakan tekstur (freezer burn), dan menggalakkan pertumbuhan bakteria apabila dibekukan semula.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.3 • Rantaian Sejuk & Penyimpanan Sejuk Beku (≤ -18°C)',
  },
  {
    id: 'store-4',
    name: 'Daging Lembu Pek Vakum',
    categoryLabel: 'Daging Sejuk Beku',
    subtopic: '2.3',
    category: 'suhu_stor',
    compartment: 'freezer',
    currentTemp: -19,
    idealTempMin: -24,
    idealTempMax: -18,
    packagingCondition: 'intact',
    packagingLabel: 'Pek vakum utuh, kedap udara & berlabel tarikh terima',
    placementShelf: 'bottom',
    placementNote: 'Disusun kemas di RAK BAWAH dengan ruang pengaliran udara sejuk.',
    dateReceivedOffsetDays: -10,
    expiryOffsetDays: 120,
    fifoComparisonNote: 'Stok lebih awal disusun di hadapan (FIFO dipatuhi).',
    isFIFOCompliant: true,
    isSafe: true,
    violationOptions: [
      'Suhu terlalu tinggi melebihi -18°C',
      'Pembungkusan koyak',
      'Pelanggaran peraturan FIFO',
    ],
    correctViolationIndex: -1,
    defectReason:
      'Selamat disimpan! Daging lembu dipek vakum dengan sempurna pada suhu -19°C (≤ -18°C), mempunyai label tarikh jelas, dan mengikut giliran stok FIFO.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.3 • Penyimpanan Sejuk Beku & Pengawalan Rantaian Sejuk',
  },
  {
    id: 'store-5',
    name: 'Tin Sardin Kemek & Berkarat di Atas Lantai',
    categoryLabel: 'Makanan Dalam Tin',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'dry_store',
    currentTemp: 19,
    idealTempMin: 10,
    idealTempMax: 21,
    packagingCondition: 'damaged',
    packagingLabel: 'Bahagian kelim tin kemek teruk & kesan karat',
    placementShelf: 'floor',
    placementNote: 'Karton tin diletakkan TERUS DI ATAS LANTAI tanpa palet (jarak 0 cm).',
    dateReceivedOffsetDays: -60,
    expiryOffsetDays: 180,
    fifoComparisonNote: 'Tarikh luput masih jauh, tetapi struktur tin telah rosak.',
    isFIFOCompliant: true,
    isSafe: false,
    violationOptions: [
      'Tin kemek/berkarat (risiko botulisme) & disimpan terus di atas lantai (< 15 cm)',
      'Suhu stor kering terlalu sejuk di bawah 0°C',
      'Ayam mentah menitis ke atas tin makanan',
    ],
    correctViolationIndex: 0,
    defectReason:
      'Tin makanan yang kemek pada kelim atau berkarat berisiko menyebabkan kebocoran mikro dan keracunan bakteria Clostridium botulinum. Selain itu, semua bahan makanan kering wajib disimpan sekurang-kurangnya 15 cm dari lantai dan 15 cm dari dinding.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.3 • Penyimpanan Bahan Kering (Jarak 15 cm & Pemeriksaan Tin)',
  },
  {
    id: 'store-6',
    name: 'Tepung Gandum & Susu Pekat (Susunan Stok Terbalik)',
    categoryLabel: 'Bahan Kering Berpaket',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'dry_store',
    currentTemp: 19,
    idealTempMin: 10,
    idealTempMax: 21,
    packagingCondition: 'intact',
    packagingLabel: 'Pembungkusan utuh, tetapi Batch Lama terperap di belakang hingga LUPUT',
    placementShelf: 'middle',
    placementNote:
      'Batch Baharu (luput +180 hari) disusun di HADAPAN, manakala Batch Lama di BELAKANG sudah luput 12 hari lalu!',
    dateReceivedOffsetDays: -95,
    expiryOffsetDays: -12,
    fifoComparisonNote:
      'PELANGGARAN FIFO: Stok masuk dahulu tidak dikeluarkan dahulu sehingga melepasi tarikh luput.',
    isFIFOCompliant: false,
    isSafe: false,
    violationOptions: [
      'Suhu peti sejuk melebihi 5°C',
      'Pelanggaran Peraturan FIFO (First In, First Out) menyebabkan stok lama luput',
      'Tiada penutup kepala semasa menyusun rak',
    ],
    correctViolationIndex: 1,
    defectReason:
      'Sistem FIFO (First In, First Out / Masuk Dahulu, Keluar Dahulu) gagal dipatuhi! Stok baharu diletakkan di hadapan menyebabkan stok lama terperap di belakang sehingga melepasi tarikh luput dan mesti disita/dilupuskan.',
    kssmReference:
      'KSSM SRT T5 Subtopik 2.3 • Pengurusan Stok & Peraturan FIFO (First In, First Out)',
  },
];

export const TOTAL_GAME_ITEMS =
  level1Staff.length + level2KitchenHotspots.length + level3StorageItems.length;

export function getSubtopicTotals(): Record<SubtopicCode, number> {
  const totals: Record<SubtopicCode, number> = { '2.1': 0, '2.2': 0, '2.3': 0 };
  for (const item of level1Staff) totals[item.subtopic] += 1;
  for (const item of level2KitchenHotspots) totals[item.subtopic] += 1;
  for (const item of level3StorageItems) totals[item.subtopic] += 1;
  return totals;
}
