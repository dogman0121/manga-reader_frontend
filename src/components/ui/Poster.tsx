function Poster({src, width}: {src: string, width: string}){
    return (
        <img 
            src={src}
            style={{
                aspectRatio: "2/3",
                width: width,
                borderRadius: "10%"
            }}
        />
    )
}

export default Poster;