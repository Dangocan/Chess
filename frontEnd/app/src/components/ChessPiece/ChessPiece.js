import React from "react";
import "./ChessPiece.css";

function ChessPiece(props) {
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
        }
      }}
      className="chessPieces"
    >
      {props.gameState.map((game, indice) => {
        return (
          <span
            draggable={true}
            onDragStart={(event) => {
              event.dataTransfer.setData("text", event.target.id);
            }}
            id={`piece${indice}`}
            key={indice}
          >
            {game}
          </span>
        );
      })}
    </div>
  );
}

export default ChessPiece;
