import React, { useEffect, useState } from "react";
import "./ChessPiece.css";
import io from 'socket.io-client';

const socket = io("http://localhost:8080");
socket.on("connect", () => {
  console.log("A new connection has been established");
});

function ChessPiece() {
  const [game, setGame] = useState(['T','C','B','D','R','B','C','T','P','P','P','P','P','P','P','P','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','P','P','P','P','P','P','P','P','T','C','B','D','R','B','C','T']);

  useEffect(() => {
    const handleNewGame = (newGame) => {
      setGame([...newGame]);
    };
    socket.on('gameChange', handleNewGame);
    return () => socket.off('gameChange', handleNewGame)
  }, [game]);
  
  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        if(event.target.textContent !== document.getElementById(data).textContent){
          event.target.textContent = document.getElementById(data).textContent;
          document.getElementById(data).textContent = '0';
          const gameArray = [];
          let chessPieces = document.querySelectorAll(".chessPieces__text");
          for (let i = 0; i <= chessPieces.length - 1; i++) {
            gameArray.push(chessPieces[i].textContent);
          }
          socket.emit("gameChange", gameArray);
        }
      }}
      className="chessPieces"
    >
      {game.map((piece, indice) => {
        return (
          <span className = 'chessPieces__text'
            draggable={true}
            onDragStart={(event) => {
              event.dataTransfer.setData("text", event.target.id);
            }}
            id={`piece${indice}`}
            key={indice}
          >
            {piece}
          </span>
        );
      })}
    </div>
  );
}

export default ChessPiece;
