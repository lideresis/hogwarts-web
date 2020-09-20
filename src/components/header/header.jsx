import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Popover } from 'react-tiny-popover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons'

import logo from '/assets/images/logo.png'

import { logout } from '/reducers/auth'
import { toggleMenu } from '/reducers/menu'

function Header (props) {
    const {
        logout,
        user,
        toggleMenu
    } = props

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const history = useHistory()

    const doLogout = () => {
        setIsPopoverOpen(false)
        logout()
    }

    const toggleSidebar = () => {
        toggleMenu()
    }

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen)
    }

    useEffect(() => {
        if (!user) {
            history.replace('/login')
        }
    }, [user])

    const renderPopover = () => {
        return (
            <div className='bg-white border-2 border-gray-600 flex flex-col p-4'>
                <h6 className='font-bold text-lg'>Dumbledore</h6>
                <span className='text-sm mb-4'>dumbledore@hogwarts.school</span>

                <button
                    className='bg-gray-700 hover:bg-gray-800 text-white font-bold p-1 w-24 text-center'
                    onClick={doLogout}
                >
                    Sair
                </button>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className='flex items-center justify-between py-3 border-b-2 border-gray-600'>
            <div className='flex items-center'>
                <div className="mx-16">
                    <img src={logo} className='h-16' alt='Logo da Escola' />
                </div>
                <button onClick={toggleSidebar}>
                    <FontAwesomeIcon className='text-3xl' icon={faBars} />
                </button>
            </div>
            <div className="mx-6">
                <Popover
                    isOpen={isPopoverOpen}
                    content={renderPopover()}
                    onClickOutside={togglePopover}
                    containerClassName='mt-12'
                >
                    <button onClick={togglePopover}>
                        <FontAwesomeIcon className='text-3xl' icon={faCog} />
                    </button>
                </Popover>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({
    user: auth.user
})

const mapDispatchToProps = {
    logout,
    toggleMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)