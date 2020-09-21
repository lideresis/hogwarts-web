import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import logo from '/assets/images/logo.png'

import { login } from '/reducers/auth'

function Login (props) {
    const {
        login,
        user
    } = props

    const history = useHistory()

    const doLogin = (evt) => {
        evt.preventDefault()
        login()
    }

    useEffect(() => {
        if (user) {
            history.replace('/wizard/list')
        }
    }, [user])

    return (
        <div className='flex-1 flex flex-col items-center justify-center'>
            <img src={logo} className='h-56' alt='Logo da Escola' />

            <span className='font-bold p-4 mb-2'>Hogwarts School</span>

            <form onSubmit={doLogin}>
                <div className='mb-4'>
                    <label className='block font-bold mb-1' htmlFor='login'>Login</label>
                    <input
                        type='text'
                        className='border rounded py-2 px-3 w-64 leading-tight border-gray-500'
                        id='login'
                    />
                </div>

                <div className='mb-6'>
                    <label className='block font-bold mb-1' htmlFor='senha'>Senha</label>
                    <input
                        type='password'
                        className='border rounded py-2 px-3 w-64 leading-tight border-gray-500'
                        id='senha'
                    />
                </div>

                <div className='text-center'>
                    <button
                        type='submit'
                        className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4'
                    >
                        Entrar
                    </button>
                </div>
            </form>
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