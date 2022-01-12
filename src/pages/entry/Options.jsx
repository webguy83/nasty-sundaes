import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScoopOption from './ScoopOption';
import { capitalizeWord, formatCurrency } from '../../utils/generic';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { pricePerItem } from '../../constants';

export default function Options({ optionType }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(false);
  const [orderDetails] = useOrderDetails();
  const { totals } = orderDetails;

  useEffect(() => {
    let mounted = true;
    fetch(`http://localhost:3030/${optionType}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setImages(data);
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true);
        }
      });

    return function () {
      mounted = false;
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  function renderImages(imgs) {
    if (imgs) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '900px',
          }}
        >
          {imgs.map((img) => {
            return <ItemComponent key={img.name} img={img} />;
          })}
        </Box>
      );
    }
  }

  return (
    <Box>
      <Typography variant='h3'>{capitalizeWord(optionType)}</Typography>
      <Typography variant='body1'>{formatCurrency(pricePerItem[optionType])} per item</Typography>
      <Typography variant='body1'>
        {capitalizeWord(optionType)} total: {totals[optionType]}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
        }}
      >
        {renderImages(images)}
      </Box>
    </Box>
  );
}
