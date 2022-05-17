import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Pagination, Spinner, Nav, Navbar, Offcanvas, NavDropdown, ListGroup } from 'react-bootstrap'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import Meta from '../components/Meta'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Blog from '../components/Blog'
// import Carousel from "../components/Carousel"
import { listBlogs } from '../actions/blogActions'
import Loader from '../components/Loader'
import Message from '../components/Message';
import Footer from '../components/Footer';
import { logout } from '../actions/userActions'
import { listBlogCategories } from '../actions/blogActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faSignIn, faSearch, faArrowCircleUp, faHome } from '@fortawesome/free-solid-svg-icons'

const BlogScreen = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all")
  const [pageNumber, setPageNumber] = useState(1)

  let {
    name = 'all'
  } = useParams();
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const blogList = useSelector((state) => state.blogList)
  const { loading, error, blogs, blogFilterCount, page, pages } = blogList

  const blogCategoryList = useSelector((state) => state.blogCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = blogCategoryList;

  const [isOpen, setOpen] = useState(false)
  const [barVisibility, setBarVisibility] = useState(false);
  const [topVisibility, setTopVisibility] = useState(false);
  const [scrollPosition, setSrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    position >= 30 ? setBarVisibility(true) : setBarVisibility(false);
    position >= 500 ? setTopVisibility(true) : setTopVisibility(false);
    setSrollPosition(position);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4
    },
    // middle: {
    //   breakpoint: { max: 2000, min: 1024 },
    //   items: 3
    // },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(listBlogCategories())
    dispatch(
      listBlogs({
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        pageNumber,
      })
    );
  }, [dispatch, name, category, pageNumber]);

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
    <div className="w-100 h-100 bg-black">
      <Meta title={'Learning Blog'} />
      <section className="min-vh-100">
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
                    <input type="text" value={search} className="form-control rounded-pill" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
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
                  <button type="button" className="btn btn-outline-warning border border-1 border-warning text-white" id="btn-pulse" onClick={handleShow}>
                    Search
                                </button>
                  <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title className="text-white">Categories</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="hover-underline-animation bg-transparent">
                          <a
                            className="text-decoration-none text-secondary"
                            onClick={() => { setCategory("all"); setPageNumber(1); topFunction(); }}
                            style={{ cursor: "pointer" }}
                          >
                            All
                          </a>
                        </ListGroup.Item>
                        {loadingCategories ? (
                          <Loader />
                        ) : errorCategories ? (
                          <Message variant="danger">{errorCategories}</Message>
                        ) : (
                              categories.map((c) => (
                                <ListGroup.Item key={c} className="hover-underline-animation bg-transparent my-1">
                                  <a
                                    className="text-decoration-none text-secondary"
                                    onClick={() => { setCategory(c); setPageNumber(1); topFunction(); }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {c}
                                  </a>
                                </ListGroup.Item>
                              ))
                            )}
                      </ListGroup>
                      <Offcanvas.Title className="d-flex justify-content-center mt-4 border-top border-white">
                        Result: {blogFilterCount}
                      </Offcanvas.Title>
                    </Offcanvas.Body>
                    <Offcanvas.Body>
                      <div className="d-flex justify-content-center mt-3">
                        <form className="position-relative" onSubmit={submitHandler}>
                          <button id="" type="submit" className="btn btn-warning text-white border-start-0 border-warning position-absolute end-0"><FontAwesomeIcon icon={faSearch} className="text-white" /></button>
                          <input type="text" value={search} className="form-control" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                        </form>
                      </div>
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
        <div className="row w-100 h-100 d-flex justify-content-between align-content-between align-items-between mx-auto mt-4" style={{ minHeight: "80vh" }}>
          <div className="col-sm-8 px-0">
            <img src="/images/certification.gif" className="img-fluid h-100 w-100 mx-0 px-0" alt="password" />
          </div>
          <div className="col-sm-4 my-auto">
            <ul className="check-list">
              <li>Receive a valid degree by passing special courses</li>
              <li>Use over 100 free videos</li>
              <li>Support for technical problems</li>
              <li>All contents are free</li>
            </ul>
          </div>
        </div>
        {/* --------------number1 */}
        {/* <div datatype="carousel" className="row w-100 border border-1 border-danger mx-auto">
          <Carousel pause='hover' className='bg-black' indicators={false} nextIcon={directionButtons(true)} prevIcon={directionButtons(false)}>
            <Carousel.Item>
              <Link to={'/'}>
                <Image src={'/images/pass1.png'} alt={'ddd'} fluid className="d-block mx-auto w-75" style={{ maxHeight: '400px' }} />
              </Link>
            </Carousel.Item>
          </Carousel>
        </div> */}

        {/* --------------number2 */}
        {/* <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
          <Carousel
            show={3}
          >
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div style={{ padding: 8 }}>
                <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{ width: '100%' }} />
              </div>
            </div>
          </Carousel>
        </div> */}

        <Carousel
          responsive={responsive}
          infinite
          className="py-4"
          style={{ minHeight: "20vh" }}
          draggable={false}
        // arrows={false}
        // customButtonGroup={<ButtonGroup />}
        >
          <div className="card bg-transparent with-conic-gradient d-flex align-items-center mx-2" >
            <img src="/images/support.png" alt="support" className="p-3" style={{ width: '150px' }} />
            <p className="fs-3 text-warning">Online Support</p>
          </div>
          <div className="card bg-transparent with-conic-gradient d-flex align-items-center mx-2" >
            <img src="/images/chat.png" alt="chat" className="p-3" style={{ width: '150px' }} />
            <p className="fs-3 text-warning">Chat Room</p>
          </div>
          <div className="card bg-transparent with-conic-gradient d-flex align-items-center mx-2" >
            <img src="/images/gift.png" alt="gift" className="p-3" style={{ width: '150px' }} />
            <p className="fs-3 text-warning">Free Courses</p>
          </div>
          <div className="card bg-transparent with-conic-gradient d-flex align-items-center mx-2" >
            <img src="/images/member.png" alt="membership" className="p-3" style={{ width: '150px' }} />
            <p className="fs-3 text-warning">Membership</p>
          </div>
          <div className="card bg-transparent with-conic-gradient d-flex align-items-center mx-2" >
            <img src="/images/hand.png" alt="coapration" className="p-3" style={{ width: '150px' }} />
            <p className="fs-3 text-warning">Coapration</p>
          </div>
        </Carousel>
      </section>
      <section className="mt-2">
        {
          loading ? <Loader /> :
            <Container fluid>
              <Row className="d-none d-md-grid justify-content-around mt-3" style={{ gridTemplateColumns: '30vw 65vw' }}>
                <div className="px-0" style={{ gridRowStart: '1', gridRowEnd: '6' }}>
                  <div className="position-sticky top-0 border border-1 border-secondary card w-100">
                    <h3 id="nav-brand" className="card-header text-center text-white border-0 mb-5">{`<Amir`}<span className="text-warning" id="brand-home">PJV</span>{`/>`}</h3>
                    <div className="card-body border border-4 border-primary border-bottom-0 border-end-0 border-start-0 position-relative" style={{ marginTop: "5vw", paddingBottom: "20vh" }}>
                      <img src="/images/avatar.jpg" alt='avatar' className="img-fluid position-absolute rounded rounded-circle" style={{ width: "15vw", marginTop: "-13vh", marginLeft: "5vw", boxShadow: "2px 2px 5px 5px gray" }} />
                      {loadingCategories ? (
                        <Spinner />
                      ) : errorCategories ? (
                        <Message variant="danger">{errorCategories}</Message>
                      ) : (
                            <ul className="nav nav-pills flex-column text-center" style={{ marginTop: "12vw" }}>
                              <li className="list-group-item d-flex justify-content-start align-content-start align-items-start float-start ms-0">Categories</li>
                              <li className="nav-item">
                                <button
                                  className={category === 'all' ? 'nav-link text-warning text-decoration-none fw-bold w-100' : 'nav-link text-white text-decoration-none w-100'}
                                  onClick={() => { setCategory("all"); setPageNumber(1); topFunction(); }}
                                >
                                  Any
                                </button>
                              </li>
                              {categories.map((c) => (
                                <li key={c} className="nav-item">
                                  {c === category ?
                                    (<button
                                      className="text-warning text-decoration-none fw-bold nav-link w-100"
                                      onClick={() => { setCategory(c); setPageNumber(1); topFunction(); }}
                                    >
                                      {c}
                                    </button>)
                                    :
                                    (<button
                                      className="text-white text-decoration-none nav-link w-100"
                                      onClick={() => { setCategory(c); setPageNumber(1); topFunction(); }}
                                    >
                                      {c}
                                    </button>)}
                                </li>
                              ))}
                            </ul>
                          )}
                      <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item border border-top-0 border-end-0 border-start-0 mt-2">{`Result: ${blogFilterCount}`}</li>
                      </ul>
                      <button type="button" className="btn btn-outline-warning w-100 mt-2" onClick={() => navigate('/signin')}>Login</button>
                    </div>
                    <div className="card-footer text-muted text-center">
                      End of blogs
                    </div>
                  </div>
                </div>
                {blogs.length === 0 &&
                  <div className="alert alert-dismissible alert-light">
                    <h4 className="alert-heading d-flex justify-content-center">Blog not found!</h4>
                  </div>
                }
                {blogs.map(blog =>
                  <div key={blog._id}>
                    <Blog blog={blog} />
                  </div>
                )}
              </Row>
            </Container>
        }
        {loading ? <Loader /> :
          <Container fluid>
            {blogs.map(blog =>
              <div key={blog._id} className="d-flex flex-column d-md-none">
                <Blog blog={blog} />
              </div>
            )}
          </Container>
        }
      </section>
      <div className="container">
        <Row className="d-flex justify-content-center text-center my-3">
          {
            (
              pages > 1 && (
                <Pagination className="d-flex justify-content-center text-center m-auto">
                  {[...Array(pages).keys()].map((x) => (
                    <button
                      key={x + 1}
                      className={x + 1 === page ? 'active bg-transparent border-0 p-0' : 'bg-transparent border-0 p-0'}
                      onClick={() => { setPageNumber(x + 1); topFunction(); }}
                    >
                      <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </button>
                  ))}
                </Pagination>
              )
            )
          }
        </Row>
      </div>
      <Footer />
    </div >
  );
}

export default BlogScreen;
