import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScoopOption from './ScoopOption';

export default function Options({ optionType }) {
  const [images, setImages] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3030/${optionType}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  function renderImages(imgs) {
    if (imgs) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '700px',
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
      <Typography variant='h3'>{optionType}</Typography>
      <Typography variant='body1'>$2.00 each</Typography>
      <Typography variant='body1'>{optionType} total: $4.50</Typography>
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
