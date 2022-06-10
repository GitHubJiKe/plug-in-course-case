import { createContext } from "react"
import { TUserInfo, TUserReducerAction } from "./types";

export type TContext = { user: TUserInfo, dispatch?: (action: TUserReducerAction) => void; }
export const defaultState: TContext = { user: { ageGroup: 'youth', gender: 'male' } }
export const UserContext = createContext<TContext>(defaultState)

export function userReducer(state: TContext, action: TUserReducerAction) {
    const user = { ...state.user, [action.type]: action.value }
    return { ...state, user }
}