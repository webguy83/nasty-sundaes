import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNum, setOrderNum] = useState(null);
  const [orderDetails] = useOrderDetails();

  const { updateItemCount, scoops, toppings, setOptionCounts } = orderDetails;
  useEffect(() => {
    if (!orderNum) {
      let mounted = true;
      fetch('http://localhost:3030/order', { method: 'POST' })
        .then((res) => res.json())
        .then(({ orderNumber }) => {
          if (mounted) {
            setOrderNum(orderNumber);
          }
        }, []);

      return function () {
        mounted = false;
      };
    }
  });

  function resetTotals(optionTypeMap, optionType) {
    const listKeys = [...optionTypeMap.keys()];
    listKeys.forEach((key) => {
      updateItemCount(key, 0, optionType);
    });
  }

  function onOrderClick() {
    resetTotals(scoops, 'scoops');
    resetTotals(toppings, 'toppings');
    setOptionCounts({
      scoops: new Map(),
      toppings: new Map(),
    });
    setOrderPhase('inProgress');
  }

  function renderContent() {
    if (!orderNum) {
      return (
        <CircularProgress
          sx={{
            position: 'fixed',
            top: 'calc(50% - 40px)',
            left: 'calc(50% - 40px)',
          }}
        />
      );
    }

    return (
      <>
        <Typography variant='h1'>Thank You</Typography>
        <Typography variant='body1'>
          Your order number will be {orderNum}. Keep it handy you moron.
        </Typography>
        <Typography variant='body1'>
          If you want to order more just hit the button below!
        </Typography>
        <Button variant='contained' onClick={onOrderClick}>
          Create new order
        </Button>
      </>
    );
  }
  return renderContent();
}
