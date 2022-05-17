import React, { useState, useEffect } from 'react'
import { Form, Button, Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faBlog, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../actions/userActions'
import Loader from '../components/Loader'
import { listBlogs } from '../actions/blogActions';

const HomeScreen = () => {
    const { pageNumber = 1 } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [imgLoaded, setImgLoaded] = useState(false);

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const blogList = useSelector((state) => state.blogList)
    const { loading, error, blogCount, userCount } = blogList

    useEffect(() => {
        dispatch(listBlogs({ pageNumber }))
    }, [dispatch, pageNumber])

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/blogs/name/${name}`);
    };

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            {/* <div id="home-bg-img">
            </div> */}
            <Meta title={'Free Learning Blog'} />
            <img src="/images/bg-main.jpg" alt="image" id="home-bg-img" onLoad={() => setImgLoaded(true)} />
            {/* <div className={`${imgLoaded ? "d-none" : "home-load-center"}`}>
                <div className="home-load-ring"></div>
            </div> */}
            {imgLoaded || <Loader />}
            <div id="home-content" className={`${imgLoaded ? "" : "d-none"}`}>
                <Navbar className="overflow-visible bg-transparent border-0" collapseOnSelect expand="md">
                    <Navbar.Brand href="/" id="nav-brand" className="ms-3 text-white fs-5 ps-2 border-0">{`<Amir`}<span className="text-warning" id="brand-home">PJV</span>{`/>`}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-5 border border-1 border-warning" id="custom-toggler" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="d-flex fw-bolder align-items-center me-md-4 me-lg-4 me-xl-4 me-xxl-4">
                            <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                    isActive ? 'text-warning mx-3 text-decoration-none border-0 py-1' : 'mx-3 text-decoration-none border-0 py-1 hover-underline-animation'
                                }
                            >
                                <FontAwesomeIcon icon={faHome} className="fs-4 me-1" />
                                Home
                            </NavLink>
                            <NavLink
                                to={'/blogs'}
                                className={({ isActive }) =>
                                    isActive ? 'text-warning mx-3 text-decoration-none border-0 py-1' : 'mx-3 text-decoration-none border-0 py-1 hover-underline-animation'
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
                                    className="mx-3 text-decoration-none text-white py-1 hover-underline-animation"
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
                                        className="mx-3 text-decoration-none text-white py-1 hover-underline-animation"
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
                                            isActive ? 'text-warning mx-3 text-decoration-none border-0 py-1' : 'mx-3 text-decoration-none border-0 py-1 hover-underline-animation'
                                        }
                                    >
                                        <FontAwesomeIcon icon={faSignIn} className="fs-4 me-1" />
                                 Login
                             </NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="d-flex flex-column align-items-center mt-5">
                    <div className="row d-flex flex-column justify-content-evenly text-center text-warning w-100" style={{ minHeight: '20vh' }}>
                        <h2><strong>Self-study, gaining experience, entering the job market with <span className="text-danger" id="brand-home">Codemo</span></strong></h2>
                        <h3><strong>Learn professionally for free</strong></h3>
                    </div>
                    <div className="row w-75" style={{ minHeight: '20vh' }}>
                        <Form onSubmit={submitHandler} className="position-relative mt-5 bg-transparent">
                            <Form.Control
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                                placeholder='What do you want to learn?'
                                className='rounded-0 rounded-pill position-absolute top-0 start-0'
                            ></Form.Control>
                            <Button type='submit' variant='transparent' size="lg" className="rounded-0 rounded-pill mt-1 border-0 position-absolute top-0 end-0 w-25" id="search-icon">
                                <FontAwesomeIcon icon={faSearch} className="text-warning fs-3" />
                            </Button>
                        </Form>
                    </div>
                    <div className="row d-flex justify-content-evenly text-warning w-100 mt-4" style={{ minHeight: '20vh' }}>
                        <div className="col col-3 d-flex flex-column justify-content-evenly text-center align-items-center border border-2 border-warning rounded-3">
                            <img src="./images/1.png" alt="student" style={{ minWidth: "50%" }} />
                            {loading ? <Spinner /> : <h6>{userCount} students</h6>}
                        </div>
                        <div className="col col-3 d-flex flex-column justify-content-evenly text-center align-items-center border border-2 border-warning rounded-3">
                            <img src="./images/2.png" alt="teacher" style={{ minWidth: "50%" }} />
                            <h6>1 teacher</h6>
                        </div>
                        <div className="col col-3 p-1 d-flex flex-column justify-content-evenly text-center align-items-center border border-2 border-warning rounded-3">
                            <img src="./images/3.png" alt="blog" style={{ minWidth: "50%" }} />
                            {loading ? <Spinner /> : <h6>{blogCount} blogs</h6>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeScreen;

