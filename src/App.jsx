import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import Container from '@mui/material/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
