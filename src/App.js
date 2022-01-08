import './App.css';
import Options from './pages/entry/Options';

function App() {
  return (
    <div className='App'>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </div>
  );
}

export default App;
