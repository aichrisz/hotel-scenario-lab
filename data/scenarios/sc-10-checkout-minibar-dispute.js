(function () {
 "use strict";
 window.HSL = window.HSL || {};
 var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
 data.scenarios["sc-10-checkout-minibar-dispute"] = {
  id: "sc-10-checkout-minibar-dispute",
  category: "checkout",
  difficulty: 2,
  minutes: 5,
  title: {
   de: "Minibar-Streit beim Check-out",
   en: "Minibar Dispute at Check-out",
   id: "Sengketa Minibar saat Check-out"
  },
  summary: {
   de: "Ein Gast bestreitet beim Check-out zwei Minibar-Posten, und der letzte Eindruck steht auf dem Spiel.",
   en: "A guest disputes two minibar items at check-out, and the final impression is at stake.",
   id: "Seorang tamu membantah dua butir minibar saat check-out, dan kesan terakhir menjadi taruhannya."
  },
  context: {
   place: {
    de: "Empfang Ihres Hauses, Vormittag; normaler Abreisebetrieb.",
    en: "The front desk of your hotel, mid-morning; ordinary departure traffic.",
    id: "Meja resepsionis hotel Anda, menjelang siang; kesibukan keberangkatan yang biasa."
   },
   situation: {
    de: "Herr Petersen checkt nach drei Nächten aus und bestreitet zwei Minibar-Posten über zusammen 7,00 €.",
    en: "Mr Petersen is checking out after three nights and disputes two minibar items totalling 7,00 €.",
    id: "Bapak Petersen check-out setelah tiga malam dan membantah dua butir minibar senilai total 7,00 €."
   },
   guest: {
    de: "Herr Petersen, Anfang 60; sein Aufenthalt war durchwachsen — der Ton ist müde, nicht aggressiv.",
    en: "Mr Petersen, early sixties; his stay was mixed — his tone is weary rather than aggressive.",
    id: "Bapak Petersen, awal 60-an; pengalaman menginapnya campur aduk — nadanya letih, bukan agresif."
   },
   constraints: {
    de: "Kulanz bis zu kleinen Beträgen liegt in Ihrer Befugnis; das Housekeeping-Protokoll ist für gestern lückenhaft.",
    en: "Goodwill up to small amounts is within your authority; yesterday's housekeeping record is patchy.",
    id: "Kebijakan kelonggaran untuk nominal kecil ada dalam kewenangan Anda; catatan housekeeping untuk kemarin tidak lengkap."
   }
  },
  goals: [
   {
    de: "Einen Einwand prüfen, ohne den Gast zu verdächtigen (P4).",
    en: "Verify an objection without casting suspicion on the guest (P4).",
    id: "Memeriksa keberatan tanpa mencurigai tamu (P4)."
   },
   {
    de: "Kulanz bewusst und dokumentiert einsetzen (P5, P6).",
    en: "Use goodwill deliberately and documented (P5, P6).",
    id: "Menggunakan kelonggaran secara sadar dan terdokumentasi (P5, P6)."
   },
   {
    de: "Den letzten Eindruck des Aufenthalts positiv gestalten (P1).",
    en: "Shape the final impression of the stay positively (P1).",
    id: "Membentuk kesan terakhir menginap secara positif (P1)."
   }
  ],
  startNode: "n1",
  nodes: {
   n1: {
    type: "decision",
    phase: { de: "Zuhören", en: "Listening", id: "Mendengarkan" },
    narration: {
     de: "Herr Petersen schiebt die Rechnung zurück über den Tresen und zeigt auf die Minibar-Zeilen: zwei Getränke von gestern, zusammen 7,00 €. Er wirkt weniger wütend als erschöpft — es ist der Schlusspunkt eines Aufenthalts, der offenbar nicht rundlief.",
     en: "Mr Petersen slides the invoice back across the counter and points at the minibar lines: two drinks from yesterday, 7,00 € together. He seems less angry than exhausted — the closing note of a stay that apparently did not go smoothly.",
     id: "Bapak Petersen menyodorkan kembali tagihannya dan menunjuk baris minibar: dua minuman dari kemarin, total 7,00 €. Beliau tampak lebih letih daripada marah — titik penutup dari pengalaman menginap yang rupanya kurang mulus."
    },
    guestLine: {
     de: "Diese zwei Getränke habe ich nicht genommen. Ich rühre Minibars grundsätzlich nicht an.",
     en: "I did not take these two drinks. I never touch minibars, on principle.",
     id: "Dua minuman ini tidak saya ambil. Saya memang tidak pernah menyentuh minibar."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Ruhig zur Kenntnis nehmen, für den Hinweis danken und eine kurze Prüfung der zwei Posten ankündigen.",
       en: "Take it on board calmly, thank him for pointing it out, and announce a brief check of the two items.",
       id: "Menanggapi dengan tenang, berterima kasih atas masukannya, dan mengumumkan pemeriksaan singkat atas kedua butir itu."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau richtig: keine Abwehr, keine vorschnelle Zusage — sondern Dank und ein klarer nächster Schritt (P4). Bei kleinen Beträgen entscheidet der Ton über alles; Ihrer ist neutral und ernstnehmend.",
       en: "Exactly right: no defensiveness, no premature concession — but thanks and a clear next step (P4). With small amounts the tone decides everything; yours is neutral and takes him seriously.",
       id: "Tepat sekali: tanpa sikap membela diri, tanpa janji dini — melainkan terima kasih dan langkah lanjut yang jelas (P4). Pada nominal kecil, nadalah yang menentukan segalanya; nada Anda netral dan menghargai."
      },
      next: "n2"
     },
     {
      id: "b",
      label: {
       de: "Kommentarlos das Housekeeping-Protokoll aufrufen und die Buchungsdetails durchsehen.",
       en: "Pull up the housekeeping record without comment and look through the posting details.",
       id: "Membuka catatan housekeeping tanpa komentar dan menelusuri rincian penginputannya."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Die Prüfung ist der richtige Reflex — aber das Schweigen davor lässt Herrn Petersen im Ungewissen, ob er ernst genommen wird. Ein Satz der Anerkennung kostet nichts und verändert die Stimmung des ganzen Gesprächs (P4).",
       en: "Checking is the right reflex — but the silence before it leaves Mr Petersen unsure whether he is being taken seriously. One sentence of acknowledgement costs nothing and changes the mood of the whole conversation (P4).",
       id: "Memeriksa memang refleks yang benar — tetapi diam sebelum itu membuat Bapak Petersen tak yakin apakah beliau dianggap serius. Satu kalimat pengakuan tidak memakan biaya apa pun dan mengubah suasana seluruh percakapan (P4)."
      },
      next: "n2"
     },
     {
      id: "c",
      label: {
       de: "Erklären, dass die Sensoren der Minibar zuverlässig buchen und Irrtümer praktisch ausgeschlossen sind.",
       en: "Explain that the minibar sensors post reliably and errors are practically impossible.",
       id: "Menjelaskan bahwa sensor minibar mencatat dengan andal dan kekeliruan praktis mustahil."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "„Praktisch ausgeschlossen“ heißt für den Gast: „Sie irren sich oder schwindeln.“ Sensoren buchen auch beim Umsortieren oder Anheben — gerade Minibar-Posten sind fehleranfällig. Erst prüfen, dann urteilen (P4).",
       en: "“Practically impossible” tells the guest: “you are mistaken or lying.” Sensors also post when items are moved or lifted — minibar lines are error-prone of all things. Check first, judge after (P4).",
       id: "“Praktis mustahil” terdengar bagi tamu sebagai: “Anda keliru atau berbohong.” Sensor juga mencatat saat botol digeser atau diangkat — butir minibar justru rawan galat. Periksa dahulu, menilai kemudian (P4)."
      },
      next: "n2"
     },
     {
      id: "d",
      label: {
       de: "Beschwichtigen: Bei so einem kleinen Betrag werde sich sicher eine Lösung finden lassen.",
       en: "Soothe him: for such a small amount, a solution will surely be found.",
       id: "Menenangkan: untuk nominal sekecil ini pasti akan ada jalan keluarnya."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Freundlich, aber unpräzise: „Sicher eine Lösung“ klingt wie eine halbe Zusage vor jeder Prüfung — und nimmt Ihrer Kulanz später die Wirkung. Erst der kurze Faktencheck, dann die bewusste Entscheidung (P4, P5).",
       en: "Friendly but imprecise: “surely a solution” sounds like half a concession before any check — and robs your later goodwill of its effect. The brief fact check first, then the deliberate decision (P4, P5).",
       id: "Ramah tetapi tidak presisi: “pasti ada jalan keluar” terdengar seperti setengah janji sebelum pemeriksaan apa pun — dan mengurangi efek kelonggaran Anda nanti. Cek fakta singkat dahulu, baru keputusan yang sadar (P4, P5)."
      },
      next: "n2"
     }
    ]
   },
   n2: {
    type: "decision",
    phase: { de: "Prüfung", en: "Verification", id: "Verifikasi" },
    narration: {
     de: "Die Buchung stammt vom gestrigen Nachmittag, automatisch per Sensor erfasst. Das Housekeeping-Protokoll für die Etage ist gestern lückenhaft geführt worden — eine sichere Bestätigung gibt es weder für noch gegen die Entnahme. Herr Petersen wartet.",
     en: "The posting is from yesterday afternoon, recorded automatically by sensor. The housekeeping record for that floor was kept patchily yesterday — there is no firm confirmation either for or against the items being taken. Mr Petersen waits.",
     id: "Penginputan berasal dari kemarin sore, tercatat otomatis oleh sensor. Catatan housekeeping untuk lantai itu kemarin tidak lengkap — tidak ada kepastian yang menguatkan maupun membantah pengambilan barang. Bapak Petersen menunggu."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Den Befund offen teilen: Sensorbuchung ja, Protokoll lückenhaft — und das gemeinsam neutral einordnen.",
       en: "Share the finding openly: sensor posting yes, record patchy — and weigh it up together neutrally.",
       id: "Membagikan temuan secara terbuka: sensor mencatat, tetapi catatan tidak lengkap — lalu menimbangnya bersama secara netral."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Sie legen die Beweislage offen, statt sie zu deuten — Sensorbuchung, Protokolllücke, Restunsicherheit. Auf dieser gemeinsamen Grundlage wirkt jede folgende Entscheidung fair statt gnädig (P4).",
       en: "Exemplary: you lay the evidence open instead of interpreting it — sensor posting, record gap, remaining uncertainty. On that shared basis, whatever decision follows feels fair rather than charitable (P4).",
       id: "Teladan: Anda membuka bukti apa adanya alih-alih menafsirkannya — catatan sensor, celah dokumentasi, ketidakpastian yang tersisa. Di atas dasar bersama itu, keputusan apa pun berikutnya terasa adil, bukan sekadar belas kasihan (P4)."
      },
      next: "n3"
     },
     {
      id: "b",
      label: {
       de: "Still weiterrecherchieren und das Housekeeping anrufen, während Herr Petersen schweigend wartet.",
       en: "Keep researching silently and phone housekeeping while Mr Petersen waits in silence.",
       id: "Terus menelusuri dalam diam dan menelepon housekeeping sementara Bapak Petersen menunggu tanpa kabar."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Gründlich — aber unverhältnismäßig: Für 7,00 € lässt sich ein abreisender Gast nicht minutenlang in Warteschleifen stellen. Sagen Sie, was Sie wissen, und entscheiden Sie auf dieser Basis (P4).",
       en: "Thorough — but disproportionate: for 7,00 € a departing guest cannot be kept hanging through minutes of phone calls. Say what you know and decide on that basis (P4).",
       id: "Teliti — tetapi tidak proporsional: demi 7,00 €, tamu yang hendak berangkat tidak semestinya dibiarkan menunggu bermenit-menit sambil Anda menelepon. Sampaikan yang Anda ketahui dan putuskan atas dasar itu (P4)."
      },
      next: "n3"
     },
     {
      id: "c",
      label: {
       de: "Nachhaken, ob wirklich niemand aus seinem Zimmer etwas entnommen haben kann — auch kein Besuch.",
       en: "Probe whether really nobody could have taken anything from his room — no visitor either.",
       id: "Mendesak apakah benar-benar tidak ada siapa pun yang mungkin mengambil sesuatu dari kamarnya — termasuk tamu yang berkunjung."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Aus der Prüfung wird ein Verhör: Sie durchleuchten das Privatleben des Gastes für 7,00 €. Selbst höflich formuliert signalisiert die Frage Misstrauen — und der letzte Eindruck des Aufenthalts kippt (P4).",
       en: "The check becomes an interrogation: you are examining the guest's private life over 7,00 €. However politely phrased, the question signals distrust — and the stay's final impression tips over (P4).",
       id: "Pemeriksaan berubah menjadi interogasi: Anda mengorek kehidupan pribadi tamu demi 7,00 €. Sesopan apa pun kalimatnya, pertanyaan itu memancarkan kecurigaan — dan kesan terakhir menginapnya pun runtuh (P4)."
      },
      next: "n3"
     },
     {
      id: "d",
      label: {
       de: "Die Prüfung abbrechen und sich für die offenkundige Fehlbuchung überschwänglich entschuldigen.",
       en: "Break off the check and apologise effusively for the obvious posting error.",
       id: "Menghentikan pemeriksaan dan meminta maaf berlebihan atas kesalahan input yang dianggap sudah pasti."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Warm im Ton — aber die Beweislage gibt „offenkundig“ nicht her: Die Buchung könnte auch korrekt sein. Kulanz ja, aber als bewusste Entscheidung nach dem Befund, nicht als Kapitulation vor ihm (P5).",
       en: "Warm in tone — but the evidence does not support “obvious”: the posting could equally be correct. Goodwill yes, but as a deliberate decision after the findings, not a capitulation before them (P5).",
       id: "Nadanya hangat — tetapi bukti tidak mendukung kata “sudah pasti”: penginputan itu bisa saja benar. Kelonggaran boleh, tetapi sebagai keputusan sadar setelah temuan, bukan penyerahan diri sebelum temuan (P5)."
      },
      next: "n3"
     }
    ]
   },
   n3: {
    type: "decision",
    phase: { de: "Entscheidung & Dokumentation", en: "Decision & documentation", id: "Keputusan & dokumentasi" },
    narration: {
     de: "Die Lage ist klar unklar: Sensorbuchung gegen Wort des Gastes, Protokoll lückenhaft, Betrag 7,00 € — innerhalb Ihrer Kulanzgrenze. Herr Petersen sieht Sie an. Ihre Entscheidung wird sein letztes Erlebnis mit Ihrem Haus.",
     en: "The situation is clearly unclear: sensor posting versus the guest's word, a patchy record, 7,00 € at stake — within your goodwill limit. Mr Petersen looks at you. Your decision will be his last experience of your hotel.",
     id: "Situasinya jelas-jelas tidak jelas: catatan sensor melawan ucapan tamu, dokumentasi berlubang, nilai 7,00 € — masih dalam batas kelonggaran Anda. Bapak Petersen menatap Anda. Keputusan Anda akan menjadi pengalaman terakhirnya dengan hotel Anda."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Im Zweifel für den Gast: die 7,00 € im Rahmen Ihrer Kulanz streichen und die Entscheidung kurz dokumentieren.",
       en: "Benefit of the doubt: remove the 7,00 € within your goodwill limit and document the decision briefly.",
       id: "Asas praduga baik: menghapus 7,00 € dalam batas kelonggaran Anda dan mendokumentasikan keputusan itu secara singkat."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau richtig: Bei unklarer Beweislage und kleinem Betrag ist „im Zweifel für den Gast“ die wirtschaftlich und menschlich klügste Regel — sauber dokumentiert bleibt die Kulanz nachvollziehbar statt beliebig (P5, P6).",
       en: "Exactly right: with unclear evidence and a small amount, “benefit of the doubt” is the smartest rule both commercially and humanly — documented cleanly, the goodwill stays traceable rather than arbitrary (P5, P6).",
       id: "Tepat sekali: dengan bukti yang tidak jelas dan nominal kecil, “praduga baik untuk tamu” adalah aturan paling bijak secara bisnis maupun manusiawi — dan dengan dokumentasi rapi, kelonggaran itu tetap tertelusur, bukan sembarangan (P5, P6)."
      },
      next: "n4"
     },
     {
      id: "b",
      label: {
       de: "Die Posten streichen und zusätzlich die Protokolllücke des Housekeepings zur Prüfung an die Leitung melden.",
       en: "Remove the items and additionally report the housekeeping record gap to the manager for review.",
       id: "Menghapus butir itu dan sekaligus melaporkan celah catatan housekeeping kepada atasan untuk ditinjau."
      },
      scores: { d: 1, l: 2, s: 2 },
      flags: { escalate: true },
      feedback: {
       de: "Gut mitgedacht: Die Meldung der Protokolllücke hilft dem Haus über den Einzelfall hinaus (P5, P6). Nur die Gewichtung stimmt fast: Für Herrn Petersen zählt jetzt vor allem die schnelle, klare Entscheidung an der Rechnung.",
       en: "Good systems thinking: reporting the record gap helps the hotel beyond this single case (P5, P6). Only the weighting is slightly off: for Mr Petersen, what counts right now is above all the quick, clear decision on his invoice.",
       id: "Pemikiran sistemik yang baik: melaporkan celah catatan membantu hotel melampaui kasus tunggal ini (P5, P6). Hanya bobotnya yang sedikit bergeser: bagi Bapak Petersen, yang terpenting sekarang adalah keputusan yang cepat dan jelas atas tagihannya."
      },
      next: "n4"
     },
     {
      id: "c",
      label: {
       de: "Die Posten stehen lassen und die Rechnung unverändert zur Zahlung vorlegen — ohne weitere Erklärung.",
       en: "Leave the items in place and present the invoice for payment unchanged — without further explanation.",
       id: "Membiarkan butir itu tetap ada dan menyerahkan tagihan untuk dibayar tanpa perubahan — tanpa penjelasan lebih lanjut."
      },
      scores: { d: 1, l: 1, s: 0 },
      feedback: {
       de: "Kommentarlos festhalten ist die schlechteste Variante des Nein: Der Gast erfährt weder Begründung noch Alternative und zahlt mit dem Gefühl, überstimmt worden zu sein. Wenn Sie die Posten halten wollen, erklären Sie warum — und dokumentieren Sie den Einwand (P4, P6).",
       en: "Holding the line without comment is the worst version of no: the guest gets neither reasons nor an alternative and pays feeling overruled. If you keep the items, explain why — and document the objection (P4, P6).",
       id: "Bertahan tanpa penjelasan adalah bentuk penolakan yang terburuk: tamu tidak menerima alasan maupun alternatif, dan membayar dengan perasaan dikalahkan. Bila butir itu ingin dipertahankan, jelaskan alasannya — dan catat keberatannya (P4, P6)."
      },
      next: "n4"
     },
     {
      id: "d",
      label: {
       de: "Andeuten, dass Gäste solche Posten erfahrungsgemäß gern „vergessen“, die 7,00 € aber ausnahmsweise streichen.",
       en: "Hint that guests tend to conveniently “forget” such items, but remove the 7,00 € as an exception.",
       id: "Menyindir bahwa tamu biasanya suka “lupa” pada butir seperti ini, tetapi menghapus 7,00 € sebagai pengecualian."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Die Streichung wird von der Unterstellung vergiftet: Herr Petersen bekommt sein Geld und behält die Kränkung. Kulanz mit Spitze ist keine Kulanz — sie kostet 7,00 € und den Gast (P1, P4).",
       en: "The removal is poisoned by the insinuation: Mr Petersen gets his money and keeps the insult. Goodwill with a barb is not goodwill — it costs 7,00 € and the guest (P1, P4).",
       id: "Penghapusan itu diracuni oleh sindiran: Bapak Petersen menerima uangnya dan menyimpan sakit hatinya. Kelonggaran yang berduri bukanlah kelonggaran — harganya 7,00 € plus kehilangan tamu (P1, P4)."
      },
      next: "n4"
     }
    ]
   },
   n4: {
    type: "decision",
    phase: { de: "Verabschiedung", en: "Farewell", id: "Perpisahan" },
    narration: {
     de: "Die korrigierte Rechnung ist bezahlt. Herr Petersen steckt seine Karte ein — sein Gesicht ist etwas weicher geworden. Sie erinnern sich: Sein Aufenthalt lief insgesamt durchwachsen. Der letzte Moment gehört Ihnen.",
     en: "The corrected invoice is paid. Mr Petersen puts his card away — his expression has softened a little. You remember: his stay was mixed overall. The last moment is yours.",
     id: "Tagihan yang telah dikoreksi sudah dibayar. Bapak Petersen menyimpan kartunya — raut wajahnya sedikit melunak. Anda ingat: pengalaman menginapnya secara keseluruhan campur aduk. Momen terakhir ada di tangan Anda."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Herzlich verabschieden und aufrichtig nach seinem Aufenthalt fragen — mit dem Angebot, Anmerkungen weiterzugeben.",
       en: "Say a warm goodbye and ask sincerely about his stay — offering to pass his comments on.",
       id: "Berpamitan dengan hangat dan menanyakan pengalaman menginapnya dengan tulus — sambil menawarkan untuk meneruskan masukannya."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Der stärkste Abschluss: Nach dem gelösten Streit öffnen Sie Raum für das, was den Aufenthalt wirklich getrübt hat — und Ihr Haus lernt daraus (P1, P6). So verlässt ein durchwachsener Gast das Haus mit einem guten letzten Kapitel.",
       en: "The strongest close: with the dispute resolved you open space for what really clouded the stay — and your hotel learns from it (P1, P6). Thus a guest with a mixed stay leaves on a good final chapter.",
       id: "Penutup terkuat: setelah sengketa selesai, Anda membuka ruang bagi hal yang benar-benar mengganjal selama menginap — dan hotel Anda belajar darinya (P1, P6). Dengan begitu, tamu yang pengalamannya campur aduk pulang dengan bab terakhir yang baik."
      },
      next: "x1"
     },
     {
      id: "b",
      label: {
       de: "Freundlich gute Heimreise wünschen und den Vorgang damit zügig beenden.",
       en: "Warmly wish him a good journey home and wrap the matter up briskly.",
       id: "Dengan ramah mengucapkan selamat jalan dan segera menutup urusan."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Freundlich und effizient — aber eine Gelegenheit bleibt liegen: Ein durchwachsener Aufenthalt plus gelöster Streit ist der perfekte Moment für eine ehrliche Feedback-Frage. Sie hätte Wertschätzung gezeigt und dem Haus genützt (P1).",
       en: "Friendly and efficient — but an opportunity is left behind: a mixed stay plus a resolved dispute is the perfect moment for an honest feedback question. It would have shown appreciation and served the hotel (P1).",
       id: "Ramah dan efisien — tetapi satu peluang tertinggal: menginap yang campur aduk plus sengketa yang terselesaikan adalah momen sempurna untuk satu pertanyaan umpan balik yang tulus. Itu akan menunjukkan penghargaan sekaligus berguna bagi hotel (P1)."
      },
      next: "x2"
     },
     {
      id: "c",
      label: {
       de: "Beim Abschied augenzwinkernd empfehlen, die Minibar beim nächsten Mal besser ganz zu meiden.",
       en: "At the farewell, jokingly recommend he steer clear of the minibar entirely next time.",
       id: "Saat berpamitan, berkelakar menyarankan agar lain kali beliau menjauhi minibar sama sekali."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Der Scherz reißt die gerade geschlossene Wunde wieder auf: Er verbindet den Gast ein letztes Mal mit dem Verdacht. Der Abschied ist für Dank und gute Wünsche da — nicht für Pointen auf Kosten des Gastes (P1).",
       en: "The joke reopens the wound that just closed: it links the guest one last time to the suspicion. The farewell is for thanks and good wishes — not for punchlines at the guest's expense (P1).",
       id: "Kelakar itu membuka kembali luka yang baru saja tertutup: mengaitkan tamu untuk terakhir kalinya dengan kecurigaan. Perpisahan adalah tempat untuk terima kasih dan doa baik — bukan lelucon dengan tamu sebagai sasarannya (P1)."
      },
      next: "x3"
     }
    ]
   },
   x1: {
    type: "outcome",
    tone: "good",
    ending: {
     de: "Herr Petersen bleibt tatsächlich noch einen Moment: Das Zimmer sei laut gewesen, das Frühstück aber ausgezeichnet. Er sagt es ruhig — und bedankt sich für die unkomplizierte Lösung. Sie notieren beides. Ein strittiger Posten über 7,00 € wurde zur wertvollsten Rückmeldung des Tages und zu einem versöhnten Abschied.",
     en: "Mr Petersen actually stays a moment longer: the room was noisy, he says, but the breakfast excellent. He says it calmly — and thanks you for the uncomplicated solution. You note down both. A disputed 7,00 € item became the day's most valuable feedback and a reconciled goodbye.",
     id: "Bapak Petersen ternyata masih tinggal sejenak: kamarnya bising, katanya, tetapi sarapannya istimewa. Beliau mengatakannya dengan tenang — dan berterima kasih atas penyelesaian yang tidak berbelit. Anda mencatat keduanya. Sengketa 7,00 € berubah menjadi masukan paling berharga hari itu dan perpisahan yang penuh damai."
    }
   },
   x2: {
    type: "outcome",
    tone: "mixed",
    ending: {
     de: "Herr Petersen reist ohne Groll ab — der Streit wurde beigelegt, die Rechnung stimmt für ihn. Was fehlt, ist der Gewinn darüber hinaus: das Feedback, die Meldung der Protokolllücke oder der dokumentierte Kulanzgrund. Ein gelöster Konflikt ist gut; ein gelöster Konflikt, aus dem das Haus lernt, ist besser.",
     en: "Mr Petersen departs without resentment — the dispute is settled, the invoice feels right to him. What is missing is the gain beyond it: the feedback, the report of the record gap, or the documented reason for the goodwill. A resolved conflict is good; a resolved conflict the hotel learns from is better.",
     id: "Bapak Petersen berangkat tanpa dendam — sengketa selesai, tagihan terasa benar baginya. Yang kurang adalah keuntungan di baliknya: umpan balik, laporan celah catatan, atau alasan kelonggaran yang terdokumentasi. Konflik yang selesai itu baik; konflik selesai yang menjadi pelajaran bagi hotel jauh lebih baik."
    }
   },
   x3: {
    type: "outcome",
    tone: "poor",
    ending: {
     de: "Herr Petersen verlässt das Haus mit bezahlter oder gestrichener Rechnung — und mit dem Gefühl, verdächtigt worden zu sein. Über 7,00 € wurde verhandelt, verloren ging mehr: die Chance auf sein Wiederkommen. Merken Sie sich die Regel dieses Falls: Bei kleinem Betrag und unklarer Lage zählt der Ton mehr als das Geld — im Zweifel für den Gast, ohne Spitze, mit Notiz (P4, P5, P6).",
     en: "Mr Petersen leaves the hotel with his invoice paid or amended — and with the feeling of having been under suspicion. The negotiation was over 7,00 €; what was lost is worth more: the chance of his return. Remember this case's rule: with small amounts and unclear facts, tone counts more than money — benefit of the doubt, no barbs, with a note (P4, P5, P6).",
     id: "Bapak Petersen meninggalkan hotel dengan tagihan yang terbayar atau terkoreksi — dan dengan perasaan pernah dicurigai. Yang dinegosiasikan hanya 7,00 €; yang hilang jauh lebih berharga: peluang beliau kembali. Ingat kaidah kasus ini: pada nominal kecil dan fakta yang kabur, nada lebih penting daripada uang — praduga baik, tanpa sindiran, disertai catatan (P4, P5, P6)."
    }
   }
  },
  debrief: {
   tips: {
    decision: {
     de: "Wägen Sie Betrag gegen Beweislage: Kleiner Betrag plus unklare Fakten ergibt „im Zweifel für den Gast“ — konsequent angewandt spart diese Regel Zeit, Geld und Beziehungen.",
     en: "Weigh amount against evidence: small amount plus unclear facts equals “benefit of the doubt” — applied consistently, this rule saves time, money and relationships.",
     id: "Timbang nominal terhadap bukti: nominal kecil plus fakta yang kabur menghasilkan “praduga baik untuk tamu” — diterapkan konsisten, kaidah ini menghemat waktu, uang, dan hubungan."
    },
    language: {
     de: "Beschreiben Sie Befunde, nicht Verdächtigungen: „Der Sensor hat gestern gebucht, das Protokoll ist unvollständig“ lässt beide Seiten das Gesicht wahren — jede Deutung Richtung Gast klingt wie Anklage.",
     en: "Describe findings, not suspicions: “the sensor posted yesterday, the record is incomplete” lets both sides keep face — any interpretation aimed at the guest sounds like an accusation.",
     id: "Uraikan temuan, bukan kecurigaan: “sensor mencatat kemarin, dokumentasinya tidak lengkap” menjaga muka kedua pihak — setiap tafsir yang diarahkan ke tamu terdengar seperti dakwaan."
    },
    sop: {
     de: "Kulanz braucht Buchführung: Betrag, Grund und Entscheidung kurz notieren — so bleibt sie steuerbar, erklärbar und erkennbar, falls sich Muster häufen (P6).",
     en: "Goodwill needs bookkeeping: briefly note amount, reason and decision — keeping it manageable, explainable and visible should patterns accumulate (P6).",
     id: "Kelonggaran memerlukan pembukuan: catat singkat nominal, alasan, dan keputusannya — agar tetap terkendali, dapat dijelaskan, dan terlihat bila polanya berulang (P6)."
    }
   },
   safetyTip: {
    de: "Unterstellen Sie nie Absicht, auch nicht scherzhaft oder im Nebensatz: Eine Anschuldigung ohne Beweis beschädigt den Gast vor Zeugen — und Ihr Haus gleich mit. Muster meldet man der Leitung, nicht dem Gast (P4, P5).",
    en: "Never insinuate intent, not even jokingly or in passing: an accusation without proof damages the guest in front of witnesses — and your hotel with it. Patterns are reported to the manager, not to the guest (P4, P5).",
    id: "Jangan pernah menyiratkan niat buruk, sekalipun bercanda atau sambil lalu: tuduhan tanpa bukti melukai tamu di depan saksi — dan ikut merusak hotel Anda. Pola yang mencurigakan dilaporkan kepada atasan, bukan kepada tamu (P4, P5)."
   },
   praise: {
    de: "Sehr gut: neutral geprüft, bewusst kulant entschieden, dokumentiert und mit einer echten Feedback-Frage verabschiedet — der Musterfall eines gelösten Kleinstreits.",
    en: "Very good: checked neutrally, decided deliberately on goodwill, documented, and closed with a genuine feedback question — the model case of a resolved small dispute.",
    id: "Sangat baik: diperiksa netral, diputuskan dengan kelonggaran yang sadar, didokumentasikan, dan ditutup dengan pertanyaan umpan balik yang tulus — contoh ideal sengketa kecil yang terselesaikan."
   }
  },
  sopRefs: ["P1", "P4", "P5", "P6"]
 };
})();
