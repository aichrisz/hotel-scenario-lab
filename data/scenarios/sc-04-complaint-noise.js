(function () {
 "use strict";
 window.HSL = window.HSL || {};
 var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
 data.scenarios["sc-04-complaint-noise"] = {
  id: "sc-04-complaint-noise",
  category: "complaint",
  difficulty: 1,
  minutes: 5,
  title: {
   de: "Lärmbeschwerde am Abend",
   en: "Evening Noise Complaint",
   id: "Keluhan Kebisingan Malam Hari"
  },
  summary: {
   de: "Eine Anruferin klagt am späten Abend über Lärm aus dem Nachbarzimmer — zum zweiten Mal.",
   en: "A caller complains late in the evening about noise from the neighbouring room — for the second time.",
   id: "Seorang tamu menelepon pada larut malam mengeluhkan kebisingan dari kamar sebelah — untuk kedua kalinya."
  },
  context: {
   place: {
    de: "Empfang Ihres Hauses, 23:00; das Telefon klingelt, die Lobby ist leer.",
    en: "The front desk of your hotel, 23:00; the phone rings, the lobby is empty.",
    id: "Meja resepsionis hotel Anda, pukul 23:00; telepon berdering, lobi kosong."
   },
   situation: {
    de: "Frau Sommer ruft von ihrem Zimmer aus an: Aus dem Nachbarzimmer dringt laute Musik und Gelächter — wie schon gestern Nacht.",
    en: "Mrs Sommer calls from her room: loud music and laughter are coming from the room next door — just like last night.",
    id: "Ibu Sommer menelepon dari kamarnya: musik keras dan tawa terdengar dari kamar sebelah — sama seperti tadi malam."
   },
   guest: {
    de: "Frau Sommer, Mitte 40, beruflich unterwegs mit frühem Termin; gestern hat sie den Lärm noch hingenommen.",
    en: "Mrs Sommer, mid-forties, travelling for work with an early appointment; yesterday she still put up with the noise.",
    id: "Ibu Sommer, pertengahan 40-an, sedang perjalanan dinas dengan jadwal pagi; kemarin beliau masih menahan kebisingan itu."
   },
   constraints: {
    de: "Das Haus ist zu 92 % belegt — ein Zimmerwechsel ist heute Nacht kaum noch möglich.",
    en: "The hotel is 92 % occupied — a room change is barely possible tonight.",
    id: "Okupansi hotel 92 % — pindah kamar malam ini hampir tidak mungkin."
   }
  },
  goals: [
   {
    de: "Eine Beschwerde vollständig aufnehmen, bevor Sie reagieren (P4).",
    en: "Take in a complaint fully before reacting (P4).",
    id: "Menampung keluhan secara utuh sebelum merespons (P4)."
   },
   {
    de: "Nur anbieten, was heute Nacht wirklich möglich ist.",
    en: "Offer only what is genuinely possible tonight.",
    id: "Menawarkan hanya yang benar-benar mungkin malam ini."
   },
   {
    de: "Nachfassen und dokumentieren, damit die Störung nicht zur dritten Nacht wird (P6).",
    en: "Follow up and document so the disturbance does not reach a third night (P6).",
    id: "Menindaklanjuti dan mendokumentasikan agar gangguan tidak berlanjut ke malam ketiga (P6)."
   }
  ],
  startNode: "n1",
  nodes: {
   n1: {
    type: "decision",
    phase: { de: "Zuhören", en: "Listening", id: "Mendengarkan" },
    narration: {
     de: "Sie nehmen den Hörer ab. Frau Sommer spricht schnell und angespannt; im Hintergrund sind tatsächlich Bässe und Stimmen zu hören. Sie ist hörbar müde — und hörbar am Ende ihrer Geduld.",
     en: "You pick up the phone. Mrs Sommer speaks quickly and tensely; in the background you can in fact hear bass and voices. She is audibly tired — and audibly at the end of her patience.",
     id: "Anda mengangkat telepon. Ibu Sommer berbicara cepat dan tegang; di latar memang terdengar dentuman musik dan suara orang. Beliau terdengar lelah — dan kesabarannya terdengar hampir habis."
    },
    guestLine: {
     de: "Nebenan ist schon wieder Party — es ist 23 Uhr! Ich habe morgen um sieben einen Termin. Gestern habe ich nichts gesagt, aber jetzt reicht es.",
     en: "There is a party next door again — it is eleven at night! I have an appointment at seven tomorrow. I said nothing yesterday, but this is enough.",
     id: "Sebelah berpesta lagi — sudah pukul 23:00! Besok pukul tujuh saya ada janji. Kemarin saya diam saja, tetapi sekarang sudah keterlaluan."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Ausreden lassen, die Kernpunkte kurz zusammenfassen und für den Anruf danken.",
       en: "Let her finish, briefly sum up the key points, and thank her for calling.",
       id: "Membiarkan beliau selesai bicara, merangkum poin utamanya, dan berterima kasih atas teleponnya."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Ausreden lassen, zusammenfassen, danken — Frau Sommer hört, dass sie ernst genommen wird, und Sie haben alle Fakten für die Lösung (P4). Zweite Nacht und früher Termin sind notiert.",
       en: "Exemplary: letting her finish, summarising, thanking — Mrs Sommer hears she is being taken seriously, and you have all the facts for a solution (P4). Second night and early appointment are noted.",
       id: "Teladan: membiarkan selesai, merangkum, berterima kasih — Ibu Sommer merasa dianggap serius, dan Anda memegang semua fakta untuk solusi (P4). Malam kedua dan janji pagi sudah tercatat."
      },
      next: "n2"
     },
     {
      id: "b",
      label: {
       de: "Sie höflich unterbrechen und sofort ankündigen, dass Sie beim Nachbarzimmer anrufen werden.",
       en: "Politely interrupt her and announce at once that you will call the neighbouring room.",
       id: "Menyela dengan sopan dan langsung mengumumkan bahwa Anda akan menelepon kamar sebelah."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Die Maßnahme ist richtig — der Zeitpunkt nicht: Wer unterbrochen wird, fühlt sich nicht gehört, und Sie hätten den frühen Termin und die zweite Nacht verpasst. Erst zuhören, dann handeln (P4).",
       en: "The measure is right — the timing is not: being interrupted means not feeling heard, and you would have missed the early appointment and the second night. Listen first, then act (P4).",
       id: "Tindakannya benar — waktunya tidak: tamu yang disela merasa tidak didengar, dan Anda nyaris melewatkan info janji pagi serta malam kedua. Dengarkan dahulu, baru bertindak (P4)."
      },
      next: "n2"
     },
     {
      id: "c",
      label: {
       de: "Beschwichtigen: „So laut kann es doch gar nicht sein, das Haus ist gut gedämmt.“",
       en: "Play it down: “It cannot really be that loud, the building is well insulated.”",
       id: "Meremehkan: “Tidak mungkin sekeras itu, gedung kami kedap suara.”"
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Die Wahrnehmung des Gastes anzuzweifeln ist die schnellste Art, eine Beschwerde zu verdoppeln — zumal Sie den Lärm selbst im Hörer hören. Ernst nehmen kostet nichts; Abwiegeln kostet den Gast (P4).",
       en: "Doubting the guest's perception is the fastest way to double a complaint — especially when you can hear the noise through the receiver yourself. Taking it seriously costs nothing; playing it down costs the guest (P4).",
       id: "Meragukan apa yang dialami tamu adalah cara tercepat melipatgandakan keluhan — apalagi Anda sendiri mendengar kebisingan itu dari telepon. Bersikap serius tidak membebani apa pun; meremehkan mengorbankan tamu (P4)."
      },
      next: "n2"
     },
     {
      id: "d",
      label: {
       de: "Sich mehrfach wortreich entschuldigen, ohne nach Details der Störung zu fragen.",
       en: "Apologise repeatedly and at length, without asking for any details of the disturbance.",
       id: "Meminta maaf berkali-kali dengan panjang lebar tanpa menanyakan rincian gangguannya."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Die Entschuldigung tut gut, ersetzt aber keine Fakten: Welches Zimmer, seit wann, wie laut? Ohne diese Angaben bleibt Ihre nächste Maßnahme ein Blindflug. Empathie plus Klärung — beides gehört zusammen (P4).",
       en: "The apology helps, but it is no substitute for facts: which room, since when, how loud? Without those details your next step is a blind flight. Empathy plus clarification — the two belong together (P4).",
       id: "Permintaan maaf memang melegakan, tetapi tidak menggantikan fakta: kamar yang mana, sejak kapan, seberapa keras? Tanpa rincian itu, langkah Anda berikutnya berjalan buta. Empati plus klarifikasi — keduanya satu paket (P4)."
      },
      next: "n2"
     }
    ]
   },
   n2: {
    type: "decision",
    phase: { de: "Empathie & Entschuldigung", en: "Empathy & apology", id: "Empati & permintaan maaf" },
    narration: {
     de: "Die Fakten liegen vor: Zimmer nebenan, seit etwa einer Stunde, zweite Nacht in Folge, und Frau Sommer muss um 06:00 aufstehen. Sie wartet nun darauf, wie Ihr Haus dazu steht.",
     en: "The facts are on the table: the room next door, for about an hour, the second night in a row, and Mrs Sommer has to get up at 06:00. She is now waiting to hear where your hotel stands.",
     id: "Faktanya sudah jelas: kamar sebelah, sekitar satu jam, malam kedua berturut-turut, dan Ibu Sommer harus bangun pukul 06:00. Kini beliau menunggu sikap hotel Anda."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Sich aufrichtig entschuldigen, die zweite Nacht ausdrücklich anerkennen und konkrete Schritte ankündigen.",
       en: "Apologise sincerely, explicitly acknowledge the second night, and announce concrete steps.",
       id: "Meminta maaf dengan tulus, secara khusus mengakui ini malam kedua, dan mengumumkan langkah konkret."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau richtig: Die Entschuldigung würdigt besonders, dass es die zweite Nacht ist — das unterscheidet echtes Zuhören von Floskeln. Und die Ankündigung konkreter Schritte gibt der Empathie Substanz (P4).",
       en: "Exactly right: the apology specifically honours that this is the second night — which separates real listening from stock phrases. And announcing concrete steps gives the empathy substance (P4).",
       id: "Tepat sekali: permintaan maaf yang menyebut malam kedua membedakan pendengar sejati dari basa-basi. Dan pengumuman langkah konkret memberi bobot pada empati (P4)."
      },
      next: "n3"
     },
     {
      id: "b",
      label: {
       de: "Allgemein bedauern, dass es „zu Unannehmlichkeiten kam“, ohne auf ihre Situation einzugehen.",
       en: "Express general regret that “inconvenience occurred”, without addressing her situation.",
       id: "Menyampaikan penyesalan umum bahwa “telah terjadi ketidaknyamanan”, tanpa menyinggung situasinya."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Höflich, aber aus dem Baukasten: „Unannehmlichkeiten“ klingt nach Formular, nicht nach ihrer durchwachten Nacht. Nennen Sie das Konkrete — zweite Nacht, früher Termin — und die Entschuldigung bekommt Gewicht (P4).",
       en: "Polite, but off the shelf: “inconvenience” sounds like a form letter, not like her sleepless night. Name the specifics — second night, early appointment — and the apology gains weight (P4).",
       id: "Sopan, tetapi terasa templat: kata “ketidaknyamanan” terdengar seperti surat formulir, bukan malam beliau yang tanpa tidur. Sebutkan yang konkret — malam kedua, janji pagi — maka permintaan maaf menjadi berbobot (P4)."
      },
      next: "n3"
     },
     {
      id: "c",
      label: {
       de: "Erklären, dass das Haus für das Verhalten anderer Gäste nichts kann und Sie da machtlos sind.",
       en: "Explain that the hotel cannot help other guests' behaviour and that your hands are tied.",
       id: "Menjelaskan bahwa hotel tidak dapat mengendalikan perilaku tamu lain dan Anda tidak berdaya."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Faktisch bequem, praktisch falsch: Die Nachtruhe im Haus zu wahren ist Aufgabe der Rezeption. Wer sich für machtlos erklärt, sagt dem Gast: „Ihr Problem.“ Übernehmen Sie Verantwortung für die Lösung (P4).",
       en: "Convenient on paper, wrong in practice: keeping the house quiet at night is the front desk's job. Declaring yourself powerless tells the guest: “your problem.” Own the solution instead (P4).",
       id: "Terdengar praktis, tetapi keliru: menjaga ketenangan malam adalah tugas resepsionis. Menyatakan diri tidak berdaya sama dengan berkata kepada tamu: “itu urusan Anda.” Ambil tanggung jawab atas solusinya (P4)."
      },
      next: "n3"
     },
     {
      id: "d",
      label: {
       de: "Knapp bestätigen, dass der Vorgang aufgenommen ist, und die Maßnahmen sachlich auflisten.",
       en: "Confirm briefly that the matter is on record and list the measures matter-of-factly.",
       id: "Mengonfirmasi singkat bahwa laporan sudah dicatat, lalu menyebutkan tindakan secara datar."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Sachlich vollständig — menschlich unvollständig: Nach zwei gestörten Nächten braucht Frau Sommer erst ein Zeichen des Verständnisses, dann die Maßnahmenliste. Die Reihenfolge macht den Unterschied (P4).",
       en: "Factually complete — humanly incomplete: after two disturbed nights Mrs Sommer needs a sign of understanding first, then the list of measures. The order makes the difference (P4).",
       id: "Secara faktual lengkap — secara manusiawi belum: setelah dua malam terganggu, Ibu Sommer memerlukan tanda pengertian dahulu, baru daftar tindakan. Urutannya yang membuat perbedaan (P4)."
      },
      next: "n3"
     }
    ]
   },
   n3: {
    type: "decision",
    phase: { de: "Lösung", en: "Solution", id: "Solusi" },
    narration: {
     de: "Jetzt zählt, was Sie anbieten. Das Belegungssystem bestätigt: 92 % Auslastung, kein gleichwertiges Zimmer mehr frei. Möglich sind: das Nachbarzimmer ansprechen, später nachfassen — und für morgen Optionen prüfen.",
     en: "Now it is about what you offer. The occupancy system confirms it: 92 % full, no comparable room left tonight. What is possible: addressing the neighbouring room, following up later — and checking options for tomorrow.",
     id: "Kini yang penting adalah tawaran Anda. Sistem okupansi memastikan: terisi 92 %, tidak ada kamar setara yang tersisa malam ini. Yang mungkin: menegur kamar sebelah, memantau ulang nanti — dan memeriksa opsi untuk besok."
    },
    guestLine: {
     de: "Können Sie mir nicht einfach ein anderes Zimmer geben?",
     en: "Can you not simply give me another room?",
     id: "Tidak bisakah saya diberi kamar lain saja?"
    },
    options: [
     {
      id: "a",
      label: {
       de: "Ehrlich erklären, dass heute kein Zimmerwechsel geht, sofort das Nachbarzimmer ansprechen und Rückruf in 20 Minuten zusagen.",
       en: "Explain honestly that no room change is possible tonight, address the neighbouring room at once, and promise a call back in 20 minutes.",
       id: "Menjelaskan jujur bahwa malam ini tidak bisa pindah kamar, segera menegur kamar sebelah, dan berjanji menelepon balik 20 menit lagi."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Stark: ehrlich zur Lage, sofortige Maßnahme an der Lärmquelle und ein überprüfbares Versprechen — der Rückruf in 20 Minuten. Genau so klingt Verlässlichkeit bei voller Belegung (P4).",
       en: "Strong: honest about the situation, immediate action at the source of the noise, and a verifiable promise — the call back in 20 minutes. That is what reliability sounds like at full occupancy (P4).",
       id: "Kuat: jujur tentang keadaan, tindakan langsung pada sumber kebisingan, dan janji yang dapat diverifikasi — telepon balik dalam 20 menit. Beginilah bunyi keandalan saat okupansi penuh (P4)."
      },
      next: "n4"
     },
     {
      id: "b",
      label: {
       de: "Für morgen früh einen Zimmerwechsel fest zusagen, damit sie jetzt beruhigt ist.",
       en: "Firmly promise a room change for tomorrow morning so she is reassured now.",
       id: "Menjanjikan dengan pasti pindah kamar besok pagi agar beliau tenang sekarang."
      },
      scores: { d: 1, l: 1, s: 0 },
      feedback: {
       de: "Beruhigt kurzfristig — aber die morgige Belegung kennen Sie noch nicht, und ein gebrochenes Versprechen wiegt schwerer als ein ehrliches „Ich prüfe es“. Sagen Sie nur zu, was Sie halten können (P4, P5).",
       en: "Reassuring for a moment — but you do not yet know tomorrow's occupancy, and a broken promise weighs more than an honest “I will check”. Promise only what you can keep (P4, P5).",
       id: "Menenangkan sesaat — tetapi okupansi besok belum Anda ketahui, dan janji yang diingkari lebih berat daripada ucapan jujur “akan saya periksa”. Janjikan hanya yang dapat Anda tepati (P4, P5)."
      },
      next: "n4"
     },
     {
      id: "c",
      label: {
       de: "Bedauern, dass bei dieser Auslastung heute Nacht leider gar nichts zu machen ist.",
       en: "Regret that at this occupancy nothing at all can be done tonight, unfortunately.",
       id: "Menyesal bahwa dengan okupansi seperti ini, malam ini sama sekali tidak ada yang bisa dilakukan."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "„Nichts zu machen“ stimmt nicht: Die Lärmquelle ansprechen, nachfassen, morgen prüfen — alles möglich, nichts davon braucht ein freies Zimmer. Dieser Satz beendet das Gespräch, aber nicht den Lärm (P4).",
       en: "“Nothing can be done” is not true: addressing the source, following up, checking tomorrow — all possible, none of it needs a free room. That sentence ends the call, but not the noise (P4).",
       id: "“Tidak ada yang bisa dilakukan” itu keliru: menegur sumber bunyi, memantau ulang, memeriksa opsi besok — semuanya mungkin, dan tidak satu pun membutuhkan kamar kosong. Kalimat itu mengakhiri telepon, bukan kebisingannya (P4)."
      },
      next: "n4"
     },
     {
      id: "d",
      label: {
       de: "Freundlich Ohrstöpsel anbieten und den Fall damit für erledigt halten.",
       en: "Kindly offer earplugs and consider the matter settled with that.",
       id: "Dengan ramah menawarkan penyumbat telinga dan menganggap masalah selesai."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Als Ergänzung nett, als Lösung zu klein: Ohrstöpsel behandeln das Symptom bei Frau Sommer statt der Ursache nebenan. Die Störquelle ansprechen bleibt der Kern jeder Lärmlösung (P4).",
       en: "Nice as an extra, too small as the solution: earplugs treat the symptom in Mrs Sommer's room instead of the cause next door. Addressing the source remains the core of any noise solution (P4).",
       id: "Bagus sebagai pelengkap, terlalu kecil sebagai solusi: penyumbat telinga mengobati gejala di kamar Ibu Sommer, bukan penyebab di sebelah. Menegur sumber gangguan tetaplah inti setiap solusi kebisingan (P4)."
      },
      next: "n4"
     }
    ]
   },
   n4: {
    type: "decision",
    phase: { de: "Nachfassen", en: "Follow-up", id: "Tindak lanjut" },
    narration: {
     de: "Sie haben das Nachbarzimmer erreicht; dort wurde die Musik leiser gedreht und das Zimmertelefon verabschiedet sich mit einer Entschuldigung. Der Abend ist noch nicht vorbei — und dies ist die zweite Nacht in Folge. Was jetzt?",
     en: "You reached the neighbouring room; the music has been turned down and the room phone signs off with an apology. The evening is not over yet — and this is the second night in a row. What now?",
     id: "Anda berhasil menghubungi kamar sebelah; musik dikecilkan dan telepon ditutup dengan permintaan maaf. Namun malam belum berakhir — dan ini malam kedua berturut-turut. Sekarang apa?"
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Frau Sommer wie zugesagt zurückrufen, den Fall ins Übergabeprotokoll schreiben und für Wiederholung die Dienstleitung vormerken.",
       en: "Call Mrs Sommer back as promised, record the case in the handover log, and flag the duty manager in case it recurs.",
       id: "Menelepon balik Ibu Sommer sesuai janji, mencatat kasus di log serah terima, dan menyiagakan penanggung jawab bila terulang."
      },
      scores: { d: 2, l: 2, s: 2 },
      flags: { escalate: true },
      feedback: {
       de: "Der komplette Abschluss: Rückruf wie versprochen, Protokoll für die nächste Schicht, klare Eskalationsstufe bei Wiederholung (P5, P6). Aus einer wiederkehrenden Störung wird ein geführter Vorgang.",
       en: "The complete close: the call back as promised, a log entry for the next shift, a clear escalation step if it recurs (P5, P6). A recurring disturbance becomes a managed case.",
       id: "Penutupan yang utuh: telepon balik sesuai janji, catatan untuk sif berikutnya, jenjang eskalasi yang jelas bila terulang (P5, P6). Gangguan yang berulang berubah menjadi kasus yang terkelola."
      },
      next: "x1"
     },
     {
      id: "b",
      label: {
       de: "Frau Sommer zurückrufen und den Abend damit freundlich abschließen — ohne Protokolleintrag.",
       en: "Call Mrs Sommer back and close the evening warmly with that — without a log entry.",
       id: "Menelepon balik Ibu Sommer dan menutup malam dengan ramah — tanpa catatan di log."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Der Rückruf ist die halbe Miete — aber ohne Protokoll weiß die Frühschicht nichts von zwei Lärmnächten, und beim dritten Anruf beginnt alles von vorn. Dokumentation macht Ihre gute Arbeit haltbar (P6).",
       en: "The call back is half the job — but without a log entry the morning shift knows nothing of two noisy nights, and a third call starts from zero. Documentation makes your good work last (P6).",
       id: "Telepon balik itu separuh pekerjaan — tetapi tanpa catatan, sif pagi tidak tahu ada dua malam bising, dan telepon ketiga akan mulai dari nol lagi. Dokumentasi membuat kerja baik Anda bertahan (P6)."
      },
      next: "x2"
     },
     {
      id: "c",
      label: {
       de: "Den Fall als erledigt betrachten — die Musik ist ja jetzt leise.",
       en: "Consider the case closed — the music is quiet now, after all.",
       id: "Menganggap kasus selesai — toh musiknya sudah pelan sekarang."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Leise ist nicht gelöst: Frau Sommer wartet auf Ihren Rückruf, und ohne Notiz bleibt die zweite Nacht unsichtbar. Ein Fall ist erst zu Ende, wenn der Gast es weiß und die Schicht es lesen kann (P4, P6).",
       en: "Quiet is not solved: Mrs Sommer is waiting for your call back, and without a note the second night stays invisible. A case ends only when the guest knows it and the next shift can read it (P4, P6).",
       id: "Pelan bukan berarti selesai: Ibu Sommer menunggu telepon balik Anda, dan tanpa catatan, malam kedua itu tak terlihat siapa pun. Sebuah kasus baru berakhir bila tamu mengetahuinya dan sif berikutnya dapat membacanya (P4, P6)."
      },
      next: "x3"
     }
    ]
   },
   x1: {
    type: "outcome",
    tone: "good",
    ending: {
     de: "Beim Rückruf klingt Frau Sommer zum ersten Mal entspannt: „Es ist ruhig. Danke, dass Sie drangeblieben sind.“ Zuhören, ehrliche Optionen, Maßnahme an der Quelle, Rückruf und Protokoll — die Beschwerde wurde zur Bestätigung, dass Ihr Haus auch bei voller Belegung handelt.",
     en: "On the call back, Mrs Sommer sounds relaxed for the first time: “It is quiet. Thank you for staying on it.” Listening, honest options, action at the source, the call back and the log — the complaint became proof that your hotel acts even at full occupancy.",
     id: "Saat ditelepon balik, untuk pertama kalinya Ibu Sommer terdengar tenang: “Sudah sunyi. Terima kasih sudah terus mengawal.” Mendengarkan, opsi yang jujur, tindakan pada sumbernya, telepon balik, dan catatan — keluhan berubah menjadi bukti bahwa hotel Anda bertindak bahkan saat penuh."
    }
   },
   x2: {
    type: "outcome",
    tone: "mixed",
    ending: {
     de: "Die Nacht wurde ruhig, und Frau Sommer kann schlafen. Doch ein Teil der Arbeit fehlt: ein zu großes Versprechen, ein fehlender Protokolleintrag oder ein halber Abschluss. Sollte es eine dritte Nacht geben, beginnt Ihr Nachfolger ohne Ihre Vorarbeit. Gut gelöst — noch nicht gut gesichert.",
     en: "The night turned quiet, and Mrs Sommer can sleep. But part of the work is missing: an oversized promise, a missing log entry or a half-finished close. If there is a third night, your successor starts without your groundwork. Well solved — not yet well secured.",
     id: "Malam menjadi tenang, dan Ibu Sommer dapat tidur. Namun sebagian pekerjaan belum tuntas: janji yang terlalu besar, catatan yang tidak ditulis, atau penutupan yang setengah jadi. Bila ada malam ketiga, pengganti Anda mulai tanpa fondasi dari Anda. Terselesaikan dengan baik — belum teramankan dengan baik."
    }
   },
   x3: {
    type: "outcome",
    tone: "poor",
    ending: {
     de: "Vielleicht bleibt es leise — aber Frau Sommer weiß es nicht, denn niemand hat sich zurückgemeldet. Nach zwei Nächten Lärm und einem Gespräch, das abwiegelte oder zu früh endete, ist ihr Vertrauen aufgebraucht. Merken Sie sich: Ernst nehmen, ehrlich anbieten, nachfassen, notieren — in dieser Reihenfolge (P4, P6).",
     en: "Perhaps it stays quiet — but Mrs Sommer does not know, because nobody got back to her. After two noisy nights and a call that played things down or ended too soon, her trust is used up. Remember: take it seriously, offer honestly, follow up, write it down — in that order (P4, P6).",
     id: "Mungkin malam tetap sunyi — tetapi Ibu Sommer tidak mengetahuinya, karena tidak ada yang menghubungi kembali. Setelah dua malam bising dan percakapan yang meremehkan atau berakhir terlalu cepat, kepercayaannya habis. Ingatlah: anggap serius, tawarkan dengan jujur, tindak lanjuti, catat — dalam urutan itu (P4, P6)."
    }
   }
  },
  debrief: {
   tips: {
    decision: {
     de: "Arbeiten Sie bei Lärm immer an der Quelle, nicht nur beim Betroffenen: Das Nachbarzimmer ansprechen wirkt; Ohrstöpsel und Mitgefühl allein verschieben das Problem nur.",
     en: "With noise, always work on the source, not just the affected guest: addressing the neighbouring room works; earplugs and sympathy alone merely displace the problem.",
     id: "Pada kebisingan, selalu garap sumbernya, bukan hanya pihak yang terganggu: menegur kamar sebelah itu efektif; penyumbat telinga dan simpati semata hanya memindahkan masalah."
    },
    language: {
     de: "Machen Sie Zusagen überprüfbar: „Ich rufe Sie in 20 Minuten zurück“ ist stärker als „Wir kümmern uns“. Konkrete Zeiten bauen Vertrauen — wenn Sie sie halten.",
     en: "Make commitments verifiable: “I will call you back in 20 minutes” is stronger than “we will look into it”. Concrete times build trust — when you keep them.",
     id: "Buat janji yang dapat diverifikasi: “Saya telepon balik 20 menit lagi” lebih kuat daripada “akan kami urus”. Waktu yang konkret membangun kepercayaan — selama Anda menepatinya."
    },
    sop: {
     de: "Wiederholte Störungen gehören ins Übergabeprotokoll — mit Zimmer, Zeit und Maßnahme: Erst die Dokumentation macht aus Einzelfällen ein erkennbares Muster (P6).",
     en: "Recurring disturbances belong in the handover log — with room, time and action taken: only documentation turns single incidents into a recognisable pattern (P6).",
     id: "Gangguan berulang wajib masuk log serah terima — dengan kamar, waktu, dan tindakan: hanya dokumentasilah yang mengubah insiden lepas menjadi pola yang dapat dikenali (P6)."
    }
   },
   safetyTip: {
    de: "Versprechen Sie unter Druck nichts, was von der morgigen Belegung abhängt: Ein ehrliches „Ich prüfe es und melde mich“ schützt Gast und Haus vor der zweiten Enttäuschung (P5).",
    en: "Under pressure, promise nothing that depends on tomorrow's occupancy: an honest “I will check and get back to you” protects guest and hotel from a second disappointment (P5).",
    id: "Dalam tekanan, jangan menjanjikan apa pun yang bergantung pada okupansi besok: ucapan jujur “saya periksa dahulu lalu saya kabari” melindungi tamu dan hotel dari kekecewaan kedua (P5)."
   },
   praise: {
    de: "Sehr gut: Sie haben zugehört, ehrlich angeboten, an der Quelle gehandelt und dokumentiert. Wiederholen Sie das Szenario auf Englisch — Beschwerdesätze verdienen Training in jeder Sprache.",
    en: "Very good: you listened, offered honestly, acted at the source and documented it. Replay the scenario in German — complaint phrases deserve practice in every language.",
    id: "Sangat baik: Anda mendengarkan, menawarkan dengan jujur, bertindak pada sumbernya, dan mendokumentasikan. Ulangi skenario ini dalam bahasa Jerman — kalimat penanganan keluhan layak dilatih di setiap bahasa."
   }
  },
  sopRefs: ["P4", "P6"]
 };
})();
