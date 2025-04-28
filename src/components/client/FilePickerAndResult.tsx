"use client";

import { Button, Card, Stack } from "@mui/material";
import FilePicker from "@/components/client/FilePicker";
import { useState } from "react";
import seasonalColorProfiles from "@/app/lib/seasonalColorProfiles";
import ColorProfileSection from "./ColorProfileSection";
import Resizer from "react-image-file-resizer";

interface ColorProfileInfo {
    id: string;
    name: string;
    description: string;
    colors: { name: string; hex: string }[];
    metalAccents: string;
}

export default function FilePickerAndResult() {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [aiResponse, setAiResponse] = useState<string>();
    const [colorProfileInfo, setColorProfileInfo] = useState<ColorProfileInfo>();

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

    const resizeImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                512, // max width
                512, // max height
                "JPEG",
                50, // quality
                0,
                (uri) => {
                    resolve(uri as string);
                },
                "base64"
            );
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) return;
    
        try {
            const base64 = await resizeImageToBase64(selectedFile);
            setBase64Image(base64);
            console.log("Base64 ready:", base64);
    
            const result = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageBase64: base64,
                    prompt: seasonalColorAnalysisPrompt,
                    isDemo: true, // Set to true for demo mode, false for real API call
                }),
            });
    
            const data = await result.json();
            console.log(data.result);

            if (data.result === "none") {
                setAiResponse("none");
                setColorProfileInfo(undefined);
            } else {
                setAiResponse(data.result);
                setColorProfileInfo(seasonalColorProfiles.find(profile => profile.id === data.result));
            }
            
        } catch (err) {
            console.error("Image processing failed:", err);
        }
    };

    return (
        <>
            <Card className="p-4 space-y-6">
                <h2 className="text-4xl font-bold">Skin Tone Advisor</h2>
                <p className="text-lg">Pick a selfie photo and get your skin type analyzed!</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FilePicker handleSuccesfulSelection={setSelectedFile} />

                    <Stack direction="row" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!selectedFile}
                        >
                            Get recommendations
                        </Button>
                    </Stack>
                </form>
            </Card>
            <div>
                {aiResponse && (
                    <div className="not-prose overflow-auto rounded-lg bg-white outline outline-black/5 dark:bg-gray-950/50 p-2">
                        <h3 className="text-2xl font-bold">AI Response</h3>
                        <p>{aiResponse}</p>
                    </div>
                )}

                {colorProfileInfo && (
                    <ColorProfileSection
                        colorProfile={colorProfileInfo}
                    />
                )}
            </div>
        </>
    );
}
