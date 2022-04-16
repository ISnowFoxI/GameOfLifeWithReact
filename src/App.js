import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

import GameGrid from './components/GameGrid';

let timeOutId = null;

function App() {
  const [gameSize, setGameSize] = useState(0)


  const getSize = () => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      setGameSize(Math.floor(window.innerWidth / 25))
    }, 100);

  }

  useEffect(() => {
    let _mounted = true;
    if (_mounted) {
      getSize();

    }
    return () => {
      _mounted = false;
    }
  }, [])
  return (
    <GameGrid gameSize={gameSize} />
  );
}

export default App;
