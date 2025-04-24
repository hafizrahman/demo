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
}

export async function GET(request: Request) {
    return new Response("Hello, Next.js!");
}

export async function POST(req: NextRequest) {
    try {
        const { imageBase64, prompt }: RequestBody = await req.json();
        
        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "user",
                    content: [
                        { type: "input_text", text: prompt || "What's in this image?" },
                        //{ type: "input_image", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
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