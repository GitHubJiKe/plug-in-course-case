const path = require("path")
const fs = require("fs");
const inquirer = require("inquirer");
const PluginLoader = require("./PluginLoader")


class TextCli {
    loader;
    customPlugins;
    constructor() {
        this.loader = new PluginLoader()
        this.customPlugins = []
    }

    register(plugin) {
        if (this.customPlugins.find(v => v.name === plugin.name)) {
            throw new Error("already exist plugin " + plugin.name)
        }
        this.customPlugins.push(plugin)
        return this;
    }

    async #loadPlugins() {
        const pluginNames = await fs.promises.readdir(path.resolve(__dirname, './plugins'))
        pluginNames.forEach(name => this.loader.load(require(path.resolve(__dirname, './plugins', name))))
        this.customPlugins.forEach(p => this.loader.load(p))
    }

    async start() {
        await this.#loadPlugins();
        const result = await this.#prompt()
        require('chalkercli')[result.chalk](this.#callPlugins(result))
    }

    #prompt() {
        return inquirer.prompt([
            {
                type: 'input',
                name: "content",
                message: "请输入文本信息"
            },
            {
                type: 'checkbox',
                name: 'plugins',
                choices: this.loader.pluginNames(),
                message: "请选择格式化操作"
            },
            {
                type: 'list',
                name: 'chalk',
                choices: ['rainbow', 'pulse', 'glitch', 'radar', 'neon', 'karaoke'],
                default: 'rainbox',
                message: '请选择UI类型'
            }
        ])
    }

    #callPlugins({ content, plugins }) {
        return plugins.reduce((a, c) => this.loader.find(c).target.call(a), content)
    }
}

module.exports = TextCli;