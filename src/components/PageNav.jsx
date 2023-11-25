import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./PageNav.module.css"
import Logo from "./Logo"

export default function PageNav() {
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
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
            {/* <NavLink to="/blog">Blog</NavLink> */}
        </nav>
    )
}