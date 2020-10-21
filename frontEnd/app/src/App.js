import React from 'react';
import ChessTable from './components/ChessTable/ChessTable';
import ChessPiece from  './components/ChessPiece/ChessPiece';
import io from 'socket.io-client';

const socket = io("http://localhost:8080");
socket.on("connect", () => {
  console.log("A new connection has been established");
});

const array = [];
for(let i=0;i<64;i++){
  array.push(i);
}

function App() {
  return (
    <>
    <ChessTable gameState={array}/>
    <ChessPiece gameState={array}/>
    </>
  );
}

export default App;
