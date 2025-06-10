import React, { Children } from "react"
import Title from "../../../pages/title/types/Title"
import TitleContext from "../context/TitleContext"

export default function TitleProvider({children, title, setTitle}: {children?: React.ReactNode, title: Title | null, setTitle: Function}) {
    return (
        <TitleContext.Provider
            value={{
                title: title,
                setTitle: setTitle
            }}
        >
            {Children.map(children, (child) => child)}
        </TitleContext.Provider>
    )
}