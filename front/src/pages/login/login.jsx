import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-toastify'

import logo from '/assets/images/logo.png'

import { login } from '/reducers/auth'

function Login (props) {
    const {
        login,
        user
    } = props

    const history = useHistory()

    const doLogin = async (values, { setSubmitting }) => {
        const { data } = await axios.post('http://127.0.0.1:3333/login', values)

        if (data.error) {
            toast.error(data.error)
        } else {
            localStorage.setItem('user', JSON.stringify(data))
            login(data)
        }

        setSubmitting(false)
    }

    useEffect(() => {
        if (user) {
            history.replace('/wizard/list')
        }
    }, [user])

    useEffect(() => {
        const userJson = localStorage.getItem('user')

        if (userJson) {
            login(JSON.parse(userJson))
        }
    }, [])

    return (
        <div className='flex-1 flex flex-col items-center justify-center'>
            <img src={logo} className='h-56' alt='Logo da Escola' />

            <span className='font-bold p-4 mb-2'>Hogwarts School</span>

            <Formik
                initialValues={{ email: '', senha: '' }}
                onSubmit={doLogin}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" >
                            {({ field }) => (
                                <div className='mb-4'>
                                    <label className='block font-bold mb-1' htmlFor='login'>Login</label>
                                    <input
                                        type='text'
                                        className='border rounded py-2 px-3 w-64 leading-tight border-gray-500'
                                        id='login'
                                        {...field}
                                    />
                                </div>
                            )}
                        </Field>

                        <Field type="password" name="senha">
                            {({ field }) => (
                                <div className='mb-6'>
                                    <label className='block font-bold mb-1' htmlFor='senha'>Senha</label>
                                    <input
                                        type='password'
                                        className='border rounded py-2 px-3 w-64 leading-tight border-gray-500'
                                        id='senha'
                                        {...field}
                                    />
                                </div>
                            )}
                        </Field>

                        <div className='text-center'>
                            <button
                                type='submit'
                                className={`bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 ${isSubmitting ? 'opacity-50' : ''}`}
                                disabled={isSubmitting}
                            >
                                Entrar
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({
    user: auth.user
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)