import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Header from '../components/header/header'
import Sidebar from '../components/sidebar/sidebar'

import Routes from './routes'
import store from './store'

export default function App () {
    return (
        <Provider store={store}>
            <Router>
                <div className='flex flex-col flex-1'>
                    <Header />
                    <div className='flex flex-1'>
                        <Sidebar />
                        <Routes />
                    </div>
                </div>

                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Router>
        </Provider>
    )
}
