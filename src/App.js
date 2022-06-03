import './App.css';
import GlobalStateContext from './context/GlobalStateContext';
import Home from './views/Home/Home';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='app'>
      <div className="cloud x1"></div>
      <div className="cloud x2"></div>
      <div className="cloud x3"></div>
      <div className="cloud x4"></div>
      <div className="cloud x5"></div>
      <div className="cloud x6"></div>
      <div className="cloud x7"></div>
      <div className="cloud x8"></div>
      <GlobalStateContext>
        <Home/>
      </GlobalStateContext>
    </div>
  );
}

export default App;
