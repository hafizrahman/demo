export const seasonalColorAnalysisPrompt = 
`Analyze the skin tone in this image and determine which of the 12 seasonal color archetypes it most closely matches. The archetypes are:

- light-spring: Warm undertones with light, delicate features and low contrast
- true-spring: Clear, warm undertones with a vibrant, sunny appearance
- bright-spring: High contrast with warm undertones and clear, bright features
- light-summer: Cool undertones with light and soft features
- true-summer: Cool undertones with soft, blended coloring and lower contrast
- soft-summer: Muted cool tones with a soft, gentle appearance and low contrast
- soft-autumn: Warm, muted tones with a soft and low-contrast look
- true-autumn: Warm undertones with rich, earthy coloring and medium contrast
- deep-autumn: Dark and rich with warm undertones and deep hair/eye contrast
- deep-winter: Cool undertones with high contrast and rich, deep coloring
- true-winter: Cool, crisp undertones with bold, high-contrast coloring
- bright-winter: Cool undertones with high clarity and vibrant contrasts

Respond with ONLY one of these IDs (e.g., "light-spring"). If you cannot detect a clear skin tone or cannot analyze the image, respond with only "none". Do not include any explanations, justifications, or additional text in your response.`;
