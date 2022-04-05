import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import HelpIcon from "@material-ui/icons/Help";
import constants from "../../utils/constants";
import strings from "../../strings/es.json";
import colors from "../../assets/colors/colors.json";

const BasicHelpIcon = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);


  return (

    <div className='col-auto text-center'>
      <HelpIcon
       fontSize="small"
        style={{ color: colors.buttonBackground }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        Hover with a Popover.
      </HelpIcon>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{props.text}</Typography>
      </Popover>
    </div>
    
  );
};

export default BasicHelpIcon;
