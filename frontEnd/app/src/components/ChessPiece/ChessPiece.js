import React, { useEffect, useState } from "react";
import "./ChessPiece.css";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
let gameConectedState = [];
socket.on("connect", () => {
  console.log("A new connection has been established");
});
socket.on("gameOpen", (gameConected) => {
  gameConectedState = gameConected;
});

function ChessPiece() {
  const [game, setGame] = useState([]);
  
  const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const tableCells = [];

  for (let i = 0; i <= 7; i++) {
    for (let l = 0; l <= 7; l++) {
      const tableCell = `${letras[l]}${8 - i}`;
      tableCells.push(tableCell);
    }
  }

  useEffect(() => {
    const handleNewGame = (newGame) => {
      setGame([...newGame]);
    };
    socket.on("gameRender", handleNewGame);
    return () => socket.off("gameRender", handleNewGame);
  }, [game]);

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        if (
          event.target.textContent !== document.getElementById(data).textContent
        ) {
          const move = {
            from: document.getElementById(data).id,
            to: event.target.id,
          };
          event.target.textContent = document.getElementById(data).textContent;
          document.getElementById(data).textContent = "0";
      
          socket.emit("gameMove", move);
        }
      }}
      className="chessPieces"
    >
      {game.map((piece, indice) => {
        return (
          <span
            className={`chessPieces__text ${piece}`}
            draggable={true}
            onDragStart={(event) => {
              event.dataTransfer.setData("text", event.target.id);
            }}
            id={tableCells[indice]}
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
