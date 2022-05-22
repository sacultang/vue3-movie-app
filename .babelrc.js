module.exports = {
  presets :['@babel/preset-env'], // 명시해야되는 자바스크립트 기능을 지원해주는 패키지
  plugins: [
    ['@babel/plugin-transform-runtime'] // 비동기 처리를 위한 패키지
  ]
}