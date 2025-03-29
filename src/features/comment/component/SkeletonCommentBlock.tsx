import {Box, Skeleton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';


function SkeletonCommentBlock() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px"
            }}
        >
            <Skeleton 
                variant="circular" 
                width={40} 
                height={40} 
                sx={{
                    minWidth: "40px"
                }}
            />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Box>
                        <Skeleton variant="text" width={150}/>
                        <Skeleton variant="text" width={100}/>
                    </Box>
                    <MoreVertIcon />
                </Box>
                
                <Skeleton variant="rounded" height={40}/>
            </Box>
        </Box>
    )
}

export default SkeletonCommentBlock;