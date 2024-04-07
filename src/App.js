import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* here we are using the key parameter for forcibyly remounitng the componennt */}
          <Route path="/" element={<News key="general" pageSize={20} country="in" category="general" />} />
          <Route path="/business" element={<News key="business"pageSize={20} country="in" category="business" />} />
          <Route path="/entertainment" element={<News  key="entertainment" pageSize={20} country="in" category="entertainment" />} />
          <Route path="/health" element={<News  key="health" pageSize={20} country="in" category="health" />} />
          <Route path="/science" element={<News  key="science"pageSize={20} country="in" category="science" />} />
          <Route path="/sports"  element={<News  key="sports" pageSize={20} country="in" category="sports" />} />
          <Route path="/technology"  element={<News key="technology" pageSize={20} country="in" category="technology" />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
