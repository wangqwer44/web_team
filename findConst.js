const zodiacData = {
    Aries: {
        name: "양자리",
        date: "3.21 ~ 4.19",
        img: "images/aries.png",
        desc: "매우 열정적이고 자신감이 넘치며 활기찬 성격을 가집니다. 새로운 도전을 두려워하지 않는 리더의 기질이 있습니다."
    },
    Taurus: {
        name: "황소자리",
        date: "4.20 ~ 5.20",
        img: "images/taurus.png",
        desc: "신뢰가 가고 인내심이 강하며 현실적입니다. 아름다움과 물질적 안정을 추구하는 경향이 있습니다."
    },
    Gemini: {
        name: "쌍둥이자리",
        date: "5.21 ~ 6.21",
        img: "images/gemini.png",
        desc: "호기심이 많고 적응력이 뛰어나며 사교적입니다. 지적인 대화를 즐기고 유머 감각이 뛰어납니다."
    },
    Cancer: {
        name: "게자리",
        date: "6.22 ~ 7.22",
        img: "images/cancer.png",
        desc: "감수성이 풍부하고 가족애가 강하며 보호 본능이 있습니다. 상상력이 뛰어나고 예술적인 면이 많습니다."
    },
    Leo: {
        name: "사자자리",
        date: "7.23 ~ 8.22",
        img: "images/leo.png",
        desc: "창의적이고 관대하며 자존감이 높습니다. 화려한 것을 좋아하고 주인공이 되는 것을 즐깁니다."
    },
    Virgo: {
        name: "처녀자리",
        date: "8.23 ~ 9.22",
        img: "images/virgo.png",
        desc: "분석적이고 성실하며 세심합니다. 완벽을 추구하며 타인을 돕는 것에 보람을 느낍니다."
    },
    Libra: {
        name: "천칭자리",
        date: "9.23 ~ 10.23",
        img: "images/libra.png",
        desc: "외교적이고 공정하며 조화를 중시합니다. 미적 감각이 뛰어나며 평화로운 관계를 선호합니다."
    },
    Scorpio: {
        name: "전갈자리",
        date: "10.24 ~ 11.22",
        img: "images/scorpio.png",
        desc: "열정적이고 용기 있으며 신비로운 매력을 가집니다. 통찰력이 뛰어나고 한번 시작한 일은 끝을 봅니다."
    },
    Sagittarius: {
        name: "사수자리",
        date: "11.23 ~ 12.21",
        img: "images/sagittarius.png",
        desc: "낙천적이고 자유를 사랑하며 정직합니다. 철학적이고 여행을 즐기며 시야가 넓습니다."
    },
    Capricorn: {
        name: "염소자리",
        date: "12.22 ~ 1.19",
        img: "images/capricorn.png",
        desc: "책임감이 강하고 끈기 있으며 야망이 있습니다. 현실적이고 차근차근 목표를 달성하는 노력파입니다."
    },
    Aquarius: {
        name: "물병자리",
        date: "1.20 ~ 2.18",
        img: "images/aquarius.png",
        desc: "독창적이고 인도주의적이며 독립적입니다. 진보적인 사고를 하며 우정을 중요하게 생각합니다."
    },
    Pisces: {
        name: "물고기자리",
        date: "2.19 ~ 3.20",
        img: "images/pisces.png",
        desc: "공감 능력이 뛰어나고 예술적이며 낭만적입니다. 직관력이 좋고 타인에게 친절하고 다정합니다."
    }
};

const findBtn = document.getElementById('find-btn');
const birthDateInput = document.getElementById('birth-date');
const resultCard = document.getElementById('finder-result');
const closeResultBtn = document.getElementById('close-result-btn');
const gridCards = document.getElementById('gridCards');

function getZodiacSign(month, day) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Gemini";
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return "Libra";
    if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "Scorpio";
    if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
}

function showResult(signKey) {
    const data = zodiacData[signKey];

    document.getElementById('result-name').innerText = data.name;
    document.getElementById('result-date').innerText = data.date;
    document.getElementById('result-desc').innerText = data.desc;

    const resultImg = document.getElementById('result-img');
    resultImg.src = data.img;
    resultImg.alt = data.name;

    resultCard.classList.remove('hidden');
}

function buildZodiacGrid() {
    if (!gridCards) return;

    gridCards.innerHTML = '';
    Object.values(zodiacData).forEach(data => {
        const card = document.createElement('article');
        card.className = 'const-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${data.img}" alt="${data.name}" class="zodiac-img">
                    <h3>${data.name}</h3>
                    <p>${data.date}</p>
                </div>
                <div class="card-back">
                    <h3>${data.name}</h3>
                    <p class="card-desc">${data.desc}</p>
                    <button type="button" class="card-link">결과 보기</button>
                </div>
            </div>
        `;
        card.querySelector('button').addEventListener('click', () => {
            showResult(Object.keys(zodiacData).find(key => zodiacData[key] === data));
        });
        gridCards.appendChild(card);
    });
}

if (findBtn && birthDateInput) {
    findBtn.addEventListener('click', () => {
        if (!birthDateInput.value) {
            alert("날짜를 선택해 주세요!");
            return;
        }

        const [, month, day] = birthDateInput.value.split('-').map(Number);
        showResult(getZodiacSign(month, day));
    });
}

if (closeResultBtn && resultCard) {
    closeResultBtn.addEventListener('click', () => {
        resultCard.classList.add('hidden');
    });
}

buildZodiacGrid();
