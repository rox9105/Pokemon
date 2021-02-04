import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

const Header = () => {
    return (
        <div className={s.mainBlock}>
            <NavLink to='/' exact >
                <div className={s.headerName}>POKEMON</div>
            </NavLink>
        </div>
    )
}

export default Header