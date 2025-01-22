class Fireworks {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = "9999";
        this.canvas.style.background = "transparent";
        document.body.appendChild(this.canvas);

        this.resize();
        window.addEventListener("resize", () => this.resize());

        this.fireworks = [];
        this.loop();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createFirework(x, y) {
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            const speed = Math.random() * 3 + 2;
            this.fireworks.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
            });
        }
    }

    loop() {
        requestAnimationFrame(() => this.loop());

        // Clear canvas with transparency
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.fireworks.forEach((fw, index) => {
            fw.x += fw.vx;
            fw.y += fw.vy;
            fw.alpha -= 0.02;

            if (fw.alpha <= 0) {
                this.fireworks.splice(index, 1);
            }

            this.ctx.fillStyle = `rgba(255, 200, 100, ${fw.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}

const fireworks = new Fireworks();
let hasStartedFireworks = false;

// Trigger fireworks after opening
function startFireworks() {
    if (!hasStartedFireworks) {
        hasStartedFireworks = true;

        setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            fireworks.createFirework(x, y);
        }, 500); // Set interval for continuous fireworks
    }
}
