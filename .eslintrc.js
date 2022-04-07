module.exports = {
  env: {
    browser:true, //코드를 브라우저와 노드에서 모두 검사 할건지 여부
    node:true
  },
  extends : [ // 코드 검사를 할 기본적인 규칙 작성
    //vue
    // 'plugin:vue/vue3-essential', // Lv1
    'plugin:vue/vue3-strongly-recommended', // Lv2
    // 'plugin:vue/vue3-recommended', // Lv3 가장 엄격한 코드 검사
    //js
    'eslint:recommended'

  ],
  parserOptions :{ // 코드를 분석할 수 있는 분석기를 지정
    parser : 'babel-eslint'
  },
  rules: {
  }
}