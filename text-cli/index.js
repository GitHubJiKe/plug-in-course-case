
const path = require("path")
const fs = require("fs");
const inquirer = require("inquirer");



class PluginLoader {
    plugins = []

    load(plugin) {
        if (!this.find(plugin.name).exist) {
            this.plugins.push(plugin)
        }
    }

    find(name) {
        let res = { target: null, index: -1, exist: false };
        for (let index = 0; index < this.plugins.length; index++) {
            const plugin = this.plugins[index];
            if (name === plugin.name) {
                res.exist = true;
                res.index = index;
                res.target = plugin;
                break;
            }
        }

        return res;
    }

    unload(name) {
        const res = this.find(name)
        if (res.exist) {
            this.plugins.splice(res.index, 1)
        }
    }

    pluginNames() {
        return this.plugins.map(v => v.name)
    }
}


class TextCli {
    loader;

    constructor() {
        this.loader = new PluginLoader()
    }

    async loadPlugins() {
        const pluginNames = await fs.promises.readdir(path.resolve(__dirname, './plugins'))
        pluginNames.forEach(name => this.loader.load(require(path.resolve(__dirname, './plugins', name))))
    }

    async start() {
        await this.loadPlugins();
        const result = await this.prompt()
        require('chalkercli')[result.chalk](this.callPlugins(result))
    }

    prompt() {
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

    callPlugins({ content, plugins }) {
        return plugins.reduce((a, c) => this.loader.find(c).target.call(a), content)
    }
}

new TextCli().start()