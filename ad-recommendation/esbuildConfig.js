const path = require("path")
const sassPlugin = require('esbuild-plugin-sass')
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');
const purgecssPlugin = require("esbuild-plugin-purgecss")

module.exports = {
    entryPoints: [path.resolve(__dirname, "./src/index.tsx")],
    outdir: path.resolve(__dirname, "./dist"),
    platform: "browser",
    target: ["es2020", "chrome58"],
    loader: { '.js': 'tsx' },
    bundle: true,
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    metafile: true,
    plugins: [sassPlugin(), purgecssPlugin(), htmlPlugin({
        files: [
            {
                entryPoints: [path.resolve(__dirname, "./src/index.tsx")],
                filename: "index.html",
                title: "esbuild react demo",
                htmlTemplate: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/index.css">
                </head>
                <body>
                    <div id="root">
                    </div>
                    <script src="/index.js"></script>
                </body>
                </html>`
            }
        ]
    })]
}