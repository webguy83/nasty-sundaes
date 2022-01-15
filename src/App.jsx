import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import Container from '@mui/material/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';
import OrderConfirmation from './pages/order/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('InProgress');

  function renderOriginalComps() {
    if (orderPhase === 'InProgress' || orderPhase === 'review') {
      return (
        <OrderDetailsProvider>
          {orderPhase === 'InProgress' && <OrderEntry setOrderPhase={setOrderPhase} />}
          {orderPhase === 'review' && <OrderSummary setOrderPhase={setOrderPhase} />}
        </OrderDetailsProvider>
      );
    }
  }

  function renderOrderConfirmation() {
    if (orderPhase === 'complete') {
      return <OrderConfirmation />;
    }
  }
  return (
    <Container>
      {renderOriginalComps()}
      {renderOrderConfirmation()}
    </Container>
  );
}

export default App;
