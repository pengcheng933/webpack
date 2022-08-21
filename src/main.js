import sum from './js/sum';
import {ride} from './js/math';
import './css/index.css';
import './less/index.less';
import './css/iconfont.css';
// import 'core-js';
import 'core-js/actual/promise';

console.log(sum(1,3));
console.log(ride(1,3));
new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, 400)
}).then(r => {
    console.log(r)}
);
document.getElementById('btn').onclick=function (){
    console.log(11111);
    // eslint不能识别动态导入，需要额外配置
    // /*webpackChunkName:"math"*/ webpack默认语法
    import(/*webpackChunkName:"math"*/'./js/count.js').then(({count})=>{
        console.log(count([1,2,3]))
    })
}

// 判断浏览器是否支持热模块更新
if(module.hot){
    module.hot.accept('./js/sum')
    module.hot.accept('./js/count',function (count){
        console.log(count);
    })
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
