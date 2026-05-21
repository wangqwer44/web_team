// ==========================================
// 1. 코어 전역 변수 및 캔버스 설정
// ==========================================
const telescopeCanvas = document.getElementById('telescopeCanvas');
const telescopeCtx = telescopeCanvas.getContext('2d');
let tW = 0, tH = 0;

let activeUniverseStars = [];
const constellationScale = 2.8; 

let currentZoom = 1.0;
let targetZoom = 1.0;
const minZoom = 0.5;
const maxZoom = 4.0;

let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
let offsetX = 0; 
let offsetY = 0; 
let isFirstLoad = true; // [중앙 버그 수정] 첫 로드 판별 변수

// ==========================================
// 2. [데이터 완전체] 황도 12궁 + 나머지 별자리 10개 (총 22개 전체 수록)
// ==========================================
const zodiacMasterData = [
    // --- 황도 12궁 (1 ~ 12) ---
    { 
        id: "Cancer", name: "게자리", fixedX: -280, fixedY: -150, 
        stars: [
            {x: -45, y: 5, s: 4.5, mag: "10.25", radec: "08h 31m 54.4s  +21° 04' 10.6\"", azalt: "276° 56' 34.4\" / +26° 45' 14.3\"", name: "TYC 1391-897-1", dist: "181 광년", desc: "게자리 구역의 주성입니다. 주변 행성계를 포함하고 있습니다."},
            {x: 25, y: -35, s: 4.1, mag: "4.20", radec: "08h 43m 13.5s  +21° 28' 01.2\"", azalt: "275° 12' 44.1\" / +27° 10' 11.5\"", name: "이오타 Cnc", dist: "300 광년", desc: "우측 상단 집게발 끝에 위치한 아름다운 이중성입니다."},
            {x: -5, y: -15, s: 4.4, mag: "4.66", radec: "08h 44m 41.1s  +18° 09' 15.4\"", azalt: "276° 02' 11.8\" / +25° 50' 04.1\"", name: "아셀루스 보레알리스", dist: "160 광년", desc: "몸통 마름모꼴의 상단 꼭지점입니다. 북쪽의 어린 당나귀라는 뜻입니다."},
            {x: -20, y: -2, s: 4.0, mag: "5.05", radec: "08h 39m 28.9s  +19° 40' 22.0\"", azalt: "276° 44' 50.2\" / +26° 11' 33.9\"", name: "게자리 가마", dist: "158 광년", desc: "몸통 마름모의 왼쪽 꼭지점에 위치한 백색 항성입니다."},
            {x: 10, y: -2, s: 3.9, mag: "5.10", radec: "08h 42m 40.0s  +19° 31' 05.2\"", azalt: "276° 21' 08.5\" / +26° 02' 14.0\"", name: "아셀루스 신스트룸", dist: "136 광년", desc: "몸통 마름모의 오른쪽 꼭지점입니다. 밝게 빛나는 주계열성입니다."},
            {x: -5, y: 15, s: 4.2, mag: "3.94", radec: "08h 44m 43.4s  +11° 51' 36.2\"", azalt: "277° 10' 15.3\" / +24° 30' 55.7\"", name: "아셀루스 아우스트랄리스", dist: "131 광년", desc: "몸통 마름모의 하단 꼭지점입니다. 남쪽의 어린 당나귀를 뜻합니다."},
            {x: -15, y: 40, s: 4.0, mag: "4.26", radec: "08h 58m 29.2s  +11° 51' 28.0\"", azalt: "277° 55' 42.1\" / +23° 40' 19.4\"", name: "아쿠벤스", dist: "174 광년", desc: "맨 아래 다리 끝자락의 백색 항성으로, 집게발을 의미합니다."}
        ], 
        connections: [[0, 3], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6]]
    },
    { 
        id: "Aries", name: "양자리", fixedX: 350, fixedY: -380, 
        stars: [
            {x: -30, y: -15, s: 5.0, mag: "2.01", radec: "02h 07m 10.4s  +23° 27' 44.7\"", azalt: "290° 12' 11.2\" / +35° 14' 22.1\"", name: "하말", dist: "66 광년", desc: "양자리의 알파별로, 가장 밝게 타오르는 주황색 거성입니다."},
            {x: -5, y: -5, s: 4.2, mag: "2.64", radec: "01h 54m 38.4s  +20° 48' 28.9\"", azalt: "291° 45' 02.4\" / +34° 10' 15.6\"", name: "셰라탄", dist: "59 광년", desc: "양의 뿔 부분에 해당하는 분광쌍성이자 청백색 별입니다."},
            {x: 20, y: 5, s: 3.8, mag: "3.88", radec: "01h 53m 31.8s  +19° 17' 37.8\"", azalt: "292° 10' 55.1\" / +33° 05' 40.2\"", name: "메사르팀", dist: "164 광년", desc: "망원경으로 보면 두 개의 별으로 분리되는 아름다운 이중성계입니다."},
            {x: 40, y: 20, s: 3.5, mag: "4.35", radec: "03h 11m 37.8s  +19° 43' 36.1\"", azalt: "285° 33' 14.8\" / +38° 12' 09.4\"", name: "보테인", dist: "170 광년", desc: "양의 꼬리 혹은 배 부근에 흩어진 황색 거성입니다."}
        ], 
        connections: [[0, 1], [1, 2], [2, 3]]
    },
    { 
        id: "Taurus", name: "황소자리", fixedX: -420, fixedY: 290,
        stars: [
            {x: -35, y: -30, s: 4.8, mag: "2.85", radec: "03h 47m 29.1s  +24° 06' 18.4\"", azalt: "280° 14' 55.9\" / +41° 02' 11.3\"", name: "알치오네", dist: "440 광년", desc: "플레이아데스 산개성단에서 가장 밝고 거대한 중심 항성입니다."},
            {x: 0, y: 0, s: 4.5, mag: "3.53", radec: "04h 28m 36.9s  +19° 10' 49.5\"", azalt: "275° 40' 11.2\" / +43° 22' 04.7\"", name: "아인", dist: "147 광년", desc: "황소의 북쪽 눈에 해당하며 히아데스 성단의 일원입니다."},
            {x: -15, y: 25, s: 4.2, mag: "1.65", radec: "05h 26m 17.5s  +28° 36' 27.0\"", azalt: "264° 12' 38.4\" / +49° 11' 55.1\"", name: "엘나스", dist: "134 광년", desc: "황소의 북쪽 뿔 끝자락에 걸쳐 있는 거대한 청백색 별입니다."},
            {x: 35, y: -20, s: 6.5, mag: "0.85", radec: "04h 35m 55.2s  +16° 30' 33.5\"", azalt: "276° 02' 44.8\" / +44° 50' 12.6\"", name: "알데바란", dist: "65 광년", desc: "황소의 붉은 눈으로 불리는 매우 거대하고 붉은 오렌지빛 거성입니다."},
            {x: 50, y: -35, s: 4.0, mag: "2.97", radec: "05h 37m 38.6s  +21° 08' 33.3\"", azalt: "265° 55' 10.1\" / +51° 04' 22.9\"", name: "제타 Tau", dist: "440 광년", desc: "남쪽 뿔 끝을 담당하며 강한 가스 외각을 가진 고속 자전성입니다."}
        ], 
        connections: [[0, 1], [1, 2], [1, 3], [3, 4]]
    },
    { 
        id: "Gemini", name: "쌍둥이자리", fixedX: 420, fixedY: 340,
        stars: [
            {x: -25, y: -35, s: 5.2, mag: "1.58", radec: "07h 34m 36.0s  +31° 53' 18.1\"", azalt: "250° 11' 40.2\" / +34° 55' 12.0\"", name: "카스토르", dist: "51 광년", desc: "쌍둥이 형의 머리성으로 사실 6개의 별이 묶인 다중성계입니다."},
            {x: 10, y: -35, s: 5.5, mag: "1.14", radec: "07h 45m 18.9s  +28° 01' 34.3\"", azalt: "248° 50' 12.3\" / +36° 10' 44.1\"", name: "폴룩스", dist: "34 광년", desc: "동생의 머리에 해당하며 외계행성을 거느린 오렌지색 거성입니다."},
            {x: -35, y: -5, s: 4.0, mag: "3.06", radec: "06h 43m 55.9s  +25° 07' 52.0\"", azalt: "258° 33' 21.0\" / +30° 12' 05.4\"", name: "메브수타", dist: "840 광년", desc: "형 카스토르의 허리 부근에 위치한 엄청나게 밝은 초거성입니다."},
            {x: 0, y: -5, s: 4.0, mag: "3.50", radec: "07h 20m 07.4s  +21° 58' 56.4\"", azalt: "254° 12' 44.7\" / +33° 40' 11.2\"", name: "와사트", dist: "59 광년", desc: "동생의 몸통 중간 마디에 있는 명왕성이 발견된 길목의 별입니다."},
            {x: -40, y: 25, s: 4.2, mag: "2.88", radec: "06h 14m 52.7s  +22° 30' 24.3\"", azalt: "262° 10' 05.8\" / +27° 15' 38.0\"", name: "테아트", dist: "230 광년", desc: "형의 발끝단에 놓여 있으며 주기적으로 밝기가 변하는 변광성입니다."},
            {x: -5, y: 30, s: 4.5, mag: "1.93", radec: "06h 37m 42.7s  +16° 23' 57.4\"", azalt: "261° 45' 19.3\" / +29° 50' 12.1\"", name: "알헤나", dist: "109 광년", desc: "동생의 발밑에서 눈부시게 빛나는 청백색 아거성입니다."}
        ], 
        connections: [[0, 1], [0, 2], [2, 4], [1, 3], [3, 5]]
    },
    { 
        id: "Leo", name: "사자자리", fixedX: -550, fixedY: -320,
        stars: [
            {x: -45, y: 15, s: 5.0, mag: "2.14", radec: "11h 49m 03.6s  +14° 34' 19.4\"", azalt: "220° 15' 33.1\" / +11° 10' 52.0\"", name: "데네볼라", dist: "36 광년", desc: "사자의 꼬리에 해당하는 백색 주계열성으로 가스 원반이 있습니다."},
            {x: -15, y: 0, s: 4.1, mag: "2.56", radec: "11h 14m 14.4s  +20° 31' 25.4\"", azalt: "226° 40' 11.2\" / +15° 22' 09.4\"", name: "조스마", dist: "58 광년", desc: "사자의 등 상단에 자리 잡은 아주 빠르게 자전하는 백색성입니다."},
            {x: -20, y: 25, s: 4.2, mag: "3.33", radec: "11h 14m 15.9s  +15° 25' 46.4\"", azalt: "227° 10' 55.4\" / +14° 40' 12.3\"", name: "체르탄", dist: "165 광년", desc: "사자의 뒷다리 경계 항성으로 허리를 뜻하는 명칭입니다."},
            {x: 15, y: 10, s: 4.8, mag: "2.01", radec: "10h 19m 58.3s  +19° 50' 29.3\"", azalt: "235° 12' 44.1\" / +20° 05' 41.7\"", name: "알지에바", dist: "130 광년", desc: "사자 갈기 부분의 황금빛 쌍성으로 하늘에서 가장 아름다운 이중성 중 하나입니다."},
            {x: 10, y: -20, s: 4.0, mag: "3.43", radec: "09h 52m 45.8s  +26° 00' 25.0\"", azalt: "236° 55' 12.9\" / +23° 10' 55.2\"", name: "알게누비", dist: "124 광년", desc: "낫 모양 머리의 꼭대기 부근에 위치한 황색 거성입니다."},
            {x: 25, y: 30, s: 6.0, mag: "1.35", radec: "10h 08m 22.3s  +11° 58' 01.9\"", azalt: "238° 10' 05.2\" / +19° 44' 11.8\"", name: "레굴루스", dist: "79 광년", desc: "사자의 심장이라 불리는 백색 주성으로, 황도와 매우 가깝습니다."}
        ], 
        connections: [[0, 1], [1, 2], [2, 5], [5, 3], [3, 1], [3, 4]]
    },
    { 
        id: "Virgo", name: "처녀자리", fixedX: 150, fixedY: -580,
        stars: [
            {x: -30, y: -35, s: 4.2, mag: "4.17", radec: "11h 50m 41.7s  +01° 45' 53.0\"", azalt: "212° 45' 12.1\" / +04° 10' 22.9\"", name: "자비야바", dist: "36 광년", desc: "처녀의 서쪽 어깨 부근에 위치한 우리 태양과 닮은 황색 항성입니다."},
            {x: -20, y: -10, s: 4.5, mag: "2.74", radec: "12h 41m 39.6s  -01° 26' 57.7\"", azalt: "204° 10' 55.8\" / -02° 30' 11.4\"", name: "포리마", dist: "38 광년", desc: "중심 조인점의 유명한 근접 이중성으로 공전 주기가 약 169년입니다."},
            {x: 10, y: -25, s: 4.2, mag: "2.85", radec: "13h 02m 10.6s  +10° 57' 32.9\"", azalt: "197° 55' 02.1\" / +05° 40' 15.6\"", name: "빈데미아트릭스", dist: "102 광년", desc: "오른쪽 날개 끝자락에 있으며 포도 수확꾼이라는 뜻의 황색 거성입니다."},
            {x: -15, y: 15, s: 4.0, mag: "3.38", radec: "13h 09m 57.0s  -05° 32' 20.4\"", azalt: "198° 12' 44.3\" / -08° 15' 33.1\"", name: "아우바", dist: "198 광년", desc: "치마 골반부에 해당하는 밝은 적색 거성입니다."},
            {x: 20, y: 25, s: 6.5, mag: "0.98", radec: "13h 25m 11.6s  -11° 09' 40.8\"", azalt: "192° 33' 05.9\" / -15° 02' 44.7\"", name: "스피카", dist: "250 광년", desc: "처녀자리의 보리이삭을 뜻하는 가장 찬란하고 순수한 청백색의 거성입니다."}
        ], 
        connections: [[0, 1], [1, 2], [1, 3], [3, 4]]
    },
    { 
        id: "Libra", name: "천칭자리", fixedX: -120, fixedY: 580,
        stars: [
            {x: -25, y: 15, s: 4.6, mag: "2.75", radec: "14h 50m 52.7s  -16° 02' 29.8\"", azalt: "175° 40' 11.2\" / -22° 10' 55.4\"", name: "주벤엘게누비", dist: "77 광년", desc: "수평 저울대의 남쪽 집게발을 뜻하는 분광쌍성계입니다."},
            {x: 0, y: -25, s: 4.8, mag: "2.61", radec: "15h 17m 00.4s  -09° 22' 58.3\"", azalt: "168° 12' 33.9\" / -18° 40' 12.0\"", name: "주벤에샤마리", dist: "185 광년", desc: "북쪽 집게발을 뜻하며 밤하늘에서 드문 녹색 기운을 띠는 항성입니다."},
            {x: 25, y: 5, s: 4.1, mag: "3.91", radec: "15h 37m 01.4s  -14° 47' 22.1\"", azalt: "164° 55' 02.4\" / -23° 15' 44.1\"", name: "주벤엘하카비", dist: "163 광년", desc: "우측 저울판의 가로축 분기점을 이루는 고온의 주계열성입니다."}
        ], 
        connections: [[0, 1], [1, 2], [2, 0]]
    },
    { 
        id: "Scorpio", name: "전갈자리", fixedX: 580, fixedY: -120,
        stars: [
            {x: -30, y: -20, s: 4.2, mag: "2.56", radec: "16h 05m 26.2s  -19° 48' 19.4\"", azalt: "158° 11' 44.0\" / -28° 10' 05.3\"", name: "그라피아스", dist: "400 광년", desc: "전갈 머리 맨 위의 다중성으로 작은 망원경으로도 분리되어 보입니다."},
            {x: -20, y: 0, s: 4.4, mag: "2.29", radec: "15h 59m 43.7s  -22° 37' 18.1\"", azalt: "159° 45' 12.8\" / -31° 44' 22.9\"", name: "드슈바", dist: "402 광년", desc: "전갈 이마 중심축에 있는 변광성으로 가스 분출을 일으키기도 합니다."},
            {x: 0, y: 5, s: 7.0, mag: "1.06", radec: "16h 29m 24.4s  -26° 25' 55.2\"", azalt: "152° 10' 05.1\" / -35° 02' 11.8\"", name: "안타레스", dist: "550 광년", desc: "전갈의 심장에 박힌 초거성으로 화성과 붉은빛을 겨룬다는 뜻입니다."},
            {x: 25, y: 25, s: 5.0, mag: "1.62", radec: "17h 33m 36.5s  -37° 06' 13.7\"", azalt: "135° 33' 22.4\" / -44° 15' 55.0\"", name: "샤울라", dist: "700 광년", desc: "전갈 독침의 끝자락에서 강력한 에너지를 내뿜는 청백색 준거성입니다."}
        ], 
        connections: [[0, 1], [1, 2], [2, 3]]
    },
    { 
        id: "Sagittarius", name: "궁수자리", fixedX: -580, fixedY: 50,
        stars: [
            {x: -25, y: 15, s: 4.5, mag: "2.72", radec: "18h 20m 59.6s  -29° 49' 40.9\"", azalt: "124° 12' 44.9\" / -38° 11' 22.1\"", name: "카우스 메디아", dist: "348 광년", desc: "당겨진 활대의 정중앙에 위치한 오렌지빛 거성입니다."},
            {x: -10, y: -15, s: 4.3, mag: "2.82", radec: "18h 27m 58.2s  -25° 25' 17.8\"", azalt: "121° 55' 10.3\" / -34° 02' 44.8\"", name: "카우스 보레알리스", dist: "78 광년", desc: "활의 북쪽이자 주전자 뚜껑의 꼭대기 꼭지점 부근의 별입니다."},
            {x: 15, y: -5, s: 4.8, mag: "2.05", radec: "18h 55m 15.9s  -26° 17' 47.8\"", azalt: "115° 10' 02.4\" / -33° 50' 11.2\"", name: "누나키", dist: "220 광년", desc: "티팟(주전자) 본체의 오른쪽 손잡이 프레임을 구성하는 안정적인 별입니다."}
        ], 
        connections: [[0, 1], [1, 2]]
    },
    { 
        id: "Capricorn", name: "염소자리", fixedX: -210, fixedY: -520,
        stars: [
            {x: -30, y: -15, s: 4.2, mag: "3.58", radec: "20h 18m 03.2s  -12° 32' 41.5\"", azalt: "095° 40' 11.8\" / -18° 12' 05.4\"", name: "알기디", dist: "109 광년", desc: "염소의 왼쪽 뿔 꼭대기에 놓여 있는 시각적 이중성입니다."},
            {x: 0, y: 15, s: 4.0, mag: "4.08", radec: "20h 51m 49.3s  -26° 55' 00.1\"", azalt: "084° 12' 33.1\" / -29° 15' 44.0\"", name: "오메가 Cap", dist: "630 광년", desc: "하부 물고기 꼬리 골격의 남쪽 축을 이루는 M형 적색 거성입니다."},
            {x: 30, y: -10, s: 4.8, mag: "2.85", radec: "21h 47m 02.4s  -16° 07' 38.2\"", azalt: "068° 55' 02.9\" / -16° 40' 11.9\"", name: "데네브 알기디", dist: "39 광년", desc: "염소의 꼬리 끝 정점을 의미하며 주기적으로 식 현상이 일어나는 쌍성입니다."}
        ], 
        connections: [[0, 1], [1, 2], [2, 0]]
    },
    { 
        id: "Aquarius", name: "물병자리", fixedX: 590, fixedY: -550,
        stars: [
            {x: -20, y: -15, s: 4.8, mag: "2.95", radec: "22h 05m 47.0s  -00° 19' 11.4\"", azalt: "060° 12' 44.1\" / -02° 30' 55.7\"", name: "사달멜리크", dist: "520 광년", desc: "왼쪽 어깨에 위치한 황색 초거성입니다."},
            {x: 0, y: 0, s: 4.2, mag: "3.65", radec: "22h 21m 39.3s  -01° 23' 14.5\"", azalt: "055° 10' 05.8\" / -03° 12' 44.1\"", name: "사달크비아", dist: "158 광년", desc: "물병 입구의 중심 기둥축을 형성하는 항성입니다."},
            {x: 20, y: 20, s: 4.5, mag: "3.27", radec: "22h 54m 39.0s  -15° 49' 14.7\"", azalt: "045° 33' 21.0\" / -14° 10' 02.4\"", name: "스카트", dist: "160 광년", desc: "물줄기 하단 끝자락의 푸른 주계열성입니다."}
        ], 
        connections: [[0, 1], [1, 2]]
    },
    { 
        id: "Pisces", name: "물고기자리", fixedX: 250, fixedY: 550,
        stars: [
            {x: -25, y: -20, s: 4.0, mag: "4.48", radec: "23h 03m 52.6s  +03° 49' 12.3\"", azalt: "042° 12' 55.1\" / +04° 10' 38.9\"", name: "푸만알사마카", dist: "492 광년", desc: "물고기의 입을 뜻하는 고독한 위치의 항성입니다."},
            {x: 0, y: 20, s: 4.5, mag: "3.82", radec: "02h 02m 02.8s  +02° 45' 49.5\"", azalt: "292° 40' 11.2\" / +15° 04' 11.6\"", name: "알레샤", dist: "139 광년", desc: "두 리본 매듭 끈의 정중앙에 위치한 항성입니다."},
            {x: 25, y: 0, s: 4.1, mag: "4.13", radec: "01h 13m 43.8s  +07° 34' 31.5\"", azalt: "305° 55' 02.4\" / +19° 12' 55.4\"", name: "북쪽 끈마디", dist: "280 광년", desc: "리본에서 북쪽 물고기 방향으로 가는 도중의 항성입니다."}
        ], 
        connections: [[0, 1], [1, 2]]
    },
    // --- 나머지 주요 10개 외곽 별자리 영역 ---
    {
        id: "Orion", name: "오리온자리", fixedX: -100, fixedY: 100,
        stars: [
            // [오리온자리 리모델링 완결] 나비넥타이 사각형 구조 및 허리 삼태성 배치 강화
            {x: -25, y: -35, s: 6.0, mag: "0.50", radec: "05h 55m 10.3s  +07° 24' 25.4\"", name: "베텔게우스", dist: "640 광년", desc: "오리온의 왼쪽 어깨를 상징하는 사멸해 가는 신비로운 붉은색 초거성입니다."},
            {x: 25, y: -30, s: 5.2, mag: "1.64", radec: "05h 25m 07.9s  +06° 20' 58.9\"", name: "벨라트릭스", dist: "250 광년", desc: "오리온의 오른쪽 어깨에 해당하는 밝은 청백색 주계열성입니다."},
            {x: -20, y: 35, s: 4.8, mag: "2.06", radec: "05h 47m 45.4s  -09° 40' 10.6\"", name: "사이프", dist: "720 광년", desc: "오리온의 오른쪽 무릎 혹은 발끝을 담당하는 푸른색의 밝은 거성입니다."},
            {x: 25, y: 40, s: 6.5, mag: "0.12", radec: "05h 14m 32.3s  -08° 12' 05.9\"", name: "리겔", dist: "860 광년", desc: "왼쪽 발끝에서 차갑고 푸르게 엄청난 광도로 뿜어 나오는 초거성입니다."},
            {x: -12, y: 2, s: 4.4, mag: "2.23", radec: "05h 40m 45.5s  -01° 56' 33.3\"", name: "알니탁", dist: "1260 광년", desc: "삼태성의 왼쪽(동쪽)에 위치한 다중성계 항성입니다."},
            {x: 2, y: 0, s: 4.5, mag: "1.69", radec: "05h 36m 12.8s  -01° 12' 06.9\"", name: "알니람", dist: "1340 광년", desc: "오리온 자리 정중앙 삼태성의 완벽한 중심을 잡는 핵심 초거성입니다."},
            {x: 16, y: -2, s: 4.3, mag: "2.25", radec: "05h 32m 00.4s  -00° 17' 56.7\"", name: "민타카", dist: "900 광년", desc: "삼태성의 오른쪽(서쪽) 끝단에 위치하며 천구 적도에 매우 가까운 별입니다."}
        ],
        connections: [
            [0, 1], [0, 4], [1, 6], [2, 3], [2, 4], [3, 6], [4, 5], [5, 6]
        ]
    },
    {
        id: "UrsaMajor", name: "큰곰자리(북두칠성)", fixedX: -50, fixedY: -450,
        stars: [
            {x: -40, y: -20, s: 4.5, mag: "1.80", radec: "11h 03m 43.7s  +61° 45' 03.2\"", name: "두베", dist: "124 광년", desc: "북극성을 가리키는 국자 머리의 지표성입니다."},
            {x: -20, y: -10, s: 4.3, mag: "2.40", radec: "11h 01m 50.5s  +56° 22' 56.4\"", name: "메락", dist: "79 광년", desc: "국자 바닥면의 밝은 주계열성입니다."},
            {x: 20, y: 10, s: 4.2, mag: "2.20", radec: "13h 23m 55.5s  +54° 55' 31.4\"", name: "미자르", dist: "83 광년", desc: "굽어지는 손잡이 축의 유명한 육안 이중성입니다."}
        ],
        connections: [[0, 1], [1, 2]]
    },
    {
        id: "Cassiopeia", name: "카시오페아자리", fixedX: 450, fixedY: -150,
        stars: [
            {x: -30, y: -10, s: 4.6, mag: "2.20", radec: "00h 40m 30.4s  +56° 32' 14.3\"", name: "셰다르", dist: "230 광년", desc: "W자 꺾임점의 대표적인 오렌지 거성입니다."},
            {x: 0, y: 10, s: 4.5, mag: "2.45", radec: "00h 56m 42.5s  +60° 43' 00.2\"", name: "치 카시오페아", dist: "610 광년", desc: "W자의 가운데 중심 기둥 변광성입니다."},
            {x: 30, y: -10, s: 4.4, mag: "2.68", radec: "01h 25m 48.9s  +60° 14' 07.2\"", name: "루크바", dist: "99 광년", desc: "오른쪽 경사면 아래에 안착한 백색성입니다."}
        ],
        connections: [[0, 1], [1, 2]]
    },
    {
        id: "Cygnus", name: "백조자리", fixedX: 300, fixedY: -50,
        stars: [
            {x: 0, y: -40, s: 5.5, mag: "1.25", radec: "20h 41m 25.9s  +45° 16' 49.3\"", name: "데네브", dist: "2600 광년", desc: "백조 꼬리의 극대 거성으로 여름 대삼각형 중 하나입니다."},
            {x: 0, y: 0, s: 4.2, mag: "2.20", radec: "20h 22m 13.7s  +40° 15' 24.1\"", name: "사드르", dist: "1500 광년", desc: "백조자리 은하수 한복판 교차점의 초거성입니다."},
            {x: 0, y: 50, s: 3.8, mag: "3.05", radec: "19h 30m 43.3s  +27° 57' 34.8\"", name: "알비레오", dist: "430 광년", desc: "우주에서 가장 아름다운 금색-청색 보석 이중성입니다."}
        ],
        connections: [[0, 1], [1, 2]]
    },
    {
        id: "Lyra", name: "거문고자리", fixedX: 180, fixedY: -200,
        stars: [
            {x: -10, y: -20, s: 7.0, mag: "0.03", radec: "18h 36m 56.3s  +38° 47' 01.2\"", name: "베가 (직녀성)", dist: "25 광년", desc: "밤하늘에서 가장 눈부시게 푸르른 백색 항성입니다."},
            {x: 10, y: 10, s: 4.0, mag: "3.52", radec: "18h 50m 04.8s  +33° 21' 44.8\"", name: "셸리아크", dist: "960 광년", desc: "서로를 삼키듯 공전하는 식변광성 쌍성계입니다."},
            {x: -10, y: 20, s: 4.1, mag: "3.24", radec: "18h 58m 56.6s  +32° 41' 33.9\"", name: "설라파트", dist: "620 광년", desc: "거문고 골격 하부의 청백색 거성입니다."}
        ],
        connections: [[0, 1], [1, 2], [2, 0]]
    },
    {
        id: "Aquila", name: "독수리자리", fixedX: 200, fixedY: 200,
        stars: [
            {x: 0, y: -10, s: 6.2, mag: "0.76", radec: "19h 50m 47.0s  +08° 52' 06.0\"", name: "알타이르 (견우성)", dist: "17 광년", desc: "자전이 너무 빨라 적도가 옆으로 눌려진 백색성입니다."},
            {x: -15, y: 15, s: 3.8, mag: "3.71", radec: "19h 55m 18.8s  +06° 24' 24.3\"", name: "알샤인", dist: "45 광년", desc: "견우성을 호위하는 남쪽 날개의 주황색 준거성입니다."},
            {x: 15, y: -35, s: 4.0, mag: "2.72", radec: "19h 46m 15.6s  +10° 36' 47.8\"", name: "타라제드", dist: "460 광년", desc: "견우성 북동쪽의 거대한 적색 오렌지빛 거성입니다."}
        ],
        connections: [[1, 0], [0, 2]]
    },
    {
        id: "Pegasus", name: "페가수스자리", fixedX: 520, fixedY: 150,
        stars: [
            {x: -30, y: -30, s: 4.8, mag: "2.42", radec: "23h 03m 46.5s  +28° 04' 58.0\"", name: "셰아트", dist: "200 광년", desc: "가을 대사각형의 북서쪽 귀퉁이를 구성하는 적색 거성입니다."},
            {x: 30, y: -30, s: 4.6, mag: "2.47", radec: "00h 08m 23.3s  +29° 05' 25.6\"", name: "알페라츠", dist: "97 광년", desc: "안드로메다 자리와 공유하는 대사각형의 꼭지점입니다."},
            {x: -30, y: 30, s: 5.0, mag: "2.49", radec: "23h 04m 45.7s  +15° 12' 18.9\"", name: "마르카브", dist: "140 광년", desc: "천마의 날개 시작점인 남서쪽 코너의 백색성입니다."}
        ],
        connections: [[0, 1], [0, 2]]
    },
    {
        id: "Andromeda", name: "안드로메다자리", fixedX: 550, fixedY: -50,
        stars: [
            {x: -20, y: -10, s: 4.6, mag: "2.06", radec: "01h 09m 43.9s  +35° 37' 14.1\"", name: "미라크", dist: "200 광년", desc: "안드로메다 대은하를 포착하는 길목의 주요 적색 거성입니다."},
            {x: 20, y: 10, s: 4.5, mag: "2.10", radec: "02h 03m 53.9s  +42° 19' 47.0\"", name: "알마크", dist: "350 광년", desc: "망원경 관측용 천상의 이색 이중성계입니다."}
        ],
        connections: [[0, 1]]
    },
    {
        id: "CanisMajor", name: "큰개자리", fixedX: -280, fixedY: 450,
        stars: [
            {x: 0, y: -20, s: 8.5, mag: "-1.46", radec: "06h 45m 08.9s  -16° 42' 58.0\"", name: "시리우스", dist: "8.6 광년", desc: "전하늘을 통틀어 가장 강력하게 타오르는 항성의 군주입니다."},
            {x: -30, y: 10, s: 4.6, mag: "1.50", radec: "06h 22m 42.0s  -17° 57' 21.3\"", name: "미르잠", dist: "500 광년", desc: "시리우스가 뜨기 직전 먼저 지평선 위로 솟는 전령의 별입니다."},
            {x: 20, y: 30, s: 4.8, mag: "1.83", radec: "07h 08 23.5s  -26° 23' 35.5\"", name: "웨젠", dist: "1800 광년", desc: "아득히 멀리 있지만 실체는 엄청난 질량의 황색 초거성입니다."}
        ],
        connections: [[0, 1], [0, 2]]
    },
    {
        id: "Bootes", name: "목동자리", fixedX: -50, fixedY: -580,
        stars: [
            {x: 0, y: 30, s: 7.2, mag: "-0.05", radec: "14h 15m 39.7s  +19° 10' 56.4\"", name: "아크투르스", dist: "37 광년", desc: "봄철 밤하늘의 스펙트럼 중심축을 이루는 대표적인 주황색 거성입니다."},
            {x: -15, y: -10, s: 4.2, mag: "2.70", radec: "14h 44m 59.2s  +27° 04' 27.2\"", name: "이자르", dist: "210 광년", desc: "색상 대비가 황홀하여 장미라 불리는 유명 이중성입니다."}
        ],
        connections: [[0, 1]]
    }
];

// ==========================================
// 3. 우주 객체 로직 및 렌더링 시스템
// ==========================================
class CosmicStar {
    constructor(starData, parentZodiac) {
        this.meta = starData;
        this.parent = parentZodiac;
        this.x = 0; this.y = 0;
        this.blinkAngle = Math.random() * Math.PI * 2;
        this.blinkSpeed = 0.015;
    }
    update() {
        this.x = this.parent.fixedX + (this.meta.x * constellationScale);
        this.y = this.parent.fixedY + (this.meta.y * constellationScale);
    }
    draw() {
        this.blinkAngle += this.blinkSpeed;
        const factor = 0.88 + (Math.sin(this.blinkAngle) + 1) * 0.12;
        const baseSize = this.meta.s * factor;

        telescopeCtx.save();
        telescopeCtx.shadowBlur = 14;
        telescopeCtx.shadowColor = "rgba(0, 210, 255, 0.5)";
        
        let grad = telescopeCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, baseSize * 2.2);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(145, 230, 255, 0.85)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        
        telescopeCtx.fillStyle = grad;
        telescopeCtx.beginPath();
        telescopeCtx.arc(this.x, this.y, baseSize * 2.2, 0, Math.PI * 2);
        telescopeCtx.fill();
        telescopeCtx.restore();
    }
}

function initGreenwichSky() {
    activeUniverseStars = [];
    zodiacMasterData.forEach((zodiac) => {
        zodiac.computedStars = zodiac.stars.map(star => {
            const starObj = new CosmicStar(star, zodiac);
            activeUniverseStars.push(starObj);
            return starObj;
        });
    });
}

function drawCelestialGrid() {
    telescopeCtx.save();
    telescopeCtx.strokeStyle = "rgba(0, 210, 255, 0.03)"; 
    telescopeCtx.lineWidth = 1;
    const maxRadius = Math.max(tW, tH) * 4;
    for (let r = 150; r < maxRadius; r += 200) {
        telescopeCtx.beginPath();
        telescopeCtx.arc(tW / 2, tH / 2, r, 0, Math.PI * 2);
        telescopeCtx.stroke();
    }
    telescopeCtx.restore();
}

function drawRealCosmosLoop() {
    telescopeCtx.clearRect(0, 0, tW, tH);
    
    currentZoom += (targetZoom - currentZoom) * 0.1;
    drawCelestialGrid();

    telescopeCtx.save();
    
    // [중앙 버그 수정 완결] 기준점을 먼저 화면 중앙(tW/2, tH/2)에 세팅한 뒤, 
    // 사용자가 드래그한 거리(offsetX, offsetY)만큼만 곱연산 없이 순수 가감 이동합니다.
    telescopeCtx.translate(tW / 2 + offsetX, tH / 2 + offsetY); 
    telescopeCtx.scale(currentZoom, currentZoom);

    zodiacMasterData.forEach(zodiac => {
        zodiac.computedStars.forEach(starObj => starObj.update());
    });

    zodiacMasterData.forEach(zodiac => {
        if (zodiac.connections && zodiac.connections.length > 0) {
            telescopeCtx.save();
            telescopeCtx.beginPath();
            telescopeCtx.strokeStyle = "rgba(0, 210, 255, 0.28)"; 
            telescopeCtx.lineWidth = 1.3 / currentZoom;
            zodiac.connections.forEach(edge => {
                const starA = zodiac.computedStars[edge[0]];
                const starB = zodiac.computedStars[edge[1]];
                if (starA && starB) {
                    telescopeCtx.moveTo(starA.x, starA.y);
                    telescopeCtx.lineTo(starB.x, starB.y);
                }
            });
            telescopeCtx.stroke();
            telescopeCtx.restore();
        }

        if (zodiac.computedStars && zodiac.computedStars.length > 0) {
            telescopeCtx.save();
            telescopeCtx.fillStyle = "rgba(180, 245, 255, 0.85)";
            telescopeCtx.font = `500 ${15 / currentZoom}px 'Noto Sans KR', sans-serif`;
            telescopeCtx.textAlign = "center";
            telescopeCtx.fillText(zodiac.name, zodiac.fixedX, zodiac.fixedY - 60);
            telescopeCtx.restore();
        }
    });

    activeUniverseStars.forEach(star => star.draw());
    telescopeCtx.restore(); 

    requestAnimationFrame(drawRealCosmosLoop);
}

// ==========================================
// 4. 왼쪽 상단 실시간 데이터 바인딩 UI 핸들러
// ==========================================
function updateDynamicPanel(starMeta) {
    const panel = document.getElementById('cosmicDataPanel');
    
    document.getElementById('panelStarName').innerText = starMeta.name || "미지정 항성";
    document.getElementById('panelConstName').innerText = `${starMeta.parent ? starMeta.parent.name : '외곽 영역'} 소속`;
    document.getElementById('panelMag').innerText = starMeta.mag || "-";
    document.getElementById('panelRadec').innerText = starMeta.radec || "00h 00m 00.0s  +00° 00' 00.0\"";
    document.getElementById('panelAzalt').innerText = starMeta.azalt || "000° 00' 00.0\" / +00° 00' 00.0\"";
    document.getElementById('panelDist').innerText = starMeta.dist || "-";
    document.getElementById('panelDesc').innerText = starMeta.desc || "관측 제어 데이터가 존재하지 않습니다.";
    
    panel.classList.remove('hidden');
}

function closeDynamicPanel() {
    document.getElementById('cosmicDataPanel').classList.add('hidden');
}

window.updateDynamicPanel = updateDynamicPanel;
window.closeDynamicPanel = closeDynamicPanel;

// ==========================================
// 5. 이벤트 인터랙션 리스너
// ==========================================
window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0) {
        targetZoom = Math.min(maxZoom, targetZoom + 0.2);
    } else {
        targetZoom = Math.max(minZoom, targetZoom - 0.2);
    }
}, { passive: true });

telescopeCanvas.addEventListener('mousedown', function(e) {
    isDragging = true;
    telescopeCanvas.style.cursor = "grabbing";
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
});

window.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMouseX;
    const deltaY = e.clientY - previousMouseY;
    // 드래그 속도를 줌 스케일에 맞추어 자연스럽게 보정
    offsetX += deltaX / currentZoom;
    offsetY += deltaY / currentZoom;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
});

window.addEventListener('mouseup', function() {
    if(isDragging) {
        isDragging = false;
        telescopeCanvas.style.cursor = "crosshair";
    }
});

// [클릭 오프셋 버그 수정] 화면 정렬 변화에 맞춘 정확한 충돌 판정식 계산
telescopeCanvas.addEventListener('click', function(e) {
    const rect = telescopeCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    let clickedStarMeta = null;

    activeUniverseStars.forEach(star => {
        // 실제 드로잉 행렬 변환 구조와 완벽히 동일하게 일치시킴
        const viewX = tW / 2 + offsetX + (star.x * currentZoom);
        const viewY = tH / 2 + offsetY + (star.y * currentZoom);
        const dist = Math.sqrt((clickX - viewX) ** 2 + (clickY - viewY) ** 2);
        if (dist < 30 * currentZoom) { 
            clickedStarMeta = star.meta;
            clickedStarMeta.parent = star.parent;
        }
    });

    if (clickedStarMeta) {
        updateDynamicPanel(clickedStarMeta);
    }
});

function resizeCanvas() {
    tW = telescopeCanvas.width = window.innerWidth;
    tH = telescopeCanvas.height = window.innerHeight;
    
    // [중앙 정렬 버그 수정] 최초 웹 구동 시 오프셋을 구석탱이가 아닌 (0,0) 절대 정중앙으로 잡아줍니다.
    if (isFirstLoad) {
        offsetX = 0;
        offsetY = 0;
        isFirstLoad = false;
    }
    
    initGreenwichSky(); 
}
window.addEventListener('resize', resizeCanvas);

// 초기 가동 및 프레임 룹 시작
resizeCanvas();
requestAnimationFrame(drawRealCosmosLoop);