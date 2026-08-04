---
title: "Hotel Scenario Lab v2 — Spesifikasi Fitur"
project: hotel-scenario-lab
doc_type: feature-spec
version: "2.0"
status: "final — siap diterjemahkan menjadi rencana implementasi"
date: 2026-08-04
baseline_commit: "9c3ebd0 (main) — v1, 12 skenario, validator 54/54 PASS"
v1_spec: "docs/superpowers/specs/2026-07-26-hotel-scenario-lab-design.md"
v1_plan: "docs/superpowers/plans/2026-07-26-hotel-scenario-lab-v1.md"
plan: "docs/superpowers/plans/2026-08-04-hotel-scenario-lab-v2.md"
brief: "BRIEF_V2.md"
spec_language: id
product_languages: [de, en, id]
platform: "situs web statis tanpa dependensi (HTML/CSS/JS peramban), berjalan dari file://"
storage: "localStorage tunggal hsl.v1 (schemaVersion tetap 1)"
---

# Hotel Scenario Lab v2 — Spesifikasi Fitur

## 0. Cara membaca dokumen ini

**Status.** Ini spesifikasi **inkremental** di atas v1. Spesifikasi desain v1 (`2026-07-26-hotel-scenario-lab-design.md`) tetap berlaku sepenuhnya sebagai sumber kebenaran untuk arsitektur, rubrik skor §9, skema penyimpanan §7, aksesibilitas §11, mode kegagalan §12, dan keselamatan konten §13. Dokumen ini **hanya** mendefinisikan tambahan dan perubahan v2. Bila terjadi pertentangan: garis merah v1 (§0 v1) menang > rubrik §9 v1 menang > dokumen ini > preferensi implementasi.

**Bahasa normatif.** **wajib** = keharusan mutlak; **dilarang** = larangan mutlak; **dianjurkan** = praktik terbaik yang boleh disimpangi dengan alasan tercatat; **boleh** = opsional.

**Garis merah v1 yang tetap berlaku tanpa pengecualian di v2:**

1. Nol permintaan jaringan (tanpa `fetch`, `XMLHttpRequest`, WebSocket, CDN, fon eksternal, analitik, formulir kirim).
2. Nol dependensi: hanya HTML/CSS/JS polos; tanpa pustaka, *framework*, *build step*, berkas paket, *service worker*.
3. Persistensi hanya `localStorage` dengan kunci `hsl.v1` dan `hsl.v1.corrupt`; tanpa *cookie*/`sessionStorage`/IndexedDB.
4. Skrip klasik ber-`defer` dalam IIFE `"use strict"`, ruang nama tunggal `window.HSL`; dilarang ES module, `eval`, atribut event sebaris, `innerHTML` berisi konten, gaya sebaris (kecuali properti `style` dari JS untuk lebar bilah/animasi, sebagaimana v1).
5. Trilingual penuh DE/EN/ID untuk setiap string UI dan setiap `Text3` konten.
6. Keselamatan konten v1 §13.2: fiksi total; tanpa klaim medis/hukum/keamanan otoritatif; satu-satunya fakta dunia nyata adalah nomor darurat 112; eskalasi patut tidak pernah dinilai 0; opsi salah tetap bermartabat.
7. Aksesibilitas v1 §11 tidak diturunkan (WCAG 2.2 AA, target sentuh ≥ 44 px, papan ketik penuh, `prefers-reduced-motion`, fallback tanpa JS).
8. `engine.js` tetap **murni**: tanpa DOM, tanpa `localStorage`, tanpa `Date`, tanpa `Math.random`, tanpa efek samping. Seluruh fungsi baru v2 di `engine.js` wajib memenuhi kemurnian ini (waktu masuk sebagai argumen string).

---

## 1. Ringkasan v2

v2 menambah lima kemampuan di atas basis v1 yang sudah berjalan:

| Kode | Fitur | Inti |
|---|---|---|
| F-A | **Tiga skenario baru pada kategori baru** | `fnb` (alergi saat sarapan), `housekeeping` (barang tertinggal / *Fundsachen*), `overbooking` (relokasi tamu / *walk*) |
| F-B | **Training des Tages** | satu skenario sorotan per tanggal, dipilih deterministik dari hash tanggal (tanpa acak, tanpa jaringan) |
| F-C | **Weak-axis drill** | deteksi sumbu terlemah dari `best` (decision/language/sop) → panel latihan fokus + lencana pada kartu |
| F-D | **Filter & sort katalog** | filter kategori + status + kesulitan; urutan default / nilai terbaik / kesulitan; pilihan bertahan di `localStorage` |
| F-E | **Retry dari langkah lemah** | setelah debrief, ulangi run mulai dari langkah *unsafe*/terlemah dengan memangkas `steps` (mesin tetap *immutable*) |

Konsekuensi terukur: 12 → **15 skenario**, 6 → **9 kategori**, validator 54 → **81 pemeriksaan**, seluruh 54 ID pemeriksaan lama tetap ada dan tetap PASS.

Alasan pedagogis pemilihan kategori baru (relevansi langsung untuk Azubi Hotelfachmann di hotel kota Rostock): kewajiban informasi alergen di layanan sarapan, prosedur barang temuan yang bersinggungan dengan privasi kamar, dan relokasi tamu saat rumah penuh adalah tiga situasi Front Office paling sering muncul yang **belum** tercakup v1 dan ketiganya melatih batas kewenangan + eskalasi (P5) dan dokumentasi (P6).

---

## 2. Kriteria keberhasilan v2

| ID | Kriteria | Verifikasi |
|---|---|---|
| SK-V2-1 | 15 skenario dapat dimainkan tuntas dalam ketiga bahasa; `tools/check.html` melaporkan **81/81 PASS**. | T-V2-01 |
| SK-V2-2 | Seluruh 54 ID pemeriksaan v1 (`DICT-PARITY`, `REG-ORDER`, `GOLD-A…D`, dan 4 × 12 `SC-*` skenario lama) masih ada dengan ID identik dan berstatus PASS. | T-V2-02 |
| SK-V2-3 | `schemaVersion` tetap `1`; blob progres v1 nyata (12 skenario, tanpa `settings.catalog`) dimuat tanpa kehilangan `attempts/completed/best/last`. | T-V2-03 |
| SK-V2-4 | Training des Tages menghasilkan slug **identik** untuk tanggal yang sama pada muat ulang, bahasa berbeda, dan progres berbeda; berubah saat tanggal berubah. | T-V2-04 |
| SK-V2-5 | Weak-axis drill menunjuk sumbu terendah yang benar untuk seluruh fixture §8.5, dan menahan diri (tanpa saran) bila sampel < 2. | T-V2-05 |
| SK-V2-6 | Filter+sort tidak pernah menggandakan/menghilangkan slug; hasil selalu himpunan bagian dari registri; pilihan bertahan setelah muat ulang. | T-V2-06 |
| SK-V2-7 | Retry dari langkah lemah memangkas `steps` tanpa memutasi run lama, dan run hasil dapat diselesaikan hingga skor lebih baik tercatat sebagai `best`. | T-V2-07 |
| SK-V2-8 | Nol permintaan jaringan dan nol dependensi baru; aplikasi tetap berjalan dari `file://`. | T-V2-08 |
| SK-V2-9 | Fallback tanpa JS tetap: katalog statis DE memuat **15** skenario, `<noscript>` tiga bahasa tampil, panel dinamis (TOTD/drill/filter) tersembunyi. | T-V2-09 |
| SK-V2-10 | Seluruh kontrol baru dapat dioperasikan hanya dengan papan ketik; perubahan filter diumumkan lewat `aria-live`; fokus tidak dirampas. | T-V2-10 |
| SK-V2-11 | Anggaran ukuran §14 terpenuhi: tiap berkas skenario baru ≤ 30 KiB; `css/styles.css` ≤ 45 KB; total `js/*.js` ≤ 70 KB. | T-V2-11 |
| SK-V2-12 | Daftar periksa keselamatan konten §15 ditandatangani lulus untuk tiga skenario baru. | T-V2-12 |
| SK-V2-13 | `prefers-reduced-motion` dan pengaturan gerak manual dihormati oleh panel baru; tanpa gulir horizontal pada 320/375/768/1024/1440 px. | T-V2-13 |

### 2.1 Matriks uji v2

| ID | Uji | Cara |
|---|---|---|
| T-V2-01 | Validator penuh | buka `tools/check.html`; jalankan `node tools/node-check.js` → `81/81` |
| T-V2-02 | Kompatibilitas 54 lama | `node tools/node-check.js --legacy` → mencetak 54 ID lama, semua PASS, tanpa ID hilang |
| T-V2-03 | Migrasi progres lama | tempel blob v1 ke `localStorage`, muat `index.html`, bandingkan `progress` sebelum/sesudah |
| T-V2-04 | Determinisme TOTD | pemeriksaan `TOTD-DET`/`TOTD-RANGE`/`TOTD-SPREAD` + muat ulang manual 3×, ganti bahasa |
| T-V2-05 | Weak-axis | pemeriksaan `WEAK-*` + uji manual dengan progres buatan |
| T-V2-06 | Filter/sort | pemeriksaan `CAT-*` + uji manual 9 kombinasi filter |
| T-V2-07 | Retry lemah | pemeriksaan `RETRY-*` + uji manual dari debrief |
| T-V2-08 | Nol jaringan | `grep -RniE "fetch\(|XMLHttpRequest\|https?://" -- *.html js data i18n css` → hanya URL skema SVG/namespace; DevTools Network kosong |
| T-V2-09 | Tanpa JS | matikan JS, buka `index.html` → 15 kartu terbaca, panel dinamis tak tampil |
| T-V2-10 | Papan ketik & pengumuman | Tab-only walkthrough; pembaca layar mengumumkan jumlah hasil |
| T-V2-11 | Anggaran | `wc -c` pada berkas skenario/CSS/JS |
| T-V2-12 | Keselamatan konten | daftar periksa §15 per skenario |
| T-V2-13 | Gerak & responsif | emulasi `prefers-reduced-motion: reduce`; lima lebar viewport |

---

## 3. Non-tujuan v2

1. Tanpa kenaikan `schemaVersion` (tetap 1); larik `migrations` tetap kosong — kompatibilitas dicapai lewat *tolerant read* (§5.3).
2. Tanpa skenario keempat/kelima di v2 (kandidat `payment` kartu ditolak, `pet policy`, `group arrival` → daftar tunda §16.2).
3. Tanpa pencarian teks bebas di katalog (tanpa input teks — permukaan risiko dan a11y tambahan tanpa manfaat pada 15 item).
4. Tanpa penyimpanan riwayat run (hanya `best`/`last` seperti v1); *retry dari langkah lemah* bekerja pada run aktif di memori/`activeRun`, bukan arsip.
5. Tanpa mode gelap, tanpa PWA, tanpa timer, tanpa ekspor/impor berkas.
6. Tanpa perubahan rubrik skor v1 §9 (bobot 40/25/35, ambang kunci, batas keselamatan 3 kunci) — nilai `best` lama wajib tetap sebanding.
7. Tanpa perubahan urutan 12 slug pertama registri dan tanpa penggantian nama berkas skenario lama.

---

## 4. Invarian kompatibilitas (wajib)

| INV | Isi |
|---|---|
| INV-1 | `HSL.data.order` **wajib** dimulai dengan 12 slug v1 pada posisi 1–12 dengan ejaan identik; slug baru hanya boleh ditambahkan setelahnya. |
| INV-2 | ID pemeriksaan validator lama tidak boleh diubah atau dihapus: `DICT-PARITY`, `REG-ORDER`, `SC-FIELDS-<slug>`, `SC-TEXT3-<slug>`, `SC-GRAF-<slug>`, `SC-RUBRIK-<slug>` (12 slug lama), `GOLD-A`…`GOLD-D`. |
| INV-3 | Semantik `engine.summarize`, `engine.createRun`, `engine.applyChoice`, `engine.currentNodeId`, `engine.isFinished`, `engine.recommendNext` tidak berubah. Fungsi v2 hanya **ditambahkan**. |
| INV-4 | Struktur `progress[slug]` tetap `{attempts, completed, best, last}` dengan bidang `best/last` = `{combined, decision, language, sop, keys, safe, at}`. |
| INV-5 | Bentuk `Scenario`/`Node`/`Option` v1 tidak berubah; tidak ada bidang wajib baru pada skenario lama. |
| INV-6 | Kunci kamus lama tidak dihapus; hanya `ui.home.progress` berubah **parameternya** (§11.2) dan wajib berubah serentak di tiga bahasa. |
| INV-7 | Setiap perubahan pada `tools/check.js` hanya boleh memperketat/menambah; sebuah pemeriksaan lama tidak boleh dilonggarkan agar hijau. |

---

## 5. Model data v2

### 5.1 Kategori

`data/registry.js` menjadi sumber kebenaran tunggal untuk daftar kategori (v1 menduplikasinya sebagai `CAT_ORDER` di `js/app-index.js` dan `CATS` di `tools/check.js`; duplikasi itu **wajib** dihapus dengan membaca dari registri).

```js
HSL.data.categories = [
  "checkin", "complaint", "upsell", "checkout", "privacy", "escalation",  // v1 — urutan tidak berubah
  "fnb", "housekeeping", "overbooking"                                    // v2 — ditambahkan di belakang
];
```

Alasan menambahkan di belakang (bukan menyisipkan sesuai alur tamu): urutan cip jangkar dan urutan bagian katalog statis DE pada `index.html` tetap stabil, sehingga uji fallback tanpa JS (T-04 v1) dan tangkapan visual lama tetap sebanding. Penemuan skenario baru dijamin oleh Training des Tages, drill, dan filter — bukan oleh posisi bagian.

### 5.2 Registri skenario

```js
HSL.data.order = [ …12 slug v1 verbatim…,
  "sc-13-fnb-breakfast-allergy",
  "sc-14-housekeeping-lost-property",
  "sc-15-overbooking-walk"
];
```

Setiap halaman yang memuat data (`index.html`, `scenario.html`, `tools/check.html`) **wajib** memuat tiga berkas baru dalam urutan `sc-13` → `sc-14` → `sc-15` setelah `sc-12`. Penjaga `dataOk()` di `js/app-index.js` dan `js/app-scenario.js` **wajib** berubah dari `order.length === 12` menjadi `order.length >= 12 && setiap slug punya objek` (harga: satu berkas skenario hilang tetap terdeteksi lewat cabang kedua).

### 5.3 Pengaturan katalog (persisten, tanpa kenaikan skema)

```js
state.settings.catalog = {
  cat:    "all" | <kategori>,          // default "all"
  status: "all" | "new" | "active" | "done" | "mastered",  // default "all"
  diff:   "all" | 1 | 2 | 3,           // default "all"
  sort:   "default" | "best" | "difficulty"                // default "default"
};
```

Aturan kompatibilitas: `schemaVersion` tetap `1`, larik `migrations` tetap kosong. Jaring pengaman baca `store.runMigrations` (yang di v1 sudah menormalkan `settings.motion`, `progress`, `activeRun`) diperluas satu baris: `parsed.settings.catalog = HSL.engine.normalizeCatalogOpts(parsed.settings.catalog)`. Nilai tak dikenal (kategori yang dihapus, angka di luar 1–3, sort asing) **wajib** jatuh ke default alih-alih menggagalkan muat. `normalizeCatalogOpts` berada di `engine.js` (murni, dapat diuji validator), bukan di `store.js`.

Catatan urutan muat: `store.js` dimuat sebelum `engine.js` di v1, tetapi `runMigrations` hanya berjalan saat `load()` dipanggil dari `app-*.js` (setelah semua skrip `defer` selesai), jadi `HSL.engine` sudah ada. Implementasi tetap **wajib** menulis pemanggilan defensif: bila `HSL.engine` belum ada, pakai objek default lokal.

### 5.4 Tanpa bidang baru pada Scenario

Fitur v2 tidak menambah bidang pada `Scenario`. Kategori baru cukup berupa nilai string baru pada `category`. `sopRefs` tetap subset `P1…P8`.

---

## 6. F-A — Tiga skenario baru

### 6.0 Aturan umum yang wajib dipenuhi ketiganya

Diambil dari v1 §6.1/§6.2/§8.2 dan ditegakkan `SC-FIELDS`/`SC-TEXT3`/`SC-GRAF`/`SC-RUBRIK`:

- Bidang: `id` = nama slug, `category`, `difficulty` 1–3, `minutes` 3–10, `startNode: "n1"`, `title`, `summary`, `context{place,situation,guest,constraints}`, `goals[]` (2–3 item), `nodes{}`, `debrief{tips{decision,language,sop},safetyTip,praise}`, `sopRefs[]` ⊆ P1…P8.
- Semua teks `Text3` lengkap DE/EN/ID, tanpa markup, batas panjang: `narration` ≤ 700, `guestLine` ≤ 240, `label` ≤ 140, `feedback` ≤ 350, `ending` ≤ 700 karakter **per bahasa**.
- Graf: `n1` bertipe `decision`; setiap simpul keputusan punya 3–4 opsi dengan id dari `a,b,c,d`; setiap jalur dari `n1` melewati **4 simpul keputusan** (memenuhi syarat 3–5) lalu berakhir pada `outcome`; tanpa siklus; tanpa simpul yatim; `tone` ∈ `good|mixed|poor`.
- Rubrik per simpul keputusan: **tepat satu** opsi `2/2/2`; **minimal satu** opsi berjumlah ≤ 2; tidak ada dua opsi dengan kombinasi `(d/l/s + next)` identik; opsi ber-`flags.unsafe` wajib `s = 0` dan `d ≤ 1`; opsi ber-`flags.escalate` wajib `d ≥ 1` dan `s ≥ 1`; `unsafe` dan `escalate` tidak boleh bersamaan; **setiap skenario wajib memuat minimal satu opsi `escalate`**.
- Anggaran: ≤ 30 KiB (30720 byte) per berkas; target kerja ≤ 28 KiB agar ada ruang koreksi teks.
- Nama tamu dan hotel fiktif, non-stereotip; tanpa data pribadi nyata; tanpa nama merek nyata.

Tabel opsi di bawah bersifat **normatif untuk skor, bendera, dan tujuan simpul**; teks DE yang ditulis adalah inti makna (implementasi menulis kalimat penuh DE/EN/ID sesuai gaya v1: narasi orang kedua sopan, umpan balik menjelaskan *mengapa* dan merujuk P-kode).

### 6.1 `sc-13-fnb-breakfast-allergy` — kategori `fnb`

| Bidang | Nilai |
|---|---|
| difficulty | 3 |
| minutes | 6 |
| sopRefs | `["P1","P4","P5","P6"]` |
| title (DE) | „Allergie-Anfrage am Frühstücksbuffet“ |
| summary (DE) | Ein Gast fragt am Buffet nach Nüssen — die Antwort muss stimmen, nicht beruhigen. |
| context.place | Frühstücksraum, 07:40, Buffet gut besucht; Sie unterstützen den Service. |
| context.situation | Gast mit Nussallergie fragt, was er essen darf; Küche ist im Stoßbetrieb. |
| context.guest | Herr Oyelaran, Anfang 40, Geschäftsreisender, ruhig aber deutlich besorgt. |
| context.constraints | Allergenangaben stehen bei der Küche; Sie dürfen keine Zusicherung geben, die Sie nicht geprüft haben. |
| goals | (1) Anliegen präzise aufnehmen statt beruhigen (P1/P4); (2) Zuständigkeit Küche/Supervisor nutzen (P5); (3) Ergebnis dokumentieren und übergeben (P6). |

Simpul dan opsi:

| Simpul | phase (DE) | Opsi | Inti pilihan (DE) | d/l/s | flags | next |
|---|---|---|---|---|---|---|
| n1 | „Anliegen aufnehmen“ | a | Genau nachfragen: welches Allergen, wie streng — und ankündigen, dass Sie es in der Küche klären | 2/2/2 | — | n2 |
| | | b | Auf die Schilder am Buffet zeigen und den Gast selbst entscheiden lassen | 1/1/1 | — | n2 |
| | | c | Beruhigen: „Bei uns ist alles nussfrei, keine Sorge“ | 0/1/0 | `unsafe` | n2 |
| | | d | Empfehlen, einfach das Gebäck weglassen | 1/1/0 | — | n2 |
| n2 | „Küche einbeziehen“ | a | Persönlich in die Küche gehen, Allergeninfo einholen und den Service-Supervisor einbinden | 2/2/2 | `escalate` | n3 |
| | | b | Kurz anrufen und nur „ohne Nüsse“ weitergeben | 1/1/1 | — | n3 |
| | | c | Die Zutatenliste selbst lesen und dem Gast übersetzen | 1/2/1 | — | n3 |
| | | d | Aus der Erinnerung an das Menü von gestern antworten | 0/1/0 | `unsafe` | n3 |
| n3 | „Sichere Alternative“ | a | Frisch zubereiteten Teller aus der Küche mit geprüfter Allergenangabe separat servieren | 2/2/2 | — | n4 |
| | | b | Dieselben Buffetteile „von hinten“ anbieten | 1/1/1 | — | n4 |
| | | c | Nur Kaffee und Obst anbieten und sich entschuldigen | 1/2/1 | — | n4 |
| | | d | Den Gast bitten, das Risiko schriftlich zu übernehmen | 0/1/0 | `unsafe` | n4 |
| n4 | „Dokumentation“ | a | Allergenwunsch in Übergabe und Gastnotiz festhalten, Frühdienst informieren | 2/2/2 | — | x1 |
| | | b | Der Kollegin beim Schichtwechsel mündlich sagen | 1/1/1 | — | x1 |
| | | c | Nichts notieren — der Gast fragt morgen wieder | 0/1/0 | — | x2 |

Outcome: `x1` `tone: "good"` (tamu sarapan tenang, informasi terverifikasi, catatan tersimpan); `x2` `tone: "mixed"` (situasi selesai hari ini, tetapi shift berikut mulai dari nol).

Batas keselamatan konten: umpan balik **dilarang** memberi nasihat medis; tidak menyebut obat, dosis, atau tindakan darurat medis selain merujuk P7/112 bila tamu menunjukkan gejala (opsi mana pun yang menyentuh gejala wajib mengarahkan ke 112 dan atasan, tanpa diagnosis).

### 6.2 `sc-14-housekeeping-lost-property` — kategori `housekeeping`

| Bidang | Nilai |
|---|---|
| difficulty | 2 |
| minutes | 5 |
| sopRefs | `["P2","P3","P4","P6"]` |
| title (DE) | „Vergessener Ring im abgereisten Zimmer“ |
| summary (DE) | Eine abgereiste Gästin ruft an: ein Ring liegt noch im Zimmer — das inzwischen neu belegt ist. |
| context.place | Rezeption, 11:20, Abreisewelle vorbei, Housekeeping mitten in der Reinigung. |
| context.situation | Zimmer 214 ist bereits neu belegt; die Anruferin bittet um Suche und Rücksendung. |
| context.guest | Frau Lindqvist, gestern abgereist, ruft aus dem Zug an, angespannt aber freundlich. |
| context.constraints | Fundsachen laufen über Housekeeping und ein Register; Zimmerzutritt bei belegtem Zimmer nur mit Zustimmung und Begleitung. |
| goals | (1) Anliegen aufnehmen und Erwartung realistisch setzen (P4); (2) Privatsphäre des neuen Gastes schützen (P3); (3) Identität vor Herausgabe prüfen und dokumentieren (P2/P6). |

| Simpul | phase (DE) | Opsi | Inti pilihan (DE) | d/l/s | flags | next |
|---|---|---|---|---|---|---|
| n1 | „Anliegen aufnehmen“ | a | Zuhören, Beschreibung und Rückrufnummer notieren, Fundsachen-Ablauf und Zeitrahmen erklären | 2/2/2 | — | n2 |
| | | b | Zusagen, „später mal bei Housekeeping zu fragen“ | 1/1/1 | — | n2 |
| | | c | Versprechen, den Ring sicher zu finden | 1/1/0 | — | n2 |
| | | d | Der Anruferin anbieten, mit einem Zimmerschlüssel selbst nachzusehen | 0/0/0 | `unsafe` | n2 |
| n2 | „Suche organisieren“ | a | Housekeeping-Supervisor einbinden, Register prüfen, Zutritt nur begleitet und mit Zustimmung des neuen Gastes | 2/2/2 | `escalate` | n3 |
| | | b | Das Zimmermädchen bitten, zwischen zwei Reinigungen zu schauen | 1/1/1 | — | n3 |
| | | c | Beim neuen Gast klopfen und im Zimmer herumsuchen | 0/1/0 | `unsafe` | n3 |
| | | d | Ohne Prüfung zurückmelden, es sei nichts gefunden | 1/0/1 | — | n3 |
| n3 | „Herausgabe“ | a | Vor der Herausgabe Identität und Beschreibung abgleichen, Versand mit Nachweis und Kosten transparent anbieten, Übergabe dokumentieren | 2/2/2 | — | n4 |
| | | b | Den Fund am Telefon detailliert beschreiben, damit es schneller geht | 1/1/0 | — | n4 |
| | | c | Sofort unversichert per Post schicken, ohne Eintrag | 0/1/0 | `unsafe` | n4 |
| | | d | An einen Verwandten aushändigen, der vorbeikommt | 0/0/0 | `unsafe` | n4 |
| n4 | „Register & Rückmeldung“ | a | Eintrag im Fundsachenregister, Übergabenotiz, Gästin mit realistischem Termin informieren | 2/2/2 | — | x1 |
| | | b | Nur mündlich an die Spätschicht weitergeben | 1/1/1 | — | x1 |
| | | c | Nichts festhalten | 0/1/0 | — | x2 |

Outcome: `x1` `good`; `x2` `mixed`.

### 6.3 `sc-15-overbooking-walk` — kategori `overbooking`

| Bidang | Nilai |
|---|---|
| difficulty | 3 |
| minutes | 7 |
| sopRefs | `["P1","P4","P5","P6"]` |
| title (DE) | „Haus voll — Gast muss umgebucht werden“ |
| summary (DE) | 22:10, das Haus ist voll, und ein garantiert gebuchter Gast steht vor Ihnen. |
| context.place | Empfang, 22:10, Lobby ruhig, Spätdienst allein am Schalter. |
| context.situation | Garantierte Buchung, kein Zimmer frei; ein Partnerhaus in der Nähe hat Kapazität. |
| context.guest | Herr Bakar, Ende 30, angereist mit Zug, müde, rechnet mit einem Zimmer. |
| context.constraints | Umbuchung und Kostenübernahme entscheidet die Dienstleitung; Sie dürfen Transport organisieren, aber keine Kulanz jenseits Ihrer Befugnis zusagen. |
| goals | (1) Fakten prüfen und ehrlich Zeit gewinnen (P1/P4); (2) Dienstleitung rechtzeitig einbinden (P5); (3) Ersatz mit Würde organisieren und dokumentieren (P4/P6). |

| Simpul | phase (DE) | Opsi | Inti pilihan (DE) | d/l/s | flags | next |
|---|---|---|---|---|---|---|
| n1 | „Lage prüfen“ | a | Ruhig begrüßen, Buchung und Hausstatus prüfen und ehrlich um zwei Minuten bitten | 2/2/2 | — | n2 |
| | | b | Sofort ausführlich entschuldigen, bevor die Fakten geprüft sind | 1/2/1 | — | n2 |
| | | c | Vor der Lobby laut erklären, das Haus sei überbucht, da sei nichts zu machen | 0/0/1 | — | n2 |
| | | d | Den Gast in ein außer Betrieb gemeldetes Zimmer legen | 0/1/0 | `unsafe` | n2 |
| n2 | „Befugnis & Eskalation“ | a | Dienstleitung sofort informieren und Optionen innerhalb der Befugnis vorschlagen | 2/2/2 | `escalate` | n3 |
| | | b | Selbst zwei Gratisnächte und Upgrade zusagen | 1/1/0 | — | n3 |
| | | c | Abwarten und auf eine No-Show hoffen | 0/1/0 | — | n3 |
| | | d | Die Kollegin im Nachtdienst um ihre Meinung bitten | 1/1/1 | — | n3 |
| n3 | „Ersatz anbieten“ | a | Gleichwertiges Partnerhaus, Fahrt organisiert, Kosten nach Freigabe, klare Erklärung und Entschuldigung | 2/2/2 | — | n4 |
| | | b | Eine Liste von Hotels in der Nähe aushändigen | 1/1/1 | — | n4 |
| | | c | Ersatz nennen, aber Differenz und Taxi dem Gast überlassen | 0/1/1 | — | n4 |
| | | d | Dem Gast erklären, das sei das Problem seines Buchungsportals | 0/0/0 | — | n4 |
| n4 | „Nachsorge“ | a | Umbuchung dokumentieren, Rückkehr mit Priorität vormerken, morgen nachfassen, Übergabe schreiben | 2/2/2 | — | x1 |
| | | b | Kurz im System vermerken | 1/1/1 | — | x1 |
| | | c | Nichts — die Schicht ist zu Ende | 0/1/0 | — | x2 |

Outcome: `x1` `good`; `x2` `poor` (tamu terlayani malam ini tetapi hubungan dan shift berikutnya membayar harganya). Ini satu-satunya `poor` di antara skenario baru dan wajib tetap bermartabat: kegagalan diceritakan sebagai konsekuensi proses, bukan penghinaan.

### 6.4 Katalog statis DE (fallback tanpa JS)

`index.html` **wajib** menambah tiga bagian `<section class="catalog-section" id="cat-fnb|cat-housekeeping|cat-overbooking">` beserta tiga cip jangkar baru, dengan judul + ringkasan DE identik dengan `title.de`/`summary.de` berkas data (dijaga oleh perbandingan manual terhadap daftar kanonik `check.canonicalDe()` seperti T-04 v1).

---

## 7. F-B — Training des Tages

### 7.1 Kontrak mesin (murni)

```js
HSL.engine.dateHash(dateKey)              // "YYYY-MM-DD" → uint32; bentuk salah → -1
HSL.engine.trainingOfTheDay(order, dateKey)  // → slug | null
```

`dateHash` **wajib** FNV-1a 32-bit + finalizer avalanche, memakai `Math.imul`, tanpa `Date`:

```js
function dateHash(dateKey) {
  if (typeof dateKey !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return -1;
  var h = 2166136261 >>> 0;
  for (var i = 0; i < dateKey.length; i++) {
    h ^= dateKey.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  h ^= h >>> 15; h = Math.imul(h, 2246822507) >>> 0;
  h ^= h >>> 13; h = Math.imul(h, 3266489909) >>> 0;
  h ^= h >>> 16;
  return h >>> 0;
}
```

`trainingOfTheDay(order, dateKey)` mengembalikan `null` bila `order` bukan array tak kosong atau `dateHash` = -1; selain itu `order[dateHash(dateKey) % order.length]`.

Validasi hanya **bentuk**, bukan kalender (`"2026-02-29"` diterima). Pemanggil bertanggung jawab memberi tanggal nyata.

### 7.2 Nilai referensi (terukur, wajib direproduksi validator)

| dateKey | `dateHash` | indeks pada 15 slug | slug (registri v2) |
|---|---|---|---|
| `2026-01-01` | 4149592858 | 13 | `sc-14-housekeeping-lost-property` |
| `2026-08-04` | 594494905 | 10 | `sc-11-privacy-caller` |
| `2026-12-31` | 4252829426 | 11 | `sc-12-escalation-collapse` |
| `2026-1-1` | -1 | — | `null` |
| `""` / non-string | -1 | — | `null` |

Sebaran terukur pada 365 tanggal tahun 2026 dengan 15 slug: minimum 15 kemunculan, maksimum 34 (rata-rata 24,3); tidak ada slug yang tak pernah muncul; hari berturut sama hanya 21 kali; dalam setiap jendela 15 hari minimal 5 slug berbeda. Angka-angka ini adalah hasil pengukuran baseline dan menjadi dasar ambang `TOTD-SPREAD` (§13.3).

### 7.3 Kunci tanggal di lapisan UI

`js/app-index.js` (bukan engine) membentuk `dateKey` dari waktu **lokal** perangkat:

```js
function todayKey() {
  var d = new Date();
  function p(n) { return (n < 10 ? "0" : "") + n; }
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}
```

Wajib lokal (bukan `toISOString`) agar “hari ini” cocok dengan persepsi pengguna di zona waktu Jerman.

### 7.4 UX

Panel TOTD dirender di `#totd` (elemen `js-only` baru pada `index.html`), **di atas** ringkasan progres dan di atas katalog:

- Judul `ui.home.totd.title` („Übung des Tages“), tanggal terformat lewat `i18n.fmtDateTime`-gaya ringkas (hanya tanggal; boleh memakai `Intl.DateTimeFormat` dengan `dateStyle: "full"` di dalam `try/catch`, fallback `dateKey`).
- Judul skenario (`I.text(sc.title)`), meta kategori/kesulitan/menit, ringkasan.
- Tombol utama `ui.home.totd.cta` → `scenario.html?id=<slug>`.
- Bila skenario itu sudah `mastered` (best.keys === 5): tampilkan `ui.home.totd.hint` („…wiederholen Sie es in einer anderen Sprache.“) — pilihan **tidak** digeser, agar determinisme tetap murni dan dapat diuji.
- Kartu skenario yang sama di dalam katalog mendapat lencana `ui.home.totd.badge`.

Aksesibilitas: panel adalah `<section aria-labelledby>` dengan `<h2>`; tanpa animasi baru selain kelas `view-enter` yang sudah menghormati `motion-reduce`.

---

## 8. F-C — Weak-axis drill

### 8.1 Kontrak mesin (murni)

```js
HSL.engine.axisStats(order, progressMap)
// → { decision:{sum,n,avg}, language:{…}, sop:{…}, samples:n }

HSL.engine.weakAxis(order, progressMap, opts)
// opts = { minSamples: 2, threshold: 75, maxSlugs: 3 } (default; opsi boleh dihilangkan)
// → null  bila samples < minSamples
// → { axis: "decision"|"language"|"sop", avg: <0..100>, samples: n, slugs: [slug…] }
```

Aturan:

1. Sampel = slug pada `order` yang punya `progressMap[slug].best` dengan tiga sumbu bertipe angka. Slug asing di `progressMap` (mis. dari versi lain) diabaikan.
2. `avg` per sumbu = `Math.round(sum / n)`.
3. Sumbu terlemah = `avg` terkecil. Seri diputus dengan urutan prioritas **sop > decision > language** — identik dengan tie-break tips di `summarize` v1 §9.4, supaya saran panel dan saran debrief tidak pernah bertentangan.
4. `slugs` = sampel dengan `best[axis] < threshold`, diurutkan naik menurut `best[axis]`, seri menurut urutan registri, dipotong `maxSlugs`. Boleh kosong (semua di atas ambang).
5. Fungsi ini tidak melihat `activeRun`, tidak melihat bahasa, tidak memakai `Date`.

### 8.2 UX

Panel `#drill` (elemen `js-only`), di bawah ringkasan progres:

| Keadaan | Tampilan |
|---|---|
| `weakAxis` = `null` | `ui.home.drill.needMore` — „Schließen Sie mindestens zwei Szenarien ab, dann schlage ich einen Schwerpunkt vor.“ |
| `slugs` kosong | `ui.home.drill.none` + nilai rata-rata ketiga sumbu (tanpa tombol) |
| `slugs` berisi | `ui.home.drill.axisLow` („Schwächste Achse: {axis} — Ø {pct} von 100“) + daftar ≤ 3 tautan skenario dengan nilai sumbu itu + tombol `ui.home.drill.cta` |

Tombol `ui.home.drill.cta` („Schwerpunkt üben“) **tidak** membuka skenario langsung; ia menerapkan mode drill pada katalog: `sort` internal `"weak"` (§9.3) dengan filter lain direset ke `all`, lalu fokus dipindahkan ke judul hasil katalog dan jumlah hasil diumumkan lewat `aria-live`. Mode drill bersifat sesi (tidak disimpan di `settings.catalog`) supaya tidak “mengunci” katalog pada kunjungan berikutnya; tombol reset filter juga mengakhirinya.

Selain itu, setiap kartu skenario yang termasuk `slugs` mendapat lencana `ui.home.drill.badge` (mis. „SOP 55“) agar sumber saran terlihat, bukan sekadar diklaim.

---

## 9. F-D — Filter & sort katalog

### 9.1 Kontrak mesin (murni)

```js
HSL.engine.normalizeCatalogOpts(opts, categories)
// → {cat, status, diff, sort} tervalidasi; nilai asing → default; selalu objek baru

HSL.engine.statusOfSlug(slug, progressMap, activeRunId)
// → "active" | "mastered" | "done" | "new"   (presedens dalam urutan itu)

HSL.engine.filterSortCatalog(order, scenarios, progressMap, activeRunId, opts)
// → array slug (himpunan bagian dari order, tanpa duplikat)
```

`statusOfSlug` presedens: `activeRunId === slug` → `active`; `best.keys === 5` → `mastered`; `completed` → `done`; selain itu `new`. Lencana kartu memakai nilai ini (v1 hanya punya active/done/new; `mastered` adalah lencana baru dan **wajib** membuat kartu 5-kunci terlihat berbeda dari kartu selesai biasa).

### 9.2 Predikat filter

| `opts.status` | Cocok bila |
|---|---|
| `all` | selalu |
| `new` | `statusOfSlug` = `new` |
| `active` | `statusOfSlug` = `active` |
| `done` | `progress[slug].completed` benar (**termasuk** yang sudah `mastered`) |
| `mastered` | `progress[slug].best.keys === 5` |

Asimetri `done` disengaja: pengguna yang memfilter “selesai” mengharapkan semua yang pernah diselesaikan, sementara lencana kartu tetap menampilkan tingkat tertinggi yang dicapai. Asimetri ini **wajib** diuji (`CAT-FILTER`).

`opts.cat`: `all` atau salah satu `HSL.data.categories`. `opts.diff`: `all` atau 1/2/3 (angka; string angka dinormalkan menjadi angka oleh `normalizeCatalogOpts`).

### 9.3 Urutan

| `opts.sort` | Aturan |
|---|---|
| `default` | urutan registri (stabil) |
| `best` | `best.combined` menurun; tanpa `best` selalu di belakang; seri → urutan registri |
| `difficulty` | `difficulty` menaik; seri → urutan registri |
| `weak` (internal, hanya mode drill) | butuh `opts.axis`; sampel `best[axis]` menaik lebih dulu, lalu slug tanpa `best` dalam urutan registri |

`weak` tidak tersedia di `<select>` UI dan tidak pernah ditulis ke `settings.catalog`.

### 9.4 UX & aksesibilitas

- Kontrol berupa `<form class="catalog-filter js-only">` berisi satu `<fieldset>` + `<legend>` `ui.home.filter.legend` dan empat `<label>` + `<select>` asli (kategori, status, kesulitan, urutan) plus tombol `ui.home.filter.reset`. Tanpa input teks, tanpa komponen kustom → papan ketik dan pembaca layar bekerja tanpa ARIA tambahan.
- Perubahan `<select>` menerapkan filter **langsung** (event `change`), menyimpan ke `settings.catalog` lewat `store.save`, dan menulis ringkasan `ui.home.filter.count` („{n} von {total} Szenarien“) ke wilayah `aria-live="polite"`. Fokus **dilarang** dipindah dari `<select>` yang baru diubah.
- Bila hasil kosong: panel `ui.home.filter.none` + tombol reset. Katalog tidak boleh tampak “rusak/kosong tanpa penjelasan”.
- `sort` = `default` **dan** `cat` = `all` → render bergrup per kategori seperti v1 (`<section id="cat-…">` + `<h2>`), cip jangkar tetap tampil.
- Selain itu → render satu daftar rata dalam satu `<section id="cat-results">` dengan `<h2>` hasil; cip jangkar disembunyikan dengan properti `hidden` (bukan CSS baru) karena jangkarnya tidak ada lagi. Saat kembali ke default, `hidden` dilepas.
- Tanpa JS: seluruh blok filter tersembunyi (`js-only`), katalog statis DE lengkap tetap terbaca.

---

## 10. F-E — Retry dari langkah lemah

### 10.1 Kontrak mesin (murni, immutable)

```js
HSL.engine.weakestStepIndex(scenario, run)
// → indeks 0-based langkah yang perlu diulang, atau -1 bila tidak ada
HSL.engine.truncateRun(run, index)
// → run BARU dengan steps = steps.slice(0, index); run lama tidak dimutasi
```

`weakestStepIndex` (hanya sah bila `run` dapat ditelusuri; run korup → -1):

1. Langkah **pertama** dengan `flags.unsafe` → indeksnya.
2. Selain itu, langkah dengan total `d+l+s` terkecil; bila total itu ≤ 2 atau < 6 → kemunculan pertamanya.
3. Bila semua langkah bertotal 6 (seluruhnya `2/2/2`) → -1.

`truncateRun`: `index < 0` atau `index >= steps.length` → kembalikan run yang sama (tanpa perubahan); `index === 0` → run dengan `steps: []` (mulai dari langkah 1). Bidang `scenarioId`, `lang`, `startedAt` dipertahankan.

### 10.2 Nilai referensi (fixture emas §13.6, skenario sintetis 4 keputusan v1 §9.5)

| Pilihan run | `weakestStepIndex` | Alasan |
|---|---|---|
| `a,a,a,a` | -1 | semua 2/2/2 |
| `b,a,b,a` | 0 | tanpa unsafe; total terkecil 4 pada langkah 1 |
| `a,c,d,a` | 1 | unsafe pertama pada langkah 2 |
| `a,a,c,a` | 2 | unsafe pertama pada langkah 3 |

Setelah `truncateRun(run, 1)` pada `a,c,d,a`: `steps.length === 1`, `currentNodeId` = `n2`, run lama tetap 4 langkah; melanjutkan dengan `a,a,a` menghasilkan `combined 100`, `keys 5`, `safe true`, `N 4`.

### 10.3 UX

Di tampilan hasil/debrief `js/app-scenario.js`, di baris tombol yang sudah ada:

- Tombol baru `ui.debrief.retryWeak` („Ab der schwachen Stelle wiederholen“) muncul **hanya** bila `weakestStepIndex >= 0`, ditempatkan sebelum `ui.debrief.retry` (ulang dari awal) karena ini jalur yang dianjurkan.
- Label pendamping `ui.debrief.retryWeakHint` menyebut langkah dan fase target („Schritt {n} · {phase}“) supaya pengguna tahu ia akan mundur ke mana.
- Klik → `run = E.truncateRun(run, idx)`; simpan sebagai `state.activeRun`; `renderNode()`. Progres yang sudah tercatat untuk run selesai sebelumnya **tidak** diubah atau dibatalkan.
- Penyelesaian ulang berikutnya menambah `attempts` sekali lagi dan memperbarui `last`, serta `best` bila lebih baik — konsisten dengan v1 §7.3 (“attempts = jumlah penyelesaian”). Ini didokumentasikan di `info.html` agar angka `attempts` tidak mengejutkan.
- Bila seluruh langkah `2/2/2`, tombol tidak dirender (bukan dinonaktifkan) agar tidak ada kontrol mati di jalur papan ketik.

---

## 11. i18n

### 11.1 Kunci baru (wajib DE/EN/ID lengkap)

| Kunci | Peran | Parameter |
|---|---|---|
| `ui.home.cat.fnb` | nama kategori | — |
| `ui.home.cat.housekeeping` | nama kategori | — |
| `ui.home.cat.overbooking` | nama kategori | — |
| `ui.home.status.mastered` | lencana kartu | — |
| `ui.home.totd.title` | judul panel TOTD | — |
| `ui.home.totd.date` | baris tanggal | `{date}` |
| `ui.home.totd.cta` | tombol mulai | — |
| `ui.home.totd.hint` | catatan bila sudah 5 kunci | — |
| `ui.home.totd.badge` | lencana kartu TOTD | — |
| `ui.home.drill.title` | judul panel drill | — |
| `ui.home.drill.needMore` | sampel < 2 | — |
| `ui.home.drill.none` | tak ada di bawah ambang | — |
| `ui.home.drill.axisLow` | sumbu terlemah | `{axis}`, `{pct}` |
| `ui.home.drill.cta` | terapkan mode drill | — |
| `ui.home.drill.badge` | lencana kartu drill | `{axis}`, `{pct}` |
| `ui.home.filter.legend` | legend fieldset | — |
| `ui.home.filter.cat` | label select | — |
| `ui.home.filter.status` | label select | — |
| `ui.home.filter.diff` | label select | — |
| `ui.home.filter.sort` | label select | — |
| `ui.home.filter.all` | opsi “semua” | — |
| `ui.home.filter.reset` | tombol reset | — |
| `ui.home.filter.count` | pengumuman live | `{n}`, `{total}` |
| `ui.home.filter.none` | hasil kosong | — |
| `ui.home.filter.resultsTitle` | judul daftar rata | — |
| `ui.home.sort.default` | opsi urutan | — |
| `ui.home.sort.best` | opsi urutan | — |
| `ui.home.sort.difficulty` | opsi urutan | — |
| `ui.debrief.retryWeak` | tombol retry lemah | — |
| `ui.debrief.retryWeakHint` | keterangan target | `{n}`, `{phase}` |

29 kunci baru × 3 bahasa. Kamus tetap ≤ 20 KB/berkas.

### 11.2 Kunci yang berubah

| Kunci | v1 | v2 |
|---|---|---|
| `ui.home.progress` | `"Abgeschlossen: {done}/12 · Schlüssel: {keys}/60"` | `"Abgeschlossen: {done}/{total} · Schlüssel: {keys}/{max}"` |

Angka 12/60 **dilarang** tetap keras di kamus karena jumlah skenario kini dinamis. Ketiga bahasa wajib memakai himpunan parameter identik (ditegakkan `DICT-PARITY` yang sudah membandingkan parameter). `ui.home.mastered` tetap sama teksnya, tetapi pemicunya berubah dari `mastered === 12` menjadi `mastered === order.length`.

---

## 12. Alur halaman & keadaan

Urutan konten `index.html` (setelah header dan banner):

1. `<noscript>` tiga bahasa (tak berubah).
2. `#first-visit` (panel pilih bahasa; tak berubah — panel lain **dilarang** dirender sebelum bahasa dipilih).
3. `#totd` — Training des Tages.
4. `#progress-summary` — ringkasan progres (teks memakai `{total}`/`{max}`).
5. `#drill` — weak-axis.
6. `#catalog-filter` — form filter/sort + wilayah `aria-live`.
7. `nav.chip-nav` — cip jangkar kategori (9 cip; `hidden` dalam mode daftar rata).
8. `#catalog` — katalog (bergrup atau rata).

Perilaku render ulang: `I.onLangChange` tetap memanggil `renderDynamic()`, yang kini merender kelima blok dinamis dari state yang sama (TOTD dihitung ulang dari `dateKey` yang sama → slug tidak boleh berubah saat bahasa diganti). Mode drill sesi tetap aktif melewati pergantian bahasa.

Halaman `scenario.html` dan `info.html`: hanya menambah tiga tag skrip data (`scenario.html`), tombol retry baru (dirender `app-scenario.js`), dan pembaruan teks statis (`info.html`, §16.1).

---

## 13. Validator v2 — inventaris pemeriksaan

Total **81** pemeriksaan (v1: 54). Semua wajib PASS sebelum v2 dinyatakan selesai.

| Kelompok | ID | Jumlah | Status |
|---|---|---|---|
| Kamus | `DICT-PARITY` | 1 | lama, diperluas cakupan kunci otomatis |
| Kamus v2 | `DICT-V2KEYS` | 1 | **baru** |
| Registri | `REG-ORDER` | 1 | lama, digeneralisasi (§13.1) |
| Kategori | `CAT-COVER` | 1 | **baru** |
| Per skenario × 15 | `SC-FIELDS-*`, `SC-TEXT3-*`, `SC-GRAF-*`, `SC-RUBRIK-*` | 60 | 48 lama + 12 baru |
| Mesin v1 | `GOLD-A`…`GOLD-D` | 4 | lama, tak berubah |
| TOTD | `TOTD-DET`, `TOTD-RANGE`, `TOTD-SPREAD` | 3 | **baru** |
| Weak-axis | `WEAK-EMPTY`, `WEAK-LOW`, `WEAK-TIE`, `WEAK-SLUGS` | 4 | **baru** |
| Katalog | `CAT-FILTER`, `CAT-SORT`, `CAT-STABLE` | 3 | **baru** |
| Retry | `RETRY-IDX`, `RETRY-TRUNC`, `RETRY-REPLAY` | 3 | **baru** |
| **Total** | | **81** | |

Hitungan bertahap yang diharapkan selama implementasi (dipakai sebagai kriteria selesai tiap tugas rencana): 54 → 67 → 70 → 74 → 77 → 80 → 81.

### 13.1 `REG-ORDER` yang digeneralisasi

Aturan baru (menambah, tidak melonggarkan):

1. 12 slug v1 wajib berada pada posisi 1–12 persis (daftar `ORDER12` yang sudah ada dipertahankan sebagai prefiks).
2. `order.length` wajib sama dengan panjang daftar harapan v2 (`ORDER15`), dan setiap posisi cocok.
3. Slug unik; setiap slug punya objek dengan `id` sama (aturan v1, dipertahankan).
4. ID dan nama pemeriksaan tidak berubah (`REG-ORDER`, “registri 12 skenario” → nama diperbarui menjadi “registri skenario” tanpa mengubah ID).

### 13.2 `CAT-COVER`

- `HSL.data.categories` ada, berupa array 9 string, dengan 6 kategori v1 pada posisi 1–6 dalam urutan v1.
- Setiap `scenario.category` ∈ `categories` (menggantikan konstanta `CATS` lokal di `check.js`, yang kini dibaca dari registri).
- Setiap kategori memiliki ≥ 1 skenario (tidak ada kategori kosong yang menyisakan bagian katalog kosong).

### 13.3 `TOTD-*`

- `TOTD-DET`: nilai `dateHash` untuk tiga tanggal §7.2 persis; `-1` untuk `"2026-1-1"`, `""`, `null`, angka; `trainingOfTheDay(order,key) === order[dateHash(key) % order.length]`; `trainingOfTheDay([], key) === null`; `trainingOfTheDay(order, "x") === null`; pemanggilan dua kali memberi hasil sama.
- `TOTD-RANGE`: untuk 365 kunci tanggal 2026 (dibangkitkan aritmetika string, **tanpa** `Date` di dalam engine), hasil selalu string yang ada di `order`.
- `TOTD-SPREAD`: hitung frekuensi 365 hari; `min ≥ max(1, floor(365 / (3 × len)))` dan `max ≤ ceil(3 × 365 / len)`. Untuk len = 15: `min ≥ 8`, `max ≤ 73`; nilai terukur baseline 15/34 → lulus dengan margin. Ambang berbasis formula agar tetap sah bila jumlah skenario berubah lagi.

### 13.4 `WEAK-*` (fixture sintetis, tanpa data nyata)

| ID | Fixture | Harapan |
|---|---|---|
| `WEAK-EMPTY` | `{}`; lalu satu slug selesai | `null` pada keduanya (minSamples 2) |
| `WEAK-LOW` | s1 `{d:80,l:90,s:50}`, s2 `{d:70,l:85,s:60}` | `axis "sop"`, `avg 55`, `samples 2`, `slugs ["s1","s2"]` |
| `WEAK-TIE` | s1 & s2 `{d:60,l:80,s:60}` | `axis "sop"` (sop menang atas decision) |
| `WEAK-SLUGS` | sop = 40, 40, 70, 90 pada s1…s4 | `slugs ["s1","s2","s3"]` (≤ 3, urut naik, seri → registri); slug asing di progressMap diabaikan |

### 13.5 `CAT-*` (fixture sintetis 5 skenario, 3 kategori, kesulitan 1–3)

- `CAT-FILTER`: filter kategori/kesulitan; `status` `new|active|done|mastered`; asimetri `done ⊇ mastered` (§9.2); `normalizeCatalogOpts` menolak nilai asing → default; `"2"` → `2`.
- `CAT-SORT`: `default` = urutan registri; `best` menurun dengan tanpa-`best` di belakang dan seri stabil; `difficulty` menaik stabil; `weak` dengan `axis` menaik lalu tanpa-`best`.
- `CAT-STABLE`: untuk 12 kombinasi opsi, hasil selalu tanpa duplikat, selalu himpunan bagian `order`, dan `sort` tanpa filter selalu permutasi penuh `order` (panjang sama).

### 13.6 `RETRY-*`

- `RETRY-IDX`: empat baris tabel §10.2 + run korup → -1 + run kosong → -1.
- `RETRY-TRUNC`: immutabilitas (`run` lama tetap, objek baru ≠ objek lama), `steps` hasil adalah prefiks, `index` di luar rentang → run sama, `index 0` → `steps []`, `currentNodeId` setelah pemangkasan sesuai simpul langkah tersebut, bidang `lang/startedAt/scenarioId` terjaga.
- `RETRY-REPLAY`: pangkas `a,c,d,a` di indeks 1 lalu pilih `a,a,a` → `combined 100`, `keys 5`, `safe true`, `N 4`.

### 13.7 `DICT-V2KEYS`

Daftar 29 kunci §11.1 ada dan tidak kosong di ketiga kamus, dan `ui.home.progress` memuat tepat parameter `{done,max,keys,total}` (dibandingkan sebagai himpunan terurut) di ketiga bahasa. Pemeriksaan ini mencegah kunci baru “lupa diterjemahkan” lolos hanya karena parity antar kamus kebetulan seimbang.

### 13.8 Harness Node

`tools/node-check.js` (berkas pengembang baru, **tidak** dimuat aplikasi, tanpa dependensi) menjalankan `check.runAll()` di Node lewat `vm` dengan konteks `window` sintetis, mencetak `N/M PASS` dan seluruh baris FAIL, keluar dengan kode ≠ 0 bila ada FAIL. Flag `--legacy` mencetak khusus 54 ID v1 beserta statusnya (dipakai T-V2-02). `tools/` dikecualikan dari anggaran ukuran dan dari kaidah “tanpa Node” pada runtime aplikasi (harness hanya alat verifikasi lokal, bukan bagian produk).

---

## 14. Anggaran & kinerja

| Item | Batas | Baseline v1 | Perkiraan v2 |
|---|---|---|---|
| tiap `data/scenarios/*.js` | ≤ 30 KiB | maks 30 495 B (sc-12) | 3 berkas baru target ≤ 28 KiB |
| `css/styles.css` | ≤ 45 KB | 18 134 B | ≤ 22 KB (+ komponen filter/panel/lencana) |
| total `js/*.js` | ≤ 70 KB | ≈ 45,3 KB | ≤ 60 KB (engine +≈6 KB, app-index +≈6 KB) |
| tiap `i18n/*.js` | ≤ 20 KB | ≈ 4,8 KB | ≤ 8 KB |
| total termuat per halaman | ≤ 550 KB | ≈ 420 KB | ≈ 510 KB (15 skenario) — **wajib** diukur di T-V2-11 |

Kinerja: render katalog 15 kartu + filter di bawah 16 ms pada perangkat kelas menengah; filter/sort **dilarang** memicu pembacaan `localStorage` berulang (state di memori adalah sumber kebenaran; `save` hanya saat nilai berubah).

---

## 15. Keselamatan konten untuk skenario baru

Daftar periksa per skenario (wajib ditandatangani di T-V2-12):

1. Tanpa klaim medis: `sc-13` tidak pernah menyebut diagnosis, obat, atau tindakan medis; gejala akut hanya mengarah ke 112 + atasan (P7).
2. Tanpa klaim hukum: `sc-14` tidak menyebut kewajiban hukum penyimpanan barang temuan; hanya prosedur generik dan register internal. `sc-15` tidak menyebut hak kompensasi menurut undang-undang; hanya batas kewenangan internal.
3. Privasi: `sc-14` tidak pernah memberi imbalan pada masuknya pihak luar ke kamar terisi; membuka pintu tanpa izin selalu `unsafe`.
4. Eskalasi patut selalu bernilai ≥ 1 pada `d` dan `s` dan tidak pernah dihukum.
5. Opsi salah tetap bermartabat: umpan balik menjelaskan konsekuensi dan jalan perbaikan; dilarang meremehkan pengguna.
6. Nama tamu fiktif dan lintas budaya tanpa stereotip; tanpa nama hotel/merek nyata; satu-satunya fakta dunia nyata adalah 112.
7. Tanpa tekanan waktu buatan (tanpa timer), meski narasi menyebut jam sibuk.

---

## 16. Perubahan pendukung, risiko, dan tunda

### 16.1 Perubahan pendukung

- `HSL.APP_VERSION` → `"1.1.0"`; teks versi pada footer `index.html`/`scenario.html`/`info.html` diperbarui serentak.
- `info.html`: tiga blok statis bahasa diperbarui — jumlah skenario 12 → 15, tiga kategori baru disebut, dan tiga paragraf pendek tentang Übung des Tages, Schwerpunkt (weak-axis), filter/urutan, dan makna `attempts` saat retry dari langkah lemah. Paritas isi tiga bahasa wajib dijaga (diperiksa manual, bukan oleh validator).
- `js/app-index.js` dan `js/app-scenario.js`: `dataOk()` dilonggarkan dari `=== 12` menjadi `>= 12` + kelengkapan objek.
- `CAT_ORDER` di `app-index.js` dihapus, diganti `HSL.data.categories`.

### 16.2 Daftar tunda (tidak dikerjakan v2)

`payment` (kartu ditolak), `pet policy`, `group arrival`, DND-conflict housekeeping, statistik riwayat per sumbu, ekspor progres. Ketiga kategori pertama tetap kandidat terkuat v2.1 karena `check.js` dan UI kini sepenuhnya digerakkan registri, sehingga penambahan skenario berikutnya tidak lagi menyentuh logika.

### 16.3 Risiko

| Risiko | Mitigasi |
|---|---|
| `REG-ORDER` gagal saat registri sudah 15 tetapi validator belum diperbarui (jendela merah) | rencana menempatkan pembaruan registri + validator + tag skrip dalam satu tugas atomik (Tugas 3) |
| Sebaran TOTD berubah bila jumlah skenario berubah | ambang `TOTD-SPREAD` berbasis formula panjang registri, bukan angka keras |
| Tautan jangkar `#cat-…` mati dalam mode daftar rata | cip disembunyikan dengan `hidden` saat mode rata; dipulihkan saat kembali ke default |
| `attempts` naik dua kali karena retry dari langkah lemah | perilaku didokumentasikan di `info.html`; `best` hanya membaik, tidak pernah memburuk |
| Berkas skenario baru menembus 30 KiB | target kerja 28 KiB + pengukuran `wc -c` sebagai kriteria selesai tiap tugas data |
| `store.load()` memanggil `engine.normalizeCatalogOpts` sebelum engine ada | fallback default lokal di `store.js` (defensif) |

---

## 17. Definisi selesai v2

v2 selesai bila: SK-V2-1…SK-V2-13 terverifikasi; `tools/check.html` dan `node tools/node-check.js` melaporkan **81/81 PASS**; 54 ID pemeriksaan v1 masih ada dan PASS; anggaran §14 terukur terpenuhi; daftar periksa §15 ditandatangani; dan seluruh kotak centang rencana `docs/superpowers/plans/2026-08-04-hotel-scenario-lab-v2.md` tercentang.
