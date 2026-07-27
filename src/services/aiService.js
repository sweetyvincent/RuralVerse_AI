// ========================================
// AI Tutor Service — Intelligent Response Engine
// ========================================

// Maps subject IDs to their display names (used by AITutor.jsx)
const subjectIdMap = {
  math: 'Mathematics',
  science: 'Science',
  english: 'English',
  history: 'History',
  geography: 'Geography',
  cs: 'Computer Science',
};

const aiResponses = {
  Mathematics: {
    default: "Great question about Mathematics! Let me explain this concept step by step.\n\nIn mathematics, understanding the fundamentals is crucial. Let's break this down:\n\n📌 **Key Concept**: Every mathematical operation follows specific rules and properties.\n\n✅ **Step 1**: Identify what type of problem this is\n✅ **Step 2**: Apply the relevant formula or method\n✅ **Step 3**: Solve step by step\n✅ **Step 4**: Verify your answer\n\nWould you like me to solve a specific problem for you?",
    integers: "**Understanding Integers** 🔢\n\nIntegers are whole numbers that can be positive, negative, or zero.\n\n📊 **Number Line**: ... -3, -2, -1, 0, 1, 2, 3 ...\n\n**Rules for Operations:**\n\n➕ **Addition:**\n- Same signs → Add and keep the sign\n- Different signs → Subtract and keep sign of larger\n\n✖️ **Multiplication:**\n- (+) × (+) = (+)\n- (-) × (-) = (+)\n- (+) × (-) = (-)\n\n**Example:** (-3) + 5 = 2 (different signs, 5-3=2, keep positive)\n\nShall I give you practice problems?",
    algebra: "**Algebraic Expressions** 📐\n\nAn algebraic expression uses numbers, variables (like x, y), and operations.\n\n**Key Terms:**\n- **Variable**: A letter representing an unknown value (x, y, z)\n- **Coefficient**: The number multiplied with a variable (in 3x, coefficient is 3)\n- **Constant**: A number without a variable (in 3x + 5, constant is 5)\n- **Like Terms**: Terms with same variables (3x and 5x)\n\n**Simplifying:**\nCombine like terms: 3x + 5x = 8x\nBut: 3x + 5y ≠ 8xy (different variables!)\n\nWant me to explain equations next?",
    geometry: "**Geometry: Lines & Angles** 📏\n\n**Types of Angles:**\n- **Acute**: Less than 90°\n- **Right**: Exactly 90°\n- **Obtuse**: Between 90° and 180°\n- **Straight**: Exactly 180°\n- **Reflex**: Between 180° and 360°\n\n**Angle Pairs:**\n- **Complementary**: Two angles that add up to 90°\n- **Supplementary**: Two angles that add up to 180°\n- **Vertically Opposite**: Equal angles formed by intersecting lines\n\n**Lines:**\n- **Parallel Lines**: Never meet (||)\n- **Perpendicular Lines**: Meet at 90° (⊥)\n- **Transversal**: A line crossing two parallel lines\n\nWant to explore triangle properties?",
    quadratic: "**Quadratic Equations** 📊\n\nA quadratic equation has the form: **ax² + bx + c = 0** (where a ≠ 0)\n\n**Methods to Solve:**\n\n1️⃣ **Factoring:**\n- x² + 5x + 6 = 0 → (x + 2)(x + 3) = 0 → x = -2 or x = -3\n\n2️⃣ **Quadratic Formula:**\n- x = (-b ± √(b² - 4ac)) / 2a\n\n3️⃣ **Completing the Square:**\n- Move c to the other side, add (b/2a)² to both sides\n\n**Discriminant (b² - 4ac):**\n- > 0 → Two real roots\n- = 0 → One repeated root\n- < 0 → No real roots\n\nWant me to solve an example?",
    trigonometry: "**Trigonometry Basics** 📐\n\nTrigonometry deals with relationships between sides and angles of triangles.\n\n**SOH-CAH-TOA:**\n- **Sin θ** = Opposite / Hypotenuse\n- **Cos θ** = Adjacent / Hypotenuse\n- **Tan θ** = Opposite / Adjacent\n\n**Standard Angle Values:**\n- sin 0° = 0, sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2, sin 90° = 1\n- cos 0° = 1, cos 30° = √3/2, cos 45° = √2/2, cos 60° = 1/2, cos 90° = 0\n\n**Identities:**\n- sin²θ + cos²θ = 1\n- tan θ = sin θ / cos θ\n\nWant me to solve a problem?",
    probability: "**Probability** 🎲\n\nProbability measures how likely an event is to occur.\n\n**Formula:** P(Event) = Favorable Outcomes / Total Outcomes\n\n**Range:** 0 ≤ P(E) ≤ 1\n- P = 0 → Impossible event\n- P = 1 → Certain event\n\n**Types:**\n- **Theoretical**: Based on reasoning (coin flip = 1/2)\n- **Experimental**: Based on actual experiments\n\n**Example:**\n🎲 Rolling a die: P(getting 3) = 1/6\n🃏 Drawing a King from cards: P = 4/52 = 1/13\n\n**Rules:**\n- P(not E) = 1 - P(E)\n- P(A or B) = P(A) + P(B) - P(A and B)\n\nShall I give you practice problems?",
  },
  Science: {
    default: "Excellent question about Science! 🔬\n\nScience helps us understand the world around us through observation and experimentation.\n\nLet me break this topic down for you:\n\n🧪 **Key Principle**: Every scientific concept is based on evidence and can be tested.\n\n📖 **Steps of Scientific Method:**\n1. Observe\n2. Ask a question\n3. Form a hypothesis\n4. Experiment\n5. Analyze results\n6. Draw conclusions\n\nWhat specific topic would you like to explore? I can help with Physics, Chemistry, or Biology!",
    photosynthesis: "**Photosynthesis** 🌿☀️\n\nPhotosynthesis is how plants make their own food using sunlight!\n\n**Equation:**\n6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂\n(Carbon Dioxide + Water + Light → Glucose + Oxygen)\n\n**Where it happens:** In the **chloroplasts** of leaf cells\n\n**Requirements:**\n1. ☀️ Sunlight (energy source)\n2. 💧 Water (absorbed by roots)\n3. 💨 Carbon dioxide (from air through stomata)\n4. 🟢 Chlorophyll (green pigment)\n\n**Products:**\n- 🍬 Glucose (food/energy)\n- 💨 Oxygen (released into air)\n\n**Fun Fact:** Plants produce the oxygen we breathe! Without photosynthesis, life on Earth wouldn't exist.\n\nShall I explain the stomata or chloroplast in detail?",
    chemical: "**Physical vs Chemical Changes** ⚗️\n\n**Physical Change:**\n- No new substance formed\n- Usually reversible\n- Examples: melting ice, dissolving sugar, breaking glass\n\n**Chemical Change:**\n- New substance formed\n- Usually irreversible\n- Signs: color change, gas release, heat/light, new smell\n- Examples: rusting, burning, cooking\n\n**How to identify?**\nAsk: \"Is a NEW substance formed?\"\n- Yes → Chemical change\n- No → Physical change\n\n**Examples in daily life:**\n🍳 Cooking an egg → Chemical (can't un-cook!)\n🧊 Melting ice → Physical (can refreeze)\n🔥 Burning wood → Chemical (ash is new)\n📎 Bending a wire → Physical (same metal)\n\nWant to try some practice questions?",
    atoms: "**Atoms & Molecules** ⚛️\n\nAtoms are the building blocks of all matter!\n\n**Parts of an Atom:**\n- **Proton** (p⁺): Positive charge, inside nucleus\n- **Neutron** (n⁰): No charge, inside nucleus\n- **Electron** (e⁻): Negative charge, orbits nucleus\n\n**Key Numbers:**\n- **Atomic Number** = Number of protons (defines element)\n- **Mass Number** = Protons + Neutrons\n- **Electrons** = Protons (in neutral atoms)\n\n**Molecules:** Two or more atoms bonded together\n- H₂O = 2 Hydrogen + 1 Oxygen\n- CO₂ = 1 Carbon + 2 Oxygen\n- NaCl = 1 Sodium + 1 Chlorine\n\n**Fun Fact:** An atom is 99.9% empty space!\n\nWant to explore the periodic table?",
    newton: "**Newton's Laws of Motion** 🏃‍♂️\n\n**1st Law (Inertia):**\nAn object at rest stays at rest, and an object in motion stays in motion unless acted on by an external force.\n- Example: A ball on a table won't move by itself\n\n**2nd Law (F = ma):**\nForce = Mass × Acceleration\n- More mass = more force needed\n- More force = more acceleration\n- Example: Pushing a heavy vs light box\n\n**3rd Law (Action-Reaction):**\nFor every action, there is an equal and opposite reaction.\n- Example: Rocket pushes gas down → gas pushes rocket up 🚀\n- Walking: You push ground backward → ground pushes you forward\n\n**Units:**\n- Force: Newton (N) = kg × m/s²\n- Mass: kilogram (kg)\n- Acceleration: m/s²\n\nWant me to solve a numerical problem?",
    periodic: "**The Periodic Table** 🧪\n\n**Organization:**\n- **Rows (Periods)**: 7 periods — electrons fill new shells\n- **Columns (Groups)**: 18 groups — elements with similar properties\n\n**Key Groups:**\n- Group 1: **Alkali Metals** (Li, Na, K) — very reactive\n- Group 17: **Halogens** (F, Cl, Br) — reactive nonmetals\n- Group 18: **Noble Gases** (He, Ne, Ar) — unreactive\n\n**Trends:**\n- **Atomic size**: Increases down a group, decreases across a period\n- **Electronegativity**: Increases across a period\n- **Metallic character**: Increases down a group\n\n**Valency:**\n- Group 1 = Valency 1\n- Group 2 = Valency 2\n- Group 17 = Valency 1\n\nWant to learn about specific elements?",
  },
  English: {
    default: "Great question about English! 📖\n\nEnglish grammar forms the foundation of clear communication.\n\n**8 Parts of Speech:**\n1. **Noun** - Name of person, place, or thing\n2. **Pronoun** - Replaces a noun (he, she, it)\n3. **Verb** - Action word (run, eat, study)\n4. **Adjective** - Describes a noun (tall, beautiful)\n5. **Adverb** - Modifies verb/adjective (quickly, very)\n6. **Preposition** - Shows relationship (in, on, at)\n7. **Conjunction** - Joins words/sentences (and, but, or)\n8. **Interjection** - Expresses emotion (Wow! Ouch!)\n\nWhich topic would you like to explore deeper?",
    tenses: "**English Tenses** ⏰\n\n**3 Main Tenses, 4 Forms Each = 12 Tenses!**\n\n**Present Tense:**\n- Simple: I study\n- Continuous: I am studying\n- Perfect: I have studied\n- Perfect Continuous: I have been studying\n\n**Past Tense:**\n- Simple: I studied\n- Continuous: I was studying\n- Perfect: I had studied\n- Perfect Continuous: I had been studying\n\n**Future Tense:**\n- Simple: I will study\n- Continuous: I will be studying\n- Perfect: I will have studied\n- Perfect Continuous: I will have been studying\n\n**Tip:** Focus on Simple and Continuous forms first!\n\nWant me to give examples of each?",
    essay: "**Essay Writing Guide** ✍️\n\n**Structure:**\n\n1️⃣ **Introduction (1 paragraph):**\n- Hook: Grab reader's attention\n- Background: Give context\n- Thesis statement: Your main argument\n\n2️⃣ **Body (2-3 paragraphs):**\n- Topic sentence for each paragraph\n- Supporting evidence and examples\n- Explanation of each point\n- Transition sentences between paragraphs\n\n3️⃣ **Conclusion (1 paragraph):**\n- Restate thesis in new words\n- Summarize key points\n- End with a strong closing thought\n\n**Tips:**\n- Use varied sentence lengths\n- Avoid repetition\n- Use linking words (however, moreover, therefore)\n- Proofread for grammar and spelling\n\nWant me to help you write an essay on a specific topic?",
    vocabulary: "**Building Vocabulary** 📚\n\n**Techniques to Learn New Words:**\n\n1️⃣ **Word Roots:**\n- 'bio' = life → biology, biography\n- 'graph' = write → autograph, photograph\n- 'tele' = far → telephone, television\n\n2️⃣ **Prefixes:**\n- un- = not → unhappy, unclear\n- re- = again → rewrite, redo\n- pre- = before → preview, predict\n\n3️⃣ **Suffixes:**\n- -ful = full of → beautiful, joyful\n- -less = without → careless, hopeless\n- -tion = action → education, creation\n\n**Daily Practice:**\n- Read newspapers and books\n- Learn 3-5 new words daily\n- Use new words in sentences\n- Play word games (Scrabble, crosswords)\n\nWant me to quiz you on vocabulary?",
  },
  History: {
    default: "Interesting question about History! 🏛️\n\nHistory helps us understand how civilizations evolved and shaped our present.\n\n**Why Study History?**\n- Learn from past mistakes\n- Understand cultural heritage\n- Develop critical thinking\n- Appreciate diverse perspectives\n\n**Periods of Indian History:**\n1. **Ancient** (3000 BCE - 500 CE)\n2. **Medieval** (500 CE - 1500 CE)\n3. **Modern** (1500 CE - Present)\n\nWhich period or topic interests you?",
    independence: "**Indian Independence Movement** 🇮🇳\n\n**Key Events:**\n\n📅 **1857** - First War of Independence (Sepoy Mutiny)\n📅 **1885** - Indian National Congress founded\n📅 **1919** - Jallianwala Bagh massacre\n📅 **1920** - Non-Cooperation Movement (Gandhi)\n📅 **1930** - Salt March (Dandi March)\n📅 **1942** - Quit India Movement\n📅 **1947** - India gains Independence (August 15)\n\n**Key Leaders:**\n- 🙏 **Mahatma Gandhi** - Father of the Nation, Ahimsa\n- 🌹 **Jawaharlal Nehru** - First Prime Minister\n- 💪 **Subhas Chandra Bose** - INA leader\n- ⚔️ **Bhagat Singh** - Revolutionary freedom fighter\n- 🌺 **Sarojini Naidu** - Nightingale of India\n\nWant to learn about any specific event in detail?",
    world: "**World History Overview** 🌍\n\n**Major Periods:**\n\n1️⃣ **Ancient Civilizations (3000 BCE - 500 CE)**\n- Mesopotamia, Egypt, Indus Valley, China\n- Invention of writing, agriculture, cities\n\n2️⃣ **Medieval Period (500 - 1500 CE)**\n- Rise of Islam, Crusades, Mongol Empire\n- Feudalism in Europe\n\n3️⃣ **Renaissance (14th-17th century)**\n- Revival of art, science, philosophy\n- Leonardo da Vinci, Galileo, Shakespeare\n\n4️⃣ **Modern Era (1700 - Present)**\n- Industrial Revolution\n- French Revolution (1789)\n- World War I (1914-1918)\n- World War II (1939-1945)\n- Cold War, Digital Age\n\nWhich era fascinates you the most?",
  },
  Geography: {
    default: "Welcome to Geography! 🌍\n\nGeography studies the Earth's landscapes, environments, and how people interact with them.\n\n**Two Main Branches:**\n\n🏔️ **Physical Geography:**\n- Landforms (mountains, plains, plateaus)\n- Climate and weather\n- Natural disasters\n- Water bodies (oceans, rivers, lakes)\n\n👥 **Human Geography:**\n- Population and migration\n- Urbanization\n- Agriculture and industries\n- Culture and languages\n\n**India's Geography:**\n- Area: 3.287 million km²\n- States: 28 + 8 Union Territories\n- Major rivers: Ganga, Yamuna, Brahmaputra\n- Climate zones: Tropical to Alpine\n\nWhat would you like to explore?",
    climate: "**Climate & Weather** 🌦️\n\n**Difference:**\n- **Weather**: Short-term atmospheric conditions (today)\n- **Climate**: Average weather pattern over 30+ years\n\n**Climate Zones of India:**\n1. 🌧️ **Tropical Wet** - Kerala, NE India (heavy rain)\n2. 🏜️ **Arid** - Rajasthan, Gujarat (very dry)\n3. ⛰️ **Alpine** - Himalayas (cold, snow)\n4. 🌴 **Tropical Wet & Dry** - Most of peninsular India\n\n**Monsoons:**\n- **Southwest Monsoon** (June-Sept): Main rainy season\n- **Northeast Monsoon** (Oct-Dec): Rain in Tamil Nadu\n\n**Climate Change:**\n- Global temperature rising\n- Glaciers melting\n- Sea levels increasing\n- Extreme weather events\n\nWant to learn about natural disasters?",
  },
  'Computer Science': {
    default: "Welcome to Computer Science! 💻\n\nLet me help you understand the digital world.\n\n**Key Topics:**\n\n🖥️ **Basics:**\n- Hardware vs Software\n- Input, Processing, Output\n- Memory (RAM, ROM)\n\n💻 **Programming:**\n- Variables and Data Types\n- Loops and Conditions\n- Functions\n- Arrays and Objects\n\n🌐 **Internet & Web:**\n- How the internet works\n- HTML, CSS, JavaScript\n- Cybersecurity basics\n\n🤖 **Emerging Tech:**\n- Artificial Intelligence\n- Machine Learning\n- Internet of Things (IoT)\n- Blockchain\n\nWhat would you like to learn about?",
    python: "**Python Programming** 🐍\n\nPython is one of the easiest and most popular programming languages!\n\n**Getting Started:**\n```\n# Your first Python program\nprint('Hello, World!')\n```\n\n**Variables:**\n```\nname = 'Ravi'      # String\nage = 14            # Integer\nheight = 5.4        # Float\nis_student = True   # Boolean\n```\n\n**Conditions:**\n```\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')\n```\n\n**Loops:**\n```\nfor i in range(5):\n    print(i)  # Prints 0,1,2,3,4\n```\n\n**Functions:**\n```\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Ravi'))  # Hello, Ravi!\n```\n\nWant me to give you a coding challenge?",
    html: "**HTML & Web Development** 🌐\n\nHTML (HyperText Markup Language) is the skeleton of every website!\n\n**Basic Structure:**\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n    <p>This is my first webpage.</p>\n</body>\n</html>\n```\n\n**Common Tags:**\n- `<h1>` to `<h6>` → Headings\n- `<p>` → Paragraph\n- `<a href='...'>` → Links\n- `<img src='...'>` → Images\n- `<ul>/<ol>` → Lists\n- `<div>` → Container\n\n**CSS** adds style (colors, fonts, layouts)\n**JavaScript** adds interactivity (clicks, animations)\n\nWant to build a simple webpage together?",
  },
  General: {
    default: "Hello! 👋 I'm your AI tutor, ready to help you learn!\n\nI can assist you with:\n\n📐 **Mathematics** - Algebra, Geometry, Trigonometry, Probability\n🔬 **Science** - Physics, Chemistry, Biology\n📖 **English** - Grammar, Writing, Vocabulary\n🏛️ **History** - Indian & World History\n🌍 **Geography** - Physical & Human Geography\n💻 **Computer Science** - Programming, Web Development\n\nJust ask me any question, and I'll explain it in a simple way!\n\n💡 **Tip:** Try asking about:\n- \"Explain photosynthesis\"\n- \"What are Newton's laws?\"\n- \"Teach me Python\"\n- \"Help me with quadratic equations\"\n\nWhat would you like to learn today?",
  }
};

// Enhanced keyword matching with broader coverage
const keywordMap = [
  // Mathematics
  { keywords: ['integer', 'number', 'positive', 'negative', 'whole number'], response: 'Mathematics', topic: 'integers' },
  { keywords: ['algebra', 'expression', 'variable', 'equation', 'linear', 'simultaneous'], response: 'Mathematics', topic: 'algebra' },
  { keywords: ['geometry', 'angle', 'triangle', 'circle', 'parallel', 'perpendicular', 'shape', 'polygon'], response: 'Mathematics', topic: 'geometry' },
  { keywords: ['quadratic', 'x²', 'x square', 'discriminant', 'parabola'], response: 'Mathematics', topic: 'quadratic' },
  { keywords: ['trigonometry', 'sin', 'cos', 'tan', 'sine', 'cosine', 'tangent', 'soh cah toa'], response: 'Mathematics', topic: 'trigonometry' },
  { keywords: ['probability', 'chance', 'dice', 'coin', 'likely', 'random', 'odds'], response: 'Mathematics', topic: 'probability' },
  
  // Science
  { keywords: ['photosynthesis', 'chlorophyll', 'stomata', 'chloroplast'], response: 'Science', topic: 'photosynthesis' },
  { keywords: ['chemical', 'physical change', 'rust', 'burning', 'reversible', 'irreversible'], response: 'Science', topic: 'chemical' },
  { keywords: ['atom', 'molecule', 'proton', 'neutron', 'electron', 'nucleus', 'element'], response: 'Science', topic: 'atoms' },
  { keywords: ['newton', 'force', 'inertia', 'motion', 'acceleration', 'f=ma', 'gravity'], response: 'Science', topic: 'newton' },
  { keywords: ['periodic table', 'metal', 'nonmetal', 'halogen', 'noble gas', 'alkali'], response: 'Science', topic: 'periodic' },
  
  // English
  { keywords: ['tense', 'past', 'future', 'present', 'continuous', 'perfect'], response: 'English', topic: 'tenses' },
  { keywords: ['essay', 'write', 'writing', 'paragraph', 'composition', 'article'], response: 'English', topic: 'essay' },
  { keywords: ['vocabulary', 'word', 'prefix', 'suffix', 'synonym', 'antonym', 'root word'], response: 'English', topic: 'vocabulary' },
  
  // History
  { keywords: ['independence', 'freedom', 'gandhi', 'nehru', 'bhagat', 'quit india', 'salt march', 'dandi'], response: 'History', topic: 'independence' },
  { keywords: ['world war', 'renaissance', 'revolution', 'ancient civilization', 'medieval'], response: 'History', topic: 'world' },
  
  // Geography
  { keywords: ['climate', 'weather', 'monsoon', 'rain', 'temperature', 'season'], response: 'Geography', topic: 'climate' },
  
  // Computer Science
  { keywords: ['python', 'programming', 'code', 'coding', 'loop', 'function', 'variable', 'program'], response: 'Computer Science', topic: 'python' },
  { keywords: ['html', 'css', 'website', 'web', 'webpage', 'javascript', 'frontend'], response: 'Computer Science', topic: 'html' },
];

export async function getAIResponse(message, subjectId = 'General', language = 'en') {
  const msg = message.toLowerCase().trim();
  
  // Resolve subject ID to name
  const subjectName = subjectIdMap[subjectId] || subjectId || 'General';
  const subjectResponses = aiResponses[subjectName] || aiResponses.General;
  
  // 1. Try keyword matching (cross-subject)
  for (const entry of keywordMap) {
    if (entry.keywords.some(kw => msg.includes(kw))) {
      const targetResponses = aiResponses[entry.response];
      if (targetResponses && targetResponses[entry.topic]) {
        return targetResponses[entry.topic];
      }
    }
  }
  
  // 2. Greeting
  if (['hello', 'hi', 'hey', 'help', 'what can you do', 'start'].some(g => msg.includes(g))) {
    return aiResponses.General.default;
  }
  
  // 3. Thank you
  if (['thank', 'thanks', 'awesome', 'great', 'perfect', 'got it'].some(t => msg.includes(t))) {
    return "You're welcome! 😊 I'm glad I could help. Feel free to ask me anything else — I'm here to support your learning journey! 🚀";
  }
  
  // 4. Fallback to selected subject's default
  return subjectResponses.default;
}

export async function simulateTypingDelay() {
  return new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 1000));
}
