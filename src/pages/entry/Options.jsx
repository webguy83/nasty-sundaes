import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScoopOption from './ScoopOption';
import { capitalizeWord } from '../../utils/generic';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

export default function Options({ optionType }) {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3030/${optionType}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch(() => {
        setError(true);
      });
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
      <Typography variant='body1'>$2.00 each</Typography>
      <Typography variant='body1'>{capitalizeWord(optionType)} total: $4.50</Typography>
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
