/**
 * IONITIX - Event Data Store
 * Complete catalog of Technical and Non-Technical events with rules, schedules, and coordinators
 */

const IONITIX_EVENTS = [
  // ==========================================
  // TECHNICAL EVENTS
  // ==========================================
  {
    id: 'buggy-code',
    title: 'BUGGY CODE',
    tagline: 'High-Velocity Algorithmic Debugging & CodeSprint',
    category: 'tech',
    typeTag: 'Coding',
    icon: 'terminal',
    teamSize: 'Individual / Duo',
    venue: 'Computer Center 2 - High Performance Lab',
    timing: 'Day 3, 10:00 AM',
    cardImage: 'events/buggycode1.jpg',
    modalImage: 'events/buggycode2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScpFNtxMNGSItLqdkeywc1E06QAUoYZhgfM4HpniB1wCZGGPw/viewform?usp=send_form',
    shortDesc: 'Race against time to trace syntax faults, fix memory leaks, patch security flaws, and optimize complex IoT data algorithms under strict constraints.',
    fullDesc: 'A fast-paced competitive debugging and algorithmic code clash. Round 1 tests rapid code comprehension and fixing obfuscated bugs across C, C++, Python, and Java. Round 2 challenges participants to optimize throughput and memory efficiency against automated edge test suites.',
    rules: [
      'Supported languages: C, C++, Python, Java, Rust, Go.',
      'Strict anti-plagiarism filters and monitor surveillance enabled.',
      'Points awarded based on execution speed, memory efficiency, and passing test cases.',
      'Ties broken by earliest timestamp of successful submission.'
    ],
    technicalCoordinator: 'Rishma',
    facultyCoordinator: 'Mr. Abdul Jabbar',
    studentCoordinator: 'Aboobakar Shazin',
    studentSubCoordinators: ['Muhammed Shareef', 'Afnaz', 'Salman'],
    coordinators: [
      { role: 'Technical Coordinator', name: 'Rishma', contact: 'Overall Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mr. Abdul Jabbar', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Aboobakar Shazin', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Muhammed Shareef, Afnaz, Salman', contact: 'Coordinators' }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI / UX',
    tagline: 'Futuristic Cyberpunk Interface & Prototype Design Sprint',
    category: 'tech',
    typeTag: 'Design',
    icon: 'palette',
    teamSize: 'Individual / Duo',
    venue: 'Digital Design Studio 102',
    timing: 'Day 3, 01:30 PM',
    cardImage: 'events/ui1.jpg',
    modalImage: 'events/ui2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScZivFszFXdQxNpXLbr8aMtp78WqS7bvkndUHugnTVUtDYceA/viewform',
    shortDesc: 'Craft sleek, intuitive futuristic mobile dashboards or cyber-physical IoT telemetry control center interfaces in Figma within 90 minutes.',
    fullDesc: 'Designers and interface architects, assemble! Receive a surprise product brief (e.g. smart space habitat telemetry dashboard or neural cybernetic wearable app) and build stunning high-fidelity interactive wireframes, micro-interactions, and design systems.',
    rules: [
      'Tool of choice: Figma (design assets and icon packs provided).',
      'Designs must include both Mobile and Desktop responsive viewports.',
      'Judged on Aesthetic Wow-Factor (35%), Usability & UX Architecture (35%), and Micro-Interactions (30%).',
      'All design components must be created natively during the sprint.'
    ],
    technicalCoordinator: 'Rishma',
    facultyCoordinator: 'Mr Aboobakkar Siddiq',
    studentCoordinator: 'Muhammed Jinan',
    studentSubCoordinators: ['Lubna', 'Shahala', 'Naja'],
    coordinators: [
      { role: 'Technical Coordinator', name: 'Rishma', contact: 'Overall Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mr Aboobakkar Siddiq', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Muhammed Jinan', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Lubna, Shahala, Naja', contact: 'Coordinators' }
    ]
  },
  {
    id: 'capture-the-flag',
    title: 'CAPTURE THE FLAG',
    tagline: 'Cybersecurity, Cryptographic Decryption & Vulnerability Exploitation',
    category: 'tech',
    typeTag: 'CyberSec',
    icon: 'shield-alert',
    teamSize: 'Individual / Duo',
    venue: 'Cyber Security Lab - 2nd Floor',
    timing: 'Day 3, 11:00 AM',
    cardImage: 'events/ctf1.jpg',
    modalImage: 'events/ctf2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdrOsJB3B4Mc6jK12TExbWCw1Wr6PnSuiyyIbkZ8aZyHO9uKg/viewform',
    shortDesc: 'Analyze locked IoT binaries, tap into hardware buses, decrypt cryptographic ciphers, and capture hidden flags across web, network, and reverse engineering challenges.',
    fullDesc: 'A high-intensity Jeopardy-style CTF covering Web Security, Reverse Engineering, Cryptography, Forensics, and Hardware/IoT Exploitation. Contestants use logic analyzers, GDB, Ghidra, and Wireshark to extract hidden flags from vulnerable systems.',
    rules: [
      'Live dynamic scoring portal with real-time leaderboard ranking.',
      'Attacking the CTF infrastructure or denial of service is strictly prohibited.',
      'Contestants are permitted to bring personal laptops with approved tools.',
      'Scoring based on points and earliest submission timestamps.'
    ],
    technicalCoordinator: 'Rishma',
    facultyCoordinator: 'Mrs. Greeshma T R',
    studentCoordinator: 'Abin Binu',
    studentSubCoordinators: ['Aidi Rahoof', 'Shamna', 'Saniya Naz'],
    coordinators: [
      { role: 'Technical Coordinator', name: 'Rishma', contact: 'Overall Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mrs. Greeshma T R', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Abin Binu', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Aidi Rahoof, Shamna, Saniya Naz', contact: 'Coordinators' }
    ]
  },

  // ==========================================
  // NON-TECHNICAL & GAMING EVENTS
  // ==========================================
  {
    id: 'tech-auction',
    title: 'TECH AUCTION',
    tagline: 'Strategic Bidding, Tech Asset Trading & Budget Mastery',
    category: 'non-tech',
    typeTag: 'Auction',
    icon: 'compass',
    teamSize: 'Per Team (3 Members)',
    venue: 'Seminar Hall B',
    timing: 'Day 3, 02:30 PM',
    cardImage: 'events/techauction1.jpg',
    modalImage: 'events/techauction2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://forms.gle/Yc1E14gpS9LVPrN69',
    shortDesc: 'Manage virtual crypto credit points, analyze volatile tech stocks, bid on disruptive IoT patents, and construct the ultimate technology portfolio.',
    fullDesc: 'A thrilling high-stakes strategy and bidding game. Teams start with fixed digital currency and must outmaneuver rivals during intense live auctions to acquire AI models, quantum hardware patents, and cyber startups to build the highest valuation portfolio.',
    rules: [
      'Each team allocated fixed virtual bidding credits at the start of Round 1.',
      'Hidden multiplier cards and mystery asset lots auctioned at random intervals.',
      'Collusion or exceeding credit balance leads to penalty deductions.',
      'Team with the highest net portfolio valuation after final round wins.'
    ],
    nonTechnicalCoordinator: 'Shivam Chandra Poojary',
    facultyCoordinator: 'Mrs. Asmitha S E',
    studentCoordinator: 'Mohammed Farhan',
    studentSubCoordinators: ['Safa', 'Shazik', 'Afifa'],
    coordinators: [
      { role: 'Non-Technical Coordinator', name: 'Shivam Chandra Poojary', contact: 'Overall Non-Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mrs. Asmitha S E', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Mohammed Farhan', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Safa, Shazik, Afifa', contact: 'Coordinators' }
    ]
  },
  {
    id: 'meme-contest',
    title: 'MEME WARRIORS',
    tagline: 'Tech Sarcasm, Pop Culture & Viral Humor Showdown',
    category: 'non-tech',
    typeTag: 'Creative',
    icon: 'help-circle',
    teamSize: 'Individual or Per Team (2 Members)',
    venue: 'Media Deck 201',
    timing: 'Day 3, 01:30 PM',
    cardImage: 'events/meme1.jpg',
    modalImage: 'events/meme2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://forms.gle/go5PmaDV6ENXk2cj8',
    shortDesc: 'Express collegiate tech struggles, coding bugs, IoT chaos, and pop-culture moments through hilarious, relatable original memes and short videos.',
    fullDesc: 'Unleash your creativity, humor, and viral wit! Participants are given surprise prompts based on programmer life, IoT glitches, and tech industry news to craft witty original static and video memes within a 60-minute sprint.',
    rules: [
      'Meme templates provided on-site or participants may bring clean blank templates.',
      'Content must be original and respectful; strictly no hate speech or vulgarity.',
      'Judged on Humor (40%), Relatability to Tech (30%), and Originality (30%).',
      'Top entries voted on live by audience cheer & jury ratings.'
    ],
    nonTechnicalCoordinator: 'Shivam Chandra Poojary',
    facultyCoordinator: 'Dr. S Gopinath',
    studentCoordinator: 'Shreya',
    studentSubCoordinators: ['Sona', 'Moulya', 'Deeksha'],
    coordinators: [
      { role: 'Non-Technical Coordinator', name: 'Shivam Chandra Poojary', contact: 'Overall Non-Tech Head' },
      { role: 'Faculty Coordinator', name: 'Dr. S Gopinath', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Shreya', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Sona, Moulya, Deeksha', contact: 'Coordinators' }
    ]
  },
  {
    id: 'treasure-hunt',
    title: 'TREASURE HUNT',
    tagline: 'Interactive Campus Hunt with Ciphers & IoT Waypoints',
    category: 'non-tech',
    typeTag: 'Adventure',
    icon: 'compass',
    teamSize: 'Per Team (4 Members)',
    venue: 'College Campus / Central Courtyard',
    timing: 'Day 3, 03:30 PM',
    cardImage: 'events/treasurehunt1.jpg',
    modalImage: 'events/treasurehunt2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://pj7dtdywlh.zite.so/',
    shortDesc: 'Decode cryptic binary ciphers, scan hidden checkpoints across campus, and solve real-world physical mini-challenges to unlock the master vault.',
    fullDesc: 'A high-energy campus adventure! Teams must coordinate in real time to decipher location riddles, locate hidden beacon tags across campus buildings, and crack final lockbox codes before rival teams.',
    rules: [
      'All team members must remain together throughout all stages of the hunt.',
      'No vehicles permitted; hunt is on-foot within campus boundaries.',
      'Tampering with clues or checkpoints leads to immediate disqualification.',
      'First team to assemble all clue fragments and reach the central vault wins.'
    ],
    nonTechnicalCoordinator: 'Shivam Chandra Poojary',
    facultyCoordinator: 'Mrs. Greeshma T R',
    studentCoordinator: 'S Abdul Rahman Shahid',
    studentSubCoordinators: ['Muhammad Suhaib', 'Madeeha Muhammed Mubeen', 'Kaushik'],
    coordinators: [
      { role: 'Non-Technical Coordinator', name: 'Shivam Chandra Poojary', contact: 'Overall Non-Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mrs. Greeshma T R', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'S Abdul Rahman Shahid', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Muhammad Suhaib, Madeeha Muhammed Mubeen, Kaushik', contact: 'Coordinators' }
    ]
  },
  {
    id: 'free-fire',
    title: 'FREE FIRE',
    tagline: 'Battle Royale Esports Clash on Dedicated Server',
    category: 'non-tech',
    typeTag: 'Online Games',
    icon: 'gamepad-2',
    teamSize: 'Per Team (4 Members)',
    venue: 'Indoor Esports Arena / Online Lobby',
    timing: 'Day 3, 05:00 PM',
    cardImage: 'events/freefire1.jpg',
    modalImage: 'events/freefire2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://forms.gle/gMGYV92XWLqijrU69',
    shortDesc: 'Squad up for high-octane battle royale custom rooms. Compete across Bermuda and Purgatory maps with official esports point scoring.',
    fullDesc: 'Drop in, loot up, and survive! Teams battle in custom private rooms with competitive esports tournament settings. Points calculated based on placement rankings and squad frag counts.',
    rules: [
      'Mobile devices only; emulators, triggers, and iPad players are prohibited.',
      'Players must use official game client with anti-cheat verification.',
      'Standard esports point distribution (Placement points + Kill points).',
      'All players must join the Discord lobby 15 minutes before match start.'
    ],
    nonTechnicalCoordinator: 'Shivam Chandra Poojary',
    facultyCoordinator: 'Mr Aboobakkar Siddiq',
    studentCoordinator: 'Ishaq',
    studentSubCoordinators: ['Abdul Basith', 'Muhammed Hashir', 'Fajar K T'],
    coordinators: [
      { role: 'Non-Technical Coordinator', name: 'Shivam Chandra Poojary', contact: 'Overall Non-Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mr Aboobakkar Siddiq', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Ishaq', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Abdul Basith, Muhammed Hashir, Fajar K T', contact: 'Coordinators' }
    ]
  },
  {
    id: 'mini-militia',
    title: 'MINI MILITIA',
    tagline: '2D Multiplayer Jetpack Combat Championship',
    category: 'non-tech',
    typeTag: 'Online Games',
    icon: 'gamepad-2',
    teamSize: 'Per Team (4 Members)',
    venue: 'Gaming Lounge 104',
    timing: 'Day 3, 02:00 PM',
    cardImage: 'events/minimilitia1.jpg',
    modalImage: 'events/minimilitia2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSen50AjjBn9DcLwOpVM_lcPk5hnfk-BKueOYXELvXHQLI0f2Q/viewform?usp=publish-editor',
    shortDesc: 'Classic retro mayhem! Dual-stick shooter arena duels with jetpacks, snipers, and rocket launchers across Outpost and Catacombs maps.',
    fullDesc: 'Relive the golden era of local multiplayer! Fast-paced Deathmatch and Team Deathmatch tournaments on local Wi-Fi / private server. Knockouts lead to an electric grand final.',
    rules: [
      'Original vanilla Mini Militia APK required; modded or rooted versions barred.',
      '5-minute match rounds on standard tournament maps (Outpost / Catacombs).',
      'Highest kill count at the end of the round advances.',
      'Referees oversee gameplay in the designated Wi-Fi zone.'
    ],
    nonTechnicalCoordinator: 'Shivam Chandra Poojary',
    facultyCoordinator: 'Mr Aboobakkar Siddiq',
    studentCoordinator: 'Tahir ahmad',
    studentSubCoordinators: ['Muhammed Fadhi', 'Imran Ahmad Yaqub', 'Shebin Basheer'],
    coordinators: [
      { role: 'Non-Technical Coordinator', name: 'Shivam Chandra Poojary', contact: 'Overall Non-Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mr Aboobakkar Siddiq', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Tahir ahmad', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Muhammed Fadhi, Imran Ahmad Yaqub, Shebin Basheer', contact: 'Coordinators' }
    ]
  },
  {
    id: 'e-football',
    title: 'E FOOTBALL',
    tagline: 'Virtual Soccer Championship 1v1 Clash',
    category: 'non-tech',
    typeTag: 'Online Games',
    icon: 'gamepad-2',
    teamSize: 'Per Team (2 Members)',
    venue: 'Gaming Lounge 105',
    timing: 'Day 3, 03:30 PM',
    cardImage: 'events/efootball1.jpg',
    modalImage: 'events/efootball2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://forms.gle/MF8egaeRz12UMrEJ7',
    shortDesc: 'Show off your virtual pitch tactics, skill moves, and set-pieces in intense 1v1 knockout matches on eFootball 2026.',
    fullDesc: 'Competitive digital football tournament! Players battle head-to-head in single-elimination tournament brackets with authentic club authentic rosters and standard competitive match settings.',
    rules: [
      'Match settings: 6-minute regular time, Extra Time and Penalties enabled.',
      'Authentic Club / National Teams with standard player attributes.',
      'Lag / connection loss handled by match restart at prevailing scoreline.',
      'Decision of the Tournament Referee is final and binding.'
    ],
    nonTechnicalCoordinator: 'Shivam Chandra Poojary',
    facultyCoordinator: 'Mr Aboobakkar Siddiq',
    studentCoordinator: 'Ayan',
    studentSubCoordinators: ['Mashuq', 'Nihal Noorudin Othiyil', 'Muhammed Sabeeh Ashraf'],
    coordinators: [
      { role: 'Non-Technical Coordinator', name: 'Shivam Chandra Poojary', contact: 'Overall Non-Tech Head' },
      { role: 'Faculty Coordinator', name: 'Mr Aboobakkar Siddiq', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Ayan', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Mashuq, Nihal Noorudin Othiyil, Muhammed Sabeeh Ashraf', contact: 'Coordinators' }
    ]
  },

  // ==========================================
  // SPECIAL EVENTS
  // ==========================================
  {
    id: 'reel-making',
    title: 'REEL MAKING',
    tagline: 'Fest Moments, Visual Editing & Creative Cinematics Clash',
    category: 'special',
    typeTag: 'Special Event',
    icon: 'camera',
    teamSize: 'Individual / Duo',
    venue: 'Campus Wide / Media Center',
    timing: 'Day 3 (Submissions close Day 3, 03:00 PM)',
    cardImage: 'events/reel1.jpg',
    modalImage: 'events/reel2.jpg',
    isComingSoon: false,
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfDGx-SVujeNuYIhyy1KZLNRsZhg34j3Z0QNbwz2IgghRCXsQ/viewform?usp=publish-editor',
    shortDesc: 'Shoot, edit, and publish high-energy creative vertical reels capturing the vibrant energy, cyber tech moments, and competitive spirit of IONITIX 2026.',
    fullDesc: 'Capture the essence and electrifying atmosphere of IONITIX 2026! Participants create 30 to 60-second vertical reels (Instagram format) featuring dynamic transitions, event highlights, tech showcases, and creative visual storytelling. Top viral and creative entries will be awarded on stage during the Grand Valedictory.',
    rules: [
      'Reel format: Vertical 9:16 (1080x1920) between 30 and 60 seconds duration.',
      'Must tag official handle @ionitix.official and use official hashtag #IONITIX2026.',
      'Judged on Creative Visual Editing (35%), Storytelling & Vibe (35%), and Engagement/Reach (30%).',
      'Footage must be captured strictly within the fest premises on Day 3.'
    ],
    facultyCoordinator: 'Prof. Allwin Jacob',
    studentCoordinator: 'Adnan Ashraf',
    studentSubCoordinators: ['Muhammed Razi', 'Razik'],
    coordinators: [
      { role: 'Special Event Faculty Coordinator', name: 'Prof. Allwin Jacob', contact: 'Dept. of CSE-IOT' },
      { role: 'Student Coordinator', name: 'Adnan Ashraf', contact: 'Student Lead' },
      { role: 'Student Sub-coordinators', name: 'Muhammed Razi, Razik', contact: 'Coordinators' }
    ]
  }
];

// Backward compatibility alias
const IONITIXS_EVENTS = IONITIX_EVENTS;

// Helper to get event by ID
function getEventById(id) {
  return IONITIX_EVENTS.find(e => e.id === id) || null;
}
