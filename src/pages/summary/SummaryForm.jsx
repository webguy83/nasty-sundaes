import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function SummaryForm() {
  const [checked, setChecked] = useState(false);

  function onTacChange() {
    setChecked((prevChecked) => {
      return !prevChecked;
    });
  }
  return (
    <Box sx={{ width: 300 }}>
      <FormControlLabel
        control={<Checkbox onChange={onTacChange} />}
        label='Terms and Conditions'
      />
      <Button variant='contained' disabled={!checked}>
        Confirm Order
      </Button>
    </Box>
  );
}
