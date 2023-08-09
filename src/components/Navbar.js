import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Vitalize</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Log In</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Sign Up</Link>
                                <Link className="btn bg-white text-success mx-1" to="/chatbot">ChatBot</Link>
                                <Link className="btn bg-white text-success mx-1" to="/gymnearme">Gyms Nearby Me</Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
