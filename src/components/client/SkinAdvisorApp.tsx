"use client";

import { useState } from "react";
import Image from "next/image";
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
    const [resultFailed, setResultFailed] = useState(false);

    const handleAnalysisComplete = (result: string) => {
        setIsLoading(false);

        if (result === "none") {
            setResultFailed(true);
        } else {
            setColorProfileInfo(seasonalColorProfiles.find(profile => profile.id === result));
        }
    }

    // For every new file selection, we reset the previous result state immediately.
    const handleSuccessfulSelection = () => {
        setResultFailed(false);
        setColorProfileInfo(undefined);
    }

    return (
        <div id="main" className="flex flex-col md:flex-row bg-white bg-opacity-5 rounded-lg shadow-lg">
            <div className="w-full md:w-1/2 p-4">
                <div className="flex items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Skin Tone Color Advisor</h1>
                        <p className="italic font-serif">Select a selfie photo and our AI will recommend great colors options that will complement your skin well.</p>
                    </div>
                </div>

                <SkinAdvisorPicker
                    setIsLoading={setIsLoading}
                    handleSuccessfulSelection={handleSuccessfulSelection}
                    onAnalysisComplete={handleAnalysisComplete}
                />
            </div>
            <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-tr-lg rounded-br-lg">
                {resultFailed && (
                    <div className="flex flex-col p-8 h-full bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-bold">No skin tone detected</h2>
                        <p className="text-md">Please try again with a different image. Selfie image with clear view of the face works best!</p>
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <p>Loading...</p>
                    </div>
                )}

                {colorProfileInfo && (
                    <SkinAdvisorResult
                        colorProfileInfo={colorProfileInfo}
                    />
                )}
                {!isLoading && !colorProfileInfo && !resultFailed && (
                    <div className="flex flex-col p-8 h-full bg-white rounded-lg items-center justify-center">
                        <Image alt="Please pick an image first" src="/face.png" width={256} height={256} />
                        <h2 className="text-md mt-4 mb-4">Your result will appear here.</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
