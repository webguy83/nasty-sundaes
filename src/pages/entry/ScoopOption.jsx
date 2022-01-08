import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ScoopOption({ img }) {
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
        alt={`${img.name} Scoop`}
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
}
