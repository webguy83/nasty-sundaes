import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function ToppingOption({ img }) {
  const [orderDetails] = useOrderDetails();
  const { updateItemCount } = orderDetails;

  function onChecked(e) {
    if (e.target.checked) {
      updateItemCount(img.name, 1, 'toppings');
    } else {
      updateItemCount(img.name, 0, 'toppings');
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
        alt={`${img.name} Topping`}
      />
      <FormControlLabel
        sx={{ m: 0 }}
        control={<Checkbox onChange={(e) => onChecked(e)} />}
        label={img.name}
      />
    </Box>
  );
}
