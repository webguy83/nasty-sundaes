import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function ScoopOption({ img }) {
  const [orderDetails] = useOrderDetails();
  const { updateItemCount } = orderDetails;

  function onTextChange(e) {
    if (e.target.value) {
      updateItemCount(img.name, e.target.value, 'scoops');
    } else {
      updateItemCount(img.name, 0, 'scoops');
    }
  }
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
        size='small'
        id='outlined-number'
        label={img.name}
        type='number'
        defaultValue='0'
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: '0',
          max: '10',
          'data-testid': img.name,
        }}
        sx={{
          marginLeft: '10px',
          marginRight: '10px',
        }}
        onChange={(e) => onTextChange(e)}
      />
    </Box>
  );
}
