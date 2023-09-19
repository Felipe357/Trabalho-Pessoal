import './App.css';
import AppRoutes from './AppRoutes';
import HeaderLeft from './components/header-left';

function App() {
  return (
    <div className="App">
      <HeaderLeft />
      <div className='Main'>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;