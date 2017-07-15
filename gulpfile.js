//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var sass = require('gulp-sass');//将scss文件编译成浏览器可识别的css
var minifycss = require('gulp-minify-css');//压缩css文件，减小文件大小，并给引用url添加版本号避免缓存
var cleancss = require('gulp-clean-css');//压缩css文件，减小文件大小，并给引用url添加版本号避免缓存
var livereload = require('gulp-livereload');//监听文件发生变化时，浏览器自动刷新页面
var babel = require('gulp-babel');//将ES6编译成ES5
var uglify = require('gulp-uglify');//压缩js
var autoprefixer = require('gulp-autoprefixer');//根据设置浏览器版本自动处理浏览器前缀
//定义一个sass任务（自定义任务名称）
gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss') //该任务针对的文件
        .pipe(sass({
            outputStyle: 'compact'  //代码风格
        // nested：嵌套缩进的css代码，它是默认值。
        // expanded：没有缩进的、扩展的css代码。
        // compact：简洁格式的css代码。
        // compressed：压缩后的css代码。
        })) //该任务调用的模块
        .pipe(cleancss({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('./css')) //将会在css文件夹下生成index.css（复制文件目录及文件）
        .pipe(livereload());//监听文件发生变化时，浏览器自动刷新页面
});

//定义一个babel任务（自定义任务名称）编译js
gulp.task('babel', function () {
    gulp.src('./src/**/*.js') //该任务针对的文件
        .pipe(babel({
            presets: ['es2015']
        })) //该任务调用的模块
        .pipe(livereload())//监听文件发生变化时，浏览器自动刷新页面
        .pipe(uglify({ //压缩js
            // mangle: false,//类型：Boolean 默认：true 是否修改变量名
            // compress: true//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('./js')) //将会在css文件夹下生成index.css（复制文件目录及文件）
});


gulp.task('auto', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.js', ['babel']);
    // livereload.listen();
});
 
gulp.task('default',['sass','auto','babel']); //定义默认任务

// 通配符路径匹配示例：
// “src/a.js”：指定具体文件；
// “*”：匹配所有文件    例：src/*.js(包含src下的所有js文件)；
// “**”：匹配0个或多个子文件夹    例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)；
// “{}”：匹配多个属性    例：src/{a,b}.js(包含a.js和b.js文件)  src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；
// “!”：排除文件    例：!src/a.js(不包含src下的a.js文件)；

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径