import { isEqual } from "lodash-es";
import { IAdContentPlugin } from "./types";

const MaleTeenPlugin: IAdContentPlugin = {
    name: "maleTeen",
    user: {
        ageGroup: "teenager",
        gender: "male",
    },
    is(user) {
        return isEqual(this.user, user);
    },
    content(params) {
        return params ? JSON.stringify(params) : "default ad content";
    },
};
export default MaleTeenPlugin;
