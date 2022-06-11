import { isEqual, omit } from "lodash-es";
import { IAdContentPlugin, TUserInfo } from "./types";

interface UserInfo extends Pick<TUserInfo, "gender" | "ageGroup"> {
    ages: number[];
}

const MaleTeenPlugin: IAdContentPlugin<UserInfo> = {
    name: "maleTeen",
    user: {
        ageGroup: "teenager",
        gender: "male",
        ages: [15, 20],
    },
    is(user) {
        return (
            isEqual(omit(this.user, ["ages"]), omit(user, ["age"])) &&
            this.user.ages[0] <= user.age &&
            this.user.ages[1] > user.age
        );
    },
    content(params) {
        return params ? JSON.stringify(params) : "default ad content";
    },
};
export default MaleTeenPlugin;
