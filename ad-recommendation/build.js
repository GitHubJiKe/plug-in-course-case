const esbuild = require("esbuild")
const esbuildConfig = require("./esbuildConfig")


esbuild.build(esbuildConfig).then(res => console.log(res)).catch(err => console.error(err))