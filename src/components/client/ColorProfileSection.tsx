export default function ColorProfileSection({ colorProfile } : any) {
    return(
        <>
        <p>{ colorProfile.name }</p>
        <p>{ colorProfile.description }</p>
        <p>Estimated population: { colorProfile.estimatedPopulationPercent }%</p>
        <p>Undertone: { colorProfile.undertone }</p>
        <p>Color palette:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {colorProfile.colors.map((color: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                    <div
                        className="w-32 h-8 rounded-md"
                        style={{ backgroundColor: color.hex }}
                    ></div>
                    <p>{color.name}</p>
                </div>
            ))}
        </div>
        <p>Metallic accents: { colorProfile.metalAccents }</p>
        </>
    );
}