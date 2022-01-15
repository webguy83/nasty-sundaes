import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function OrderConfirmation() {
  const [orderNum, setOrderNum] = useState(null);
  useEffect(() => {
    if (!orderNum) {
      fetch('http://localhost:3030/order', { method: 'POST' })
        .then((res) => res.json())
        .then(
          ({ orderNumber }) => {
            setOrderNum(orderNumber);
          },
          [orderNum]
        );
    }
  });

  function renderContent() {
    if (!orderNum) {
      return <CircularProgress />;
    } else {
      return (
        <>
          <Typography variant='h1'>Thank You</Typography>
          <Typography variant='body1'>
            Your order number will be {orderNum}. Keep it handy you moron.
          </Typography>
          <Typography variant='body1'>
            If you want to order more just hit the button below!
          </Typography>
          <Button variant='contained'>Create new order</Button>
        </>
      );
    }
  }
  return renderContent();
}
