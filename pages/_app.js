import '@/styles/globals.scss';
import axios from 'axios';

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

/*
  요리명을 검색어로 입력하면 해당 요리의 정보와 레시피를 확인하는 웹 서비스
  - 좋아하는 레시피를 저장해서 즐겨찾기 (localStorage)

  1. 메인페이지 - ISR
    - 특정 카테고리 요리들을 소개하는 intro
  2. 레시피 검색 페이지 - CSR
    - 검색창으로 검색어를 입력하면 debouncing을 적용해서 레시피 목록 결과 확인 페이지  
  3. 레시피 상세 페이지 - CSR
    - 검색화면에서 목록 클릭시 출력되는 상세페이지
    - 즐겨찾기 기능 추가
  4. 즐겨찾기 페이지 - CSR
    - 즐겨찾기 등록 된 목록을 한번에 확인하는 페이지

  페이지 별 렌더링 방식
  CSR : 빈 HTML을 가져온 다음에 동적으로 리액트 컴포넌트가 hydration 되면 클라이언트 단에서 동적으로 데이터 생성해서 렌더링
  CSR(react-query) : stale, cache 타임을 지정해서 stale, cache타임이 소진되기 전까지는 refetching 금지
  SSR : 서버 쪽에서 데이터를 fetching 후 페이지를 미리 만들어서 렌더링 (매번 컴포넌트 접속할 떄 마다)
  SSG : 서버 쪽에서 데이터를 fetching 후 페이지를 미리 만들어서 렌더링 (프로젝트가 빌드 될 때 한번)
  ISR : 서버 쪽에서 데이터를 fetching후 페이지를 미리 만들어서 렌더링 (일정 시간을 직접 설정해서, 설정시간 마다 다시 데이터 refetching 후 빌드)
*/
