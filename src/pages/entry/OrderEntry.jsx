import { Typography } from '@mui/material';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from '../summary/SummaryForm';
import Options from './Options';

export default function OrderEntry() {
  const [details] = useOrderDetails();
  const { totals } = details;
  return (
    <div>
      <Typography variant='h1'>Ice Cream Fun</Typography>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <Typography variant='h3'>Grand Total: {totals.grandTotal}</Typography>
      <SummaryForm />
    </div>
  );
}
