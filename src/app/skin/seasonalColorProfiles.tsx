const seasonalColorProfiles = [
    {
      id: "light-spring",
      name: "Light Spring",
      undertone: "warm",
      description: "Warm undertones with light, delicate features and low contrast.",
      estimatedPopulationPercent: 6,
      colors: [
        { name: "Peach", hex: "#FFDAB9" },
        { name: "Coral", hex: "#FF7F50" },
        { name: "Mint Green", hex: "#98FF98" },
        { name: "Sky Blue", hex: "#87CEEB" },
        { name: "Lavender", hex: "#E6E6FA" },
        { name: "Butter Yellow", hex: "#FFFACD" },
        { name: "Light Aqua", hex: "#A2E8E0" }
      ]
    },
    {
      id: "true-spring",
      name: "True Spring",
      undertone: "warm",
      description: "Clear, warm undertones with a vibrant, sunny appearance.",
      estimatedPopulationPercent: 7,
      colors: [
        { name: "Goldenrod", hex: "#DAA520" },
        { name: "Warm Coral", hex: "#FF6F61" },
        { name: "Grass Green", hex: "#7CFC00" },
        { name: "Turquoise", hex: "#40E0D0" },
        { name: "Tomato Red", hex: "#FF6347" },
        { name: "Warm Beige", hex: "#F5DEB3" },
        { name: "Light Teal", hex: "#B2D8D8" }
      ]
    },
    {
      id: "bright-spring",
      name: "Bright Spring",
      undertone: "warm",
      description: "High contrast with warm undertones and clear, bright features.",
      estimatedPopulationPercent: 7,
      colors: [
        { name: "Bright Pink", hex: "#FF69B4" },
        { name: "Lime Green", hex: "#32CD32" },
        { name: "Bright Aqua", hex: "#00FFFF" },
        { name: "Sunshine Yellow", hex: "#FFD700" },
        { name: "Tomato", hex: "#FF6347" },
        { name: "Ivory", hex: "#FFFFF0" },
        { name: "Cobalt Blue", hex: "#0047AB" }
      ]
    },
    {
      id: "light-summer",
      name: "Light Summer",
      undertone: "cool",
      description: "Cool undertones with light and soft features.",
      estimatedPopulationPercent: 8,
      colors: [
        { name: "Powder Blue", hex: "#B0E0E6" },
        { name: "Soft Pink", hex: "#FFB6C1" },
        { name: "Lilac", hex: "#C8A2C8" },
        { name: "Mint", hex: "#AAF0D1" },
        { name: "Lavender Mist", hex: "#E6E6FA" },
        { name: "Soft Gray", hex: "#D3D3D3" },
        { name: "Ice Blue", hex: "#D0F0FD" }
      ]
    },
    {
      id: "true-summer",
      name: "True Summer",
      undertone: "cool",
      description: "Cool undertones with soft, blended coloring and lower contrast.",
      estimatedPopulationPercent: 9,
      colors: [
        { name: "Rose", hex: "#FFC0CB" },
        { name: "Wisteria", hex: "#C9A0DC" },
        { name: "Steel Blue", hex: "#4682B4" },
        { name: "Mauve", hex: "#E0B0FF" },
        { name: "Cool Gray", hex: "#A9A9A9" },
        { name: "Periwinkle", hex: "#CCCCFF" },
        { name: "Ocean Blue", hex: "#4F94CD" }
      ]
    },
    {
      id: "soft-summer",
      name: "Soft Summer",
      undertone: "neutral-cool",
      description: "Muted cool tones with a soft, gentle appearance and low contrast.",
      estimatedPopulationPercent: 8,
      colors: [
        { name: "Dusty Rose", hex: "#DCAE96" },
        { name: "Sage", hex: "#B2AC88" },
        { name: "Muted Blue", hex: "#7BAFD4" },
        { name: "Plum", hex: "#8E4585" },
        { name: "Soft Navy", hex: "#5D6D7E" },
        { name: "Stone Gray", hex: "#A9A9A9" },
        { name: "Warm Silver", hex: "#C0C0C0" }
      ]
    },
    {
      id: "soft-autumn",
      name: "Soft Autumn",
      undertone: "neutral-warm",
      description: "Warm, muted tones with a soft and low-contrast look.",
      estimatedPopulationPercent: 8,
      colors: [
        { name: "Olive Green", hex: "#808000" },
        { name: "Burnt Coral", hex: "#E9967A" },
        { name: "Terracotta", hex: "#E2725B" },
        { name: "Warm Taupe", hex: "#D2B48C" },
        { name: "Mustard", hex: "#FFDB58" },
        { name: "Dusty Teal", hex: "#669999" },
        { name: "Saddle Brown", hex: "#8B4513" }
      ]
    },
    {
      id: "true-autumn",
      name: "True Autumn",
      undertone: "warm",
      description: "Warm undertones with rich, earthy coloring and medium contrast.",
      estimatedPopulationPercent: 9,
      colors: [
        { name: "Rust", hex: "#B7410E" },
        { name: "Pumpkin", hex: "#FF7518" },
        { name: "Olive", hex: "#808000" },
        { name: "Camel", hex: "#C19A6B" },
        { name: "Forest Green", hex: "#228B22" },
        { name: "Marigold", hex: "#FFD700" },
        { name: "Mahogany", hex: "#C04000" }
      ]
    },
    {
      id: "deep-autumn",
      name: "Deep Autumn",
      undertone: "warm",
      description: "Dark and rich with warm undertones and deep hair/eye contrast.",
      estimatedPopulationPercent: 8,
      colors: [
        { name: "Espresso", hex: "#3B2F2F" },
        { name: "Auburn", hex: "#A52A2A" },
        { name: "Mustard", hex: "#FFDB58" },
        { name: "Deep Olive", hex: "#556B2F" },
        { name: "Brick Red", hex: "#B22222" },
        { name: "Copper", hex: "#B87333" },
        { name: "Teal", hex: "#008080" }
      ]
    },
    {
      id: "deep-winter",
      name: "Deep Winter",
      undertone: "cool",
      description: "Cool undertones with high contrast and rich, deep coloring.",
      estimatedPopulationPercent: 10,
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Burgundy", hex: "#800020" },
        { name: "Royal Purple", hex: "#6A0DAD" },
        { name: "True Red", hex: "#FF0000" },
        { name: "Midnight Blue", hex: "#191970" },
        { name: "Emerald Green", hex: "#50C878" },
        { name: "Cool White", hex: "#F8F8FF" }
      ]
    },
    {
      id: "true-winter",
      name: "True Winter",
      undertone: "cool",
      description: "Cool, crisp undertones with bold, high-contrast coloring.",
      estimatedPopulationPercent: 10,
      colors: [
        { name: "Crisp White", hex: "#FFFFFF" },
        { name: "Jet Black", hex: "#0A0A0A" },
        { name: "True Blue", hex: "#0000FF" },
        { name: "Fuchsia", hex: "#FF00FF" },
        { name: "Lemon Yellow", hex: "#FFF700" },
        { name: "Ruby Red", hex: "#9B111E" },
        { name: "Icy Pink", hex: "#FFDEE9" }
      ]
    },
    {
      id: "bright-winter",
      name: "Bright Winter",
      undertone: "cool",
      description: "Cool undertones with high clarity and vibrant contrasts.",
      estimatedPopulationPercent: 10,
      colors: [
        { name: "Hot Pink", hex: "#FF69B4" },
        { name: "Bright Cyan", hex: "#00FFFF" },
        { name: "Bright Yellow", hex: "#FFFF00" },
        { name: "Snow White", hex: "#FFFAFA" },
        { name: "Electric Blue", hex: "#7DF9FF" },
        { name: "Cherry Red", hex: "#D2042D" },
        { name: "Royal Blue", hex: "#4169E1" }
      ]
    }
  ];
  
export default seasonalColorProfiles;