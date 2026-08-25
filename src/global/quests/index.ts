const invalid = [
  {
    name: "Uncategorized",
    sku_id: "8",
    products: [
      {
        name: "[Test] Cedric Collectible",
        items: [{ label: "A collectible test by Cedric", sku_id: "1491545171232559376", type: 0 }],
        sku_id: "1491545171232559376",
        type: 0,
      },
      {
        name: "[TEST] Pls ignore",
        items: [{ label: "test", sku_id: "1491545387268571177", type: 0 }],
        sku_id: "1491545387268571177",
        type: 0,
      },
      {
        name: "[TEST] Kevin McCollectible2",
        items: [
          { label: "This is a test collectible label2", sku_id: "1491544502937059340", type: 0 },
        ],
        sku_id: "1491544502937059340",
        type: 0,
      },
    ],
  },
  {
    name: "Misc Profile Frames",
    sku_id: "7",
    products: [
      {
        name: "[IGNORE - DUPLICATE] Lofi Skyline",
        items: [
          {
            inner_width: 1200,
            label:
              "A glowing neon cityscape in purple, pink, and blue stretches across the top of the profile against a dark night sky",
            layers: [
              {
                anchor: "top",
                id: "1511883747903934664",
                order: "back",
                responsive: false,
                type: "staple",
              },
            ],
            overflow_bottom: 0,
            overflow_horizontal: 0,
            overflow_top: 304,
            sku_id: "1493976288711672008",
            type: 3,
          },
        ],
        sku_id: "1493976288711672008",
        type: 3,
      },
      {
        name: "Do Not Use - Y2K",
        items: [
          {
            inner_width: 1200,
            label: "A chromatic border wraps around your profile",
            layers: [
              {
                anchor: "center",
                id: "1511909030375981056",
                order: "front",
                responsive: false,
                type: "border",
              },
              {
                anchor: "top",
                id: "1511909034461102151",
                order: "front",
                responsive: false,
                type: "staple",
              },
              {
                anchor: "bottom",
                id: "1511909040752431114",
                order: "front",
                responsive: false,
                type: "staple",
              },
            ],
            overflow_bottom: 207,
            overflow_horizontal: 56,
            overflow_top: 209,
            sku_id: "1491912717454540830",
            type: 3,
          },
        ],
        sku_id: "1491912717454540830",
        type: 3,
      },
      {
        name: "Shoujo",
        items: [
          {
            type: 3,
            sku_id: "1491880600054005780",
            label:
              "Anime-style character design and vibrant colors frame your profile like a shoujo manga panel",
            layers: [
              {
                id: "1511887478381088778",
                type: "staple",
                order: "front",
                anchor: "top",
                responsive: false,
              },
              {
                id: "1511887481904300224",
                type: "staple",
                order: "front",
                anchor: "bottom",
                responsive: false,
              },
            ],
            inner_width: 1200,
            overflow_top: 126,
            overflow_bottom: 116,
            overflow_horizontal: 56,
          },
        ],
        sku_id: "1491880600054005780",
        type: 3,
      },
      {
        name: "Do Not Use - Astrology",
        items: [
          {
            inner_width: 1200,
            label:
              "Astrological symbols and cosmic elements frame your profile like a zodiac chart",
            layers: [
              {
                anchor: "center",
                id: "1511836597438648501",
                order: "front",
                responsive: false,
                type: "border",
              },
              {
                anchor: "center",
                id: "1511836603969179879",
                order: "front",
                responsive: true,
                type: "rail",
              },
              {
                anchor: "top",
                id: "1511836607232344277",
                order: "front",
                responsive: false,
                type: "staple",
              },
              {
                anchor: "bottom",
                id: "1511836611158216865",
                order: "front",
                responsive: false,
                type: "staple",
              },
            ],
            overflow_bottom: 127,
            overflow_horizontal: 56,
            overflow_top: 304,
            sku_id: "1489397732144844902",
            type: 3,
          },
        ],
        sku_id: "1489397732144844902",
        type: 3,
      },
      {
        name: "Do Not Use - Fantasy Galaxy",
        items: [
          {
            inner_width: 1200,
            label: "A swirl of stars and cosmic dust frames your profile like a pocket galaxy",
            layers: [
              {
                anchor: "top",
                id: "1512141939426984117",
                order: "front",
                responsive: true,
                type: "rail",
              },
              {
                anchor: "top",
                id: "1511907713653801031",
                order: "front",
                responsive: false,
                type: "staple",
              },
              {
                anchor: "top",
                id: "1511907717302849676",
                order: "back",
                responsive: false,
                type: "staple",
              },
            ],
            overflow_bottom: 0,
            overflow_horizontal: 56,
            overflow_top: 291,
            sku_id: "1484726324592640052",
            type: 3,
          },
        ],
        sku_id: "1484726324592640052",
        type: 3,
      },
    ],
  },
  {
    name: "1478820291382743227",
    sku_id: "1478820291382743227",
    products: [
      {
        name: "Nitro Control",
        items: [
          {
            type: 2,
            sku_id: "1478820329936650464",
            label: "A chrome rocket ship sails through the galaxy.",
            palette: "cobalt",
          },
        ],
        sku_id: "1478820329936650464",
        type: 2,
      },
    ],
  },
  {
    name: "OOSLA",
    sku_id: "1464327525974151412",
    products: [
      {
        name: "Unicorns are Awesome",
        items: [{ type: 0, sku_id: "1464327740780974167", label: "labels are cool" }],
        sku_id: "1464327740780974167",
        type: 0,
      },
      {
        name: "Bug Catcher Wumpus",
        items: [{ type: 0, sku_id: "1487099062355361994", label: "OOSLA Quest Deco" }],
        sku_id: "1487099062355361994",
        type: 0,
      },
      {
        name: "Hakuna Bug-tata",
        items: [
          { type: 2, sku_id: "1488553242555187391", label: "OOSLA Quest Deco", palette: "forest" },
        ],
        sku_id: "1488553242555187391",
        type: 2,
      },
    ],
  },
  { name: "Holidays", sku_id: "1349486948942745691", products: [] },
  {
    name: "Nameplate Test",
    sku_id: "1344802365307621427",
    products: [
      {
        name: "Angel",
        items: [
          {
            type: 2,
            sku_id: "1344802364934062152",
            label: "It's angel time",
            palette: "bubble_gum",
          },
        ],
        sku_id: "1344802364934062152",
        type: 2,
      },
      {
        name: "Aurora",
        items: [
          { type: 2, sku_id: "1344802364971946054", label: "It's aurora time", palette: "teal" },
        ],
        sku_id: "1344802364971946054",
        type: 2,
      },
      {
        name: "Cherry Blossom",
        items: [
          {
            type: 2,
            sku_id: "1344802364992782366",
            label: "It's cherry blossom time",
            palette: "berry",
          },
        ],
        sku_id: "1344802364992782366",
        type: 2,
      },
      {
        name: "Dark Fantasy",
        items: [
          {
            type: 2,
            sku_id: "1344802365013753962",
            label: "It's dark fantasy time",
            palette: "violet",
          },
        ],
        sku_id: "1344802365013753962",
        type: 2,
      },
      {
        name: "Dreamy",
        items: [
          {
            type: 2,
            sku_id: "1344802365038919680",
            label: "It's dreamy time",
            palette: "bubble_gum",
          },
        ],
        sku_id: "1344802365038919680",
        type: 2,
      },
      {
        name: "Fairy Dust",
        items: [
          {
            type: 2,
            sku_id: "1344802365068279839",
            label: "It's fairy dust time",
            palette: "bubble_gum",
          },
        ],
        sku_id: "1344802365068279839",
        type: 2,
      },
      {
        name: "Galaxy",
        items: [
          { type: 2, sku_id: "1344802365089251429", label: "It's galaxy time", palette: "cobalt" },
        ],
        sku_id: "1344802365089251429",
        type: 2,
      },
      {
        name: "Glitch",
        items: [
          { type: 2, sku_id: "1344802365114417202", label: "It's glitch time", palette: "cobalt" },
        ],
        sku_id: "1344802365114417202",
        type: 2,
      },
      {
        name: "Heart Bloom",
        items: [
          {
            type: 2,
            sku_id: "1344802365135524007",
            label: "It's heart bloom time",
            palette: "bubble_gum",
          },
        ],
        sku_id: "1344802365135524007",
        type: 2,
      },
      {
        name: "Kawaii Gaming",
        items: [
          {
            type: 2,
            sku_id: "1344802365160689685",
            label: "It's kawaii gaming time",
            palette: "sky",
          },
        ],
        sku_id: "1344802365160689685",
        type: 2,
      },
      {
        name: "Kitsune",
        items: [
          { type: 2, sku_id: "1344802365177331822", label: "It's Kitsune time", palette: "cobalt" },
        ],
        sku_id: "1344802365177331822",
        type: 2,
      },
      {
        name: "Koi Pond",
        items: [
          { type: 2, sku_id: "1344802365198303314", label: "It's koi pond time", palette: "sky" },
        ],
        sku_id: "1344802365198303314",
        type: 2,
      },
      {
        name: "Lofi",
        items: [
          { type: 2, sku_id: "1344802365223469066", label: "It's lofi time", palette: "berry" },
        ],
        sku_id: "1344802365223469066",
        type: 2,
      },
      {
        name: "Lofi Cat",
        items: [
          { type: 2, sku_id: "1344802365244440606", label: "It's lofi cat time", palette: "berry" },
        ],
        sku_id: "1344802365244440606",
        type: 2,
      },
      {
        name: "Moon and Sun",
        items: [
          {
            type: 2,
            sku_id: "1344802365265412119",
            label: "It's moon and sun time",
            palette: "cobalt",
          },
        ],
        sku_id: "1344802365265412119",
        type: 2,
      },
    ],
  },
  {
    name: "Special Events 2",
    sku_id: "1309309974266118144",
    products: [
      {
        name: "New Year",
        items: [
          {
            type: 0,
            sku_id: "1174459415924064376",
            label:
              "Cheers to 2023, and we hope you have a wonderful new year in 2024! Gold 2024 balloons sit ontop of the avatar.",
          },
        ],
        sku_id: "1174459415924064376",
        type: 0,
      },
      {
        name: "Rift Butterfly",
        items: [
          {
            type: 0,
            sku_id: "1308169595055771749",
            label:
              "A rift butterfly shines in the center of the avatar, flutters its wings, and returns to the top of the avatar.",
          },
        ],
        sku_id: "1308169595055771749",
        type: 0,
      },
      {
        name: "Batarang",
        items: [
          {
            type: 0,
            sku_id: "1309270800099971122",
            label:
              "A spinning, bat-shaped metallic projectile hurtles into and impacts the screen, leaving a massive crack.",
          },
        ],
        sku_id: "1309270800099971122",
        type: 0,
      },
      {
        name: "Bush Camper",
        items: [
          {
            type: 0,
            sku_id: "1313309630851448833",
            label:
              "A bush encircles the avatar, with leaves gently rustling and swaying in a circular motion.",
          },
        ],
        sku_id: "1313309630851448833",
        type: 0,
      },
      {
        name: "Shield Potion",
        items: [
          {
            type: 0,
            sku_id: "1315750531330736211",
            label:
              "A potion bottle is uncorked, its contents emptied, and a pixelated aura swipes over the avatar from bottom to top.",
          },
        ],
        sku_id: "1315750531330736211",
        type: 0,
      },
      {
        name: "TGA Controller",
        items: [
          {
            type: 0,
            sku_id: "1315853682235019326",
            label:
              "Two joysticks and keypads control a target that moves in all directions around the profile picture.",
          },
        ],
        sku_id: "1315853682235019326",
        type: 0,
      },
      {
        name: "Shadow",
        items: [
          {
            type: 0,
            sku_id: "1316597786862419988",
            label:
              "Shadow teleports around multiple times, leaving a red and orange trail while striking various dynamic poses.",
          },
        ],
        sku_id: "1316597786862419988",
        type: 0,
      },
      {
        name: "Rec Room Lightning",
        items: [
          {
            type: 0,
            sku_id: "1319423712474435655",
            label: "A streak of orange lightning surrounds the avatar.",
          },
        ],
        sku_id: "1319423712474435655",
        type: 0,
      },
      {
        name: "WINGMAN'S GOT IT",
        items: [
          {
            type: 0,
            sku_id: "1325880072972013670",
            label:
              "VALORANT Agent Gekko's cute yellow creature happily bounces on top of your avatar",
          },
        ],
        sku_id: "1325880072972013670",
        type: 0,
      },
      {
        name: "Heart-to-Heart",
        items: [
          {
            type: 0,
            sku_id: "1326347611069874277",
            label:
              "A flurry of pink and red hearts surround around your avatar, swirling with a gentle touch before settling into a snug, cheek-to-cheek cuddle.",
          },
        ],
        sku_id: "1326347611069874277",
        type: 0,
      },
      {
        name: "Jeff the Land Shark",
        items: [
          {
            type: 0,
            sku_id: "1326718812279799809",
            label:
              "Jeff the Land Shark is an absolutely adorable, chonky cartoon shark who looks like it just discovered its love for snacks and hugs. It’s rocking a stylish pink collar with a shiny gold tag, like it’s ready to be your best aquatic buddy. Its big toothy grin says, “I’m cute, but I could still chomp if needed!”.",
          },
        ],
        sku_id: "1326718812279799809",
        type: 0,
      },
      {
        name: "Fuchsia Agent",
        items: [
          {
            type: 0,
            sku_id: "1329309467619229797",
            label:
              "A Fuchsia Agent character with a red shark swimming around the character's gray headband.",
          },
        ],
        sku_id: "1329309467619229797",
        type: 0,
      },
      {
        name: "Fortnite Boogie Bomb",
        items: [
          {
            type: 0,
            sku_id: "1334270711790833776",
            label:
              "A Boogie Bomb explodes, lowering a disco ball causing a festive disco light show",
          },
        ],
        sku_id: "1334270711790833776",
        type: 0,
      },
      {
        name: "Scout",
        items: [
          {
            type: 0,
            sku_id: "1336439189041975316",
            label:
              "An older man wearing a green cape and gray feathered hat holds a wooden staff and looks into the distance while shielding his eyes to scout ahead. Next to him, his sitting dog companion stands up and looks in the same direction.",
          },
        ],
        sku_id: "1336439189041975316",
        type: 0,
      },
      {
        name: "Hoppy Day",
        items: [
          {
            type: 0,
            sku_id: "1336506386296864839",
            label:
              "Your avatar has found a friend in the shape of a little brown bunny. It hops in delight when it sees you.",
          },
        ],
        sku_id: "1336506386296864839",
        type: 0,
      },
      {
        name: "Afternoon Breeze",
        items: [
          {
            type: 0,
            sku_id: "1336506386296864842",
            label:
              "Your avatar stands in a dreamy meadow, where pink and orange flowers sway to nature’s rhythm, sending petals twirling through the soft breeze.",
          },
        ],
        sku_id: "1336506386296864842",
        type: 0,
      },
      {
        name: "Shower Stroll",
        items: [
          {
            type: 0,
            sku_id: "1336506386296864845",
            label:
              "A soft rain drapes over your avatar, leaving a shimmering rainbow glow that whispers a touch of magic into the misty air.",
          },
        ],
        sku_id: "1336506386296864845",
        type: 0,
      },
      {
        name: "Exoborne",
        items: [
          {
            type: 0,
            sku_id: "1338927497860878466",
            label:
              "Metallic armor surrounds the avatar with pieces shifting into place and yellow indicator lights turning on.",
          },
        ],
        sku_id: "1338927497860878466",
        type: 0,
      },
      {
        name: "Big Dill Chain",
        items: [
          {
            type: 0,
            sku_id: "1341522018197311519",
            label:
              "A gold chain holding a gold medallion with a D that has two vertical slashes through it surrounds a green cap.",
          },
        ],
        sku_id: "1341522018197311519",
        type: 0,
      },
      {
        name: "Pathojen",
        items: [
          {
            type: 0,
            sku_id: "1346915187243876474",
            label:
              "This avatar decoration features a vibrant, neon-colored circular flame effect with an energetic, cartoonish character at the bottom left.",
          },
        ],
        sku_id: "1346915187243876474",
        type: 0,
      },
      {
        name: "Split Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1346987105028407307",
            label:
              "A circular energy effect split in two: the left side glows purple, the right golden-orange. A diagonal crystal-like fracture runs across it, with shimmering shards and sparks, creating a high-tech, futuristic, battle-worn look.",
          },
        ],
        sku_id: "1346987105028407307",
        type: 0,
      },
      {
        name: "Khazan Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1347624589571788951",
            label:
              "This Discord avatar decoration features a menacing, metallic circular frame composed of jagged, dark gray spikes with glowing blue crystal-like accents embedded throughout. The design gives off a sharp, armored aesthetic, reminiscent of a magical or futuristic battle-worn artifact.",
          },
        ],
        sku_id: "1347624589571788951",
        type: 0,
      },
      {
        name: "Gallica Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1349045865188294719",
            label: "A fairy is floating while flipping through pages in a book",
          },
        ],
        sku_id: "1349045865188294719",
        type: 0,
      },
      {
        name: "Supply Llama",
        items: [
          {
            type: 0,
            sku_id: "1352347590917882008",
            label:
              "A purple and blue llama body surrounds the frame, with a llama head on the top left.",
          },
        ],
        sku_id: "1352347590917882008",
        type: 0,
      },
      {
        name: "Clicker Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1357852406079291593",
            label:
              "Mushroom-shaped elements in orange-red and mint green colors surround the user's avatar. The organic, flowing fungal shapes have a natural, slightly oceanic aesthetic with a hand-drawn illustration style.",
          },
        ],
        sku_id: "1357852406079291593",
        type: 0,
      },
      {
        name: "Face of Corruption Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1359328540104986636",
            label:
              "This avatar decoration features two intense, screaming red stone faces split dramatically down the middle.",
          },
        ],
        sku_id: "1359328540104986636",
        type: 0,
      },
      {
        name: "Emma Frost Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1359953429778137322",
            label:
              "This avatar decoration features a confident, stylishly armored woman standing tall with a shimmering crystal levitating above her hand. The transparent center lets your avatar shine while being blessed by the aura of power, elegance, and just a dash of sass.",
          },
        ],
        sku_id: "1359953429778137322",
        type: 0,
      },
      {
        name: "Signal from Tau Ceti Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1360316550313283748",
            label:
              "Neon yellow-green overlays surround the user's avatar. The animated overlays show hazard stripes, exclamation marks, directional arrows, and letters and numbers that flicker.",
          },
        ],
        sku_id: "1360316550313283748",
        type: 0,
      },
      {
        name: "Slurp Barrel Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1360353397865447707",
            label:
              "A metallic barrel with the label 'Slurp co.' expands on top of the user's avatar and explodes into blue and white liquid.",
          },
        ],
        sku_id: "1360353397865447707",
        type: 0,
      },
      {
        name: "Hackclaw",
        items: [
          {
            type: 0,
            sku_id: "1362863977222115430",
            label:
              "Stylized avatar showing a white-haired character with turquoise highlights, with only the hair and hands visible. The hands appear to be wearing dark gloves with pink highlights, positioned on a keyboard.",
          },
        ],
        sku_id: "1362863977222115430",
        type: 0,
      },
      {
        name: "Friend of Dex",
        items: [
          {
            type: 0,
            sku_id: "1366429159961919569",
            label: "A vibrant yellow fox energetically frames a circular pink energy border.",
          },
        ],
        sku_id: "1366429159961919569",
        type: 0,
      },
      {
        name: "Shield Saw",
        items: [
          {
            type: 0,
            sku_id: "1362863977222115433",
            label:
              "Circular frame with metallic appearance, featuring a serrated outer edge. The center is light-colored, surrounded by silver triangular markers and gold trim, resembling a sci-fi portal or interface element.",
          },
        ],
        sku_id: "1362863977222115433",
        type: 0,
      },
      {
        name: "Fortnite Galactic Battle",
        items: [
          {
            type: 0,
            sku_id: "1369388182927442022",
            label:
              "Circular frame with two curved lines framing where a user's avatar would appear. The top curve is blue with a small circular emblem, while the bottom curve is red with a wheel-like symbol.",
          },
        ],
        sku_id: "1369388182927442022",
        type: 0,
      },
      {
        name: "Freshly Picked",
        items: [
          {
            type: 0,
            sku_id: "1369404111484751873",
            label:
              "Beautiful, juicy strawberries, blueberries, and oranges, still wet from being washed, circle the outside of your avatar and remind you that summer is here.",
          },
        ],
        sku_id: "1369404111484751873",
        type: 0,
      },
      {
        name: "Shield Saw",
        items: [
          {
            type: 0,
            sku_id: "1371943141321609357",
            label:
              "Circular frame with metallic appearance, featuring a serrated outer edge. The center is light-colored, surrounded by silver triangular markers and gold trim, resembling a sci-fi portal or interface element.",
          },
        ],
        sku_id: "1371943141321609357",
        type: 0,
      },
      {
        name: "The Bad Guys 2 Trailer",
        items: [
          {
            type: 0,
            sku_id: "1371949732066234571",
            label:
              "A bright, orange comet-like streak curves around the top-left of the frame, fading into sparks and glowing embers. The effect gives the avatar a sense of fiery motion.",
          },
        ],
        sku_id: "1371949732066234571",
        type: 0,
      },
      {
        name: "Mission: Impossible",
        items: [
          {
            type: 0,
            sku_id: "1373682603621744720",
            label: "Person running around in circles upside down",
          },
        ],
        sku_id: "1373682603621744720",
        type: 0,
      },
      {
        name: "Jurassic World Rebirth Trailer",
        items: [
          {
            type: 0,
            sku_id: "1374170804769652797",
            label: "Dinosaur roaring then fading away into the Jurassic World logo",
          },
        ],
        sku_id: "1374170804769652797",
        type: 0,
      },
      {
        name: "Open Beta",
        items: [
          {
            type: 0,
            sku_id: "1374394443997642803",
            label:
              "A circular cyan-blue ring with a faint light blue design in the center that resembles a stylized logo or emblem.",
          },
        ],
        sku_id: "1374394443997642803",
        type: 0,
      },
      {
        name: "Ballerina",
        items: [
          {
            type: 0,
            sku_id: "1377740268366991562",
            label:
              "Pink rays emit from the center of the decoration like a halo and two blue fluffy ends of a fur coat show on the sides.",
          },
        ],
        sku_id: "1377740268366991562",
        type: 0,
      },
      {
        name: "Ultron",
        items: [
          {
            type: 0,
            sku_id: "1377856108282253333",
            label:
              "Metallic claws drag open a red swirling portal. The metallic claws disappear and Ultron appears through the portal.",
          },
        ],
        sku_id: "1377856108282253333",
        type: 0,
      },
      {
        name: "Marvel Snap Venom",
        items: [
          {
            type: 0,
            sku_id: "1379222146274033798",
            label:
              "A glowing cube in the bottom left becomes enveloped by black organic material and disappears. The organic material circulates around the avatar and transforms into Venom's face. The face takes a large bite and transforms back into a large glowing cube.",
          },
        ],
        sku_id: "1379222146274033798",
        type: 0,
      },
      {
        name: "How to Train Your Dragon",
        items: [
          {
            type: 0,
            sku_id: "1379879504629207180",
            label: "Ornate circular frame with a Dragon and a weathered metallic finish",
          },
        ],
        sku_id: "1379879504629207180",
        type: 0,
      },
      {
        name: "Starlight Revolver",
        items: [
          {
            type: 0,
            sku_id: "1380276497209622529",
            label:
              "A circular purple gradient border with decorative four-pointed stars in pink, cyan, purple, and orange scattered around the outside edge.",
          },
        ],
        sku_id: "1380276497209622529",
        type: 0,
      },
      {
        name: "R6 Siege X Avatar",
        items: [
          {
            type: 0,
            sku_id: "1380688086941302906",
            label:
              "A metallic sledge hammer twirls before smashing a wooden panel with a large green X painted on the center of it.",
          },
        ],
        sku_id: "1380688086941302906",
        type: 0,
      },
      {
        name: "Towerborne Play",
        items: [
          {
            type: 0,
            sku_id: "1382044334890680442",
            label:
              "A white and red fox mask turns to face the viewer. Streams of light emanate from its eyes before it returns to the upper left portion of the frame.",
          },
        ],
        sku_id: "1382044334890680442",
        type: 0,
      },
      {
        name: "28 Years Later",
        items: [
          {
            type: 0,
            sku_id: "1383123340142841949",
            label:
              "Animated avatar decoration depicting a pile of skulls stacked on the ground in the bottom left corner, with dark, jagged bones or spikes protruding from the back.",
          },
        ],
        sku_id: "1383123340142841949",
        type: 0,
      },
      {
        name: "M3GAN 2.0",
        items: [
          {
            type: 0,
            sku_id: "1383136910435811430",
            label:
              "Animated M3GAN avatar frame with a dark spinning ring and M3GAN standing in a tan dress.",
          },
        ],
        sku_id: "1383136910435811430",
        type: 0,
      },
      {
        name: "LEGO® Fortnite",
        items: [
          {
            type: 0,
            sku_id: "1384216812488757359",
            label:
              "Circular LEGO® Fortnite avatar frame with fire, ice, and tech-themed emblems in red, blue, and green.",
          },
        ],
        sku_id: "1384216812488757359",
        type: 0,
      },
      {
        name: "I Love R.E.P.O.",
        items: [
          {
            type: 0,
            sku_id: "1384247972107386911",
            label:
              "A goofy yellow head with large, wide-set cartoon eyes and a huge open mouth, forming a playful ring around the avatar.",
          },
        ],
        sku_id: "1384247972107386911",
        type: 0,
      },
      {
        name: "SuperCell",
        items: [
          {
            type: 0,
            sku_id: "1385015130466680995",
            label:
              "Animated green cactus character with red flowers waving next to a decorative circular frame with small leaves",
          },
        ],
        sku_id: "1385015130466680995",
        type: 0,
      },
      {
        name: "Palia",
        items: [
          {
            type: 0,
            sku_id: "1386849676875141292",
            label:
              "Animated cute fox peeking out from a circular woodland frame decorated with branches, green leaves, and small white flowers.",
          },
        ],
        sku_id: "1386849676875141292",
        type: 0,
      },
      {
        name: "VALORANT Summer Kickoff",
        items: [
          {
            type: 0,
            sku_id: "1386838941801382010",
            label:
              "Animated carnival mask with colorful feathers and ribbons in purple, blue, and yellow.",
          },
        ],
        sku_id: "1386838941801382010",
        type: 0,
      },
      {
        name: "Dilophosaurus",
        items: [
          {
            type: 0,
            sku_id: "1388206477491175517",
            label:
              "Circular frame with gold and black border featuring an animated Dilophosaurus that emerges from the left side. The Dilophosaurus moves its head around the frame edge, and as the animation concludes, its colorful neck frill extends to partially cover the circular white space designed for a profile picture.",
          },
        ],
        sku_id: "1388206477491175517",
        type: 0,
      },
      {
        name: "Moomoo Hood",
        items: [
          {
            type: 0,
            sku_id: "1387485784419995649",
            label:
              "Cartoon cow frame with pink ears, black spots on white fur, and gold bell at bottom. Circular opening centers where user's profile picture appears.",
          },
        ],
        sku_id: "1387485784419995649",
        type: 0,
      },
      {
        name: "Mecha BREAK",
        items: [
          {
            type: 0,
            sku_id: "1390436532988674091",
            label:
              "A futuristic metallic helmet encloses the avatar. The eyes shine with a blue light before the helmet opens up again.",
          },
        ],
        sku_id: "1390436532988674091",
        type: 0,
      },
      {
        name: "THPS Half Pipe",
        items: [
          {
            type: 0,
            sku_id: "1391785327613706301",
            label:
              "An aeriel view of a retro style half pipe with graffiti art flanks the frame. An orange skateboard drops in and performs a spinning trick, then returns to the bottom left of the frame.",
          },
        ],
        sku_id: "1391785327613706301",
        type: 0,
      },
      {
        name: "Jet Ring",
        items: [{ type: 0, sku_id: "1409978159255785652", label: "Give your avatar a new look." }],
        sku_id: "1409978159255785652",
        type: 0,
      },
      {
        name: "Blast Off",
        items: [
          {
            type: 1,
            sku_id: "1409978969670815795",
            title: "Blast Off",
            description: "Show this effect when others view your profile.",
            accessibilityLabel: "Show this effect when others view your profile.",
            animationType: 1,
            staticFrameSrc:
              "https://cdn.discordapp.com/assets/content/f2865fa070e5a4b90d75044d695587ad3f15f29d01d79c462a900d2c9d76bba1",
            thumbnailPreviewSrc:
              "https://cdn.discordapp.com/assets/content/15d4ee817f281d45c8060349acaa5855c5321564594b30ca61913acb88e67e00",
            reducedMotionSrc:
              "https://cdn.discordapp.com/assets/content/7a7173a103bd32107c451319a6f5fb7bf015de212587e843fceab4c0dffdb198",
            effects: [
              {
                src: "https://cdn.discordapp.com/assets/content/00f3f29848f11b215e277e10320a6a5c4428bee49bd7c9db5493280b4358e186",
                loop: false,
                height: 880,
                width: 450,
                duration: 2000,
                start: 0,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 100,
                randomizedSources: [],
              },
              {
                src: "https://cdn.discordapp.com/assets/content/aba3fdf9a8c4c9d35f9d4b35a9a81ddde2ba3a86c5d6159e7ee4fbfff084c532",
                loop: true,
                height: 880,
                width: 450,
                duration: 3000,
                start: 2000,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 101,
                randomizedSources: [],
              },
            ],
          },
        ],
        sku_id: "1409978969670815795",
        type: 1,
      },
      {
        name: "Jet Stream",
        items: [
          {
            type: 2,
            sku_id: "1409983105577783410",
            label: "Make your name stand out in servers and chats.",
            palette: "violet",
          },
        ],
        sku_id: "1409983105577783410",
        type: 2,
      },
      {
        name: "Nitro Jet Fuel",
        items: [
          { type: 0, sku_id: "1409978159255785652", label: "Give your avatar a new look." },
          {
            type: 1,
            sku_id: "1409978969670815795",
            title: "Blast Off",
            description: "Show this effect when others view your profile.",
            accessibilityLabel: "Show this effect when others view your profile.",
            animationType: 1,
            staticFrameSrc:
              "https://cdn.discordapp.com/assets/content/f2865fa070e5a4b90d75044d695587ad3f15f29d01d79c462a900d2c9d76bba1",
            thumbnailPreviewSrc:
              "https://cdn.discordapp.com/assets/content/15d4ee817f281d45c8060349acaa5855c5321564594b30ca61913acb88e67e00",
            reducedMotionSrc:
              "https://cdn.discordapp.com/assets/content/7a7173a103bd32107c451319a6f5fb7bf015de212587e843fceab4c0dffdb198",
            effects: [
              {
                src: "https://cdn.discordapp.com/assets/content/00f3f29848f11b215e277e10320a6a5c4428bee49bd7c9db5493280b4358e186",
                loop: false,
                height: 880,
                width: 450,
                duration: 2000,
                start: 0,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 100,
                randomizedSources: [],
              },
              {
                src: "https://cdn.discordapp.com/assets/content/aba3fdf9a8c4c9d35f9d4b35a9a81ddde2ba3a86c5d6159e7ee4fbfff084c532",
                loop: true,
                height: 880,
                width: 450,
                duration: 3000,
                start: 2000,
                loopDelay: 0,
                position: { x: 0, y: 0 },
                zIndex: 101,
                randomizedSources: [],
              },
            ],
          },
          {
            type: 2,
            sku_id: "1409983105577783410",
            label: "Make your name stand out in servers and chats.",
            palette: "violet",
          },
        ],
        sku_id: "1410030846337093672",
        type: 1000,
      },
      {
        name: "Bonsai - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853949", label: "A bonsai avatar decoration." }],
        sku_id: "1440174638930853949",
        type: 0,
      },
      {
        name: "Donut - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853950", label: "A donut avatar decoration." }],
        sku_id: "1440174638930853950",
        type: 0,
      },
      {
        name: "Capybara - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853951", label: "A capybara avatar decoration." }],
        sku_id: "1440174638930853951",
        type: 0,
      },
      {
        name: "Disco - Checkpoint 2025",
        items: [
          { type: 0, sku_id: "1440174638930853952", label: "A disco ball avatar decoration." },
        ],
        sku_id: "1440174638930853952",
        type: 0,
      },
      {
        name: "Origami - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853953", label: "An origami avatar decoration." }],
        sku_id: "1440174638930853953",
        type: 0,
      },
      {
        name: "Snail - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853954", label: "A snail avatar decoration." }],
        sku_id: "1440174638930853954",
        type: 0,
      },
      {
        name: "Duck - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853955", label: "A duck avatar decoration." }],
        sku_id: "1440174638930853955",
        type: 0,
      },
      {
        name: "Banana - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853956", label: "A banana avatar decoration." }],
        sku_id: "1440174638930853956",
        type: 0,
      },
      {
        name: "Cat - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853957", label: "A cat avatar decoration." }],
        sku_id: "1440174638930853957",
        type: 0,
      },
      {
        name: "Cassette - Checkpoint 2025",
        items: [{ type: 0, sku_id: "1440174638930853958", label: "A cassette avatar decoration." }],
        sku_id: "1440174638930853958",
        type: 0,
      },
      {
        name: "Full HP",
        items: [
          {
            type: 0,
            sku_id: "1464006538304684063",
            label:
              "Three pixel-style red hearts appear above the user’s avatar. Each heart gradually fills from empty to full in a loop, mimicking a video game health bar animation.",
          },
        ],
        sku_id: "1464006538304684063",
        type: 0,
      },
      {
        name: "Full Heart",
        items: [
          {
            type: 2,
            sku_id: "1464017397081047081",
            label:
              "A red pixel-style heart is displayed to the right of the user’s name. The heart slowly fills from empty to full in a repeating animation.",
            palette: "crimson",
          },
        ],
        sku_id: "1464017397081047081",
        type: 2,
      },
    ],
  },
  {
    name: "Special Events",
    sku_id: "1217175518781243583",
    products: [
      {
        name: "Ghosts",
        items: [
          {
            type: 0,
            sku_id: "1157411685687115858",
            label:
              "You notice two spooky ghosts twirling around each other in an eternal dance. Are they friend or foe?",
          },
        ],
        sku_id: "1157411685687115858",
        type: 0,
      },
      {
        name: "Graveyard Cat",
        items: [
          {
            type: 0,
            sku_id: "1157411984371880118",
            label:
              "Bathed in the glow of a full moon, a mysterious black cat is perched upon a tombstone, playfully pawing the tomb's exterior.",
          },
        ],
        sku_id: "1157411984371880118",
        type: 0,
      },
      {
        name: "Jack-o'-lantern",
        items: [
          {
            type: 0,
            sku_id: "1157412388509864068",
            label:
              "A gleeful jack-o'-lantern cackles atop a dark, twisted branch, with bats swirling above to join in on the spooky shenanigans.",
          },
        ],
        sku_id: "1157412388509864068",
        type: 0,
      },
      {
        name: "Minions",
        items: [
          {
            type: 0,
            sku_id: "1157412779335090267",
            label:
              "A one-eyed magic cauldron hovers in the air, bubbling with a strange, green brew. Its winged jack-o'-lantern companion flaps nearby. What mischief are they brewing?",
          },
        ],
        sku_id: "1157412779335090267",
        type: 0,
      },
      {
        name: "I'm a Clown",
        items: [
          {
            type: 0,
            sku_id: "1216908559548289084",
            label:
              "An avatar wears a vibrant ensemble of colorful clown hair, bowtie, and a striking red nose that balloons and pops.",
          },
        ],
        sku_id: "1216908559548289084",
        type: 0,
      },
      {
        name: "Gyoiko Sakura",
        items: [
          {
            type: 0,
            sku_id: "1225876188074082374",
            label:
              "The petals of three lovely, green cherry blossoms drift softly across the avatar.",
          },
        ],
        sku_id: "1225876188074082374",
        type: 0,
      },
      {
        name: "Mokoko",
        items: [
          {
            type: 0,
            sku_id: "1226939756617793606",
            label:
              "An affectionate Mokoko hugs the avatar then slides down and climbs back up to hug the avatar again.",
          },
        ],
        sku_id: "1226939756617793606",
        type: 0,
      },
      {
        name: "Warp Helmet",
        items: [
          {
            type: 0,
            sku_id: "1251324401459265537",
            label: "Futuristic Helmet, Blue with Green Warp Speed Light, Animated",
          },
        ],
        sku_id: "1251324401459265537",
        type: 0,
      },
      {
        name: "Fortnite Victory Crown",
        items: [
          {
            type: 0,
            sku_id: "1252353273256480818",
            label:
              "A gold, sparkly crown with a llama adornment tilts up and down. The avatar sparkles and glows with a golden aura.",
          },
        ],
        sku_id: "1252353273256480818",
        type: 0,
      },
      {
        name: "Freezer Bunny Lovebug",
        items: [
          {
            type: 0,
            sku_id: "1262457693965258874",
            label:
              "An adorable Freezer Bunny. It bounces upward into frame and throws hearts into the sky around the avatar.",
          },
        ],
        sku_id: "1262457693965258874",
        type: 0,
      },
      {
        name: "Wingman Boba",
        items: [
          {
            type: 0,
            sku_id: "1262473048876122112",
            label:
              "VALORANT Agent Gekko's cute yellow creature presents you with a boba tea and happily floats beside your avatar, creating a delightful and playful atmosphere.",
          },
        ],
        sku_id: "1262473048876122112",
        type: 0,
      },
      {
        name: "Los Santos",
        items: [
          {
            type: 0,
            sku_id: "1262518692248420434",
            label:
              'Reads "City of Los Santos, Founded 1781", and shows a helicopter with a searchlight flying into the frame.',
          },
        ],
        sku_id: "1262518692248420434",
        type: 0,
      },
      {
        name: "Test Collectible Quest Reward",
        items: [
          {
            type: 0,
            sku_id: "1272728337848074271",
            label:
              "The petals of three lovely, green cherry blossoms drift softly across the avatar.",
          },
        ],
        sku_id: "1272728337848074271",
        type: 0,
      },
      {
        name: "Hailey",
        items: [
          {
            type: 0,
            sku_id: "1278392092258734091",
            label:
              "A white fur coat hood that pulls a cover over the mouth as snow falls around the decoration",
          },
        ],
        sku_id: "1278392092258734091",
        type: 0,
      },
      {
        name: "Torgal Puppy",
        items: [
          {
            type: 0,
            sku_id: "1280648686736638003",
            label: "Torgal the Puppy chasing a firefly but not catching it.",
          },
        ],
        sku_id: "1280648686736638003",
        type: 0,
      },
      {
        name: "Street Fighter 6 Battle Field Avatar Decoration",
        items: [
          {
            type: 0,
            sku_id: "1280648686749352003",
            label:
              "Shows two health bars, a timer, fireballs moving between the two health bars, and the word FIGHT!",
          },
        ],
        sku_id: "1280648686749352003",
        type: 0,
      },
      {
        name: "Bunny",
        items: [
          {
            type: 0,
            sku_id: "1280648686749352007",
            label: "A futuristic headpiece with glowing ears that crackle with electric energy.",
          },
        ],
        sku_id: "1280648686749352007",
        type: 0,
      },
      {
        name: "Wolf Morph",
        items: [
          {
            type: 0,
            sku_id: "1286046055498252319",
            label: "Wolf Morph appears, shakes their head, then disappears",
          },
        ],
        sku_id: "1286046055498252319",
        type: 0,
      },
      {
        name: "2025 Balloons",
        items: [
          {
            type: 0,
            sku_id: "1301993378484850769",
            label: "Gold, metallic, balloon-style numbers arranged to spell 2025.",
          },
        ],
        sku_id: "1301993378484850769",
        type: 0,
      },
      {
        name: "Holiday Cat Ears",
        items: [
          {
            type: 0,
            sku_id: "1301993378484850771",
            label:
              "A Santa hat with a red, pointed top and fluffy white trim, designed with two prominent cat ears that stick up on either side",
          },
        ],
        sku_id: "1301993378484850771",
        type: 0,
      },
      {
        name: "Snowfall",
        items: [
          {
            type: 0,
            sku_id: "1301993378484850773",
            label: "Snowflakes fall gently around the avatar, creating a winter wonderland.",
          },
        ],
        sku_id: "1301993378484850773",
        type: 0,
      },
      {
        name: "Gear Spin",
        items: [
          {
            type: 0,
            sku_id: "1304519765917696011",
            label:
              "A pink and purple gear spins rapidly around your avatar, putting off neon green sparks. Careful with that.",
          },
        ],
        sku_id: "1304519765917696011",
        type: 0,
      },
      {
        name: "Wallach IX Spaceport",
        items: [
          {
            type: 0,
            sku_id: "1305905202578325535",
            label:
              "A spacecraft flies by two pillars at the Wallach IX Spaceport past a glowing crescent ring and disappears.",
          },
        ],
        sku_id: "1305905202578325535",
        type: 0,
      },
    ],
  },
  {
    name: "Breakfast",
    sku_id: "1144054000099012659",
    products: [
      {
        name: "Toast",
        items: [
          {
            type: 0,
            id: "1144056139584127059",
            sku_id: "1144056139584127058",
            label: "Toast Being Eaten, Animated",
          },
        ],
        sku_id: "1144056139584127058",
      },
      {
        name: "Morning Coffee",
        items: [
          {
            type: 0,
            id: "1144056631374647459",
            sku_id: "1144056631374647458",
            label: "Coffee with Milk Steaming from Blue Mug with Smiley Face, Animated",
          },
        ],
        sku_id: "1144056631374647458",
      },
      {
        name: "Fried Egg",
        items: [
          {
            type: 0,
            id: "1144057023726628946",
            sku_id: "1144057023726628945",
            label: "Runny Egg Yolk, Animated",
          },
        ],
        sku_id: "1144057023726628945",
      },
      {
        name: "Blueberry Jam",
        items: [
          {
            type: 0,
            id: "1144057249392771146",
            sku_id: "1144057249392771145",
            label: "Blueberry Jam Spelling the Letters ‘mmmm’, Animated",
          },
        ],
        sku_id: "1144057249392771145",
      },
      {
        name: "Doughnut",
        items: [
          {
            type: 0,
            id: "1144057486203158561",
            sku_id: "1144057486203158560",
            label: "Doughnut with Pink Glaze and Sprinkles, Animated",
          },
        ],
        sku_id: "1144057486203158560",
      },
      {
        name: "Pancakes",
        items: [
          {
            type: 0,
            id: "1144057737475534890",
            sku_id: "1144057737475534889",
            label: "Stack of Pancakes with Butter and Syrup, Animated",
          },
        ],
        sku_id: "1144057737475534889",
      },
    ],
  },
];

export { invalid };
