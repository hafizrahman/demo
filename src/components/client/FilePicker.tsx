"use client";

import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import { CloudUpload } from "@mui/icons-material";
import { useFilePicker } from "use-file-picker";
import {
    FileAmountLimitValidator,
    FileTypeValidator
} from 'use-file-picker/validators';

interface FilePickerProps {
    handleSuccesfulSelection(imageFile: File): void;
}

export default function FilePicker({ handleSuccesfulSelection }: FilePickerProps) {
    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        accept: ".png, .jpg, .jpeg",
        multiple: false,
        readAs: "DataURL",
        validators: [
            new FileAmountLimitValidator({ max: 1 }),
            new FileTypeValidator(['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']),
        ],
        onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
            handleSuccesfulSelection(plainFiles[0])
            console.log('onFilesSuccessfullySelected', plainFiles[0]);
        },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        console.log(errors);
        return <div>Error... </div>;
    }

    return (
        <>
            <Button
                startIcon={<CloudUpload />}
                variant="outlined"
                onClick={() => openFilePicker()}
                className="w-full text-white bg-gradient-to-r from-cyan-50 to-cyan-10 hover:bg-gradient-to-bl rounded-md"
            >Select files </Button>
            <p className="text-xs italic mt-2 text-center">Supported file types: .jpg, .png</p>
            <br />
        </>
    );
}