# Nuxt3 학습 프로젝트
인프런 강의를 토대로 학습을 진행하는 프로젝트이다.  
README 파일에는 진행하다가 막힌 것을 기록한고, 추가적으로 정리할 것들을 기록한다..
- 강의: https://www.inflearn.com/course/vue-%EB%81%9D%ED%8C%90%EC%99%95-nuxt3-%EC%99%84%EB%B2%BD%EB%A7%88%EC%8A%A4%ED%84%B0  
- IDE: WebStorm

## ESLint / Prettier 설정
애초에 ESLint, Prettier를 세팅을 하지 않다가(WebStorm을 쓰면 굳이 안 해도 프로젝트에서 세팅이 가능하기에), 오랜만에 다시 설정을 해보았다.  
여전히 설정하기가 까다로웠다.

```shell
npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint-plugin-nuxt @typescript-eslint/eslint-plugin @typescript-eslint/parser @nuxtjs/eslint-config-typescript
```

## quasar Module 설치
1. `nuxt-quasar-ui` 설치

```shell
npm install quasar @quasar/extras
npm install --save-dev nuxt-quasar-ui
```

2. `nuxt.config.js` 설정

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui' // <-- 추가
  ],
  quasar: { /* */ }
})
````

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

### definePageMeta
`definePageMeta`는 Nuxt에서 제공하는 함수로, 페이지의 메타 정보를 정의하는 컴파일러 매크로 함수이다.  
`definePageMeta`는 컴포넌트 내에서 참조할 수 없도록 컴파일된다. 즉, 실제로 컴파일된 코드는 컴포넌트 밖으로 끌어올려진다.  
즉, 컴포넌트(또는 컴포넌트에 정의된 값)를 참조할 수 없다.  
meta에 사용자 정의 키를 등록할 수있지만, 공식 문서에서도 타입을 정의하고 사용하는 걸 권장한다.
- '/types/pageMeta.d.ts'
- https://nuxt.com/docs/guide/directory-structure/pages/#typing-custom-metadata

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

### Universal Rendering
Nuxt3는 Universal Rendering을 지원한다.  
Universal Rendering은 서버 사이드 렌더링 앱의 장점과 싱글 페이지 애플리케이션 앱의 장점을 결합한 형태다.  
- 초기 페이지 로딩 속도 빠름(SSR).
- 검색 엔진 최적화(SEO).
- 첫 번째 요청 이후에는 클라이언트에서 렌더링 함으로써 SPA의 장점인 페이지 이동 시 별도 서버에 요청하지 않고 빠르게 렌더링 할 수 있다.

Nuxt3는 기본적으로 해당 모드를 사용한다.
참고로, Universal Code(범용 코드)는 서버와 클라이언트에서 모두 실행되는 코드를 말한다.

### Hydration
Nuxt3는 클라이언트에서 서버에서 렌더링된 HTML을 가져와서 클라이언트에서 다시 렌더링하는 과정을 `hydration`이라고 한다.  

Vue에서는 서버에서 만든 Vue 애플리케이션을 동일하게 클라이언트에서 다시 렌더링하는 과정이다.  
주목해야할 점은 클란이언트에서 [createSSRApp()](https://v3-docs.vuejs-korea.org/api/application.html#createssrapp)을 사용하여 앱을 생성한다는 것이다.  
그렇게 되면, 클라이언트에서는 HTML이 미리 렌더링이 되어있다고 가정을 하고 새 DOM Node를 마운트하는 대신 Hydrate를 수행하게 된다.

정리하게 되면,  
Vue 애플리케이션(`createSSRApp()`)은 서버에서 실행하는 애플리케이션이고, Hydrate 단계에서는 서버에 생성한 앱을 동일하게 가져와서 생성해야 한다.  
서버와 클라리언트간의 생성한 앱은 같은 것이다.
이게 바로, Universal Code(범용 코드)다.

Hydrate는 서버에서 실행한 것과 동일한 Vue 앱을 만든 후에 이러한 DOM Node의 각 컴포넌트를 일치시키고, DOM 이벤트 핸들러를 장착하는 것이다.  
이렇게 됨으로써 첫 로딩 시에 서버사이드에서 렌더링된 정보를 제공하고, 클라이언트 앱에서는 Hydrate 단계가 일어나게 된다.
  - 서버사이드에서 실행했던 Vue 코드를 동일하게 실행해서 Vue 앱을 만듦.

이렇게 됨으로써, 두 번째 요청부터는 Vue에 의해서 클라이언트로 렌더링이 가능한 것이다.

#### Hydration attribute mismatch
`hydration attribute mismatch`는 서버에서 렌더링된 HTML과 클라이언트에서 렌더링된 HTML이 일치하지 않을 때 발생한다.  
Vue에서 hydration 불일치가 발생하면 클라이언트 측 상태와 일치하도록 사전 렌더링된 DOM을 자동으로 복구하고 조정하려고 한다.  
이로 인해 잘못된 노드가 삭제되고 새 노드가 마운트되어 렌더링 성능이 약가 저하될 수 있지만 대부분의 경우에 앱은 예상대로 잘 동작을 한다.
예상대로 잘 동작이 되더라도, 제거하는 것이 가장 좋다.

제거하는 방법으로는 다양한 방법이 있지만 가장 쉬운 방법으로는, 내장 컴포넌트인 `<ClientOnly>`를 사용하는 것이다.
  - https://nuxt.com/docs/api/components/client-only 

불일치 되는 예는 다음과 같다.  
다음 쿼리를 설정하는 과정에서 타임스탬프를 찍게 되는데, 서버와 클라이언트간의 미스매칭이 일어나는 것이다.
```html
<q-btn
  label="쿼리 추가"
  color="dark"
  unelevated
  :to="{ path: $route.path, query: { timestamp: Date.now() } }"
/>
```

### createError
`createError`는 Nuxt에서 제공하는 함수로, 에러를 생성하는 함수이다.  
서버 사이드에서 오류가 발생하면, 치명적인 에러로 간주하고 전체 화면 오류 페이지를 띄운다.  
클라이언트 사이드에서 오류가 발생하면, 비치명적인 에러로 간주하고 오류 페이지를 띄우지 않는다. 전체 화면 오류 페이지를 띄워야 한다면 `fatal` 속성을 설정한다.

### useError (composable function) / clearError
`useError`는 Nuxt에서 제공하는 함수로, 전역 에러 객체를 반환하는 컴포저블 함수다.  
`clearError`는 모든 에러를 지우고 사용자를 리디렉션 할 수 있다.

### NuxtErrorBoundary
`NuxtErrorBoundary`는 Nuxt에서 제공하는 컴포넌트로, 컴포넌트는 기본 슬롯에서 발생한 클라이언트 측 오류를 처리한다.  
이벤트 및 슬롯 이름은 모두 `error`이다.
> https://nuxt.com/docs/api/components/nuxt-error-boundary

### Middleware
Nuxt3에서는 미들웨어를 사용하여 페이지 렌더링 전에 실행할 코드를 정의할 수 있다.  
사이트가 서버 사이드 렌더링 또는 생성되는 경우, 초기 페이지의 미들웨어는 페이지가 렌더링될 때 실행되고 클라이언트에서 다시 실행된다.  
즉, 서버 사이드에서 한 번 실행되고 클라이언트에서 다시 실행된다.

미들웨어의 실행 순서는 global 미들웨어, 페이지에 정의된 미들웨어 순으로 실행된다.  
페이지에서 정의된 미들웨어가 배열로 선언되어 있다면 인덱스 순으로 실행된다.

> https://nuxt.com/docs/guide/directory-structure/middleware

### composables directory auto-import 전략
`composables` 디렉토리에 중첩으로 되어있으면 중첩으로 되어있는 파일을 자동으로 import를 해주지 않는다.  
Nuxt3 공식 문서에서는 모듈을 다시 export 하거나, `nuxt.config.ts`에 정의하도록 가이드 하고있다.  
난 어떤 모듈을 export할 때 해당 디렉토리에서 `index.ts`파일을 만들어 export하는 걸 좋아하지만 공식 문서에서 추천하기를 다시 export하는 걸 추천한다.  
그래서, `nuxt.config.ts`에 정의하기 보다는 다시 export하는 방식을 사용하고 있다.
- composables/auth
- composables/auth.ts <-- re-export

> https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned

### Nuxt cookie값으로 인한 hydration 불일치
현재 `/server/routes/auth/user.get.ts`파일에서 `user`에 대한 정보를 쿠키값으로부터 가져오고 있다.  
SSR 특성상 서버에서 한 번, 클라이언트에서 한 번 렌더링이 이루어지는데 첫 번째 서버 사이드 렌더링에서는 쿠키값이 없기 때문에 `user`에대한 쿠키 정보가 없다.  
왜냐하면, 쿠키는 브라우저 저장소이기 때문에 첫 번째로 일어나는 서버 사이드 렌더링에서는 쿠키값이 없다.

그렇기에 예로 들면,  
`user`정보가 없기에 `login` 버튼이 렌더링 된다면 클라이언트에서는 `user`정보가 있기에 `logout` 버튼이 렌더링 될 것이다.  
그렇기 때문에 하이드레이션 불일치 문제가 발생한다.

그래서 해결 방법으로는,  
Nuxt3에서는 요청 헤더에 있는 정보를 서버에서도 가져올 수 있도록 `useRequestHeaders` 컴포저블 함수를 제공한다.  
`useRequestHeaders` 함수를 통해서 서버에서도 쿠키를 가져올 수 있게 하여, 하이드레이션 불일치 문제를 해결할 수 있다.
- `/stores/auth.ts/fetchUser`

`<ClientOnly>` 컴포넌트만이 능사는 아니다.

### nuxt.config.ts - runtimeConfig, .env 파일
`nuxt.config.ts`파일에서 `runtimeConfig`를 사용하여 변수의 값을 설정하게 되면 초기값이고,  
환경변수(.env) 파일에서 또 다시 세팅되어 있다면 `runtimeConfig`의 값들을 재정의 하게 된다

### app.config.ts
앱 구성 파일인 `app.config.ts`는 루트 디렉토리에 위치하며, 빌드 시간에 결정될 수 있는 공개 변수를 노출하는 데 사용된다.  
`runtimeConfig` 옵션과는 달리 환경 변수를 사용하여 재정의할 수 없다.

다음의 간략한 가이드가 있다.
- `runtimeConfig`: 빌드 후 환경 변수를 사용하여 지정해야 하는 비공개 또는 공개 토큰.
- `app.config.ts`: 빌드 시간에 결정되는 공개 토큰, 테마 변형, 제목 및 민감하지 않은 프로젝트 구성과 같은 웹 사이트 구성.

### Nuxt-i18n
locale을 유지하면서 페이지를 이동할 때는, `NuxtLink` 컴포넌트 대신 `NuxtLinkLocale` 컴포넌트를 사용하면 된다.  
`useLocalePath` 컴포저블 함수를 사용해서 `to` 속성에 함수 인자값에 경로를 넣어주면 된다.  
Nuxt 진영에서는 vue-i18n보단, 이걸 권장하는 모양이다.
