/*! words.js v1.0.0 August 12, 2021 */
(function () {
  /**
   * Stores the entire details of the current Words.
   *
   * Details such as -
   * - all categories of words
   * - all types of every category
   * - size of every category
   * - size of every type
   */
  const Catelogue = {
    allCategories: ["Animals", "Colors", "Food", "Peoples", "Sports"],
    Category: {
      Animals: {
        allTypes: [
          "Aquatic",
          "Arthropods",
          "Birds",
          "Desert",
          "Endangered",
          "Insects",
          "Invertebrates",
          "Mammals",
          "Reptiles",
          "Vertebrates",
        ],
        Type: {
          Aquatic: { size: 36 },
          Arthropods: { size: 26 },
          Birds: { size: 25 },
          Desert: { size: 25 },
          Endangered: { size: 25 },
          Insects: { size: 15 },
          Invertebrates: { size: 25 },
          Mammals: { size: 25 },
          Reptiles: { size: 16 },
          Vertebrates: { size: 32 },
        },
        totalSize: 250,
      },
      Colors: {
        allTypes: ["Basic", "Extended"],
        Type: { Basic: { size: 18 }, Extended: { size: 132 } },
        totalSize: 150,
      },
      Food: {
        allTypes: [
          "Chinese",
          "Fruits",
          "Indian",
          "Italian",
          "Japanese",
          "PopularFood",
        ],
        Type: {
          Chinese: { size: 10 },
          Fruits: { size: 19 },
          Indian: { size: 13 },
          Italian: { size: 11 },
          Japanese: { size: 11 },
          PopularFood: { size: 92 },
        },
        totalSize: 156,
      },
      Peoples: {
        allTypes: ["Actors", "Players"],
        Type: { Actors: { size: 53 }, Players: { size: 17 } },
        totalSize: 70,
      },
      Sports: {
        allTypes: [
          "Acrobatic",
          "Air",
          "BallOverNet",
          "Catching",
          "Cycling",
          "PopularSports",
          "Striking",
        ],
        Type: {
          Acrobatic: { size: 12 },
          Air: { size: 7 },
          BallOverNet: { size: 7 },
          Catching: { size: 8 },
          Cycling: { size: 7 },
          PopularSports: { size: 50 },
          Striking: { size: 26 },
        },
        totalSize: 117,
      },
    },
  };
  /**
   * Gives the -
   * - Length of the type with minmum length
   * - Length of the type with maximum length
   *
   * @param {object} category - The category.
   * @returns {{min: number, max: number}} The maximun and minimun length.
   */
  function getCategorySize(category) {
    let min = Infinity,
      max = 0;

    category.allTypes.forEach(function (type) {
      const size = category.Type[type].size;
      if (size > max) max = size;
      if (size < min) min = size;
    });

    return { min, max };
  }
  /**
   * Parses the given arguments and returns proper params.
   *
   * @param {{count?: number, repeat?: boolean, category?: string}} options
   * @return {{count: number, repeat: boolean, category: string}} Proper sorted arguments.
   */
  function getOptions(options) {
    const params = {
      category: "",
      count: 1,
      repeat: false,
    };

    // Check if given category is a string
    const valid = isCategoryValid(options.category);

    // Set category
    if (options.category === undefined) {
      params.category = getRandomElement(Catelogue.allCategories);
    } else if (valid.result === false) {
      return { result: false, message: valid.message };
    } else if (Catelogue.allCategories.indexOf(options.category) === -1)
      params.category = getRandomElement(Catelogue.allCategories);
    else params.category = options.category;

    // Set count
    if (options.count !== undefined) {
      if (typeof options.count === "number" && options.count >= 1)
        params.count = Math.floor(options.count);
      else if (typeof options.count !== "number")
        return { result: false, message: "Count must be a number" };
      else return { result: false, message: "Count must be >= 1" };
    }

    // Set repeat
    if (options.repeat !== undefined) {
      if (typeof options.repeat === "boolean") params.repeat = options.repeat;
      else return { result: false, message: "Repeat must be a boolean" };
    }

    return params;
  }
  /**
   * Gives a random element from an array.
   *
   * @param {Array} list - The array to get a random element from.
   * @returns {any} The random element.
   */
  function getRandomElement(list) {
    const word = list[Math.floor(Math.random() * list.length)];
    return word;
  }
  /**
   * Checks if the given category is valid.
   *
   * @param {string} category - The category to check.
   * @returns {{result: boolean, message?: string}} True if the category is valid, false otherwise.
   */
  function isCategoryValid(category) {
    if (typeof category !== "string")
      return { result: false, message: "Category must be a string!!" };
    else if (category.length === 0 || !category.trim())
      return { result: false, message: "Category must not be empty!!" };

    return { result: true };
  }
  /**
   * Function to get a random word.
   *
   * Options:-
   * - count:- Number of words to return.
   * - repeat:- To repeat the same word.
   * - category:- Category of word(s) to return.
   *
   * @param {{count?: number, repeat?: boolean, category?: string}} options - The options for getting random word(s).
   * @returns {string[]} The array of random word(s) based on options.
   */
  window.getRandomWords = function (options = {}) {
    // Parse given parameters.
    const params = getOptions(options);

    // Check validity of parameters.
    if (params.result === false) return params.message;

    // Get the category of words.
    const category = Catelogue.Category[params.category];

    // Get the length of min and max type of category.
    const size = getCategorySize(category);

    const words = [];
    // If total requested words is less than the min size of category
    if (size.min >= params.count) {
      const type = getRandomElement(category.allTypes);
      const list = Words[params.category][type];
      while (words.length < params.count) {
        const word = getRandomElement(list);
        if (!params.repeat && words.indexOf(word) === -1) words.push(word);
        else if (params.repeat) words.push(word);
      }
    }
    // If total requested words is more than the max size of category
    else if (size.max < params.count) {
      // If repeat is requested, get words randomly from all types of category
      if (params.repeat) {
        while (words.length < params.count) {
          const type = getRandomElement(category.allTypes);
          const list = Words[params.category][type];
          const word = getRandomElement(list);
          words.push(word);
        }
      }
      // If repeat is not requested, get either 80% of total size of category or requested count
      // whichever is less from all types of category
      else {
        params.count = Math.min(params.count, category.totalSize * 0.8);
        while (words.length < params.count) {
          const type = getRandomElement(category.allTypes);
          const list = Words[params.category][type];
          const word = getRandomElement(list);
          if (words.indexOf(word) === -1) words.push(word);
        }
      }
    }
    // If total requested words is between min and max size of category
    else {
      // Get type having more or equal number of words than requested count
      let type;
      do type = getRandomElement(category.allTypes);
      while (params.count > category.Type[type].size);

      const list = Words[params.category][type];

      while (words.length < params.count) {
        const word = getRandomElement(list);
        if (!params.repeat && words.indexOf(word) === -1) words.push(word);
        else if (params.repeat) words.push(word);
      }
    }

    return words;
  };
  /**
   * List of Aquatic -> Animals
   */
  const Aquatic = [
    "Alligator",
    "Angelfish",
    "Angler fish",
    "Arowana",
    "Barnacle",
    "Catfish",
    "Clam",
    "Clownfish",
    "Codfish",
    "Coral",
    "Crab",
    "Crayfish",
    "Crocodile",
    "Cuttlefish",
    "Dolphin",
    "Eel",
    "Jellyfish",
    "Lobster",
    "Octopus",
    "Oyster",
    "Prawn",
    "Scallop",
    "Sea Lion",
    "Seahorse",
    "Seal",
    "Shark",
    "Shrimp",
    "Slug",
    "Snail",
    "Squid",
    "Starfish",
    "Stingray",
    "Tuna",
    "Turtle",
    "Walrus",
    "Whale",
  ];
  /**
   * List of Arthropods -> Animals
   */
  const Arthropods = [
    "Ant",
    "Bee",
    "Beetle",
    "Butterfly",
    "Caterpillar",
    "Centipede",
    "Crab",
    "Cricket",
    "Dragonfly",
    "Earthworm",
    "Earwig",
    "Fly",
    "Katydid",
    "Ladybug",
    "Lobster",
    "Millipede",
    "Mite",
    "Moth",
    "Prawn",
    "Scorpion",
    "Slug",
    "Sowbug",
    "Spider",
    "Tick",
    "Vinegaroon",
    "Wasp",
  ];
  /**
   * List of Birds -> Animals
   */
  const Birds = [
    "Angler",
    "Barracuda",
    "Bass",
    "Betta",
    "Blue tang",
    "Bluefish",
    "Bream",
    "Catfish",
    "Cod",
    "Dolphin",
    "Goldfish",
    "Grey mullet",
    "Haddock",
    "Mackerel",
    "Marlin",
    "Perch",
    "Pike",
    "Piranha",
    "Ray",
    "Salmon",
    "Sawfish",
    "Snapper",
    "Sockeye",
    "Swordfish",
    "Trout",
  ];
  /**
   * List of Desert -> Animals
   */
  const Desert = [
    "Armadillo",
    "Bighorn sheep",
    "Black widow spider",
    "Camel",
    "Centipede",
    "Coati",
    "Cobra",
    "Coral snake",
    "Coyote",
    "Eagle",
    "Fennec fox",
    "Gecko",
    "Gila monster",
    "Iguana",
    "Jackrabbit",
    "Kangaroo rat",
    "Llama",
    "Long-nosed bat",
    "Meerkat",
    "Ostrich",
    "Rattlesnake",
    "Scorpion",
    "Tortoise",
    "Vulture",
    "Xerus",
  ];
  /**
   * List of Endangered -> Animals
   */
  const Endangered = [
    "Blue Whale",
    "Bluefin Tuna",
    "Bonobo",
    "Bowhead Whale",
    "Brown Bear",
    "Cheetah",
    "Chimpanzee",
    "Chinchilla",
    "Cockatoo",
    "Dhole",
    "Dibbler",
    "Drill",
    "Dugong",
    "Elephant",
    "Gharial",
    "Giant Panda",
    "Gorilla",
    "Gray Whale",
    "Green Turtle",
    "Hawksbill Turtle",
    "Hippopotamus",
    "Indri",
    "Jackass Penguin",
    "Jaguar",
    "Javan Rhino",
  ];
  /**
   * List of Insects -> Animals
   */
  const Insects = [
    "Ant",
    "Backswimmer",
    "Caterpillar",
    "Dragonfly",
    "Earthworm",
    "Firefly",
    "Grasshopper",
    "Horse-fly",
    "Lace bug",
    "Maggot",
    "Nematode",
    "Plant bug",
    "Scarab beetle",
    "Termite",
    "Walkingstick",
  ];
  /**
   * List of Invertebrates -> Animals
   */
  const Invertebrates = [
    "Anemone",
    "Bee",
    "Beetle",
    "Butterfly",
    "Caterpillar",
    "Cockroach",
    "Cocoon",
    "Coral",
    "Crab",
    "Cricket",
    "Cuttlefish",
    "Grasshopper",
    "Jellyfish",
    "Lobster",
    "Moth",
    "Mussel",
    "Octopus",
    "Oyster",
    "Slug",
    "Snail",
    "Squid",
    "Starfish",
    "Termite",
    "Wasp",
    "Worm",
  ];
  /**
   * List of Mammals -> Animals
   */
  const Mammals = [
    "Agouti",
    "Bactrian camel",
    "Badger",
    "Bandicoot",
    "Capybara",
    "Caracal",
    "Dall's porpoise",
    "Dalmatian",
    "Fin whale",
    "Flying squirrel",
    "Fossa",
    "Harp seal",
    "Hedgehog",
    "Hippo",
    "Lemming",
    "Lemur",
    "Leopard",
    "Monkey",
    "Moose",
    "Narwhal",
    "Panda",
    "Pangolin",
    "Panther",
    "Skunk",
    "Snow leopard",
  ];
  /**
   * List of Reptiles -> Animals
   */
  const Reptiles = [
    "Adder",
    "Alligator",
    "Boa",
    "Chameleon",
    "Cobra",
    "Crocodile",
    "Gecko",
    "Gila monster",
    "Green anole",
    "Iguana",
    "Lizard",
    "Python",
    "Rattlesnake",
    "Skink",
    "Snake",
    "Taipan",
  ];
  /**
   * List of Vertebrates -> Animals
   */
  const Vertebrates = [
    "Bilby",
    "Buffalo",
    "Bat",
    "Binturong",
    "Bull",
    "Haddock",
    "Kissing fish",
    "Puffer",
    "Mackerel",
    "Marlin",
    "Penguin",
    "Jay",
    "Lovebird",
    "Pigeon",
    "Macaw",
    "Tadpole",
    "Viper",
    "Tortoise",
    "Toad",
    "Dolphin",
    "Coypu",
    "Dall's porpoise",
    "Donkey",
    "Eland",
    "Dalmatian",
    "Dromedary",
    "Elephant",
    "Quokka",
    "Reindeer",
    "Panther",
    "Quoll",
    "Rhinoceros",
  ];
  /**
   * List of Basic -> Colors
   */
  const Basic = [
    "black",
    "silver",
    "gray",
    "grey",
    "white",
    "maroon",
    "red",
    "purple",
    "fuchsia",
    "green",
    "lime",
    "olive",
    "yellow",
    "navy",
    "blue",
    "teal",
    "aqua",
    "orange",
  ];
  /**
   * List of Extended -> Colors
   */
  const Extended = [
    "aliceblue",
    "antiquewhite",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "blanchedalmond",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "greenyellow",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "limegreen",
    "linen",
    "magenta",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "oldlace",
    "olivedrab",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "rebeccapurple",
    "rebeccablack",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "whitesmoke",
    "yellowgreen",
    "transparent",
  ];
  /**
   * List of Chinese -> Food
   */
  const Chinese = [
    "Hotpot",
    "Sichuan Pork",
    "Shrimp",
    "Dumplings",
    "Chow Mein",
    "Roasted Duck",
    "Tofu",
    "Wontons",
    "Spring Rolls",
    "Fried Rice",
  ];
  /**
   * List of Fruits -> Food
   */
  const Fruits = [
    "Bananas",
    "Apples",
    "Strawberries",
    "Grapes",
    "Oranges",
    "Watermelon",
    "Blueberries",
    "Lemons",
    "Peaches",
    "Avocados",
    "Pineapple",
    "Cherries",
    "Cantaloupe",
    "Pears",
    "Limes",
    "Raspberries",
    "Blackberries",
    "Clementine",
    "Plums",
  ];
  /**
   * List of Indian -> Food
   */
  const Indian = [
    "Butter Chicken",
    "Dal Tadka",
    "Chaat",
    "Samosa",
    "Masala Chai",
    "Tandoori Chicken",
    "Matar Paneer",
    "Dhokla",
    "Vada Pav",
    "Dosa",
    "Idli",
    "Chole Bhature",
    "Kofta",
  ];
  /**
   * List of Italian -> Food
   */
  const Italian = [
    "Pizza",
    "Pasta",
    "Lasagna",
    "Gelato",
    "Panzanella",
    "Focaccia",
    "Spaghetti",
    "Ribollita",
    "Risotto",
    "Coffee",
    "Cicchetti",
  ];
  /**
   * List of Japanese -> Food
   */
  const Japanese = [
    "Teishoku",
    "Tempura",
    "Noodles",
    "Okonomiyaki",
    "Teppanyaki",
    "Sushi",
    "Yakiniku",
    "Yakitori",
    "Fugu",
    "Unagi",
    "Sukiyaki",
  ];
  /**
   * List of PopularFood -> Food
   */
  const PopularFood = [
    "Pasta",
    "French Fries",
    "Ice Cream",
    "Bread",
    "Fried Rice",
    "Pancakes",
    "Cake",
    "Burger",
    "Pizza",
    "Pumpkin Pie",
    "Chicken Pot Pie",
    "Banana",
    "Apple Pie",
    "Bagel",
    "Muffins",
    "Alfredo Sauce",
    "Ice Cream Cake",
    "Cheesecake",
    "Cheese",
    "Banana Bread",
    "Potato Chips",
    "Cheetos",
    "Doritos",
    "Tacos",
    "Burritos",
    "Chimichanga",
    "Enchilada",
    "Salsa",
    "Marinara Sauce",
    "Broccoli",
    "Kiwi",
    "Tomato",
    "Salad",
    "Steak",
    "Chicken Tenders",
    "Grilled Chicken",
    "Ribs",
    "Hot Dogs",
    "Fried Chicken",
    "Eggs",
    "Bacon",
    "Sausage",
    "Mashed Potatoes",
    "Stuffing",
    "Brownies",
    "Cookies",
    "Donuts",
    "Turkey",
    "Cranberry",
    "Gravy",
    "Green Beans",
    "Mac and Cheese",
    "Soup",
    "Lamb Chops",
    "Ham",
    "Sushi",
    "Teriyaki",
    "Popcorn",
    "Shrimp",
    "Lasagna",
    "Ravioli",
    "Gelatin",
    "Pudding",
    "Meatballs",
    "Gyro Sandwhich",
    "Pulled Pork",
    "Nachos",
    "Onion Rings",
    "Chocolate Cake",
    "Carrot Cake",
    "Tater Tots",
    "French Toast",
    "Baked Potato",
    "Crepes",
    "Chicken Nuggets",
    "Croissant",
    "Apple Sauce",
    "Sweet Potatoes",
    "Potato",
    "Cantalope",
    "Apple",
    "Orange",
    "Strawberries",
    "Peaches",
    "Honeydew",
    "Ginger Bread",
    "Mango",
    "Raspberries",
    "Blueberries",
    "Corn",
    "Tamale",
    "Calzone",
  ];
  /**
   * List of Actors -> Peoples
   */
  const Actors = [
    "Charlie Chaplin",
    "Marlon Brando",
    "Jack Nicholson",
    "Daniel Day-Lewis",
    "Meryl Streep",
    "Tom Hanks",
    "Mohanlal",
    "Robert De Niro",
    "Anthony Hopkins",
    "Al Pacino",
    "Leonardo DiCaprio",
    "Joaquin Phoenix",
    "Christoph Waltz",
    "Kamal Haasan",
    "Choi Min-sik",
    "Gary Oldman",
    "Heath Ledger",
    "Javier Bardem",
    "Mammootty",
    "Russell Crowe",
    "Anupam Kher",
    "Christian Bale",
    "Naseeruddin Shah",
    "George Clooney",
    "Sean Penn",
    "Kevin Spacey",
    "Johnny Depp",
    "Sean Connery",
    "Jennifer Lawrence",
    "Morgan Freeman",
    "Sandra Bullock",
    "Clint Eastwood",
    "Robin Williams",
    "Benedict Cumberbatch",
    "Tom Hiddleston",
    "Denzel Washington",
    "Amitabh Bachchan",
    "Cate Blanchett",
    "Bryan Cranston",
    "Irrfan Khan",
    "Jim Carrey",
    "Dustin Hoffman",
    "Nicolas Cage",
    "Hugh Jackman",
    "Adrien Brody",
    "Edward Norton",
    "Matt Damon",
    "Brad Pitt",
    "Samuel L. Jackson",
    "Jake Gyllenhaal",
    "Martin Freeman",
    "Jared Leto",
    "Thilakan  ",
  ];
  /**
   * List of Players -> Peoples
   */
  const Players = [
    "Cristiano Ronaldo",
    "LeBron James",
    "Lionel Messi",
    "Neymar Jr.",
    "Roger Federer",
    "Kevin Durant",
    "Tiger Woods",
    "James Rodriguez",
    "Rafael Nadal",
    "Kobe Bryant",
    "Gareth Bale",
    "Phil Mickelson",
    "MS Dhoni",
    "Usain Bolt",
    "Novak Djokovic",
    "Wayne Rooney",
    "Maria Sharapova",
  ];
  /**
   * List of Acrobatic -> Sports
   */
  const Acrobatic = [
    "Breakdancing",
    "Cheerleading",
    "Competitive dancing",
    "Dancesport",
    "Dragon dance and Lion dance",
    "Freerunning",
    "Gymnastics",
    "High kick",
    "Parkour",
    "Pole sports",
    "Stunt",
    "Trampolining",
  ];
  /**
   * List of Air -> Sports
   */
  const Air = [
    "Air racing",
    "Wingsuit flying",
    "Gliding",
    "Parachuting",
    "Paragliding",
    "Paramotoring",
    "Ultralight aviation",
  ];
  /**
   * List of BallOverNet -> Sports
   */
  const BallOverNet = [
    "Basketball",
    "Cestoball",
    "Flickerball",
    "Korfball",
    "Netball",
    "Ringball",
    "Slamball",
  ];
  /**
   * List of Catching -> Sports
   */
  const Catching = [
    "Dodgeball",
    "Frisbee",
    "Gaga",
    "Keep away",
    "Kin-Ball",
    "Newcomb ball",
    "Quidditch",
    "Yukigassen",
  ];
  /**
   * List of Cycling -> Sports
   */
  const Cycling = [
    "BMX",
    "Downhill mountain biking",
    "Dirt jumping",
    "Freestyle BMX",
    "Mountain biking",
    "Track cycling",
    "Underwater cycling",
  ];
  /**
   * List of PopularSports -> Sports
   */
  const PopularSports = [
    "Soccer",
    "Golf",
    "Basketball",
    "Tennis",
    "Cricket",
    "Boxing",
    "Hockey",
    "Baseball",
    "Wrestling",
    "Chess",
    "Swimming",
    "Volleyball",
    "Rugby",
    "Athletics",
    "Bowling",
    "Skating",
    "Gymnastics",
    "Ice Hockey",
    "Table Tennis",
    "Polo",
    "American Football",
    "Softball",
    "Cross Country",
    "Surfing",
    "Diving",
    "Sprint Running",
    "Sailing",
    "Archery",
    "Dressage",
    "Motorcycle racing",
    "Horse Racing",
    "Badminton",
    "Karate",
    "Skeleton Sport",
    "Triathlon",
    "Kickboxing",
    "Motocross",
    "Judo",
    "Taekwondo",
    "Shunty",
    "Fencing",
    "Lacrosse",
    "Snooker",
    "Rowing",
    "Snowboarding",
    "Weightlifting",
    "Futsal",
    "Squash",
    "Handball",
    "Target Shooting",
  ];
  /**
   * List of Striking -> Sports
   */
  const Striking = [
    "Bajiquan",
    "Bokator",
    "Boxing",
    "Capoeira",
    "Chess boxing",
    "Choi Kwang-Do",
    "Fujian White Crane",
    "Karate",
    "Kenpo",
    "Kickboxing",
    "Lethwei",
    "Muay Thai",
    "Pradal serey",
    "Sanshou",
    "Savate",
    "Shaolin Kung Fu",
    "Shin-kicking",
    "Sikaran",
    "Silat",
    "Subak",
    "Taekkyeon",
    "Taekwondo",
    "Taido",
    "Tang Soo Do",
    "Vovinam",
    "Wing Chun",
  ];
  /**
   * Object of Animals Types -> Words
   */
  const Animals = {
    Aquatic,
    Arthropods,
    Birds,
    Desert,
    Endangered,
    Insects,
    Invertebrates,
    Mammals,
    Reptiles,
    Vertebrates,
  };
  /**
   * Object of Colors Types -> Words
   */
  const Colors = {
    Basic,
    Extended,
  };
  /**
   * Object of Food Types -> Words
   */
  const Food = {
    Chinese,
    Fruits,
    Indian,
    Italian,
    Japanese,
    PopularFood,
  };
  /**
   * Object of Peoples Types -> Words
   */
  const Peoples = {
    Actors,
    Players,
  };
  /**
   * Object of Sports Types -> Words
   */
  const Sports = {
    Acrobatic,
    Air,
    BallOverNet,
    Catching,
    Cycling,
    PopularSports,
    Striking,
  };
  /**
   * Object of Categories
   */
  var Words = {
    Animals,
    Colors,
    Food,
    Peoples,
    Sports,
  };
})();
