import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, Offcanvas, NavDropdown, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBlog, faSignIn, faSearch, faArrowCircleUp, faHome } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../actions/userActions'

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [barVisibility, setBarVisibility] = useState(false);
    const [topVisibility, setTopVisibility] = useState(false);
    const [scrollPosition, setSrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.scrollY;
        position >= 30 ? setBarVisibility(true) : setBarVisibility(false);
        position >= 500 ? setTopVisibility(true) : setTopVisibility(false);
        setSrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const logoutHandler = () => {
        dispatch(logout())
    }

    const topFunction = () => {
        //document.body.scrollTop = 0; // For Safari ---JS
        //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera ---JS
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const [search, setSearch] = useState("")
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/blogs/name/${search}`);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar
                className={barVisibility ? 'overflow-visible bg-dark sticky-top border-0 d-none d-md-flex' : "overflow-visible bg-black border-0 sticky-top d-none d-md-flex"}
                collapseOnSelect
                expand="md"
                style={{ minHeight: "20vh" }}
            >
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
                                    <FontAwesomeIcon icon={faHome} className="fs-4 me-1" />
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
                        <Nav className="d-flex flex-row justify-content-evenly my-1">
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <form className="search position-relative shadow" onSubmit={submitHandler}>
                                    <button id="" type="submit" className="btn btn-warning text-white border-start-0 border-warning position-absolute end-0 rounded-start rounded-pill"><FontAwesomeIcon icon={faSearch} className="text-white" /></button>
                                    <input type="text" className="form-control rounded-pill" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                                </form>
                            </div>
                        </Nav>
                    </Container>
                </Navbar.Collapse>
            </Navbar>

            <Navbar
                className={barVisibility ? 'overflow-visible bg-dark sticky-top border-0 d-flex d-md-none top-0' : "overflow-visible bg-black border-0 sticky-top d-flex d-md-none top-0"}
                collapseOnSelect
                expand="md"
                style={{ minHeight: "20vh" }}
            >
                <Navbar.Brand href="/" id="nav-brand" className="ms-3 text-white fs-5 ps-2 border-0 d-md-none">{`<Amir`}<span className="text-warning" id="brand-home">PJV</span>{`/>`}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-5 border border-1 border-warning" id="custom-toggler" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Container fluid className="d-flex flex-column">
                        <Nav className="d-flex flex-row justify-content-between my-auto">
                            <Navbar.Brand href="/" id="nav-brand" className="ms-3 text-white fs-5 ps-2 border-0 d-none d-md-block">{`<Amir`}<span className="text-warning" id="brand-home">PJV</span>{`/>`}</Navbar.Brand>
                            <Container fluid className="my-auto d-flex justify-content-between align-items-center">
                                <NavLink
                                    to={'/'}
                                    className={({ isActive }) =>
                                        isActive ? 'text-warning text-decoration-none border-0 py-1' : 'text-decoration-none border-0 py-1 hover-underline-animation'
                                    }
                                >
                                    <FontAwesomeIcon icon={faHome} className="fs-4 me-1" />
                                    Home
                                </NavLink>
                                <NavLink
                                    to={'/blogs'}
                                    className={({ isActive }) =>
                                        isActive ? 'text-warning text-decoration-none border-0 py-1' : 'text-decoration-none border-0 py-1 hover-underline-animation'
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
                                        className="my-0 py-0 text-decoration-none text-white hover-underline-animation"
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
                                            className="my-0 py-0 text-decoration-none text-white py-1 hover-underline-animation"
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
                                                isActive ? 'text-warning text-decoration-none border-0 py-1' : 'text-decoration-none border-0 py-1 hover-underline-animation'
                                            }
                                        >
                                            <FontAwesomeIcon icon={faSignIn} className="fs-4 me-1" />
                                 Login
                             </NavLink>}
                                <button type="button" class="btn btn-outline-warning border border-1 border-warning text-white" id="btn-pulse" onClick={handleShow}>
                                    Search
                                </button>
                                <Offcanvas show={show} onHide={handleClose}>
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        Some text as placeholder. In real life you can have the elements you
                                        have chosen. Like, text, images, lists, etc.
                                </Offcanvas.Body>
                                </Offcanvas>
                            </Container>
                        </Nav>
                    </Container>
                </Navbar.Collapse>
            </Navbar>
            <FontAwesomeIcon onClick={topFunction} id="gotop" icon={faArrowCircleUp}
                size={'4x'}
                className={topVisibility ? "rounded rounded-circle m-4 text-warning end-0 position-fixed" : "d-none"}
            />
        </>
    );
}

export default Header;
