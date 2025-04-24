"use client";

import { Button, Card, Stack } from "@mui/material";
import FilePicker from "@/components/client/FilePicker";
import { useState } from "react";
import seasonalColorProfiles from "@/app/skin/seasonalColorProfiles";
import ColorProfileSection from "./ColorProfileSection";

export default function FilePickerAndResult() {
    const [selectedFile, setSelectedFile] = useState<string>();
    const randomItem = seasonalColorProfiles[Math.floor(Math.random() * seasonalColorProfiles.length)];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting for analysis:", selectedFile);
        // TODO: API call here.
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
                {selectedFile && (
                    <ColorProfileSection colorProfile={randomItem} />
                )}
            </div>
        </>
    );
}
