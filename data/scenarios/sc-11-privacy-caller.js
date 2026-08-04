(function () {
 "use strict";
 window.HSL = window.HSL || {};
 var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
 data.scenarios["sc-11-privacy-caller"] = {
  id: "sc-11-privacy-caller",
  category: "privacy",
  difficulty: 3,
  minutes: 6,
  title: {
   de: "Anrufer fragt nach einem Gast",
   en: "Caller Asking About a Guest",
   id: "Penelepon Menanyakan Tamu"
  },
  summary: {
   de: "Ein Anrufer gibt sich als Angehöriger aus und verlangt Auskunft über einen Gast.",
   en: "A caller claims to be a relative and demands information about a guest.",
   id: "Seorang penelepon mengaku sebagai kerabat dan menuntut informasi tentang seorang tamu."
  },
  context: {
   place: {
    de: "Empfang Ihres Hauses, später Nachmittag; am Tresen herrscht Betrieb.",
    en: "The front desk of your hotel, late afternoon; the desk is busy.",
    id: "Meja resepsionis hotel Anda, sore hari; suasana meja sedang ramai."
   },
   situation: {
    de: "Ein Anrufer stellt sich als Bruder von Frau Weber vor. Er will wissen, ob sie im Haus wohnt und in welchem Zimmer — sein Ton wird schnell drängend.",
    en: "A caller introduces himself as Ms Weber's brother. He wants to know whether she is staying at the hotel and in which room — his tone quickly becomes insistent.",
    id: "Seorang penelepon memperkenalkan diri sebagai kakak Ms Weber. Ia ingin tahu apakah Ms Weber menginap di hotel dan di kamar berapa — nadanya cepat berubah mendesak."
   },
   guest: {
    de: "Betroffen ist Frau Weber — ob sie Gast ist, dürfen Sie am Telefon weder bestätigen noch verneinen. Der Anrufer bleibt anonym.",
    en: "Concerned is Ms Weber — whether she is a guest is something you may neither confirm nor deny on the phone. The caller remains anonymous.",
    id: "Yang disebut adalah Ms Weber — status menginapnya tidak boleh Anda benarkan maupun bantah lewat telepon. Penelepon sendiri tetap anonim."
   },
   constraints: {
    de: "Die Identität und Absicht von Anrufern ist am Telefon nicht überprüfbar; parallel warten Gäste am Tresen.",
    en: "A caller's identity and intent cannot be verified over the phone; meanwhile guests are waiting at the desk.",
    id: "Identitas dan niat penelepon tidak dapat diverifikasi lewat telepon; sementara itu tamu-tamu menunggu di meja."
   }
  },
  goals: [
   {
    de: "Anwesenheit und Zimmernummer niemals an Dritte geben (P2, P3).",
    en: "Never give presence or room numbers to third parties (P2, P3).",
    id: "Tidak pernah memberikan status keberadaan maupun nomor kamar kepada pihak ketiga (P2, P3)."
   },
   {
    de: "Sichere Alternativen anbieten: Nachricht aufnehmen statt Auskunft geben.",
    en: "Offer safe alternatives: take a message instead of giving information.",
    id: "Menawarkan alternatif aman: mencatat pesan alih-alih memberi informasi."
   },
   {
    de: "Druckversuche erkennen, melden und dokumentieren (P5, P6).",
    en: "Recognise, report and document pressure attempts (P5, P6).",
    id: "Mengenali, melaporkan, dan mendokumentasikan upaya penekanan (P5, P6)."
   }
  ],
  startNode: "n1",
  nodes: {
   n1: {
    type: "decision",
    phase: { de: "Anruf annehmen", en: "Taking the call", id: "Menerima panggilan" },
    narration: {
     de: "Das Telefon klingelt, während Sie gerade zwei Gäste am Tresen bedienen. Die Stimme am Apparat klingt freundlich, aber zielstrebig: Es gehe um seine Schwester, Frau Weber — es sei wichtig.",
     en: "The phone rings while you are serving two guests at the desk. The voice on the line sounds friendly but purposeful: it is about his sister, Ms Weber — it is important.",
     id: "Telepon berdering saat Anda sedang melayani dua tamu di meja. Suara di seberang terdengar ramah tetapi penuh tujuan: katanya menyangkut adiknya, Ms Weber — dan penting."
    },
    guestLine: {
     de: "Guten Tag, hier spricht der Bruder von Frau Weber. Wohnt sie bei Ihnen? Es ist wirklich dringend.",
     en: "Good afternoon, this is Ms Weber's brother speaking. Is she staying with you? It really is urgent.",
     id: "Selamat sore, saya kakak Ms Weber. Apakah beliau menginap di tempat Anda? Ini sungguh mendesak."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Freundlich melden, aufmerksam zuhören und dabei weder Anwesenheit noch Abwesenheit erkennen lassen.",
       en: "Answer politely, listen attentively, and let neither presence nor absence show.",
       id: "Menjawab dengan sopan, mendengarkan saksama, tanpa menyiratkan hadir maupun tidaknya tamu itu."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau richtig: Sie bleiben höflich und nehmen das Anliegen auf, ohne auch nur andeutungsweise zu bestätigen, dass der Name im Haus bekannt ist (P2, P3). Damit halten Sie alle sicheren Wege offen.",
       en: "Exactly right: you stay polite and take in the request without even hinting that the name is known in the hotel (P2, P3). All safe paths remain open.",
       id: "Tepat sekali: Anda tetap santun dan menampung permintaannya tanpa sedikit pun mengisyaratkan bahwa nama itu dikenal di hotel (P2, P3). Semua jalur aman tetap terbuka."
      },
      next: "n2"
     },
     {
      id: "b",
      label: {
       de: "Knapp erklären, dass Sie am Telefon grundsätzlich gar nichts sagen können, und um Geduld bitten.",
       en: "State curtly that you can say nothing at all on the phone, and ask for patience.",
       id: "Menyatakan singkat bahwa lewat telepon Anda sama sekali tidak dapat mengatakan apa pun, dan meminta kesabaran."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Die Verschwiegenheit stimmt (P3) — aber ein kategorisches „gar nichts“ ohne warmen Rahmen klingt nach Abweisung und provoziert Widerstand. Dieselbe Grenze lässt sich freundlich ziehen, mit einem Angebot dahinter.",
       en: "The discretion is right (P3) — but a categorical “nothing at all” without a warm frame sounds like rejection and provokes resistance. The same boundary can be drawn kindly, with an offer behind it.",
       id: "Kerahasiaannya sudah benar (P3) — tetapi “sama sekali tidak bisa” yang kaku tanpa bingkai hangat terdengar seperti penolakan dan memancing perlawanan. Batas yang sama dapat ditarik dengan ramah, disertai tawaran di baliknya."
      },
      next: "n2"
     },
     {
      id: "c",
      label: {
       de: "Hilfsbereit sagen: „Moment, ich schaue schnell nach, ob Frau Weber bei uns wohnt.“",
       en: "Say helpfully: “One moment, let me quickly check whether Ms Weber is staying with us.”",
       id: "Berkata sigap: “Sebentar, saya cek dulu apakah Ms Weber menginap di sini.”"
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Gut gemeint — aber dieser Satz verrät schon zu viel: Je nachdem, was Sie nach dem Nachschauen sagen, weiß der Anrufer, ob sie da ist. Die Grenze beginnt vor dem Blick ins System, nicht danach (P3).",
       en: "Well meant — but that sentence already gives too much away: depending on what you say after checking, the caller learns whether she is there. The boundary starts before the look into the system, not after (P3).",
       id: "Niatnya baik — tetapi kalimat itu sudah membocorkan terlalu banyak: apa pun jawaban Anda setelah mengecek, penelepon akan tahu ada tidaknya beliau. Batas dimulai sebelum melihat sistem, bukan sesudahnya (P3)."
      },
      next: "n2"
     },
     {
      id: "d",
      label: {
       de: "Mitfühlend auf die Dringlichkeit eingehen und nach Details der Familiengeschichte fragen.",
       en: "Respond sympathetically to the urgency and ask for details of the family situation.",
       id: "Menanggapi kemendesakan itu dengan empati dan menanyakan rincian urusan keluarganya."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Der warme Ton ist gut — doch die Detailfragen ziehen Sie in die Geschichte des Anrufers hinein, die Sie nicht prüfen können. Je länger das Gespräch, desto größer sein Druckhebel. Kurz, freundlich, neutral bleiben (P2).",
       en: "The warm tone is good — but the detail questions pull you into the caller's story, which you cannot verify. The longer the call, the bigger his lever. Stay short, friendly, neutral (P2).",
       id: "Nada hangatnya bagus — tetapi pertanyaan rinci menyeret Anda ke dalam cerita penelepon yang tidak dapat Anda verifikasi. Semakin panjang percakapan, semakin besar daya ungkitnya. Tetaplah singkat, ramah, netral (P2)."
      },
      next: "n2"
     }
    ]
   },
   n2: {
    type: "decision",
    phase: { de: "Information zurückhalten", en: "Withholding information", id: "Menahan informasi" },
    narration: {
     de: "Der Anrufer wird direkter: „Ist das wirklich so schwer? Ja oder nein — wohnt meine Schwester bei Ihnen? Und in welchem Zimmer? Ich muss sie erreichen.“ Am Tresen beobachtet eine wartende Familie Ihr Gespräch.",
     en: "The caller gets more direct: “Is it really that hard? Yes or no — is my sister staying with you? And in which room? I need to reach her.” At the desk, a waiting family watches you take the call.",
     id: "Penelepon semakin lugas: “Sesulit itukah? Ya atau tidak — apakah adik saya menginap di tempat Anda? Di kamar berapa? Saya harus menghubunginya.” Di meja, satu keluarga yang menunggu memperhatikan Anda menelepon."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Ruhig erklären, dass Sie zu Gästen grundsätzlich keine Auskunft geben — und sofort anbieten, eine Nachricht aufzunehmen.",
       en: "Explain calmly that you never give information about guests — and offer at once to take a message.",
       id: "Menjelaskan dengan tenang bahwa Anda tidak pernah memberi informasi tentang tamu — dan langsung menawarkan untuk mencatat pesan."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Die Grundsatzformel — keine Auskunft zu Gästen, ob jemand Gast ist oder nicht — schützt alle gleich, und das Nachrichtenangebot zeigt echten Hilfswillen (P2, P3). Grenze und Freundlichkeit in einem Satz.",
       en: "Exemplary: the standing formula — no information about guests, whether someone is a guest or not — protects everyone equally, and the message offer shows genuine willingness to help (P2, P3). Boundary and kindness in one sentence.",
       id: "Teladan: rumusan baku — tidak ada informasi tentang tamu, siapa pun dan terlepas dari menginap tidaknya — melindungi semua orang secara setara, dan tawaran mencatat pesan menunjukkan niat membantu yang tulus (P2, P3). Batas dan keramahan dalam satu kalimat."
      },
      next: "n3"
     },
     {
      id: "b",
      label: {
       de: "Bestätigen, dass Frau Weber im Haus ist, und die Zimmernummer nennen, damit der Anrufer aufhört zu drängen.",
       en: "Confirm that Ms Weber is staying here and give the room number so the caller stops pressing.",
       id: "Membenarkan bahwa Ibu Weber menginap dan menyebutkan nomor kamarnya agar penelepon berhenti mendesak."
      },
      scores: { d: 0, l: 1, s: 0 },
      flags: { unsafe: true },
      feedback: {
       de: "Niemals Anwesenheit oder Zimmernummer an Dritte bestätigen (P2, P3) — Sie können die Absicht des Anrufers nicht prüfen, und die Sicherheit des Gastes hat Vorrang. Bieten Sie stattdessen an, eine Nachricht zu übermitteln.",
       en: "Never confirm a guest's presence or room number to third parties (P2, P3) — you cannot verify the caller's intent, and the guest's safety comes first. Offer to take a message instead.",
       id: "Jangan pernah membenarkan keberadaan tamu atau menyebut nomor kamar kepada pihak ketiga (P2, P3) — niat penelepon tidak dapat Anda pastikan, dan keselamatan tamu adalah prioritas. Tawarkan untuk menyampaikan pesan."
      },
      next: "n3"
     },
     {
      id: "c",
      label: {
       de: "Das Drängen mit einem scharfen „Dazu sage ich nichts“ beenden und auflegen.",
       en: "End the pressing with a sharp “I have nothing to say to that” and hang up.",
       id: "Mengakhiri desakan dengan ketus “Saya tidak akan mengatakan apa pun” lalu menutup telepon."
      },
      scores: { d: 1, l: 0, s: 2 },
      feedback: {
       de: "Die Information bleibt geschützt (P3) — aber der Abbruch ohne Alternative wirkt schroff und lässt ein womöglich echtes Anliegen ungelöst. Grenze halten, Ton wahren, Weg anbieten.",
       en: "The information stays protected (P3) — but hanging up without an alternative is brusque and leaves a possibly genuine concern unresolved. Hold the line, keep the tone, offer a path.",
       id: "Informasinya tetap terlindungi (P3) — tetapi memutus tanpa alternatif terasa kasar dan membiarkan urusan yang mungkin sungguhan tak terselesaikan. Jaga batas, jaga nada, tawarkan jalan."
      },
      next: "n3"
     },
     {
      id: "d",
      label: {
       de: "Ausweichen: Er möge doch später noch einmal anrufen, dann sei vielleicht jemand Zuständiges da.",
       en: "Deflect: perhaps he could call again later, when someone responsible might be in.",
       id: "Mengelak: silakan menelepon lagi nanti, mungkin saat itu ada petugas yang berwenang."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Freundlich vertagt ist nicht gelöst: Der nächste Anruf trifft womöglich eine unvorbereitete Kollegin, und der Anrufer hat gelernt, dass Beharrlichkeit Türen öffnet. Die Grenze plus Nachrichtenangebot gehört in dieses Gespräch — jetzt (P2, P5).",
       en: "Kindly postponed is not resolved: the next call may reach an unprepared colleague, and the caller has learned that persistence opens doors. The boundary plus message offer belongs in this call — now (P2, P5).",
       id: "Ditunda dengan ramah bukan berarti selesai: telepon berikutnya bisa jatuh ke rekan yang tidak siap, dan penelepon telah belajar bahwa kegigihan membuka pintu. Batas plus tawaran pesan harus hadir dalam percakapan ini — sekarang (P2, P5)."
      },
      next: "n3"
     }
    ]
   },
   n3: {
    type: "decision",
    phase: { de: "Sichere Alternativen", en: "Safe alternatives", id: "Alternatif aman" },
    narration: {
     de: "Der Anrufer wechselt die Taktik: „Dann richten Sie ihr wenigstens aus, dass ich angerufen habe — es geht um einen familiären Notfall. Sie ruft mich dann schon zurück.“ Prüfen können Sie davon: nichts.",
     en: "The caller changes tack: “Then at least tell her I called — it is a family emergency. She will call me back, believe me.” What you can verify of this: nothing.",
     id: "Penelepon berganti taktik: “Kalau begitu setidaknya sampaikan bahwa saya menelepon — ini keadaan darurat keluarga. Beliau pasti menelepon saya balik.” Yang dapat Anda verifikasi dari semua itu: tidak ada."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Name und Rückrufnummer notieren und zusagen, die Nachricht weiterzugeben, falls die Person Gast des Hauses sein sollte.",
       en: "Note his name and number and agree to pass the message on, should that person happen to be a guest of the hotel.",
       id: "Mencatat nama dan nomornya, lalu berjanji meneruskan pesan itu seandainya orang yang dimaksud memang tamu hotel."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Die perfekte Formel: „Falls die Person bei uns wohnen sollte, geben wir es weiter“ hilft einem echten Bruder vollständig — und verrät einem Fremden nichts (P2, P3). Die Entscheidung über den Rückruf bleibt allein bei Frau Weber.",
       en: "The perfect formula: “should this person be staying with us, we will pass it on” fully helps a genuine brother — and tells a stranger nothing (P2, P3). The decision about calling back stays with Ms Weber alone.",
       id: "Rumusan yang sempurna: “seandainya orang tersebut menginap di tempat kami, pesan akan kami teruskan” sepenuhnya membantu kakak yang sungguhan — dan tidak membocorkan apa pun kepada orang asing (P2, P3). Keputusan menelepon balik tetap sepenuhnya di tangan Ms Weber."
      },
      next: "n4"
     },
     {
      id: "b",
      label: {
       de: "Frau Weber sofort anrufen und ihr ausrichten, ihr Bruder habe einen familiären Notfall gemeldet.",
       en: "Call Ms Weber right away and tell her that her brother has reported a family emergency.",
       id: "Segera menelepon Ms Weber dan menyampaikan bahwa kakaknya melaporkan keadaan darurat keluarga."
      },
      scores: { d: 1, l: 1, s: 0 },
      feedback: {
       de: "Die Weitergabe ist richtig — aber nicht als Tatsache: „Ihr Bruder“ und „Notfall“ sind unbelegte Behauptungen eines Fremden. Übermitteln Sie neutral: „Ein Anrufer, der sich als Ihr Bruder ausgibt…“ — die Bewertung gehört dem Gast (P2, P6).",
       en: "Passing it on is right — but not as fact: “your brother” and “emergency” are unverified claims by a stranger. Relay it neutrally: “a caller identifying himself as your brother…” — the judgement belongs to the guest (P2, P6).",
       id: "Meneruskannya memang benar — tetapi bukan sebagai fakta: “kakak Anda” dan “darurat” hanyalah klaim tak terverifikasi dari orang asing. Sampaikan secara netral: “seorang penelepon yang mengaku kakak Anda…” — penilaiannya adalah hak tamu (P2, P6)."
      },
      next: "n4"
     },
     {
      id: "c",
      label: {
       de: "Den Anrufer wiederholt in die Warteschleife legen, in der Hoffnung, dass er von selbst aufgibt.",
       en: "Put the caller on hold repeatedly, hoping he gives up on his own.",
       id: "Berulang kali menaruh penelepon dalam jalur tunggu, berharap ia menyerah sendiri."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Aussitzen ist keine Strategie: Ein Fremder mit Absichten ruft schlicht wieder an — beim nächsten Kollegen; ein echter Bruder wird zermürbt. Die Nachrichtenformel löst beide Fälle in dreißig Sekunden (P2).",
       en: "Waiting it out is not a strategy: a stranger with intentions simply calls again — reaching the next colleague; a genuine brother gets worn down. The message formula solves both cases in thirty seconds (P2).",
       id: "Mendiamkan bukanlah strategi: orang asing yang berniat buruk tinggal menelepon lagi — dan jatuh ke rekan berikutnya; kakak yang sungguhan justru terkuras. Rumus pencatatan pesan menyelesaikan kedua kasus dalam tiga puluh detik (P2)."
      },
      next: "n4"
     },
     {
      id: "d",
      label: {
       de: "Freundlich empfehlen, es doch direkt auf dem Mobiltelefon der Schwester zu versuchen.",
       en: "Suggest kindly that he try his sister directly on her mobile phone.",
       id: "Dengan ramah menyarankan agar ia mencoba menghubungi ponsel adiknya secara langsung."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Unverfänglich formuliert und die Grenze hält — aber Sie schicken den Anrufer nur fort, statt den sicheren Kanal zu öffnen: Ein echter Bruder hat das Mobiltelefon längst versucht. Das Nachrichtenangebot wäre der hilfreiche Weg gewesen (P2).",
       en: "Innocuously phrased and the boundary holds — but you are merely sending the caller away instead of opening the safe channel: a genuine brother will long since have tried the mobile. The message offer would have been the helpful path (P2).",
       id: "Kalimatnya aman dan batas tetap terjaga — tetapi Anda hanya menyuruh penelepon pergi alih-alih membuka saluran yang aman: kakak yang sungguhan pasti sudah lama mencoba ponselnya. Tawaran mencatat pesanlah jalan yang benar-benar membantu (P2)."
      },
      next: "n4"
     }
    ]
   },
   n4: {
    type: "decision",
    phase: { de: "Eskalation", en: "Escalation", id: "Eskalasi" },
    narration: {
     de: "Der Anrufer diktiert widerwillig eine Rückrufnummer und legt mit den Worten auf: „Ich probiere es später einfach noch mal bei einem Ihrer Kollegen.“ Das Gespräch ist beendet — der Vorgang noch nicht.",
     en: "The caller grudgingly dictates a number and hangs up with the words: “I will simply try again later with one of your colleagues.” The call is over — the matter is not.",
     id: "Dengan enggan penelepon mendiktekan nomor untuk dihubungi, lalu menutup telepon sambil berkata: “Nanti saya coba lagi saja lewat rekan Anda yang lain.” Percakapan selesai — tetapi urusannya belum."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Die Dienstleitung informieren und den Vorfall mit Uhrzeit und Wortlaut im Protokoll festhalten, damit alle vorbereitet sind.",
       en: "Inform the duty manager and record the incident with time and wording in the log, so everyone is prepared.",
       id: "Menginformasikan penanggung jawab dan mencatat insiden ini dengan waktu serta kutipan ucapannya di log, agar semua bersiap."
      },
      scores: { d: 2, l: 2, s: 2 },
      flags: { escalate: true },
      feedback: {
       de: "Vorbildlich: Die Ankündigung „bei einem Kollegen probieren“ macht aus dem Anruf ein Muster — genau dafür sind Meldung und Protokoll da (P5, P6). Jetzt zieht das ganze Team dieselbe Grenze, und Frau Weber kann diskret informiert werden.",
       en: "Exemplary: the announcement “I will try a colleague” turns the call into a pattern — exactly what reporting and the log exist for (P5, P6). Now the whole team draws the same line, and Ms Weber can be informed discreetly.",
       id: "Teladan: ancaman “coba lewat rekan lain” mengubah panggilan ini menjadi sebuah pola — justru untuk itulah pelaporan dan log ada (P5, P6). Kini seluruh tim menarik batas yang sama, dan Ms Weber dapat diberi tahu secara diskret."
      },
      next: "x1"
     },
     {
      id: "b",
      label: {
       de: "Der Kollegin am Nebenplatz kurz mündlich von dem seltsamen Anruf erzählen und weiterarbeiten.",
       en: "Briefly tell the colleague at the next station about the odd call, verbally, and carry on working.",
       id: "Menceritakan sekilas secara lisan kepada rekan di sebelah tentang telepon janggal itu, lalu kembali bekerja."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Der Impuls zu warnen ist richtig — aber mündlich erreicht er genau eine Person: Die Spätschicht, die der Anrufer „später“ erwischen will, erfährt nichts. Erst Protokoll und Meldung machen aus Ihrer Wachsamkeit einen Schutz für alle (P6).",
       en: "The impulse to warn is right — but verbally it reaches exactly one person: the late shift the caller plans to catch “later” learns nothing. Only the log and a report turn your alertness into protection for everyone (P6).",
       id: "Dorongan untuk memperingatkan sudah benar — tetapi secara lisan hanya menjangkau satu orang: sif malam yang justru diincar penelepon “nanti” tidak akan tahu apa-apa. Hanya log dan laporanlah yang mengubah kewaspadaan Anda menjadi perlindungan bagi semua (P6).",
      },
      next: "x2"
     },
     {
      id: "c",
      label: {
       de: "Den Vorgang abhaken — Sie haben ja nichts verraten, und der Tresen ist voll.",
       en: "Tick the matter off — you gave nothing away, after all, and the desk is busy.",
       id: "Menganggap urusan selesai — toh tidak ada yang bocor, dan meja sedang ramai."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Ihre Grenze hat gehalten — aber der Anrufer hat den nächsten Versuch angekündigt, und niemand außer Ihnen weiß davon. Ein unprotokollierter Druckversuch trifft die nächste Schicht unvorbereitet: Genau so entstehen Lücken (P5, P6).",
       en: "Your boundary held — but the caller announced his next attempt, and nobody besides you knows about it. An unlogged pressure attempt hits the next shift unprepared: this is exactly how gaps happen (P5, P6).",
       id: "Batas Anda memang bertahan — tetapi penelepon telah mengumumkan percobaan berikutnya, dan tidak ada yang mengetahuinya selain Anda. Upaya penekanan yang tak tercatat akan menghantam sif berikutnya tanpa persiapan: dari sinilah celah bermula (P5, P6).",
      },
      next: "x3"
     }
    ]
   },
   x1: {
    type: "outcome",
    tone: "good",
    ending: {
     de: "Das Protokoll informiert alle Schichten, und Frau Weber wird diskret unterrichtet — sie entscheidet selbst über einen Rückruf. Ob wirklich ein Bruder anrief, werden Sie nie erfahren. Genau deshalb war jeder Ihrer Schritte richtig: Die Regel schützt, wenn die Wahrheit nicht prüfbar ist.",
     en: "The log informs every shift, and Ms Weber is told discreetly — she decides about a call back herself. Whether a brother really called, you will never know. That is exactly why each of your steps was right: the rule protects when the truth cannot be verified.",
     id: "Log menginformasikan semua sif, dan Ms Weber diberi tahu secara diskret — beliau sendiri yang memutuskan soal telepon balik. Apakah penelepon benar kakaknya, Anda tidak akan pernah tahu. Justru karena itulah setiap langkah Anda benar: aturan melindungi ketika kebenaran tidak dapat diverifikasi."
    }
   },
   x2: {
    type: "outcome",
    tone: "mixed",
    ending: {
     de: "Die Kerngrenze hat gehalten: Der Anrufer hat weder Bestätigung noch Zimmernummer bekommen. Doch der Vorgang lebt nur in Ihrem Kopf und einem Flurgespräch weiter — die angekündigte Wiederholung trifft ein unvorbereitetes Team. Nächstes Mal: den Vorfall zum Team-Wissen machen — melden, protokollieren, Gast informieren.",
     en: "The core boundary held: the caller got neither confirmation nor a room number. But the case lives on only in your head and a corridor chat — the announced repeat will meet an unprepared team. Next time: turn the incident into team knowledge — report, log, inform the guest.",
     id: "Batas intinya bertahan: penelepon tidak mendapat konfirmasi maupun nomor kamar. Namun kasus ini hanya hidup di kepala Anda dan sebuah obrolan lorong — pengulangan yang sudah diumumkan akan menjumpai tim yang tak siap. Lain kali: jadikan insiden pengetahuan tim — laporkan, catat, beri tahu tamunya."
    }
   },
   x3: {
    type: "outcome",
    tone: "poor",
    ending: {
     de: "Dieses Gespräch ist vorbei, aber der Vorgang nicht: Wo Auskunft entglitt, ist der Schaden da; wo nur geschwiegen wurde, wartet der angekündigte zweite Versuch auf eine ahnungslose Schicht. Merken Sie sich die drei Schichten des Gästeschutzes: nichts bestätigen, sichere Alternative anbieten, Vorfall melden und protokollieren (P2, P3, P5, P6).",
     en: "This call is over, but the case is not: where information slipped, the damage is done; where there was only silence, the announced second attempt awaits an unsuspecting shift. Remember the three layers of guest protection: confirm nothing, offer a safe alternative, report and log the incident (P2, P3, P5, P6).",
     id: "Percakapan ini selesai, tetapi kasusnya belum: bila informasi sempat lolos, kerugiannya sudah terjadi; bila hanya diam, percobaan kedua yang sudah diumumkan tinggal menunggu sif yang tak menaruh curiga. Ingat tiga lapis perlindungan tamu: jangan benarkan apa pun, tawarkan alternatif aman, laporkan dan catat insidennya (P2, P3, P5, P6)."
    }
   }
  },
  debrief: {
   tips: {
    decision: {
     de: "Nutzen Sie die Nachrichtenformel als Standardwerkzeug: Kontaktdaten aufnehmen und Weitergabe „falls die Person Gast sein sollte“ zusagen — sie hilft jedem echten Anliegen und verrät nichts.",
     en: "Use the message formula as your standard tool: take contact details and promise to pass them on “should the person be a guest” — it helps every genuine concern and reveals nothing.",
     id: "Jadikan rumus pencatatan pesan sebagai perkakas baku: catat kontaknya dan janjikan penerusan “seandainya orang itu memang tamu” — rumus ini membantu setiap urusan yang tulus tanpa membocorkan apa pun."
    },
    language: {
     de: "Formulieren Sie die Grenze unpersönlich und als Hausregel: „Wir geben grundsätzlich keine Auskunft zu Gästen“ — das klingt nicht nach Misstrauen gegen den Anrufer, sondern nach Schutz für alle.",
     en: "Phrase the boundary impersonally, as a house rule: “we never give information about guests” — that sounds not like distrust of the caller but like protection for everyone.",
     id: "Rumuskan batas secara impersonal sebagai aturan rumah: “kami tidak pernah memberikan informasi tentang tamu” — itu terdengar bukan sebagai kecurigaan terhadap penelepon, melainkan perlindungan bagi semua."
    },
    sop: {
     de: "Druckversuche sind meldepflichtige Vorfälle: Uhrzeit, Verlauf und Ankündigungen protokollieren und die Leitung informieren — Diskretion wirkt nur, wenn das ganze Team dieselbe Linie kennt (P5, P6).",
     en: "Pressure attempts are reportable incidents: log time, course and announcements, and inform the manager — discretion only works when the whole team knows the same line (P5, P6).",
     id: "Upaya penekanan adalah insiden yang wajib dilaporkan: catat waktu, jalannya percakapan, dan ancamannya, lalu informasikan atasan — kerahasiaan hanya efektif bila seluruh tim memegang garis yang sama (P5, P6)."
    }
   },
   safetyTip: {
    de: "Bestätigen Sie am Telefon niemals, dass jemand Gast ist — und nennen Sie erst recht keine Zimmernummer: Sie können weder Identität noch Absicht prüfen, und hinter der harmlosesten Geschichte kann eine Gefahr für den Gast stehen (P2, P3).",
    en: "Never confirm on the phone that someone is a guest — and certainly never give a room number: you can verify neither identity nor intent, and behind the most harmless story may stand a danger to the guest (P2, P3).",
    id: "Jangan pernah membenarkan lewat telepon bahwa seseorang adalah tamu — apalagi menyebut nomor kamar: identitas maupun niat tidak dapat Anda verifikasi, dan di balik cerita yang paling lugu sekalipun bisa bersembunyi bahaya bagi tamu (P2, P3)."
   },
   praise: {
    de: "Ausgezeichnet: Grenze gehalten, trotzdem geholfen, und den Vorfall zum Team-Wissen gemacht — der komplette Schutzkreis.",
    en: "Excellent: boundary held, help still given, and the incident turned into team knowledge — the complete circle of protection.",
    id: "Luar biasa: batas terjaga, bantuan tetap diberikan, dan insiden dijadikan pengetahuan tim — lingkaran perlindungan yang lengkap."
   }
  },
  sopRefs: ["P2", "P3", "P5", "P6"]
 };
})();
