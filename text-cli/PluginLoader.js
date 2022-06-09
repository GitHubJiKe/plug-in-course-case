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

module.exports = PluginLoader;