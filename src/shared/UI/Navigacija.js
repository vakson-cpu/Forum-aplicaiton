import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import './Navbar.css'
export const Navigacija = () => {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <NavLink  to="/" className="nav-logo">
                    Cold War

                </NavLink>

                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <NavLink   to="/" className="nav-links">
                            Pocetna
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink   to="/about" className="nav-links">
                            O Nama
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink   to="/Contact" className="nav-links">
                            Kontaktiraj nas
                        </NavLink>
                    </li>
                </ul>
                <div onClick={handleClick} className="nav-icon">
                    <Hamburger />
                </div>
            </div>
        </nav>
    )
}
export default Navigacija