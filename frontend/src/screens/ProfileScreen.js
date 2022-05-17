import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Row, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBlog, faSignIn, faSearch } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../actions/userActions'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        } else {
            if (!user) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(detailsUser(userInfo._id))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, userInfo._id, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        toast.dismiss()
        if (password !== confirmPassword) {
            toast.error('Password and confirm password are not match')
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
        }
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div id="bg-profile">
            <Toaster />
            <Meta title={'Profile Update'} />
            <Navbar className="overflow-visible border-0 rounded-0" collapseOnSelect expand="md">
                <Navbar.Brand href="/" id="nav-brand" className="ms-3 text-white fs-5 ps-2 border-0 d-md-none">{`<Amir`}<span className="text-warning" id="brand-home">PJV</span>{`/>`}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-5 border border-1 border-warning" id="custom-toggler" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Container fluid className="d-flex flex-column">
                        <Nav className="d-flex flex-row justify-content-between my-auto">
                            <Navbar.Brand href="/" id="nav-brand" className="ms-3 text-white fs-5 ps-2 border-0 d-none d-md-block">{`<Amir`}<span className="text-warning" id="brand-home">PJV</span>{`/>`}</Navbar.Brand>
                            <Container fluid className="my-auto d-md-flex justify-content-md-end d-flex justify-content-between align-items-center">
                                <NavLink
                                    to={'/'}
                                    className={({ isActive }) =>
                                        isActive ? 'text-warning mx-sm-5 text-decoration-none border-0 py-1' : 'mx-sm-5 text-decoration-none border-0 py-1 hover-underline-animation'
                                    }
                                >
                                    <FontAwesomeIcon icon={faUser} className="fs-4 me-1" />
                    Home
                  </NavLink>
                                <NavLink
                                    to={'/blogs'}
                                    className={({ isActive }) =>
                                        isActive ? 'text-warning mx-sm-5 text-decoration-none border-0 py-1' : 'mx-sm-5 text-decoration-none border-0 py-1 hover-underline-animation'
                                    }
                                >
                                    <FontAwesomeIcon icon={faBlog} className="fs-4 me-1" />
                    Blog
                  </NavLink>
                                {userInfo && userInfo.isAdmin ?
                                    <NavDropdown
                                        role="menuitem"
                                        align="end"
                                        title="Admin"
                                        drop={"down"}
                                        autoClose="outside"
                                        id='adminmenu'
                                        className="my-0 py-0 mx-sm-5 text-decoration-none text-white hover-underline-animation"
                                    >
                                        <NavDropdown.Item as={NavLink} to='/admin/bloglist'>
                                            Add Blog
                                    </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to='/admin/userlist'>
                                            Users
                                    </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                            </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    userInfo ?
                                        <NavDropdown
                                            role="menuitem"
                                            align="end"
                                            // align={{ sm: 'end' }}
                                            title={userInfo.name}
                                            drop={"down"}
                                            autoClose="outside"
                                            id='usermenu'
                                            className="my-0 py-0 mx-sm-5 text-decoration-none text-white py-1 hover-underline-animation"
                                        >
                                            <NavDropdown.Item as={NavLink} to='/profile'>
                                                Profile
                                        </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                        </NavDropdown.Item>
                                        </NavDropdown>
                                        :
                                        <NavLink
                                            to={'/signin'}
                                            className={({ isActive }) =>
                                                isActive ? 'text-warning mx-sm-5 text-decoration-none border-0 py-1' : 'mx-sm-5 text-decoration-none border-0 py-1 hover-underline-animation'
                                            }
                                        >
                                            <FontAwesomeIcon icon={faSignIn} className="fs-4 me-1" />
                                 Login
                             </NavLink>}
                            </Container>
                        </Nav>
                    </Container>
                </Navbar.Collapse>
            </Navbar>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    {/* <div className="row justify-content-center"> */}
                    <div className="col-12">
                        {/* <div className="col-10"> */}
                        <div className="p-3 pt-5">
                            <div className="d-flex justify-content-start align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            {loading ? (
                                <Loader />
                            ) : error ? (
                                <Message variant='danger'>{error}</Message>
                            ) : (
                                        <form onSubmit={submitHandler} >
                                            {loadingUpdate && <Loader />}
                                            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                                            {successUpdate && <Message variant='success'>Profile Updated Successfully</Message>}
                                            <div className="row mt-3">
                                                <div className="col-md-6 mb-2"><label className="labels mb-1">Name</label><input type='name' className="form-control" placeholder="first name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                                                <div className="col-md-6"><label className="labels mb-1">Surname</label><input type="text" className="form-control" placeholder="surname" /></div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12 mb-2"><label className="labels mb-1">Mobile Number</label><input type="number" className="form-control" placeholder="enter phone number" /></div>
                                                <div className="col-md-12"><label className="labels mb-1">Email ID</label><input type="email" className="form-control" placeholder="enter email id" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6 mb-2"><label className="labels mb-1">Password</label><input type='password' className="form-control" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                                                <div className="col-md-6"><label className="labels mb-1">Confirm Password</label><input type='password' className="form-control" value={confirmPassword} placeholder="enter password" onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                                            </div>
                                            <div className="my-5 text-center"><button className="btn btn-warning" type="submit" style={{ width: "50vw" }}>Save Profile</button></div>
                                        </form>
                                    )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-0">
                <div className="d-flex justify-content-around py-4 my-auto align-items-center">
                    <span className="text-secondary"><span className="text-warning">&copy;</span> {new Date().getFullYear()} Copyright: AmirPJV</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
