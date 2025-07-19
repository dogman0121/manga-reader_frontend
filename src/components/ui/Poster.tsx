function Poster({
    src, 
    width,
    style
}: {
    src: string, 
    width?: string
    style?: React.CSSProperties
}){
    return (
        <img
            draggable={false}
            src={src}
            style={{
                aspectRatio: "2/3",
                borderRadius: "3% / 2%",
                width: width || "100%",
                ...style
            }} 
        />
    )
}

export default Poster;