'use client';
import Image from 'next/image'
import ColorProfileSection from "./ColorProfileSection";

interface ColorProfileInfo {
    id: string;
    name: string;
    description: string;
    colors: { name: string; hex: string }[];
    metalAccents: string;
}

interface SkinAdvisorResultProps {
    colorProfileInfo: ColorProfileInfo
}

export default function SkinAdvisorResult({ colorProfileInfo }: SkinAdvisorResultProps) {

    return (
        <div className="flex flex-col p-8 h-full bg-white rounded-lg">
            {colorProfileInfo &&
                <ColorProfileSection
                    colorProfile={colorProfileInfo}
                />

            }
        </div>

    );
}