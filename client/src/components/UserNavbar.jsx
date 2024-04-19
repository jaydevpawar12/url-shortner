import React from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../redux/api/authApi'
import { useSelector } from 'react-redux'

const UserNavbar = () => {
    const [logout] = useLogoutMutation()
    const { user } = useSelector(state => state.auth)
    return <>
        <nav class="navbar navbar-expand-lg bg-primary mb-5">
            <div class="container">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav d-flex ">
                        <Link to="/user" class="nav-link active" >Home</Link>

                    </div>
                    <div class="dropdown ms-auto">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                            {user && user.name}
                        </button>
                        <ul class="dropdown-menu">
                            <li><Link to="/user" class="dropdown-item" >Profile</Link></li>
                            <li>
                                <button onClick={logout} class="dropdown-item ">
                                <i className='bi bi-box-arrow-right'></i>logOut</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default UserNavbar