# 🐇 **HabitRabbit ✨**

---

해빗래빗은 습관을 일정으로 등록해 관리할 수 있는 서비스 입니다 !

![Untitled](https://user-images.githubusercontent.com/107829027/193562073-7e91c8c2-8764-4825-b58a-fced97341725.png)

## 🐇 [HabitRabbit 서비스 방문해보기 →](https://www.habit-rabbit.shop/)

---

# 🐇 프로젝트 소개

해빗래빗은 나의 관심사를 기반으로 나에게 필요한 습관을 추천해줍니다.

습관을 구매하고 일정으로 등록해보세요 !

등록한 일정대로 해야 할 일을 완수하면 쏟아지는 포인트 !

기간 내 매일 일정을 달성하여 추가 포인트도 받아가세요~

모인 포인트로 나의 펫을 성장시키세요 🐰!

# 🛠️ 서비스 아키텍처

![architecture](https://user-images.githubusercontent.com/107829027/193562089-b28f840c-f966-4585-a103-32ea6a104614.png)

# ****💻**** FE 기술 스택

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=ffffff"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=flat-square&logo=JSON Web Tokens&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=ffffff"/>

### 🔧 기술적 의사결정

**Axios**
wide browser 지원, XSRF Protection 보안, 자동 JSON 데이터 변환 지원과 Intercept 가능

**Redux Toolkit**
로그인 상태 및 데이터 전역관리 필요. 단순한 Boilerplate와 redux-thunk 사용을 위해 선택.

**styled-components**
조건부 스타일링과 CSS 모듈화를 위해 선택.

## 🐇 주요 기능

✅ 형성하고자 하는 습관을 구매

![buyPoint2](https://user-images.githubusercontent.com/107829027/193560954-e6471d01-4340-4f40-a640-b276edfed35c.png)   

<br/>

✅ 구매한 습관을 캘린더에 일정으로 등록

![mainDaily](https://user-images.githubusercontent.com/107829027/193561016-6b41ca0a-bca1-4205-8e3f-a2034eb1d0cc.png)

<br/>

✅ 등록한 일정대로 완수하면 포인트 지급

![point](https://user-images.githubusercontent.com/107829027/193561122-d5d8e1d7-3929-4b25-bf6c-54722986a2f9.png)

<br/>

✅ 지급받은 포인트로 다른 습관들 구매

![buy](https://user-images.githubusercontent.com/107829027/193561160-7aa8a2cf-c8b3-4660-96a2-1f7856ac209b.png)

<br/>

✅ 모인 포인트로 나의 펫 성장 시키기

![pet](https://user-images.githubusercontent.com/107829027/193561850-51040a5c-6d26-454c-aef7-9261deb816de.png)

---

# 📌트러블 슈팅

- 전역상태관리 적용
    | 문제 상황 | 마운트 할 때 useEffect로 불러오는 데이터를 map함수로 처리하는데 error 가 발생했습니다. |
    | --- | --- |
    | 발생 이유 | 비동기 호출에서 데이터 흐름에 의한 에러인 것으로 예상 |
    | 해결 방안 | 1. 데이터가 호출될 때까지 로딩화면 적용 2. redux-thunk와 옵셔널 체이닝 이용 |
    | 의견 결정 | mvp 이후에 프로젝트 확장 가능성과 전역상태관리의 필요성을 고려하여 redux-toolkit을 도입하는 계기가 되었습니다. |
    
- UX 개선
    | 문제 상황 | pet 페이지 마운트 시 깜빡임 현상  |
    | --- | --- |
    | 발생 이유 | 게이미피케이션으로 인해 이미지파일(gif)이 큰 용량을 차지하고 있고, 이로 인해 랜더링 속도가 저한된 것으로 예상 |
    | 해결 방안 | 1. 이미지 리사이징 2. 로딩화면 추가 |
    | 의견 결정 | 뷰포트가 작은 화면에서도 gif 파일이 거의 동일한 크기를 가지고 있으며 여전히 깜빡임을 완전히 해결할 수 없다고 판단하여 로딩 화면을 적용하였습니다. |

---

# 👥 팀원
| 이름 | 분담 | 기술 블로그 |
| --- | --- | --- |
| 김현지 | 메인-데일리 페이지, 먼슬리 페이지, 습관 추가 페이지, 수정/삭제 페이지 | https://puringles.tistory.com |
| 이지수 | 로그인·회원가입 페이지, 온보딩페이지, 관심사선택페이지, 구매페이지, 마이페이지, 펫페이지 | https://velog.io/@jisu2281l |
