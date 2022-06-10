
import React, { useContext } from 'react';
import { UserContext } from 'src/hooks';
import { TActionType, TAge, TGender, TSelectEvent, TActionValue } from 'src/types';

export const genders: TGender[] = ["male", "female"]
export const ages: TAge[] = ["teenager", "youth", "middleAged", "older"]

const selects = [
    {
        label: 'Gender:',
        options: genders,
        field: 'gender',
        className: '',
    },
    {
        label: 'Age Group:',
        options: ages,
        field: 'ageGroup',
        className: 'margin-left-24px'
    }
]

export default function User() {
    const { user, dispatch } = useContext(UserContext)

    const onSelectChange = (e: TSelectEvent<TActionValue>) => {
        dispatch && dispatch({ type: e.target.dataset['field'] as TActionType, value: e.target.value as TActionValue })
    }

    return <div className='border-blue border-radius-8px padding-24px margin-bottom-24px bg-yellow'>
        <h3>User Info</h3>
        <div className='flex'>
            {selects.map(item => {
                return (
                    <div className={item.className} key={item.field}>
                        <label>{item.label}</label>
                        <select
                            className='inline-block margin-left-12px'
                            value={user[item.field as TActionType]}
                            onChange={onSelectChange}
                            data-field={item.field}
                        >
                            {item.options.map(v => <option value={v} key={v}>{v}</option>)}
                        </select>
                    </div>
                )
            })}
        </div>
    </div>
}