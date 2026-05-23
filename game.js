// ── 별자리 데이터 ────────────────────────────────────────────────
// 좌표는 0~1 정규화 값 (캔버스 크기에 비례해 스케일링)
const CONSTELLATIONS = [
    {
        name: '오리온자리',
        stars: [
            { x: 0.50, y: 0.12 }, // 0 머리
            { x: 0.32, y: 0.28 }, // 1 왼쪽 어깨
            { x: 0.68, y: 0.28 }, // 2 오른쪽 어깨
            { x: 0.38, y: 0.50 }, // 3 허리띠 왼
            { x: 0.50, y: 0.48 }, // 4 허리띠 중앙
            { x: 0.62, y: 0.50 }, // 5 허리띠 오른
            { x: 0.28, y: 0.76 }, // 6 왼쪽 발
            { x: 0.72, y: 0.72 }, // 7 오른쪽 발
        ],
        connections: [[0,1],[0,2],[1,3],[2,5],[3,4],[4,5],[1,6],[2,7]],
        options: ['오리온자리', '큰곰자리', '카시오페이아자리', '전갈자리'],
    },
    {
        name: '카시오페이아자리',
        stars: [
            { x: 0.10, y: 0.55 }, // 0
            { x: 0.28, y: 0.28 }, // 1
            { x: 0.50, y: 0.52 }, // 2
            { x: 0.72, y: 0.22 }, // 3
            { x: 0.90, y: 0.48 }, // 4
        ],
        connections: [[0,1],[1,2],[2,3],[3,4]],
        options: ['카시오페이아자리', '오리온자리', '백조자리', '큰곰자리'],
    },
    {
        name: '큰곰자리',
        stars: [
            { x: 0.15, y: 0.42 }, // 0 그릇 왼 아래
            { x: 0.15, y: 0.25 }, // 1 그릇 왼 위
            { x: 0.34, y: 0.20 }, // 2 그릇 오른 위
            { x: 0.34, y: 0.40 }, // 3 그릇 오른 아래
            { x: 0.52, y: 0.28 }, // 4 손잡이 1
            { x: 0.68, y: 0.22 }, // 5 손잡이 2
            { x: 0.84, y: 0.32 }, // 6 손잡이 3
        ],
        connections: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6]],
        options: ['큰곰자리', '카시오페이아자리', '작은곰자리', '사자자리'],
    },
    {
        name: '백조자리',
        stars: [
            { x: 0.50, y: 0.12 }, // 0 꼬리
            { x: 0.50, y: 0.40 }, // 1 중앙
            { x: 0.50, y: 0.70 }, // 2 머리
            { x: 0.20, y: 0.40 }, // 3 왼쪽 날개
            { x: 0.80, y: 0.40 }, // 4 오른쪽 날개
        ],
        connections: [[0,1],[1,2],[3,1],[1,4]],
        options: ['백조자리', '독수리자리', '거문고자리', '오리온자리'],
    },
    {
        name: '사자자리',
        stars: [
            { x: 0.72, y: 0.28 }, // 0 머리 위
            { x: 0.58, y: 0.20 }, // 1 이마
            { x: 0.48, y: 0.35 }, // 2 코
            { x: 0.52, y: 0.56 }, // 3 가슴
            { x: 0.32, y: 0.55 }, // 4 배
            { x: 0.18, y: 0.44 }, // 5 엉덩이
            { x: 0.18, y: 0.65 }, // 6 꼬리
        ],
        connections: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,3]],
        options: ['사자자리', '처녀자리', '게자리', '쌍둥이자리'],
    },
    {
        name: '전갈자리',
        stars: [
            { x: 0.25, y: 0.30 }, // 0 머리
            { x: 0.36, y: 0.38 }, // 1
            { x: 0.46, y: 0.42 }, // 2 안타레스
            { x: 0.56, y: 0.48 }, // 3
            { x: 0.65, y: 0.55 }, // 4
            { x: 0.72, y: 0.65 }, // 5
            { x: 0.76, y: 0.76 }, // 6
            { x: 0.70, y: 0.86 }, // 7 독침
        ],
        connections: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
        options: ['전갈자리', '사수자리', '오리온자리', '처녀자리'],
    },
    {
        name: '쌍둥이자리',
        stars: [
            { x: 0.28, y: 0.14 }, // 0 카스토르 (왼쪽 머리)
            { x: 0.54, y: 0.14 }, // 1 폴룩스 (오른쪽 머리)
            { x: 0.24, y: 0.34 }, // 2 왼쪽 어깨
            { x: 0.50, y: 0.34 }, // 3 오른쪽 어깨
            { x: 0.22, y: 0.56 }, // 4 왼쪽 허리
            { x: 0.48, y: 0.56 }, // 5 오른쪽 허리
            { x: 0.24, y: 0.80 }, // 6 왼쪽 발
            { x: 0.50, y: 0.80 }, // 7 오른쪽 발
        ],
        connections: [[0,2],[2,4],[4,6],[1,3],[3,5],[5,7],[2,3]],
        options: ['쌍둥이자리', '오리온자리', '황소자리', '마차부자리'],
    },
    {
        name: '처녀자리',
        stars: [
            { x: 0.50, y: 0.14 }, // 0 머리
            { x: 0.34, y: 0.30 }, // 1 왼쪽 어깨
            { x: 0.66, y: 0.30 }, // 2 오른쪽 어깨
            { x: 0.50, y: 0.46 }, // 3 몸통
            { x: 0.28, y: 0.58 }, // 4 왼쪽 팔
            { x: 0.50, y: 0.66 }, // 5 허리
            { x: 0.50, y: 0.84 }, // 6 다리
        ],
        connections: [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[5,6]],
        options: ['처녀자리', '사자자리', '천칭자리', '게자리'],
    },
];

// ── 상수 ─────────────────────────────────────────────────────────
const MAX_ROUNDS  = 5;
const ROUND_TIME  = 30;
const HINT_COST   = 20;
const STAR_RADIUS = 7;
const CLICK_DIST  = 22;

// ── 상태 ─────────────────────────────────────────────────────────
const state = {
    phase:        'idle',   // idle | playing | answered | gameover
    round:        0,
    score:        0,
    timeLeft:     ROUND_TIME,
    timerID:      null,
    current:      null,     // 현재 별자리 객체
    usedIndices:  [],
    hintRevealed: 0,        // 힌트로 공개된 연결선 개수
    selectedStar: null,     // 첫 번째 클릭한 별 인덱스
    drawnLines:   [],       // 사용자가 그린 선 [[a,b], ...]
    correct:      false,
};

// ── 캔버스 ───────────────────────────────────────────────────────
const bgCanvas   = document.getElementById('starCanvas');
const bgCtx      = bgCanvas.getContext('2d');
const gameCanvas = document.getElementById('gameCanvas');
const gameCtx    = gameCanvas.getContext('2d');
const gameBgm    = document.getElementById('game-bgm');

if (gameBgm) {
    gameBgm.volume = 0.35;
}

// 배경 별
const bgStars = [];

function initBg() {
    bgCanvas.width  = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    bgStars.length  = 0;
    for (let i = 0; i < 180; i++) {
        bgStars.push({
            x:     Math.random() * bgCanvas.width,
            y:     Math.random() * bgCanvas.height,
            r:     Math.random() * 1.2 + 0.3,
            a:     Math.random(),
            speed: (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
        });
    }
}

function drawBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgStars.forEach(s => {
        s.a += s.speed;
        if (s.a >= 1) { s.a = 1; s.speed *= -1; }
        if (s.a <= 0) { s.a = 0; s.speed *= -1; }
        bgCtx.beginPath();
        bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(255,255,255,${s.a.toFixed(2)})`;
        bgCtx.fill();
    });
    requestAnimationFrame(drawBg);
}

function resizeGameCanvas() {
    const rect = gameCanvas.getBoundingClientRect();
    gameCanvas.width  = rect.width;
    gameCanvas.height = rect.height;
}

// ── 좌표 변환 ────────────────────────────────────────────────────
function toPixel(star) {
    return {
        x: star.x * gameCanvas.width,
        y: star.y * gameCanvas.height,
    };
}

// ── 게임 캔버스 렌더링 ───────────────────────────────────────────
function drawGame() {
    const ctx = gameCtx;
    const c   = state.current;
    if (!c) return;

    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 1) 힌트로 공개된 연결선
    ctx.save();
    ctx.strokeStyle = 'rgba(0,210,255,0.55)';
    ctx.lineWidth   = 1.8;
    for (let i = 0; i < state.hintRevealed; i++) {
        const [a, b] = c.connections[i];
        drawLine(ctx, toPixel(c.stars[a]), toPixel(c.stars[b]));
    }
    ctx.restore();

    // 2) 정답 공개 시 전체 연결선 (정답=초록, 오답=빨강)
    if (state.phase === 'answered') {
        ctx.save();
        ctx.strokeStyle = state.correct
            ? 'rgba(0,255,150,0.85)'
            : 'rgba(255,70,70,0.85)';
        ctx.lineWidth = 2.2;
        ctx.shadowColor = state.correct ? '#00ff96' : '#ff4444';
        ctx.shadowBlur  = 10;
        c.connections.forEach(([a, b]) => {
            drawLine(ctx, toPixel(c.stars[a]), toPixel(c.stars[b]));
        });
        ctx.restore();
    }

    // 3) 사용자가 그린 선 (점선)
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth   = 1.3;
    ctx.setLineDash([5, 5]);
    state.drawnLines.forEach(([a, b]) => {
        drawLine(ctx, toPixel(c.stars[a]), toPixel(c.stars[b]));
    });
    ctx.setLineDash([]);
    ctx.restore();

    // 4) 별 점
    const time = Date.now() / 1000;
    c.stars.forEach((star, i) => {
        const pos      = toPixel(star);
        const selected = state.selectedStar === i;
        const twinkle  = 0.7 + 0.3 * Math.sin(time * 1.8 + i * 1.4);

        // 글로우
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, selected ? 28 : 18);
        grad.addColorStop(0, selected
            ? `rgba(0,210,255,${(0.5 * twinkle).toFixed(2)})`
            : `rgba(200,220,255,${(0.25 * twinkle).toFixed(2)})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, selected ? 28 : 18, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // 별 본체
        ctx.save();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, STAR_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle    = selected ? '#00d2ff' : `rgba(255,255,255,${twinkle.toFixed(2)})`;
        ctx.shadowColor  = selected ? '#00d2ff' : '#aac0ff';
        ctx.shadowBlur   = selected ? 16 : 8;
        ctx.fill();
        ctx.restore();
    });
}

function drawLine(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

// 별 트위클을 위해 게임 중 지속 렌더링
let animFrame = null;
function startRenderLoop() {
    cancelAnimationFrame(animFrame);
    function loop() {
        if (state.phase === 'playing' || state.phase === 'answered') {
            drawGame();
            animFrame = requestAnimationFrame(loop);
        }
    }
    animFrame = requestAnimationFrame(loop);
}

// ── 화면 전환 ────────────────────────────────────────────────────
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function playBackgroundMusic() {
    if (!gameBgm) return;

    const playPromise = gameBgm.play();
    if (playPromise) {
        playPromise.catch(() => {});
    }
}

// ── 게임 흐름 ────────────────────────────────────────────────────
function startGame() {
    playBackgroundMusic();
    state.round       = 0;
    state.score       = 0;
    state.usedIndices = [];
    updateScoreDisplay();
    loadRound();
}

function pickIndex() {
    let pool = CONSTELLATIONS
        .map((_, i) => i)
        .filter(i => !state.usedIndices.includes(i));
    if (pool.length === 0) {
        state.usedIndices = [];
        pool = CONSTELLATIONS.map((_, i) => i);
    }
    const idx = pool[Math.floor(Math.random() * pool.length)];
    state.usedIndices.push(idx);
    return idx;
}

function loadRound() {
    clearInterval(state.timerID);
    state.round++;
    state.timeLeft    = ROUND_TIME;
    state.hintRevealed = 0;
    state.selectedStar = null;
    state.drawnLines   = [];
    state.correct      = false;
    state.phase        = 'playing';
    state.current      = CONSTELLATIONS[pickIndex()];

    // UI 초기화
    document.getElementById('round-display').textContent = `라운드 ${state.round} / ${MAX_ROUNDS}`;
    updateTimerUI();
    buildChoices();
    const hintBtn = document.getElementById('hint-btn');
    hintBtn.disabled    = false;
    hintBtn.textContent = '💡 힌트 보기 (-20점)';

    showScreen('screen-game');

    // 캔버스 크기는 DOM이 보인 후 측정
    requestAnimationFrame(() => {
        resizeGameCanvas();
        startRenderLoop();
    });

    startTimer();
}

function buildChoices() {
    const shuffled = [...state.current.options].sort(() => Math.random() - 0.5);
    const el = document.getElementById('choices');
    el.innerHTML = '';
    shuffled.forEach(name => {
        const btn = document.createElement('button');
        btn.className   = 'choice-btn';
        btn.textContent = name;
        btn.addEventListener('click', () => checkAnswer(name));
        el.appendChild(btn);
    });
}

// ── 타이머 ───────────────────────────────────────────────────────
function startTimer() {
    state.timerID = setInterval(() => {
        state.timeLeft--;
        updateTimerUI();
        if (state.timeLeft <= 0) {
            clearInterval(state.timerID);
            onTimeout();
        }
    }, 1000);
}

function updateTimerUI() {
    const pct  = (state.timeLeft / ROUND_TIME) * 100;
    const fill = document.getElementById('timer-fill');
    const text = document.getElementById('timer-text');
    fill.style.width = pct + '%';
    text.textContent = state.timeLeft;
    const warn = state.timeLeft <= 10;
    fill.classList.toggle('warning', warn);
    text.classList.toggle('warning', warn);
}

function updateScoreDisplay() {
    document.getElementById('score-display').textContent = `${state.score}점`;
}

// ── 정답 판정 ────────────────────────────────────────────────────
function onTimeout() {
    if (state.phase !== 'playing') return;
    state.correct = false;
    state.phase   = 'answered';
    lockChoices(null);
    setTimeout(() => showRoundResult(false, 0), 900);
}

function checkAnswer(chosen) {
    if (state.phase !== 'playing') return;
    clearInterval(state.timerID);
    state.phase = 'answered';

    const correct = chosen === state.current.name;
    state.correct = correct;

    const gained = correct ? Math.max(10, state.timeLeft) * 10 : 0;
    state.score += gained;
    updateScoreDisplay();

    lockChoices(chosen);
    setTimeout(() => showRoundResult(correct, gained), 900);
}

function lockChoices(chosen) {
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === state.current.name) btn.classList.add('correct');
        else if (btn.textContent === chosen)         btn.classList.add('wrong');
    });
    document.getElementById('hint-btn').disabled = true;
}

// ── 결과 화면 ────────────────────────────────────────────────────
function showRoundResult(correct, gained) {
    cancelAnimationFrame(animFrame);

    document.getElementById('result-icon').textContent  = correct ? '✅' : '❌';
    document.getElementById('result-title').textContent = correct ? '정답!' : '틀렸어요';
    document.getElementById('result-desc').textContent  = correct
        ? `${state.current.name}가 맞습니다!`
        : `정답은 ${state.current.name}입니다.`;

    const gainEl = document.getElementById('result-score-gained');
    gainEl.textContent  = correct ? `+${gained}점` : '+0점';
    gainEl.style.color  = correct ? 'var(--neon-blue)' : '#ff6b35';

    document.getElementById('next-btn').textContent =
        state.round >= MAX_ROUNDS ? '결과 보기' : '다음 라운드';

    showScreen('screen-result');
}

function nextRound() {
    if (state.round >= MAX_ROUNDS) showGameOver();
    else loadRound();
}

function showGameOver() {
    state.phase = 'gameover';
    document.getElementById('final-score').textContent = state.score;

    let grade;
    if      (state.score >= 1200) grade = '🌟 별자리 마스터! 완벽해요!';
    else if (state.score >= 800)  grade = '⭐ 훌륭해요! 거의 다 맞혔군요.';
    else if (state.score >= 400)  grade = '🌙 조금 더 연습해보세요!';
    else                           grade = '🔭 별자리를 더 공부해봐요!';

    document.getElementById('final-grade').textContent = grade;
    showScreen('screen-gameover');
}

// ── 힌트 ─────────────────────────────────────────────────────────
function revealHint() {
    if (state.phase !== 'playing') return;
    if (state.hintRevealed >= state.current.connections.length) return;

    state.score = Math.max(0, state.score - HINT_COST);
    state.hintRevealed++;
    updateScoreDisplay();

    if (state.hintRevealed >= state.current.connections.length) {
        const btn = document.getElementById('hint-btn');
        btn.disabled    = true;
        btn.textContent = '💡 힌트 모두 공개됨';
    }
}

// ── 캔버스 클릭 (별 선 연결) ─────────────────────────────────────
gameCanvas.addEventListener('click', e => {
    if (state.phase !== 'playing') return;

    const rect = gameCanvas.getBoundingClientRect();
    const mx   = e.clientX - rect.left;
    const my   = e.clientY - rect.top;

    // 클릭 위치와 가장 가까운 별 탐색
    let hit = null;
    state.current.stars.forEach((star, i) => {
        const p  = toPixel(star);
        const dx = p.x - mx;
        const dy = p.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < CLICK_DIST) hit = i;
    });

    if (hit === null) {
        // 빈 곳 클릭 → 선택 해제
        state.selectedStar = null;
    } else if (state.selectedStar === null) {
        // 첫 번째 별 선택
        state.selectedStar = hit;
    } else if (state.selectedStar === hit) {
        // 같은 별 다시 클릭 → 해제
        state.selectedStar = null;
    } else {
        // 두 번째 별 선택 → 선 토글
        const a = state.selectedStar;
        const b = hit;
        const existIdx = state.drawnLines.findIndex(
            ([x, y]) => (x === a && y === b) || (x === b && y === a)
        );
        if (existIdx !== -1) state.drawnLines.splice(existIdx, 1);
        else                 state.drawnLines.push([a, b]);
        state.selectedStar = null;
    }
});

// ── 이벤트 바인딩 ────────────────────────────────────────────────
document.getElementById('start-btn').addEventListener('click',   startGame);
document.getElementById('hint-btn').addEventListener('click',    revealHint);
document.getElementById('next-btn').addEventListener('click',    nextRound);
document.getElementById('restart-btn').addEventListener('click', startGame);

window.addEventListener('resize', () => {
    initBg();
    if (state.phase === 'playing' || state.phase === 'answered') {
        resizeGameCanvas();
    }
});

document.addEventListener('visibilitychange', () => {
    if (!gameBgm) return;

    if (document.hidden) {
        gameBgm.pause();
    } else if (state.phase !== 'idle') {
        playBackgroundMusic();
    }
});

// ── 초기화 ───────────────────────────────────────────────────────
initBg();
drawBg();
