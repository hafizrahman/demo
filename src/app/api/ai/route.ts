import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

interface RequestBody {
    imageBase64: string;
    prompt: string;
    isDemo: boolean;
}

export async function GET(request: Request) {
    return new Response("Hello, Next.js!");
}

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const { imageBase64, prompt, isDemo = false }: RequestBody = await req.json();

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
                        },
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
