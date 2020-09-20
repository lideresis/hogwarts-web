import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuButton ({ text, path }) {
    let cls = 'block my-4 mx-auto p-2 bg-gray-700 w-40 text-center font-bold text-white '
    cls += (!path ? 'opacity-50 cursor-default' : 'hover:bg-gray-800')

    return (
        <li className='text-center'>
            {path
                ? <Link to={path} className={cls}>{text}</Link>
                : <div className={cls}>{text}</div>}
        </li>
    )
}