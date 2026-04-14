const canvas = document.getElementById('constellationCanvas');
const ctx = canvas.getContext('2d');
const inputSection = document.getElementById('input-section');
const resultSection = document.getElementById('result-section');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 별자리 데이터 (간략화된 좌표 예시)
const zodiacData = {
    "Aries": { name: "양자리", date: "3.21 ~ 4.19", desc: "매우 열정적이고 자신감이 넘치며 활기찬 성격을 가집니다. 새로운 도전을 두려워하지 않는 리더의 기질이 있습니다.", coords: [[30,40], [50,30], [70,35], [85,50]] },
    "Taurus": { name: "황소자리", date: "4.20 ~ 5.20", desc: "신뢰가 가고 인내심이 강하며 현실적입니다. 아름다움과 물질적 안정을 추구하는 경향이 있습니다.", coords: [[20,20], [40,40], [60,60], [45,75], [35,85], [40,40], [70,30]] },
    "Gemini": { name: "쌍둥이자리", date: "5.21 ~ 6.21", desc: "호기심이 많고 적응력이 뛰어나며 사교적입니다. 지적인 대화를 즐기고 유머 감각이 뛰어납니다.", coords: [[30,20], [30,70], [40,20], [40,70], [30,20], [40,20]] },
    "Cancer": { name: "게자리", date: "6.22 ~ 7.22", desc: "감수성이 풍부하고 가족애가 강하며 보호 본능이 있습니다. 상상력이 뛰어나고 예술적인 면이 많습니다.", coords: [[50,30], [50,50], [40,70], [50,50], [70,70]] },
    "Leo": { name: "사자자리", date: "7.23 ~ 8.22", desc: "창의적이고 관대하며 자존감이 높습니다. 화려한 것을 좋아하고 주인공이 되는 것을 즐깁니다.", coords: [[80,70], [50,70], [40,50], [50,30], [70,30], [80,40], [80,70]] },
    "Virgo": { name: "처녀자리", date: "8.23 ~ 9.22", desc: "분석적이고 성실하며 세심합니다. 완벽을 추구하며 타인을 돕는 것에 보람을 느낍니다.", coords: [[30,30], [50,40], [70,30], [60,60], [80,70], [60,60], [40,70]] },
    "Libra": { name: "천칭자리", date: "9.23 ~ 10.23", desc: "외교적이고 공정하며 조화를 중시합니다. 미적 감각이 뛰어나며 평화로운 관계를 선호합니다.", coords: [[50,20], [30,50], [50,80], [70,50], [50,20]] },
    "Scorpio": { name: "전갈자리", date: "10.24 ~ 11.22", desc: "열정적이고 용기 있으며 신비로운 매력을 가집니다. 통찰력이 뛰어나고 한번 시작한 일은 끝을 봅니다.", coords: [[80,20], [70,30], [60,40], [50,40], [40,50], [30,70], [40,85]] },
    "Sagittarius": { name: "사수자리", date: "11.23 ~ 12.21", desc: "낙천적이고 자유를 사랑하며 정직합니다. 철학적이고 여행을 즐기며 시야가 넓습니다.", coords: [[30,50], [50,30], [70,50], [50,70], [30,50], [20,50], [80,50]] },
    "Capricorn": { name: "염소자리", date: "12.22 ~ 1.19", desc: "책임감이 강하고 끈기 있으며 야망이 있습니다. 현실적이고 차근차근 목표를 달성하는 노력파입니다.", coords: [[30,30], [70,30], [80,60], [50,80], [20,60], [30,30]] },
    "Aquarius": { name: "물병자리", date: "1.20 ~ 2.18", desc: "독창적이고 인도주의적이며 독립적입니다. 진보적인 사고를 하며 우정을 중요하게 생각합니다.", coords: [[20,30], [40,35], [50,55], [70,50], [85,70]] },
    "Pisces": { name: "물고기자리", date: "2.19 ~ 3.20", desc: "공감 능력이 뛰어나고 예술적이며 낭만적입니다. 직관력이 좋고 타인에게 친절하고 다정합니다.", coords: [[20,20], [40,40], [70,40], [80,60], [60,80], [40,70]] }
};

document.getElementById('find-btn').addEventListener('click', () => {
    const date = new Date(document.getElementById('birth-date').value);
    if (isNaN(date)) return alert("날짜를 선택해 주세요!");

    const sign = getZodiacSign(date.getMonth() + 1, date.getDate());
    startAnimation(sign);
});

function getZodiacSign(m, d) {
    if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "Aries";
    if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "Taurus";
    if ((m == 5 && d >= 21) || (m == 6 && d <= 21)) return "Gemini";
    if ((m == 6 && d >= 22) || (m == 7 && d <= 22)) return "Cancer";
    if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "Leo";
    if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "Virgo";
    if ((m == 9 && d >= 23) || (m == 10 && d <= 23)) return "Libra";
    if ((m == 10 && d >= 24) || (m == 11 && d <= 22)) return "Scorpio";
    if ((m == 11 && d >= 23) || (m == 12 && d <= 21)) return "Sagittarius";
    if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return "Capricorn";
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "Aquarius";
    return "Pisces";
}

function startAnimation(signKey) {
    const data = zodiacData[signKey];
    inputSection.classList.add('hidden');
    
    let progress = 0;
    const coords = data.coords.map(c => [c[0] * canvas.width / 100, c[1] * canvas.height / 100]);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 배경에 깔릴 작은 별들
        ctx.fillStyle = "white";
        for(let i=0; i<100; i++) { ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1, 1); }

        // 별자리 별 찍기
        coords.forEach(c => {
            ctx.beginPath();
            ctx.arc(c[0], c[1], 4, 0, Math.PI*2);
            ctx.fillStyle = "#00d2ff";
            ctx.shadowBlur = 15; ctx.shadowColor = "#00d2ff";
            ctx.fill();
        });

        // 선 긋기 애니메이션
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
        ctx.lineWidth = 2;
        ctx.moveTo(coords[0][0], coords[0][1]);
        
        const totalPoints = Math.floor(progress);
        for(let i=1; i<=totalPoints && i < coords.length; i++) {
            ctx.lineTo(coords[i][0], coords[i][1]);
        }
        ctx.stroke();

        progress += 0.05;
        if (progress < coords.length) {
            requestAnimationFrame(draw);
        } else {
            showResult(data);
        }
    }
    draw();
}

function showResult(data) {
    document.getElementById('const-name').innerText = data.name;
    document.getElementById('const-date').innerText = data.date;
    document.getElementById('const-desc').innerText = data.desc;
    resultSection.classList.remove('hidden');
}