import React from "react";
import './ChessTable.css';

function ChessTable() {
  const tableRender = () => {
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const tableCells = [];

    for (let i = 0; i <= 7; i++) {
      for (let l = 0; l <= 7; l++) {
        let color = 'color0';
        
        if((i + l) % 2 === 1){
            color = 'color1';
        }
        const tableCell = {
          id: tableCells.length,
          position: `${letras[l]}${8 - (i + 1)}`,
          color: color,
        };
        tableCells.push(tableCell);
      }
    }
    return tableCells;
  };

  const tableCells = tableRender();

  return (
    <div className="chessTable">
      {tableCells.map((tableCell, index) => {
        return (
          <div
            key={index}
            id={tableCell.id}
            className={`chessTable__cell ${tableCell.color}`}
          >
          </div>
        );
      })}
    </div>
  );
}

export default ChessTable;
