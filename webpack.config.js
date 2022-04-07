//import 
const path = require('path') //따로 설치 하지 않고 node에서 사용가능한 전역 모듈
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// export
module.exports = {
  resolve: {
    extensions:['.js','.vue'],
    //경로 별칭
    alias: { 
      '~':path.resolve(__dirname,'src'),
      'assets':path.resolve(__dirname,'src/assets')
    }
  },
  // 파일을 읽어들이기 시작하는 진입점 설정
  // parcel index.html
  // webpack은 자바스크립트 파일을 진입점으로 설정
  entry :'./src/main.js', 

  // 결과물(번들)을 반환하는 설정
  output: {
    // ** nodejs에서 필요로 하는 절대 경로로 작성!
    //__dirname : nodejs에서 전역으로 사용가능한 변수 
    //            현재 파일이 있는 경로를 지칭함 (webpack.config.js가 있는 경로)
    // path:path.resolve(__dirname,'dist'), 
    // filename:'main.js',
    clean:true // 기존에 만들었던 요소를 제거
  },
  module: {
    rules:[
      {
        test:/\.vue$/,
        use: 'vue-loader'
      },
      {
        test:/\.s?css$/, // \.css$ = 앞에 문자와 일치 // \.s?css$ = s가 있을수도 없을수도 있음
        use:[ //순서 명확하게 작성
          'vue-style-loader', // 순서 5 vue확장자 안에서 css를 해석해서 동작하게 해주는 패키지
          // 'style-loader', // 순서 4.해석된 내용을 html에 삽입해주는 역할 
          'css-loader', // 순서 3.자바스크립트에서 css를 해석하기 위한 패키지
          'postcss-loader', //순서 2
          'sass-loader' // 순서 1. sass loader
        ]
      },
      {
        test:/\.js$/,
        use:[
          'babel-loader' //webpack이 해석하기 위한 패키지
        ]
      },
      {
        test:/\.(png|jpe?g|gif|webp)$/, //png혹은jpg|jpeg|gif|webp 매칭해서 file-loader를 사용
        use:'file-loader'
      }
    ]
  },
  plugins : [
    new HtmlPlugin({
      template :'./index.html' //root 경로에 있는 index.html
    }),
    new CopyPlugin({
      patterns:[
        {from:'static'}
      ]
    }),
    new VueLoaderPlugin()
  ],
  devServer : {
    host:'localhost'
  }
}