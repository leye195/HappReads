# HappY Readers (Good Readers) Front

### Front 사용 기술:

- React
- SCSS (스타일 변수 값들 관리 및 mixin 이용해 중복을 없앰)
- Redux(상태관리),미들웨어(Redux logger,Redux Promise-Middleware) 이용
- React Router (Route,Link를 이용해 페이지 라우팅 진행)
- moment.js 이용 날짜 조작
  <!--- 해외 goodreads 같은 페이지를 만들어 보고자 진행, 기능이 좀 부족하지만 개선중-->

## Daily Coding 기록

### 2020.02.18

1. create-react-app으로 프로젝트 생성
2. 우선 제일 기본적인 컴포넌트 구성 (라우팅 진행하는데 사용될 컴포넌트들) 셋팅

- Home (홈 메인)
- Profile[ (유저 프로필)
- Detail (책 상세정보)
- Login (로그인)
- Sign Up (가입)
- Search (검색)
- Books (서재 관련)
- Upload (책 정보 업로드)
- Community (커뮤니티)
- NoMatch (404 에러 처리 페이지)

3. scss에서 관리될 색상 및 mixin 정리
4. Header, Login, SignUp 구성 완료

### 2020.02.20

1. mock data 사용해 보여줄 데이터들 스타일링 및 기능 로직 처리 코딩 진행
2. Detail 컴포넌트 코딩 진행
3. Rating 및 Review 컴포넌트 생성하여 스타일링 및 코딩 진행
4. Review 컴포넌트 구성 기본 완료(), Search 결과 화면 UI 구성 진행

### 2020.02.21

1. Search 결과 화면 코딩 진행 (이제 점점 서버 필요함)

### 2020.02.22

1. Books(서재) 화면 간단히 코딩 진행
2. 이제 서버 백앤드 코딩 진행(프론트와 별도로 관리 예정)
3. redux 관련 설정 진행 (store, reducer 코딩 진행, redux 미들웨어 redux-promise-middle 와 redux-logger 적용 )
4. kakao api 이용 책 검색 정보 요청, signUp(sns계정은 아직),login,logout 기능 완료 및 로그인 상태 체크로 상황에 따한 페이지 접근 제한 설정

### 2020.02.23

1. Header 위치 조정, 유저 로그인 상태에 따라 기능 제한 설정.
2. 책 이름으로 검색 기능, 책 평점,리뷰 작성 기능 작업 진행(back에서 관련 작업 진행 필요)
3. 유저 프로필 수정(이미지,닉네임,소개,웹사이트)

### 2020.02.24

1. 리뷰, 평점 기능 코딩 수정, 리뷰, 평점 진행후 서버로 부터 받아온 값을 redux를 이용해 props에 넣어준뒤, props가 변화가 있을시 사용되는 componentDidUpdate를 이용해 값들을 업데이트

### 2020.02.25

1. 책 업로드 라우터, 컴포넌트 추가
2. 프로필에 현재 읽고있는 책, 읽은 책, 읽을 책 리스트 표시 및 책 삭제 (책 리스트 수정은 작업 예정)
3. 프로필 수정 컴포넌트 라우트를 이용해 페이지 이동하던 것을 Modal로 수정

### 2020.02.26

1. 책 업로드 폼에서 저자 이름 추가 방식 수정(기존의 text 타입으로 입력하는 방식에서 이름 태그 추가 방식으로 수정)
2. 업로드 한 책 리스트 UI 코딩 진행 (vertical scroll 형식으로 정해진 공간을 초과할 경우 스크롤 할 수 있게 overflow-y:scroll을 scss에서 설정해줌)
3. 무한 스크롤 이용 다음 결과 페이지 로딩 (body.scrollTop, window.innerHeight, body.scrollHeight을 이용)
4. 음...검색 api는 query값을 필수로 하고 있기 때문에 메인 페이지에서 보여줄 전체 책 데이터는 크롤링를 통해서 저장하거나 아니면 test 계정을 이용해
   책 정보를 하나 하나 업로드 해줘야 해야 될 것 같음.

### 2020.02.27

1. 책 리스트 소속 수정 기능 추가 (삭제는 추가 예정 )
2. 유저 평점 수정,기존에 책에 부여한 평점은 상세화면에 표시되며 평점을 수정해 다시 부여가능

### 2020.02.28~29 (28일은 너무 피곤해서 쉼)

1. 업로드된 책 및 서재 관련 책의 목록의 상세 페이지 작성, table을 이용해 책들의 리스트를 보여줌, 책 읽은 상태(읽음,읽는중, 읽음) 확인 가능 하며 [수정 가능,
   수정을 누르면 modal이 나타나는 방식으로 진행 (예정)]
2. 기타 기능 및 페이지 작동 문제 없나 확인하는 도중 생각지 못하던 문제들이 발생( 수정 진행중)

- 리뷰를 삭제하면 해당 책 상세 화면 및 관련 화면에서 에러가 발생
- 책의 평균 평점을 가져와야되는데 NaN 값이 발생함...?? (이벤트 핸들러를 수정, e.target 확인 )
- 리부 like 진행시 redux를 통해 갱신된 값을 가져와야 되는데 2번 눌러야 반응이 옴...(front,back단 다 체크해봐야 됨, back단에 데이터를 처리하는데 로직상 문제가 있을 수도 있는 가능성이 있어 체크 필요, front 단은 리랜더링에 관한 문제인가 체크)

### 2020.03.05~03.06

-아...요즘 너무 갑자기 너무 피곤하고 다른거 공부하느라 진행을 못했다... 젠장

1. 전에 완성 못했던 modal을 완성 시켰으며 안에서 책 읽음 여부를 수정 가능힘.
2. community 라우터를 추가 community에는 recent-reviews, top-readers, top-reviewers 가 포함.

- recent-review의 경우 말그대로 최근에 올라온 리뷰틀(시간순서대로)을 보여줌 (책 이미지,리뷰내용, 유저 이름 포함)
- top-reviewer 와 top-readers는 리뷰 랭킹과 책읽은 랭킹을 보여줄것임 (all time, this week , this month 별로 랭킹을 확인 가능)

### 2020.03.07

- community 관련 작업을 진행, 기존의 스타일 틀만 잡아논것들을 backend에서 받아온 정보들을 이용해 정상적으로 보여질수 있게 해줌.
- top-readers 와 top-reviewer의 all time, this week , this month 별로 리스트 보여주는 기능 구현 완료 (front에서 선별작없을 해줄지 그냥 back에서 진행한 뒤 보내줄지 고민하다가 back에서 mongoose를 이용햐 하는게 더 편하고 빠르겠다라고 생각함)
