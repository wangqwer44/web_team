// 1. 별자리 속성 데이터 정의
const signAttributes = {
    "Aries": { element: "Fire", quality: "Cardinal" },
    "Taurus": { element: "Earth", quality: "Fixed" },
    "Gemini": { element: "Air", quality: "Mutable" },
    "Cancer": { element: "Water", quality: "Cardinal" },
    "Leo": { element: "Fire", quality: "Fixed" },
    "Virgo": { element: "Earth", quality: "Mutable" },
    "Libra": { element: "Air", quality: "Cardinal" },
    "Scorpio": { element: "Water", quality: "Fixed" },
    "Sagittarius": { element: "Fire", quality: "Mutable" },
    "Capricorn": { element: "Earth", quality: "Cardinal" },
    "Aquarius": { element: "Air", quality: "Fixed" },
    "Pisces": { element: "Water", quality: "Mutable" }
};

// 2. 원소 간 상성 점수표
const elementMatrix = {
    "Fire": { "Fire": 80, "Air": 90, "Earth": 50, "Water": 30 },
    "Earth": { "Fire": 50, "Air": 60, "Earth": 85, "Water": 95 },
    "Air": { "Fire": 90, "Air": 80, "Earth": 60, "Water": 40 },
    "Water": { "Fire": 30, "Air": 40, "Earth": 95, "Water": 80 }
};

document.getElementById('match-btn').addEventListener('click', function() {
    const s1 = document.getElementById('sign1').value;
    const s2 = document.getElementById('sign2').value;
    const resultDiv = document.getElementById('match-result');
    const scoreSpan = document.getElementById('score');
    const textP = document.getElementById('match-text');

    // [계산 로직 1] 원소 기반 기본 점수
    const attr1 = signAttributes[s1];
    const attr2 = signAttributes[s2];
    let baseScore = elementMatrix[attr1.element][attr2.element];

    // [계산 로직 2] 고유성 부여 (같은 조합은 항상 같은 미세 조정값을 가짐)
    // 두 이름을 합친 문자열의 길이나 코드값을 활용
    const combinedString = [s1, s2].sort().join(""); 
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        hash += combinedString.charCodeAt(i);
    }
    const fineTune = (hash % 11); // 0~10 사이의 고정된 보정치

    let finalScore = baseScore + fineTune;

    // [계산 로직 3] 결과 텍스트 분기
    let message = "";
    if (finalScore >= 90) message = "운명적인 만남입니다! 서로의 영혼이 공명하고 있네요.";
    else if (finalScore >= 70) message = "매우 안정적인 관계입니다. 서로를 보완해주는 좋은 파트너가 될 거예요.";
    else if (finalScore >= 50) message = "노력이 필요한 관계입니다. 서로의 차이를 인정하면 더 깊어질 수 있습니다.";
    else message = "서로 다른 극을 가진 별자리입니다. 이해를 위해서는 많은 인내가 필요하겠네요.";

    // UI 업데이트
    resultDiv.classList.remove('hidden');
    animateScore(finalScore, scoreSpan);
    textP.innerText = message;
});

// 점수 카운트업 애니메이션
function animateScore(target, element) {
    let current = 0;
    element.innerText = 0;
    const duration = 1000; // 1초 동안 실행
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(progress * target);
        element.innerText = current;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}
// 별자리별 상세 리포트 데이터
const zodiacInfo = {
    "Aries": { best: "Leo", worst: "Cancer", img: "images/aries.png", desc: "양자리의 추진력과 열정은 상대방에게 큰 영감을 줍니다. 특히 비슷한 에너지를 가진 별자리와 만났을 때 폭발적인 시너지를 냅니다." },
    "Leo": { best: "Aries", worst: "Scorpio", img: "images/leo.png", desc: "사자자리의 화려함과 리더십은 어디서나 빛이 납니다. 당신의 자신감을 이해해주는 상대를 만나면 세상 부러울 게 없는 커플이 됩니다." },
    // 나머지 별자리 데이터도 동일한 형식으로 채워주세요.
};

// 버튼 클릭 이벤트 내부 로직 수정
document.getElementById('match-btn').addEventListener('click', function() {
    const s1 = document.getElementById('sign1').value;
    const s2 = document.getElementById('sign2').value;
    
    // 이전 답변에서 드린 알고리즘으로 score 계산 (생략)
    let finalScore = calculateScore(s1, s2); // 기존 로직 함수화 필요
    
    const info = zodiacInfo[s1];
    
    // UI 업데이트
    document.getElementById('match-result').classList.remove('hidden');
    document.getElementById('result-img').src = info.img;
    document.getElementById('match-desc').innerText = info.desc;
    document.getElementById('best-sign').innerText = zodiacData[info.best].name;
    document.getElementById('worst-sign').innerText = zodiacData[info.worst].name;
    
    // 점수 애니메이션 실행
    animateScore(finalScore, document.getElementById('score'));
});