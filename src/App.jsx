import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import Container from '@mui/material/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';
import OrderConfirmation from './pages/order/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === 'inProgress' && <OrderEntry setOrderPhase={setOrderPhase} />}
        {orderPhase === 'review' && <OrderSummary setOrderPhase={setOrderPhase} />}
        {orderPhase === 'complete' && <OrderConfirmation setOrderPhase={setOrderPhase} />}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
