import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./PageNav.module.css"
import Logo from "./Logo"
import { useAuth } from '../contexts/AuthContext'
import User from './User'

export default function PageNav() {
    const { isAuthenticated } = useAuth();

    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                <li>
                    <NavLink to="/Pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    {!isAuthenticated ? <NavLink to="/login">Login</NavLink> : <User/>}
                </li>
            </ul>
            {/* <NavLink to="/blog">Blog</NavLink> */}
        </nav>
    )
}
