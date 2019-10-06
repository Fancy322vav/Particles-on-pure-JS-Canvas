(function() {
  // creates 'canvas' and set properties
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = innerWidth);
  let h = (canvas.height = innerHeight);
  const particles = [];
  const properties = {
    bgColor: "black",
    particleColor: "red",
    particleRadius: 3,
    particleCount: 60,
    particleSpeed: 0.5,
    lineLength: 150,
    particleLife: 6
  };

  const body = document.querySelector("body");
  body.appendChild(canvas);

  // sets canvas size equal to windows size
  window.onresize = function() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  };

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      // sets the particles speed
      this.speedX = Math.random() - properties.particleSpeed;
      this.speedY = Math.random() - properties.particleSpeed;
    }

    setPosition() {
      // prevents particles from flying from the screen
      (this.x + this.speedX > w && this.speedX > 0) ||
      (this.x + this.speedX < 0 && this.speedX < 0)
        ? (this.speedX *= -1)
        : this.speedX;
      (this.y + this.speedY > h && this.speedY > 0) ||
      (this.y + this.speedY < 0 && this.speedY < 0)
        ? (this.speedY *= -1)
        : this.speedY;
      this.x += this.speedX;
      this.y += this.speedY;
    }

    // draws the particles
    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
  }

  // draws canvas background
  function redDrawBg() {
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, w, h);
  }

  // connects the particles with lines
  function drawLines() {
    let x1, y1, x2, y2, length, opacity;
    for (let i in particles) {
      for (let j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        // draws lines
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength;
          ctx.lineWidth = "0,5";
          ctx.strokeStyle = "rgba(255, 40, 40, " + opacity + ")";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  // sets a position and draws the particles
  function reDrawParticles() {
    for (let i in particles) {
      particles[i].setPosition();
      particles[i].reDraw();
    }
  }

  // the recursion function, which draws, connects and animates all the particles
  function loop() {
    redDrawBg();
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
  }

  // creates all particles
  function init() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }
    loop();
  }

  init();
})();
