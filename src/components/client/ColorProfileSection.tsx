export default function ColorProfileSection({ colorProfile }: any) {
    return (
        <>
        <h2 className="text-xl font-bold">Your skin tone color analysis result:</h2>
            <div className="p-8 mt-8 bg-gradient-to-b from-purple-100 to-blue-100 rounded-lg">
            <p className="text-gray-600 text-center text-md font-bold">{colorProfile.name}</p>
            </div>
            <p className="text-center mt-2 font-serif italic">{colorProfile.description}</p>


            <h2 className="text-xl font-bold mt-8">Recommended color palette</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 bg-gray-100 rounded-lg p-4">
                {colorProfile.colors.map((color: any, index: number) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className="w-32 h-16 rounded-md"
                            style={{ backgroundColor: color.hex }}
                        ></div>
                        <p className="text-center mt-2 font-serif italic text-sm">{color.name}</p>
                        <p className="text-center mb-4 font-mono text-xs">{color.hex}</p>
                    </div>
                ))}
            </div>
            <p className="mt-8"><span className="font-bold">Recommended metallic accents:</span> {colorProfile.metalAccents}</p>
        </>
    );
}