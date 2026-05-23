const canvas = document.getElementById('starCanvas');
const ctx = canvas?.getContext('2d');

let stars = [];
const starCount = 400;

function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Star {
    constructor() {
        this.init();
    }

    init() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 0.5 + 0.1;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }

    update() {
       
        this.y += this.speed;
        
        this.opacity += this.fadeSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.fadeSpeed = -this.fadeSpeed;
        }

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
}


for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

function animate() {
    if (!canvas || !ctx) return;
    ctx.fillStyle = 'rgba(5, 5, 16, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();

const exploreBtn = document.getElementById('exploreBtn');
const constellations = document.getElementById('constellations');

if (exploreBtn && constellations) {
    exploreBtn.addEventListener('click', () => {
        constellations.scrollIntoView({ behavior: 'smooth' });
    });
}
