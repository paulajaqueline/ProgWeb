(function () {
  const FPSINICIO = 1;
  let FPS = FPSINICIO;
  let velocidade = 0;
  let gameDimensions = [994.4, 768];
  let focoDimensions = [100, 130];
  let caveiraDimensions = [110, 143];

  let probFoco = 25;
  let reserva;
  let focos = [];
  let caveiras = [];
  let gameLoop;
  let pause = true;
  let initgame = false;
  let gameover = false;
  let tempoFoco = 3;
  let tempoCaveira = 10;
  let frames = 0;
  function init() {
    reserva = new Reserva();
    Vidas.vidas = [];
    Vidas.criarVidas();
    Pontos.pontos = 0;
  }

  window.addEventListener("keydown", function (e) {
    if (initgame == true) {
      if (e.key === 'p') {
        if (pause) {
          document.getElementById("divMensagem").style.display = "none"
          pause = false;
          gameLoop = setInterval(run, 1000 / FPS);
        }
        else {
          document.getElementById("divMensagem").style.display = "flex"
          document.getElementById("mensagem").innerHTML = "Pressione \"P\" para continuar"
          pause = true;
          clearInterval(gameLoop);
        }
      }
    }
    if (e.key === 's' && initgame == false) {
      if (gameover) {
        window.location.reload()
      } else {
        gameLoop = setInterval(run, 1000 / FPS);
        pause = false;
        initgame = true;
        document.getElementById("divMensagem").style.display = "none"
      }
    }
  })

  class Vidas {
    static criarVidas() {
      let vida1 = document.createElement("div");
      vida1.className = "vida";
      vida1.des
      document.getElementById("vidas").appendChild(vida1);
      let vida2 = document.createElement("div");
      vida2.className = "vida";
      document.getElementById("vidas").appendChild(vida2);
      let vida3 = document.createElement("div");
      vida3.className = "vida";
      document.getElementById("vidas").appendChild(vida3);
      let vida4 = document.createElement("div");
      vida4.className = "vida";
      document.getElementById("vidas").appendChild(vida4);
      let vida5 = document.createElement("div");
      vida5.className = "vida";
      document.getElementById("vidas").appendChild(vida5);
      Vidas.vidas.push(vida1, vida2, vida3, vida4, vida5);
    }
    static perdeVida(qtd) {
      if (qtd >= Vidas.vidas.length) {
        Vidas.gameOver();
      } else {
        Vidas.vidas[Vidas.vidas.length - 1].remove();
        Vidas.vidas.pop();
        if (qtd == 2) {
          Vidas.vidas[Vidas.vidas.length - 1].remove();
          Vidas.vidas.pop();

        }
      }

    }

    static gameOver() {
      Vidas.vidas.map(v => v.remove())
      document.getElementById("divMensagem").style.display = "flex"
      document.getElementById("mensagem").innerHTML = "GAME OVER \n Pressione \"S\" para reiniciar"
      pause = true;
      clearInterval(gameLoop);
      initgame = false;
      gameover = true;
    }
  }

  class Pontos {
    static pontuar(qtd) {
      Pontos.pontos += qtd;
      document.getElementById("pontos").innerHTML = (Pontos.pontos.toString().padStart(5, "0"))
    }
  }

  class Reserva {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      document.getElementById("jogo").appendChild(this.element);

    }


  }

  class FocoIncendio {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.onclick = () => {
        Pontos.pontuar(100);
        this.element.remove();
        this.ok = true;
      }
      this.ok = false;
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      let left = Math.floor((Math.random() * (gameDimensions[0] - focoDimensions[0])));
      let top = Math.floor((Math.random() * (gameDimensions[1] - focoDimensions[1])))
      if (left > 20 && left < 200) {
        if (top > 400)
          top = 400
      } else {
        if (top < 100) {
          if (left > 600)
            left = 600;
        }
      }
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
      reserva.element.appendChild(this.element);

      this.tempo = 2;
    }

    diminui() {
      this.tempo = this.tempo - 1;
      if (this.tempo == 0 && this.ok == false) {
        this.element.className = "devastacao-pequena"
        this.element.onclick = () => false
        Vidas.perdeVida(1)
        Pontos.pontuar(-50);
      }
      return this.tempo > 0;
    }
  }

  class Caveira {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "caveira";
      this.element.onclick = () => {
        Pontos.pontuar(150);
        this.element.remove();
        this.ok = true;
      }
      this.ok = false;
      this.element.style.width = `${caveiraDimensions[0]}px`;
      this.element.style.height = `${caveiraDimensions[1]}px`;
      let left = Math.floor((Math.random() * (gameDimensions[0] - caveiraDimensions[0])));
      let top = Math.floor((Math.random() * (gameDimensions[1] - caveiraDimensions[1])))
      if (left > 20 && left < 200) {
        if (top > 400)
          top = 400
      } else {
        if (top < 100) {
          if (left > 600)
            left = 600;
        }
      }
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
      reserva.element.appendChild(this.element);

      this.tempo = 2;
    }

    diminui() {
      this.tempo = this.tempo - 1;
      if (this.tempo == 0 && this.ok == false) {
        this.element.className = "devastacao-grande"
        this.element.onclick = () => false
        Vidas.perdeVida(2)
      }
      return this.tempo > 0;
    }
  }

  function run() {
    frames++;
    if (Math.floor(frames / 60) > velocidade) {
      velocidade++;
      FPS = FPSINICIO + velocidade / 10;
      clearInterval(gameLoop);
      gameLoop = setInterval(run, 1000 / FPS);

    }
    focos = focos.filter(foco => foco.diminui());
    if (tempoFoco > 0) {
      tempoFoco--;
    } else {
      let foco = new FocoIncendio();
      focos.push(foco);
      tempoFoco = getRandomInt(1, 4);
    }

    caveiras = caveiras.filter(caveira => caveira.diminui());
    if (tempoCaveira > 0) {
      tempoCaveira--;
    } else {
      let caveira = new Caveira();
      caveiras.push(caveira);
      tempoCaveira = getRandomInt(5, 20);
    }
  }

  init();
})();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}