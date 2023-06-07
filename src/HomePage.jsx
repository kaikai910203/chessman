
import './HomePage.css';
import { Button} from 'react-bootstrap';
// npm install react-bootstrap bootstrap

import { useState } from 'react'; 

import { Link } from 'react-router-dom'




const HomePage = () => {
    const [computerOpen, setComputerOpen] = useState(false);
    const [singlePlayerOpen, setSinglePlayerOpen] = useState(false);
    const [multiplayerOpen, setMultiplayerOpen] = useState(false);

    const handleSinglePlayerClick = () => {
      setSinglePlayerOpen(!singlePlayerOpen);
      setComputerOpen(false);
      setMultiplayerOpen(false);
    };

    const handleComputerClick = () => {
      setComputerOpen(!computerOpen);
      setSinglePlayerOpen(false);
      setMultiplayerOpen(false);
    };
    const handleMultiplayerClick = () => {
      setMultiplayerOpen(!multiplayerOpen);
      setSinglePlayerOpen(false);
      setComputerOpen(false);
    };

  return (
    <div className="App">
      <header className="App-header">

        <h1 id="title" style={{
          color:'white',
          textAlign: 'center'
        }}>軍儀棋</h1>

        <button className='computer' onClick={handleComputerClick}>本機模式{computerOpen ? '-' : '+'}</button>
        {computerOpen && (
        <div className='option'>
            <Link to='/Board'>
                <Button id="simple">
                簡單
                </Button>
            </Link>
            <Link to='/Board'>
                <Button id="normal">
                中等
                </Button>
            </Link>
            <Link to='/Board'>
                <Button id="difficult">
                困難
                </Button>
            </Link>
        </div>
        )}


        <button className='button-single' onClick={handleSinglePlayerClick}>單人模式{singlePlayerOpen ? '-' : '+'}</button>
        {singlePlayerOpen && (
        <div className='option'>
            <Link to='/Simple'>
                <Button id="simple">
                簡單
                </Button>
            </Link>
            <Link to='/Normal'>
                <Button id="normal">
                中等
                </Button>
            </Link>
            <Link to='/Difficult'>
                <Button id="difficult">
                困難
                </Button>
            </Link>
        </div>
        )}

      <button className='button-double' onClick={handleMultiplayerClick}>雙人模式{multiplayerOpen ? '-' : '+'}</button>
        {multiplayerOpen && (
        <div className='option'>
            <Link to='/Simple'>
                <Button id="simple">
                簡單
                </Button>
            </Link>
            <Link to='/Normal'>
                <Button id="normal">
                中等
                </Button>
            </Link>
            <Link to='/Difficult'>
                <Button id="difficult">
                困難
                </Button>
            </Link>
        </div>
        )}
        



      </header>
    </div>
  );
}

export default HomePage;
