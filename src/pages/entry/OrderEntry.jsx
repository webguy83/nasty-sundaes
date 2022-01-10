import { Typography } from '@mui/material';
import Options from './Options';

export default function OrderEntry() {
  return (
    <div>
      <Typography variant='h1'>Ice Cream Fun</Typography>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </div>
  );
}
