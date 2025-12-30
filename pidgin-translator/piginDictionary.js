export const pidginDictionary = [
  {
    id: 1,
    languageFrom: "en",
    languageTo: "pidgin",
    from: "What’s going on?",
    to: "Wetin dey happen?",
    pronunciation: "weh-tin day hap-pen",
    audio: require("./assets/audio/wetin-dey-happen.mp3"),
    examples: [
      {
        en: "What’s going on here?",
        pidgin: "Wetin dey happen for here?"
      }
    ],
    tags: ["greeting", "casual"]
  },
  {
    id: 2,
    languageFrom: "pidgin",
    languageTo: "en",
    from: "How far?",
    to: "Hi / What’s up?",
    pronunciation: "hau fah",
    audio: require("./assets/audio/how-far.mp3"),
    examples: [
      {
        pidgin: "How far, you don chop?",
        en: "What’s up, have you eaten?"
      }
    ],
    tags: ["greeting", "friends"]
  },
  {
    id: 3,
    languageFrom: "en",
    languageTo: "pidgin",
    from: "I am very hungry",
    to: "I dey craze for food",
    pronunciation: "ai day craze for food",
    audio: require("./assets/audio/i-dey-craze-for-food.mp3"),
    examples: [
      {
        en: "I am very hungry, let’s eat.",
        pidgin: "I dey craze for food, make we chop."
      }
    ],
    tags: ["food", "expression"]
  },
  {
    id: 4,
    languageFrom: "pidgin",
    languageTo: "en",
    from: "Abeg",
    to: "Please / I beg you",
    pronunciation: "ah-beg",
    audio: require("./assets/audio/abeg.mp3"),
    examples: [
      {
        pidgin: "Abeg, help me small.",
        en: "Please, help me a bit."
      }
    ],
    tags: ["polite", "common"]
  },
  {
    id: 5,
    languageFrom: "en",
    languageTo: "pidgin",
    from: "I don’t understand",
    to: "I no understand",
    pronunciation: "ai no un-dah-stand",
    audio: require("./assets/audio/i-no-understand.mp3"),
    examples: [
      {
        en: "I don’t understand what you’re saying.",
        pidgin: "I no understand wetin you dey talk."
      }
    ],
    tags: ["conversation"]
  },
  {
    id: 6,
    languageFrom: "pidgin",
    languageTo: "en",
    from: "No wahala",
    to: "No problem / It’s fine",
    pronunciation: "noh wah-hah-lah",
    audio: require("./assets/audio/no-wahala.mp3"),
    examples: [
      {
        pidgin: "No wahala, I go do am.",
        en: "No problem, I’ll do it."
      }
    ],
    tags: ["reassurance"]
  },
  {
    id: 7,
    languageFrom: "en",
    languageTo: "pidgin",
    from: "I am tired",
    to: "I don tire",
    pronunciation: "ai don tai-uh",
    audio: require("./assets/audio/i-don-tire.mp3"),
    examples: [
      {
        en: "I am tired of this work.",
        pidgin: "I don tire for this work."
      }
    ],
    tags: ["expression"]
  }
];