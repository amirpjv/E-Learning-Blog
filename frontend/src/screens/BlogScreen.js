import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBlog, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { Container, Nav, Navbar, Row, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader';
import { detailsBlog } from '../actions/blogActions';

const BlogScreen = () => {
  const params = useParams()
  const blogId = params.id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [htmlActive, setHtmlActive] = useState(true)
  const [cssActive, setCssActive] = useState(false)
  const [jsActive, setJsActive] = useState(false)

  const htmlHandler = (e) => {
    e.preventDefault()
    setHtmlActive(true)
    setCssActive(false)
    setJsActive(false)
  }
  const cssHandler = (e) => {
    e.preventDefault()
    setHtmlActive(false)
    setCssActive(true)
    setJsActive(false)
  }
  const jsHandler = (e) => {
    e.preventDefault()
    setHtmlActive(false)
    setCssActive(false)
    setJsActive(true)
  }

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      dispatch(detailsBlog(blogId))
    }
  }, [navigate, userInfo, dispatch])

  const dateFunc = () => {
    const monthNames = ["Jan", "Febr", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const newDate = new Date(blog.updatedAt);
    const formattedDate = monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear();
    return formattedDate
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <div>
              <Meta title={blog.blogName} />
              <header>
                <Navbar className="overflow-visible bg-transparent border-0" collapseOnSelect expand="md">
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
              </header>
              <main className="container px-2 mt-3">
                <img variant="top" src={blog.blogImage} alt="img" className='img-fluid w-100 border border-3 rounded mb-3' style={{ height: "50vh" }} />
                <h1>{blog.blogName}</h1>
                <div className="mb-2 d-flex justify-content-between">
                  <h6>{blog.blogSubDescription}</h6>
                  <p>{dateFunc()}</p>
                </div>
                <p className="mb-3">{blog.blogDescription}</p>
                {blog.category === "Resource" ? <div className="d-none"></div> :
                  <div className="card">
                    <ul className="nav nav-tabs card-header">
                      <li className="nav-item">
                        {htmlActive ? <a role="button" className="nav-link active" data-bs-toggle="tab" onClick={htmlHandler}>HTML</a> : <a role="button" className="nav-link" data-bs-toggle="tab" onClick={htmlHandler}>HTML</a>}
                      </li>
                      <li className="nav-item">
                        {cssActive ? <a role="button" className="nav-link active" data-bs-toggle="tab" onClick={cssHandler}>CSS</a> : <a role="button" className="nav-link" data-bs-toggle="tab" onClick={cssHandler}>CSS</a>}
                      </li>
                      <li className="nav-item">
                        {jsActive ? <a role="button" className="nav-link active" data-bs-toggle="tab" onClick={jsHandler}>JS</a> : <a role="button" className="nav-link" data-bs-toggle="tab" onClick={jsHandler}>JS</a>}
                      </li>
                    </ul>
                    <div id="myTabContent" className="tab-content card-body">
                      {htmlActive && <div className="tab-pane fade active show">
                        <code className="text-white">{blog.htmlCode}</code>
                      </div>}
                      {cssActive && <div className="tab-pane fade active show">
                        <code className="text-white">{blog.cssCode}</code>
                      </div>}
                      {jsActive && <div className="tab-pane fade active show">
                        <code className="text-white">{blog.jsCode}</code>
                      </div>}
                    </div>
                  </div>
                }
              </main>
              <div className="row g-0 mt-5">
                <div className="d-flex justify-content-around py-4 my-auto align-items-center">
                  <span className="text-secondary"><span className="text-warning">&copy;</span> {new Date().getFullYear()} Copyright: AmirPJV</span>
                  <div>
                    <h6 className="text-secondary hover-underline-animation me-1">Privacy Policy</h6>
                    <span className="border border-end-0 border-top-0 border-bottom-0 border-warning"></span>
                    <h6 className="text-secondary hover-underline-animation ms-1">Terms of Use</h6>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}

export default BlogScreen;