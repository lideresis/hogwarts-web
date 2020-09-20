import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PageTitle ({ title, buttons }) {
    return (
        <div className='border-b-2 border-gray-600 w-full py-2 px-4 flex items-center justify-between'>
            <h3 className='text-xl font-bold'>
                {title}
            </h3>

            {buttons && buttons.map(({ icon, path }) => {
                return (
                    <div key={path} title='Adicionar Bruxo'>
                        <Link to={path} className='text-lg'>
                            <FontAwesomeIcon icon={icon} />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}