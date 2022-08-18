module.exports={
    // 继承eslint规则
    extends:["eslint:recommended"],
    env:{
        node:true, // 启用node中全局变量
        browser:true, // 启用浏览器中全局变量
    },
    parserOptions:{
        ecmaVersion: 6, // 使用es6
        sourceType: "module",
    },
    rules:{
        "no-var": 2, // 不使用var定义变量
    },
}