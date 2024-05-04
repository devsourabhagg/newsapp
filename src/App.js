import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { Component } from 'react';

export default class App extends Component {

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            {/* here we are using the key parameter for forcibyly remounitng the componennt */}
            <Route path="/" element={<News setProgress={this.setProgress} key="general" pageSize={20} country="in" category="general"/>} />
            <Route path="/business"element={<News setProgress={this.setProgress} key="business" pageSize={20} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={20} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={20} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={20} country="in" category="science" />} />
            <Route path="/sports"  element={<News setProgress={this.setProgress} key="sports" pageSize={20} country="in" category="sports" />} />
            <Route path="/technology"  element={<News setProgress={this.setProgress} key="technology" pageSize={20} country="in" category="technology" />} />
          </Routes>
        </div>
      </Router>

    );
  }
}



