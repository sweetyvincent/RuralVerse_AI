// Molecule & Science Experiment database with 3D coordinates and custom models
// Includes Chemistry molecules, Physics mechanics/optics/astronomy, and Biology structures

export const ELEMENT_COLORS = {
  H: '#ffffff',
  C: '#404040',
  O: '#ff0000',
  N: '#3b82f6',
  S: '#facc15',
  P: '#fb923c',
  Cl: '#22c55e',
  F: '#a3e635',
  Br: '#a52a2a',
  I: '#9333ea',
  Na: '#7c3aed',
  K: '#8b5cf6',
  Ca: '#64748b',
  Fe: '#d97706',
  Mg: '#059669',
};

export const ELEMENT_RADII = {
  H: 0.25,
  C: 0.4,
  O: 0.38,
  N: 0.36,
  S: 0.5,
  P: 0.45,
  Cl: 0.45,
  F: 0.3,
  Br: 0.5,
  I: 0.55,
  Na: 0.5,
  K: 0.55,
  Ca: 0.5,
  Fe: 0.45,
  Mg: 0.45,
};

// Helper to generate benzene ring atoms
const benzeneRing = (cx = 0, cy = 0, cz = 0, r = 1.4) => {
  const atoms = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6;
    atoms.push({
      element: 'C',
      position: [cx + r * Math.cos(angle), cy, cz + r * Math.sin(angle)],
    });
  }
  return atoms;
};

const benzeneHydrogens = (cx = 0, cy = 0, cz = 0, rC = 1.4, rH = 2.4, skip = []) => {
  const atoms = [];
  for (let i = 0; i < 6; i++) {
    if (skip.includes(i)) continue;
    const angle = (i * Math.PI * 2) / 6;
    atoms.push({
      element: 'H',
      position: [cx + rH * Math.cos(angle), cy, cz + rH * Math.sin(angle)],
    });
  }
  return atoms;
};

const benzeneBonds = (startIdx = 0) => {
  const bonds = [];
  for (let i = 0; i < 6; i++) {
    bonds.push({ from: startIdx + i, to: startIdx + ((i + 1) % 6), order: i % 2 === 0 ? 2 : 1 });
  }
  return bonds;
};

export const molecules = [
  // ===================== PHYSICS & ASTRONOMY =====================
  {
    id: 'solar-system',
    name: 'Solar System',
    formula: 'Sun & Planets',
    aliases: ['sun', 'planets', 'earth', 'astronomy', 'orbit', 'solar'],
    category: 'Physics',
    type: 'solar-system',
    description: 'Explore the celestial orbits of planets around the Sun in our Solar System.',
    facts: ['Sun mass: 99.86% of solar system', '8 major planets', 'Gravitational orbits'],
    atoms: [{ element: 'Fe', position: [0,0,0] }],
    bonds: [],
  },
  {
    id: 'simple-pendulum',
    name: 'Simple Pendulum',
    formula: 'T = 2π√(L/g)',
    aliases: ['pendulum', 'gravity', 'oscillation', 'period', 'physics'],
    category: 'Physics',
    type: 'pendulum',
    description: 'Simulate simple harmonic motion and measure periodic oscillation of a pendulum.',
    facts: ['Period depends on length (L)', 'Independent of mass', 'Harmonic oscillator'],
    atoms: [{ element: 'Fe', position: [0,0,0] }],
    bonds: [],
  },
  {
    id: 'prism-refraction',
    name: 'Light Refraction (Prism)',
    formula: 'n = c / v',
    aliases: ['prism', 'refraction', 'light', 'rainbow', 'optics', 'spectrum'],
    category: 'Physics',
    type: 'prism',
    description: 'See how white light bends and splits into a rainbow spectrum through a triangular glass prism.',
    facts: ['Snell\'s Law of Refraction', 'Dispersion of light', 'Wavelength separation'],
    atoms: [{ element: 'Fe', position: [0,0,0] }],
    bonds: [],
  },

  // ===================== BIOLOGY =====================
  {
    id: 'dna-helix',
    name: 'DNA Double Helix',
    formula: 'Deoxyribonucleic Acid',
    aliases: ['dna', 'genetics', 'gene', 'helix', 'double helix', 'chromosome'],
    category: 'Biology',
    type: 'dna',
    description: 'Explore the iconic double helix molecular structure of DNA holding genetic instructions.',
    facts: ['Discovered by Watson & Crick', 'Base pairs: A-T and C-G', 'Antiparallel strands'],
    atoms: [{ element: 'C', position: [0,0,0] }],
    bonds: [],
  },
  {
    id: 'animal-cell',
    name: 'Cell Structure & Organelles',
    formula: 'Eukaryotic Cell',
    aliases: ['cell', 'organelle', 'nucleus', 'biology', 'mitochondria', 'membrane'],
    category: 'Biology',
    type: 'cell',
    description: 'Examine cellular structures including nucleus, nucleolus, mitochondria, and cell membrane.',
    facts: ['Basic unit of life', 'Contains membrane-bound nucleus', 'Mitochondria = Powerhouse'],
    atoms: [{ element: 'O', position: [0,0,0] }],
    bonds: [],
  },

  // ===================== CHEMISTRY - BASIC =====================
  {
    id: 'water',
    name: 'Water',
    formula: 'H₂O',
    aliases: ['h2o', 'dihydrogen monoxide', 'water molecule'],
    category: 'Inorganic',
    description: 'Water is a polar inorganic compound and the most abundant substance on Earth\'s surface. The bent molecular geometry gives water its unique properties.',
    facts: ['Bond angle: 104.5°', 'Molecular weight: 18.015 g/mol', 'Boiling point: 100°C'],
    atoms: [
      { element: 'O', position: [0, 0, 0] },
      { element: 'H', position: [0.96, -0.59, 0] },
      { element: 'H', position: [-0.96, -0.59, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
    ],
  },
  {
    id: 'methane',
    name: 'Methane',
    formula: 'CH₄',
    aliases: ['ch4', 'natural gas', 'marsh gas'],
    category: 'Organic',
    description: 'Methane is the simplest alkane and the main constituent of natural gas. It has a perfect tetrahedral geometry.',
    facts: ['Bond angle: 109.5°', 'Molecular weight: 16.04 g/mol', 'Tetrahedral shape'],
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'H', position: [0, 1.2, 0] },
      { element: 'H', position: [1.13, -0.4, 0] },
      { element: 'H', position: [-0.57, -0.4, 0.98] },
      { element: 'H', position: [-0.57, -0.4, -0.98] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
  },
  {
    id: 'ammonia',
    name: 'Ammonia',
    formula: 'NH₃',
    aliases: ['nh3', 'azane', 'ammonia molecule'],
    category: 'Inorganic',
    description: 'Ammonia is a compound of nitrogen and hydrogen with a trigonal pyramidal shape. It is widely used in fertilizers.',
    facts: ['Bond angle: 107.8°', 'Molecular weight: 17.03 g/mol', 'Trigonal pyramidal'],
    atoms: [
      { element: 'N', position: [0, 0.4, 0] },
      { element: 'H', position: [0, -0.4, 1.0] },
      { element: 'H', position: [0.87, -0.4, -0.5] },
      { element: 'H', position: [-0.87, -0.4, -0.5] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
    ],
  },
  {
    id: 'carbon-dioxide',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    aliases: ['co2', 'carbonic acid gas', 'dry ice gas'],
    category: 'Inorganic',
    description: 'Carbon dioxide is a linear molecule consisting of a carbon atom double-bonded to two oxygen atoms. It is a greenhouse gas.',
    facts: ['Bond angle: 180°', 'Molecular weight: 44.01 g/mol', 'Linear geometry'],
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [1.6, 0, 0] },
      { element: 'O', position: [-1.6, 0, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
    ],
  },
  {
    id: 'hydrogen-chloride',
    name: 'Hydrochloric Acid',
    formula: 'HCl',
    aliases: ['hcl', 'muriatic acid', 'hydrogen chloride'],
    category: 'Inorganic',
    description: 'Hydrogen chloride is a diatomic molecule. In aqueous solution it forms hydrochloric acid, a strong acid.',
    facts: ['Bond length: 1.27 Å', 'Molecular weight: 36.46 g/mol', 'Linear molecule'],
    atoms: [
      { element: 'H', position: [0.8, 0, 0] },
      { element: 'Cl', position: [-0.5, 0, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
    ],
  },

  // ===================== ORGANIC MOLECULES =====================
  {
    id: 'ethanol',
    name: 'Ethanol',
    formula: 'C₂H₅OH',
    aliases: ['alcohol', 'ethyl alcohol', 'drinking alcohol', 'c2h5oh'],
    category: 'Organic',
    description: 'Ethanol is a simple alcohol found in alcoholic beverages. It is produced by fermentation of sugars by yeasts.',
    facts: ['Molecular weight: 46.07 g/mol', 'Boiling point: 78.37°C', 'Miscible with water'],
    atoms: [
      { element: 'C', position: [-0.7, 0, 0] },
      { element: 'C', position: [0.7, 0, 0] },
      { element: 'O', position: [1.5, 0.9, 0] },
      { element: 'H', position: [2.3, 0.7, 0] },
      { element: 'H', position: [-1.2, 0.9, 0.5] },
      { element: 'H', position: [-1.2, 0.9, -0.5] },
      { element: 'H', position: [-1.2, -0.9, 0] },
      { element: 'H', position: [0.9, -0.5, 0.9] },
      { element: 'H', position: [0.9, -0.5, -0.9] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 },
    ],
  },
  {
    id: 'acetic-acid',
    name: 'Acetic Acid',
    formula: 'CH₃COOH',
    aliases: ['vinegar', 'ethanoic acid', 'ch3cooh'],
    category: 'Organic',
    description: 'Acetic acid is a colourless liquid organic compound. Vinegar is roughly 5-7% acetic acid by volume.',
    facts: ['Molecular weight: 60.05 g/mol', 'Boiling point: 118°C', 'Weak acid (pKa 4.76)'],
    atoms: [
      { element: 'C', position: [-0.8, 0, 0] },
      { element: 'C', position: [0.8, 0, 0] },
      { element: 'O', position: [1.5, 1.0, 0] },
      { element: 'O', position: [1.5, -0.9, 0] },
      { element: 'H', position: [2.4, -0.9, 0] },
      { element: 'H', position: [-1.3, 0.9, 0.5] },
      { element: 'H', position: [-1.3, 0.9, -0.5] },
      { element: 'H', position: [-1.3, -0.9, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 1, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 0, to: 7, order: 1 },
    ],
  },
  {
    id: 'ethylene',
    name: 'Ethylene',
    formula: 'C₂H₄',
    aliases: ['ethene', 'c2h4'],
    category: 'Organic',
    description: 'Ethylene is the simplest alkene. It is widely used in the chemical industry and is produced by plants as a hormone.',
    facts: ['Molecular weight: 28.05 g/mol', 'Planar molecule', 'C=C double bond: 1.34 Å'],
    atoms: [
      { element: 'C', position: [-0.65, 0, 0] },
      { element: 'C', position: [0.65, 0, 0] },
      { element: 'H', position: [-1.3, 0.9, 0] },
      { element: 'H', position: [-1.3, -0.9, 0] },
      { element: 'H', position: [1.3, 0.9, 0] },
      { element: 'H', position: [1.3, -0.9, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
    ],
  },
  {
    id: 'acetylene',
    name: 'Acetylene',
    formula: 'C₂H₂',
    aliases: ['ethyne', 'c2h2', 'welding gas'],
    category: 'Organic',
    description: 'Acetylene is the simplest alkyne with a carbon-carbon triple bond. It is used in welding and cutting metals.',
    facts: ['Molecular weight: 26.04 g/mol', 'Linear molecule', 'C≡C triple bond: 1.20 Å'],
    atoms: [
      { element: 'C', position: [-0.6, 0, 0] },
      { element: 'C', position: [0.6, 0, 0] },
      { element: 'H', position: [-1.7, 0, 0] },
      { element: 'H', position: [1.7, 0, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 3 },
      { from: 0, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 },
    ],
  },

  // ===================== AROMATIC / RING MOLECULES =====================
  {
    id: 'benzene',
    name: 'Benzene',
    formula: 'C₆H₆',
    aliases: ['c6h6', 'benzol', 'aromatic ring'],
    category: 'Organic',
    description: 'Benzene is a fundamental aromatic hydrocarbon with a planar hexagonal ring of six carbon atoms. Its delocalized π electrons make it exceptionally stable.',
    facts: ['Bond angle: 120°', 'Molecular weight: 78.11 g/mol', 'All C-C bonds equal: 1.40 Å'],
    atoms: [
      ...benzeneRing(0, 0, 0, 1.4),
      ...benzeneHydrogens(0, 0, 0, 1.4, 2.5),
    ],
    bonds: [
      ...benzeneBonds(0),
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 },
    ],
  },
  {
    id: 'phenol',
    name: 'Phenol',
    formula: 'C₆H₅OH',
    aliases: ['c6h5oh', 'carbolic acid', 'hydroxybenzene', 'phenic acid'],
    category: 'Organic',
    description: 'Phenol consists of a hydroxyl group (-OH) bonded directly to a benzene ring. It is an important industrial chemical used in plastics, pharmaceuticals, and disinfectants.',
    facts: ['Molecular weight: 94.11 g/mol', 'Melting point: 40.5°C', 'Weakly acidic (pKa 9.95)', 'Used in production of Bakelite'],
    atoms: [
      ...benzeneRing(0, 0, 0, 1.4),
      // OH group on C0 (position 0)
      { element: 'O', position: [2.3, 0, 0] },
      { element: 'H', position: [3.1, 0.5, 0] },
      // Hydrogens on C1-C5 (skip C0)
      ...benzeneHydrogens(0, 0, 0, 1.4, 2.5, [0]),
    ],
    bonds: [
      ...benzeneBonds(0),
      // OH bond
      { from: 0, to: 6, order: 1 },
      { from: 6, to: 7, order: 1 },
      // C-H bonds (C1 to C5)
      { from: 1, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 3, to: 10, order: 1 },
      { from: 4, to: 11, order: 1 },
      { from: 5, to: 12, order: 1 },
    ],
  },
  {
    id: 'toluene',
    name: 'Toluene',
    formula: 'C₆H₅CH₃',
    aliases: ['methylbenzene', 'c7h8', 'toluol'],
    category: 'Organic',
    description: 'Toluene is a mono-substituted benzene with a methyl group. It is a common solvent used in paints and adhesives.',
    facts: ['Molecular weight: 92.14 g/mol', 'Boiling point: 111°C', 'Used as octane booster'],
    atoms: [
      ...benzeneRing(0, 0, 0, 1.4),
      // CH3 group on C0
      { element: 'C', position: [2.4, 0, 0] },
      { element: 'H', position: [3.0, 0.9, 0.3] },
      { element: 'H', position: [3.0, -0.5, 0.7] },
      { element: 'H', position: [3.0, -0.4, -0.8] },
      // Hydrogens on C1-C5
      ...benzeneHydrogens(0, 0, 0, 1.4, 2.5, [0]),
    ],
    bonds: [
      ...benzeneBonds(0),
      { from: 0, to: 6, order: 1 },
      { from: 6, to: 7, order: 1 },
      { from: 6, to: 8, order: 1 },
      { from: 6, to: 9, order: 1 },
      { from: 1, to: 10, order: 1 },
      { from: 2, to: 11, order: 1 },
      { from: 3, to: 12, order: 1 },
      { from: 4, to: 13, order: 1 },
      { from: 5, to: 14, order: 1 },
    ],
  },
  {
    id: 'aniline',
    name: 'Aniline',
    formula: 'C₆H₅NH₂',
    aliases: ['aminobenzene', 'phenylamine', 'c6h5nh2'],
    category: 'Organic',
    description: 'Aniline is an organic compound consisting of a benzene ring attached to an amino group. It is a precursor to many industrial chemicals including dyes.',
    facts: ['Molecular weight: 93.13 g/mol', 'Boiling point: 184°C', 'Used in dye manufacturing'],
    atoms: [
      ...benzeneRing(0, 0, 0, 1.4),
      // NH2 group on C0
      { element: 'N', position: [2.3, 0, 0] },
      { element: 'H', position: [2.9, 0.7, 0.5] },
      { element: 'H', position: [2.9, -0.7, 0.5] },
      // Hydrogens on C1-C5
      ...benzeneHydrogens(0, 0, 0, 1.4, 2.5, [0]),
    ],
    bonds: [
      ...benzeneBonds(0),
      { from: 0, to: 6, order: 1 },
      { from: 6, to: 7, order: 1 },
      { from: 6, to: 8, order: 1 },
      { from: 1, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
      { from: 4, to: 12, order: 1 },
      { from: 5, to: 13, order: 1 },
    ],
  },
  {
    id: 'benzoic-acid',
    name: 'Benzoic Acid',
    formula: 'C₆H₅COOH',
    aliases: ['benzenecarboxylic acid', 'c6h5cooh', 'e210'],
    category: 'Organic',
    description: 'Benzoic acid is an aromatic carboxylic acid. It and its salts are used as food preservatives.',
    facts: ['Molecular weight: 122.12 g/mol', 'Melting point: 122°C', 'Food preservative (E210)'],
    atoms: [
      ...benzeneRing(0, 0, 0, 1.4),
      // COOH group on C0
      { element: 'C', position: [2.4, 0, 0] },
      { element: 'O', position: [3.2, 0.9, 0] },
      { element: 'O', position: [3.0, -0.9, 0] },
      { element: 'H', position: [3.8, -0.7, 0] },
      // Hydrogens on C1-C5
      ...benzeneHydrogens(0, 0, 0, 1.4, 2.5, [0]),
    ],
    bonds: [
      ...benzeneBonds(0),
      { from: 0, to: 6, order: 1 },
      { from: 6, to: 7, order: 2 },
      { from: 6, to: 8, order: 1 },
      { from: 8, to: 9, order: 1 },
      { from: 1, to: 10, order: 1 },
      { from: 2, to: 11, order: 1 },
      { from: 3, to: 12, order: 1 },
      { from: 4, to: 13, order: 1 },
      { from: 5, to: 14, order: 1 },
    ],
  },
  {
    id: 'nitrobenzene',
    name: 'Nitrobenzene',
    formula: 'C₆H₅NO₂',
    aliases: ['c6h5no2', 'oil of mirbane'],
    category: 'Organic',
    description: 'Nitrobenzene is an organic compound with the chemical formula C₆H₅NO₂. It has an almond-like odor.',
    facts: ['Molecular weight: 123.11 g/mol', 'Boiling point: 211°C', 'Precursor to aniline'],
    atoms: [
      ...benzeneRing(0, 0, 0, 1.4),
      // NO2 group on C0
      { element: 'N', position: [2.3, 0, 0] },
      { element: 'O', position: [3.0, 0.8, 0] },
      { element: 'O', position: [3.0, -0.8, 0] },
      // Hydrogens on C1-C5
      ...benzeneHydrogens(0, 0, 0, 1.4, 2.5, [0]),
    ],
    bonds: [
      ...benzeneBonds(0),
      { from: 0, to: 6, order: 1 },
      { from: 6, to: 7, order: 2 },
      { from: 6, to: 8, order: 1 },
      { from: 1, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
      { from: 4, to: 12, order: 1 },
      { from: 5, to: 13, order: 1 },
    ],
  },

  // ===================== IMPORTANT ACIDS =====================
  {
    id: 'sulfuric-acid',
    name: 'Sulfuric Acid',
    formula: 'H₂SO₄',
    aliases: ['h2so4', 'vitriol', 'battery acid', 'oil of vitriol'],
    category: 'Inorganic',
    description: 'Sulfuric acid is a highly corrosive strong mineral acid. It is one of the most important industrial chemicals.',
    facts: ['Molecular weight: 98.08 g/mol', 'Strong diprotic acid', 'Most produced chemical worldwide'],
    atoms: [
      { element: 'S', position: [0, 0, 0] },
      { element: 'O', position: [1.2, 0.8, 0] },
      { element: 'O', position: [-1.2, 0.8, 0] },
      { element: 'O', position: [0.8, -1.0, 0.5] },
      { element: 'O', position: [-0.8, -1.0, -0.5] },
      { element: 'H', position: [1.6, -1.3, 0.5] },
      { element: 'H', position: [-1.6, -1.3, -0.5] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 3, to: 5, order: 1 },
      { from: 4, to: 6, order: 1 },
    ],
  },
  {
    id: 'nitric-acid',
    name: 'Nitric Acid',
    formula: 'HNO₃',
    aliases: ['hno3', 'aqua fortis', 'spirit of niter'],
    category: 'Inorganic',
    description: 'Nitric acid is a highly corrosive mineral acid used in the production of fertilizers, explosives, and dyes.',
    facts: ['Molecular weight: 63.01 g/mol', 'Strong monobasic acid', 'Stains skin yellow'],
    atoms: [
      { element: 'N', position: [0, 0, 0] },
      { element: 'O', position: [1.1, 0.5, 0] },
      { element: 'O', position: [-1.1, 0.5, 0] },
      { element: 'O', position: [0, -1.1, 0] },
      { element: 'H', position: [0.7, -1.5, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
    ],
  },
  {
    id: 'phosphoric-acid',
    name: 'Phosphoric Acid',
    formula: 'H₃PO₄',
    aliases: ['h3po4', 'orthophosphoric acid'],
    category: 'Inorganic',
    description: 'Phosphoric acid is a weak acid used in food flavoring, fertilizers, and rust removal.',
    facts: ['Molecular weight: 98.00 g/mol', 'Triprotic acid', 'Used in cola drinks'],
    atoms: [
      { element: 'P', position: [0, 0, 0] },
      { element: 'O', position: [0, 1.3, 0] },
      { element: 'O', position: [1.1, -0.5, 0.5] },
      { element: 'O', position: [-1.1, -0.5, 0.5] },
      { element: 'O', position: [0, -0.5, -1.1] },
      { element: 'H', position: [1.9, -0.7, 0.5] },
      { element: 'H', position: [-1.9, -0.7, 0.5] },
      { element: 'H', position: [0, -0.7, -1.9] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 2, to: 5, order: 1 },
      { from: 3, to: 6, order: 1 },
      { from: 4, to: 7, order: 1 },
    ],
  },

  // ===================== COMPLEX ORGANIC =====================
  {
    id: 'aspirin',
    name: 'Aspirin',
    formula: 'C₉H₈O₄',
    aliases: ['acetylsalicylic acid', 'asa', 'c9h8o4'],
    category: 'Pharmaceutical',
    description: 'Aspirin is a medication used to reduce pain, fever, and inflammation. It is one of the most widely used medications globally.',
    facts: ['Molecular weight: 180.16 g/mol', 'Discovered in 1897', 'Anti-inflammatory drug'],
    atoms: [
      ...benzeneRing(0, 0, 0, 1.4),
      // COOH on C0
      { element: 'C', position: [2.5, 0, 0] },
      { element: 'O', position: [3.3, 0.8, 0] },
      { element: 'O', position: [3.1, -0.9, 0] },
      { element: 'H', position: [3.9, -0.7, 0] },
      // OCOCH3 on C1
      { element: 'O', position: [1.7, 0, 2.0] },
      { element: 'C', position: [2.2, 0, 2.8] },
      { element: 'O', position: [3.0, 0.6, 2.7] },
      { element: 'C', position: [1.9, 0, 4.0] },
      { element: 'H', position: [1.2, 0.8, 4.4] },
      { element: 'H', position: [2.7, 0.3, 4.5] },
      { element: 'H', position: [1.5, -0.9, 4.5] },
      // Remaining H on C2-C5
      ...benzeneHydrogens(0, 0, 0, 1.4, 2.5, [0, 1]),
    ],
    bonds: [
      ...benzeneBonds(0),
      { from: 0, to: 6, order: 1 }, { from: 6, to: 7, order: 2 }, { from: 6, to: 8, order: 1 }, { from: 8, to: 9, order: 1 },
      { from: 1, to: 10, order: 1 }, { from: 10, to: 11, order: 1 }, { from: 11, to: 12, order: 2 }, { from: 11, to: 13, order: 1 },
      { from: 13, to: 14, order: 1 }, { from: 13, to: 15, order: 1 }, { from: 13, to: 16, order: 1 },
      { from: 2, to: 17, order: 1 }, { from: 3, to: 18, order: 1 }, { from: 4, to: 19, order: 1 }, { from: 5, to: 20, order: 1 },
    ],
  },
  {
    id: 'caffeine',
    name: 'Caffeine',
    formula: 'C₈H₁₀N₄O₂',
    aliases: ['1,3,7-trimethylxanthine', 'c8h10n4o2', 'coffee molecule', 'theine'],
    category: 'Pharmaceutical',
    description: 'Caffeine is a central nervous system stimulant. It is the world\'s most widely consumed psychoactive drug, found in coffee, tea, and chocolate.',
    facts: ['Molecular weight: 194.19 g/mol', 'Found in coffee & tea', 'Blocks adenosine receptors'],
    atoms: [
      // Purine ring system (fused 5+6 ring)
      { element: 'C', position: [0, 0, 0] },
      { element: 'N', position: [1.2, 0.5, 0] },
      { element: 'C', position: [2.0, -0.3, 0] },
      { element: 'N', position: [1.5, -1.3, 0] },
      { element: 'C', position: [0.3, -1.2, 0] },
      { element: 'C', position: [-1.0, -0.3, 0] },
      { element: 'N', position: [-2.1, -0.8, 0] },
      { element: 'C', position: [-2.5, 0.3, 0] },
      { element: 'N', position: [-1.5, 1.0, 0] },
      // Oxygens
      { element: 'O', position: [0.3, 1.2, 0] },
      { element: 'O', position: [-3.5, 0.7, 0] },
      // Methyl groups
      { element: 'C', position: [1.4, 1.8, 0] },
      { element: 'C', position: [-2.6, -2.0, 0] },
      { element: 'C', position: [-1.5, 2.3, 0] },
      // Key Hydrogens
      { element: 'H', position: [3.0, -0.1, 0] },
      { element: 'H', position: [0.5, 2.3, 0] },
      { element: 'H', position: [2.2, 2.3, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 }, { from: 1, to: 2, order: 1 }, { from: 2, to: 3, order: 2 },
      { from: 3, to: 4, order: 1 }, { from: 4, to: 5, order: 2 }, { from: 5, to: 0, order: 1 },
      { from: 5, to: 6, order: 1 }, { from: 6, to: 7, order: 1 }, { from: 7, to: 8, order: 1 },
      { from: 8, to: 0, order: 1 },
      { from: 0, to: 9, order: 2 }, { from: 7, to: 10, order: 2 },
      { from: 1, to: 11, order: 1 }, { from: 6, to: 12, order: 1 }, { from: 8, to: 13, order: 1 },
      { from: 2, to: 14, order: 1 },
    ],
  },
  {
    id: 'glucose',
    name: 'Glucose',
    formula: 'C₆H₁₂O₆',
    aliases: ['dextrose', 'blood sugar', 'grape sugar', 'c6h12o6'],
    category: 'Biochemistry',
    description: 'Glucose is a simple sugar and an important source of energy in biology. It is the most abundant monosaccharide.',
    facts: ['Molecular weight: 180.16 g/mol', 'Primary energy source', 'Pyranose ring form'],
    atoms: [
      // Pyranose ring (6-membered ring with O)
      { element: 'C', position: [1.2, 0.4, 0] },
      { element: 'C', position: [0.6, 0.4, 1.1] },
      { element: 'C', position: [-0.6, 0.4, 1.1] },
      { element: 'C', position: [-1.2, 0.4, 0] },
      { element: 'C', position: [-0.6, 0.4, -1.1] },
      { element: 'O', position: [0.6, 0.4, -1.1] },
      // CH2OH on C0
      { element: 'C', position: [2.4, -0.3, 0] },
      { element: 'O', position: [3.2, 0.5, 0] },
      { element: 'H', position: [4.0, 0.2, 0] },
      // OH groups
      { element: 'O', position: [1.0, -0.4, 1.8] },
      { element: 'O', position: [-1.0, -0.4, 1.8] },
      { element: 'O', position: [-2.1, -0.3, 0] },
      { element: 'O', position: [-1.0, -0.4, -1.8] },
      // H atoms on ring carbons
      { element: 'H', position: [1.5, 1.3, 0] },
      { element: 'H', position: [0.9, 1.3, 1.3] },
      { element: 'H', position: [-0.9, 1.3, 1.3] },
      { element: 'H', position: [-1.5, 1.3, 0] },
      { element: 'H', position: [-0.9, 1.3, -1.3] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 }, { from: 1, to: 2, order: 1 }, { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 }, { from: 4, to: 5, order: 1 }, { from: 5, to: 0, order: 1 },
      { from: 0, to: 6, order: 1 }, { from: 6, to: 7, order: 1 }, { from: 7, to: 8, order: 1 },
      { from: 1, to: 9, order: 1 }, { from: 2, to: 10, order: 1 }, { from: 3, to: 11, order: 1 }, { from: 4, to: 12, order: 1 },
      { from: 0, to: 13, order: 1 }, { from: 1, to: 14, order: 1 }, { from: 2, to: 15, order: 1 },
      { from: 3, to: 16, order: 1 }, { from: 4, to: 17, order: 1 },
    ],
  },
  {
    id: 'formaldehyde',
    name: 'Formaldehyde',
    formula: 'CH₂O',
    aliases: ['methanal', 'formalin', 'ch2o'],
    category: 'Organic',
    description: 'Formaldehyde is the simplest aldehyde. It is used in the production of resins and as a preservative.',
    facts: ['Molecular weight: 30.03 g/mol', 'Planar molecule', 'Used in embalming'],
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [0, 1.2, 0] },
      { element: 'H', position: [1.0, -0.6, 0] },
      { element: 'H', position: [-1.0, -0.6, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
    ],
  },
  {
    id: 'sodium-chloride',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    aliases: ['nacl', 'table salt', 'common salt', 'rock salt', 'halite'],
    category: 'Inorganic',
    description: 'Sodium chloride is an ionic compound and the mineral form is known as halite. It is common table salt.',
    facts: ['Molecular weight: 58.44 g/mol', 'Melting point: 801°C', 'Face-centered cubic crystal'],
    atoms: [
      { element: 'Na', position: [-0.9, 0, 0] },
      { element: 'Cl', position: [0.9, 0, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
    ],
  },
  {
    id: 'propane',
    name: 'Propane',
    formula: 'C₃H₈',
    aliases: ['c3h8', 'lpg', 'bottled gas'],
    category: 'Organic',
    description: 'Propane is a three-carbon alkane, commonly used as fuel for heating, cooking, and vehicles.',
    facts: ['Molecular weight: 44.10 g/mol', 'Boiling point: -42°C', 'LPG component'],
    atoms: [
      { element: 'C', position: [-1.3, 0, 0] },
      { element: 'C', position: [0, 0, 0] },
      { element: 'C', position: [1.3, 0, 0] },
      { element: 'H', position: [-1.8, 0.9, 0.5] },
      { element: 'H', position: [-1.8, 0.3, -0.9] },
      { element: 'H', position: [-1.8, -0.9, 0.3] },
      { element: 'H', position: [0, 0.9, 0.7] },
      { element: 'H', position: [0, -0.9, 0.7] },
      { element: 'H', position: [1.8, 0.9, 0.5] },
      { element: 'H', position: [1.8, 0.3, -0.9] },
      { element: 'H', position: [1.8, -0.9, 0.3] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 }, { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 }, { from: 0, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 }, { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 }, { from: 2, to: 9, order: 1 }, { from: 2, to: 10, order: 1 },
    ],
  },
  {
    id: 'hydrogen-peroxide',
    name: 'Hydrogen Peroxide',
    formula: 'H₂O₂',
    aliases: ['h2o2', 'peroxide', 'dihydrogen dioxide'],
    category: 'Inorganic',
    description: 'Hydrogen peroxide is a chemical compound used as an antiseptic, bleaching agent, and oxidizer.',
    facts: ['Molecular weight: 34.01 g/mol', 'Dihedral angle: 111.5°', 'Decomposes to water + O₂'],
    atoms: [
      { element: 'O', position: [-0.5, 0, 0] },
      { element: 'O', position: [0.5, 0, 0] },
      { element: 'H', position: [-1.1, 0.7, 0.3] },
      { element: 'H', position: [1.1, -0.7, 0.3] },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 },
    ],
  },
  {
    id: 'ozone',
    name: 'Ozone',
    formula: 'O₃',
    aliases: ['o3', 'trioxygen'],
    category: 'Inorganic',
    description: 'Ozone is an inorganic molecule with a bent structure. In the stratosphere, it forms the ozone layer protecting Earth from UV radiation.',
    facts: ['Molecular weight: 48.00 g/mol', 'Bond angle: 116.8°', 'Ozone layer protector'],
    atoms: [
      { element: 'O', position: [0, 0.3, 0] },
      { element: 'O', position: [1.1, -0.3, 0] },
      { element: 'O', position: [-1.1, -0.3, 0] },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
    ],
  },
];

// Search function: fuzzy match molecule by name, formula, or alias
export function searchMolecules(query) {
  if (!query || query.trim().length === 0) return [];
  
  const q = query.toLowerCase().trim();
  
  // Exact matches first
  const exact = molecules.filter(m =>
    m.name.toLowerCase() === q ||
    m.formula.toLowerCase().replace(/[₀₁₂₃₄₅₆₇₈₉]/g, c => '0123456789'['₀₁₂₃₄₅₆₇₈₉'.indexOf(c)]) === q ||
    m.aliases.some(a => a.toLowerCase() === q)
  );
  if (exact.length > 0) return exact;
  
  // Partial matches
  const partial = molecules.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.formula.toLowerCase().replace(/[₀₁₂₃₄₅₆₇₈₉]/g, c => '0123456789'['₀₁₂₃₄₅₆₇₈₉'.indexOf(c)]).includes(q) ||
    m.aliases.some(a => a.toLowerCase().includes(q)) ||
    m.description.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q)
  );
  return partial;
}
