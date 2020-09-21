import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'

import PageTitle from '../../../components/pageTitle/pageTitle'

export default function WizardList () {
    const [wizards, setWizards] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)

    const fetch = async (pageToFetch = page) => {
        const { data } = await axios.get(`http://127.0.0.1:3333/wizards?page=${pageToFetch}`)

        if (data.error) {
            toast.error(data.error)
        } else {
            setWizards(data.wizards)
            setPages(data.pages)
        }
    }

    const remove = async (id) => {
        await axios.delete(`http://127.0.0.1:3333/wizard?id=${id}`)

        if (wizards.length === 1) {
            setPage(page - 1)
            fetch(page - 1)
        } else {
            fetch(page)
        }
    }

    const changePage = (newPage) => {
        setPage(newPage)
        fetch(newPage)
    }

    useEffect(() => {
        fetch()
    }, [])

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
                        {wizards.map((wizard) => (
                            <tr key={wizard.id}>
                                <td className='border px-4 py-2'>{wizard.nome}</td>
                                <td className='border px-4 py-2'>{wizard.especialidade}</td>
                                <td className='border px-4 py-2'>{wizard.idade} anos</td>
                                <td className='border px-4 py-2'>{wizard.ativo ? 'Ativo' : 'Inativo'}</td>
                                <td className='border px-4 py-2 flex justify-around'>
                                    <Link to={`/wizard/add/${wizard.id}`}>
                                        <FontAwesomeIcon className='text-xl' icon={faPencilAlt} />
                                    </Link>
                                    <button onClick={() => remove(wizard.id)}>
                                        <FontAwesomeIcon className='text-xl' icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='flex justify-between items-center py-2'>
                    <span className='text-sm'>Mostrando {page} de {pages}</span>

                    <div className='text-lg'>
                        {(page > 1) && <React.Fragment>
                            <button className='mx-2' onClick={() => changePage(page - 1)}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            <button className='mx-1' onClick={() => changePage(page - 1)}>
                                {page - 1}
                            </button>,
                        </React.Fragment>}

                        <span className='mx-1 font-bold'>{page}</span>

                        {(page !== pages) && <React.Fragment>
                            ,<button className='mx-1' onClick={() => changePage(page + 1)}>
                                {page + 1}
                            </button>

                            <button className='mx-2' onClick={() => changePage(page + 1)}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </React.Fragment>}
                    </div>
                </div>
            </div>
        </div>
    )
}