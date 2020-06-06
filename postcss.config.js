const pkg = require('./package.json')
module.exports = {
    parser: require('postcss-comment'),
    plugins: [
        require('postcss-import'),
        require('autoprefixer')(),
        require('@dcloudio/vue-cli-plugin-uni/packages/postcss'),
    ],
}
