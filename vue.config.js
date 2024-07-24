const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
    port:8080,
    proxy:{
      '/api':{
        target:'http://120.55.67.212:8888',
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  lintOnSave:false
})
module.exports = {
  publicPath: '/slogmanage'
}

