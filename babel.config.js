module.exports={
    // 预设
    /**
     * @babel/preset-env
     * @babel/preset-react
     * @babel/preset-typescript
     */
    presets:[
        [
            '@babel/preset-env',
            {
                useBuiltIns: "usage",
                corejs: 3,
            }
        ]
    ],
}
