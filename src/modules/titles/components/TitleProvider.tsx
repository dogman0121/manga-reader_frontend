import React, { Children } from "react"
import Title from "../../../types/Title"
import TitleContext from "../context/TitleContext"

export default function TitleProvider({children, title}: {children?: React.ReactNode, title: Title | null}) {
    return (
        <TitleContext.Provider
            value={{
                title: title
            }}
        >
            {Children.map(children, (child) => child)}
        </TitleContext.Provider>
    )
}