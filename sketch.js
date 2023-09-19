//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 16;
let raioBolinha = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
    
//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//variável pra testar colisão
let colidiu = false;

//variáveis do placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  testaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //testaColisaoRaquete();
  //testaColisaoOponente();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  marcaPonto();
  mostraPlacar();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function testaColisaoBorda() {
  if (xBolinha + raioBolinha  > width || xBolinha - raioBolinha < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
    velocidadeYBolinha *= -1;
  }
}
  
function mostraRaquete(x, y) {
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 8;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 8;
  }
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete = constrain(yRaquete, 0, 310);
}

function movimentaRaqueteOponente() {
  //velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete/2 - 30;
  //yRaqueteOponente += velocidadeYOponente;
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    if (keyIsDown(87)) {
    yRaqueteOponente -= 8;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 8;
  }
    yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

function testaColisaoRaquete() {	
    if (xBolinha - raioBolinha < xRaquete + larguraRaquete && 
        yBolinha - raioBolinha < yRaquete + alturaRaquete && 
        yBolinha + raioBolinha > yRaquete) {
        velocidadeXBolinha *= -1;
    }
}

function testaColisaoOponente() {	
    if (xBolinha + raioBolinha > xRaqueteOponente && 
        yBolinha - raioBolinha < yRaqueteOponente + alturaRaquete && 
        yBolinha + raioBolinha > yRaqueteOponente) {
        velocidadeXBolinha *= -1;
    }
}

function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function mostraPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(0, 0, 139));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(0, 0, 139));
  rect(400, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 420, 26);
}

function marcaPonto() {
  if (xBolinha + raioBolinha > 598) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha - raioBolinha < 2) {
    pontosDoOponente += 1;
    ponto.play();
  }
}





