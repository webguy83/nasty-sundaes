import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ToppingOption({ img }) {
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
        alt={`${img.name} Topping`}
      />
      <FormControlLabel sx={{ m: 0 }} control={<Checkbox />} label={img.name} />
    </Box>
  );
}
