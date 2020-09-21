import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-toastify'

import PageTitle from '../../../components/pageTitle/pageTitle'

export default function WizardAdd () {
    const [initialValues, setInitialValues] = useState({
        nome: '',
        idade: 0,
        especialidade: '',
        ativo: false
    })

    const { id } = useParams()
    const history = useHistory()

    const fetch = async () => {
        const { data } = await axios.get(`http://127.0.0.1:3333/wizard?id=${id}`)

        if (!data) {
            history.replace('/wizard/list')
        } else {
            setInitialValues({
                ...data,
                ativo: !!data.ativo
            })
        }
    }

    const submit = async (values, { setSubmitting }) => {
        const { data } = await axios.put('http://127.0.0.1:3333/wizard', values)

        if (data.error) {
            toast.error(data.error)
            setSubmitting(false)
        } else {
            toast.success('Aluno salvo')
            history.push('/wizard/list')
        }
    }

    useEffect(() => {
        if (id) {
            fetch()
        }
    }, [])

    return (
        <div className='flex-1 flex flex-col'>
            <PageTitle title='Meus Bruxos - Formulário' />

            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                enableReinitialize
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className='p-4'>
                        <div className='mb-4 border-2 border-gray-600 p-4'>
                            <Field type="text" name="nome" >
                                {({ field }) => (
                                    <div className='mb-4'>
                                        <label className='block font-bold mb-1' htmlFor='nome'>Nome Completo</label>
                                        <input
                                            type='text'
                                            className='border rounded py-2 px-3 leading-tight w-2/4 border-gray-500'
                                            id='nome'
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field type="number" name="idade" >
                                {({ field }) => (
                                    <div className='mb-4'>
                                        <label className='block font-bold mb-1' htmlFor='idade'>Idade</label>
                                        <input
                                            type='number'
                                            className='border rounded py-2 px-3 leading-tight w-2/4 border-gray-500'
                                            id='idade'
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field type="text" name="especialidade" >
                                {({ field }) => (
                                    <div className='mb-4'>
                                        <label className='block font-bold mb-1' htmlFor='especialidade'>Especialidade</label>
                                        <input
                                            type='text'
                                            className='border rounded py-2 px-3 leading-tight w-2/4 border-gray-500'
                                            id='especialidade'
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="ativo">
                                {({ field }) => (
                                    <label className='block font-bold'>
                                        <input
                                            type='checkbox'
                                            className='mr-2 leading-tight'
                                            checked={field.value}
                                            onChange={() => setFieldValue('ativo', !field.value)}
                                        />
                                        <span>Ativo</span>
                                    </label>
                                )}
                            </Field>
                        </div>

                        <div className='flex'>
                            <button
                                type='submit'
                                className={`bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mr-2 ${isSubmitting ? 'opacity-50' : ''}`}
                                disabled={isSubmitting}
                            >
                                Salvar
                            </button>
                            <Link
                                to='/wizard/list'
                                className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mr-2'
                            >
                                Cancelar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}