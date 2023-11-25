import React from 'react'
import styles from "./Sidebar.module.css"
import Logo from './Logo'
import PageNav from './PageNav'
import "../index.css"
import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>  {/* This is the tabbed element cities - countries */}
        <Outlet/>  {/* This is like children props */}
        <footer className={styles.footer}>
            <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} WorldWise Inc.</p>
        </footer>
    </div>
  ) 
}
