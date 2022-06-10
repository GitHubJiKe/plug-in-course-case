export type TGender = 'male' | 'female';
export type TAge = "teenager" | "youth" | "middleAged" | "older";
export type TActionValue = TGender | TAge;
export type TUserReducerAction = {
    type: TActionType;
    value: TActionValue;
}
export type TUserInfo = { gender: TGender; ageGroup: TAge; }
export type TActionType = keyof TUserInfo;
export type TSelectEvent<T> = {
    target: {
        [x: string]: any; value: string | ((prevState: T) => T);
    }
};


export interface IAdContentPlugin {
    name: string;
    user: TUserInfo;
    is: (user: TUserInfo) => boolean;
    content: (params?: unknown) => unknown;
}

export interface IAdPluginCenter {
    plugins: Map<string, IAdContentPlugin>;
    load: (plugins: IAdContentPlugin[] | IAdContentPlugin) => void;
    unload: (name: string) => void;
    find: (userOrName: string | TUserInfo) => IAdContentPlugin | undefined;
}