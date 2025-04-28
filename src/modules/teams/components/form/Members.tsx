import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import UserList from "../../../../components/UserList";
import { mockUsers } from "../../../../mocks/user.mock";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Members() {
    const theme = useTheme();

    return (
        <Box>
            <Button 
                sx={{
                    width: "100%",
                    borderRadius: "10px",
                    p: "15px",
                }}
                variant="outlined" 
                color="info"
            >
                <AddRoundedIcon />
                <Typography 
                    color="info"
                    sx={{
                        ml: "5px",
                        textTransform: "none"
                    }}
                >
                    Добавить участников
                </Typography>
            </Button>
            <Box mt="15px">
                <UserList 
                    users={mockUsers}
                    endAdornment={
                        <IconButton>
                            <CloseRoundedIcon sx={{color: theme.typography.body1.color}}/>
                        </IconButton>
                    }
                    sx={{
                        p: "2px 0",
                    }}    
                />
            </Box>
        </Box>
    )
}