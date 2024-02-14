# Nuxt3 학습 프로젝트
인프런 강의를 토대로 학습을 진행하는 프로젝트이다.  
README 파일에는 진행하다가 막힌 것을 기록한다.
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
