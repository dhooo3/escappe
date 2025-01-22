 const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#900C3F', '#581845', '#33FFBD'];
    let particles = [];
    let fireworksActive = false;

    // Atur ukuran kanvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.background = 'transparent';
    canvas.style.zIndex = '9999';

    // Konversi HEX ke RGB
    function hexToRgb(hex) {
      const bigint = parseInt(hex.replace('#', ''), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    }

    // Particle Constructor
    function Particle(x, y, color, angle, speed, life) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.angle = angle;
      this.speed = speed;
      this.life = life;
      this.opacity = 1;
    }

    Particle.prototype.update = function () {
      const radians = this.angle * (Math.PI / 180);
      this.x += Math.cos(radians) * this.speed;
      this.y += Math.sin(radians) * this.speed;
      this.opacity -= 0.02;
      this.life -= 1;
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    };

    // Membuat Firework
    function createFirework(x, y) {
      const numberOfParticles = 100;
      for (let i = 0; i < numberOfParticles; i++) {
        const angle = Math.random() * 360;
        const speed = Math.random() * 4 + 1;
        const life = Math.random() * 50 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rgb = hexToRgb(color);
        particles.push(new Particle(x, y, `${rgb.r},${rgb.g},${rgb.b}`, angle, speed, life));
      }
    }

    // Animasi Firework
    function animateFireworks() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((particle) => particle.life > 0);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      if (fireworksActive) {
        requestAnimationFrame(animateFireworks);
      }
    }

    // Mulai Fireworks
    function startFireworks() {
      fireworksActive = true;
      animateFireworks();
      setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        createFirework(x, y);
      }, 500);
    }

    // Event Listener untuk LOVE
    const loveMessage = document.getElementById('kalimatf');
    loveMessage.addEventListener('click', () => {
      if (!fireworksActive) {
        startFireworks();
      }
    });

    // Atur ulang ukuran kanvas saat window di-resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
