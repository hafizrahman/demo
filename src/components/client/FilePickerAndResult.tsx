"use client";

import { Button, Card, Stack } from "@mui/material";
import FilePicker from "@/components/client/FilePicker";
import { useState } from "react";
import seasonalColorProfiles from "@/app/skin/seasonalColorProfiles";
import ColorProfileSection from "./ColorProfileSection";
import Resizer from "react-image-file-resizer";

export default function FilePickerAndResult() {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [base64Image, setBase64Image] = useState<string>();
    const [aiResponse, setAiResponse] = useState<string>();
    const randomItem = seasonalColorProfiles[Math.floor(Math.random() * seasonalColorProfiles.length)];

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
                  imageBase64: base64Image,
                  prompt: "What's in this image?",
                }),
              });
              
              const data = await result.json();
              console.log(data.result);
              setAiResponse(data.result);

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
                {base64Image && (
                    <>
                        <ColorProfileSection colorProfile={randomItem} />
                    </>
                )}

                {aiResponse && (
                    <div className="not-prose overflow-auto rounded-lg bg-white outline outline-black/5 dark:bg-gray-950/50 p-2">
                        <h3 className="text-2xl font-bold">AI Response</h3>
                        <p>{aiResponse}</p>
                    </div>
                )}
            </div>
        </>
    );
}
