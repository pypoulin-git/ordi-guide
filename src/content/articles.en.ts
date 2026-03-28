import type { Article } from './articles'

export const articles: Article[] = [
  {
    slug: 'processeur-cerveau-moteur-ordinateur',
    title: 'The Processor: Your Computer\'s Brain (or Engine)',
    description: 'Finally understand what a processor is, why it matters, and how to pick one without getting ripped off.',
    date: '2026-03-26',
    readTime: '6 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🧠',
    tags: ['processeur'],
    featured: true,
    coverGradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #0891b2 100%)',
    tldr: 'The processor (CPU) is what makes your computer "think." For most people, a recent Intel Core i5 or AMD Ryzen 5 is more than enough. Don\'t be impressed by big numbers — a recent mid-range model often beats a high-end one from 3 years ago.',
    sections: [
      {
        title: 'What is a processor?',
        paragraphs: [
          'If your computer were a human body, the processor would be the brain. It\'s what makes every decision, executes every instruction, and runs every program. When you click a link, open a photo, or type text — the processor handles all of it.',
          'If you prefer a car analogy: the processor is the engine. It\'s the raw power that makes the machine go. A small 4-cylinder engine gets the job done around town (browsing the web), but to tow a trailer (video editing), you need something beefier.',
          'Either way, the principle is the same: the more powerful the processor, the faster your computer responds. But careful — "more powerful" doesn\'t always mean "most expensive."',
        ],
      },
      {
        title: 'Intel or AMD? And where does Apple fit in?',
        paragraphs: [
          'Two big brands share the market: Intel and AMD. Both make excellent processors, and the rivalry between them has driven prices down and quality up. Neither is objectively "better" — it depends on the specific model.',
          'Intel uses names like Core i3, i5, i7, and i9. AMD uses Ryzen 3, 5, 7, and 9. In both cases, the number after the name indicates the power "tier": 3 = entry-level, 5 = mid-range (the sweet spot), 7 = high-end, 9 = enthusiast.',
          'Apple has been making its own chips since 2020: the M1, M2, M3, and M4. They\'re known for their exceptional energy efficiency — your MacBook lasts all day on a single charge. The catch is they only work in Macs.',
        ],
      },
      {
        title: 'So, which one should you pick?',
        paragraphs: [
          'For web browsing, emails, and office work: any recent processor will do. An Intel Core i3 or AMD Ryzen 3 gets the job done just fine. It\'s like an economy car for city driving — no need for a V8.',
          'For office work, school, and light multitasking: a Core i5 or Ryzen 5. This is the ideal choice for 80% of people. It\'s the well-rested brain that handles everything without breaking a sweat.',
          'For video editing, graphic design, or gaming: a Core i7/Ryzen 7 or higher. It\'s the surgeon\'s brain — precise, fast, able to handle the pressure. Or if you prefer: the turbo V6 engine that doesn\'t struggle on hills.',
          'The classic trap: buying an i7 or i9 "just to be safe" when you don\'t need it. It\'s like buying an F-150 pickup to go grocery shopping. It works, but you\'re paying top dollar for nothing.',
        ],
      },
      {
        title: 'The thing nobody tells you: generation matters more than tier',
        paragraphs: [
          'An Intel Core i5 from 2024 (14th gen) is faster than a Core i7 from 2020 (10th gen). Why? Because every year, processors get more efficient. It\'s like comparing a 25-year-old athlete to a 45-year-old — experience doesn\'t always make up for youth.',
          'When you\'re shopping, look at the generation (the first one or two digits of the model number). An i5-1340P is 13th gen. An i5-1440P is 14th. The higher the number, the more recent it is. Simple.',
          'For Apple chips, it\'s even simpler: M4 > M3 > M2 > M1. Get the most recent one your budget allows.',
        ],
      },
    ],
    ctaText: 'Now you know what to look for in a processor. Want to find out which computer is right for you?',
  },
  {
    slug: 'ram-memoire-vive-poumons-transmission',
    title: 'RAM: Your Computer\'s Lungs (or Transmission)',
    description: '8, 16, 32 GB… What is RAM and how much do you actually need? We break it down, jargon-free.',
    date: '2026-03-26',
    readTime: '5 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🫁',
    tags: ['ram'],
    tldr: 'RAM is your computer\'s active workspace — not permanent storage. 8 GB is enough for basic tasks, 16 GB is the recommended standard in 2026, and 32 GB is for pros. More RAM ≠ automatically faster.',
    sections: [
      {
        title: 'What exactly is RAM?',
        paragraphs: [
          'RAM (Random Access Memory) is often confused with storage (hard drive/SSD). But they\'re completely different. Storage is your closet — that\'s where your files are kept when the computer is off. RAM is your desk — it\'s the space where you lay out the things you\'re currently working on.',
          'In body terms: RAM is your lungs. The bigger they are, the more simultaneous effort you can sustain without getting winded. With 20 Chrome tabs open, an Excel file, and Zoom running in the background, you need serious lung capacity.',
          'In car terms: RAM is the transmission. It manages the flow between the engine (processor) and the wheels (your programs). A smooth 6-speed transmission lets you switch between tasks without any hiccups. An old 3-speed? It\'ll jerk at every gear change.',
        ],
      },
      {
        title: 'The big myth: "more RAM = faster"',
        paragraphs: [
          'This is the most common belief, and it\'s half wrong. Going from 4 GB to 8 GB, or from 8 GB to 16 GB, makes a real difference if you were running low on space. But going from 16 GB to 32 GB when all you do is browse the web and check emails? No noticeable difference.',
          'It\'s like lungs: a marathon runner needs massive lungs. But for walking to the corner store, your normal lungs are plenty. Putting marathon-runner lungs in a walker won\'t make them walk faster.',
          'Same deal with cars: installing a sequential dual-clutch transmission in a car that never goes above 50 km/h around town is throwing money away.',
        ],
      },
      {
        title: 'So, how much RAM do you need?',
        paragraphs: [
          '4 GB: the bare minimum. We don\'t recommend it anymore — it\'s too tight even for modern web browsing. Chrome alone can eat up 3-4 GB with a few tabs open. It\'s running a marathon with a smoker\'s lungs.',
          '8 GB: enough for light use (browsing, emails, Netflix, one document at a time). It\'s the minimum acceptable in 2026, but things get tight if you open a lot of stuff.',
          '16 GB: the sweet spot. This is what we recommend for everyone. It gives you room for multitasking, hungry browsers, and updates that consume more and more. It\'s the comfortable marathon.',
          '32 GB and up: only if you do 4K video editing, 3D modelling, heavy development, or demanding gaming. This is Olympic athlete territory.',
        ],
      },
      {
        title: 'An important detail: RAM is rarely upgradeable',
        paragraphs: [
          'On most modern laptops, the RAM is soldered to the motherboard. That means you can\'t add more after purchase. If you buy a laptop with 8 GB, you\'re stuck at 8 GB forever.',
          'Desktop computers are more flexible — you can usually add or replace RAM sticks easily.',
          'The advice: if you\'re torn between 8 and 16 GB on a laptop, go with 16 GB. The price difference (often $50-100) is worth the peace of mind for the next 5 years. It\'s an investment in your digital lung capacity — or if you prefer, in a transmission that won\'t grind.',
        ],
      },
    ],
    ctaText: 'Now that you understand RAM, want to find out which computer is right for you?',
  },
  {
    slug: 'ssd-vs-hdd-stockage-ordinateur',
    title: 'SSD vs HDD: Why Your Old Computer Is Slow (and How to Save It)',
    description: 'The difference between an SSD and a traditional hard drive, and why it\'s the most cost-effective upgrade you can make.',
    date: '2026-03-26',
    readTime: '5 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '💾',
    tags: ['stockage'],
    tldr: 'If your computer takes 2 minutes to boot, it\'s probably because of the hard drive (HDD). Replacing it with an SSD is the best investment you can make — your computer will boot in 15 seconds and everything will be faster. A 512 GB SSD costs about $50-70.',
    sections: [
      {
        title: 'Slowness culprit #1: the traditional hard drive',
        paragraphs: [
          'You know that frustration: you turn on your computer, and you have to wait 2-3 minutes before you can do anything. You click on Chrome and it takes 30 seconds to open. Everything is slow, everything lags. Most people think their computer is "old" or "done for."',
          'The real cause 80% of the time? The traditional hard drive (HDD). It\'s a physical disk spinning inside your computer, like an old vinyl record. And like an old turntable, it has speed limits.',
          'In body terms: the HDD is long-term memory that works like an old public library. To find a book, you have to go to the right shelf, the right section, search alphabetically… The SSD is photographic memory — you think of the file and it\'s there, instantly.',
          'In car terms: the HDD is a trunk with a single small hatch. To get your groceries out, you have to pass everything one by one through that narrow opening. The SSD is a full-width tailgate with organized compartments — you access everything in a blink.',
        ],
      },
      {
        title: 'The numbers speak for themselves',
        paragraphs: [
          'A traditional hard drive (HDD) reads data at about 100 MB per second. A standard SSD reads at 500-550 MB per second. An NVMe SSD (the premium version) reads at 3,500-7,000 MB per second.',
          'In practical terms: Windows boot time goes from 2 minutes (HDD) to 15 seconds (SSD). Opening a program goes from 30 seconds to 2-3 seconds. Transferring a big folder of photos goes from 10 minutes to 30 seconds.',
          'This is the most dramatic difference you can feel on a computer. More than the processor, more than the RAM — switching to an SSD is the change that transforms your daily experience.',
        ],
      },
      {
        title: 'The best tech investment: $60 that changes everything',
        paragraphs: [
          'Here\'s the secret that salespeople don\'t tell you enough: if your computer is 3-5 years old and it\'s slow, you probably DON\'T need a new computer. You need an SSD.',
          'A 500 GB SSD costs between $50 and $70 Canadian. Installation takes about 30 minutes (or $50-80 at a repair shop if you\'d rather not do it yourself). And the result? Your old computer behaves like a new one.',
          'It\'s like changing the worn-out tires on a car with a perfectly good engine. The engine (processor) and transmission (RAM) are still fine — it\'s just the tires (storage) that were slowing everything down.',
          'Heads up: this trick works on desktops and some older laptops. Recent laptops already come with an SSD. Check before you buy!',
        ],
      },
      {
        title: 'What SSD size should you pick?',
        paragraphs: [
          '256 GB: the bare minimum. It\'s enough for Windows, your programs, and a few documents. But if you have lots of photos, videos, or games, it\'ll fill up fast. It\'s a compact car\'s trunk — perfect if you travel light.',
          '512 GB: the recommended choice. It\'s the ideal size for most people. You have room for your programs, photos, a few movies, and some breathing room left over. It\'s a sedan\'s trunk — comfortable for everyday life.',
          '1 TB (1,000 GB): for those who store a lot. Family photos, music library, movies, video games. It\'s the family SUV\'s cargo area.',
          'Pro tip: you can also use cloud storage (Google Drive, OneDrive, iCloud) to offload your old files and keep your SSD light. It\'s like having a storage unit on top of your trunk.',
        ],
      },
      {
        title: 'SSD or NVMe SSD?',
        paragraphs: [
          'There are two types of SSD. The SATA SSD (standard) connects with a regular cable and runs at ~550 MB/s. The NVMe SSD plugs directly into the motherboard and runs at 3,500+ MB/s.',
          'For normal use, the difference is imperceptible day-to-day. You won\'t feel the difference between 550 MB/s and 3,500 MB/s when opening Chrome. Where NVMe shines is for transferring very large files (4K video, databases).',
          'If you\'re replacing the hard drive in an older PC: go with a SATA SSD — it\'s compatible with everything and costs less. If you\'re buying a new computer: it\'ll probably come with an NVMe by default, and that\'s great.',
        ],
      },
    ],
    ctaText: 'Now you understand why an SSD changes everything. Ready to find the computer that\'s right for you?',
  },
  {
    slug: 'mac-vs-pc-lequel-choisir',
    title: 'Mac vs PC: Which One Is Right for You?',
    description: 'The great debate explained without fanaticism. We honestly compare the strengths and weaknesses of each side to help you choose.',
    date: '2026-03-26',
    readTime: '7 min',
    category: 'Comparatifs',
    categoryColor: '#7c3aed',
    icon: '⚖️',
    tags: ['chromebook'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #1a1a2e 0%, #7c3aed 50%, #0f172a 100%)',
    tldr: 'There\'s no "best" — there\'s the one that fits YOUR life. Mac if you want simplicity, battery life, and a seamless Apple ecosystem. PC if you want choice, varied pricing, and compatibility with everything. Both do the same job for 90% of people.',
    sections: [
      {
        title: 'Forget the holy wars',
        paragraphs: [
          'Online, the Mac vs PC debate often looks like a religious war. Apple fans swear everything else is junk. PC fans think Apple is overpriced for what it is. The truth? Both sides are right… and wrong.',
          'A Mac and a PC do exactly the same things for most users: browse the web, send emails, watch Netflix, work on documents, make video calls. The difference is in the how, not the what.',
          'It\'s like comparing Toyota and Honda. Both get you from point A to point B reliably. The question is: which one better fits your driving style, your budget, and your specific needs?',
        ],
      },
      {
        title: 'Mac strengths',
        paragraphs: [
          'Ease of use. macOS is designed to be intuitive. There are fewer settings to configure, fewer complex choices to make, fewer cryptic error messages. If you don\'t want to deal with technology headaches, the Mac reduces friction.',
          'Battery life. Since Apple Silicon chips (M1 through M4), MacBooks have spectacular battery life — 12 to 18 real-world hours for most models. That\'s the full marathon without recharging. PC laptops are getting close, but few match it.',
          'The Apple ecosystem. If you already have an iPhone, AirPods, or an iPad, everything talks to each other automatically. You copy text on your iPhone and paste it on your Mac. You get your iMessages on the computer. It\'s a real daily comfort.',
          'Durability and resale. Macs hold their value much longer. A 4-year-old MacBook still resells for a good price, while a PC laptop of the same age is worth almost nothing. It\'s like a car that barely depreciates.',
        ],
      },
      {
        title: 'PC strengths',
        paragraphs: [
          'Choice. There are thousands of PC models at every price point: $400, $800, $1,500, $3,000. From ultra-light laptops to monstrous gaming towers. It\'s the biggest market — you can find exactly what suits you.',
          'Entry price. A good everyday PC laptop costs $500-700. The cheapest MacBook starts at $1,299. If your budget is tight, the PC is mathematically more accessible. It\'s the difference between buying new and buying premium.',
          'Software compatibility. Windows runs virtually every piece of software on the market. Some professional tools (accounting, engineering, certain games) only exist on Windows. If your employer or school uses specific software, check Mac compatibility before buying.',
          'Repairability. On many laptops and all desktop PCs, you can replace the RAM, SSD, and battery. On a Mac, almost everything is soldered — if something breaks after the warranty, the bill is steep. The PC is the car your local mechanic can fix.',
        ],
      },
      {
        title: 'The real deciding factor: your ecosystem and budget',
        paragraphs: [
          'If you\'re already in the Apple universe (iPhone, iPad, AirPods) and your budget allows it: the Mac is probably the best choice for you. The integration between devices is a daily comfort that\'s hard to replicate.',
          'If you use an Android phone, if your budget is limited, or if you need Windows-specific software: a PC is the logical choice. You\'ll have more options and pay less for equivalent performance.',
          'If you\'re a student: check out education discounts. Apple offers 10-15% off for students, and many PC manufacturers do the same. A MacBook Air M3 at a student price is still an excellent investment over 5 years.',
          'In any case, don\'t be swayed by brand prestige. An $800 PC that perfectly meets your needs is a better purchase than a $2,500 MacBook Pro where you only use 20% of its capabilities.',
        ],
      },
    ],
    ctaText: 'Now you know what suits you best. Want us to help you find the perfect model?',
  },
  {
    slug: 'comprendre-processeurs-intel-amd-generations',
    title: 'Intel Core Ultra, AMD Ryzen: Understanding Processor Generations in 2026',
    description: 'Intel changed everything with Core Ultra. AMD is pushing back with Ryzen AI. We explain how to decode the names and choose without getting lost.',
    date: '2026-03-26',
    readTime: '8 min',
    category: 'Tendances',
    categoryColor: '#d97706',
    icon: '⚡',
    tags: ['processeur'],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #d97706 0%, #1e293b 50%, #0891b2 100%)',
    tldr: 'Intel ditched the old names (Core i5, i7) for Core Ultra 5, Ultra 7, and Ultra 9 with a built-in NPU for AI. AMD renamed its Ryzen line with suffixes like HX, HS, U. The thing to remember: look at the generation (newer = better) and the tier (5 = perfect mid-range). The rest is marketing.',
    sections: [
      {
        title: 'Why did it get so complicated?',
        paragraphs: [
          'For years, it was simple: Intel Core i3, i5, i7, i9. The bigger the number, the more powerful. But in 2024, Intel decided to shake everything up with a new lineup called Core Ultra. And AMD isn\'t far behind with its own naming changes.',
          'The result? When you\'re shopping for a computer in 2026, you run into names like "Intel Core Ultra 7 268V" or "AMD Ryzen AI 9 HX 370." Looks scary. But don\'t panic — behind the jargon, the logic is simple.',
          'Think of processor generations like car model years. A 2026 Civic is better than a 2020 Civic, even though they share the same name. For processors, it\'s the same: the generation (the year) matters more than the tier (the level).',
        ],
      },
      {
        title: 'Intel Core Ultra: the new era',
        paragraphs: [
          'Intel replaced its Core i3/i5/i7/i9 with Core Ultra 5, Ultra 7, and Ultra 9. The change isn\'t just cosmetic — the Core Ultra have a completely redesigned architecture with three types of cores: performance cores (P-cores), efficiency cores (E-cores), and low-power cores (LP E-cores).',
          'The big novelty: the NPU (Neural Processing Unit). It\'s a chip dedicated to artificial intelligence built right into the processor. It speeds up AI tasks like noise cancellation in video calls, automatic photo editing, or Windows Copilot features.',
          'To decode the name: Core Ultra 7 268V — Ultra 7 = high-end tier, 2 = 2nd generation of Core Ultra (Lunar Lake), 68 = model variant, V = very low power (for ultrabooks). The 200 series is the current generation in 2026.',
          'What to remember: Core Ultra 5 = excellent for 80% of people. Core Ultra 7 = heavy multitasking and creatives. Core Ultra 9 = enthusiasts and pros. The "old" Core i5/i7 still exist in desktops and some budget laptops — they\'re still good processors.',
        ],
      },
      {
        title: 'AMD Ryzen: the smart counterpunch',
        paragraphs: [
          'AMD has also modernized its lineup. The Ryzen 7000 and 8000 for laptops now use specific suffixes: U = ultra low power (ultrabooks), HS = balanced performance, HX = maximum performance (gaming/creation), C = Chromebooks.',
          'AMD also launched "Ryzen AI" — its own lineup with a built-in NPU. The Ryzen AI 9 HX 370 or Ryzen AI 7 350 are direct equivalents to Intel\'s Core Ultra, with similar AI capabilities.',
          'AMD\'s historic advantage: excellent value for money. A Ryzen 7 often costs the same as a Core i5/Ultra 5 for similar or better performance. It\'s the Honda Civic that comes with more standard features than the Toyota Corolla at the same price.',
          'For desktops, AMD dominates with the Ryzen 9000 (Zen 5 architecture). For laptops, it\'s a tight race — both brands are excellent and the choice often comes down to the computer model itself rather than the processor brand.',
        ],
      },
      {
        title: 'The practical guide: how to choose in 2026',
        paragraphs: [
          'Rule #1: generation first. A 2026 Core Ultra 5 beats a 2022 Core i7. A Ryzen 5 8600 beats a Ryzen 7 5800 in most tasks. Always prioritize the most recent within your budget.',
          'Rule #2: tier second. Ultra 5 / Ryzen 5 = the sweet spot for most people. Ultra 7 / Ryzen 7 = if you do heavy multitasking, content creation, or gaming. Ultra 9 / Ryzen 9 = only if you know exactly why you need it.',
          'Rule #3: ignore the NPU (for now). AI features on PCs are still in their early stages in 2026. The NPU is a nice bonus, not a deciding factor. Don\'t pay extra just for "built-in AI" — it\'ll come naturally with recent processors.',
          'Rule #4: compare benchmarks, not names. Sites like Notebookcheck, PassMark, or UserBenchmark give you real performance scores. A processor with an impressive name can be outperformed by a more modestly named model. It\'s the engine\'s actual horsepower that counts, not the badge on the hood.',
        ],
      },
    ],
    ctaText: 'Processors hold no more secrets for you. Let\'s find the perfect computer together?',
  },
  {
    slug: 'ports-usb-c-thunderbolt-guide-complet',
    title: 'USB-C, Thunderbolt, HDMI: The Complete Guide to Your Computer\'s Ports',
    description: 'All ports look the same but don\'t do the same thing. We explain which ones are essential and why USB-C changes everything.',
    date: '2026-03-26',
    readTime: '7 min',
    category: 'Connectique',
    categoryColor: '#0891b2',
    icon: '🔌',
    tags: [],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #0891b2 0%, #1e293b 50%, #2563eb 100%)',
    tldr: 'USB-C is THE universal port of 2026 — it does everything: data, video, AND laptop charging with a single cable. Thunderbolt 4/5 is the premium version of USB-C (same shape, faster). Always check if your USB-C can charge your laptop (Power Delivery) and how many watts it supports.',
    sections: [
      {
        title: 'Why ports matter',
        paragraphs: [
          'Ports are the plugs on the sides of your computer. That\'s where you connect everything: USB drives, external monitors, charger, mouse, headset, printer. The more ports you have (and the right types), the more versatile your computer is.',
          'The problem: manufacturers are reducing the number of ports to make laptops thinner. A MacBook Air only has 2 USB-C ports. Some ultra-thin laptops don\'t even have an HDMI jack anymore. It\'s frustrating when you want to plug in a monitor, a keyboard, and a mouse at the same time.',
          'In car terms: ports are like the 12V outlets, USB ports, and ISOFIX mounts in a car. If your car only has one USB port up front, good luck charging 3 phones on a road trip. The right ports in the right places change your daily life.',
        ],
      },
      {
        title: 'The king: USB-C (and why it changes everything)',
        paragraphs: [
          'USB-C is the most important port to understand in 2026. It\'s the small oval reversible port (you can plug it in either way, no more "wrong side" syndrome). It\'s gradually replacing ALL other ports.',
          'What makes USB-C revolutionary is that a single port can do everything: transfer data (files, USB drives), send a video signal (connect a monitor), AND charge your laptop. One cable, three functions. It\'s as if your wall outlet at home could also carry water and Internet.',
          'The catch: not all USB-C ports are created equal. A "basic" USB-C only transfers data at 480 Mb/s. A USB-C 3.2 goes up to 20 Gb/s. A Thunderbolt 4 (same USB-C shape) hits 40 Gb/s. And not all support charging or video. The shape is identical, but the capabilities vary enormously.',
          'The analogy: it\'s like highways. A country road and a 6-lane highway look similar (it\'s asphalt with lines), but the traffic capacity is very different. The logo next to the port (a little lightning bolt for Thunderbolt) tells you the "size of the highway."',
        ],
      },
      {
        title: 'USB-C charging: the game changer',
        paragraphs: [
          'USB Power Delivery (USB PD) technology lets you charge your laptop via USB-C. This is a major shift: no more proprietary chargers that are different for every brand. A single universal USB-C charger can power your laptop, phone, tablet, and even some monitors.',
          'Watts matter. A phone charges at 20-30W. A light ultrabook needs 45-65W. A performance laptop requires 100-140W. A gaming laptop can demand 180-240W. Your charger needs to supply enough watts, otherwise your laptop charges too slowly or not at all.',
          'The big advantage: when you travel, you only need a single compact GaN charger (a small cube the size of a deck of cards) to power all your devices. Some 100W models even have 2-3 ports to charge everything at once.',
          'The European Union made USB-C mandatory on all portable devices since 2024. Canada is following the trend. Result: within a few years, you\'ll only have one type of cable in your house. A dream come true.',
        ],
      },
      {
        title: 'Other ports you should know',
        paragraphs: [
          'HDMI: the classic video port for connecting a monitor or TV. Still useful if you do presentations or want a second screen. HDMI 2.1 supports 4K at 120 Hz — more than enough for everyone.',
          'USB-A: the big rectangular "classic" USB port we\'ve known for 20 years. Still handy for USB drives, wired mice, and old peripherals. It\'s gradually disappearing from new laptops, but a USB-C to USB-A adapter costs $10 and solves the problem.',
          '3.5 mm headphone jack: the good old audio jack. Still present on most laptops (even Apple kept it). Essential if you use wired headphones or a mic for calls.',
          'SD card reader: handy for photographers and videographers. Missing from the thinnest laptops, but available through a small USB-C adapter.',
          'Thunderbolt 4/5: looks like a USB-C (it\'s the same plug), but much faster and more versatile. It\'s the premium port that lets you connect a dock and pass data + video + charging through a single cable. Identifiable by the little lightning bolt logo next to the port.',
        ],
      },
      {
        title: 'How many ports do you need?',
        paragraphs: [
          'On-the-go use (coffee shop, school, meetings): 2 USB-C is enough. You plug in your charger on one side and you\'re good to go. For the rest, Wi-Fi and Bluetooth do the job.',
          'Home office / remote work: 1 USB-C (or Thunderbolt) + 1 HDMI + 2 USB-A is ideal. That lets you have an external monitor, a keyboard, a mouse, and a USB drive without any adapters. Or even better: a single Thunderbolt port + a dock (we talk about that in another article).',
          'Creative / pro use: make sure your laptop has at least 1 Thunderbolt 4, 1 HDMI, an SD reader, and a headphone port. Creatives transfer lots of large files — Thunderbolt makes a real difference.',
          'The advice: if the laptop of your dreams is missing a port, don\'t disqualify it. A small USB-C hub for $30-50 adds 4-6 ports and fits in your bag. It\'s less elegant, but it solves the problem.',
        ],
      },
    ],
    ctaText: 'Now you know what to look for in terms of ports. Let\'s find the perfect computer for you?',
  },
  {
    slug: 'dock-usb-c-thunderbolt-tout-en-un-cable',
    title: 'Docks: Connect Everything with a Single Cable (The Jargon-Free Guide)',
    description: 'A dock turns your laptop into a real workstation. We explain how it works, what matters, and the pitfalls to avoid.',
    date: '2026-03-26',
    readTime: '7 min',
    category: 'Connectique',
    categoryColor: '#0891b2',
    icon: '🖥️',
    tags: [],
    featured: false,
    coverGradient: 'linear-gradient(135deg, #334155 0%, #0891b2 50%, #1e293b 100%)',
    tldr: 'A USB-C or Thunderbolt dock lets you connect monitors, keyboard, mouse, headset, and charging through ONE single cable. You arrive, you plug in, you work. The 3 things to check: 1) charging power in watts (65W minimum), 2) number of supported monitors, 3) compatibility with your laptop (Thunderbolt vs USB-C).',
    sections: [
      {
        title: 'What is a dock and why you want one',
        paragraphs: [
          'A dock (or docking station) is a box that multiplies your laptop\'s ports. You connect it with a single USB-C or Thunderbolt cable, and suddenly your laptop has access to: 2 monitors, a keyboard, a mouse, a mic, speakers, an external drive, a wired network connection, AND it charges at the same time.',
          'The ultimate advantage: you arrive at your desk, plug in ONE cable, and everything is connected. Heading out? You unplug the same cable and leave with your laptop. It\'s going from "I have to reconnect 6 wires every time" to "one move and it\'s done."',
          'In car terms: the dock is like a quick-connect trailer hitch. Instead of hooking up the brakes, turn signals, lights, and power separately, you clip one connector and everything is linked. The dock does the same for your laptop.',
        ],
      },
      {
        title: 'Charging power: the #1 criterion',
        paragraphs: [
          'The first thing to check: how many watts the dock delivers to your laptop through the cable. If your laptop needs 65W to charge and the dock only provides 45W, your computer will charge slowly, or even drain during heavy use.',
          'Recommendations: 60-65W for a light ultrabook (MacBook Air, Dell XPS 13). 90-100W for a performance laptop (MacBook Pro 14", ThinkPad). 140W+ for gaming or heavy creative laptops.',
          'Watch out for the classic trap: some docks advertise "100W" but that\'s the total power of the adapter. The dock itself uses 10-15W to operate, so your laptop only receives 85W. Read the "Power Delivery to host laptop" spec for the real number.',
          'Tip: most good docks come with their own power brick. Your laptop charger becomes a spare charger for travel. That\'s a nice bonus.',
        ],
      },
      {
        title: 'How many monitors? The tricky question',
        paragraphs: [
          'This is often THE reason for buying a dock: connecting one or two external monitors for more workspace. But it\'s also where things get complicated.',
          'Thunderbolt 4 natively supports 2 monitors at 4K 60 Hz. A Thunderbolt dock can easily power a dual-monitor setup. It\'s the most reliable and simplest solution.',
          'Standard USB-C is more limited: only one video stream in DisplayPort Alt mode. For a second monitor, the dock uses a technology called DisplayLink (software compression) that works but adds a slight lag and uses CPU power. For office work it\'s fine, but for precise graphic work or gaming, it\'s not enough.',
          'The MacBook trap: MacBooks with standard M1 and M2 chips only support one external monitor natively, even with Thunderbolt. The M3, M4, and Pro/Max versions handle 2 or more monitors. Check YOUR model\'s specs before buying a dual-screen dock.',
          'In short: if you want 2+ monitors reliably, make sure you have a Thunderbolt 4 port and a Thunderbolt dock. That\'s the guaranteed combo.',
        ],
      },
      {
        title: 'Thunderbolt vs USB-C: which one to get?',
        paragraphs: [
          'A Thunderbolt dock costs more ($150-350) but offers: higher speeds (40 Gb/s), native dual 4K monitor support, and compatibility with professional accessories. It\'s the premium choice.',
          'A USB-C dock is more affordable ($50-150) and does the job perfectly well for one monitor + keyboard + mouse + charging. If you don\'t need dual monitors, it\'s plenty and you save money.',
          'Compatibility matters: a Thunderbolt dock works on a standard USB-C port, but in degraded mode (USB-C speeds, not Thunderbolt). A USB-C dock works on a Thunderbolt port with no issues. When in doubt, check for the lightning bolt logo next to your laptop\'s port.',
          'Our recommendation: if your laptop has Thunderbolt 4 and you want a desk setup with dual monitors, invest in a Thunderbolt dock. For everything else, a good USB-C dock at $80-120 does the job perfectly.',
        ],
      },
      {
        title: 'The 5 things to check before buying',
        paragraphs: [
          '1. Charging power (Power Delivery): how many watts? At least 60W, ideally 85-100W. Make sure it\'s enough for YOUR laptop.',
          '2. Number of supported monitors: 1 or 2? Native (Thunderbolt/DP Alt Mode) or via DisplayLink? What resolution and refresh rate?',
          '3. Available ports: at minimum you want 2-3 USB-A (for older peripherals), 1 Ethernet port (wired network, more stable than Wi-Fi), and 1 headphone jack. An SD reader is a nice bonus.',
          '4. Compatibility with your laptop: make sure your USB-C port supports DisplayPort Alt Mode (for video) and Power Delivery (for charging). Recent laptops (2022+) generally support both.',
          '5. Cable length: some docks have a 20 cm cable — too short if your desk isn\'t perfectly organized. Look for a cable at least 50 cm long, or a model with a detachable cable so you can swap in a longer one if needed.',
        ],
      },
    ],
    ctaText: 'A dock is the secret to a clean and efficient work setup. Want help choosing the laptop to go with it?',
  },
  {
    slug: 'ecran-portable-resolution-hz-dalle-guide',
    title: 'Your Laptop Screen: Resolution, Hz, and Panels Explained',
    description: 'IPS, OLED, 1080p, 4K, 60 Hz, 120 Hz, nits… We translate all of that into plain English so you can choose the right screen.',
    date: '2026-03-27',
    readTime: '7 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🖥️',
    tags: ['ecran'],
    tldr: 'For most people, an IPS Full HD (1920x1080) screen at 60 Hz is perfect. If you want premium, aim for OLED or IPS 2K (2560x1440). Brightness (300+ nits) matters more than you think — especially if you work near a window. 4K on a 14-inch laptop is overkill.',
    sections: [
      {
        title: 'Resolution: how many pixels on your screen',
        paragraphs: [
          'Resolution is the number of tiny dots (pixels) that make up the image. The more there are, the sharper and more detailed the image. Common laptop resolutions: HD (1366x768) — the bare minimum, you can see the pixels. Full HD / 1080p (1920x1080) — the standard, sharp and pleasant. 2K / QHD (2560x1440) — excellent, ultra-crisp text. 4K / UHD (3840x2160) — the maximum, gorgeous but battery-hungry.',
          'In car terms: resolution is the quality of the windshield. A dirty, scratched windshield (HD) — you see the road but it\'s blurry. A clean windshield (Full HD) — everything is clear. A high-quality tinted windshield (2K) — that\'s luxury. A crystal windshield (4K)… it\'s beautiful, but does it actually change how you drive?',
          'The practical advice: on a 13-14 inch screen, Full HD is more than enough — your eyes won\'t see the difference from 4K at normal viewing distance. 2K is the sweet spot on 15-16 inch screens. 4K only makes sense on a 27-inch screen or larger (so an external monitor, not a laptop).',
        ],
      },
      {
        title: 'Refresh rate: the Hz',
        paragraphs: [
          'Hz (Hertz) measures how many times per second the screen redraws the image. 60 Hz = 60 images per second. 120 Hz = 120 images per second. The higher it is, the smoother the motion — scrolling through a web page, your mouse cursor, videos.',
          'For office work, emails, and the web: 60 Hz is perfect. You won\'t notice any difference from 120 Hz when reading a Word document. It\'s like the difference between driving at 100 km/h and 102 km/h — technically measurable, practically imperceptible.',
          'For gaming and video creation: 120 Hz and above makes a real difference. Fast movements are much smoother, games feel more responsive. If you game regularly, look for 120 Hz minimum.',
          'The battery trade-off: a 120 Hz screen uses more power than a 60 Hz one. Many modern laptops offer an adaptive mode that automatically switches between 60 and 120 Hz depending on what you\'re doing. That\'s the best option if available.',
        ],
      },
      {
        title: 'Panel types: IPS, OLED, TN, and VA',
        paragraphs: [
          'The panel is the technology used to build the screen. Each type has its strengths. IPS (In-Plane Switching): colours stay accurate even when you look at the screen from an angle. It\'s the standard on 80% of modern laptops, and it\'s an excellent choice for everything.',
          'OLED: each pixel produces its own light, giving you perfectly black blacks and vivid colours. It\'s the same type of screen as on high-end Samsung Galaxy phones. Gorgeous for movies and creative work, but pricier and slightly more fragile over time (risk of burn-in).',
          'TN (Twisted Nematic): colours wash out as soon as you move your head. It\'s the cheapest screen type, still found on entry-level $400 laptops. Avoid if possible — it\'s the scratched windshield.',
          'VA (Vertical Alignment): good contrast, but rare on laptops. You\'ll mostly find it on desktop monitors. A decent compromise between IPS and OLED for fixed screens.',
        ],
      },
      {
        title: 'Brightness: the underrated criterion',
        paragraphs: [
          'Brightness is measured in nits (or cd/m2). A 250-nit screen is dim — hard to read near a window on a sunny day. A 300-400 nit screen is comfortable in most situations. A 500+ nit screen is excellent, even on a patio.',
          'If you often work on the go, in well-lit coffee shops, or near windows: aim for 300 nits minimum. Below that, you\'ll squint and crank up the brightness to max, which devours your battery.',
          'OLED screens are often measured with an impressive peak (HDR) brightness (800-1000 nits) but their sustained (continuous) brightness is often lower than a good IPS. Look at the "typical" or "sustained" brightness in the specs, not the HDR peak.',
        ],
      },
      {
        title: 'The practical summary',
        paragraphs: [
          'Daily use (web, emails, office work): IPS, Full HD (1080p), 60 Hz, 300 nits. It\'s the reliable and affordable combo. You won\'t be missing anything.',
          'Student or remote work: IPS, Full HD or 2K, 60-120 Hz, 300+ nits. 2K is a real comfort for working on documents and spreadsheets — more text visible on screen without squinting.',
          'Creative and multimedia: OLED or quality IPS, 2K minimum, 120 Hz, 400+ nits. Accurate colours matter for photo editing and video production.',
          'Gaming: fast IPS or OLED, Full HD or 2K, 120-165 Hz, 300+ nits. Refresh rate is the #1 criterion for gamers — switch to 120 Hz and you\'ll never want to go back.',
        ],
      },
    ],
    ctaText: 'Now you know how to decode screen specs. Ready to find the laptop with the perfect screen?',
  },
  {
    slug: 'wifi-6e-wifi-7-pourquoi-internet-lent',
    title: 'Wi-Fi 6E and Wi-Fi 7: Why Your Internet Is Slow (and It\'s Not Your Provider)',
    description: 'Your plan is fast but your connection crawls? The problem is probably between your router and your computer. We explain.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '📶',
    tags: [],
    tldr: 'Your Internet depends on TWO links: your provider\'s plan AND your local network (router + devices). If your router is from 2018 or your laptop only has Wi-Fi 5, you\'ll never get the speed you\'re paying for. Wi-Fi 6 is the minimum in 2026, Wi-Fi 6E is ideal, Wi-Fi 7 is the future.',
    sections: [
      {
        title: 'The weak link in your connection',
        paragraphs: [
          'You\'re paying for 500 Mbps Internet from Bell or Rogers, but when you run a speed test on your laptop, you get 80 Mbps. You call your provider, they test the line, everything\'s fine on their end. So what\'s the problem?',
          'The problem is almost always between your router and your devices — the local Wi-Fi network. It\'s like having a 6-lane highway (your plan) that turns into a one-lane gravel road (your old router) before reaching your house.',
          'Two things need to be up to date for your connection to be fast: the router (the box that broadcasts the signal) AND the Wi-Fi card in your computer. If either one is old, it\'s the weak link that dictates your actual speed.',
        ],
      },
      {
        title: 'Wi-Fi generations explained',
        paragraphs: [
          'Wi-Fi 5 (802.11ac) — released in 2014. Max theoretical speed: ~1.3 Gbps. Uses the 2.4 GHz and 5 GHz bands. This is what you still find in a lot of routers provided by cable companies. Decent, but getting dated.',
          'Wi-Fi 6 (802.11ax) — released in 2020. Max speed: ~9.6 Gbps. The big improvement: it handles environments with lots of connected devices much better (phones, tablets, smart TVs, thermostats, smart bulbs). It\'s the minimum recommended in 2026.',
          'Wi-Fi 6E — same technology as Wi-Fi 6, but with access to the 6 GHz band. This band is less congested (fewer neighbours on it) and offers more stable speeds. It\'s the current sweet spot — fast, reliable, and the gear is affordable.',
          'Wi-Fi 7 (802.11be) — the latest generation. Max theoretical speed: ~46 Gbps. Can use all 3 bands simultaneously (2.4 + 5 + 6 GHz). Excellent but compatible routers and devices are still pricey. It\'s the 2027 car — impressive, but not necessary just yet.',
        ],
      },
      {
        title: 'The bands: 2.4 GHz, 5 GHz, and 6 GHz',
        paragraphs: [
          'Wi-Fi uses radio frequencies (like FM radio, but for Internet). Each band has its strengths. 2.4 GHz: goes through walls well, long range, but slower and crowded (your neighbours, the microwave, and Bluetooth devices are all on it). Ideal for devices far from the router.',
          '5 GHz: faster, less crowded, but worse at going through walls and floors. Ideal when you\'re in the same room or one wall away from the router.',
          '6 GHz (Wi-Fi 6E and 7): the fastest, least crowded (very few devices use it yet), but shorter range. Ideal for recent devices close to the router — 4K streaming, video calls, gaming.',
          'In car terms: 2.4 GHz is the country road — you go far but not fast. 5 GHz is the highway — fast but doesn\'t go everywhere. 6 GHz is the F1 circuit — ultra-fast, but reserved for those with the right equipment.',
        ],
      },
      {
        title: 'What to do to improve your connection',
        paragraphs: [
          'Step 1: check your router. Flip it over and look at the model. If it says Wi-Fi 5, AC, or if it\'s from before 2020, that\'s your bottleneck. Contact your provider to replace it (often free) or buy a Wi-Fi 6E router for $100-200.',
          'Step 2: check your laptop. In Windows, type "Device Manager" then go to "Network adapters" and look at the name of your Wi-Fi card. If it says "Wi-Fi 5" or "802.11ac," that\'s your second bottleneck. Laptops from 2022+ generally have Wi-Fi 6.',
          'Step 3: router placement. Put it up high, in the centre of your home, away from the microwave and the cordless phone. A router stuffed in a closet in the basement will never cover the second floor properly.',
          'Step 4: if your home is large or has thick walls (concrete, brick), invest in a mesh system (like TP-Link Deco or Google Nest WiFi). These are 2-3 units that create a uniform network throughout your whole house. It\'s a relay system — each unit boosts the signal for the next.',
        ],
      },
    ],
    ctaText: 'Wi-Fi holds no more secrets for you. Want help choosing the computer that\'ll make the most of your connection?',
  },
  {
    slug: 'windows-11-reglages-premier-jour',
    title: 'Windows 11: 10 Settings to Change on Day One',
    description: 'Your new PC is full of ads, useless notifications, and questionable default settings. Here\'s how to clean it up in 15 minutes.',
    date: '2026-03-27',
    readTime: '8 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '⚙️',
    tags: [],
    tldr: 'Windows 11 ships with ads, useless apps, and questionable privacy settings. In 15 minutes, you can disable Start menu ads, remove bloatware, optimize battery life, and configure updates so they stop interrupting you. Do it on day one — you\'ll thank me later.',
    sections: [
      {
        title: 'Why Windows 11 needs a cleanup',
        paragraphs: [
          'Microsoft has gotten into the habit of putting ads in its own operating system. App suggestions in the Start menu, notifications for OneDrive and Microsoft 365, pre-installed games nobody asked for (Candy Crush, seriously?). It\'s frustrating, especially when you just paid $800 for a computer.',
          'Manufacturers (Dell, HP, Lenovo, ASUS) add their own layer too: 30-day trial antivirus, in-house utilities, partner software. All of this slows down your PC from day one.',
          'The good news: 15 minutes of cleanup is all it takes to transform the experience. It\'s like buying a new car and peeling off the dealer stickers and that pine tree air freshener hanging from the mirror.',
        ],
      },
      {
        title: 'Settings 1 to 4: getting rid of ads and noise',
        paragraphs: [
          '1. Clean up the Start menu. Right-click on each promotional tile (games, promoted Microsoft apps) and select Unpin. Then go to Settings > Personalization > Start and turn off "Show suggestions" and "Show most used apps" if you prefer a clean menu.',
          '2. Disable useless notifications. Settings > System > Notifications. Turn off notifications for apps you don\'t use (Windows tips, suggestions, Microsoft Store). Keep the ones from your actual tools (email, Teams, calendar).',
          '3. Uninstall bloatware. Settings > Apps > Installed apps. Sort by install date and uninstall everything you didn\'t choose: trial antivirus (McAfee, Norton), pre-installed games, manufacturer tools you\'ll never use. Windows Defender is good enough as an antivirus — no need to pay for another one.',
          '4. Clean up the taskbar. Right-click on the taskbar > Taskbar settings. Turn off Widgets (the weather and news on the left), hide the Chat button (Teams), and the Search button if you prefer using the Windows key to search.',
        ],
      },
      {
        title: 'Settings 5 to 7: privacy and performance',
        paragraphs: [
          '5. Take back control of your privacy. Settings > Privacy & Security. Turn off: "Advertising ID" (Microsoft tracks what you do to target you), "Suggested content in Settings", "Send optional diagnostic data". You have nothing to lose by turning these off.',
          '6. Optimize battery life (laptops). Settings > System > Power & Battery. Set the power mode to "Best efficiency" when on battery. Turn on "Battery saver" at 30%. Disable unnecessary background apps (Settings > Apps > Installed apps > click each app > Background app permissions > Never).',
          '7. Choose your default browser. Windows pushes Edge everywhere. If you prefer Chrome or Firefox: install it, go to Settings > Apps > Default apps > search for your browser and click "Set default". You might need to set it for each link type (HTTP, HTTPS, HTML) individually — yes, Microsoft makes this deliberately complicated.',
        ],
      },
      {
        title: 'Settings 8 to 10: updates, shortcuts, and security',
        paragraphs: [
          '8. Configure updates. Settings > Windows Update > Advanced options. Turn on "Active hours" and set your work schedule (e.g., 8 AM to 11 PM) so Windows never restarts while you\'re working. Updates are essential for security — don\'t disable them, but control WHEN they install.',
          '9. Learn 5 essential shortcuts. Windows + E: open File Explorer. Windows + L: lock your PC (when you leave your desk). Windows + V: clipboard history (advanced copy/paste). Windows + Shift + S: screenshot a specific area. Ctrl + Shift + Esc: open Task Manager directly (to see what\'s slowing your PC down).',
          '10. Set up automatic backup. Turn on OneDrive or Google Drive to automatically back up your documents, photos, and desktop. If your hard drive dies or your laptop gets stolen, your important files are safe in the cloud. It\'s free up to 5 GB (OneDrive) or 15 GB (Google Drive).',
          'Bonus: check that Windows Hello is set up (facial recognition or fingerprint if your laptop supports it). It\'s faster and more secure than a regular password for unlocking your PC.',
        ],
      },
    ],
    ctaText: 'Your Windows is now optimized. Want to find out which computer is right for you?',
  },
  {
    slug: 'duree-vie-ordinateur-quand-remplacer',
    title: 'How Long Does a Computer Last? The Real Longevity Guide',
    description: 'Your computer is 4 years old and slowing down. Should you replace it or save it? Here\'s how to tell (and how to extend its life).',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '⏳',
    tags: ['budget'],
    tldr: 'A laptop lasts 4-6 years, a desktop 6-8 years. End-of-life signs: persistent slowness despite having an SSD, battery lasting less than an hour, programs crashing regularly. Before replacing, try: adding an SSD ($60), reformatting Windows, or replacing the battery ($80-120).',
    sections: [
      {
        title: 'Realistic lifespan',
        paragraphs: [
          'A well-maintained laptop lasts 4 to 6 years for regular use. MacBooks and high-end ThinkPads can push to 7-8 years. Budget laptops ($300-500) start showing signs of fatigue after 3-4 years.',
          'A desktop lasts longer — 6 to 8 years easily — because it runs cooler, has more space to cool its components, and you can replace individual parts (RAM, SSD, graphics card).',
          'Car analogy: a laptop is like a compact car. After 150,000 km, it still runs, but small issues start piling up. A desktop is like a truck — built to last, and you can replace parts more easily.',
        ],
      },
      {
        title: 'The real end-of-life signs',
        paragraphs: [
          'Persistent slowness. If your computer is slow AND it already has an SSD and enough RAM (16 GB), the processor probably can\'t keep up with modern software anymore. If you don\'t have an SSD, start there — that\'s often the real cause of slowness (check out our SSD article).',
          'Dead battery. If your laptop only lasts an hour on battery, you\'re essentially stuck plugged in. Battery replacement costs $80-120 (sometimes doable yourself with a YouTube guide, otherwise at a repair shop). If the battery is soldered and the replacement costs $300, it might be time for a new one.',
          'Software incompatibility. When Windows or macOS stops supporting your hardware (no more security updates), that\'s a clear signal. A computer without security updates is vulnerable — it\'s like driving on bald tires in winter.',
          'Recurring physical issues. Flickering screen, broken hinge, keyboard losing keys, fan screaming non-stop. When repairs start piling up, the total cost quickly exceeds that of a new one.',
        ],
      },
      {
        title: 'How to extend your computer\'s life',
        paragraphs: [
          'Add an SSD (if you still have a hard drive). This is the most cost-effective upgrade — $50-70 for a 500 GB SSD that transforms your computer. We covered this in detail in our dedicated article.',
          'Reformat Windows. After 3-4 years, Windows accumulates temporary files, leftovers from uninstalled software, and ghost processes. A clean Windows reinstall (keeping your files) can give your PC a second life. It\'s the full oil change for your car.',
          'Clean it physically. Dust accumulates in the fans and blocks cooling. Your computer heats up more, so it slows down to protect itself (that\'s called throttling). A blast of compressed air through the ventilation grilles every 6 months works wonders.',
          'Monitor startup programs. Ctrl + Shift + Esc > Startup tab. Disable everything that isn\'t essential. Spotify, Discord, OneDrive, Adobe, Teams — all these programs launch at startup and slow down your machine. Open them when you need them, not every time you turn on your PC.',
        ],
      },
      {
        title: 'Repair or replace? The simple math',
        paragraphs: [
          'The 50% rule: if the repair costs more than 50% of the price of an equivalent new computer, replace it. For example, if a replacement screen costs $400 and a new laptop costs $700, replace it.',
          'If your computer is less than 3 years old and has only one problem (battery, SSD, screen): repair it. It\'s almost always more cost-effective.',
          'If your computer is over 5 years old and problems are piling up: replace it. Even if each repair is small, the total adds up and you\'re stuck with a computer that\'s becoming increasingly incompatible.',
          'Also think about the value of your time. If you lose 15 minutes a day waiting for your old PC to load, that\'s 90 hours per year. How much is your time worth? A new $700 computer that saves you 90 hours is an investment, not an expense.',
        ],
      },
    ],
    ctaText: 'Now you know if it\'s time to upgrade. Let us help you find the right computer for the years ahead.',
  },
  {
    slug: 'cloud-google-drive-onedrive-icloud-guide',
    title: 'The Cloud: Google Drive, OneDrive, iCloud — Which One Should You Pick?',
    description: 'The cloud has replaced the USB stick. We explain which one to use, how much it costs, and why it\'s your best safety net.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '☁️',
    tags: [],
    tldr: 'The cloud is an online hard drive you can access from anywhere. Google Drive (15 GB free) is the most generous. OneDrive (5 GB free) integrates perfectly with Windows. iCloud (5 GB free) is the natural choice for Apple users. For most people, the free plan is enough — and it\'s your best backup against disasters.',
    sections: [
      {
        title: 'What exactly is the cloud?',
        paragraphs: [
          'The cloud is simply a hard drive located on the Internet instead of inside your computer. When you put a photo on Google Drive, it\'s stored on Google\'s servers somewhere in the world. You can access it from any device — your computer, your phone, another computer at a friend\'s place.',
          'Car analogy: the cloud is like a storage garage in town. Instead of cramming everything in your car trunk (your hard drive), you rent a secure space accessible 24/7 with your key (your password). If your car gets stolen, your stuff is safe at the garage.',
          'The cloud is gradually replacing the USB stick. Instead of carrying around a little plastic stick that gets lost and breaks, your files sync automatically between all your devices. You edit a document on your laptop at work, and the changes show up on your computer at home.',
        ],
      },
      {
        title: 'The three giants compared',
        paragraphs: [
          'Google Drive — 15 GB free (the most generous). Works on everything: Windows, Mac, iPhone, Android. Includes Google Docs, Sheets, Slides (the free alternative to Microsoft Office). If you have a Gmail account, you already have Google Drive. Paid plans: $2.79/month for 100 GB, $13.99/month for 2 TB.',
          'OneDrive (Microsoft) — 5 GB free. Built right into Windows 11 — your Documents, Pictures, and Desktop folders can sync automatically. Included with Microsoft 365 ($13.99/month) which gives you 1 TB of storage + Word, Excel, PowerPoint. The natural choice if you use Windows and Office.',
          'iCloud (Apple) — 5 GB free (not enough in practice). Integrates seamlessly with the Apple ecosystem: iPhone, iPad, Mac. Your photos, contacts, passwords, and documents sync automatically between all your Apple devices. Plans: $1.29/month for 50 GB, $3.99/month for 200 GB, $12.99/month for 2 TB.',
          'Dropbox — the pioneer, but less competitive in 2026. Only 2 GB free. Still popular in business, but for personal use, Google Drive offers more for less.',
        ],
      },
      {
        title: 'The real advantage: automatic backup',
        paragraphs: [
          'The #1 reason to use the cloud isn\'t sharing or syncing — it\'s protection against disasters. A dying hard drive, a stolen laptop, coffee spilled on the keyboard, a ransomware virus: without a backup, your family photos, important documents, and thesis paper disappear.',
          'With the cloud turned on, your files are automatically copied online. Your computer could catch fire — you buy a new one, log in, and everything is there. It\'s the simplest and cheapest insurance policy that exists.',
          'The tip: turn on automatic sync for your Documents and Pictures folders. On Windows: OneDrive > Settings > Backup > Manage backup. On Mac: System Settings > iCloud > iCloud Drive > Documents & Desktop. It takes 2 minutes and can save you years of memories.',
        ],
      },
      {
        title: 'Which one should you pick? The simple guide',
        paragraphs: [
          'You\'re on Windows + Android: Google Drive. The 15 GB free tier is the most generous, and Google Docs is free. If you need Office (Word, Excel), get Microsoft 365 which includes 1 TB of OneDrive.',
          'You\'re on Windows + iPhone: OneDrive or Google Drive. Both work well on iPhone. If you already pay for Microsoft 365, use OneDrive. Otherwise, Google Drive is more generous.',
          'You\'re 100% Apple (Mac + iPhone + iPad): iCloud. The integration is seamless — everything syncs effortlessly. Get the 200 GB plan at $3.99/month so you never run out of space.',
          'You want to combine everything: nothing stops you from using Google Drive for documents and iCloud for photos. Or OneDrive for work and Google Drive for personal stuff. The cloud is flexible — adapt it to your life.',
        ],
      },
    ],
    ctaText: 'Your files are now safe. Let us help you find the perfect computer for you.',
  },
  {
    slug: 'arnaques-informatiques-courantes-comment-eviter',
    title: 'The Most Common Computer Scams (and How to Avoid Them)',
    description: 'Phishing, fake Microsoft support, "your PC is infected" pop-ups — learn to spot the traps before you fall into them.',
    date: '2026-03-27',
    readTime: '7 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '🛡️',
    tags: ['securite'],
    tldr: 'Computer scams exploit fear and urgency. Golden rule: Microsoft, Apple, and your bank will NEVER call you to say your computer is infected. Never click a link in an urgent email, never give control of your computer to a stranger, and never pay with gift cards. When in doubt, close everything and call the real number yourself.',
    sections: [
      {
        title: 'Why it still works in 2026',
        paragraphs: [
          'Computer scams don\'t target experts — they target normal people who are busy and stressed. An email saying "Your account will be closed in 24 hours" puts you in panic mode. A call from a "Microsoft technician" with a convincing tone and impressive technical jargon is intimidating. A flashing red pop-up saying "VIRUS DETECTED" is scary.',
          'Scammers don\'t hack your computer — they hack your psychology. They use urgency (act now!), authority (I\'m from Microsoft), and fear (your computer is infected) to short-circuit your judgment.',
          'The good news: 95% of scams follow the same patterns. Once you know them, you can spot them in 3 seconds. It\'s like learning to recognize counterfeit bills — once you know what to look for, it\'s obvious.',
        ],
      },
      {
        title: 'Scam #1: Phishing',
        paragraphs: [
          'You get an email from "Netflix", "Amazon", "your bank", or "Canada Post" saying your account has a problem and you need to click a link to fix it. The link leads to a fake site that looks like the real one, where they ask for your login credentials and credit card number.',
          'How to spot it: look at the sender\'s address (not the display name, the actual address). "support@netflix-billing-secure.com" is NOT Netflix. The real one would be "info@netflix.com". Hover over the link WITHOUT clicking to see where it really goes. If the URL looks weird, it\'s a scam.',
          'The rule: NEVER click a link in an email to fix an "account problem." Open your browser yourself, type the website address (netflix.com), and log in directly. If the problem is real, you\'ll see it in your account.',
        ],
      },
      {
        title: 'Scam #2: Fake tech support',
        paragraphs: [
          'You get a call: "Hello, this is Microsoft/Apple technical support. Our systems detected a virus on your computer. I\'m going to help you remove it." The person asks you to install remote control software (AnyDesk, TeamViewer), then takes control of your computer.',
          'The reality: Microsoft, Apple, Google, and your bank will NEVER call you to report a virus. Ever. They don\'t even know if your computer has a virus. If someone calls you claiming that, it\'s a scam 100% of the time. Hang up immediately.',
          'What happens if you let them in: they "find" fake problems (normal system files they present as viruses), then ask you for $200-500 to "fix" them. Sometimes, they install actual malware or steal your banking information while they have control.',
        ],
      },
      {
        title: 'Scam #3: "VIRUS DETECTED" pop-ups',
        paragraphs: [
          'You\'re browsing the web and suddenly, a red/blue page appears with sound alerts: "YOUR COMPUTER IS INFECTED — CALL THIS NUMBER IMMEDIATELY." The number leads to the same type of scammer as scam #2.',
          'The reality: it\'s just a web page. Your browser CANNOT detect a virus on your computer. No legitimate website displays this kind of alert. It\'s the equivalent of a "YOUR ENGINE IS ABOUT TO EXPLODE" sign taped to a pole on the roadside.',
          'What to do: close the tab (Ctrl + W) or, if the pop-up blocks everything, close the browser (Alt + F4). If that doesn\'t work, open Task Manager (Ctrl + Shift + Esc) and force close the browser. It can\'t damage your computer — it\'s just an aggressive web page.',
        ],
      },
      {
        title: 'The 5 anti-scam reflexes',
        paragraphs: [
          '1. Nobody calls you about a virus. Ever. Hang up and block the number.',
          '2. Check the sender. An email from your bank comes from @yourbank.ca, not from @yourbank-secure-verify.com. When in doubt, call your bank yourself using the number on your card.',
          '3. Never pay with gift cards. No legitimate company asks for payment in iTunes or Amazon gift cards. If someone asks you for that, it\'s a scam — end of story.',
          '4. Turn on two-factor authentication (2FA) everywhere. Email, banking, social media. Even if a scammer gets your password, they won\'t be able to log in without the code sent to your phone.',
          '5. When in doubt, do nothing. Close everything, take a deep breath, and call the organization yourself using a number YOU found (not the one in the email or the pop-up). Better to lose 5 minutes checking than to lose $5,000 to a scam.',
        ],
      },
    ],
    ctaText: 'Now that you know how to protect yourself, let us help you find the perfect computer with confidence.',
  },
  {
    slug: 'chromebook-portable-300-dollars-pour-qui',
    title: 'Chromebook: Is the $300 Laptop Right for You?',
    description: 'A brand-new computer at $300 that does everything you need? Maybe. We explain the strengths, the limits, and who it\'s perfect for.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Comparatifs',
    categoryColor: '#7c3aed',
    icon: '💻',
    tags: ['chromebook', 'budget'],
    tldr: 'A Chromebook is a lightweight laptop running ChromeOS (based on Chrome). Perfect for web browsing, email, Netflix, Google Docs, and studying. Not made for: Photoshop, PC gaming, specific Windows software. If 90% of your time is spent in a browser, the $300 Chromebook is probably the best bang for your buck on the market.',
    sections: [
      {
        title: 'ChromeOS: an operating system built for the web',
        paragraphs: [
          'A Chromebook doesn\'t run Windows. It runs ChromeOS, an operating system created by Google. In practice, ChromeOS is essentially the Chrome browser in full screen, with the ability to run Android apps (Google Play Store) and some Linux apps.',
          'The advantage: ChromeOS is ultra-lightweight. It boots in 5-8 seconds, doesn\'t slow down over time, receives silent automatic updates, and is virtually immune to Windows viruses. It\'s the electric car of computing — simple, reliable, no oil changes needed.',
          'The limitation: you can\'t install Windows software. No Photoshop, no desktop version of Microsoft Office (but Word, Excel, and PowerPoint work great in the browser via Office Online or Google Docs). No PC gaming either.',
        ],
      },
      {
        title: 'Who the Chromebook is perfect for',
        paragraphs: [
          'Students. Taking notes in Google Docs, web research, presentations, email, Zoom for online classes. A Chromebook handles all of that flawlessly for a third of the price of a Windows laptop. Many schools and colleges already use Google Workspace — the Chromebook is their natural tool.',
          'Parents or grandparents. If the person uses the computer for Facebook, email, YouTube, Netflix, and video calls: the Chromebook is ideal. No viruses to worry about, no Windows updates that take 45 minutes, no bloatware. You turn it on and it works.',
          'Light mobile workers. If your work happens in Gmail, Google Drive, Slack, and an online CRM: the Chromebook is enough. It\'s lightweight (often 1.2-1.5 kg), the battery lasts 10-12 hours, and it\'s affordable enough that you won\'t panic if you lose it while travelling.',
          'Second computers. You have a desktop for heavy work and want a lightweight laptop for the couch, travel, or the coffee shop? A $250-350 Chromebook is the perfect companion.',
        ],
      },
      {
        title: 'The real limitations you should know',
        paragraphs: [
          'No Windows software. If your school or employer requires software that only runs on Windows (certain accounting software, AutoCAD, medical software), the Chromebook won\'t work. Check BEFORE you buy.',
          'Storage is limited. Most Chromebooks have 64-128 GB of internal storage — that\'s not much. The idea is to store your files in Google Drive (cloud). If you need to keep a lot of files offline, it gets frustrating.',
          'Offline mode is limited. ChromeOS works much better with an Internet connection. Without Internet, you can still write in Google Docs (it syncs when you\'re back online), watch downloaded movies, and use some Android apps, but the experience is reduced.',
          'Not all Android apps work perfectly. Some mobile apps work well on the Chromebook screen, others are poorly adapted (interface too small, display glitches). It\'s acceptable but not perfect.',
        ],
      },
      {
        title: 'Which Chromebook should you buy?',
        paragraphs: [
          'Tight budget ($200-300): Acer Chromebook 314, Lenovo IdeaPad 3 Chromebook. 14-inch screen, good enough for daily use. Don\'t expect a gorgeous display or premium build quality — but it gets the job done.',
          'Best value ($350-500): Acer Chromebook Plus 515, HP Chromebook Plus x360. Better screen (IPS, brighter), more RAM (8 GB), sometimes a touchscreen. This is the sweet spot.',
          'Premium ($500-700): Google Pixelbook, ASUS Chromebook Plus CX34 Flip. At this price, you\'re getting close to entry-level Windows laptops — the question becomes whether ChromeOS is still the right choice or whether a Windows laptop would offer more flexibility.',
          'Our advice: stay under $400. The whole point of a Chromebook is the price. Above $500, a Windows laptop on sale offers more possibilities for the same budget.',
        ],
      },
    ],
    ctaText: 'Does the Chromebook sound right for you? Or do you want more flexibility? We\'ll help you choose.',
  },
  {
    slug: 'carte-graphique-gpu-besoin-ou-pas',
    title: 'Graphics Card (GPU): Do You Actually Need One?',
    description: 'Integrated GPU, dedicated GPU, NVIDIA, AMD... We demystify the graphics card and explain whether you should care when buying a computer.',
    date: '2026-03-27',
    readTime: '7 min',
    category: 'Les bases',
    categoryColor: '#2563eb',
    icon: '🎮',
    tags: ['gpu'],
    tldr: 'The graphics card (GPU) handles everything visual: display, video, gaming, 3D. For office work and web browsing, the GPU built into your processor is more than enough. You only need a dedicated GPU (NVIDIA/AMD) for gaming, 4K video editing, 3D modelling, or AI. Don\'t pay for a GPU you don\'t need.',
    sections: [
      {
        title: 'Integrated vs dedicated GPU: the fundamental difference',
        paragraphs: [
          'Every computer has a GPU (Graphics Processing Unit). It\'s the chip that calculates everything you see on screen: displaying windows, decoding YouTube videos, scrolling through web pages. Without a GPU, your screen would stay black.',
          'The integrated GPU is built right into the processor (Intel UHD, Intel Iris Xe, AMD Radeon integrated, Apple GPU in M-series chips). It shares the computer\'s RAM and uses little power. For 80% of people, it\'s more than enough.',
          'The dedicated GPU is a separate chip with its own memory (VRAM). It\'s a second visual processing factory that adds to the processor. The brands: NVIDIA GeForce (RTX 4060, RTX 4070...) and AMD Radeon (RX 7600, RX 7700...). More powerful, but more expensive and power-hungry.',
          'Car analogy: the integrated GPU is your car engine that also runs the air conditioning — it\'s fine for regular A/C. The dedicated GPU is a separate A/C compressor — essential if you want to cool a bus in the middle of summer, useless for your Civic.',
        ],
      },
      {
        title: 'Who needs a dedicated GPU?',
        paragraphs: [
          'Gamers. If you want to play recent games (Cyberpunk, Fortnite, Hogwarts Legacy) with nice graphics, you need a dedicated GPU. An RTX 4060 is the sweet spot for 1080p gaming with high settings. The RTX 4070 and above for 1440p or 4K.',
          'Video and 3D creators. 4K video editing, visual effects in DaVinci Resolve or Premiere Pro, 3D modelling in Blender — all of this uses the GPU intensively. A dedicated GPU cuts rendering time from several hours to a few minutes.',
          'AI and machine learning professionals. Training AI models relies heavily on NVIDIA GPUs (thanks to CUDA). If you\'re doing serious data science, the GPU is your main tool.',
          'Multi-monitor 4K users. If you want to plug 2-3 4K screens into your computer and work on them simultaneously, an entry-level dedicated GPU makes the experience smoother — especially if you work with heavy files (photos, design).',
        ],
      },
      {
        title: 'Who does NOT need one?',
        paragraphs: [
          'Office work. Word, Excel, email, web browsing, Zoom — the integrated GPU handles all of this without breaking a sweat. Buying a dedicated GPU for these tasks is like buying a tractor to mow your lawn.',
          'Video streaming. Netflix in 4K, YouTube, Disney+ — the integrated GPU in recent processors decodes 4K video natively. You don\'t need anything more.',
          'Light photo editing. Lightroom, Canva, and even Photoshop for standard photo editing work just fine with a recent integrated GPU (Intel Iris Xe or Apple GPU). It\'s heavy video editing that requires a dedicated GPU, not photo editing.',
          'Programming (except AI). Web development, apps, databases — all of this relies on the processor and RAM, not the GPU. A full-stack developer can code perfectly fine on a MacBook Air without a dedicated GPU.',
        ],
      },
      {
        title: 'How to decode NVIDIA and AMD names',
        paragraphs: [
          'NVIDIA GeForce RTX: the consumer lineup. RTX 4050 = entry-level (1080p gaming at medium settings). RTX 4060 = mid-range (the sweet spot, 1080p gaming at high settings). RTX 4070 = high-end (smooth 1440p). RTX 4080/4090 = enthusiast (maxed 4K, pro creative work).',
          'AMD Radeon RX: the often cheaper alternative. RX 7600 is roughly equal to the RTX 4060 in performance. RX 7700 XT is roughly equal to the RTX 4070. AMD generally offers better value for money, but NVIDIA has the edge in ray tracing and AI applications (CUDA).',
          'On laptops, watch out for "Laptop" versions: an RTX 4070 Laptop is significantly less powerful than a desktop RTX 4070. Same name but with a throttled engine to manage heat in a tight space. Look at benchmarks, not just the name.',
          'The VRAM number (4 GB, 6 GB, 8 GB, 12 GB) is the GPU\'s dedicated memory. For gaming in 2026: 6 GB is the minimum, 8 GB is comfortable, 12 GB+ is needed for 4K and high-resolution textures.',
        ],
      },
    ],
    ctaText: 'Now you know if you need a GPU. Let us help you find the perfect computer.',
  },
  {
    slug: 'acheter-ordinateur-reconditionne-bonne-affaire',
    title: 'Buying a Refurbished Computer: Great Deal or Trap?',
    description: 'A MacBook Pro at half price sounds too good to be true. We explain how to buy refurbished with confidence (and the mistakes to avoid).',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '♻️',
    tags: ['budget'],
    tldr: 'A certified refurbished computer is tested, cleaned, and warrantied — it\'s NOT a used computer from Kijiji. You can save 30-50% on a MacBook or ThinkPad that\'s practically new. Buy from Apple Refurbished, certified resellers, or manufacturer programs. Avoid Marketplace, Kijiji, and sellers with no warranty.',
    sections: [
      {
        title: 'Refurbished does not equal used',
        paragraphs: [
          'The most common confusion: a refurbished computer is not a used computer sold on Kijiji. A refurbished device is a product that was returned to the store, a display model, or a device with a minor defect that was repaired. It\'s then tested, cleaned, sometimes restored to like-new condition (new battery, new SSD), and sold with a warranty.',
          'It\'s like buying a demo car from a dealership. It has 2,000 km on it, but it\'s inspected, warrantied, and sold 20-30% cheaper than a new one. Not the same thing as buying a stranger\'s car on Marketplace.',
          'Refurbishment grades vary: Grade A = like new (no visible marks). Grade B = light cosmetic wear (micro-scratches). Grade C = visible wear but fully functional. For a laptop, aim for Grade A or B — the price difference from Grade C is often small.',
        ],
      },
      {
        title: 'Where to buy with confidence',
        paragraphs: [
          'Apple Refurbished (apple.com/ca/shop/refurbished): the gold standard. Apple refurbishes its own products with new parts (including the battery), includes the standard one-year warranty, and lets you add AppleCare. Typical savings: 15-20%. It\'s literally a new Mac in a white box instead of a grey one.',
          'Manufacturer programs: Dell Outlet, Lenovo Outlet, HP Renew. Manufacturers sell their returns and unsold stock directly, refurbished with warranty. Savings: 20-40%. Ideal for ThinkPads and XPS laptops.',
          'Certified resellers: Back Market, Ordivert (Quebec), Insertech (Montreal). These companies specialize in refurbishment with quality standards. Minimum 6-12 month warranty. Back Market offers a 12-month warranty and free 30-day returns.',
          'Avoid: Facebook Marketplace, Kijiji, and unknown sites with no return policy. No warranty, no standardized testing, no recourse if the product has a problem. Saving $50 only to end up with no warranty and no recourse is a bad deal.',
        ],
      },
      {
        title: 'What to check before buying',
        paragraphs: [
          'The warranty. Minimum 6 months, ideally 12 months. If the seller offers no warranty, walk away. The warranty is proof the seller has confidence in their product.',
          'The battery. It\'s the component that ages fastest. Ask for the battery cycle count (on Mac: Apple menu > System Information > Power). Under 300 cycles = excellent. Over 500 = the battery is starting to wear out. Some refurbishers replace the battery with a new one — that\'s a big plus.',
          'The processor age. Don\'t go back more than 3-4 years. A processor from 2022 is still very capable in 2026. A processor from 2019, even a high-end one, is starting to show its limits with current software.',
          'The storage. Make sure it\'s an SSD (not an old HDD hard drive). If it\'s an HDD, ask if the seller can swap it for an SSD, or plan to do it yourself ($50-70).',
        ],
      },
      {
        title: 'The best refurbished deals',
        paragraphs: [
          'MacBook Air / Pro (1-2 years old). Macs hold their performance for a very long time thanks to Apple Silicon chips. A refurbished MacBook Air M2 at $850 instead of $1,299 new is probably the best deal on the market in 2026.',
          'Lenovo ThinkPad (X1 Carbon, T14s). ThinkPads are enterprise machines built like tanks. When companies refresh their fleet, thousands of nearly-new ThinkPads flood the refurbished market at $400-700.',
          'Dell XPS and Latitude. Same story as ThinkPads — companies sell in bulk, prices drop. A refurbished Dell XPS 13 offers unbeatable value for money.',
          'The trap to avoid: refurbished gaming laptops. They\'ve often been pushed to the max (heat, fans running full blast for hours), and the battery is usually degraded. For gaming, buying new is safer.',
        ],
      },
    ],
    ctaText: 'Now you know how to shop smart. Let us help you find the perfect computer, new or refurbished.',
  },
  {
    slug: 'batterie-portable-mythes-realite-preservation',
    title: 'Your Laptop Battery: Myths, Reality, and How to Make It Last',
    description: 'Should you leave it plugged in? Charge to 80%? We separate fact from fiction with advice based on lithium-ion battery science.',
    date: '2026-03-27',
    readTime: '6 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '🔋',
    tags: [],
    tldr: 'You can leave your laptop plugged in without destroying it — modern laptops handle this automatically. To maximize longevity: keep the charge between 20-80% when possible, avoid extreme heat, and turn on the "battery optimization" mode in your settings. The battery will lose about 20% of its capacity after 2-3 years — that\'s normal.',
    sections: [
      {
        title: 'How a lithium-ion battery works',
        paragraphs: [
          'Your laptop uses a lithium-ion (Li-ion) battery — the same technology as your phone, your tablet, and electric cars. These batteries naturally degrade over time and charge cycles, no matter what you do. The question isn\'t "how to prevent degradation" but "how to slow it down."',
          'A charge cycle is when you use 100% of the battery\'s capacity (not necessarily all at once). Using 50% then recharging, then using 50% again = 1 cycle. Most batteries are designed for 500-1,000 cycles before losing 20% of their capacity.',
          'Car analogy: the battery is like your tires. They wear down with every kilometre, no matter how you drive. But aggressive driving (hard acceleration, hard braking) wears them out faster than smooth driving. Same thing for the battery: certain habits wear it out faster than others.',
        ],
      },
      {
        title: 'Myth #1: "Never leave your laptop plugged in"',
        paragraphs: [
          'This is the most persistent myth. The truth: modern laptops (2018+) have protection circuits that stop charging when the battery reaches 100%. Your laptop doesn\'t "overcharge." Once at 100%, it runs on AC power and the battery sits idle.',
          'That said, keeping the battery constantly at 100% does slightly accelerate its chemical degradation (it\'s the stress of high voltage). That\'s why Apple, Lenovo, and Dell have all added charge limit options.',
          'The realistic advice: if your laptop is plugged in 90% of the time on a desk, turn on the charge limit at 80% (see next section). If you use your laptop on the go, don\'t worry about it — plug and unplug naturally without overthinking it.',
        ],
      },
      {
        title: 'Myth #2: "Fully discharge before recharging"',
        paragraphs: [
          'This was true for the old nickel-cadmium (NiCd) batteries from the \'90s, which had a "memory effect." Modern lithium-ion batteries do NOT have this problem. In fact, deep discharges (below 10%) are more stressful for the battery than partial discharges.',
          'The ideal zone for a Li-ion battery is between 20% and 80%. That\'s the range where chemical stress is minimal. But don\'t become obsessed — using your battery between 10% and 100% isn\'t going to destroy it. Manufacturers planned for that.',
          'The analogy: it\'s like a muscle. Using it regularly in its comfort zone (20-80%) keeps it in shape. Pushing it to the extreme (constant 0% or 100%) wears it out faster. But an occasional sprint isn\'t going to injure you.',
        ],
      },
      {
        title: 'The real enemies of your battery',
        paragraphs: [
          'Heat. This is enemy #1. A battery at 35 degrees C degrades twice as fast as a battery at 25 degrees C. Don\'t leave your laptop in direct sunlight, on a cushion that blocks ventilation, or in a car in summer. Heat does more damage than a bad charge cycle.',
          'Unnecessary cycles. Every cycle wears the battery a little. If you\'re at your desk with an outlet nearby, plug in your laptop. Using the battery "to give it a workout" has zero benefit — you\'re racking up cycles for nothing.',
          'Storage at 100% or 0%. If you\'re putting away a laptop for several weeks, leave the battery between 40% and 60%. A battery stored at 100% degrades faster. A battery stored at 0% can drop so low it refuses to turn back on.',
          'Extreme cold. During Canadian winters, don\'t leave your laptop in the car overnight. Cold temporarily reduces capacity (your battery seems dead when it\'s not) and can damage the cells if the temperature drops below -20 degrees C.',
        ],
      },
      {
        title: 'Settings to turn on right now',
        paragraphs: [
          'On Mac: Settings > Battery > Battery Health > Optimized Charging. The Mac learns your habits and delays charging past 80% until you need it. If you want to be stricter, apps like AlDente let you set the limit at exactly 80%.',
          'On Windows (Lenovo): Lenovo Vantage > Battery > Conservation Mode. Limits the charge to about 60%. On Dell: Dell Power Manager > Primarily AC Charge. On ASUS: MyASUS > Battery > Longevity mode (60%) or balanced (80%).',
          'On Windows (generic): some BIOS options offer a charge limit. Press F2 or Del at startup to access the BIOS and look for "Battery Charge Limit" or "Conservation Mode."',
          'The summary in 3 rules: 1) Turn on the charge limit at 80% if your laptop is often plugged in. 2) Avoid heat — keep the ventilation grilles clear. 3) Don\'t stress — the battery is a consumable designed to be used. Enjoy your laptop.',
        ],
      },
    ],
    ctaText: 'Your battery will thank you. Ready to find the perfect laptop for the years ahead?',
  },
  {
    slug: 'comment-on-finance-shop-compy',
    title: 'How We Fund Shop Compy',
    description: 'No BS: here\'s exactly how the site pays its bills, and why it doesn\'t change a thing about our recommendations.',
    date: '2026-03-28',
    readTime: '5 min',
    category: 'Achat malin',
    categoryColor: '#059669',
    icon: '💰',
    tags: ['funding', 'transparency', 'affiliate'],
    tldr: 'Shop Compy is free and always will be. We fund ourselves through affiliate links (which don\'t change prices or recommendations), one clearly marked ad spot, Compy Finds, and expert support at $5. No paywall, no invasive tracking, no biased recommendations.',
    sections: [
      {
        title: 'Free, and it\'s staying that way',
        paragraphs: [
          'Let\'s be upfront: Shop Compy is free. The comparison tool, the guides, the articles — all of it. And it\'s staying free. No hidden "premium" plan, no paid version that unlocks the "real" recommendations. What you see is what everyone sees.',
          'Why do we make such a big deal about this? Because too many tech review sites give you mediocre recommendations for free, then push you toward a subscription for the "real" answers. Here, the best recommendation is always the one on display.',
        ],
      },
      {
        title: 'Yes, this actually costs real money',
        paragraphs: [
          'Running Shop Compy isn\'t free on our end. The AI (Gemini) that analyzes products and personalizes recommendations costs money with every request. Hosting on Vercel, ongoing development, product research — it all adds up.',
          'We could have slapped on a paywall and called it a day. But we believe everyone deserves honest recommendations, not just people who can afford a monthly subscription. So we found other ways.',
        ],
      },
      {
        title: 'Our 4 revenue sources (full transparency)',
        paragraphs: [
          '**1. Affiliate links.** When you click a link to a retailer (Amazon, Best Buy, etc.) and buy something, we get a small commission from the retailer. It costs you exactly the same price — not a penny more. And most importantly: commissions NEVER influence our recommendations. If a product is better for you, that\'s the one we recommend. Period.',
          '**2. One clearly marked ad spot.** On product pages, you\'ll see a single ad space, clearly labelled as such. No pop-ups, no ads disguised as content, no "sponsored articles" that look like real guides. One ad, identified, that\'s it.',
          '**3. Compy Finds.** We dig up exceptional deals and share them for free, with no commission. If a find saved you big, we offer a voluntary donation option. Zero obligation, zero guilt.',
          '**4. Expert support.** Got a specific question about your purchase? For $5, you send us your question and we get back to you within 24 hours with a personalized recommendation. Not a chatbot, not a template — a real answer from someone who knows their stuff.',
        ],
      },
      {
        title: 'Why this is necessary',
        paragraphs: [
          'Every time the comparison tool analyzes a computer for you, it uses AI resources. Every page you load is bandwidth. Every new guide we write is research and development time.',
          'Without revenue, the site shuts down. It\'s that simple. But instead of charging you directly, we chose revenue sources that stay aligned with your interests: you never pay more, and our recommendations stay independent.',
        ],
      },
      {
        title: 'What we will NEVER do',
        paragraphs: [
          '**No paywall.** All content stays free. No "log in to see the rest," no "subscribe to unlock the comparison tool."',
          '**No invasive tracking.** We don\'t install third-party trackers in your browser. We don\'t need to know what you do on other sites to recommend a good computer.',
          '**No biased recommendations.** If a product earns us more commission but another one is better for you, we recommend the better one. Always. Our reputation is worth more than any commission.',
        ],
      },
      {
        title: 'Our promise',
        paragraphs: [
          'Accessible and honest recommendations. That\'s Shop Compy. We believe buying a computer shouldn\'t be complicated, stressful, or reserved for people who speak tech jargon. And we believe transparency is proven with actions, not just nice words.',
          'You\'re here, reading this article — that\'s proof we\'re playing with our cards on the table. Thanks for trusting us.',
        ],
      },
    ],
    ctaText: 'Now that you know how we work, let us help you find your next computer.',
  },
]
