import express from "express";
import http from "http";
import socket from "socket.io";
import { Chess } from "chess.js";

const app = express();
const server = http.createServer(app);
const io = socket(server);

server.listen(8080, () => console.log("Servidor rodando na porta 8080"));

const chess = new Chess();
let gameState = traduzAscii(chess.ascii());

io.on("connection", (socket) => {
  console.log("Server has a new connection ");
  io.emit("gameRender", gameState);

  socket.on("gameMove", (move) => {
    console.log("JOGO ATUALIZOU");

    if (chess.move(move)) {
      console.log("movimento foi um sucesso");
    } else {
      console.log("movimento falhou");
    }
    gameState = traduzAscii(chess.ascii());
    io.emit("gameRender", gameState);
    console.log(chess.ascii());
  });

  socket.on("disconnect", () => {
    console.log("A connection was disconnected");
  });
});

function traduzAscii(tableAscii){
  //usar string manipulation com regex para transformar na minha notacao
  //remover o 'b' da base do tabuleiro table.replace(/b..c/gmi, '')
  //trocar . por 0 table.replace(/\./gmi, '0')
  //tirar tudo q n seja peça e espaço em branco: table.replace(/[^rnbqkp0]/gmi, '')

  let table = tableAscii.replace(/b..c/gmi, '');
  table = table.replace(/\./gmi, '0');
  table = table.replace(/[^rnbqkp0]/gmi, '');
  let arrayTable = table.split('');

  return arrayTable;
}

