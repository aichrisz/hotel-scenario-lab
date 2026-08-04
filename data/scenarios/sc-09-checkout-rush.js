(function () {
 "use strict";
 window.HSL = window.HSL || {};
 var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
 data.scenarios["sc-09-checkout-rush"] = {
  id: "sc-09-checkout-rush",
  category: "checkout",
  difficulty: 2,
  minutes: 6,
  title: {
   de: "Check-out zur Stoßzeit",
   en: "Rush-Hour Check-out",
   id: "Check-out pada Jam Sibuk"
  },
  summary: {
   de: "Sechs Gäste in der Schlange, ein Shuttle um 08:05 — Check-out unter Zeitdruck, ohne die Freundlichkeit zu verlieren.",
   en: "Six guests in the queue, a shuttle at 08:05 — checking out under time pressure without losing the friendliness.",
   id: "Enam tamu mengantre, shuttle berangkat pukul 08:05 — check-out di bawah tekanan waktu tanpa kehilangan keramahan."
  },
  context: {
   place: {
    de: "Empfang Ihres Hauses, 07:50 — die morgendliche Abreisewelle rollt.",
    en: "The front desk of your hotel, 07:50 — the morning departure wave is rolling.",
    id: "Meja resepsionis hotel Anda, pukul 07:50 — gelombang keberangkatan pagi sedang berlangsung."
   },
   situation: {
    de: "Sechs Gäste stehen an. Mr Adeyemi, Position vier, muss den Flughafen-Shuttle um 08:05 erreichen.",
    en: "Six guests are queuing. Mr Adeyemi, fourth in line, has to catch the airport shuttle at 08:05.",
    id: "Enam tamu mengantre. Mr Adeyemi, di urutan keempat, harus mengejar shuttle bandara pukul 08:05."
   },
   guest: {
    de: "Mr Adeyemi, Ende 20, Rucksack geschultert und sichtlich nervös; die übrigen Gäste haben es unterschiedlich eilig.",
    en: "Mr Adeyemi, late twenties, backpack shouldered and visibly nervous; the other guests are in varying degrees of hurry.",
    id: "Mr Adeyemi, akhir 20-an, menggendong ransel dan tampak gugup; tamu-tamu lain memiliki tingkat keterburuan yang berbeda."
   },
   constraints: {
    de: "Der Rechnungsdrucker ist heute langsam; Sie sind zu zweit am Tresen, eine Kollegin sitzt im Backoffice.",
    en: "The invoice printer is slow today; there are two of you at the desk, with one colleague in the back office.",
    id: "Pencetak tagihan hari ini lambat; Anda hanya berdua di meja, dengan satu rekan di back-office."
   }
  },
  goals: [
   {
    de: "Eine Warteschlange fair und transparent triagieren (P1).",
    en: "Triage a queue fairly and transparently (P1).",
    id: "Melakukan triase antrean secara adil dan transparan (P1)."
   },
   {
    de: "Unterstützung anfordern, bevor die Lage kippt (P5).",
    en: "Call in support before the situation tips (P5).",
    id: "Meminta dukungan sebelum situasi memburuk (P5)."
   },
   {
    de: "Auch unter Druck korrekt abrechnen (P6).",
    en: "Bill accurately even under pressure (P6).",
    id: "Menjaga akurasi tagihan meski dalam tekanan (P6)."
   }
  ],
  startNode: "n1",
  nodes: {
   n1: {
    type: "decision",
    phase: { de: "Triage der Schlange", en: "Queue triage", id: "Triase antrean" },
    narration: {
     de: "07:50. Der Drucker müht sich durch die zweite Rechnung, als Mr Adeyemi aus Position vier heraus die Hand hebt: Sein Shuttle fährt in fünfzehn Minuten. Die drei Gäste vor ihm haben es womöglich weniger eilig — aber sie waren zuerst da.",
     en: "07:50. The printer is grinding through the second invoice when Mr Adeyemi raises his hand from fourth position: his shuttle leaves in fifteen minutes. The three guests ahead of him may be in less of a hurry — but they were there first.",
     id: "Pukul 07:50. Pencetak masih bergumul dengan tagihan kedua ketika Mr Adeyemi mengangkat tangan dari urutan keempat: shuttle-nya berangkat lima belas menit lagi. Tiga tamu di depannya mungkin tidak seburu-buru itu — tetapi mereka datang lebih dahulu."
    },
    guestLine: {
     de: "Entschuldigung — mein Shuttle fährt um 08:05. Schaffe ich das noch?",
     en: "Excuse me — my shuttle leaves at 08:05. Will I still make it?",
     id: "Maaf — shuttle saya berangkat pukul 08:05. Apakah masih sempat?"
    },
    options: [
     {
      id: "a",
      label: {
       de: "Die Schlange offen ansprechen: wer einen dringenden Transfer hat, wird vorgezogen — mit Dank an die Wartenden.",
       en: "Address the queue openly: anyone with an urgent transfer goes first — with thanks to those waiting.",
       id: "Menyapa antrean secara terbuka: yang transfernya mendesak didahulukan — sambil berterima kasih kepada yang menunggu."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Die Priorisierung geschieht öffentlich, mit Kriterium und Dank — so bleibt sie fair statt willkürlich (P1). Wer wartet, weiß warum; wer eilt, kommt durch. Genau das ist Triage.",
       en: "Exemplary: the prioritisation happens openly, with a criterion and thanks — keeping it fair rather than arbitrary (P1). Those waiting know why; those hurrying get through. That is triage.",
       id: "Teladan: prioritas dilakukan secara terbuka, dengan kriteria dan ucapan terima kasih — sehingga tetap adil, bukan sewenang-wenang (P1). Yang menunggu tahu alasannya; yang terburu-buru bisa lewat. Itulah triase."
      },
      next: "n2"
     },
     {
      id: "b",
      label: {
       de: "Bei der strikten Reihenfolge bleiben: Wer zuerst kommt, wird zuerst bedient — ohne Ausnahme.",
       en: "Stick to strict order: first come, first served — no exceptions.",
       id: "Berpegang pada urutan ketat: siapa datang dahulu dilayani dahulu — tanpa kecuali."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Konsequent, aber starr: Die Reihenfolge ist ein gutes Prinzip — bis ein transparenter, dringender Grund eine Ausnahme rechtfertigt. Ein verpasster Shuttle kostet mehr als drei erklärte Minuten Wartezeit (P1, P4).",
       en: "Consistent but rigid: order is a good principle — until a transparent, urgent reason justifies an exception. A missed shuttle costs more than three explained minutes of waiting (P1, P4).",
       id: "Konsisten tetapi kaku: urutan memang prinsip yang baik — sampai ada alasan mendesak dan transparan yang membenarkan pengecualian. Shuttle yang terlewat harganya lebih mahal daripada tiga menit tunggu yang dijelaskan (P1, P4)."
      },
      next: "n2"
     },
     {
      id: "c",
      label: {
       de: "Mr Adeyemi wortlos nach vorn winken und ihn vor den Wartenden abfertigen.",
       en: "Wave Mr Adeyemi forward without a word and process him ahead of those waiting.",
       id: "Melambaikan Mr Adeyemi maju tanpa penjelasan dan melayaninya mendahului yang lain."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Die richtige Idee, unsichtbar ausgeführt: Ohne Erklärung wirkt das Vorziehen wie Willkür — drei Gäste ärgern sich zu Recht. Ein Satz an die Schlange hätte aus der Bevorzugung Fairness gemacht (P1).",
       en: "The right idea, executed invisibly: without explanation the fast-tracking looks like favouritism — three guests are rightly annoyed. One sentence to the queue would have turned preference into fairness (P1).",
       id: "Idenya benar, tetapi dijalankan tanpa terlihat: tanpa penjelasan, mendahulukan seseorang tampak seperti pilih kasih — tiga tamu wajar merasa kesal. Satu kalimat kepada antrean akan mengubah keistimewaan menjadi keadilan (P1)."
      },
      next: "n2"
     },
     {
      id: "d",
      label: {
       de: "Der ganzen Schlange freundlich zurufen, dass es bestimmt jeder rechtzeitig schafft.",
       en: "Call out warmly to the whole queue that everyone will surely make it in time.",
       id: "Berseru ramah kepada seluruh antrean bahwa semua pasti akan sempat."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Beruhigend gemeint — aber ungedeckt: Bei diesem Drucker wissen Sie nicht, ob 08:05 für Position vier zu halten ist. Statt kollektiver Beruhigung braucht es ein Kriterium und eine Umsortierung (P1, P4).",
       en: "Meant to reassure — but uncovered: with this printer you cannot know whether 08:05 holds for position four. Instead of collective soothing, you need a criterion and a re-ordering (P1, P4).",
       id: "Niatnya menenangkan — tetapi tanpa jaminan: dengan pencetak selambat ini, Anda tidak tahu apakah pukul 08:05 terkejar dari urutan keempat. Alih-alih menenangkan massal, yang dibutuhkan adalah kriteria dan pengaturan ulang urutan (P1, P4)."
      },
      next: "n2"
     }
    ]
   },
   n2: {
    type: "decision",
    phase: { de: "Tempo aufnehmen", en: "Picking up speed", id: "Proses cepat" },
    narration: {
     de: "Mr Adeyemi steht jetzt vor Ihnen; die Schlange dahinter ist auf sieben Personen angewachsen, und der Drucker braucht weiter fast eine Minute pro Rechnung. Ihre Tresen-Kollegin arbeitet bereits am Anschlag — im Backoffice sitzt eine weitere Kollegin.",
     en: "Mr Adeyemi now stands before you; the queue behind has grown to seven, and the printer still needs almost a minute per invoice. Your desk colleague is already at full stretch — another colleague is sitting in the back office.",
     id: "Mr Adeyemi kini berdiri di depan Anda; antrean di belakang bertambah menjadi tujuh orang, dan pencetak masih butuh hampir satu menit per tagihan. Rekan Anda di meja sudah bekerja maksimal — di back-office masih ada satu rekan lagi."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Kurz ins Backoffice rufen und die Kollegin bitten, einen dritten Platz zu öffnen, während Sie weiterarbeiten.",
       en: "Call the back office briefly and ask your colleague to open a third station while you keep working.",
       id: "Menghubungi back-office sebentar dan meminta rekan membuka loket ketiga sementara Anda terus bekerja."
      },
      scores: { d: 2, l: 2, s: 2 },
      flags: { escalate: true },
      feedback: {
       de: "Genau richtig: Sie erkennen die Grenze der aktuellen Besetzung und holen Verstärkung, bevor die Schlange kippt (P5). Ein Anruf, dreißig Sekunden — und die Kapazität wächst um die Hälfte. Das ist Teamarbeit im richtigen Moment.",
       en: "Exactly right: you recognise the limit of the current staffing and call in reinforcement before the queue tips (P5). One call, thirty seconds — and capacity grows by half. That is teamwork at the right moment.",
       id: "Tepat sekali: Anda mengenali batas kapasitas saat ini dan memanggil bantuan sebelum antrean memburuk (P5). Satu panggilan, tiga puluh detik — dan kapasitas bertambah separuh. Itulah kerja tim di momen yang tepat."
      },
      next: "n3"
     },
     {
      id: "b",
      label: {
       de: "Den Kopf senken und einfach schneller arbeiten — für Telefonate ist jetzt keine Zeit.",
       en: "Keep your head down and simply work faster — no time for phone calls now.",
       id: "Menunduk dan bekerja lebih cepat saja — tidak ada waktu untuk menelepon sekarang."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Fleiß ersetzt keine Kapazität: Zwei Plätze bleiben zwei Plätze, so schnell Sie auch tippen. Die dreißig Sekunden für den Anruf ins Backoffice hätten mehr gebracht als zehn Minuten Höchsttempo (P5).",
       en: "Diligence does not replace capacity: two stations stay two stations however fast you type. The thirty seconds for the back-office call would have yielded more than ten minutes at top speed (P5).",
       id: "Kerja keras tidak menggantikan kapasitas: dua loket tetap dua loket secepat apa pun Anda mengetik. Tiga puluh detik untuk menelepon back-office akan menghasilkan lebih banyak daripada sepuluh menit kecepatan penuh (P5)."
      },
      next: "n3"
     },
     {
      id: "c",
      label: {
       de: "Hörbar seufzen und der Schlange erklären, dass das Haus mal wieder zu wenig Personal eingeplant hat.",
       en: "Sigh audibly and tell the queue that the hotel has once again scheduled too few staff.",
       id: "Menghela napas keras dan berkata kepada antrean bahwa hotel lagi-lagi kekurangan orang."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Interne Kritik gehört ins Team-Gespräch, nie an den Tresen: Die Gäste verlieren Vertrauen, die Kollegen werden bloßgestellt — und schneller wird dadurch nichts. Nach vorn wirkt nur eine Lösung, keine Anklage (P1, P5).",
       en: "Internal criticism belongs in the team meeting, never at the desk: guests lose confidence, colleagues are exposed — and nothing gets faster. Only a solution works outward, never an accusation (P1, P5).",
       id: "Kritik internal tempatnya di rapat tim, bukan di meja depan: tamu kehilangan kepercayaan, rekan kerja dipermalukan — dan tidak ada yang menjadi lebih cepat. Yang berdampak keluar hanyalah solusi, bukan gugatan (P1, P5)."
      },
      next: "n3"
     },
     {
      id: "d",
      label: {
       de: "Sich bei jedem Gast ausführlich für die Wartezeit entschuldigen, bevor Sie mit dessen Check-out beginnen.",
       en: "Apologise to every guest at length for the wait before starting their check-out.",
       id: "Meminta maaf panjang lebar kepada setiap tamu atas waktu tunggu sebelum memulai check-out mereka."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Die Geste ist freundlich — aber eine lange Entschuldigung pro Gast verlängert genau die Wartezeit, für die Sie sich entschuldigen. Ein kurzer Satz genügt; die beste Entschuldigung ist jetzt Geschwindigkeit (P1).",
       en: "The gesture is kind — but a long apology per guest extends exactly the wait you are apologising for. One short sentence is enough; the best apology right now is speed (P1).",
       id: "Gesturnya ramah — tetapi permintaan maaf yang panjang untuk setiap tamu justru memperpanjang waktu tunggu yang Anda mintakan maaf. Satu kalimat singkat cukup; permintaan maaf terbaik saat ini adalah kecepatan (P1)."
      },
      next: "n3"
     }
    ]
   },
   n3: {
    type: "decision",
    phase: { de: "Rechnungsgenauigkeit", en: "Invoice accuracy", id: "Akurasi tagihan" },
    narration: {
     de: "08:00. Mr Adeyemis Rechnung liegt im Drucker: übernachtung, Frühstück, zwei Minibar-Posten. Fünf Minuten bis zum Shuttle. Verlockend, einfach auf „Drucken“ zu gehen — doch ein Fehler jetzt würde ihn Wochen der Klärung aus dem Ausland kosten.",
     en: "08:00. Mr Adeyemi's invoice is queued in the printer: room, breakfast, two minibar items. Five minutes to the shuttle. Tempting to just hit “print” — but an error now would cost him weeks of clarification from abroad.",
     id: "Pukul 08:00. Tagihan Mr Adeyemi siap dicetak: kamar, sarapan, dua butir minibar. Lima menit menuju shuttle. Menggoda untuk langsung menekan “cetak” — tetapi kesalahan sekarang akan membuatnya berminggu-minggu mengurus klarifikasi dari luar negeri."
    },
    guestLine: {
     de: "Es sieht bestimmt alles gut aus — ich muss wirklich los.",
     en: "I am sure it is all fine — I really have to go.",
     id: "Pasti semuanya sudah benar — saya benar-benar harus berangkat."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Die drei Kernposten in zwanzig Sekunden laut mit ihm durchgehen — Zimmer, Frühstück, Minibar — und dann drucken.",
       en: "Run through the three key items aloud with him in twenty seconds — room, breakfast, minibar — then print.",
       id: "Menelusuri tiga butir utama bersama beliau dalam dua puluh detik — kamar, sarapan, minibar — lalu mencetak."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Der Zwanzig-Sekunden-Check der Kernposten ist der beste Kompromiss aus Tempo und Genauigkeit (P6). Bestätigt der Gast die Posten mündlich, reisen beide Seiten mit ruhigem Gewissen.",
       en: "Exemplary: the twenty-second check of the key items is the best compromise between speed and accuracy (P6). With the guest confirming the items aloud, both sides travel with a clear conscience.",
       id: "Teladan: pemeriksaan dua puluh detik atas butir-butir utama adalah kompromi terbaik antara kecepatan dan akurasi (P6). Dengan tamu mengonfirmasi secara lisan, kedua pihak berpisah dengan tenang."
      },
      next: "n4"
     },
     {
      id: "b",
      label: {
       de: "Ungeprüft drucken und die Rechnung übergeben — die Zeit ist einfach zu knapp.",
       en: "Print unchecked and hand over the invoice — time is simply too short.",
       id: "Mencetak tanpa pemeriksaan dan menyerahkan tagihan — waktunya benar-benar mepet."
      },
      scores: { d: 1, l: 1, s: 0 },
      feedback: {
       de: "Das gesparte Halbminütchen kann teuer werden: Ein falscher Posten, entdeckt am Flughafen oder zu Hause, bedeutet Korrespondenz, Korrekturen, Kartenrückbuchung — alles aus der Ferne. Der Kurz-Check ist billiger (P6).",
       en: "The half minute saved can get expensive: a wrong item, discovered at the airport or at home, means correspondence, corrections, card refunds — all from a distance. The quick check is cheaper (P6).",
       id: "Setengah menit yang dihemat bisa berbuah mahal: satu butir yang salah, ditemukan di bandara atau di rumah, berarti surat-menyurat, koreksi, pengembalian dana kartu — semuanya dari jauh. Pemeriksaan singkat jauh lebih murah (P6)."
      },
      next: "n4"
     },
     {
      id: "c",
      label: {
       de: "Auf der vollständigen Standardprüfung aller Einzelposten bestehen — Sorgfalt kennt keinen Zeitdruck.",
       en: "Insist on the full standard check of every single item — diligence knows no time pressure.",
       id: "Bersikeras menjalankan pemeriksaan standar lengkap untuk setiap butir — ketelitian tidak mengenal tekanan waktu."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Sorgfalt ja — aber verhältnismäßig: Die Vollprüfung dauert Minuten, die Mr Adeyemi nicht hat, und behandelt seine Notlage als Störung. Der fokussierte Kurz-Check sichert die kritischen Posten in einem Bruchteil der Zeit (P4, P6).",
       en: "Diligence yes — but proportionate: the full check takes minutes Mr Adeyemi does not have and treats his predicament as a nuisance. The focused quick check secures the critical items in a fraction of the time (P4, P6).",
       id: "Teliti memang perlu — tetapi proporsional: pemeriksaan penuh memakan menit yang tidak dimiliki Mr Adeyemi dan memperlakukan kesulitannya sebagai gangguan. Pemeriksaan singkat yang terfokus mengamankan butir kritis dalam sekejap (P4, P6)."
      },
      next: "n4"
     },
     {
      id: "d",
      label: {
       de: "Beim Prüfen beiläufig nach seinem Aufenthalt und dem Reiseziel fragen, um die Wartezeit aufzulockern.",
       en: "While checking, casually ask about his stay and his destination to lighten the wait.",
       id: "Sambil memeriksa, bertanya santai tentang pengalaman menginap dan tujuan perjalanannya untuk mencairkan suasana."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Die Prüfung ist da, die Prioritäten nicht ganz: Jede Plauderfrage kostet Sekunden, die gerade sein knappstes Gut sind. Freundlichkeit zeigt sich jetzt im Tempo — das Gespräch schenken Sie dem nächsten Gast ohne Shuttle (P1).",
       en: "The check is there, the priorities not quite: every chatty question costs seconds that are currently his scarcest resource. Right now friendliness shows in pace — save the conversation for the next guest without a shuttle (P1).",
       id: "Pemeriksaannya jalan, prioritasnya belum pas: setiap pertanyaan basa-basi menghabiskan detik yang kini menjadi harta paling langka baginya. Saat ini keramahan berwujud kecepatan — simpan obrolan untuk tamu berikutnya yang tidak dikejar shuttle (P1)."
      },
      next: "n4"
     }
    ]
   },
   n4: {
    type: "decision",
    phase: { de: "Abschluss", en: "Closing", id: "Penutup" },
    narration: {
     de: "08:03. Die Rechnung stimmt, die Karte ist zurückgegeben. Mr Adeyemi wirft sich den Rucksack über — durch die Glastür ist der wartende Shuttle zu sehen. Hinter ihm rückt die Schlange nach, inzwischen an drei Plätzen bedient.",
     en: "08:03. The invoice is correct, the card returned. Mr Adeyemi swings on his backpack — through the glass door the waiting shuttle is visible. Behind him the queue moves up, now served at three stations.",
     id: "Pukul 08:03. Tagihan benar, kartu sudah dikembalikan. Mr Adeyemi menyandang ranselnya — dari pintu kaca terlihat shuttle yang menunggu. Di belakangnya antrean bergerak maju, kini dilayani di tiga loket."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Gute Reise wünschen, kurz zur Schlange gewandt danken — und den Druckerausfall für die Übergabe notieren.",
       en: "Wish him a good journey, turn briefly to thank the queue — and note the printer trouble for the handover.",
       id: "Mengucapkan selamat jalan, berbalik sejenak berterima kasih kepada antrean — dan mencatat masalah pencetak untuk serah terima."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Der runde Abschluss: Der eilige Gast geht mit guten Wünschen, die geduldige Schlange bekommt ihre Anerkennung, und der lahme Drucker steht im Protokoll, bevor er die nächste Stoßzeit sabotiert (P1, P6).",
       en: "The complete close: the hurried guest leaves with good wishes, the patient queue gets its acknowledgement, and the sluggish printer goes into the log before it sabotages the next rush (P1, P6).",
       id: "Penutup yang bulat: tamu yang terburu-buru pergi dengan doa baik, antrean yang sabar mendapat penghargaan, dan pencetak yang lambat masuk log sebelum menyabotase jam sibuk berikutnya (P1, P6)."
      },
      next: "x1"
     },
     {
      id: "b",
      label: {
       de: "Ihm herzlich hinterherwinken und sofort nahtlos zum nächsten Gast übergehen.",
       en: "Wave him off warmly and move seamlessly straight to the next guest.",
       id: "Melambai hangat kepadanya lalu langsung beralih mulus ke tamu berikutnya."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Warm und flüssig — aber zwei Kleinigkeiten fehlen: Die geduldige Schlange hat ein Dankeschön verdient, und der Druckerausfall gehört in die Übergabe, damit die nächste Schicht vorbereitet ist (P6).",
       en: "Warm and fluid — but two small things are missing: the patient queue has earned a thank-you, and the printer trouble belongs in the handover so the next shift is prepared (P6).",
       id: "Hangat dan mengalir — tetapi dua hal kecil terlewat: antrean yang sabar layak menerima terima kasih, dan masalah pencetak semestinya masuk serah terima agar sif berikutnya siap (P6)."
      },
      next: "x2"
     },
     {
      id: "c",
      label: {
       de: "Erleichtert durchatmen und der Kollegin zurufen, dass „der Stress“ endlich weg ist.",
       en: "Exhale with relief and call over to your colleague that “the stress” is finally gone.",
       id: "Menghela napas lega dan berseru kepada rekan bahwa “sumber kerepotan” akhirnya pergi."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "„Der Stress“ ist ein Gast — und die halbe Schlange hört den Kommentar mit. Ein einziger despektierlicher Satz kann die Wirkung von zwanzig gelungenen Check-outs löschen (P1). Respekt gilt auch nach dem Abschied.",
       en: "“The stress” is a guest — and half the queue hears the remark. One disrespectful sentence can erase the effect of twenty successful check-outs (P1). Respect applies after the goodbye too.",
       id: "“Sumber kerepotan” itu adalah seorang tamu — dan separuh antrean ikut mendengar komentar itu. Satu kalimat yang merendahkan dapat menghapus efek dua puluh check-out yang berhasil (P1). Rasa hormat tetap berlaku setelah perpisahan."
      },
      next: "x3"
     }
    ]
   },
   x1: {
    type: "outcome",
    tone: "good",
    ending: {
     de: "Durch die Glastür sehen Sie Mr Adeyemi in den Shuttle steigen — 08:04. Die Schlange läuft an drei Plätzen zügig ab, und im Übergabeprotokoll wartet die Drucker-Notiz auf die Technik. Faire Triage, rechtzeitige Verstärkung, der Zwanzig-Sekunden-Check: So fühlt sich eine gemeisterte Stoßzeit an.",
     en: "Through the glass door you watch Mr Adeyemi board the shuttle — 08:04. The queue flows briskly across three stations, and in the handover log the printer note awaits maintenance. Fair triage, timely reinforcement, the twenty-second check: this is what a mastered rush hour feels like.",
     id: "Dari pintu kaca Anda melihat Mr Adeyemi naik ke shuttle — pukul 08:04. Antrean mengalir lancar di tiga loket, dan di log serah terima catatan pencetak menunggu tim teknis. Triase yang adil, bantuan yang tepat waktu, pemeriksaan dua puluh detik: beginilah rasanya jam sibuk yang tertaklukkan."
    }
   },
   x2: {
    type: "outcome",
    tone: "mixed",
    ending: {
     de: "Mr Adeyemi hat seinen Shuttle vermutlich erreicht, und die Schlange wurde bewältigt. Trotzdem blieb Potenzial liegen: eine unerklärte Bevorzugung, verschenkte Kapazität oder eine fehlende Notiz. Stoßzeiten verzeihen Improvisation — aber sie belohnen System: Kriterium, Verstärkung, Kurz-Check, Übergabe.",
     en: "Mr Adeyemi probably made his shuttle, and the queue was handled. Still, potential was left on the table: an unexplained fast-track, unused capacity or a missing note. Rush hours forgive improvisation — but they reward system: criterion, reinforcement, quick check, handover.",
     id: "Mr Adeyemi kemungkinan besar terkejar shuttle-nya, dan antrean berhasil ditangani. Meski begitu, ada potensi yang tersisa: pendahuluan tanpa penjelasan, kapasitas yang tak terpakai, atau catatan yang terlupa. Jam sibuk memaafkan improvisasi — tetapi mengganjar sistem: kriteria, bantuan, pemeriksaan singkat, serah terima."
    }
   },
   x3: {
    type: "outcome",
    tone: "poor",
    ending: {
     de: "Ob Mr Adeyemi den Shuttle erreicht hat, wissen Sie nicht — sicher ist: Die Schlange hat heute eine Rezeption erlebt, die starr wirkte, überfordert oder respektlos. Stoßzeiten sind das Schaufenster des Hauses: Wer dort Triage, Teamarbeit und Genauigkeit zeigt, gewinnt sieben Gäste auf einmal — wer sie auslässt, verliert sie ebenso gesammelt (P1, P5, P6).",
     en: "Whether Mr Adeyemi made the shuttle you do not know — what is certain: the queue today experienced a front desk that seemed rigid, overwhelmed or disrespectful. Rush hours are the hotel's shop window: show triage, teamwork and accuracy there and you win seven guests at once — skip them and you lose them just as collectively (P1, P5, P6).",
     id: "Apakah Mr Adeyemi terkejar shuttle-nya, Anda tidak tahu — yang pasti: antrean hari ini menyaksikan resepsionis yang kaku, kewalahan, atau kurang hormat. Jam sibuk adalah etalase hotel: tunjukkan triase, kerja tim, dan akurasi di sana, maka Anda memenangkan tujuh tamu sekaligus — abaikan itu, dan Anda kehilangan mereka secara bersamaan pula (P1, P5, P6)."
    }
   }
  },
  debrief: {
   tips: {
    decision: {
     de: "Triagieren Sie mit offenem Kriterium: „Dringende Transfers zuerst“ laut ausgesprochen macht jede Umsortierung fair — dieselbe Umsortierung ohne Erklärung wirkt wie Willkür.",
     en: "Triage with an open criterion: “urgent transfers first”, said aloud, makes any re-ordering fair — the same re-ordering without explanation looks like favouritism.",
     id: "Lakukan triase dengan kriteria terbuka: “transfer mendesak lebih dahulu” yang diucapkan membuat pengaturan ulang urutan menjadi adil — pengaturan yang sama tanpa penjelasan tampak seperti pilih kasih."
    },
    language: {
     de: "Sprechen Sie unter Druck mit der ganzen Schlange, nicht nur mit dem vordersten Gast: Ein Satz an alle („Danke für Ihre Geduld, wir öffnen einen dritten Platz“) beruhigt sieben Menschen auf einmal.",
     en: "Under pressure, speak to the whole queue, not just the front guest: one sentence to everyone (“thank you for your patience, we are opening a third station”) calms seven people at once.",
     id: "Dalam tekanan, bicaralah kepada seluruh antrean, bukan hanya tamu terdepan: satu kalimat untuk semua (“terima kasih atas kesabarannya, kami membuka loket ketiga”) menenangkan tujuh orang sekaligus."
    },
    sop: {
     de: "Auch der schnellste Check-out braucht den Kurz-Check der Kernposten und die Übergabenotiz bei Störungen: Zwanzig Sekunden Prüfung ersparen Wochen Fernkorrektur (P6).",
     en: "Even the fastest check-out needs the quick check of key items and a handover note for faults: twenty seconds of checking saves weeks of remote correction (P6).",
     id: "Check-out tercepat sekalipun tetap memerlukan pemeriksaan singkat butir utama dan catatan serah terima untuk gangguan: dua puluh detik pemeriksaan menghemat berminggu-minggu koreksi jarak jauh (P6)."
    }
   },
   safetyTip: {
    de: "Lassen Sie Zeitdruck nie die Rechnungsprüfung oder den Respekt streichen: Ungeprüfte Rechnungen und abfällige Bemerkungen sind die zwei teuersten Abkürzungen der Stoßzeit (P1, P6).",
    en: "Never let time pressure cut the invoice check or the respect: unchecked invoices and disparaging remarks are the two most expensive shortcuts of the rush hour (P1, P6).",
    id: "Jangan biarkan tekanan waktu memangkas pemeriksaan tagihan maupun rasa hormat: tagihan tanpa periksa dan komentar merendahkan adalah dua jalan pintas termahal di jam sibuk (P1, P6)."
   },
   praise: {
    de: "Hervorragend: faire Triage, rechtzeitige Verstärkung, genaue Rechnung und ein respektvoller Abschluss — die komplette Stoßzeiten-Choreografie. Wiederholen Sie sie in einer anderen Sprache, bis sie automatisch abläuft.",
    en: "Outstanding: fair triage, timely reinforcement, an accurate invoice and a respectful close — the complete rush-hour choreography. Repeat it in another language until it runs automatically.",
    id: "Istimewa: triase yang adil, bantuan tepat waktu, tagihan akurat, dan penutup yang penuh hormat — koreografi jam sibuk yang lengkap. Ulangi dalam bahasa lain sampai berjalan otomatis."
   }
  },
  sopRefs: ["P1", "P4", "P5", "P6"]
 };
})();
