import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../../components/pageTitle/pageTitle'

export default function WizardAdd () {
    return (
        <div className='flex-1 flex flex-col'>
            <PageTitle title='Meus Bruxos - Formulário' />

            <form className='p-4'>
                <div className='mb-4 border-2 border-gray-600 p-4'>
                    <div className='mb-4'>
                        <label className='block font-bold mb-1' htmlFor='nome'>Nome Completo</label>
                        <input
                            type='text'
                            className='border rounded py-2 px-3 leading-tight w-2/4 border-gray-500'
                            id='nome'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block font-bold mb-1' htmlFor='idade'>Idade</label>
                        <input
                            type='number'
                            className='border rounded py-2 px-3 leading-tight w-2/4 border-gray-500'
                            id='idade'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block font-bold mb-1' htmlFor='especialidade'>Especialidade</label>
                        <input
                            type='text'
                            className='border rounded py-2 px-3 leading-tight w-2/4 border-gray-500'
                            id='especialidade'
                        />
                    </div>

                    <label className='block font-bold'>
                        <input className='mr-2 leading-tight' type='checkbox' />
                        <span>Ativo</span>
                    </label>
                </div>

                <div className='flex'>
                    <button className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mr-2'>
                        Salvar
                    </button>
                    <Link
                        to='/wizard/list'
                        className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mr-2'
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    )
}