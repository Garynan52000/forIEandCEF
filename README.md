# forIEandCEF

一个由 `webpack` 构建的，兼容 IE 和 CEF 内核浏览器的项目模板。

```
# 以前的 tsconf.json

{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "es6",
        "target": "es5",
        "allowJs": true
    },
    "include": [
        "./src/*", "./typings/*"
      ],
    "exclude": [
        "node_modules"
    ]
}
```