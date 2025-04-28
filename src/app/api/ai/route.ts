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

    } catch (error: unknown) { // <--- Use unknown here
        console.error('OpenAI Proxy Error:', error);

        // --- Type Checking ---
        let errorMessage = 'Failed to process image'; // Default message
        if (error instanceof Error) {
            // If it's an actual Error object, we can safely access .message
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            // If a string was thrown
            errorMessage = error;
        } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
             // Handle cases where it might be an object with a message property but not an Error instance
             errorMessage = error.message;
        }
         // You could add more checks for other potential error types if needed

        return NextResponse.json(
            { error: errorMessage }, // Use the extracted or default message
            { status: 500 }
        );
    }
}
