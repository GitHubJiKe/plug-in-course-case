import { isEqual } from "lodash-es";
import { IAdContentPlugin, IAdPluginCenter } from "./types";

export const male少年Plugin: IAdContentPlugin = {
    name: 'male少年',
    user: {
        ageGroup: 'teenager',
        gender: 'male'
    },
    is(user) {
        return user.ageGroup === this.user.ageGroup && user.gender === this.user.gender;
    },
    content(params) {
        return params ? JSON.stringify(params) : 'default ad content'
    }
}

export const plugins = [male少年Plugin]


export const adPluginCenter: IAdPluginCenter = {
    plugins: new Map(),
    load(plugin) {
        const register = (p: IAdContentPlugin) => this.plugins.set(p.name, p)
        if (Array.isArray(plugin)) {
            plugin.forEach(p => register(p))
        } else {
            register(plugin)
        }
    },
    unload(name) {
        if (this.plugins.get(name)) {
            this.plugins.delete(name)
        }
    },
    find(userOrName) {
        if (typeof userOrName === 'string') {
            return this.plugins.get(userOrName)
        }

        for (const [_, p] of this.plugins) {
            if (isEqual(p.user, userOrName)) {
                return p;
            }
        }
    },
}