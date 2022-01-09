require("ts-node").register({
    transpileOnly: true,
    compilerOptions: { module: "CommonJS", esModuleInterop: true },
    project: require("path").join(__dirname, "./tsconfig.json")
});
require("./main.ts");