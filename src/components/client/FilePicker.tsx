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
    handleSuccesfulSelection(imageBase64: string): void;
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
            handleSuccesfulSelection(filesContent[0].content)
            console.log('onFilesSuccessfullySelected', filesContent[0].content);
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
                variant="contained"
                onClick={() => openFilePicker()}
                className="w-full"
            >Select files </Button>
            <p className="text-sm italic mt-4">Supported file types: .jpg, .png, .png</p>
            <br />
            {filesContent.map((file, index) => (
                <div key={index} className="not-prose overflow-auto rounded-lg bg-white outline outline-black/5 dark:bg-gray-950/50 p-2">
                    <img
                        alt={file.name}
                        src={file.content}
                        className="mx-auto h-64 w-full rounded-lg object-cover"
                    />
                </div>
            ))}
        </>
    );
}