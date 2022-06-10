const esbuild = require("esbuild");
const esbuildConfig = require("./esbuildConfig");

esbuild
    .serve(
        {
            port: 9000,
            host: "localhost",
            servedir: "./",
        },
        esbuildConfig,
    )
    .then(() => console.log("http://localhost:9000"));
