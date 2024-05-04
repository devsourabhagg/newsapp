import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

const App = () => {

  const [apiKey,setApiKey] = useState(process.env.REACT_APP_NEWS_API);

  const [progress,setProgress] = useState(0);

  return (
      <Router>
        <div className="App">
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            {/* here we are using the key parameter for forcibyly remounitng the componennt */}
            <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={20} country="in" category="general"/>} />
            <Route path="/business"element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={20} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={20} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={20} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={20} country="in" category="science" />} />
            <Route path="/sports"  element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={20} country="in" category="sports" />} />
            <Route path="/technology"  element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={20} country="in" category="technology" />} />
          </Routes>
        </div>
      </Router>

    );
}

export default App;



