

import './App.css';
import React, { useState } from 'react'; 
import {io} from 'socket.io-client'




import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  useLocation,
} from 'react-router-dom'
// npm install react-router-dom localforage match-sorter sort-by


///////////////////// 頁面
import Simple from "./GameRoom/Simple"
import Normal from "./GameRoom/Normal"
import Difficult from "./GameRoom/Difficult"
import Double from "./GameRoom/Double"
import HomePage from "./HomePage"
import Board from "./component/Board"
/////////////////////




function App() {





  return (
    <div className='App'>
        <BrowserRouter>
            <Routes>
                {/* 主頁 */}
                <Route element={<HomePage />} path={'/'}></Route>
                
                
                {/* 單人遊戲 */}
                <Route element={<Simple />} path='/Simple'></Route>
                <Route element={<Normal />} path='/Normal'></Route>
                <Route element={<Difficult />} path='/Difficult'></Route>
                
                {/* 雙人遊戲 */}
                <Route element={<Double />} path='/double'></Route>

                {/* 本機模式 */}
                <Route element={<Board />} path='/Board'></Route>

            </Routes>
        </BrowserRouter>
    </div>
    
  );
}

export default App;
