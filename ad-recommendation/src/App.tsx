import React from 'react'
import AdPane from './components/AdPane'
import User from './components/User'

import "./App.scss";

export default function App() {
    return <>
        <User />
        <AdPane content='这是一个广告哦' />
    </>
}