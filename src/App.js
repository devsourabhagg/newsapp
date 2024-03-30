import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import News from './component/News';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <News pageSize={10}/>
    </div>
  );
}

export default App;
