# Riset Kandidat Skenario Baru untuk Simulator Front Office Hotel

**Konteks:** pelatihan Abel sebagai Azubi *Hotelfachmann* di TRIHOTEL Rostock, Jerman.  
**Ruang lingkup:** simulator *local-first*, vanilla JS, dengan pengalaman pembelajaran trilingual **DE/EN/ID**.  
**Tujuan:** memilih skenario baru yang melatih keputusan resepsion, bahasa operasional, kepatuhan SOP, keselamatan, serta keamanan—bukan sekadar dialog layanan rutin.

## Kesimpulan eksekutif

Standar nasional untuk *Hotelfachmann/Hotelfachfrau* menempatkan reservasi, resepsion, komunikasi dan manajemen keluhan, serta organisasi area resepsion/reservasi sebagai kompetensi inti. Kerangka ini juga menuntut koordinasi lintas departemen, penanganan pembayaran dan data, penggunaan sistem hotel, serta penerapan keselamatan, kesehatan kerja, higiene, digitalisasi, dan keberlanjutan. [1] [2] IHK Potsdam memperlihatkan relevansi asesmennya secara konkret: pada bagian pertama ujian akhir, salah satu dari dua tugas kerja wajib berhubungan dengan pekerjaan di resepsion dan disertai *situatives Fachgespräch*. [3]

> *HotelAusbV* mengharuskan Azubi menjalankan tugas tamu dan mengoordinasikannya dengan departemen hotel lain atau pihak eksternal. [2]

Delapan kandidat di bawah sengaja menghindari bentuk paling generik—check-in, check-out, reservasi biasa, dan keluhan biasa—agar memperluas 12 skenario yang telah ada. Karena daftar 12 skenario terdahulu tidak disertakan, rekomendasi ini diperlakukan sebagai **backlog kategori baru**; sebelum diproduksi, tim sebaiknya cukup melakukan *overlap check* terhadap judul dan tujuan belajar yang sudah ada, bukan mengubah arah prioritasnya.

| Rekomendasi implementasi | Alasan ringkas |
|---|---|
| **1. Kunci duplikat, identitas, dan kerahasiaan kamar** | Menggabungkan keamanan fisik, perlindungan data, de-eskalasi, serta keputusan resepsion yang sangat auditabel. |
| **2. PMS tidak tersedia dan panggilan “teknisi” mencurigakan** | Menutup gap modern pada cybersecurity dan kesinambungan layanan tanpa bergantung pada sistem online nyata. |
| **3. Alarm kebakaran ketika lobi sedang penuh** | Melatih keselamatan jiwa, batas peran, instruksi DE/EN yang jelas, serta eksekusi alarmplan hotel. |

## Dasar pemetaan ke standar IHK dan praktik hotel

BIBB merangkum profil profesi ini dengan pekerjaan reservasi dan resepsion, penjualan kamar/layanan, organisasi resepsion-reservasi, komunikasi tamu dan manajemen keluhan, serta penerimaan dan konsultasi tamu. [1] *Ausbildungsrahmenplan* dalam HotelAusbV 2022 menerjemahkannya menjadi kompetensi operasional: check-in/check-out dan pembayaran, ketentuan pelaporan dengan perlindungan data, reservasi/pembatalan, PMS, komunikasi keluhan, serah-terima shift, rekonsiliasi kanal reservasi, checklist resepsion, serta penutupan harian. [2]

Dari sudut keamanan, panduan DEHOGA menilai resepsion hotel sangat terekspos karena memproses data tamu sensitif sekaligus berada di area publik. Panduan tersebut secara khusus menyoroti phishing, rekayasa sosial melalui penelepon yang mengaku teknisi, dan media USB asing. [4] Untuk keadaan darurat, pedoman DEHOGA menggarisbawahi perlunya alarmplan, rantai penyelamatan, jalur evakuasi yang bebas, petugas P3K, dan dokumentasi. [5]

| Prinsip desain simulator | Penerapan yang dianjurkan |
|---|---|
| **SOP didahulukan daripada improvisasi** | Setiap node selalu memberi opsi: verifikasi fakta → nilai risiko → ikuti otorisasi/eskalasi → dokumentasikan dan handover. |
| **Bahasa sebagai tindakan operasional** | Dialog utama tersedia dalam DE dan EN; ID dipakai untuk coaching, glosarium, dan alasan keputusan. Jangan menilai aksen, tetapi nilai kejelasan, kesantunan, dan keamanan pesan. |
| **Local-first dan aman** | Gunakan PMS dummy, nama tamu fiktif, dokumen contoh, dan log lokal. Jangan masukkan SOP internal, kontak darurat, atau data pribadi nyata ke paket publik. |
| **Selaras dengan ujian situasional** | Setelah keputusan, tampilkan *micro-debrief*: “Fakta apa yang diverifikasi?”, “SOP apa yang berlaku?”, “Siapa yang Anda hubungi?”, dan “Apa yang dicatat?” |

## Delapan kandidat skenario

### 1. Kunci Duplikat, Identitas, dan Kerahasiaan Kamar

| Elemen | Outline |
|---|---|
| **Kategori** | Keamanan fisik dan perlindungan data; berbeda dari check-in normal. |
| **Node keputusan (4 langkah)** | **1.** Seorang tamu mengaku kehilangan kartu kunci dan mendesak resepsion untuk menyebut nomor kamar. Azubi menjaga percakapan tetap privat dan tidak mengonfirmasi status/nomor kamar. **2.** Azubi memilih verifikasi identitas sesuai SOP TRIHOTEL dan memeriksa PMS tanpa membocorkan data tamu lain. **3.** Jika verifikasi tidak cukup, Azubi menolak penerbitan kunci secara sopan, menawarkan langkah aman yang diizinkan, lalu mengeskalasi ke supervisor/security. **4.** Setelah otorisasi, Azubi mereset akses atau menyelesaikan proses yang ditentukan, mendokumentasikan kejadian, dan handover. |
| **Tiga sumbu training** | **Decision:** membedakan layanan membantu dari pembukaan akses yang tidak sah. **Language:** penolakan santun dan batas keamanan dalam DE/EN. **SOP:** identity check, larangan mengungkap nomor/status kamar, penerbitan kunci, incident log, eskalasi. |
| **Relevansi IHK/praktik** | Memetakan penerimaan tamu, perlindungan data saat menjalankan resepsion, koordinasi tugas tamu, dan respons situasional terhadap keluhan. [2] Ini mencerminkan risiko nyata area resepsion yang memproses data sensitif dan dapat diakses publik. [4] |

### 2. PMS Tidak Tersedia dan Panggilan “Teknisi” Mencurigakan

| Elemen | Outline |
|---|---|
| **Kategori** | Keamanan siber dan kesinambungan operasional resepsion. |
| **Node keputusan (4 langkah)** | **1.** Saat lobi ramai, PMS lambat/tidak dapat diakses dan penelepon yang mengaku teknisi meminta kata sandi atau akses jarak jauh. **2.** Azubi memverifikasi penelepon melalui kontak resmi; ia tidak membuka tautan/lampiran dan tidak memberikan kredensial. **3.** Azubi memberi tahu duty manager/IT dan menjalankan fallback check-in yang disetujui hotel, dengan data minimum serta catatan manual yang diamankan. **4.** Azubi menjelaskan gangguan secara profesional dalam DE/EN, mencatat dampak, dan menyerahkan status kepada shift berikutnya. |
| **Tiga sumbu training** | **Decision:** mengenali *social engineering* sekaligus menjaga layanan berjalan. **Language:** verifikasi panggilan dan pemberitahuan gangguan profesional DE/EN. **SOP:** incident response, fallback PMS, data minimisation, dokumentasi, handover. |
| **Relevansi IHK/praktik** | Kerangka latihan mencakup penggunaan sistem hotel, organisasi resepsion, proses kantor dengan keamanan data/TI, dan keterampilan digital. [2] DEHOGA secara spesifik memperingatkan terhadap panggilan teknisi palsu, tautan/lampiran mencurigakan, serta USB asing di resepsion. [4] |

### 3. Alarm Kebakaran Ketika Lobi Sedang Penuh

| Elemen | Outline |
|---|---|
| **Kategori** | Keselamatan jiwa dan respons darurat. |
| **Node keputusan (4 langkah)** | **1.** Alarm terdengar di tengah antrean check-in; Azubi langsung memperlakukan ini sebagai situasi alarm dan mengikuti alarmplan hotel—tanpa menonaktifkan/menafsirkan alarm sendiri. **2.** Ia mengaktifkan rantai notifikasi sesuai peran, menyampaikan fakta yang diverifikasi, dan tidak melakukan tindakan di luar pelatihan/otorisasi. **3.** Ia memberi instruksi singkat, tenang, dan konsisten dalam DE/EN; ia mendukung kebutuhan aksesibilitas sesuai rencana hotel dan menjaga jalur evakuasi bebas. **4.** Di titik kumpul, ia menjalankan tugas yang ditetapkan dan mencatat informasi setelah situasi aman. |
| **Tiga sumbu training** | **Decision:** keselamatan di atas kenyamanan layanan dan pengenalan batas peran. **Language:** instruksi darurat ringkas DE/EN serta verifikasi pemahaman. **SOP:** alarmplan, evacuation/accessibility plan, rantai notifikasi, titik kumpul, dokumentasi. |
| **Relevansi IHK/praktik** | Keselamatan dan kesehatan kerja merupakan kualifikasi integratif dalam pelatihan Hotelfach. [3] Pedoman DEHOGA menempatkan perlindungan tamu/staf, alarmplan, jalur penyelamatan, P3K, dan rantai penyelamatan sebagai kesiapsiagaan hotel. [5] |

### 4. Overbooking dari OTA dan Keputusan “Walk”

| Elemen | Outline |
|---|---|
| **Kategori** | Reservasi, channel management, dan service recovery. |
| **Node keputusan (4 langkah)** | **1.** Tamu dengan konfirmasi OTA tiba, tetapi kamar tidak tersedia karena mismatch inventori atau kamar *out of order*. **2.** Azubi memeriksa reservasi, jaminan, dan status kamar; ia tidak menyalahkan OTA atau kolega di depan tamu. **3.** Ia meminta otorisasi solusi, mencari alternatif melalui partner yang disetujui, lalu menjelaskan pilihan, transportasi/biaya yang disetujui, dan langkah berikutnya dalam DE/EN. **4.** Ia mendokumentasikan kasus dan menyiapkan handover untuk pemulihan layanan. |
| **Tiga sumbu training** | **Decision:** urutan verifikasi, otorisasi, dan mitigasi layanan. **Language:** permintaan maaf tanpa janji/komitmen yang tidak berwenang. **SOP:** PMS/OTA reconciliation, room-out-of-order, partner walk policy, dokumentasi. |
| **Relevansi IHK/praktik** | HotelAusbV memuat kontrol reservasi, perbandingan dengan kanal eksternal, penyiapan kedatangan grup, channel management, dan koordinasi dengan area terkait. [2] |

### 5. Kedatangan Grup Lebih Awal dengan Kebutuhan Aksesibilitas

| Elemen | Outline |
|---|---|
| **Kategori** | Operasi grup, koordinasi lintas departemen, dan layanan inklusif. |
| **Node keputusan (4 langkah)** | **1.** Rombongan tiba lebih awal; beberapa kamar belum siap dan terdapat kebutuhan aksesibilitas dalam rooming list. **2.** Azubi mengonfirmasi kebutuhan prioritas dengan hormat, memeriksa status kamar aktual bersama housekeeping, dan tidak menjanjikan waktu tanpa konfirmasi. **3.** Ia mengatur penitipan bagasi/area tunggu/informasi fasilitas sesuai SOP dan mendistribusikan informasi/kunci dengan privasi terjaga. **4.** Ia menyelaraskan rooming list, penjaminan yang relevan, dan permintaan khusus dengan housekeeping, F&B, serta duty manager. |
| **Tiga sumbu training** | **Decision:** menyeimbangkan kebutuhan aksesibilitas, kesiapan kamar, dan arus grup. **Language:** klarifikasi kebutuhan secara hormat serta pengarahan grup DE/EN. **SOP:** rooming list, room status, early-arrival/luggage process, koordinasi, privasi. |
| **Relevansi IHK/praktik** | Kerangka pelatihan memuat persiapan grup, koordinasi kamar dengan data kedatangan/keberangkatan dan kebutuhan khusus tamu, serta perhatian terhadap kebutuhan individual termasuk tamu dengan disabilitas. [2] |

### 6. Selisih Kas dan Tagihan Kartu pada Penutupan Shift

| Elemen | Outline |
|---|---|
| **Kategori** | Kontrol internal, pembayaran, dan integritas dokumen. |
| **Node keputusan (4 langkah)** | **1.** Saat penutupan shift, Azubi menemukan selisih kas dan transaksi kartu yang tampak terposting dua kali. **2.** Ia membandingkan transaksi dengan bukti internal yang berwenang dan menahan refund/pembebanan ulang sampai otorisasi diperoleh. **3.** Ia mengeskalasi ke supervisor/finance, mengamankan bukti, dan melakukan koreksi hanya melalui prosedur yang dapat diaudit. **4.** Bila tamu bertanya, ia menjelaskan bahwa kasus sedang diperiksa, menawarkan kanal tindak lanjut yang disetujui, dan tidak membahas data pembayaran di area publik. |
| **Tiga sumbu training** | **Decision:** tidak “menutup” selisih dengan solusi instan dan mengenali batas otorisasi. **Language:** penjelasan investigasi tagihan yang tenang dalam DE/EN. **SOP:** day-end, payment proof, approval/refund control, privacy, audit trail. |
| **Relevansi IHK/praktik** | Kompetensi resepsion mencakup pemeriksaan, penjelasan, pembuatan, dan penyelesaian tagihan; organisasi resepsion juga mencakup kontrol pembayaran dan penutupan harian. [2] |

### 7. Keluhan Kebisingan yang Berubah Menjadi Ancaman Keamanan Malam Hari

| Elemen | Outline |
|---|---|
| **Kategori** | De-eskalasi konflik, *welfare check*, dan keamanan night shift. |
| **Node keputusan (4 langkah)** | **1.** Tamu melapor mendengar teriakan dan benda pecah di kamar sebelah serta meminta nomor kamar/penghuni. **2.** Azubi menerima fakta tanpa mengonfirmasi informasi kamar, menilai indikator bahaya segera, dan menghubungi night manager/security sesuai jalur. **3.** Ia menggunakan bahasa de-eskalasi, tidak melakukan konfrontasi seorang diri, dan menjalankan eskalasi darurat bila ambang dalam SOP terpenuhi. **4.** Ia mencatat fakta, waktu, pihak yang dihubungi, serta tindakan; hanya meneruskan informasi ke pihak berwenang dan dalam handover shift. |
| **Tiga sumbu training** | **Decision:** keselamatan, batas intervensi, dan kerahasiaan. **Language:** de-eskalasi serta komunikasi keamanan DE/EN. **SOP:** threat escalation, night-security coordination, incident log, privacy. |
| **Relevansi IHK/praktik** | Menyatukan komunikasi/keluhan berbasis situasi, koordinasi dengan area terkait, penyelesaian konflik, dan perlindungan data. [2] Catatan: ambang eskalasi harus disetel persis pada konsep keamanan hotel dan prosedur lokal. |

### 8. Kebocoran Air di Kamar dan Relokasi Tamu dengan Aman

| Elemen | Outline |
|---|---|
| **Kategori** | Gangguan fasilitas, koordinasi housekeeping/engineering, dan pemulihan layanan. |
| **Node keputusan (4 langkah)** | **1.** Tamu melapor plafon bocor dan lantai basah; Azubi mengumpulkan fakta awal, memberi instruksi aman sesuai SOP, dan tidak mengarahkan tamu kembali ke area berisiko. **2.** Ia memblokir penggunaan/penjualan kamar lewat alur berwenang lalu menghubungi engineering, housekeeping, dan duty manager. **3.** Ia mencari kamar pengganti sesuai ketersediaan/kebutuhan, mengoordinasikan pemindahan barang dan akses baru, serta menjelaskan proses dalam DE/EN. **4.** Ia mencatat *room move*, status *out of order*, permintaan tamu, dan tindak lanjut. |
| **Tiga sumbu training** | **Decision:** keselamatan fisik dan status kamar yang akurat. **Language:** instruksi aman, empati, dan penjelasan relokasi DE/EN. **SOP:** engineering escalation, room status, re-key/room move, complaint follow-up, dokumentasi. |
| **Relevansi IHK/praktik** | Pelatihan memuat pemeriksaan keselamatan kamar, penentuan kebutuhan perbaikan, koordinasi housekeeping, dan tugas tamu lintas departemen. [2] |

## Tabel prioritas

Skor memakai skala 1–5 dengan bobot: relevansi langsung terhadap kompetensi/asesmen IHK **35%**, keselamatan dan keamanan **25%**, kedalaman SOP/koordinasi/dokumentasi **20%**, nilai latihan DE/EN **15%**, serta diferensiasi dari skenario front desk rutin **5%**. Ini adalah penilaian desain yang transparan, bukan hasil survei empiris.

| Rank | Kandidat | IHK 35% | Safety/security 25% | SOP 20% | DE/EN 15% | Diferensiasi 5% | Skor / 5 | Keputusan |
|---:|---|---:|---:|---:|---:|---:|---:|---|
| 1 | Kunci duplikat, identitas, dan kerahasiaan kamar | 5 | 5 | 5 | 5 | 4 | **4,95** | Implementasi pertama |
| 2 | PMS tidak tersedia dan panggilan “teknisi” mencurigakan | 5 | 5 | 5 | 4 | 4 | **4,80** | Implementasi pertama |
| 3 | Alarm kebakaran ketika lobi sedang penuh | 5 | 4 | 5 | 5 | 5 | **4,75** | Implementasi pertama |
| 4 | Keluhan kebisingan menjadi ancaman keamanan malam hari | 5 | 4 | 5 | 5 | 4 | 4,70 | Cadangan teratas |
| 5 | Kedatangan grup lebih awal dengan kebutuhan aksesibilitas | 5 | 5 | 4 | 4 | 5 | 4,65 | Gelombang berikutnya |
| 6 | Overbooking OTA dan keputusan “walk” | 5 | 4 | 5 | 4 | 4 | 4,55 | Gelombang berikutnya |
| 7 | Selisih kas dan tagihan kartu pada penutupan shift | 5 | 3 | 5 | 5 | 4 | 4,45 | Setelah modul inti |
| 8 | Kebocoran air dan relokasi tamu dengan aman | 5 | 4 | 5 | 3 | 5 | 4,45 | Setelah modul inti |

## Mengapa tiga terbaik harus didahulukan

### 1. Kunci duplikat, identitas, dan kerahasiaan kamar

Ini adalah kasus berfrekuensi masuk akal di resepsion dan berkonsekuensi tinggi apabila salah ditangani. Azubi harus menahan dorongan untuk menyelesaikan masalah secepat mungkin, lalu membuktikan bahwa layanan yang baik tetap dapat tegas pada keamanan. Secara pedagogis, cabang salah dapat menjelaskan risiko secara aman—misalnya kebocoran informasi atau akses tanpa verifikasi—tanpa menggunakan data nyata. Ini juga memberi peluang dialog DE/EN yang sangat dapat dipakai kembali: menolak dengan sopan, meminta verifikasi, dan menawarkan alternatif aman.

### 2. PMS tidak tersedia dan panggilan “teknisi” mencurigakan

Kandidat ini mengintegrasikan *digitalisierte Arbeitswelt* dengan perilaku resepsion yang konkret. Skenario bukan tes pengetahuan teknis tentang malware: Azubi cukup mengidentifikasi sinyal, menggunakan jalur verifikasi resmi, menjaga data dan kredensial, menerapkan prosedur kerja manual yang disetujui, serta mengomunikasikan gangguan ke tamu dengan realistis. Local-first cocok untuk skenario ini karena seluruh artefak—layar PMS dummy, nomor internal dummy, log fallback, dan pesan phishing tiruan—dapat dibuat offline dan aman.

### 3. Alarm kebakaran ketika lobi sedang penuh

Kandidat ini mengajarkan prinsip yang paling penting: saat alarm, keselamatan tamu dan staf lebih tinggi daripada antrean, transaksi, atau target layanan. Namun, simulator harus berhati-hati: ia tidak boleh mengajari Azubi memutuskan apakah alarm “palsu”, melakukan pemadaman, atau memberi instruksi yang menggantikan alarmplan hotel. Yang dilatih adalah tindakan dalam peran resepsion: notifikasi yang benar, instruksi DE/EN sederhana, dukungan terhadap aksesibilitas sesuai rencana, dan dokumentasi setelah keadaan dinyatakan aman.

## Guardrail implementasi untuk TRIHOTEL

Setiap alur harus dikonfigurasi dari SOP TRIHOTEL yang benar-benar berlaku: cara verifikasi identitas, batas otorisasi, kontak/role eskalasi, prosedur fallback PMS, kebijakan partner *walk*, dan alarmplan. Simulator sebaiknya memakai label seperti **“ikuti SOP hotel dan instruksi manajer/darurat yang berlaku”** ketika detail dapat berubah. Ini menghindari pembelajaran aturan yang kedaluwarsa atau terlalu generik.

Untuk skor, gunakan rubrik terpisah: **40% keputusan dan eskalasi**, **30% kepatuhan SOP/dokumentasi**, dan **30% komunikasi DE/EN**. Opsi berbahaya—seperti membagikan nomor kamar, memberikan password, menonaktifkan alarm sendiri, atau mengonfrontasi ancaman seorang diri—perlu menghasilkan umpan balik korektif yang langsung dan jelas. Pilihan bahasa yang lebih sederhana tetapi aman harus tetap dinilai baik; tujuan Azubi adalah komunikasi operasional yang benar, bukan retorika sempurna.

## Referensi

[1]: [BIBB — *Hotelfachmann/Hotelfachfrau (Ausbildung)*](https://www.bibb.de/dienst/berufesuche/de/index_berufesuche.php/profile/apprenticeship/hofa22)

[2]: [BIBB / Bundesgesetzblatt — *Hotelberufeausbildungsverordnung (HotelAusbV), 9 Maret 2022*, Anlage 1 Ausbildungsrahmenplan](https://www.bibb.de/dienst/berufesuche/de/index_berufesuche.php/regulation/Hotel%20und%20Gastronomie_2022.pdf)

[3]: [IHK Potsdam — *Hotelfachmann/-frau*: kompetensi dan struktur ujian](https://www.ihk.de/potsdam/aus-und-weiterbildung/ausbildungsplatzsuche2/berufe-a-bis-z/hotelfachmann-5474938)

[4]: [DEHOGA Baden-Württemberg — *Cybersicherheit im Gastgewerbe*](https://www.dehogabw.de/informieren/blog/cybersicherheit)

[5]: [DEHOGA Bundesverband — *Notfallvorsorge: Check Arbeitsbedingungen in Hotels und Gaststätten verbessern*](https://www.dehoga-bundesverband.de/fileadmin/Startseite/06_Presse/Leitfaden_Arbeitsgestaltung/3_Arbeitsorganisation/check_a_notfall_verbesserung.doc)
