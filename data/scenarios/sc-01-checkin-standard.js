(function () {
 "use strict";
 window.HSL = window.HSL || {};
 var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
 data.scenarios["sc-01-checkin-standard"] = {
  id: "sc-01-checkin-standard",
  category: "checkin",
  difficulty: 1,
  minutes: 5,
  title: {
   de: "Check-in mit Reservierung",
   en: "Check-in with a Reservation",
   id: "Check-in Tamu dengan Reservasi"
  },
  summary: {
   de: "Ein Gast mit Reservierung trifft am Nachmittag ein, und die Schlange hinter ihm wächst.",
   en: "A guest with a reservation arrives in the afternoon, and the queue behind him grows.",
   id: "Seorang tamu dengan reservasi tiba pada sore hari, sementara antrean di belakangnya bertambah."
  },
  context: {
   place: {
    de: "Empfang Ihres Hauses, 15:05 an einem Werktag.",
    en: "The front desk of your hotel, 15:05 on a weekday.",
    id: "Meja resepsionis hotel Anda, pukul 15:05 pada hari kerja."
   },
   situation: {
    de: "Herr Albrecht kommt mit einer Reservierung für drei Nächte an. Sein Zimmer ist fertig vorbereitet. Hinter ihm stellen sich zwei weitere Gäste an.",
    en: "Mr Albrecht arrives with a reservation for three nights. His room is ready. Two more guests are lining up behind him.",
    id: "Bapak Albrecht tiba dengan reservasi tiga malam. Kamarnya sudah siap. Dua tamu lain mulai mengantre di belakangnya."
   },
   guest: {
    de: "Herr Albrecht, 58, Geschäftsreisender; höflich, leicht in Eile.",
    en: "Mr Albrecht, 58, travelling on business; polite, slightly pressed for time.",
    id: "Bapak Albrecht, 58 tahun, tamu bisnis; sopan dan sedikit terburu-buru."
   },
   constraints: {
    de: "Ihre Kollegin ist in der Pause: Sie sind vorerst allein am Empfang, und die Lobby ist gut besucht.",
    en: "Your colleague is on her break: for now you are alone at the desk, and the lobby is busy.",
    id: "Rekan Anda sedang istirahat: untuk sementara Anda sendirian di meja resepsionis, dan lobi cukup ramai."
   }
  },
  goals: [
   {
    de: "Den Ablauf Begrüßung – Verifizierung – Information sicher führen.",
    en: "Lead the sequence of greeting, verification and information with confidence.",
    id: "Menjalankan alur sambutan, verifikasi, dan informasi dengan percaya diri."
   },
   {
    de: "Die Zimmernummer diskret weitergeben (P3).",
    en: "Hand over the room number discreetly (P3).",
    id: "Menyampaikan nomor kamar secara diskret (P3)."
   },
   {
    de: "Auch bei wachsender Schlange freundlich und vollständig bleiben.",
    en: "Stay friendly and thorough even while a queue builds.",
    id: "Tetap ramah dan lengkap meski antrean bertambah."
   }
  ],
  startNode: "n1",
  nodes: {
   n1: {
    type: "decision",
    phase: { de: "Begrüßung", en: "Greeting", id: "Sambutan" },
    narration: {
     de: "Ein Gast kommt mit seinem Koffer auf den Empfang zu. Hinter ihm stellen sich zwei weitere Gäste an.",
     en: "A guest approaches the front desk with his suitcase. Two more guests line up behind him.",
     id: "Seorang tamu mendekati meja resepsionis sambil menarik koper. Dua tamu lain mulai mengantre di belakangnya."
    },
    guestLine: {
     de: "Guten Tag, ich habe eine Reservierung auf den Namen Albrecht.",
     en: "Good afternoon, I have a reservation under the name Albrecht.",
     id: "Selamat siang, saya memiliki reservasi atas nama Albrecht."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Herzlich begrüßen, die Reservierung im System bestätigen und höflich um den Ausweis bitten.",
       en: "Welcome him warmly, confirm the reservation in the system, and politely ask for his ID.",
       id: "Menyambut hangat, mengonfirmasi reservasi di sistem, lalu meminta dokumen identitas dengan sopan."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Begrüßung, Bestätigung und Identitätsprüfung in einem ruhigen Ablauf (P1, P2). Der Gast fühlt sich erwartet, und das Verfahren bleibt vollständig.",
       en: "Exemplary: greeting, confirmation and identity check in one calm sequence (P1, P2). The guest feels expected and the procedure stays complete.",
       id: "Teladan: sambutan, konfirmasi, dan pemeriksaan identitas berjalan dalam satu alur yang tenang (P1, P2). Tamu merasa disambut dan prosedur tetap lengkap."
      },
      next: "n2"
     },
     {
      id: "b",
      label: {
       de: "Freundlich begrüßen und sofort das Zimmer zusagen, ohne System oder Ausweis zu prüfen.",
       en: "Greet him warmly and promise the room right away without checking the system or his ID.",
       id: "Menyambut ramah dan langsung menjanjikan kamar tanpa memeriksa sistem atau dokumen identitas."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Der Ton stimmt, aber ohne Prüfung riskieren Sie Verwechslungen und Lücken im Meldeverfahren (P2). Erst verifizieren, dann zusagen.",
       en: "The tone is right, but skipping verification risks mix-ups and gaps in registration (P2). Verify first, then promise.",
       id: "Nada bicara sudah tepat, tetapi tanpa verifikasi Anda berisiko salah tamu dan prosedur registrasi tidak lengkap (P2). Verifikasi dahulu, baru berjanji."
      },
      next: "n2"
     },
     {
      id: "c",
      label: {
       de: "Ohne Begrüßung knapp sagen: „Ausweis, bitte“, und die Daten prüfen.",
       en: "Skip the greeting, say curtly: “ID, please,” and check the details.",
       id: "Tanpa sambutan, berkata singkat: “Kartu identitas,” lalu memeriksa data."
      },
      scores: { d: 2, l: 1, s: 2 },
      feedback: {
       de: "Fachlich korrekt, aber der erste Eindruck entscheidet: Ohne Begrüßung wirkt die Rezeption abweisend (P1). Verfahren gut, Ton ausbaufähig.",
       en: "Procedurally correct, but first impressions decide: without a greeting the desk feels cold (P1). Good procedure, tone needs work.",
       id: "Secara prosedur benar, tetapi kesan pertama menentukan: tanpa sambutan, resepsionis terasa dingin (P1). Prosedur baik, nada perlu diperbaiki."
      },
      next: "n2"
     },
     {
      id: "d",
      label: {
       de: "Den Gast ohne Erklärung warten lassen, bis Sie Ihre andere Aufgabe beendet haben.",
       en: "Let the guest wait without explanation until you finish your other task.",
       id: "Membiarkan tamu menunggu tanpa penjelasan sampai Anda menyelesaikan pekerjaan lain."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Jeder Gast wird sofort wahrgenommen, auch wenn Sie beschäftigt sind (P1): kurzer Blickkontakt und „Einen Moment, bitte“ genügen. Unerklärtes Warten wirkt wie Ignorieren.",
       en: "Every guest is acknowledged at once, even when you are busy (P1): brief eye contact and “one moment, please” is enough. Unexplained waiting reads as being ignored.",
       id: "Setiap tamu harus segera diakui kehadirannya walau Anda sibuk (P1): kontak mata singkat dan “mohon tunggu sebentar” sudah cukup. Menunggu tanpa penjelasan terasa seperti diabaikan."
      },
      next: "n2"
     }
    ]
   },
   n2: {
    type: "decision",
    phase: { de: "Verifizierung", en: "Verification", id: "Verifikasi" },
    narration: {
     de: "Herr Albrecht legt seinen Ausweis auf den Tresen. Im System finden Sie die Reservierung: drei Nächte, Nichtraucherzimmer, Frühstück inklusive. Die beiden Gäste hinter ihm warten geduldig, schauen aber immer wieder zu Ihnen herüber.",
     en: "Mr Albrecht places his ID on the counter. In the system you find the reservation: three nights, a non-smoking room, breakfast included. The two guests behind him wait patiently but keep glancing your way.",
     id: "Bapak Albrecht meletakkan kartu identitasnya di meja. Di sistem Anda menemukan reservasinya: tiga malam, kamar bebas rokok, termasuk sarapan. Dua tamu di belakangnya menunggu dengan sabar sambil sesekali melirik ke arah Anda."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Die Daten in Ruhe mit dem Ausweis abgleichen, den Aufenthalt kurz bestätigen und das Meldeformular vervollständigen.",
       en: "Calmly match the details against his ID, briefly confirm the stay, and complete the registration form.",
       id: "Mencocokkan data dengan kartu identitas secara tenang, mengonfirmasi rincian menginap, dan melengkapi formulir registrasi."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau richtig: Abgleich, Bestätigung und vollständiges Meldeformular sichern den Check-in ab (P2). Die kurze Bestätigung zeigt dem Gast zugleich, dass alles stimmt.",
       en: "Exactly right: matching the details, confirming the stay and completing the registration form make the check-in solid (P2). The brief confirmation also shows the guest that everything is in order.",
       id: "Tepat sekali: pencocokan data, konfirmasi, dan formulir registrasi yang lengkap mengamankan check-in (P2). Konfirmasi singkat sekaligus menunjukkan kepada tamu bahwa semuanya benar."
      },
      next: "n3"
     },
     {
      id: "b",
      label: {
       de: "Alle Formalitäten zügig und schweigend abarbeiten, ohne den Gast zwischendurch anzusprechen.",
       en: "Work through all the formalities quickly and in silence, without addressing the guest in between.",
       id: "Menyelesaikan semua formalitas dengan cepat dan diam, tanpa berbicara kepada tamu di sela-selanya."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Das Verfahren ist vollständig, wirkt aber wie am Fließband. Ein erklärender Satz („Ich gleiche kurz Ihre Daten ab“) hält den Kontakt warm, ohne Zeit zu kosten (P1).",
       en: "The procedure is complete but feels like a production line. One explanatory sentence (“I am just checking your details”) keeps the contact warm at no cost in time (P1).",
       id: "Prosedurnya lengkap, tetapi terasa seperti ban berjalan. Satu kalimat penjelas (“Saya cocokkan data Anda sebentar”) menjaga kehangatan tanpa menambah waktu (P1)."
      },
      next: "n3"
     },
     {
      id: "c",
      label: {
       de: "Die Kollegin aus der Pause anrufen und um Übernahme der Verifizierung bitten, während Sie die Wartenden begrüßen.",
       en: "Phone your colleague on her break and ask her to take over the verification while you greet those waiting.",
       id: "Menelepon rekan yang sedang istirahat agar mengambil alih verifikasi, sementara Anda menyambut tamu yang menunggu."
      },
      scores: { d: 1, l: 2, s: 1 },
      flags: { escalate: true },
      feedback: {
       de: "Um Unterstützung zu bitten ist nie verkehrt (P5) — hier aber noch nicht nötig: Ein Standard-Check-in mit zwei Wartenden ist allein gut zu schaffen. Führen Sie die Verifizierung selbst zu Ende und behalten Sie die Schlange im Blick.",
       en: "Asking for support is never wrong (P5) — but it is not needed yet: a standard check-in with two people waiting is manageable alone. Complete the verification yourself and keep an eye on the queue.",
       id: "Meminta dukungan tidak pernah salah (P5) — tetapi di sini belum diperlukan: check-in standar dengan dua tamu menunggu masih dapat ditangani sendiri. Selesaikan verifikasi sendiri sambil tetap memantau antrean."
      },
      next: "n3"
     },
     {
      id: "d",
      label: {
       de: "Auf Ausweisabgleich und Meldeformular verzichten — die Reservierung steht ja im System, und die Schlange wächst.",
       en: "Skip the ID check and the registration form — the reservation is in the system, after all, and the queue is growing.",
       id: "Melewatkan pencocokan identitas dan formulir registrasi — reservasi sudah ada di sistem, dan antrean bertambah."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Zeitdruck rechtfertigt keine Lücken: Ohne Ausweisabgleich und Meldeformular riskieren Sie Verwechslungen und ein unvollständiges Meldeverfahren (P2). Der vollständige Ablauf dauert nur wenige Augenblicke.",
       en: "Time pressure does not justify gaps: without the ID check and the registration form you risk mix-ups and an incomplete registration procedure (P2). The full sequence only takes a few moments.",
       id: "Tekanan waktu tidak membenarkan celah: tanpa pencocokan identitas dan formulir registrasi, Anda berisiko salah tamu dan registrasi tidak lengkap (P2). Alur lengkap hanya butuh beberapa saat."
      },
      next: "n3"
     }
    ]
   },
   n3: {
    type: "decision",
    phase: { de: "Zimmerinformation", en: "Room information", id: "Informasi kamar" },
    narration: {
     de: "Die Formalitäten sind erledigt, die Schlüsselkarte ist codiert. Herr Albrecht steht direkt vor Ihnen; die Lobby ist voll, und die Wartenden stehen nur einen Schritt hinter ihm. Jetzt fehlen noch die Zimmernummer und die wichtigsten Informationen zum Haus.",
     en: "The formalities are done and the key card is coded. Mr Albrecht stands right in front of you; the lobby is full, and the waiting guests are only a step behind him. What remains is the room number and the key information about the hotel.",
     id: "Formalitas selesai dan kartu kunci sudah dikodekan. Bapak Albrecht berdiri tepat di depan Anda; lobi penuh, dan tamu yang menunggu hanya selangkah di belakangnya. Kini tinggal nomor kamar dan informasi terpenting tentang hotel."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Die Zimmernummer auf die Kartenhülle schreiben, sie diskret zeigen und Frühstückszeiten sowie den Weg zum Aufzug erklären.",
       en: "Write the room number on the card sleeve, show it discreetly, and explain breakfast times and the way to the lift.",
       id: "Menuliskan nomor kamar pada sampul kartu, menunjukkannya secara diskret, lalu menjelaskan jam sarapan dan arah menuju lift."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Die Zimmernummer bleibt vertraulich (P3), und der Gast bekommt alles für einen guten Start — Frühstück und Weg zum Zimmer. So klingt ein vollständiger Abschluss.",
       en: "Exemplary: the room number stays confidential (P3), and the guest receives everything he needs for a good start — breakfast and the way to his room. That is a complete hand-over.",
       id: "Teladan: nomor kamar tetap rahasia (P3), dan tamu menerima semua yang diperlukan untuk awal yang baik — sarapan dan arah menuju kamar. Beginilah penutup yang lengkap."
      },
      next: "n4"
     },
     {
      id: "b",
      label: {
       de: "Die Karte freundlich übergeben und die Nummer diskret zeigen, aber ohne Hinweise zu Frühstück oder Etage.",
       en: "Hand over the card warmly and show the number discreetly, but without mentioning breakfast or the floor.",
       id: "Menyerahkan kartu dengan ramah dan menunjukkan nomornya secara diskret, tetapi tanpa info sarapan atau lantai."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Die Diskretion stimmt (P3), doch die Information bleibt unvollständig: Ohne Frühstückszeiten und Orientierung fragt der Gast später nach — oder verpasst etwas. Ein Satz mehr macht den Abschluss rund.",
       en: "The discretion is right (P3), but the information stays incomplete: without breakfast times and directions the guest will have to ask later — or miss something. One more sentence completes the picture.",
       id: "Kediskretan sudah tepat (P3), tetapi informasi belum lengkap: tanpa jam sarapan dan orientasi arah, tamu akan bertanya lagi nanti — atau melewatkan sesuatu. Satu kalimat tambahan menyempurnakan penutup."
      },
      next: "n4"
     },
     {
      id: "c",
      label: {
       de: "Laut und deutlich sagen: „Zimmer 312 im dritten Stock“, damit der Gast es sicher versteht.",
       en: "Say loudly and clearly: “Room 312 on the third floor,” so the guest is sure to understand.",
       id: "Mengucapkan dengan lantang: “Kamar 312 di lantai tiga,” agar tamu pasti memahaminya."
      },
      scores: { d: 0, l: 1, s: 0 },
      flags: { unsafe: true },
      feedback: {
       de: "Nie die Zimmernummer laut durch die Lobby rufen: Jeder Umstehende weiß nun, wo Herr Albrecht schläft (P3). Zeigen oder schreiben Sie die Nummer diskret — Verständlichkeit und Vertraulichkeit schließen sich nicht aus.",
       en: "Never call a room number across the lobby: every bystander now knows where Mr Albrecht sleeps (P3). Show or write the number discreetly — clarity and confidentiality are not opposites.",
       id: "Jangan pernah menyebut nomor kamar dengan lantang di lobi: semua orang di sekitar kini tahu di mana Bapak Albrecht menginap (P3). Tunjukkan atau tuliskan nomornya secara diskret — kejelasan dan kerahasiaan dapat berjalan bersama."
      },
      next: "n4"
     },
     {
      id: "d",
      label: {
       de: "Karte samt Nummer rasch übergeben und den Gast wegen der Schlange direkt zum Aufzug schicken.",
       en: "Hand over the card and number quickly, and send the guest straight to the lift because of the queue.",
       id: "Menyerahkan kartu beserta nomornya dengan cepat, lalu langsung mengarahkan tamu ke lift karena antrean."
      },
      scores: { d: 1, l: 1, s: 1 },
      feedback: {
       de: "Verständlich bei Andrang, aber gehetzt: Der Gast bekommt keine Gelegenheit für Fragen, und wichtige Hinweise fehlen. Ein ruhiger Abschluss dauert kaum länger und wirkt deutlich professioneller (P1).",
       en: "Understandable under pressure, but rushed: the guest gets no chance to ask questions, and key information is missing. A calm close takes hardly any longer and feels far more professional (P1).",
       id: "Dapat dimaklumi saat ramai, tetapi terburu-buru: tamu tidak sempat bertanya dan informasi penting terlewat. Penutup yang tenang hampir tidak menambah waktu dan terasa jauh lebih profesional (P1)."
      },
      next: "n4"
     }
    ]
   },
   n4: {
    type: "decision",
    phase: { de: "Abschluss", en: "Closing", id: "Penutup" },
    narration: {
     de: "Herr Albrecht steckt die Schlüsselkarte ein und greift nach seinem Koffer. Die beiden Wartenden rücken schon nach. Ein letzter Moment für einen guten Abschluss.",
     en: "Mr Albrecht pockets the key card and reaches for his suitcase. The two waiting guests are already moving up. One last moment for a good finish.",
     id: "Bapak Albrecht menyimpan kartu kunci dan meraih kopernya. Dua tamu yang menunggu sudah bergeser maju. Satu momen terakhir untuk penutup yang baik."
    },
    guestLine: {
     de: "Vielen Dank, das ging ja schnell.",
     en: "Thank you, that was quick.",
     id: "Terima kasih, ternyata cepat sekali."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Einen angenehmen Aufenthalt wünschen, auf die Rezeption für Fragen verweisen und den nächsten Gast mit Blickkontakt begrüßen.",
       en: "Wish him a pleasant stay, mention the desk is there for questions, and greet the next guest with eye contact.",
       id: "Mengucapkan selamat beristirahat, menyampaikan bahwa resepsionis siap membantu, lalu menyambut tamu berikutnya dengan kontak mata."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Ein runder Abschluss: gute Wünsche, ein offenes Ohr für später — und der nächste Gast fühlt sich schon gesehen (P1). Genau so bleibt der Service auch bei Andrang persönlich.",
       en: "A well-rounded close: good wishes, an open door for later — and the next guest already feels seen (P1). This is how service stays personal even under pressure.",
       id: "Penutup yang bulat: ucapan selamat, kesediaan membantu nanti — dan tamu berikutnya sudah merasa diperhatikan (P1). Beginilah pelayanan tetap personal meski sedang ramai."
      },
      next: "x1"
     },
     {
      id: "b",
      label: {
       de: "Sich freundlich verabschieden und sich sofort dem Computer zuwenden, um den nächsten Vorgang zu öffnen.",
       en: "Say a friendly goodbye and turn straight to the computer to open the next file.",
       id: "Berpamitan dengan ramah lalu langsung menghadap komputer untuk membuka proses berikutnya."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Die Verabschiedung stimmt, doch der Übergang wirkt abrupt: Ein kurzer Blick zu den Wartenden („Einen Moment, ich bin gleich für Sie da“) hätte die Brücke geschlagen (P1).",
       en: "The goodbye is right, but the transition feels abrupt: a brief glance at those waiting (“One moment, I will be right with you”) would have bridged the gap (P1).",
       id: "Perpisahannya sudah tepat, tetapi transisinya terasa mendadak: pandangan singkat kepada yang menunggu (“Sebentar, saya segera melayani Anda”) akan menjadi jembatan yang baik (P1)."
      },
      next: "x2"
     },
     {
      id: "c",
      label: {
       de: "Ohne Verabschiedung „Der Nächste, bitte!“ rufen, um die Schlange abzuarbeiten.",
       en: "Call out “Next, please!” without a goodbye so you can work through the queue.",
       id: "Berseru “Berikutnya, silakan!” tanpa berpamitan agar antrean cepat selesai."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Der letzte Eindruck zählt wie der erste: Ohne Verabschiedung fühlt sich Herr Albrecht abgefertigt, und die Wartenden erleben denselben Ton (P1). Zwei freundliche Sekunden hätten genügt.",
       en: "The last impression counts as much as the first: without a goodbye Mr Albrecht feels processed rather than welcomed, and those waiting witness the same tone (P1). Two friendly seconds would have been enough.",
       id: "Kesan terakhir sama pentingnya dengan kesan pertama: tanpa pamit, Bapak Albrecht merasa sekadar diproses, dan tamu yang menunggu menyaksikan nada yang sama (P1). Dua detik keramahan sebenarnya cukup."
      },
      next: "x3"
     }
    ]
   },
   x1: {
    type: "outcome",
    tone: "good",
    ending: {
     de: "Herr Albrecht fährt zufrieden zum Aufzug; die Wartenden treten mit einem Lächeln an den Tresen, weil sie gesehen wurden. Begrüßung, Verifizierung, diskrete Information, Abschluss: Der Check-in war vollständig, warm und sicher — gute Routine schützt den Gast und Sie selbst.",
     en: "Mr Albrecht heads to the lift content; those waiting step up with a smile because they were acknowledged. Greeting, verification, discreet information, closing: the check-in was complete, warm and secure — good routine protects both the guest and you.",
     id: "Bapak Albrecht menuju lift dengan puas; tamu yang menunggu maju sambil tersenyum karena kehadiran mereka diakui. Sambutan, verifikasi, informasi diskret, penutup: check-in berjalan lengkap, hangat, dan aman — rutinitas yang baik melindungi tamu sekaligus Anda."
    }
   },
   x2: {
    type: "outcome",
    tone: "mixed",
    ending: {
     de: "Herr Albrecht ist untergebracht, und die Schlange kommt voran. Kleine Lücken bleiben: eine ausgelassene Information hier, ein knapper Übergang dort. Nichts davon ist schlimm — aber genau diese Details unterscheiden einen soliden Check-in von einem, an den sich der Gast gern erinnert.",
     en: "Mr Albrecht is settled and the queue is moving. Small gaps remain: a missing piece of information here, an abrupt transition there. None of it is serious — but exactly these details separate a solid check-in from one the guest remembers fondly.",
     id: "Bapak Albrecht sudah mendapatkan kamarnya dan antrean berjalan. Namun celah kecil tersisa: informasi yang terlewat di sini, transisi yang mendadak di sana. Tidak ada yang fatal — tetapi justru detail seperti inilah yang membedakan check-in yang sekadar beres dari check-in yang dikenang tamu."
    }
   },
   x3: {
    type: "outcome",
    tone: "poor",
    ending: {
     de: "Der Check-in ist technisch erledigt, doch der Eindruck leidet: Herr Albrecht geht mit gemischten Gefühlen zum Aufzug, und die Wartenden haben einen kühlen Ton erlebt. Nehmen Sie mit: Vollständige Schritte und ein warmer Rahmen kosten Sekunden — ihr Fehlen kostet Vertrauen.",
     en: "The check-in is technically done, but the impression suffers: Mr Albrecht walks to the lift with mixed feelings, and those waiting have witnessed a cold tone. Take this away: complete steps and a warm frame cost seconds — their absence costs trust.",
     id: "Secara teknis check-in selesai, tetapi kesannya terganggu: Bapak Albrecht menuju lift dengan perasaan campur aduk, dan tamu yang menunggu menyaksikan nada yang dingin. Pelajarannya: langkah lengkap dan suasana hangat hanya butuh hitungan detik — ketiadaannya mengorbankan kepercayaan."
    }
   }
  },
  debrief: {
   tips: {
    decision: {
     de: "Halten Sie die Reihenfolge stabil: erst begrüßen, dann verifizieren, dann informieren. Wer Schritte tauscht oder auslässt, erzeugt Rückfragen und Fehler — gerade bei Andrang.",
     en: "Keep the sequence stable: greet first, then verify, then inform. Swapping or skipping steps creates queries and mistakes — especially under pressure.",
     id: "Jaga urutan tetap stabil: sambut dahulu, lalu verifikasi, lalu informasikan. Menukar atau melewatkan langkah menimbulkan pertanyaan ulang dan kesalahan — apalagi saat ramai."
    },
    language: {
     de: "Kündigen Sie Ihre Handgriffe kurz an („Ich gleiche kurz Ihre Daten ab“): So bleibt auch Routine spürbar zugewandt, und Wartezeit fühlt sich kürzer an.",
     en: "Announce your actions briefly (“I am just checking your details”): routine then still feels attentive, and waiting feels shorter.",
     id: "Umumkan tindakan Anda secara singkat (“Saya cocokkan data Anda sebentar”): dengan begitu rutinitas tetap terasa penuh perhatian, dan waktu tunggu terasa lebih singkat."
    },
    sop: {
     de: "Ausweisabgleich und Meldeformular gehören zu jedem Check-in — auch wenn die Schlange wächst. Das Verfahren schützt den Gast vor Verwechslungen und Sie vor Lücken (P2).",
     en: "The ID check and the registration form belong to every check-in — even when the queue grows. The procedure protects the guest from mix-ups and you from gaps (P2).",
     id: "Pencocokan identitas dan formulir registrasi adalah bagian dari setiap check-in — sekalipun antrean bertambah. Prosedur ini melindungi tamu dari kekeliruan dan melindungi Anda dari celah (P2)."
    }
   },
   safetyTip: {
    de: "Die Zimmernummer ist vertraulich: nie laut aussprechen, sondern diskret zeigen oder aufschreiben (P3). Was die Lobby hört, hört auch jeder, der es nicht hören sollte.",
    en: "The room number is confidential: never say it aloud — show or write it discreetly (P3). Whatever the lobby hears, so does anyone who should not.",
    id: "Nomor kamar bersifat rahasia: jangan pernah diucapkan dengan lantang — tunjukkan atau tuliskan secara diskret (P3). Apa yang terdengar di lobi juga terdengar oleh siapa pun yang seharusnya tidak mendengarnya."
   },
   praise: {
    de: "Sehr stark: Sie haben Wärme, Verfahren und Diskretion in einem ruhigen Ablauf verbunden. Wiederholen Sie das Szenario in einer anderen Sprache, um die Formulierungen zu festigen.",
    en: "Very strong: you combined warmth, procedure and discretion in one calm flow. Replay the scenario in another language to consolidate the phrasing.",
    id: "Sangat baik: Anda memadukan kehangatan, prosedur, dan kediskretan dalam satu alur yang tenang. Ulangi skenario ini dalam bahasa lain untuk memantapkan frasa-frasanya."
   }
  },
  sopRefs: ["P1", "P2", "P3"]
 };
})();
