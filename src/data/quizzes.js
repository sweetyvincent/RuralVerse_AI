export const quizQuestions = {
  Mathematics: {
    'Integers': [
      { q: 'What is the sum of -7 and 12?', options: ['5', '-5', '19', '-19'], correct: 0, explanation: '-7 + 12 = 5. When adding integers with different signs, subtract the smaller absolute value from the larger and keep the sign of the larger.' },
      { q: 'What is (-3) × (-4)?', options: ['-12', '12', '-7', '7'], correct: 1, explanation: 'The product of two negative numbers is always positive. (-3) × (-4) = 12.' },
      { q: 'Which integer is neither positive nor negative?', options: ['1', '-1', '0', '∞'], correct: 2, explanation: 'Zero (0) is neither positive nor negative. It is the integer that separates positive and negative numbers on the number line.' },
      { q: 'What is the absolute value of -15?', options: ['-15', '15', '0', '1'], correct: 1, explanation: 'The absolute value of a number is its distance from zero. |-15| = 15.' },
      { q: 'Arrange in ascending order: -5, 3, -2, 0, 7', options: ['-5, -2, 0, 3, 7', '7, 3, 0, -2, -5', '-2, -5, 0, 3, 7', '0, -2, -5, 3, 7'], correct: 0, explanation: 'In ascending order (smallest to largest): -5 < -2 < 0 < 3 < 7.' },
    ],
    'Fractions & Decimals': [
      { q: 'What is ½ + ¼?', options: ['¾', '¼', '²⁄₄', '1'], correct: 0, explanation: '½ = ²⁄₄, so ²⁄₄ + ¼ = ¾.' },
      { q: 'Convert 0.75 to a fraction:', options: ['¼', '½', '¾', '⅕'], correct: 2, explanation: '0.75 = 75/100 = ¾ (simplify by dividing both by 25).' },
      { q: 'What is ⅓ × ⁶⁄₇?', options: ['²⁄₇', '⁶⁄₂₁', '⅔', '³⁄₇'], correct: 0, explanation: '⅓ × ⁶⁄₇ = ⁶⁄₂₁ = ²⁄₇ (simplify by dividing both by 3).' },
      { q: 'Which is greater: 0.5 or ⅓?', options: ['0.5', '⅓', 'Equal', 'Cannot determine'], correct: 0, explanation: '0.5 = ½ ≈ 0.5, while ⅓ ≈ 0.333. Since 0.5 > 0.333, 0.5 is greater.' },
    ],
    'Algebraic Expressions': [
      { q: 'Simplify: 3x + 5x', options: ['8x', '15x', '8x²', '35x'], correct: 0, explanation: '3x and 5x are like terms. Adding coefficients: 3 + 5 = 8, so 3x + 5x = 8x.' },
      { q: 'What is the coefficient of y in 7xy?', options: ['7', 'x', '7x', 'y'], correct: 2, explanation: 'The coefficient of y in 7xy is 7x (everything multiplied with y).' },
      { q: 'Evaluate 2a + 3b when a=4, b=2:', options: ['14', '10', '12', '16'], correct: 0, explanation: '2(4) + 3(2) = 8 + 6 = 14.' },
    ],
  },
  Science: {
    'Nutrition in Plants': [
      { q: 'What is the process by which plants make food called?', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Transpiration'], correct: 1, explanation: 'Photosynthesis is the process where plants use sunlight, CO₂ and water to make glucose (food).' },
      { q: 'Which gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, explanation: 'Plants absorb Carbon Dioxide (CO₂) from the air through tiny pores called stomata.' },
      { q: 'What is the green pigment in leaves called?', options: ['Melanin', 'Chlorophyll', 'Hemoglobin', 'Carotene'], correct: 1, explanation: 'Chlorophyll is the green pigment that captures sunlight energy for photosynthesis.' },
      { q: 'Which part of the plant is mainly responsible for photosynthesis?', options: ['Root', 'Stem', 'Leaf', 'Flower'], correct: 2, explanation: 'Leaves are the main site of photosynthesis because they contain the most chlorophyll.' },
    ],
    'Heat & Temperature': [
      { q: 'What instrument is used to measure temperature?', options: ['Barometer', 'Thermometer', 'Anemometer', 'Hygrometer'], correct: 1, explanation: 'A thermometer measures temperature, typically using mercury or digital sensors.' },
      { q: 'In which direction does heat flow?', options: ['Cold to hot', 'Hot to cold', 'Both directions equally', 'Only upward'], correct: 1, explanation: 'Heat always flows from a hotter object to a cooler object until thermal equilibrium.' },
      { q: 'What is the boiling point of water in Celsius?', options: ['0°C', '50°C', '100°C', '212°C'], correct: 2, explanation: 'Water boils at 100°C (212°F) at standard atmospheric pressure.' },
    ],
    'Physical & Chemical Changes': [
      { q: 'Which is an example of a chemical change?', options: ['Ice melting', 'Rusting of iron', 'Breaking glass', 'Dissolving sugar'], correct: 1, explanation: 'Rusting involves iron reacting with oxygen and water to form iron oxide — a new substance.' },
      { q: 'Melting of ice cream is a:', options: ['Chemical change', 'Physical change', 'Both', 'Neither'], correct: 1, explanation: 'Melting is a physical change — the substance (water) remains the same, only its state changes.' },
      { q: 'What is formed when iron reacts with oxygen and water?', options: ['Gold', 'Rust (Iron oxide)', 'Salt', 'Steel'], correct: 1, explanation: 'Iron + Oxygen + Water → Iron Oxide (Rust). This is a slow chemical reaction.' },
    ],
  },
  English: {
    'Parts of Speech': [
      { q: 'Which word is a noun in: "The dog runs fast"?', options: ['The', 'dog', 'runs', 'fast'], correct: 1, explanation: '"Dog" is a noun — it names a living being (animal).' },
      { q: 'Identify the verb: "She sings beautifully"', options: ['She', 'sings', 'beautifully', 'None'], correct: 1, explanation: '"Sings" is the verb — it shows the action being performed.' },
      { q: 'Which is an adjective in: "The tall building"?', options: ['The', 'tall', 'building', 'None'], correct: 1, explanation: '"Tall" is an adjective — it describes the noun "building".' },
      { q: '"Quickly" is what part of speech?', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], correct: 3, explanation: '"Quickly" is an adverb — it modifies a verb and tells us how something is done.' },
    ],
    'Tenses': [
      { q: 'Which tense: "I am reading a book"?', options: ['Simple Present', 'Present Continuous', 'Past Continuous', 'Future'], correct: 1, explanation: '"Am reading" is Present Continuous tense — showing an action happening right now.' },
      { q: 'Convert to past tense: "She writes a letter"', options: ['She wrote a letter', 'She will write a letter', 'She is writing a letter', 'She has written a letter'], correct: 0, explanation: 'Simple past of "writes" is "wrote". "She wrote a letter."' },
      { q: 'Which is Simple Future tense?', options: ['I go', 'I went', 'I will go', 'I am going'], correct: 2, explanation: '"Will go" indicates Simple Future tense — an action that will happen in the future.' },
    ],
  },
  History: {
    'Medieval Period': [
      { q: 'Who founded the Delhi Sultanate?', options: ['Akbar', 'Qutb-ud-din Aibak', 'Ashoka', 'Babur'], correct: 1, explanation: 'Qutb-ud-din Aibak established the Delhi Sultanate in 1206 CE after Muhammad of Ghor\'s conquests.' },
      { q: 'The Qutub Minar was built by:', options: ['Shah Jahan', 'Qutb-ud-din Aibak', 'Humayun', 'Aurangzeb'], correct: 1, explanation: 'Qutub Minar was started by Qutb-ud-din Aibak in 1193 CE and completed by Iltutmish.' },
      { q: 'Which period is known as the Medieval Period in India?', options: ['3000 BCE - 500 CE', '500 CE - 1500 CE', '1500 CE - 1947 CE', '1947 CE - Present'], correct: 1, explanation: 'The Medieval Period in India spans roughly from 500 CE to 1500 CE.' },
    ],
  }
};
