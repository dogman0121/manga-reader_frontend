function Poster({src, width}: {src: string, width?: string}){
    return (
        <img 
            src={src}
            style={{
                aspectRatio: "2/3",
                width: width || "100%",
                borderRadius: "6% / 4%"
            }}
        />
    )
}

export default Poster;