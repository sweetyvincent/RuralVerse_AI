const aiResponses = {
  Mathematics: {
    default: "Great question about Mathematics! Let me explain this concept step by step.\n\nIn mathematics, understanding the fundamentals is crucial. Let's break this down:\n\n📌 **Key Concept**: Every mathematical operation follows specific rules and properties.\n\n✅ **Step 1**: Identify what type of problem this is\n✅ **Step 2**: Apply the relevant formula or method\n✅ **Step 3**: Solve step by step\n✅ **Step 4**: Verify your answer\n\nWould you like me to solve a specific problem for you?",
    integers: "**Understanding Integers** 🔢\n\nIntegers are whole numbers that can be positive, negative, or zero.\n\n📊 **Number Line**: ... -3, -2, -1, 0, 1, 2, 3 ...\n\n**Rules for Operations:**\n\n➕ **Addition:**\n• Same signs → Add and keep the sign\n• Different signs → Subtract and keep sign of larger\n\n✖️ **Multiplication:**\n• (+) × (+) = (+)\n• (-) × (-) = (+)\n• (+) × (-) = (-)\n\n**Example:** (-3) + 5 = 2 (different signs, 5-3=2, keep positive)\n\nShall I give you practice problems?",
    algebra: "**Algebraic Expressions** 📐\n\nAn algebraic expression uses numbers, variables (like x, y), and operations.\n\n**Key Terms:**\n• **Variable**: A letter representing an unknown value (x, y, z)\n• **Coefficient**: The number multiplied with a variable (in 3x, coefficient is 3)\n• **Constant**: A number without a variable (in 3x + 5, constant is 5)\n• **Like Terms**: Terms with same variables (3x and 5x)\n\n**Simplifying:**\nCombine like terms: 3x + 5x = 8x\nBut: 3x + 5y ≠ 8xy (different variables!)\n\nWant me to explain equations next?",
    geometry: "**Geometry: Lines & Angles** 📏\n\n**Types of Angles:**\n• **Acute**: Less than 90°\n• **Right**: Exactly 90°\n• **Obtuse**: Between 90° and 180°\n• **Straight**: Exactly 180°\n• **Reflex**: Between 180° and 360°\n\n**Angle Pairs:**\n• **Complementary**: Two angles that add up to 90°\n• **Supplementary**: Two angles that add up to 180°\n• **Vertically Opposite**: Equal angles formed by intersecting lines\n\n**Lines:**\n• **Parallel Lines**: Never meet (||)\n• **Perpendicular Lines**: Meet at 90° (⊥)\n• **Transversal**: A line crossing two parallel lines\n\nWant to explore triangle properties?",
  },
  Science: {
    default: "Excellent question about Science! 🔬\n\nScience helps us understand the world around us through observation and experimentation.\n\nLet me break this topic down for you:\n\n🧪 **Key Principle**: Every scientific concept is based on evidence and can be tested.\n\n📖 **Steps of Scientific Method:**\n1. Observe\n2. Ask a question\n3. Form a hypothesis\n4. Experiment\n5. Analyze results\n6. Draw conclusions\n\nWhat specific topic would you like to explore?",
    photosynthesis: "**Photosynthesis** 🌿☀️\n\nPhotosynthesis is how plants make their own food using sunlight!\n\n**Equation:**\n6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂\n(Carbon Dioxide + Water + Light → Glucose + Oxygen)\n\n**Where it happens:** In the **chloroplasts** of leaf cells\n\n**Requirements:**\n1. ☀️ Sunlight (energy source)\n2. 💧 Water (absorbed by roots)\n3. 💨 Carbon dioxide (from air through stomata)\n4. 🟢 Chlorophyll (green pigment)\n\n**Products:**\n• 🍬 Glucose (food/energy)\n• 💨 Oxygen (released into air)\n\n**Fun Fact:** Plants produce the oxygen we breathe! Without photosynthesis, life on Earth wouldn't exist.\n\nShall I explain the stomata or chloroplast in detail?",
    chemical: "**Physical vs Chemical Changes** ⚗️\n\n**Physical Change:**\n• No new substance formed\n• Usually reversible\n• Examples: melting ice, dissolving sugar, breaking glass\n\n**Chemical Change:**\n• New substance formed\n• Usually irreversible\n• Signs: color change, gas release, heat/light, new smell\n• Examples: rusting, burning, cooking\n\n**How to identify?**\nAsk: \"Is a NEW substance formed?\"\n• Yes → Chemical change\n• No → Physical change\n\n**Examples in daily life:**\n🍳 Cooking an egg → Chemical (can't un-cook!)\n🧊 Melting ice → Physical (can refreeze)\n🔥 Burning wood → Chemical (ash is new)\n📎 Bending a wire → Physical (same metal)\n\nWant to try some practice questions?",
  },
  English: {
    default: "Great question about English! 📖\n\nEnglish grammar forms the foundation of clear communication.\n\n**8 Parts of Speech:**\n1. **Noun** - Name of person, place, or thing\n2. **Pronoun** - Replaces a noun (he, she, it)\n3. **Verb** - Action word (run, eat, study)\n4. **Adjective** - Describes a noun (tall, beautiful)\n5. **Adverb** - Modifies verb/adjective (quickly, very)\n6. **Preposition** - Shows relationship (in, on, at)\n7. **Conjunction** - Joins words/sentences (and, but, or)\n8. **Interjection** - Expresses emotion (Wow! Ouch!)\n\nWhich topic would you like to explore deeper?",
    tenses: "**English Tenses** ⏰\n\n**3 Main Tenses, 4 Forms Each = 12 Tenses!**\n\n**Present Tense:**\n• Simple: I study\n• Continuous: I am studying\n• Perfect: I have studied\n• Perfect Continuous: I have been studying\n\n**Past Tense:**\n• Simple: I studied\n• Continuous: I was studying\n• Perfect: I had studied\n• Perfect Continuous: I had been studying\n\n**Future Tense:**\n• Simple: I will study\n• Continuous: I will be studying\n• Perfect: I will have studied\n• Perfect Continuous: I will have been studying\n\n**Tip:** Focus on Simple and Continuous forms first!\n\nWant me to give examples of each?",
  },
  History: {
    default: "Interesting question about History! 🏛️\n\nHistory helps us understand how civilizations evolved and shaped our present.\n\n**Why Study History?**\n• Learn from past mistakes\n• Understand cultural heritage\n• Develop critical thinking\n• Appreciate diverse perspectives\n\n**Periods of Indian History:**\n1. **Ancient** (3000 BCE - 500 CE)\n2. **Medieval** (500 CE - 1500 CE)\n3. **Modern** (1500 CE - Present)\n\nWhich period or topic interests you?",
  },
  General: {
    default: "Hello! 👋 I'm your AI tutor, ready to help you learn!\n\nI can assist you with:\n\n📐 **Mathematics** - Algebra, Geometry, Arithmetic\n🔬 **Science** - Physics, Chemistry, Biology\n📖 **English** - Grammar, Writing, Comprehension\n🏛️ **History** - Indian & World History\n🌍 **Geography** - Physical & Human Geography\n💻 **Computer Science** - Programming, Digital Literacy\n\nJust ask me any question, and I'll explain it in a simple way!\n\n💡 **Tip:** You can also:\n• Ask me to explain in your language\n• Request practice problems\n• Ask for real-world examples\n\nWhat would you like to learn today?",
  }
};

export function getAIResponse(message, subject = 'General') {
  const msg = message.toLowerCase();
  const subjectResponses = aiResponses[subject] || aiResponses.General;
  
  if (msg.includes('integer') || msg.includes('number')) {
    return aiResponses.Mathematics?.integers || subjectResponses.default;
  }
  if (msg.includes('algebra') || msg.includes('expression') || msg.includes('variable')) {
    return aiResponses.Mathematics?.algebra || subjectResponses.default;
  }
  if (msg.includes('geometry') || msg.includes('angle') || msg.includes('line') || msg.includes('triangle')) {
    return aiResponses.Mathematics?.geometry || subjectResponses.default;
  }
  if (msg.includes('photosynthesis') || msg.includes('plant') || msg.includes('food')) {
    return aiResponses.Science?.photosynthesis || subjectResponses.default;
  }
  if (msg.includes('chemical') || msg.includes('physical') || msg.includes('change') || msg.includes('rust')) {
    return aiResponses.Science?.chemical || subjectResponses.default;
  }
  if (msg.includes('tense') || msg.includes('past') || msg.includes('future') || msg.includes('present')) {
    return aiResponses.English?.tenses || subjectResponses.default;
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('help')) {
    return aiResponses.General.default;
  }
  
  return subjectResponses.default;
}

export function simulateTypingDelay() {
  return new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
}
