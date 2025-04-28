// Component to be used as a skin advisor picker
// It should use FilePicker from "@/components/client/FilePicker";
// The layout should be a regular div with the filepicker inside of it.
// When an image is selected, the image should be set as the background image of the div, and should cover
// the entire div with no repeat. It's OK to zoom or crop as long as it centered.

'use client';

import { Button, Stack } from "@mui/material";
import FilePicker from "@/components/client/FilePicker";
import { useState } from "react";
import Resizer from "react-image-file-resizer";
import { seasonalColorAnalysisPrompt } from "@/app/lib/prompts";
import Image from "next/image";


interface SkinAdvisorPickerProps {
    setIsLoading: (isLoading: boolean) => void;
    handleSuccessfulSelection: () => void;
    onAnalysisComplete: (result: string) => void;
}

export default function SkinAdvisorPicker({
    setIsLoading,
    handleSuccessfulSelection,
    onAnalysisComplete
}: SkinAdvisorPickerProps) {

    const [selectedFile, setSelectedFile] = useState<File>();
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

    // Resize the image into smaller, lower quality one to reduce API token costs.
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

    const handleFileSelection = (file: File) => {
        handleSuccessfulSelection();
        setSelectedFile(file);

        // Clean up previous object URL if it exists
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }

        // Create a URL for the image preview
        const imageUrl = URL.createObjectURL(file);
        setImagePreviewUrl(imageUrl);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsLoading(true);

        try {
            const base64Image = await resizeImageToBase64(selectedFile);

            const result = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageBase64: base64Image,
                    prompt: seasonalColorAnalysisPrompt,
                    isDemo: false, // Set to true for demo mode, false for real API call
                }),
            });

            const data = await result.json();
            console.log(data.result);

            onAnalysisComplete(data.result);
        } catch (err) {
            console.error("Image processing failed:", err);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <div className="mb-4">
                <FilePicker handleSuccesfulSelection={handleFileSelection} />
            </div>

            {!selectedFile && (
                <div className="flex flex-col items-center justify-center h-full">
                    <Image alt="face" src="/selfie.png" width={256} height={256} className="rounded-lg object-cover" />
                    <h2 className="text-md mt-4 mb-4">Please pick an image first using the button above.</h2>
                </div>
            )}


            <div className="rounded-lg transition-all duration-300 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : 'none',
                }}
            >
                <div className="rounded-lg backdrop-blur-sm bg-white/10 py-1">
                    {selectedFile &&
                        <div className="rounded-md border-1 border-white m-4">
                            <Image
                                alt={selectedFile.name}
                                src={URL.createObjectURL(selectedFile)}
                                className="w-full h-75 rounded-lg object-cover"
                                width="512"
                                height="512"
                            />
                        </div>
                    }
                </div>

                </div>
                <form onSubmit={handleSubmit} className="mt-2">
                    <Stack direction="row" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!selectedFile}
                            className="m-4 p-1 w-full rounded-full from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r"
                        ><span className="">
                            ✨ Get color advice! ✨
                            </span>
                        </Button>
                    </Stack>
                </form>
        </div>
    );
}
