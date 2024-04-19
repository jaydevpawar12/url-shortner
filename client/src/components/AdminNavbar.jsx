import React from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../redux/api/authApi'

const AdminNavbar = () => {
    const [logout] = useLogoutMutation()
    return <>
        <nav class="navbar navbar-expand-lg bg-danger mb-5 navbar-dark ">
            <div class="container">
                <Link class="navbar-brand" href="#">Admin</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link class="nav-link active" href="#">Home</Link>

                        <div class="dropdown ms-auto">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                                Admin
                            </button>
                            <ul class="dropdown-menu">
                                <li><Link to="/admin" class="dropdown-item">Profile</Link></li>
                                <li>
                                    <button onClick={e => logout()} class="dropdown-item">
                                        <i className='bi bi-box-arrow-right'></i>
                                        Logout
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default AdminNavbar