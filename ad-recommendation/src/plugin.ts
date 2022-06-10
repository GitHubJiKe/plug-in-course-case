import { isEqual } from "lodash-es";
import DefaultPlugin from "./DefaultPlugin";
import MaleTeenPlugin from "./MaleTeenPlugin";
import { IAdContentPlugin, IAdPluginCenter } from "./types";

export const plugins = [MaleTeenPlugin];

export const adPluginCenter: IAdPluginCenter = {
    plugins: new Map(),
    load(plugin) {
        const register = (p: IAdContentPlugin) => this.plugins.set(p.name, p);
        if (Array.isArray(plugin)) {
            plugin.forEach((p) => register(p));
        } else {
            register(plugin);
        }
    },
    unload(name) {
        if (this.plugins.get(name)) {
            this.plugins.delete(name);
        }
    },
    find(user) {
        // @ts-ignore
        for (const [_, p] of this.plugins) {
            if (p.is(user)) {
                return p;
            }
        }

        return DefaultPlugin;
    },
};
