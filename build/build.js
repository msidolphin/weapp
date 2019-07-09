const gulp = require('gulp')
const gulpLess = require('gulp-less')
const rename = require('gulp-rename')
const cssmin = require('gulp-clean-css');
const clean = require('del')
const NODE_ENV = process.env.NODE_ENV

const isDev = NODE_ENV === 'development'

const entries = {
    less: ['../src/**/*.less', '!../src/**/_*.less'],
    js: ['../src/**/*.js'],
    json: ['../src/**/*.json'],
    wxml: ['../src/**/*.wxml'],
    wxs: ['../src/**/*.wxs'],
    wxss: ['../src/**/*.wxss'],
    image: ['../src/**/*.png', '../src/**/*.jpg', '../src/**/*.gif']
}

const output = !isDev ? '../dist/' : '../examples/dist/'

const processer = {
    compileLess (stream) {
        return stream.pipe(gulpLess())
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(output))
    },
    compileJs (stream) {
        return stream.pipe(gulp.dest(output))
    },
    compileJson (stream) {
        return stream.pipe(gulp.dest(output))
    },
    compileWxml (stream) {
        return stream.pipe(gulp.dest(output))
    },
    compileWxs (stream) {
        return stream.pipe(gulp.dest(output))
    },
    compileWxss (stream) {
        return stream.pipe(gulp.dest(output))
    },
    compileImage (stream) {
        return stream.pipe(gulp.dest(output))
    }
}

let tasks = []

function createTask () {
    Object.keys(entries).forEach(entry => {
        let task = `compile-${entry}`
        gulp.task(task, () => {
            let key = entry.substr(0, 1).toUpperCase().concat(entry.substr(1))
            let method = `compile${key}`
            return processer[method](gulp.src(entries[entry]))
        })
        tasks.push(task)
    })
}

createTask()

gulp.task('clean', () => {
    return clean([output], {force: true})
})

// 全量监听
gulp.task('auto', () => {
    gulp.watch(entries.less, ['compile-less'])
    gulp.watch(entries.js, ['compile-js'])
    gulp.watch(entries.json, ['compile-json'])
    gulp.watch(entries.wxml, ['compile-wxml'])
    gulp.watch(entries.wxs, ['compile-wxs'])
    gulp.watch(entries.wxss, ['compile-wxss'])
    gulp.watch(entries.image, ['compile-image'])
})

if (isDev) tasks.push('auto')

gulp.task('default', tasks)
