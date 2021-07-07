import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" style={{ height: 424, width: 288 }}/>
        <a
          className="App-link"
          href="http://localhost:8888"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
