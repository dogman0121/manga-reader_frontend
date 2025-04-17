import { Box } from "@mui/material"
import { AppContent } from "../../layouts/app-layout/AppLayout"
import Sections from "./components/Sections"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function Info() {
    return (<></>)
}

function UserPage() {
    const {userId} = useParams();
    
    useEffect(() => {

    }, [userId])

    return (
        <AppContent>
            <Box>
                <Info>

                </Info>
                <Sections>

                </Sections>
            </Box>
        </AppContent>
    )
}

export default UserPage