'use client';
import Image from 'next/image'
import ColorProfileSection from "./ColorProfileSection";
import { useState } from "react";

export default function SkinAdvisorResult({ colorProfileInfo }: any) {

    return (
        <div className="flex flex-col p-8 h-full bg-white rounded-lg">

            {!colorProfileInfo &&
                <>
                    <Image alt="Please pick an image first" src="/face.png" width={256} height={256} />
                    <h2 className="text-md mt-4 mb-4">Your result will appear here.</h2>
                </>
            }

            {colorProfileInfo &&
                <ColorProfileSection
                    colorProfile={colorProfileInfo}
                />

            }
        </div>

    );
}