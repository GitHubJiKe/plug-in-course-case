import React, { useReducer } from 'react'
import AdPane from './components/AdPane'
import User from './components/User'
import CodePane from './components/CodePane'
import { defaultState, UserContext, userReducer } from './hooks';

import "./App.scss";


export default function App() {
    const [{ user }, dispatch] = useReducer(userReducer, defaultState);

    return <UserContext.Provider value={{ user, dispatch }}>
        <CodePane />
        <User />
        <AdPane />
    </UserContext.Provider>
}