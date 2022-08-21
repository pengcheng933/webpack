module.exports={
    // 继承eslint规则
    extends:["eslint:recommended"],
    env:{
        node:true, // 启用node中全局变量
        browser:true, // 启用浏览器中全局变量
    },
    parser: "babel-eslint",
    parserOptions:{
        // parser: "babel-eslint",
        ecmaVersion: 6, // 使用es6
        sourceType: "module",
    },
    rules:{
        "no-var": 2, // 不使用var定义变量
        'no-undef': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    plugins: ['import'], // 解决动态导入问题
};
