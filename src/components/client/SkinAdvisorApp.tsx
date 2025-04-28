"use client";

import { useState } from "react";
import SkinAdvisorPicker from "./SkinAdvisorPicker";
import SkinAdvisorResult from "./SkinAdvisorResult";
import seasonalColorProfiles from "@/app/lib/seasonalColorProfiles";

interface ColorProfileInfo {
    id: string;
    name: string;
    description: string;
    colors: { name: string; hex: string }[];
    metalAccents: string;
}

export default function SkinAdvisorApp() {
    const [isLoading, setIsLoading] = useState(false);
    const [colorProfileInfo, setColorProfileInfo] = useState<ColorProfileInfo>();

    const handleAnalysisComplete = (result: string) => {
        setIsLoading(false);

        if (result === "none") {
            setColorProfileInfo(undefined);
        } else {
            setColorProfileInfo(seasonalColorProfiles.find(profile => profile.id === result));
        }
    }

    return (
        <div id="main" className="flex flex-col md:flex-row bg-white bg-opacity-5 rounded-lg shadow-lg">
            <div className="w-full md:w-1/2 p-4">
                <div className="flex items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold ${barrio.variable}">Skin Tone Color Advisor</h1>
                        <p>Select a selfie photo and our AI will recommend great colors options that will complement your skin well.</p>
                    </div>
                </div>

                <SkinAdvisorPicker
                    setIsLoading={setIsLoading}
                    onAnalysisComplete={handleAnalysisComplete}
                />
            </div>
            <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-tr-lg rounded-br-lg">
                <SkinAdvisorResult 
                    colorProfileInfo={colorProfileInfo}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
