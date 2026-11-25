import type {
  KitchenHotspot,
  StaffProfile,
  StorageCompartmentEnv,
  StorageItem,
  SubtopicCode,
} from '../types/game';

/**
 * LEVEL 1 DATASET — Subtopic 2.2: Food Handling (Personal Hygiene & Attire)
 * 6 Staff Profiles: 3 Compliant (pass), 3 Non-Compliant (reject)
 */
export const level1Staff: StaffProfile[] = [
  {
    id: 'staff-1',
    staffCode: 'FH-0142',
    name: 'Amirul Hakim Azizi',
    role: 'Hot Line Station Chef',
    subtopic: '2.2',
    category: 'pakaian_pengendali',
    avatar: {
      gender: 'male',
      skinTone: '#e2b48f',
      hairColor: '#1f2937',
      shirtColor: '#f8fafc',
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'No jewelry worn',
    gloveStatus: 'clean',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 420,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes: 'Fit for duty. No fever, cough, skin infection, or open wounds.',
    correctDecision: 'pass',
    violationOptions: [
      'Missing hairnet / head covering',
      'Expired Typhoid vaccination card',
      'Wearing jewelry while handling food',
    ],
    correctViolationIndex: -1,
    explanation:
      'Amirul meets all MOH food handler standards: clean light-colored apron, proper hairnet, closed non-slip shoes, zero jewelry, and valid Typhoid vaccination plus Food Handler Training (SLPM) certification.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Regulations 30, 31 & 32, Food Hygiene Regulations 2009',
  },
  {
    id: 'staff-2',
    staffCode: 'FH-0187',
    name: 'Nurul Aina Roslan',
    role: 'Food Prep Assistant',
    subtopic: '2.2',
    category: 'pakaian_pengendali',
    avatar: {
      gender: 'female',
      skinTone: '#ecc2a0',
      hairColor: '#27201c',
      shirtColor: '#f1f5f9',
      hijab: false,
    },
    apron: true,
    apronClean: true,
    hairnet: false,
    jewelry: true,
    jewelryDetail: 'Wearing gemstone ring & gold bangle',
    gloveStatus: 'none',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 310,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes: 'Healthy. No symptoms of contagious illness.',
    correctDecision: 'reject',
    violationOptions: [
      'Missing hairnet & wearing jewelry (ring and bangle)',
      'Expired Typhoid vaccination card',
      'Wearing open-toe slippers inside the kitchen',
    ],
    correctViolationIndex: 0,
    explanation:
      'Nurul Aina violates attire and personal hygiene standards by not wearing a hairnet (risk of hair falling into food) and wearing a ring and bangle, which trap bacteria and risk physical contamination.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Regulations 32 & 33, Food Hygiene Regulations 2009',
  },
  {
    id: 'staff-3',
    staffCode: 'FH-0205',
    name: 'Faizal Kamaruddin',
    role: 'Morning Shift Cook',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    avatar: {
      gender: 'male',
      skinTone: '#c89268',
      hairColor: '#111827',
      shirtColor: '#f8fafc',
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'No jewelry worn',
    gloveStatus: 'clean',
    footwear: 'slippers',
    typhoidVaccineValid: false,
    typhoidExpiryOffsetDays: -45,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes:
      'Typhoid vaccination expired 45 days ago. Wearing outdoor rubber slippers.',
    correctDecision: 'reject',
    violationOptions: [
      'Uncovered open wound on finger',
      'Expired Typhoid vaccination & wearing open slippers',
      'Not wearing an apron while preparing food',
    ],
    correctViolationIndex: 1,
    explanation:
      'All food handlers must hold a valid Typhoid vaccination (renewed every 3 years) to prevent Salmonella typhi transmission. Closed, slip-resistant footwear is also mandatory in commercial kitchens.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Regulation 31 (Typhoid) & Regulation 32 (Footwear), FHR 2009',
  },
  {
    id: 'staff-4',
    staffCode: 'FH-0221',
    name: 'Kavitha Subramaniam',
    role: 'Pastry & Dessert Assistant',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    avatar: {
      gender: 'female',
      skinTone: '#b0744f',
      hairColor: '#171717',
      shirtColor: '#f8fafc',
      hijab: false,
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'No jewelry, short & clean fingernails',
    gloveStatus: 'clean',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 580,
    slpmCertValid: true,
    hasOpenWound: true,
    cutsCovered: true,
    healthNotes:
      'Minor scratch on index finger is securely sealed with a bright blue waterproof plaster and covered with a clean disposable glove.',
    correctDecision: 'pass',
    violationOptions: [
      'Open wound not covered with waterproof plaster',
      'Dirty and torn disposable gloves',
      'Missing Food Handler Training (SLPM) certificate',
    ],
    correctViolationIndex: -1,
    explanation:
      'Kavitha is cleared for kitchen duty! A minor cut properly sealed with a brightly colored (blue) waterproof bandage and protected with a clean disposable glove fully complies with MOH food safety rules.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Regulation 33 (Wound Protection & Personal Hygiene), FHR 2009',
  },
  {
    id: 'staff-5',
    staffCode: 'FH-0249',
    name: 'Danial Chong Wei Liang',
    role: 'Butchery & Prep Handler',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    avatar: {
      gender: 'male',
      skinTone: '#f1cfb2',
      hairColor: '#1f2937',
      shirtColor: '#f8fafc',
    },
    apron: true,
    apronClean: false,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'No jewelry worn',
    gloveStatus: 'dirty',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 190,
    slpmCertValid: true,
    hasOpenWound: true,
    cutsCovered: false,
    healthNotes:
      'Uncovered open cut on right thumb without a plaster. Apron is heavily grease-stained and disposable gloves are visibly soiled.',
    correctDecision: 'reject',
    violationOptions: [
      'Expired Typhoid vaccination card',
      'Uncovered open wound, soiled gloves & stained apron',
      'Wearing rings and bracelets',
    ],
    correctViolationIndex: 1,
    explanation:
      'An uncovered wound can transfer Staphylococcus aureus directly into food. A grease-stained apron and unchanged soiled disposable gloves also pose a serious cross-contamination risk.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Regulations 32 & 33, Food Hygiene Regulations 2009',
  },
  {
    id: 'staff-6',
    staffCode: 'FH-0274',
    name: 'Siti Hajar Mohamad',
    role: 'Plating & Packaging Supervisor',
    subtopic: '2.2',
    category: 'pakaian_pengendali',
    avatar: {
      gender: 'female',
      skinTone: '#ddb08c',
      hairColor: '#1f2937',
      shirtColor: '#f8fafc',
      hijab: true,
    },
    apron: true,
    apronClean: true,
    hairnet: true,
    jewelry: false,
    jewelryDetail: 'No jewelry or wristwatch',
    gloveStatus: 'clean',
    footwear: 'closed_shoes',
    typhoidVaccineValid: true,
    typhoidExpiryOffsetDays: 710,
    slpmCertValid: true,
    hasOpenWound: false,
    cutsCovered: true,
    healthNotes:
      'Headscarf tucked neatly with hairnet, clean bright apron, closed non-slip shoes, and up-to-date health records.',
    correctDecision: 'pass',
    violationOptions: [
      'Wearing open-toe slippers',
      'Dirty, unwashed apron',
      'Expired Typhoid vaccination card',
    ],
    correctViolationIndex: -1,
    explanation:
      'Siti Hajar meets every MOH food handler hygiene requirement. Clean light-colored attire makes dirt easy to spot, and wearing zero jewelry prevents physical and microbial contamination.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Regulations 30, 31 & 32, Food Hygiene Regulations 2009',
  },
];

/**
 * LEVEL 2 DATASET — Subtopic 2.1 (Kitchen Hygiene) & 2.2 (Food Handling)
 * 8 Interactive Hotspots across 4 Commercial Kitchen Zones (6 violations, 2 compliant)
 */
export const level2KitchenHotspots: KitchenHotspot[] = [
  {
    id: 'hs-1',
    pinNumber: 1,
    x: 15,
    y: 66,
    zone: 'cuci',
    zoneLabel: 'Washing Zone',
    title: 'Clogged & Foul-Smelling Grease Trap',
    description:
      'The under-sink grease trap is overflowing with congealed fat, trapped food debris, and stagnant wastewater.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'What is the main risk and proper corrective action for this clogged grease trap?',
    options: [
      'Attracts pests (cockroaches/rodents) & blocks drainage — must be cleaned and maintained on a strict daily schedule.',
      'Pour cold water down the drain so the grease hardens and washes into the public sewer.',
      'No sanitation violation as long as the upper sink basin looks clean.',
    ],
    correctOptionIndex: 0,
    explanation:
      'An unmaintained grease trap accumulates rancid fats, causes foul odors, breeds bacteria, and attracts pests such as cockroaches and rodents. It must be cleaned and serviced regularly per MOH guidelines.',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.1 • Drainage Systems & Grease Trap Maintenance',
  },
  {
    id: 'hs-2',
    pinNumber: 2,
    x: 24,
    y: 34,
    zone: 'cuci',
    zoneLabel: 'Washing Zone',
    title: 'Dedicated Staff Handwash Basin',
    description:
      'A separate handwashing sink distinct from the food-prep sink, stocked with liquid antibacterial soap, disposable paper towels, and a 7-step handwashing guide.',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    isViolation: false,
    question: 'How should you evaluate this handwashing station?',
    options: [
      'Violation — disposable paper towels should be replaced with a shared cloth towel.',
      'Compliant with MOH standards — dedicated handwash sink equipped with liquid soap and disposable towels.',
      'Violation — handwashing should share the same basin used to rinse raw poultry.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Correct! Food premises must provide a dedicated handwashing basin separate from raw-food washing sinks, supplied with liquid soap and single-use paper towels (avoiding shared cloth towels that harbor bacteria).',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Handwashing Facilities & Food Handler Hygiene',
  },
  {
    id: 'hs-3',
    pinNumber: 3,
    x: 42,
    y: 48,
    zone: 'penyediaan',
    zoneLabel: 'Prep Zone',
    title: 'Raw Chicken Next to Cooked Rice',
    description:
      'An open tray of raw chicken dripping liquid sits immediately beside an uncovered tray of cooked steamed rice on the same prep counter.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question: 'What sanitation violation is occurring on this prep counter?',
    options: [
      'Physical contamination caused by low room temperature.',
      'Cross-contamination risk between raw meat and ready-to-eat cooked food — must be strictly separated and covered.',
      'No violation because both items will be served within 30 minutes.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Raw poultry juices often carry pathogens such as Salmonella and Campylobacter, which can contaminate ready-to-eat rice. Raw ingredients and cooked food must always be separated and tightly covered.',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.1 • Preventing Cross-Contamination in Food Prep',
  },
  {
    id: 'hs-4',
    pinNumber: 4,
    x: 52,
    y: 65,
    zone: 'penyediaan',
    zoneLabel: 'Prep Zone',
    title: 'Cracked & Moldy Wooden Cutting Board',
    description:
      'A deeply cracked wooden chopping board shows dark mold lines and is used interchangeably for raw meat and fresh salad vegetables.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'What is the best corrective action according to MOH kitchen sanitation standards?',
    options: [
      'Rinse with cold tap water and leave it in the sun for 10 minutes.',
      'Discard the cracked board and replace it with color-coded polyethylene boards (e.g., red for raw meat, green for vegetables).',
      'Flip the cutting board over so the cracked side faces downward.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Deep cracks in wooden cutting boards trap moisture, meat juices, and bacteria that cannot be sanitized effectively. Commercial kitchens should use separate color-coded polyethylene cutting boards for raw and ready-to-eat items.',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.1 • Utensil Care & Color-Coded Cutting Boards',
  },
  {
    id: 'hs-5',
    pinNumber: 5,
    x: 68,
    y: 25,
    zone: 'memasak',
    zoneLabel: 'Cooking Zone',
    title: 'Grease-Caked & Dripping Exhaust Hood',
    description:
      'The exhaust hood filters above the gas range are coated in thick black grease that is starting to drip toward an open soup pot below.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'Why is an uncleaned exhaust hood considered a serious commercial kitchen violation?',
    options: [
      'Dirty grease can drip into cooking food (contamination) and poses a major kitchen fire hazard.',
      'It only affects appearance and has no impact on food safety.',
      'A layer of grease helps trap steam from entering the ventilation duct.',
    ],
    correctOptionIndex: 0,
    explanation:
      'Accumulated grease in exhaust hoods can drip oxidized oil directly into food (chemical/physical contamination), reduce ventilation efficiency, and create a severe fire hazard above open flames.',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.1 • Workspace Cleanliness, Ventilation & Kitchen Safety',
  },
  {
    id: 'hs-6',
    pinNumber: 6,
    x: 75,
    y: 54,
    zone: 'memasak',
    zoneLabel: 'Cooking Zone',
    title: 'Chef Tasting Curry Directly From Cooking Ladle',
    description:
      'A cook scoops curry with the main stirring ladle, tastes directly from it, and dips the same ladle back into the pot.',
    subtopic: '2.2',
    category: 'kebersihan_diri',
    isViolation: true,
    question:
      'What is the hygienic method for tasting food during cooking?',
    options: [
      'Blow on the main ladle first to cool it down and kill germs before tasting.',
      'Use the two-spoon method (transfer a small sample to a clean tasting spoon and wash it after each taste).',
      'Allow it because boiling curry instantly kills all mouth bacteria.',
    ],
    correctOptionIndex: 1,
    explanation:
      'Dipping a saliva-contaminated ladle back into a pot transfers oral bacteria throughout the entire dish. Always use the two-spoon method or a clean single-use spoon for every taste test.',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.2 • Good Food Handling Practices During Cooking',
  },
  {
    id: 'hs-7',
    pinNumber: 7,
    x: 61,
    y: 74,
    zone: 'memasak',
    zoneLabel: 'Cooking Zone',
    title: 'Clean Elevated Stainless Steel Utensil Rack',
    description:
      'Sanitized stainless steel pots and pans have been air-dried and stored inverted on an open rack raised 30 cm off the floor.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: false,
    question:
      'What is the compliance status of this utensil storage rack?',
    options: [
      'Violation — cookware must be wiped dry with a damp cotton cloth before storage.',
      'Violation — heavy pots must be placed directly on the floor to prevent falling.',
      'Compliant with MOH standards — utensils are air-dried, stored inverted, and kept at least 15 cm off the floor.',
    ],
    correctOptionIndex: 2,
    explanation:
      'Well done! Air-drying avoids re-contamination from dishcloths, storing pots inverted prevents dust or pests from entering, and keeping racks ≥15 cm above the floor allows proper floor sanitation.',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.1 • Cleaning, Sanitizing & Storing Kitchen Utensils',
  },
  {
    id: 'hs-8',
    pinNumber: 8,
    x: 89,
    y: 66,
    zone: 'sisa',
    zoneLabel: 'Waste Zone',
    title: 'Overflowing Lidless Trash Bin Without Foot Pedal',
    description:
      'The kitchen waste bin has no lid or foot pedal, is unlined, and overflowing food scraps are attracting flies.',
    subtopic: '2.1',
    category: 'sanitasi_dapur',
    isViolation: true,
    question:
      'What are the required features of a compliant kitchen waste bin?',
    options: [
      'Tight-fitting lid, foot-pedal operated, lined with a plastic bag, and emptied once ¾ full.',
      'Completely open top so staff never have to touch a lid with their hands.',
      'Emptied once per week to reduce plastic bag usage.',
    ],
    correctOptionIndex: 0,
    explanation:
      'Kitchen bins must have a tight-fitting lid and foot pedal so handlers avoid contaminating their hands, be lined with durable plastic bags to prevent leaks, and be emptied regularly before overflowing to deter flies and rodents.',
    textbookReference:
      'KSSM SRT Form 5 Subtopic 2.1 • Waste Management & Pest Control',
  },
];

/**
 * LEVEL 3 DATASET — Subtopic 2.3: Food Storage, Cold-Chain & FIFO
 */
export const level3Compartments: StorageCompartmentEnv[] = [
  {
    id: 'chiller',
    name: 'Chiller Unit',
    englishName: 'Peti Sejuk',
    ambientTemp: 3,
    idealTempMin: 0,
    idealTempMax: 4,
    idealRangeLabel: '0°C to 4°C',
    isAmbientCompliant: true,
    ambientNote: 'Ambient temperature is safely within the chiller range (below 5°C).',
  },
  {
    id: 'freezer',
    name: 'Deep Freezer',
    englishName: 'Peti Sejuk Beku',
    ambientTemp: -18,
    idealTempMin: -24,
    idealTempMax: -18,
    idealRangeLabel: '≤ -18°C',
    isAmbientCompliant: true,
    ambientNote: 'Ambient freezer temperature complies with MOH frozen storage rules.',
  },
  {
    id: 'dry_store',
    name: 'Dry Store',
    englishName: 'Stor Kering',
    ambientTemp: 19,
    idealTempMin: 10,
    idealTempMax: 21,
    idealRangeLabel: '10°C to 21°C',
    isAmbientCompliant: true,
    ambientNote: 'Cool, dry, well-ventilated storage environment (≤ 21°C).',
  },
];

export const level3StorageItems: StorageItem[] = [
  {
    id: 'store-1',
    name: 'Uncovered Raw Chicken (Top Shelf)',
    categoryLabel: 'Raw Poultry',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'chiller',
    currentTemp: 3,
    idealTempMin: 0,
    idealTempMax: 4,
    packagingCondition: 'uncovered',
    packagingLabel: 'Open container with raw blood/juices dripping',
    placementShelf: 'top',
    placementNote:
      'Placed on the TOP SHELF, directly above cooked soup and ready-to-eat rice on the middle shelf!',
    dateReceivedOffsetDays: -1,
    expiryOffsetDays: 2,
    fifoComparisonNote: 'Single batch — received yesterday.',
    isFIFOCompliant: true,
    isSafe: false,
    violationOptions: [
      'Cross-contamination — uncovered raw chicken stored above cooked food',
      'Chiller temperature exceeds the 60°C danger zone ceiling',
      'Product expired more than 30 days ago',
    ],
    correctViolationIndex: 0,
    defectReason:
      'Uncovered raw chicken on the top shelf drips raw juices onto ready-to-eat food below. Cooked and ready-to-eat items must always go on the top shelf, while tightly sealed raw meat belongs on the bottom shelf.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.3 • Chiller Shelf Hierarchy & Cross-Contamination Prevention',
  },
  {
    id: 'store-2',
    name: 'Sealed Pasteurized Milk & Covered Pastries',
    categoryLabel: 'Dairy & Ready-to-Eat',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'chiller',
    currentTemp: 3,
    idealTempMin: 0,
    idealTempMax: 4,
    packagingCondition: 'intact',
    packagingLabel: 'Tightly sealed, date-labeled & airtight',
    placementShelf: 'middle',
    placementNote:
      'Stored neatly on the MIDDLE SHELF, separated from any raw meat storage below.',
    dateReceivedOffsetDays: -2,
    expiryOffsetDays: 6,
    fifoComparisonNote: 'Older batch placed in front for first use (FIFO followed).',
    isFIFOCompliant: true,
    isSafe: true,
    violationOptions: [
      'Core temperature exceeds 4°C',
      'Damaged and uncovered packaging',
      'Improper shelf placement',
    ],
    correctViolationIndex: -1,
    defectReason:
      'Safe to store! Core temperature of +3°C is within the safe chiller range (0°C–4°C), packaging is sealed and labeled, expiry date is valid, and FIFO rotation is respected.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.3 • Chiller Temperature Control (0°C–4°C) & Labeling',
  },
  {
    id: 'store-3',
    name: 'Partially Thawed Frozen Sea Bass (-5°C)',
    categoryLabel: 'Frozen Seafood',
    subtopic: '2.3',
    category: 'suhu_stor',
    compartment: 'freezer',
    currentTemp: -5,
    idealTempMin: -24,
    idealTempMax: -18,
    packagingCondition: 'damaged',
    packagingLabel: 'Torn plastic wrap, large ice crystals & soft texture',
    placementShelf: 'middle',
    placementNote: 'Stored right beside a frequently opened freezer door.',
    dateReceivedOffsetDays: -14,
    expiryOffsetDays: 45,
    fifoComparisonNote: 'Core fish temperature rose to -5°C (outside ≤ -18°C zone).',
    isFIFOCompliant: true,
    isSafe: false,
    violationOptions: [
      'Temperature too warm (-5°C thawing zone, above -18°C) & torn packaging',
      'Stored in dry store without elevated racks',
      'Cooked food mixed with dented canned goods',
    ],
    correctViolationIndex: 0,
    defectReason:
      'Frozen food must stay at -18°C or colder. At -5°C, partial thawing occurs, causing freezer burn, texture degradation, and rapid bacterial growth if refrozen.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.3 • Cold-Chain Integrity & Frozen Storage (≤ -18°C)',
  },
  {
    id: 'store-4',
    name: 'Vacuum-Sealed Frozen Beef Fillet',
    categoryLabel: 'Frozen Meat',
    subtopic: '2.3',
    category: 'suhu_stor',
    compartment: 'freezer',
    currentTemp: -19,
    idealTempMin: -24,
    idealTempMax: -18,
    packagingCondition: 'intact',
    packagingLabel: 'Intact vacuum seal, airtight & labeled with received date',
    placementShelf: 'bottom',
    placementNote: 'Neatly arranged on the BOTTOM SHELF with airflow clearance.',
    dateReceivedOffsetDays: -10,
    expiryOffsetDays: 120,
    fifoComparisonNote: 'Earlier stock rotated to the front (FIFO compliant).',
    isFIFOCompliant: true,
    isSafe: true,
    violationOptions: [
      'Temperature above -18°C',
      'Torn vacuum packaging',
      'FIFO rotation violation',
    ],
    correctViolationIndex: -1,
    defectReason:
      'Safe to store! The beef is properly vacuum-sealed at -19°C (≤ -18°C), clearly labeled with dates, and follows FIFO stock rotation.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.3 • Frozen Food Storage & Cold-Chain Management',
  },
  {
    id: 'store-5',
    name: 'Dented & Rusted Sardine Cans on Floor',
    categoryLabel: 'Canned Food',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'dry_store',
    currentTemp: 19,
    idealTempMin: 10,
    idealTempMax: 21,
    packagingCondition: 'damaged',
    packagingLabel: 'Deeply dented can seams & visible surface rust',
    placementShelf: 'floor',
    placementNote:
      'Carton is stacked DIRECTLY ON THE FLOOR with zero pallet clearance (0 cm).',
    dateReceivedOffsetDays: -60,
    expiryOffsetDays: 180,
    fifoComparisonNote: 'Expiry date is still valid, but container integrity is compromised.',
    isFIFOCompliant: true,
    isSafe: false,
    violationOptions: [
      'Dented/rusted cans (botulism risk) & stored directly on the floor (< 15 cm)',
      'Dry store temperature is too cold below 0°C',
      'Raw chicken dripping onto canned items',
    ],
    correctViolationIndex: 0,
    defectReason:
      'Cans with dented seams or rust risk micro-leaks and Clostridium botulinum toxin contamination. Additionally, all dry goods must be stored at least 15 cm (6 inches) off the floor and away from walls.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.3 • Dry Storage Rules (15 cm Floor Clearance & Can Inspection)',
  },
  {
    id: 'store-6',
    name: 'Wheat Flour & Condensed Milk (Reversed Stock Order)',
    categoryLabel: 'Dry Packaged Goods',
    subtopic: '2.3',
    category: 'penyimpanan_makanan',
    compartment: 'dry_store',
    currentTemp: 19,
    idealTempMin: 10,
    idealTempMax: 21,
    packagingCondition: 'intact',
    packagingLabel:
      'Packaging intact, but older rear batch was trapped behind new stock and EXPIRED',
    placementShelf: 'middle',
    placementNote:
      'Newer batch (expires in +180 days) was pushed to the FRONT, trapping the older batch at the BACK — expired 12 days ago!',
    dateReceivedOffsetDays: -95,
    expiryOffsetDays: -12,
    fifoComparisonNote:
      'FIFO VIOLATION: Older stock was not rotated to the front and has passed its expiry date.',
    isFIFOCompliant: false,
    isSafe: false,
    violationOptions: [
      'Chiller temperature rose above 5°C',
      'FIFO (First In, First Out) violation causing older stock to expire',
      'Staff failed to wear a hairnet while stocking shelves',
    ],
    correctViolationIndex: 1,
    defectReason:
      'The FIFO (First In, First Out) rule was violated! Placing new stock in front traps older stock in the back until it expires. Expired food must be seized and discarded immediately.',
    kssmReference:
      'KSSM SRT Form 5 Subtopic 2.3 • Stock Rotation & FIFO (First In, First Out) Rules',
  },
];

export const TOTAL_GAME_ITEMS =
  level1Staff.length + level2KitchenHotspots.length + level3StorageItems.length;

export function getSubtopicTotals(): Record<SubtopicCode, number> {
  const totals: Record<SubtopicCode, number> = { '2.1': 0, '2.2': 0, '2.3': 0 };
  for (const item of level1Staff) totals[item.subtopic] += 1;
  for (const item of level2KitchenHotspots) totals[item.subtopic] += 1;
  for (const item of level3StorageItems) totals[item.subtopic] += 1;
  return totals;
}
