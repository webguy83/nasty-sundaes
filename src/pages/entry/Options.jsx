import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function Options({ optionType }) {
  const [images, setImages] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3030/scoops')
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

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
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={img.name}
              >
                <img
                  style={{ width: '100px', marginBottom: 20 }}
                  src={`http://localhost:3030/${img.imagePath}`}
                  alt={`${img.name} ${optionType}`}
                />
                <TextField
                  id='outlined-number'
                  label={img.name}
                  type='number'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    marginLeft: '10px',
                    marginRight: '10px',
                  }}
                />
              </Box>
            );
          })}
        </Box>
      );
    }
  }

  return (
    <Box>
      <Typography variant='h3'>{optionType}s</Typography>
      <Typography variant='body1'>$2.00 each</Typography>
      <Typography variant='body1'>{optionType}s total: $4.50</Typography>
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
