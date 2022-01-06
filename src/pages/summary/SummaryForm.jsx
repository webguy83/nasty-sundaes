import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

export default function SummaryForm() {
  const [checked, setChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  function onTacChange() {
    setChecked((prevChecked) => {
      return !prevChecked;
    });
  }

  function getTermsText() {
    return (
      <Typography>
        You agree to the{' '}
        <span
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          style={{ color: 'blue' }}
        >
          Terms and Conditions
        </span>
        .
      </Typography>
    );
  }

  return (
    <Box sx={{ width: 350 }}>
      <FormControlLabel control={<Checkbox onChange={onTacChange} />} label={getTermsText()} />
      <Popover
        id='mouse-over-popover'
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
        <Typography sx={{ p: 1 }}>No stupid ice cream will be made morons so gtfo.</Typography>
      </Popover>
      <Button variant='contained' disabled={!checked}>
        Confirm Order
      </Button>
    </Box>
  );
}
