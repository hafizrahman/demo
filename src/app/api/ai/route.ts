import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

// Prompt for color season analysis
const seasonalColorAnalysisPrompt = `Analyze the skin tone in this image and determine which of the 12 seasonal color archetypes it most closely matches. The archetypes are:

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

interface RequestBody {
    imageBase64: string;
    prompt?: string;
    isDemo?: boolean;
}

export async function GET(request: Request) {
    return new Response("Hello, Next.js!");
}

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const { imageBase64, prompt = seasonalColorAnalysisPrompt, isDemo = false }: RequestBody = await req.json();

        // If demo mode is activated, return a random color season
        if (isDemo) {
            const seasons = [
                'light-spring', 'true-spring', 'bright-spring',
                'light-summer', 'true-summer', 'soft-summer',
                'soft-autumn', 'true-autumn', 'deep-autumn',
                'deep-winter', 'true-winter', 'bright-winter'
            ];
            const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
            return NextResponse.json({ result: randomSeason });
        }

        // If not in demo mode, proceed with actual API call
        const response = await openai.responses.create({
            //model: "gpt-4o-mini",
            model: "gpt-4.1-mini",
            input: [
                {
                    role: "user",
                    content: [
                        { type: "input_text", text: prompt },
                        {
                            type: "input_image",
                            image_url: `${imageBase64}`,
                            detail: "low"
                        }
                    ],
                },
            ],
        });

        // Extract just the text from the response
        const responseText = response.output_text || "No response text available";
        return NextResponse.json({ result: responseText });

    } catch (error: any) {
        console.error('OpenAI Proxy Error:', error);
        return NextResponse.json(
            { error: error?.message || 'Failed to process image' },
            { status: 500 }
        );
    }
}
