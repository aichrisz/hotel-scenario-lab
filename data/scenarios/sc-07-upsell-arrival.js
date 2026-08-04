(function () {
 "use strict";
 window.HSL = window.HSL || {};
 var data = (HSL.data = HSL.data || { scenarios: {}, order: [] });
 data.scenarios["sc-07-upsell-arrival"] = {
  id: "sc-07-upsell-arrival",
  category: "upsell",
  difficulty: 1,
  minutes: 4,
  title: {
   de: "Zimmer-Upgrade anbieten",
   en: "Offering a Room Upgrade",
   id: "Penawaran Peningkatan Kamar"
  },
  summary: {
   de: "Ein Ehepaar feiert seinen Hochzeitstag — vielleicht der richtige Moment für ein Upgrade mit Meerblick.",
   en: "A married couple is celebrating their anniversary — perhaps the right moment for a sea-view upgrade.",
   id: "Sepasang suami istri merayakan hari pernikahan mereka — mungkin inilah saat yang tepat untuk upgrade kamar dengan pemandangan laut."
  },
  context: {
   place: {
    de: "Empfang Ihres Hauses, früher Nachmittag, ruhiger Betrieb.",
    en: "The front desk of your hotel, early afternoon, business is calm.",
    id: "Meja resepsionis hotel Anda, awal sore, suasana tenang."
   },
   situation: {
    de: "Herr und Frau Santoso checken für zwei Nächte ein und erwähnen im Gespräch ihren Hochzeitstag.",
    en: "Mr and Mrs Santoso are checking in for two nights and mention their wedding anniversary in passing.",
    id: "Bapak dan Ibu Santoso check-in untuk dua malam dan menyebut hari pernikahan mereka di sela percakapan."
   },
   guest: {
    de: "Herr und Frau Santoso, Mitte 50, gebucht ist ein Standardzimmer zur Hofseite; beide gut gelaunt.",
    en: "Mr and Mrs Santoso, mid-fifties, booked into a standard courtyard-facing room; both in high spirits.",
    id: "Bapak dan Ibu Santoso, pertengahan 50-an, memesan kamar standar menghadap halaman dalam; keduanya sedang gembira."
   },
   constraints: {
    de: "Zwei Zimmer mit Meerblick sind frei; der Aufpreis ist ein fester Tarif. Rabatte darauf liegen nicht in Ihrer Befugnis.",
    en: "Two sea-view rooms are free; the surcharge is a fixed rate. Discounts on it are not within your authority.",
    id: "Dua kamar pemandangan laut tersedia; selisih tarifnya tetap. Diskon atasnya bukan kewenangan Anda."
   }
  },
  goals: [
   {
    de: "Bedürfnissignale des Gastes erkennen und aufgreifen (P1).",
    en: "Recognise and pick up the guest's need signals (P1).",
    id: "Mengenali dan menangkap sinyal kebutuhan tamu (P1)."
   },
   {
    de: "Ehrlich und mit echtem Mehrwert anbieten — ohne Druck (P8).",
    en: "Offer honestly and with real value — without pressure (P8).",
    id: "Menawarkan secara jujur dengan nilai nyata — tanpa tekanan (P8)."
   },
   {
    de: "Ein Nein anmutig annehmen (P8).",
    en: "Accept a no gracefully (P8).",
    id: "Menerima penolakan dengan anggun (P8)."
   }
  ],
  startNode: "n1",
  nodes: {
   n1: {
    type: "decision",
    phase: { de: "Bedürfnis erkennen", en: "Reading the need", id: "Membaca kebutuhan" },
    narration: {
     de: "Während Sie die Reservierung öffnen, sagt Frau Santoso lächelnd zu ihrem Mann: „Dreißig Jahre — wer hätte das gedacht.“ Die Anreise ist entspannt, niemand wartet hinter den beiden.",
     en: "As you open the reservation, Mrs Santoso smiles at her husband: “Thirty years — who would have thought.” The arrival is relaxed; nobody is waiting behind them.",
     id: "Saat Anda membuka reservasi, Ibu Santoso tersenyum kepada suaminya: “Tiga puluh tahun — siapa sangka.” Kedatangan berlangsung santai; tidak ada yang menunggu di belakang mereka."
    },
    guestLine: {
     de: "Wir feiern nämlich unseren Hochzeitstag — deshalb gönnen wir uns die zwei Nächte.",
     en: "We are celebrating our wedding anniversary, you see — that is why we are treating ourselves to the two nights.",
     id: "Kami sedang merayakan hari pernikahan — karena itu kami menghadiahkan dua malam ini untuk diri kami."
    },
    options: [
     {
      id: "a",
      label: {
       de: "Herzlich gratulieren und mit einer offenen Frage anknüpfen, was die beiden sich von den zwei Tagen wünschen.",
       en: "Congratulate them warmly and follow up with an open question about what they wish for from the two days.",
       id: "Memberi selamat dengan hangat dan menyambungnya dengan pertanyaan terbuka tentang harapan mereka selama dua hari ini."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Vorbildlich: Der Glückwunsch würdigt den Anlass, und Ihre offene Frage lässt die Gäste selbst formulieren, was ihnen wichtig ist (P1). Genau daraus entsteht später ein passendes Angebot statt eines Verkaufsspruchs.",
       en: "Exemplary: the congratulations honour the occasion, and your open question lets the guests say themselves what matters to them (P1). That is what later turns into a fitting offer instead of a sales line.",
       id: "Teladan: ucapan selamat menghargai momennya, dan pertanyaan terbuka Anda membiarkan tamu sendiri yang merumuskan apa yang penting bagi mereka (P1). Dari situlah lahir tawaran yang pas, bukan jargon penjualan."
      },
      next: "n2"
     },
     {
      id: "b",
      label: {
       de: "Kurz nicken und den Check-in wie gewohnt fortsetzen — die Reservierung ist ja eindeutig.",
       en: "Nod briefly and continue the check-in as usual — the reservation is clear, after all.",
       id: "Mengangguk singkat dan melanjutkan check-in seperti biasa — toh reservasinya sudah jelas."
      },
      scores: { d: 1, l: 1, s: 2 },
      feedback: {
       de: "Der Ablauf ist korrekt, aber das Geschenk blieb liegen: Die Gäste haben Ihnen ihren Anlass geschenkt — das stärkste Signal, das ein Empfang bekommen kann. Wer es aufgreift, verkauft nicht, er hilft feiern (P1, P8).",
       en: "The procedure is correct, but the gift stayed on the counter: the guests handed you their occasion — the strongest signal a front desk can get. Picking it up is not selling; it is helping them celebrate (P1, P8).",
       id: "Prosedurnya benar, tetapi hadiahnya dibiarkan tergeletak: tamu telah menyerahkan momen mereka kepada Anda — sinyal terkuat yang bisa diterima resepsionis. Menangkapnya bukan berjualan, melainkan membantu mereka merayakan (P1, P8)."
      },
      next: "n2"
     },
     {
      id: "c",
      label: {
       de: "Sofort verkünden, dass Sie „da genau das Richtige“ haben, und den Meerblick-Aufpreis nennen.",
       en: "Announce at once that you have “just the thing”, and quote the sea-view surcharge.",
       id: "Langsung mengumumkan bahwa Anda punya “yang paling pas”, sambil menyebut selisih tarif pemandangan laut."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Vom Anlass direkt zum Preis in einem Atemzug — so fühlt sich der Hochzeitstag wie ein Verkaufsanlass an. Erst gratulieren, dann fragen, dann anbieten: Die Reihenfolge macht aus demselben Angebot ein Geschenk (P1, P8).",
       en: "From the occasion straight to the price in one breath — the anniversary now feels like a sales opportunity. Congratulate first, ask second, offer third: the order turns the same offer into a gift (P1, P8).",
       id: "Dari momen langsung ke harga dalam satu tarikan napas — hari pernikahan pun terasa seperti peluang dagang. Beri selamat dahulu, bertanya kemudian, baru menawarkan: urutan itulah yang mengubah tawaran yang sama menjadi hadiah (P1, P8)."
      },
      next: "n2"
     },
     {
      id: "d",
      label: {
       de: "Warm gratulieren und dann rasch zum Formalen zurückkehren, ohne weiter nachzufragen.",
       en: "Congratulate them warmly, then quickly return to the formalities without asking anything further.",
       id: "Memberi selamat dengan hangat lalu cepat kembali ke urusan formal tanpa bertanya lebih jauh."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Die Wärme kommt an — doch ohne eine Anschlussfrage bleibt unklar, was den beiden wichtig ist. Eine einzige offene Frage hätte die Brücke vom Glückwunsch zum passenden Angebot gebaut (P1).",
       en: "The warmth lands — but without a follow-up question you never learn what matters to them. A single open question would have bridged from congratulations to a fitting offer (P1).",
       id: "Kehangatannya sampai — tetapi tanpa pertanyaan lanjutan, Anda tidak tahu apa yang penting bagi mereka. Satu pertanyaan terbuka saja sudah menjadi jembatan dari ucapan selamat menuju tawaran yang pas (P1)."
      },
      next: "n2"
     }
    ]
   },
   n2: {
    type: "decision",
    phase: { de: "Angebot", en: "The offer", id: "Penawaran" },
    narration: {
     de: "Frau Santoso erzählt, dass sie „einfach zwei schöne, ruhige Tage am Wasser“ wollen. Im System sehen Sie: Zwei Meerblick-Zimmer sind frei, der Aufpreis ist ein fester Tarif pro Nacht. Der Moment für Ihr Angebot ist da.",
     en: "Mrs Santoso says they simply want “two lovely, quiet days by the water”. In the system you can see: two sea-view rooms are free, the surcharge is a fixed rate per night. The moment for your offer has come.",
     id: "Ibu Santoso bercerita bahwa mereka hanya ingin “dua hari yang indah dan tenang di tepi air”. Di sistem Anda melihat: dua kamar pemandangan laut kosong, selisih tarifnya tetap per malam. Saatnya menyampaikan tawaran."
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Das Meerblick-Zimmer als Passung zum Anlass beschreiben, den festen Aufpreis transparent nennen und die Wahl freistellen.",
       en: "Describe the sea-view room as a match for the occasion, state the fixed surcharge transparently, and leave the choice free.",
       id: "Menggambarkan kamar pemandangan laut sebagai pasangan momen mereka, menyebut selisih tarif tetap secara transparan, dan membebaskan pilihan."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Genau so: Das Angebot knüpft an ihren Wunsch an — ruhige Tage am Wasser —, der Preis ist ehrlich und vollständig, und die Entscheidung bleibt spürbar frei (P8). Mehr braucht gutes Verkaufen nicht.",
       en: "Exactly so: the offer connects to their wish — quiet days by the water —, the price is honest and complete, and the decision stays visibly free (P8). Good selling needs nothing more.",
       id: "Tepat seperti ini: tawaran terhubung dengan keinginan mereka — hari tenang di tepi air —, harganya jujur dan lengkap, dan keputusan tetap terasa bebas (P8). Penjualan yang baik tidak membutuhkan lebih dari itu."
      },
      next: "n3"
     },
     {
      id: "b",
      label: {
       de: "Zum Anlass einen „nur heute gültigen Sonderrabatt“ auf den Aufpreis erfinden, um den Abschluss zu sichern.",
       en: "Invent a “special discount, today only” on the surcharge to secure the deal.",
       id: "Mengarang “diskon spesial khusus hari ini” atas selisih tarif demi memastikan kesepakatan."
      },
      scores: { d: 1, l: 1, s: 0 },
      feedback: {
       de: "Ein erfundener Rabatt ist doppelt falsch: Er liegt außerhalb Ihrer Befugnis, und er macht Ihr Angebot unehrlich — spätestens an der Rechnung fliegt es auf (P8, P5). Der echte Mehrwert braucht keinen Trick.",
       en: "An invented discount is doubly wrong: it is outside your authority, and it makes your offer dishonest — at the invoice, at the latest, it comes to light (P8, P5). Real value needs no trick.",
       id: "Diskon karangan salah dua kali: berada di luar kewenangan Anda, dan membuat tawaran menjadi tidak jujur — paling lambat saat tagihan, semuanya terbongkar (P8, P5). Nilai yang nyata tidak memerlukan tipuan."
      },
      next: "n3"
     },
     {
      id: "c",
      label: {
       de: "Auf das erste Zögern hin nachlegen: so ein Anlass komme nur einmal, das müsse man sich doch wert sein.",
       en: "At the first hesitation, press on: such an occasion comes only once, surely they are worth it.",
       id: "Begitu mereka ragu, terus mendesak: momen seperti ini hanya sekali, masa tidak layak untuk diri sendiri."
      },
      scores: { d: 0, l: 1, s: 1 },
      feedback: {
       de: "Nachlegen bei Zögern kippt das Angebot in Druck: Jetzt verteidigen die Gäste ihre Entscheidung statt sie zu genießen. Ein Angebot, einmal klar gemacht, spricht für sich — oder eben nicht (P8).",
       en: "Pressing on hesitation tips the offer into pressure: the guests now defend their decision instead of enjoying it. An offer, once made clearly, speaks for itself — or it does not (P8).",
       id: "Mendesak saat tamu ragu mengubah tawaran menjadi tekanan: kini mereka sibuk mempertahankan keputusan alih-alih menikmatinya. Tawaran yang sudah disampaikan dengan jelas akan berbicara sendiri — atau memang tidak (P8)."
      },
      next: "n3"
     },
     {
      id: "d",
      label: {
       de: "Bei der Leitung nachfragen, ob zum Hochzeitstag ein Entgegenkommen beim Aufpreis möglich ist.",
       en: "Check with the manager whether some concession on the surcharge is possible for the anniversary.",
       id: "Menanyakan kepada atasan apakah ada kelonggaran selisih tarif untuk hari pernikahan mereka."
      },
      scores: { d: 1, l: 1, s: 1 },
      flags: { escalate: true },
      feedback: {
       de: "Nachzufragen statt zu erfinden ist der richtige Instinkt (P5) — nur der Zeitpunkt ist früh: Noch hat niemand nach einem Rabatt gefragt. Machen Sie erst das transparente Angebot; die Anfrage bleibt als zweiter Schritt möglich.",
       en: "Asking instead of inventing is the right instinct (P5) — only the timing is early: nobody has asked for a discount yet. Make the transparent offer first; the enquiry remains available as a second step.",
       id: "Bertanya alih-alih mengarang adalah naluri yang benar (P5) — hanya waktunya terlalu dini: belum ada yang meminta diskon. Sampaikan dahulu tawaran yang transparan; menanyakan atasan tetap bisa menjadi langkah kedua."
      },
      next: "n3"
     }
    ]
   },
   n3: {
    type: "decision",
    phase: { de: "Antwort des Gastes", en: "The guest's decision", id: "Respons atas keputusan" },
    narration: {
     de: "Die Santosos wechseln einen Blick. Dann sagt Herr Santoso freundlich, aber bestimmt: „Danke — aber wir bleiben beim gebuchten Zimmer. Der Ausblick ist uns den Aufpreis nicht wert.“",
     en: "The Santosos exchange a look. Then Mr Santoso says, kindly but firmly: “Thank you — but we will keep the room we booked. The view is not worth the surcharge to us.”",
     id: "Pasangan Santoso bertukar pandang. Lalu Bapak Santoso berkata ramah tetapi tegas: “Terima kasih — tetapi kami tetap dengan kamar yang dipesan. Bagi kami, pemandangannya tidak sepadan dengan selisih tarifnya.”"
    },
    guestLine: null,
    options: [
     {
      id: "a",
      label: {
       de: "Die Entscheidung sofort und herzlich bestätigen und dem Paar einen wunderbaren Hochzeitstag im Haus wünschen.",
       en: "Confirm their decision at once and warmly, and wish the couple a wonderful anniversary at the hotel.",
       id: "Langsung menerima keputusan itu dengan hangat dan mendoakan hari pernikahan yang indah selama menginap."
      },
      scores: { d: 2, l: 2, s: 2 },
      feedback: {
       de: "Anmutiger geht es nicht: Das Nein wird ohne Zögern respektiert, die Herzlichkeit bleibt ungebrochen (P8). Genau diese Reaktion entscheidet, ob Gäste beim nächsten Mal wieder offen für ein Angebot sind.",
       en: "It does not get more graceful: the no is respected without hesitation, and the warmth stays unbroken (P8). Exactly this reaction decides whether guests stay open to an offer next time.",
       id: "Tidak ada yang lebih anggun: penolakan dihormati tanpa jeda, kehangatan tetap utuh (P8). Reaksi seperti inilah yang menentukan apakah tamu tetap terbuka pada tawaran di lain waktu."
      },
      next: "x1"
     },
     {
      id: "b",
      label: {
       de: "Die Entscheidung akzeptieren, aber noch anmerken, dass das Zimmer sonst sicher schnell weg ist.",
       en: "Accept the decision, but add that the room will surely be gone quickly otherwise.",
       id: "Menerima keputusan itu, tetapi masih menambahkan bahwa kamarnya pasti cepat terisi."
      },
      scores: { d: 1, l: 2, s: 1 },
      feedback: {
       de: "Fast sauber — aber der Nachsatz ist ein kleiner Verkaufshaken im Abschied: Er säht Zweifel, wo gerade Frieden war. Ein Nein braucht keinen Nachtrag (P8).",
       en: "Almost clean — but the afterthought is a little sales hook in the farewell: it sows doubt where there was just peace. A no needs no postscript (P8).",
       id: "Nyaris mulus — tetapi kalimat tambahan itu adalah kail dagang kecil dalam perpisahan: menabur ragu di tempat yang baru saja damai. Sebuah penolakan tidak memerlukan catatan kaki (P8)."
      },
      next: "x2"
     },
     {
      id: "c",
      label: {
       de: "Hörbar seufzen, die Unterlagen zusammenschieben und den Rest wortkarg abwickeln.",
       en: "Sigh audibly, gather the papers together, and process the rest with few words.",
       id: "Menghela napas terdengar, merapikan berkas, dan menyelesaikan sisanya dengan irit kata."
      },
      scores: { d: 0, l: 0, s: 1 },
      feedback: {
       de: "Die Enttäuschung ist spürbar geworden — und damit bezahlt der Gast für sein Nein mit schlechterem Service. Das beschädigt den Anlass und das Vertrauen zugleich; ein Nein zum Upgrade ist nie ein Nein zu Ihnen (P1, P8).",
       en: "The disappointment became visible — and the guest now pays for his no with poorer service. That damages the occasion and the trust at once; a no to the upgrade is never a no to you (P1, P8).",
       id: "Kekecewaan Anda menjadi terlihat — dan tamu pun membayar penolakannya dengan layanan yang lebih dingin. Itu merusak momen sekaligus kepercayaan; menolak upgrade tidak pernah berarti menolak Anda (P1, P8)."
      },
      next: "x3"
     }
    ]
   },
   x1: {
    type: "outcome",
    tone: "good",
    ending: {
     de: "Die Santosos gehen lachend Richtung Aufzug — gebuchtes Zimmer, gehobene Stimmung. Sie haben das Signal erkannt, ehrlich angeboten und das Nein mit derselben Wärme angenommen wie ein Ja. So bleibt der Hochzeitstag das Thema — nicht der Verkaufsversuch. Beim Abendessen erzählen die beiden vielleicht von der netten Rezeption.",
     en: "The Santosos head to the lift laughing — the room they booked, spirits lifted. You recognised the signal, offered honestly and accepted the no with the same warmth as a yes. The anniversary stays the story — not the sales attempt. Over dinner, the two may well talk about the lovely front desk.",
     id: "Pasangan Santoso berjalan ke lift sambil tertawa — kamar sesuai pesanan, suasana hati terangkat. Anda mengenali sinyal, menawarkan dengan jujur, dan menerima penolakan dengan kehangatan yang sama seperti menerima persetujuan. Yang dikenang tetaplah hari pernikahan — bukan upaya penjualan. Saat makan malam, bisa jadi mereka bercerita tentang resepsionis yang menyenangkan."
    }
   },
   x2: {
    type: "outcome",
    tone: "mixed",
    ending: {
     de: "Das Paar ist zufrieden eingecheckt, und Ihr Angebot war im Kern in Ordnung. Aber irgendwo blieb ein Rest: eine verpasste Frage, ein Preis im falschen Moment oder ein Nachsatz zu viel. Gutes Anbieten ist eine Abfolge — Anlass würdigen, Wunsch erfragen, transparent anbieten, Antwort respektieren. Jedes ausgelassene Glied spürt der Gast.",
     en: "The couple checked in happily, and your offer was sound at its core. But somewhere a residue remained: a missed question, a price at the wrong moment or one afterthought too many. Good offering is a sequence — honour the occasion, ask the wish, offer transparently, respect the answer. The guest feels every skipped link.",
     id: "Pasangan itu check-in dengan senang, dan tawaran Anda pada intinya sudah baik. Namun ada sisa yang tertinggal: pertanyaan yang terlewat, harga di momen yang salah, atau satu kalimat tambahan yang berlebih. Menawarkan yang baik adalah rangkaian — hargai momennya, tanyakan keinginannya, tawarkan dengan transparan, hormati jawabannya. Setiap mata rantai yang dilompati akan terasa oleh tamu."
    }
   },
   x3: {
    type: "outcome",
    tone: "poor",
    ending: {
     de: "Die Santosos haben ihr Zimmer — aber der Beigeschmack reist mit: Druck, ein erfundener Rabatt oder spürbare Enttäuschung nach dem Nein. Aus einem Feiertag wurde eine Verkaufssituation. Merken Sie sich: Ein Angebot ist ein Geschenkvorschlag, kein Abschlusszwang — und die Reaktion auf das Nein ist der eigentliche Test (P8).",
     en: "The Santosos have their room — but the aftertaste travels with them: pressure, an invented discount or visible disappointment after the no. A celebration turned into a sales situation. Remember: an offer is a gift suggestion, not a closing obligation — and the reaction to the no is the real test (P8).",
     id: "Pasangan Santoso mendapatkan kamarnya — tetapi rasa tak sedapnya ikut terbawa: tekanan, diskon karangan, atau kekecewaan yang terlihat setelah penolakan. Hari perayaan berubah menjadi situasi jual-beli. Ingatlah: tawaran adalah usulan hadiah, bukan paksaan transaksi — dan reaksi atas penolakan adalah ujian yang sesungguhnya (P8)."
    }
   }
  },
  debrief: {
   tips: {
    decision: {
     de: "Bauen Sie Angebote auf Signalen: Erst der geäußerte Wunsch der Gäste („ruhige Tage am Wasser“) macht aus einem Zimmer mit Aufpreis einen passenden Vorschlag. Ohne Signal ist jedes Angebot ein Schuss ins Blaue.",
     en: "Build offers on signals: only the guests' expressed wish (“quiet days by the water”) turns a room with a surcharge into a fitting proposal. Without a signal, every offer is a shot in the dark.",
     id: "Bangun tawaran di atas sinyal: keinginan yang diucapkan tamu (“hari tenang di tepi air”) itulah yang mengubah kamar dengan selisih tarif menjadi usulan yang pas. Tanpa sinyal, setiap tawaran hanyalah tebakan buta."
    },
    language: {
     de: "Nennen Sie Preise ruhig, vollständig und ohne Weichmacher: „Der Aufpreis beträgt … pro Nacht“ wirkt souveräner als jede Rabattandeutung — und lässt sich anmutig ablehnen.",
     en: "State prices calmly, completely and without softeners: “the surcharge is … per night” sounds more assured than any hint of a discount — and can be declined gracefully.",
     id: "Sebutkan harga dengan tenang, lengkap, dan tanpa pemanis: “selisih tarifnya … per malam” terdengar lebih mantap daripada isyarat diskon mana pun — dan mudah ditolak dengan anggun."
    },
    sop: {
     de: "Preise und Rabatte sind Rahmenwerk, kein Improvisationsmaterial: Was nicht in Ihrer Befugnis liegt, wird nicht erfunden, sondern — falls überhaupt nötig — bei der Leitung erfragt (P5, P8).",
     en: "Prices and discounts are a framework, not improvisation material: what is not within your authority is not invented but — if needed at all — asked of the manager (P5, P8).",
     id: "Harga dan diskon adalah kerangka aturan, bukan bahan improvisasi: yang bukan kewenangan Anda tidak dikarang, melainkan — bila memang perlu — ditanyakan kepada atasan (P5, P8)."
    }
   },
   safetyTip: {
    de: "Erfinden Sie nie Rabatte, Verfügbarkeiten oder Fristen, um einen Abschluss zu beschleunigen: Jede unwahre Angabe fliegt spätestens an der Rechnung auf und kostet mehr als den Aufpreis — nämlich Vertrauen (P8).",
    en: "Never invent discounts, availability or deadlines to speed up a sale: any untrue claim surfaces at the invoice at the latest, and costs more than the surcharge — namely trust (P8).",
    id: "Jangan pernah mengarang diskon, ketersediaan, atau tenggat demi mempercepat transaksi: setiap keterangan tidak benar akan terbongkar paling lambat di tagihan, dan harganya lebih mahal daripada selisih tarif — yaitu kepercayaan (P8)."
   },
   praise: {
    de: "Sehr schön: Signal erkannt, ehrlich angeboten, Nein mit Würde angenommen — besser lässt sich Zusatzverkauf nicht führen. Wiederholen Sie das Szenario in einer anderen Sprache und feilen Sie an Ihren Angebotsformulierungen.",
    en: "Lovely work: signal recognised, offered honestly, no accepted with dignity — upselling cannot be done better. Replay the scenario in another language and polish your offer phrasing.",
    id: "Bagus sekali: sinyal dikenali, tawaran disampaikan jujur, penolakan diterima dengan bermartabat — penawaran tambahan tidak bisa dilakukan lebih baik dari ini. Ulangi skenario dalam bahasa lain dan asah kalimat penawaran Anda."
   }
  },
  sopRefs: ["P1", "P8"]
 };
})();
