export type TGender = "male" | "female";
export type TAgeGroup = "teenager" | "youth" | "middleAged" | "older";
export type TActionValue = TGender | TAgeGroup;
export type TUserReducerAction = {
    type: TActionType;
    value: TActionValue;
};
export type TUserInfo = { gender: TGender; ageGroup: TAgeGroup; age: number };
export type TActionType = keyof TUserInfo;
export type TSelectEvent<T> = {
    target: {
        [x: string]: any;
        value: string | ((prevState: T) => T);
    };
};

export interface IAdContentPlugin<T = Partial<TUserInfo>> {
    name: string;
    user: T;
    is: (user: TUserInfo) => boolean;
    content: (params?: unknown) => unknown;
}

export interface IAdPluginCenter {
    plugins: Map<string, IAdContentPlugin>;
    load: (plugins: IAdContentPlugin[] | IAdContentPlugin) => void;
    unload: (name: string) => void;
    find: (user: TUserInfo) => IAdContentPlugin;
}
