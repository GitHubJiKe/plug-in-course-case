const esbuild = require("esbuild")
const esbuildConfig = require("./esbuildConfig")


esbuild.build(esbuildConfig).then(() => console.log("build deno")).catch(err => console.error(err))