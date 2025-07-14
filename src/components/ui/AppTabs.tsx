import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material';

export const AppTabContext = TabContext;

export const AppTab = styled(Tab)(({theme}) => ({
    textTransform: "capitalize",
    color: theme.typography.body1.color,
    padding: "10px 30px",
    "&.Mui-selected": {
        color: theme.typography.body1.color
    }
}))

export const AppTabList = TabList

export const AppTabPanel = styled(TabPanel)(({theme}) => ({
    padding: 0,
    paddingTop: theme.spacing(3)
}))

