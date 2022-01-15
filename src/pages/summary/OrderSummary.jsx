import SummaryForm from './SummaryForm';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import IcecreamIcon from '@mui/icons-material/Icecream';
import ListItem from '@mui/material/ListItem';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  const { scoops, toppings, totals } = orderDetails;

  function renderListItems(itemsMap) {
    const listKeys = [...itemsMap.keys()];

    return listKeys.map((key) => {
      return (
        <ListItem key={key}>
          <IcecreamIcon />
          <ListItemText sx={{ marginLeft: '10px' }} primary={key} />
        </ListItem>
      );
    });
  }

  function onOrderClick() {
    setOrderPhase('complete');
  }

  return (
    <>
      <Typography variant='h1'>Order Summary</Typography>
      <List
        dense
        aria-labelledby='scoop-list-subheader'
        subheader={
          <ListSubheader
            sx={{
              fontFamily: 'inherit',
              color: 'black',
              fontSize: '32px',
            }}
            component='div'
            id='scoop-list-subheader'
          >
            Scoops: {totals.scoops}
          </ListSubheader>
        }
      >
        {renderListItems(scoops)}
      </List>
      <List
        dense
        aria-labelledby='topping-list-subheader'
        subheader={
          <ListSubheader
            sx={{
              fontFamily: 'inherit',
              color: 'black',
              fontSize: '32px',
            }}
            component='div'
            id='topping-list-subheader'
          >
            Toppings: {totals.toppings}
          </ListSubheader>
        }
      >
        {renderListItems(toppings)}
      </List>
      <Typography variant='h3'>Total: {totals.grandTotal}</Typography>
      <SummaryForm submitOrderClick={onOrderClick} />
    </>
  );
}
