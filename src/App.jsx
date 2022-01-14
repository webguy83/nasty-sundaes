import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import SummaryForm from './pages/summary/SummaryForm';
import Container from '@mui/material/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';

function App() {
  const [orderPhase, setOrderPhase] = useState('InProgress');
  return (
    <Container>
      {(orderPhase === 'InProgress' || orderPhase === 'review') && (
        <OrderDetailsProvider setOrderPhase={setOrderPhase}>
          {orderPhase === 'InProgress' && <OrderEntry />}
          {orderPhase === 'review' && <SummaryForm />}
        </OrderDetailsProvider>
      )}
    </Container>
  );
}

export default App;
