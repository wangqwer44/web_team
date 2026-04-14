const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 400; // 별의 개수

// 캔버스 크기를 화면에 맞춤
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// 별 객체 생성
class Star {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 0.5 + 0.1; // 이동 속도
        this.size = Math.random() * 1.5; // 별 크기
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
        // 아래로 천천히 흐르는 효과
        this.y += this.speed;
        
        // 반짝이는 효과
        this.opacity += this.fadeSpeed;
        if (this.opacity > 1 || this.opacity < 0) {
            this.fadeSpeed = -this.fadeSpeed;
        }

        // 화면 밖으로 나가면 다시 위에서 시작
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
}

// 별 초기화
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// 애니메이션 루프
function animate() {
    // 잔상 효과를 위해 반투명하게 덮기 (더 깊이감 있는 우주 느낌)
    ctx.fillStyle = 'rgba(5, 5, 16, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();