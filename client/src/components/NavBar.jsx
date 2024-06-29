import React from 'react'
import './NavBar.css'
import { Link, Outlet } from 'react-router-dom'

export const NavBar = () => {
    return (
        <>
            <header>
                <div class="logo">
                    <img src="final-logo.png" alt="ECO MITRA Logo" />
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/services">SERVICES</Link></li>
                        <li><Link to="/login">LOGIN</Link></li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
}
