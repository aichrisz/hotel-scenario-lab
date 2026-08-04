(function () {
 "use strict";
 window.HSL = window.HSL || {};
 var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
 data.scenarios["sc-08-upsell-services"] = {
  id: "sc-08-upsell-services",
  category: "upsell",
  difficulty: 2,
  minutes: 5,
  title: {
   de: "Frühstück und Late Check-out anbieten",
   en: "Selling Breakfast and Late Check-out",
   id: "Penawaran Sarapan dan Late Check-out"
  },
  summary: {
   de: "Eine Geschäftsreisende checkt spät ein; Frühstück und Late Check-out könnten ihr den Morgen retten.",
   en: "A business traveller checks in late; breakfast and a late check-out could save her morning.",
   id: "Seorang tamu bisnis check-in larut malam; sarapan dan late check-out dapat menyelamatkan paginya."
  },
  context: {
   place: {
    de: "Empfang Ihres Hauses, 21:30; der Abendbetrieb klingt aus.",
    en: "The front desk of your hotel, 21:30; the evening bustle is winding down.",
    id: "Meja resepsionis hotel Anda, pukul 21:30; kesibukan malam mulai mereda."
   },
   situation: {
    de: "Ms Rossi checkt für eine Nacht ein — ohne Frühstück gebucht. Sie erwähnt ein wichtiges Meeting am Vormittag.",
    en: "Ms Rossi is checking in for one night — booked without breakfast. She mentions an important meeting in the morning.",
    id: "Ms Rossi check-in untuk satu malam — tanpa paket sarapan. Beliau menyebut rapat penting pada pagi hari."
   },
   guest: {
    de: "Ms Rossi, Ende 30, Geschäftsreisende nach einem langen Tag; freundlich, aber sichtlich müde und effizienzorientiert.",
    en: "Ms Rossi, late thirties, business traveller after a long day; friendly, but visibly tired and efficiency-minded.",
    id: "Ms Rossi, akhir 30-an, tamu bisnis setelah hari yang panjang; ramah, tetapi tampak lelah dan mengutamakan efisiensi."
   },
   constraints: {
    de: "Der Frühstücksraum ist zwischen 07:00–08:00 fast ausgebucht; Late Check-out hängt von der morgigen Belegung ab.",
    en: "The breakfast room is nearly at capacity between 07:00–08:00; late check-out depends on tomorrow's occupancy.",
    id: "Ruang sarapan hampir penuh antara pukul 07:00–08:00; late check-out bergantung pada okupansi besok."
   }
  },
  goals: [
   {
    de: "Bedarf mit einer gezielten Frage erschließen, statt blind anzubieten (P4).",
    en: "Uncover the need with one targeted question instead of offering blindly (P4).",
    id: "Menggali kebutuhan dengan satu pertanyaan terarah, bukan menawar membabi buta (P4)."
   },
   {
    de: "Ehrlich über Stoßzeiten und Verfügbarkeit sprechen (P8).",
    en: "Speak honestly about peak times and availability (P8).",
    id: "Berbicara jujur tentang jam ramai dan ketersediaan (P8)."
   },
   {
    de: "Angebote kurz halten — die Müdigkeit des Gastes respektieren (P1).",
    en: "Keep offers brief — respect the guest's tiredness (P1).",
    id: "Menjaga tawaran tetap singkat — menghormati kelelahan tamu (P1)."
   }
  ],
  startNode: "n1",
  nodes: {
   n1: {
    type: "decision",
    phase: { de: "Bedarf erschließen", en: "Discovering the need", id: "Menggali kebutuhan" },
    narration: {
     de: "Ms Rossi stellt ihren Rollkoffer ab und legt die Kreditkarte schon bereit, bevor Sie etwas gesagt haben. „Langer Tag“, sagt sie entschuldigend, „und morgen um zehn ein wichtiges Meeting in der Innenstadt.“",
     en: "Ms Rossi parks her cabin trolley and has her credit card ready before you have said a word. “Long day,” she says apologetically, “and an important meeting in town at ten tomorrow.”",
     id: "Ms Rossi memarkir koper kabinnya dan sudah menyiapkan kartu kredit sebelum Anda sempat berkata apa pun. “Hari yang panjang,” ujarnya seperti meminta maaf, “dan besok pukul sepuluh ada rapat penting di pusat kota.”"
    },
    guestLine: {
     de: "Wenn es geht: schnell das Nötigste — ich möchte nur noch aufs Zimmer.",
     en: "If possible, just the essentials quickly — I only want to get to my room.",
     id: "Kalau bisa, yang penting-penting saja dengan cepat — saya hanya ingin segera ke kamar."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Zügig einchecken und dabei eine gezielte Frage stellen, wie ihr Morgen vor dem Meeting aussehen soll.",
       en: "Check her in briskly while asking one targeted question about how her morning before the meeting should look.",
       id: "Melakukan check-in dengan sigap sambil mengajukan satu pertanyaan terarah tentang seperti apa paginya sebelum rapat."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau richtig: Sie respektieren das Tempo — und gewinnen mit einer einzigen Frage das Material für passende Angebote: Frühstückszeit, Abfahrt, Auschecken (P4). Effizienz und Aufmerksamkeit schließen sich nicht aus.",
       en: "Exactly right: you respect the pace — and with a single question you gain the material for fitting offers: breakfast time, departure, checkout (P4). Efficiency and attentiveness are not opposites.",
       id: "Tepat sekali: Anda menghormati temponya — dan lewat satu pertanyaan memperoleh bahan untuk tawaran yang pas: jam sarapan, keberangkatan, waktu check-out (P4). Efisiensi dan perhatian bukan hal yang bertentangan."
      },
      next: "n2"
     },
     {
      id: "b",
      label: {
       de: "Wunschgemäß nur das Nötigste abwickeln und keine weiteren Fragen stellen.",
       en: "As requested, process only the essentials and ask no further questions.",
       id: "Sesuai permintaan, memproses yang penting saja tanpa pertanyaan tambahan."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Sauber und schnell — aber das Stichwort „Meeting um zehn“ blieb ungenutzt: Genau daraus wären Frühstück und Late Check-out als echte Hilfe entstanden. Eine kurze Frage hätte den Wunsch nach Tempo nicht verletzt (P4).",
       en: "Clean and fast — but the cue “meeting at ten” went unused: exactly from that, breakfast and late check-out would have emerged as real help. One short question would not have violated her wish for speed (P4).",
       id: "Rapi dan cepat — tetapi kata kunci “rapat pukul sepuluh” tidak dimanfaatkan: justru dari situlah sarapan dan late check-out bisa lahir sebagai bantuan nyata. Satu pertanyaan singkat tidak akan melanggar keinginannya untuk cepat (P4)."
      },
      next: "n2"
     },
     {
      id: "c",
      label: {
       de: "Die Gelegenheit für Smalltalk über die Stadt und Restauranttipps nutzen, um Nähe aufzubauen.",
       en: "Use the moment for small talk about the city and restaurant tips to build rapport.",
       id: "Memanfaatkan momen untuk berbasa-basi tentang kota dan rekomendasi restoran demi keakraban."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Gut gemeinte Nähe zur falschen Zeit: Ms Rossi hat um Tempo gebeten, und jeder Plauderminute steht ihre Müdigkeit gegenüber. Aufmerksamkeit zeigt sich hier im Kürzen, nicht im Verlängern (P1).",
       en: "Well-meant rapport at the wrong time: Ms Rossi asked for speed, and every minute of chat stands against her tiredness. Attentiveness here shows in shortening, not lengthening (P1).",
       id: "Keakraban yang berniat baik di waktu yang salah: Ms Rossi meminta kecepatan, dan setiap menit obrolan berhadapan dengan kelelahannya. Perhatian di sini justru berwujud mempersingkat, bukan memperpanjang (P1)."
      },
      next: "n2"
     },
     {
      id: "d",
      label: {
       de: "Mit warmen Worten Verständnis für den langen Tag zeigen und zügig einchecken — ohne nach dem Morgen zu fragen.",
       en: "Show warm understanding for the long day and check her in briskly — without asking about her morning.",
       id: "Menunjukkan pengertian hangat atas hari panjangnya dan check-in dengan sigap — tanpa menanyakan paginya."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Der Ton ist genau richtig, das Tempo auch — nur die eine Frage fehlt, die aus Freundlichkeit Nutzen gemacht hätte. Wer den Morgen des Gastes kennt, kann ihn besser machen (P4).",
       en: "The tone is exactly right, the pace too — only the one question is missing that would have turned kindness into usefulness. Knowing the guest's morning is how you improve it (P4).",
       id: "Nadanya tepat, temponya juga — hanya satu pertanyaan yang hilang, yang akan mengubah keramahan menjadi manfaat. Dengan mengenal pagi tamu, Anda dapat membuatnya lebih baik (P4)."
      },
      next: "n2"
     }
    ]
   },
   n2: {
    type: "decision",
    phase: { de: "Frühstücksangebot", en: "Breakfast offer", id: "Penawaran sarapan" },
    narration: {
     de: "Ms Rossi überlegt kurz: Gefrühstückt werden müsse „irgendwann vor neun“, dann Taxi in die Innenstadt. Ihr Blick auf die Buchung zeigt: kein Frühstück inklusive. Sie wissen zugleich: Zwischen 07:00–08:00 ist der Frühstücksraum erfahrungsgemäß voll.",
     en: "Ms Rossi thinks briefly: breakfast would have to happen “sometime before nine”, then a taxi into town. A glance at the booking shows: no breakfast included. You also know: between 07:00–08:00 the breakfast room is reliably packed.",
     id: "Ms Rossi berpikir sejenak: sarapan harus terjadi “kapan pun sebelum jam sembilan”, lalu taksi ke pusat kota. Sekilas pada pemesanan terlihat: sarapan tidak termasuk. Anda pun tahu: antara pukul 07:00–08:00 ruang sarapan biasanya penuh."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Frühstück anbieten und ehrlich sagen: 07:00–08:00 ist Stoßzeit — ab 08:15 sitzt sie entspannter und schafft ihr Taxi trotzdem.",
       en: "Offer breakfast and say honestly: 07:00–08:00 is the peak — from 08:15 she will sit more relaxed and still make her taxi.",
       id: "Menawarkan sarapan dan berkata jujur: pukul 07:00–08:00 jam ramai — mulai 08:15 beliau bisa duduk lebih tenang dan tetap terkejar taksinya."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Das Angebot passt zum Bedarf, und die ehrliche Stoßzeiten-Auskunft plus konkreter Zeitempfehlung macht es wertvoll (P8). So klingt Beratung — der Verkauf ergibt sich von selbst.",
       en: "Exemplary: the offer fits the need, and the honest peak-time information plus a concrete time recommendation makes it valuable (P8). That is what advising sounds like — the sale follows on its own.",
       id: "Teladan: tawarannya sesuai kebutuhan, dan keterangan jujur tentang jam ramai plus rekomendasi waktu yang konkret membuatnya bernilai (P8). Beginilah bunyi sebuah nasihat — penjualan akan mengikuti dengan sendirinya."
      },
      next: "n3"
     },
     {
      id: "b",
      label: {
       de: "Frühstück verkaufen und für 07:30 einen ruhigen Fensterplatz fest zusagen, damit sie sofort bucht.",
       en: "Sell the breakfast and firmly promise a quiet window table at 07:30 so she books at once.",
       id: "Menjual sarapan dan menjanjikan pasti meja tenang dekat jendela pukul 07:30 agar beliau langsung memesan."
      },
      scores: { d: 1, l: 1, s: 0 },
      feedback: {
       de: "Der Abschluss gelingt — auf Kosten der Wahrheit: Um 07:30 herrscht Hochbetrieb, feste Plätze können Sie nicht garantieren. Morgen erlebt sie das Gegenteil Ihrer Zusage, kurz vor ihrem wichtigen Termin (P8).",
       en: "The sale succeeds — at the cost of the truth: 07:30 is rush hour and you cannot guarantee fixed tables. Tomorrow she will experience the opposite of your promise, just before her important appointment (P8).",
       id: "Transaksinya berhasil — dengan mengorbankan kebenaran: pukul 07:30 adalah puncak keramaian dan meja tetap tidak dapat Anda jamin. Besok beliau akan mengalami kebalikan dari janji Anda, tepat sebelum rapat pentingnya (P8)."
      },
      next: "n3"
     },
     {
      id: "c",
      label: {
       de: "Das Thema Frühstück auslassen — sie wirkt zu müde für weitere Entscheidungen.",
       en: "Leave the topic of breakfast out — she seems too tired for further decisions.",
       id: "Melewatkan topik sarapan — beliau tampak terlalu lelah untuk keputusan tambahan."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Rücksicht am falschen Ort: Ohne Ihr Angebot steht Ms Rossi morgen vor dem Meeting ohne Plan da — oder mitten in der Stoßzeit. Ein Satz hätte genügt; die Entscheidung wäre ihre gewesen (P4, P8).",
       en: "Consideration in the wrong place: without your offer, Ms Rossi faces tomorrow's meeting with no plan — or right in the peak hour. One sentence would have sufficed; the decision would have been hers (P4, P8).",
       id: "Tenggang rasa di tempat yang salah: tanpa tawaran Anda, besok Ms Rossi menghadapi rapat tanpa rencana — atau justru terjebak jam ramai. Satu kalimat sebenarnya cukup; keputusannya tetap milik beliau (P4, P8)."
      },
      next: "n3"
     },
     {
      id: "d",
      label: {
       de: "Frühstück charmant anbieten, die volle Stoßzeit zwischen 07:00–08:00 aber lieber unerwähnt lassen.",
       en: "Offer breakfast charmingly, but rather leave the packed 07:00–08:00 peak unmentioned.",
       id: "Menawarkan sarapan dengan menawan, tetapi memilih tidak menyebut padatnya jam 07:00–08:00."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Charmant verkauft, halb beraten: Die verschwiegene Stoßzeit holt Ms Rossi morgen ein — volle Tische statt ruhigem Start. Ehrlichkeit über Schwächen macht Angebote glaubwürdig, nicht unattraktiv (P8).",
       en: "Charmingly sold, half advised: the unmentioned peak will catch up with Ms Rossi tomorrow — full tables instead of a calm start. Honesty about weaknesses makes offers credible, not unattractive (P8).",
       id: "Terjual dengan menawan, tetapi nasihatnya setengah: jam ramai yang disembunyikan akan menghampiri Ms Rossi besok — meja penuh alih-alih awal yang tenang. Kejujuran tentang kelemahan membuat tawaran kredibel, bukan tidak menarik (P8)."
      },
      next: "n3"
     }
    ]
   },
   n3: {
    type: "decision",
    phase: { de: "Late Check-out", en: "Late check-out", id: "Penawaran late check-out" },
    narration: {
     de: "Ms Rossi bucht das Frühstück. Beim Stichwort Abreise erwähnt sie, dass ihr Meeting „bis mittags dauern kann“ — ihr Zug fährt erst am Nachmittag. Die morgige Belegung kennen Sie noch nicht genau; über Ausnahmen entscheidet die Leitung.",
     en: "Ms Rossi books the breakfast. On the subject of departure she mentions her meeting “may run until noon” — her train leaves only in the afternoon. You do not yet know tomorrow's occupancy precisely; exceptions are the manager's call.",
     id: "Ms Rossi memesan sarapan. Saat menyinggung keberangkatan, beliau menyebut rapatnya “bisa berlangsung sampai tengah hari” — keretanya baru berangkat sore. Okupansi besok belum Anda ketahui pasti; pengecualian diputuskan oleh atasan."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Late Check-out als Option anbieten und ehrlich erklären, dass Sie die Verfügbarkeit morgen früh verbindlich bestätigen.",
       en: "Offer late check-out as an option and explain honestly that you will confirm availability bindingly tomorrow morning.",
       id: "Menawarkan late check-out sebagai opsi dan menjelaskan jujur bahwa ketersediaannya akan Anda pastikan besok pagi."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau richtig: Das Angebot trifft ihren Bedarf, und die ehrliche Staffelung — heute vormerken, morgen verbindlich — verspricht nur, was Sie halten können (P8). Verlässlichkeit ist das beste Verkaufsargument.",
       en: "Exactly right: the offer meets her need, and the honest staging — noted today, binding tomorrow — promises only what you can keep (P8). Reliability is the best sales argument.",
       id: "Tepat sekali: tawarannya mengenai kebutuhan beliau, dan pentahapan yang jujur — dicatat hari ini, dipastikan besok — hanya menjanjikan yang dapat Anda tepati (P8). Keandalan adalah argumen penjualan terbaik."
      },
      next: "n4"
     },
     {
      id: "b",
      label: {
       de: "Anbieten, wegen einer Ausnahme bis in den Nachmittag direkt bei der Leitung nachzufragen.",
       en: "Offer to ask the manager directly about an exception lasting into the afternoon.",
       id: "Menawarkan untuk langsung menanyakan kepada atasan soal pengecualian hingga sore hari."
      },
      scores: { d: 1, l: 2, s: 1 },
      flags: { escalate: true },
      feedback: {
       de: "Der Weg über die Leitung ist für echte Ausnahmen richtig (P5) — hier aber eine Stufe zu hoch gegriffen: Ein regulärer Late Check-out bis mittags deckt ihren Bedarf bereits. Erst die Standardoption, dann die Ausnahme.",
       en: "Going to the manager is right for genuine exceptions (P5) — but here it reaches one step too high: a regular late check-out until noon already covers her need. The standard option first, the exception second.",
       id: "Jalur atasan memang tepat untuk pengecualian sejati (P5) — tetapi di sini terlalu tinggi satu tingkat: late check-out reguler sampai tengah hari sudah menutup kebutuhannya. Opsi standar dahulu, pengecualian kemudian."
      },
      next: "n4"
     },
     {
      id: "c",
      label: {
       de: "Late Check-out bis 15:00 sofort fest zusagen — bei einer so guten Stammkundin wird das schon passen.",
       en: "Firmly promise a late check-out until 15:00 right away — for such a good regular it will surely be fine.",
       id: "Langsung menjanjikan pasti late check-out sampai pukul 15:00 — untuk tamu sebaik ini tentu tidak masalah."
      },
      scores: { d: 1, l: 1, s: 0 },
      feedback: {
       de: "Eine feste Zusage ohne Belegungsblick und über die übliche Grenze hinaus bindet das Haus an etwas, das Sie nicht kontrollieren (P5, P8). Wenn morgen voll angereist wird, bricht Ihre Zusage genau dann, wenn sie zählt.",
       en: "A firm promise without checking occupancy, and beyond the usual limit, binds the hotel to something you do not control (P5, P8). If tomorrow brings full arrivals, your promise breaks exactly when it matters.",
       id: "Janji pasti tanpa melihat okupansi, dan melampaui batas biasa, mengikat hotel pada hal yang tidak Anda kendalikan (P5, P8). Bila besok kedatangan penuh, janji Anda patah tepat saat paling dibutuhkan."
      },
      next: "n4"
     },
     {
      id: "d",
      label: {
       de: "Nichts mehr anbieten und zügig zum Ende kommen — sie hat ja schon das Frühstück gebucht.",
       en: "Offer nothing further and wrap up briskly — she has already booked the breakfast, after all.",
       id: "Tidak menawarkan apa-apa lagi dan segera menutup — toh sarapan sudah dipesan."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Der Bedarf lag offen auf dem Tresen — Meeting bis mittags, Zug am Nachmittag — und blieb unbeantwortet. Ein passendes Zweitangebot ist kein Aufdrängen, sondern Zuhören in Aktion (P4, P8).",
       en: "The need lay open on the counter — meeting until noon, train in the afternoon — and went unanswered. A fitting second offer is not pushiness; it is listening in action (P4, P8).",
       id: "Kebutuhannya sudah terhampar di meja — rapat sampai tengah hari, kereta sore — dan dibiarkan tak terjawab. Tawaran kedua yang pas bukanlah memaksa, melainkan wujud nyata dari mendengarkan (P4, P8)."
      },
      next: "n4"
     }
    ]
   },
   n4: {
    type: "decision",
    phase: { de: "Abschluss", en: "Closing", id: "Penutup" },
    narration: {
     de: "Alles ist erfasst: Zimmer, Frühstück, der vorgemerkte Late Check-out. Ms Rossi steckt die Schlüsselkarte ein und greift nach ihrem Rollkoffer. Es ist 21:40 — Zeit für einen kurzen, guten Abschluss.",
     en: "Everything is recorded: room, breakfast, the late check-out noted. Ms Rossi pockets the key card and reaches for her trolley. It is 21:40 — time for a short, good close.",
     id: "Semua sudah tercatat: kamar, sarapan, late check-out yang telah dicadangkan. Ms Rossi menyimpan kartu kunci dan meraih kopernya. Pukul 21:40 — waktunya penutup yang singkat dan baik."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "In einem Satz zusammenfassen, was für morgen vereinbart ist, und ihr einen erholsamen Abend wünschen.",
       en: "Summarise in one sentence what is arranged for tomorrow, and wish her a restful evening.",
       id: "Merangkum dalam satu kalimat apa saja yang telah disepakati untuk besok, lalu mengucapkan selamat beristirahat."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Perfekt für eine müde Reisende: Die Ein-Satz-Zusammenfassung — Frühstück ab 08:15, Late Check-out vorgemerkt — gibt Sicherheit ohne weitere Minuten zu kosten (P1). Kurz und vollständig ist hier die Königsklasse.",
       en: "Perfect for a tired traveller: the one-sentence summary — breakfast from 08:15, late check-out noted — gives certainty without costing further minutes (P1). Short and complete is the master class here.",
       id: "Sempurna untuk tamu yang lelah: rangkuman satu kalimat — sarapan mulai 08:15, late check-out sudah dicadangkan — memberi kepastian tanpa menyita menit tambahan (P1). Singkat dan lengkap adalah kelas utama di sini."
      },
      next: "x1"
     },
     {
      id: "b",
      label: {
       de: "Herzlich verabschieden und ihr zusätzlich noch die Sauna, die Bar und das Abendmenü vorstellen.",
       en: "See her off warmly, additionally introducing the sauna, the bar and the evening menu.",
       id: "Melepas dengan hangat sambil masih memperkenalkan sauna, bar, dan menu makan malam."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Gut gemeint, aber gegen das erklärte Bedürfnis: Ms Rossi wollte längst oben sein. Wer nach dem Abschluss weiter anbietet, verwässert die gute Beratung davor — Aufhören ist auch eine Verkaufskompetenz (P1, P8).",
       en: "Well meant, but against her stated need: Ms Rossi wanted to be upstairs long ago. Offering on after the close waters down the good advice before it — stopping is a sales skill too (P1, P8).",
       id: "Niatnya baik, tetapi berlawanan dengan kebutuhan yang sudah beliau nyatakan: Ms Rossi ingin segera naik sejak tadi. Terus menawar setelah penutupan justru mengencerkan nasihat baik sebelumnya — berhenti pun sebuah keterampilan menjual (P1, P8)."
      },
      next: "x2"
     },
     {
      id: "c",
      label: {
       de: "Die Karte übergeben und sie mit einem knappen „Gute Nacht“ ohne Zusammenfassung gehen lassen.",
       en: "Hand over the card and let her go with a curt “good night”, without any summary.",
       id: "Menyerahkan kartu dan membiarkan beliau pergi dengan “selamat malam” singkat, tanpa rangkuman."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Schnell, aber lückenhaft: Ohne Zusammenfassung weiß Ms Rossi nicht sicher, was morgen vereinbart ist — und Unsicherheit ist das Letzte, was sie vor einem wichtigen Termin braucht. Ein Satz hätte den Unterschied gemacht (P4).",
       en: "Fast but gappy: without a summary Ms Rossi cannot be sure what is arranged for tomorrow — and uncertainty is the last thing she needs before an important appointment. One sentence would have made the difference (P4).",
       id: "Cepat tetapi berlubang: tanpa rangkuman, Ms Rossi tidak yakin apa saja yang sudah disepakati untuk besok — dan ketidakpastian adalah hal terakhir yang beliau butuhkan sebelum rapat penting. Satu kalimat saja akan membuat perbedaan (P4)."
      },
      next: "x3"
     }
    ]
   },
   x1: {
    type: "outcome",
    tone: "good",
    ending: {
     de: "Ms Rossi fährt nach oben — in vier Minuten von der Tür bis zum Aufzug, mit gelöstem Frühstücksplan und vorgemerktem Late Check-out. Sie haben aus einem müden „schnell das Nötigste“ zwei passende Angebote gemacht, ohne eine Minute zu stehlen. Morgen wird sie es merken: Der ruhige Start war kein Zufall.",
     en: "Ms Rossi heads upstairs — four minutes from door to lift, with a breakfast plan settled and a late check-out noted. You turned a tired “just the essentials” into two fitting offers without stealing a minute. Tomorrow she will notice: the calm start was no accident.",
     id: "Ms Rossi naik ke kamarnya — empat menit dari pintu ke lift, dengan rencana sarapan yang beres dan late check-out yang tercadang. Anda mengubah permintaan lelah “yang penting-penting saja” menjadi dua tawaran yang pas tanpa mencuri satu menit pun. Besok beliau akan menyadarinya: pagi yang tenang itu bukan kebetulan."
    }
   },
   x2: {
    type: "outcome",
    tone: "mixed",
    ending: {
     de: "Ms Rossi ist versorgt, und die wichtigsten Weichen sind gestellt. Ein Rest Reibung bleibt: eine verschwiegene Stoßzeit, ein Angebot zu viel oder eine Zusage auf dünnem Eis. Beim Geschäftsreisenden entscheidet der Morgen danach über das Urteil — prüfen Sie Ihre Zusagen heute gegen das, was er morgen erlebt.",
     en: "Ms Rossi is looked after, and the key points are set. Some friction remains: an unmentioned peak time, one offer too many or a promise on thin ice. With business travellers, the morning after delivers the verdict — test today's promises against what she will actually experience tomorrow.",
     id: "Ms Rossi sudah terlayani, dan hal-hal utama sudah diatur. Namun sisa gesekan tertinggal: jam ramai yang tak disebut, satu tawaran berlebih, atau janji di atas es tipis. Bagi tamu bisnis, pagi esoklah yang menjatuhkan penilaian — ujilah janji Anda hari ini terhadap apa yang akan beliau alami besok."
    }
   },
   x3: {
    type: "outcome",
    tone: "poor",
    ending: {
     de: "Ms Rossi ist auf dem Zimmer — schnell war es, hilfreich kaum. Ein verschwiegener Engpass, ein gebrochenes oder fehlendes Angebot: Morgen früh, wenn es zählt, zahlt jemand die Rechnung dafür. Merken Sie sich: Beim müden Gast gewinnt nicht, wer viel redet, sondern wer die eine richtige Frage stellt und ehrlich antwortet (P4, P8).",
     en: "Ms Rossi is in her room — it was fast, hardly helpful. A concealed bottleneck, a broken or missing offer: tomorrow morning, when it counts, someone pays the bill for that. Remember: with a tired guest, the winner is not whoever talks most, but whoever asks the one right question and answers honestly (P4, P8).",
     id: "Ms Rossi sudah di kamarnya — memang cepat, tetapi nyaris tanpa manfaat. Hambatan yang disembunyikan, janji yang patah, atau tawaran yang tak pernah diberikan: besok pagi, saat semuanya menentukan, seseorang akan membayar harganya. Ingatlah: pada tamu yang lelah, pemenangnya bukan yang paling banyak bicara, melainkan yang mengajukan satu pertanyaan tepat dan menjawab dengan jujur (P4, P8)."
    }
   }
  },
  debrief: {
   tips: {
    decision: {
     de: "Leiten Sie Angebote aus dem Tagesplan des Gastes ab: Termin, Abfahrt, Rückreise. Ein Angebot, das eine echte Lücke im Plan schließt, verkauft sich selbst — alles andere ist Katalogvorlesen.",
     en: "Derive offers from the guest's day plan: appointment, departure, return journey. An offer that closes a real gap in the plan sells itself — everything else is reading out the catalogue.",
     id: "Turunkan tawaran dari rencana harian tamu: jadwal rapat, keberangkatan, perjalanan pulang. Tawaran yang menutup celah nyata dalam rencana akan terjual dengan sendirinya — selebihnya hanyalah membacakan katalog."
    },
    language: {
     de: "Verpacken Sie Ehrlichkeit als Empfehlung: „Zwischen 07:00–08:00 ist es voll — ab 08:15 sitzen Sie ruhiger“ informiert und berät in einem Satz, ohne das Angebot schlechtzureden.",
     en: "Package honesty as a recommendation: “it is busy between 07:00–08:00 — from 08:15 you will sit more calmly” informs and advises in one sentence without talking the offer down.",
     id: "Kemas kejujuran sebagai rekomendasi: “antara pukul 07:00–08:00 ramai — mulai 08:15 Anda bisa duduk lebih tenang” memberi informasi sekaligus saran dalam satu kalimat, tanpa menjelekkan tawarannya."
    },
    sop: {
     de: "Zusagen brauchen Deckung: Was von der morgigen Belegung abhängt, wird vorgemerkt und bestätigt, nicht garantiert — und Ausnahmen jenseits der üblichen Grenzen gehören zur Leitung (P5).",
     en: "Promises need cover: what depends on tomorrow's occupancy gets noted and confirmed, not guaranteed — and exceptions beyond the usual limits belong to the manager (P5).",
     id: "Janji memerlukan jaminan: yang bergantung pada okupansi besok dicadangkan lalu dipastikan, bukan digaransi — dan pengecualian di luar batas biasa adalah wewenang atasan (P5)."
    }
   },
   safetyTip: {
    de: "Verkaufen Sie nie Plätze, Zeiten oder Ausnahmen, deren Verfügbarkeit Sie nicht gesichert haben: Ein Angebot, das morgen platzt, trifft den Gast im wichtigsten Moment — und Ihr Haus gleich mit (P8).",
    en: "Never sell slots, times or exceptions whose availability you have not secured: an offer that bursts tomorrow hits the guest at the most important moment — and your hotel with it (P8).",
    id: "Jangan pernah menjual tempat, waktu, atau pengecualian yang ketersediaannya belum Anda pastikan: tawaran yang pecah besok akan menghantam tamu di momen terpentingnya — dan hotel Anda ikut terkena (P8)."
   },
   praise: {
    de: "Stark: Sie haben mit einer Frage den Bedarf geöffnet, ehrlich beraten und den müden Gast keine Minute zu lang aufgehalten. Wiederholen Sie das Szenario in einer anderen Sprache — Beratungssätze müssen sitzen.",
    en: "Strong: with one question you opened up the need, advised honestly and did not hold the tired guest a minute too long. Replay the scenario in another language — advisory phrases have to sit right.",
    id: "Hebat: dengan satu pertanyaan Anda membuka kebutuhan, memberi saran dengan jujur, dan tidak menahan tamu yang lelah semenit pun lebih lama. Ulangi skenario ini dalam bahasa lain — kalimat konsultatif harus benar-benar melekat."
   }
  },
  sopRefs: ["P4", "P8"]
 };
})();
