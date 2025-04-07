const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tabuleiro = [];
let tiros = 10;
let barcosAfundados = 0;

for (let i = 0; i < 5; i++) {
  tabuleiro[i] = [];
  for (let j = 0; j < 5; j++) {
    tabuleiro[i][j] = true; 
  }
}


for (let i = 0; i < 3; i++) {
  let x = Math.floor(Math.random() * 5);
  let y = Math.floor(Math.random() * 5);
  tabuleiro[x][y] = false;
}

function mostrarTabuleiro() {
  console.log("Tabuleiro:");
  for (let i = 0; i < 5; i++) {
    let linha = "";
    for (let j = 0; j < 5; j++) {
      if (tabuleiro[i][j] === true) {
        linha += "[ ] ";
      } else {
        linha += "[B] ";
      }
    }
    console.log(linha);
  }
}

function jogar() {
  if (tiros <= 0) {
    console.log("Você acabou os tiros!");
    if (barcosAfundados >= 3) {
      console.log("Você venceu!");
    } else {
      console.log("Você perdeu!");
    }
    rl.close();
    return;
  }

  mostrarTabuleiro();

  rl.question(`Tiros restantes: ${tiros}. Escolha a coordenada X (0-4): `, (x) => {
    rl.question(`Escolha a coordenada Y (0-4): `, (y) => {
      x = parseInt(x);
      y = parseInt(y);

      if (x < 0 || x >= 5 || y < 0 || y >= 5) {
        console.log("Coordenada inválida, tente novamente.");
        jogar();
        return;
      }

      if (tabuleiro[x][y] === false) {
        console.log("Você afundou um barco!");
        barcosAfundados++;
        tabuleiro[x][y] = true;
      } else {
        console.log("Água! Tente de novo.");
      }

      tiros--;
      jogar();
    });
  });
}

jogar();




