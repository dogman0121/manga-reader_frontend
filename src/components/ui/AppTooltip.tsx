import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const AppTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.customBackgrounds.widget1,
    color: theme.typography.body1.color,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default AppTooltip;