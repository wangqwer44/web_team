const signNames = {
    Aries: "양자리",
    Taurus: "황소자리",
    Gemini: "쌍둥이자리",
    Cancer: "게자리",
    Leo: "사자자리",
    Virgo: "처녀자리",
    Libra: "천칭자리",
    Scorpio: "전갈자리",
    Sagittarius: "사수자리",
    Capricorn: "염소자리",
    Aquarius: "물병자리",
    Pisces: "물고기자리"
};

const signAttributes = {
    Aries: { element: "Fire", quality: "Cardinal" },
    Taurus: { element: "Earth", quality: "Fixed" },
    Gemini: { element: "Air", quality: "Mutable" },
    Cancer: { element: "Water", quality: "Cardinal" },
    Leo: { element: "Fire", quality: "Fixed" },
    Virgo: { element: "Earth", quality: "Mutable" },
    Libra: { element: "Air", quality: "Cardinal" },
    Scorpio: { element: "Water", quality: "Fixed" },
    Sagittarius: { element: "Fire", quality: "Mutable" },
    Capricorn: { element: "Earth", quality: "Cardinal" },
    Aquarius: { element: "Air", quality: "Fixed" },
    Pisces: { element: "Water", quality: "Mutable" }
};

const elementMatrix = {
    Fire: { Fire: 80, Air: 90, Earth: 50, Water: 30 },
    Earth: { Fire: 50, Air: 60, Earth: 85, Water: 95 },
    Air: { Fire: 90, Air: 80, Earth: 60, Water: 40 },
    Water: { Fire: 30, Air: 40, Earth: 95, Water: 80 }
};

const zodiacInfo = {
    Aries: {
        best: "Leo",
        worst: "Cancer",
        img: "images/aries.png",
        desc: "양자리의 추진력과 열정은 관계에 빠른 활력을 더합니다. 감정을 바로 표현하는 만큼 서로의 속도를 존중하면 시너지가 커집니다."
    },
    Taurus: {
        best: "Cancer",
        worst: "Aquarius",
        img: "images/taurus.png",
        desc: "황소자리는 안정감과 신뢰를 중요하게 여깁니다. 천천히 쌓는 관계에서 깊은 애정을 보여주며 현실적인 배려가 강점입니다."
    },
    Gemini: {
        best: "Libra",
        worst: "Pisces",
        img: "images/gemini.png",
        desc: "쌍둥이자리는 대화와 호기심으로 관계를 밝게 만듭니다. 서로에게 새로운 생각을 열어줄 때 매력이 가장 잘 드러납니다."
    },
    Cancer: {
        best: "Pisces",
        worst: "Aries",
        img: "images/cancer.png",
        desc: "게자리는 섬세한 공감과 보호 본능이 강합니다. 안정적인 정서 교류가 있을수록 관계의 온도가 깊어집니다."
    },
    Leo: {
        best: "Aries",
        worst: "Scorpio",
        img: "images/leo.png",
        desc: "사자자리는 자신감과 표현력이 빛나는 별자리입니다. 서로를 인정하고 응원하는 관계에서 가장 화려한 조합이 됩니다."
    },
    Virgo: {
        best: "Taurus",
        worst: "Sagittarius",
        img: "images/virgo.png",
        desc: "처녀자리는 세심함과 책임감으로 관계를 단단하게 다집니다. 작은 약속을 잘 지키는 상대와 특히 잘 맞습니다."
    },
    Libra: {
        best: "Gemini",
        worst: "Capricorn",
        img: "images/libra.png",
        desc: "천칭자리는 조화와 균형을 사랑합니다. 대화의 결이 부드럽고 서로의 취향을 존중할 때 편안한 관계가 됩니다."
    },
    Scorpio: {
        best: "Pisces",
        worst: "Leo",
        img: "images/scorpio.png",
        desc: "전갈자리는 깊은 몰입과 진정성을 중요하게 여깁니다. 신뢰가 쌓이면 누구보다 강한 유대감을 보여줍니다."
    },
    Sagittarius: {
        best: "Aries",
        worst: "Virgo",
        img: "images/sagittarius.png",
        desc: "사수자리는 자유와 확장을 추구합니다. 서로의 세계를 넓혀주는 관계에서 밝고 건강한 에너지가 살아납니다."
    },
    Capricorn: {
        best: "Taurus",
        worst: "Libra",
        img: "images/capricorn.png",
        desc: "염소자리는 책임감과 장기적인 안목이 강합니다. 함께 목표를 세우고 꾸준히 나아갈 때 안정적인 궁합이 됩니다."
    },
    Aquarius: {
        best: "Gemini",
        worst: "Taurus",
        img: "images/aquarius.png",
        desc: "물병자리는 독창성과 독립성을 중시합니다. 서로에게 적당한 거리와 자유를 허락할 때 관계가 산뜻해집니다."
    },
    Pisces: {
        best: "Scorpio",
        worst: "Gemini",
        img: "images/pisces.png",
        desc: "물고기자리는 공감과 상상력이 풍부합니다. 감정의 흐름을 이해해주는 상대와 만나면 깊은 위로를 주고받습니다."
    }
};

const sign1Select = document.getElementById('sign1');
const sign2Select = document.getElementById('sign2');
const matchBtn = document.getElementById('match-btn');

function fillSelect(select, selectedValue) {
    if (!select) return;

    select.innerHTML = '';
    Object.entries(signNames).forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        if (value === selectedValue) option.selected = true;
        select.appendChild(option);
    });
}

function calculateScore(signA, signB) {
    const attrA = signAttributes[signA];
    const attrB = signAttributes[signB];
    const baseScore = elementMatrix[attrA.element][attrB.element];
    const combinedString = [signA, signB].sort().join("");
    let hash = 0;

    for (let i = 0; i < combinedString.length; i++) {
        hash += combinedString.charCodeAt(i);
    }

    const fineTune = hash % 11;
    const qualityBonus = attrA.quality === attrB.quality ? 3 : 0;
    const sameSignBonus = signA === signB ? 5 : 0;

    return Math.min(100, baseScore + fineTune + qualityBonus + sameSignBonus);
}

function getMatchMessage(score, signA, signB) {
    if (score >= 90) {
        return `${signNames[signA]}와 ${signNames[signB]}는 서로의 장점을 크게 키워주는 강한 조합입니다. 감정과 행동의 리듬이 잘 맞아 빠르게 가까워질 수 있어요.`;
    }
    if (score >= 70) {
        return `${signNames[signA]}와 ${signNames[signB]}는 안정적으로 서로를 보완하는 조합입니다. 차이를 대화로 풀어가면 오래 이어지기 좋습니다.`;
    }
    if (score >= 50) {
        return `${signNames[signA]}와 ${signNames[signB]}는 서로 다른 방식으로 세상을 봅니다. 기준을 맞추는 시간이 필요하지만 배울 점도 많은 관계입니다.`;
    }
    return `${signNames[signA]}와 ${signNames[signB]}는 속도와 표현 방식이 꽤 다를 수 있습니다. 충분한 설명과 배려가 관계의 핵심입니다.`;
}

function animateScore(target, element) {
    if (!element) return;

    const duration = 900;
    const startTime = performance.now();
    element.innerText = 0;

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.innerText = Math.floor(progress * target);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function renderMatchResult() {
    const signA = sign1Select.value;
    const signB = sign2Select.value;
    const score = calculateScore(signA, signB);
    const info = zodiacInfo[signA];

    const result = document.getElementById('match-result');
    const resultImg = document.getElementById('result-img');

    document.getElementById('match-title').innerText =
        score >= 90 ? "최상의 파트너" : score >= 70 ? "좋은 조합" : score >= 50 ? "노력이 필요한 조합" : "다른 결의 조합";
    document.getElementById('match-desc').innerText = `${getMatchMessage(score, signA, signB)} ${info.desc}`;
    document.getElementById('best-sign').innerText = signNames[info.best];
    document.getElementById('worst-sign').innerText = signNames[info.worst];

    resultImg.src = info.img;
    resultImg.alt = signNames[signA];

    result.classList.remove('hidden');
    animateScore(score, document.getElementById('score'));
}

if (sign2Select) fillSelect(sign2Select, 'Leo');
if (sign1Select && sign1Select.options.length < Object.keys(signNames).length) {
    fillSelect(sign1Select, 'Aries');
}
if (matchBtn) {
    matchBtn.addEventListener('click', renderMatchResult);
}
