import { Typography } from '@mui/material';
import SummaryForm from '../summary/SummaryForm';
import Options from './Options';

export default function OrderEntry() {
  return (
    <div>
      <Typography variant='h1'>Ice Cream Fun</Typography>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <SummaryForm />
    </div>
  );
}
