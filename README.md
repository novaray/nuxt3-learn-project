# Nuxt3 학습 프로젝트
인프런 강의를 토대로 학습을 진행하는 프로젝트이다.  
README 파일에는 진행하다가 막힌 것을 기록한고, 추가적으로 정리할 것들을 기록한다..
- 강의: https://www.inflearn.com/course/vue-%EB%81%9D%ED%8C%90%EC%99%95-nuxt3-%EC%99%84%EB%B2%BD%EB%A7%88%EC%8A%A4%ED%84%B0  
- IDE: WebStorm

## ESLint / Prettier 설정
애초에 ESLint, Prettier를 세팅을 하지 않다가(WebStorm을 쓰면 굳이 안 해도 프로젝트에서 세팅이 가능하기에), 오랜만에 다시 설정을 해보았다.  
여전히 설정하기가 까다로웠다.

### prettier 설정 관련 막힘.
학습 교안을 보면서, 강의하시느 분은 따로 prettier 설정 파일을 만들어서 진행하지 않고, eslint 설정파일에만 prettier 설정을 넣어서 진행하셨다.  
근데, 내가 했을 땐 Webstorm이라 그런지는 모르겠지만 prettier 설정을 따로 해주지 않으면, prettier가 동작을 하지 않았다.

그래서 `.prettierrc` 파일을 만들어 eslint 설정파일과 똑같이 설정을 해주니 진행되었다.

### eslint - vue/max-attributes-per-line
강의하시는 분은 한 줄에 속성을 여러 개 하시지만(esLint 추천인듯...?), 나는 속성을 한 줄에 하나씩 쓰는 스타일이라서 다음을 참조하여 적용하였다.  
vue2의 경우에는 스타일 가이드상 한 줄에 하나씩을 추천했었기에 습관이 되었다.
- https://eslint.vuejs.org/rules/max-attributes-per-line
- https://ko.vuejs.org/style-guide/rules-strongly-recommended.html#multi-attribute-elements

적용을 해도, prettier는 적용이 안 되기에 오히려 오류가 더욱 더 난잡해지는 경우가 발생.  
다음을 참조하여 prettiert설정의 `singleAttributePerLine`를 `true`로 추가하였다.
- https://github.com/prettier/eslint-plugin-prettier/issues/94#issuecomment-1732005231

## 추가 정리

### auto import 버그?
Nuxt3는 `components/`, `pages/`, `composables` 디렉토리에 있는 파일을 자동으로 import 해주는 기능이 있다.  
그래서 따로 import를 하지 않아도 사용할 수 있다.

그러나, 가끔씩 이 기능이 작동하지 않는 경우가 있다.  
그럴 때는 파일 탭을 다 닫고, 서버를 끈 후 다시 에디터에서 입력하면 import구문 없이 사용이 되는 걸 확인가능하다.  
vscode도 그렇고 WebStorm도 그렇고, 이런 버그가 같이 발생하는 건 신기하다.

### Router Link
프로그래밍 방식으로 이동하나 `RouterLink`로 이동하나 최종적으로 결과는 같다.  
그러나, `RouterLink`를 사용하면 최종적으로 앵커(`<a>`) 태그로 렌더링이 되기 때문에 SEO 최적화에 유리하다.

### RouterView / NuxtPage
`RouterView`는 Vue Router에서 사용하는 컴포넌트이다.  
`RouterView`는 `RouterView` 컴포넌트가 렌더링 될 때 한 번만 렌더링 된다.  
예전에 Vue3 프로젝트를 진행할 때 해당 페이지를 다시 렌더링 해야 한다면, Vue Router에서 제공하는 `replace`를 사용하였다. 

`NuxtPage`는 Nuxt에서 사용하는 컴포넌트이다.  
**기본적으로** `path`가 변경되면 다시 렌더링이 된다.  
이러한 기본 사항을 변경하려면 `pageKey`속성에 정적인값을 넣으면 한 번만 렌더링 된다.  

추가로, **기본적으로** `NuxtPage`는 쿼리스트링의 변경에 대해서는 다시 렌더링이 되지 않는다.  
쿼리스트링에 대해서도 다시 렌더링을 하려면 `pageKey`속성에 동적으로 fullPath를 넣어주면 해결된다.  
단, `NuxtPage`가 `Suspense`로 페이지를 렌더링하는 방법에 문제가 발생할 수 있으므로 여기서 $route 객체를 사용하면 안 된다.  
대안으로는 `definePageMeta`을 사용하면 된다.  
> https://nuxt.com/docs/api/components/nuxt-page#example
> https://nuxt.com/docs/api/utils/define-page-meta

#### 중첩 라우딩
Nuxt3에서는 디렉토리 구조에 따라서 중첩 라우팅을 자동으로 생성해준다.

`<NuxtPage>` 내장컴포넌트는 `@/pages/course.vue` 파일이 있고,    
`baseUrl/course`로 접근한다면 `@/pages/course.vue` 파일이 있으니 해당 파일이 렌더링 된다.

`@/pages/course.vue` 컴포넌트 하위에 `<NuxtPage>` 컴포넌트가 또 정의되어 있다면(중첩되어 있다면),  
상위 컴포넌트(렌더링된 컴포넌트)와 일치하는 이름의 디렉토리(`course`)를 찾고 그 디렉토리 내에 있는 컴포넌트를 찾아서 `<NuxtPage>` 위치에 렌더링한다.  
단, `@/pages/course/index.vue` 파일이 있어야 하며 없으면 렌더링을 하지 않는다.

### RouterLink / NuxtLink
NuxtLink는 RouterLink를 상속받은 컴포넌트이다.  
NuxtLink는 `prefetch`속성을 기본적으로 `true`로 설정되어 있다.  
`prefetch`는 해당 페이지에 대한 데이터를 미리 불러오는 기능이다.  
화면에 보일 때만(viewport 영역에 들어왔을 때만) prefetch를 진행한다.

### NuxtApp
NuxtApp은 Nuxt 애플리케이션에서 사용되는 특별한 객체다.  
NuxtApp을 사용하면 `composables`, `components`, `plugins` 등 여러 부분에서 사용되는 런타입 앱 컨택스트(Runtime App Context)에서 접근할 수 있다.  
런타입 앱 컨택스트 간단하게 설명하면 프로그램이 실행되는 동안의 정보다.

### plugins
Webstorm 2023.3.4 기준으로 `plugins` 디렉토리에 있는 파일을 자동으로 인식하지 못한다.    
import는 되지만 타입 추록이 안 되어 계속 빨갛게 표시되는 현상이 발생한다.  
해당 현상은 `nuxtApp.provide` 및 공식문서에 설명한대로 `types/index.d.ts`을 설정해도 그대로 타입 추론이 안된다.  
- IDE Settings의 Vue 설정을 automatically 및, Volar로 강제로 설정해도 여전히 안 됨.
  - 2024.02.18 기준
- https://nuxt.com/docs/guide/directory-structure/plugins#typing-plugins

### 외부라이브러리 auto-imports 설정
외부 라이브러리는 Nuxt에서 자동으로 import를 해주지 않는다.  
따라서, `nuxt.config.ts` 파일에 `imports`객체를 추가하여 설정해주어야 한다.  
현재는 i18n을 auto-import로 등록해놓았다.

### utils vs composables
`composables` 함수 같은 경우에는 반응형 상태에 대한 비즈니스 로직이고,  
`utils` 함수 같은 경우에는 자주 사용하는 함수들을 모아놓은 것이다. 의미적으로 구분을 해주는 것이 좋다.
