"use client";

import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useFilePicker } from "use-file-picker";
import {
    FileAmountLimitValidator,
    FileTypeValidator
} from 'use-file-picker/validators';
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface FilePickerProps {
    handleSuccesfulSelection(imageFile: File): void;
}

const MotionButton = motion.create(Button);

export default function FilePicker({ handleSuccesfulSelection }: FilePickerProps) {
    const controls = useAnimation();

    interface ButtonStatus {
        clicked: boolean;
        shake: boolean;
    }

    const [buttonStatus, setButtonStatus] = useState<ButtonStatus>({
        clicked: false,
        shake: false,
    });

    const { openFilePicker, loading, errors } = useFilePicker({
        accept: ".png, .jpg, .jpeg",
        multiple: false,
        readAs: "DataURL",
        validators: [
            new FileAmountLimitValidator({ max: 1 }),
            new FileTypeValidator(['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']),
        ],
        onFilesSuccessfullySelected: ({ plainFiles }) => {
            handleSuccesfulSelection(plainFiles[0])
            console.log('onFilesSuccessfullySelected', plainFiles[0]);
        },
    });

    useEffect(() => {
        if (buttonStatus.clicked) return; // Stop shaking if clicked
    
        const interval = setInterval(() => {
            setButtonStatus((prevStatus) => ({ ...prevStatus, shake: !prevStatus.shake }));
        }, 3000);
    
        return () => clearInterval(interval);
    }, [buttonStatus.clicked]);

    useEffect(() => {
        if (buttonStatus.shake) {
            controls.start({
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 },
            });
        }
    }, [buttonStatus.shake, controls]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        console.log(errors);
        return <div>Error... </div>;
    }

    return (
        <>
            <MotionButton
                animate={controls}
                startIcon={<CloudUpload />}
                variant="outlined"
                onClick={() => {
                    setButtonStatus({ clicked: true, shake: false }); // no need to shake if clicked 
                    openFilePicker();
                }}
                className="w-full text-white bg-gradient-to-r from-cyan-50 to-cyan-10 hover:bg-gradient-to-bl rounded-md"
            >Select files </MotionButton>
            <p className="text-xs italic mt-2 text-center">Supported file types: .jpg, .png</p>
            <br />
        </>
    );
}