import { Typography } from '@mui/material';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';
import Button from '@mui/material/Button';

export default function OrderEntry({ setOrderPhase }) {
  const [details] = useOrderDetails();
  const { totals } = details;
  return (
    <div>
      <Typography variant='h1'>Ice Cream Fun</Typography>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <Typography variant='h3'>Grand Total: {totals.grandTotal}</Typography>
      <Button variant='contained' onClick={() => setOrderPhase('review')}>
        Checkout
      </Button>
    </div>
  );
}
