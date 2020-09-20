import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MenuButton from '../menuButton/menuButton'

function Sidebar (props) {
    const {
        user,
        isOpen
    } = props

    if (!user || !isOpen) return null

    return (
        <nav className='w-48 border-r-2 border-gray-600'>
            <ul>
                <MenuButton text='Meus Bruxos' path='/wizard/list' />
                <MenuButton text='Usuários' />
            </ul>
        </nav>
    )
}

const mapStateToProps = ({ auth, menu }) => ({
    user: auth.user,
    isOpen: menu.isOpen
})

export default connect(mapStateToProps, null)(Sidebar)
