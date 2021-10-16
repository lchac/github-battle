import React from 'react';
import ThemeContext from '../contexts/theme'
import { NavLink } from 'react-router-dom'
import { INavProps } from '../types/nav';
import { ETheme } from '../types/global';

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Nav({ toggleTheme } : INavProps) {

    const theme = React.useContext(ThemeContext)

    return (
        <nav className='row space-between'>
            <ul className='row nav'>
                <li>
                    <NavLink
                        to='/'
                        exact
                        activeStyle={activeStyle}
                        className='nav-link'>
                        Popular
                            </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/battle'
                        activeStyle={activeStyle}
                        className='nav-link'>
                        Battle
                                </NavLink>
                </li>
            </ul>
            <button
                style={{ fontSize: 30 }}
                className='btn-clear'
                onClick={toggleTheme}>
                {theme === ETheme.light ? '🔦' : '💡'}
            </button>
        </nav>
    )
}