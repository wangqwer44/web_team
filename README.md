# web_team_proj

## 주제

별자리 정보를 탐색하고, 나의 별자리 찾기, 별자리 궁합, 망원경 관측, 미니게임을 체험할 수 있는 정적 웹 프로젝트입니다.

## 실행 환경

- 별도 설치가 필요하지 않습니다.
- 최신 웹 브라우저(Chrome, Edge, Safari 등)에서 실행할 수 있습니다.
- 일부 외부 리소스(jQuery CDN, NASA 영상)를 사용하므로 인터넷 연결을 권장합니다.

## 실행 방법

### 1. 브라우저로 바로 실행

프로젝트 폴더에서 `mainHome.html` 파일을 브라우저로 열면 됩니다.

```text
web_team/mainHome.html
```

## 주요 페이지

- `mainHome.html`: 메인 홈 화면
- `telescope.html`: 별자리 망원경 관측 화면
- `findConst.html`: 생년월일 기반 별자리 찾기
- `match.html`: 별자리 운세 및 궁합 분석
- `game.html`: 별자리 맞추기 미니게임

## 폴더 구조

```text
web_team/
├── mainHome.html / mainHome.css / mainHome.js
├── telescope.html / telescope.css / telescope.js
├── findConst.html / findConst.css / findConst.js
├── match.html / match.css / match.js
├── game.html / game.css / game.js
├── shared.css
├── images/
└── music/
```

## 참고 사항

- 프로젝트의 시작 페이지는 `mainHome.html`입니다.
- 이미지 파일은 `images` 폴더, 게임 배경음악은 `music` 폴더에 있습니다.
- `game.html`의 배경음악은 브라우저 정책에 따라 사용자의 클릭 이후 재생될 수 있습니다.
