import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'

import PageTitle from '../../../components/pageTitle/pageTitle'

export default function WizardList () {
    return (
        <div className='flex-1 flex flex-col'>
            <PageTitle
                title='Meus Bruxos - Listagem'
                buttons={[
                    { icon: faPlus, path: '/wizard/add' }
                ]}
            />

            <div className='p-4 flex-1'>
                <table className='table-auto w-full'>
                    <thead className='text-left bg-gray-400'>
                        <tr>
                            <th className='border px-4 py-2'>Bruxo</th>
                            <th className='border px-4 py-2'>Especialidade</th>
                            <th className='border px-4 py-2'>Idade</th>
                            <th className='border px-4 py-2'>Status</th>
                            <th className='border px-4 py-2'>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border px-4 py-2'>Harry Potter</td>
                            <td className='border px-4 py-2'>Voar</td>
                            <td className='border px-4 py-2'>150 anos</td>
                            <td className='border px-4 py-2'>Ativo</td>
                            <td className='border px-4 py-2 flex justify-around'>
                                <button>
                                    <FontAwesomeIcon className='text-xl' icon={faPencilAlt} />
                                </button>
                                <button>
                                    <FontAwesomeIcon className='text-xl' icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                        <tr className='bg-gray-100'>
                            <td className='border px-4 py-2'>Hermione Jean Granger</td>
                            <td className='border px-4 py-2'>Correr</td>
                            <td className='border px-4 py-2'>130 anos</td>
                            <td className='border px-4 py-2'>Ativo</td>
                            <td className='border px-4 py-2 flex justify-around'>
                                <button>
                                    <FontAwesomeIcon className='text-xl' icon={faPencilAlt} />
                                </button>
                                <button>
                                    <FontAwesomeIcon className='text-xl' icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='flex justify-between items-center py-2'>
                    <span className='text-sm'>Mostrando 5 de 5</span>

                    <div className='text-lg'>
                        <button className='mx-2'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className='mx-1 font-bold'>1</button>,
                        <button className='mx-1'>2</button>,
                        <button className='mx-1'>3</button>
                        <button className='mx-2'>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}