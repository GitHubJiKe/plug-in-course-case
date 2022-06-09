
import React, { useState } from 'react';
import './User.scss';

const genders = ["male", "female"]

export default function User() {
    const [gender, setGender] = useState('male')
    const onGenderChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setGender(e.target.value)
    }
    return <div className='user'>
        <h3>用户信息</h3>
        <select value={gender} onChange={onGenderChange}>
            {genders.map(v => <option value={v} key={v}>{v}</option>)}
        </select>
    </div>
}