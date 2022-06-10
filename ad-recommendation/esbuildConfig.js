const path = require("path")
const sassPlugin = require('esbuild-plugin-sass')
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');
const purgecssPlugin = require("esbuild-plugin-purgecss")
const pkg = require("./package.json")
const fs = require("fs")

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
                title: pkg.name,
                htmlTemplate: fs.readFileSync(path.resolve(__dirname, './index.html'))
            }
        ]
    }), MyHtmlPlugin({ filepath: path.resolve(__dirname, './index.html'), filename: 'index.html' })]
}

function MyHtmlPlugin({ filepath, filename }) {
    return {
        name: 'myhtml',
        setup(build) {
            build.onStart(() => {
                const htmlContent = fs.readFileSync(filepath)
                const distDir = build.initialOptions.outdir
                const _file_path_ = `${build.initialOptions.outdir}/${filename}`;
                try {
                    fs.accessSync(distDir)
                } catch (error) {
                    fs.mkdirSync(build.initialOptions.outdir)
                }
                fs.writeFileSync(_file_path_, htmlContent)
            })
        }
    }
}