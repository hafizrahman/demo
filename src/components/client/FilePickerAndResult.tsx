"use client";

import { Card } from "@mui/material"
import FilePicker from "@/components/client/FilePicker"
import { useState } from "react"
import seasonalColorProfiles from "@/app/skin/seasonalColorProfiles";
import ColorProfileSection from "./ColorProfileSection";

export default function FilePickerAndResult() {
    const [selectedFile, setSelectedFile] = useState<string>()
    const randomItem = seasonalColorProfiles[Math.floor(Math.random() * seasonalColorProfiles.length)];
    return (
        <>
            <Card className="p-4 space-y-6">
                <h2 className="text-4xl font-bold">Skin Tone Advisor</h2>
                <p className="text-lg">Pick a selfie photo and get your skin type analyzed!</p>
                <p className="text-sm italic"></p>
                <FilePicker handleSuccesfulSelection={ setSelectedFile } />
            </Card>
            <div>
                {selectedFile && 
                <ColorProfileSection colorProfile={ randomItem } />
                }
            </div>
        </>

    );

}