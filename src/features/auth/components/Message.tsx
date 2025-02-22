import Box from "@mui/material/Box";
import styles from "./Auth.module.css"

function Message({ title, information }: {title: string, information: string}) {
    return (
        <>
            <h2 className={styles.Header}>{ title }</h2>
            <Box>
                { information }
            </Box>
        </>
    )
}

export default Message;