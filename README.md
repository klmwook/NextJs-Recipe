# Next.Js로 Atomic Design pattern 기법을 사용하여 만든 Recipe 홈페이지

### 작업내용 소개

- www.themealdb.com 의 레시피 데이터를 React Query를 사용하여 검색 및 즐겨찾기를 하여 볼 수 있게 만든 페이지 입니다.
- Next.Js 기반으로 만들어져 있습니다.
- Atomic Design pattern 기법으로 컴포넌트를 나눠서 재사용이 가능하게 만들어져 있습니다.

<br>

### 페이지 구성

- 메인페이지
- 서브페이지
  > Find Recipe (레시피 검색)
  > My Favorite (레시피 즐겨찾기)

<br>

## Atomic Design pattern

#### Atoms (원자)

    - 버튼, 메뉴, 제목, 글자, 폼요소, 썸네일

#### Molecules (분자)

    - 검색바 (폼,버튼), 메뉴(버튼)

#### Organisms (유기체)

    - GNB (메뉴를 그룹화)

#### Templates (템플릿)

    - 유기체들이 모여있는 기능 덩어리

#### Pages (페이지)

    - 템플릿들로 구성되어 있는 하나에 페이지
