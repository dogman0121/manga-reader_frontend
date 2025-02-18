import Box from "@mui/material/Box";

function Message({ title, information }: {title: string, information: string}) {
    return (
        <>
            <h2>{ title }</h2>
            <Box>
                { information }
            </Box>
        </>
    )
}

export default Message;