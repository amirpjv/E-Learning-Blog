import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import Meta from '../components/Meta'
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'react-bootstrap'
import { signin } from '../actions/userActions'

const SigninScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignin = useSelector((state) => state.userSignin)
    const { loading, error, userInfo } = userSignin

    const changeHandler = (e) => {

    }

    useEffect(() => {
        if (userInfo) {
            navigate({ pathname: '/' }, { replace: true })
        }
        toast.dismiss()
        if (error) {
            toast.error(error)
        }
    }, [navigate, userInfo, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    return (
        <section className="min-vh-100 w-100 bg-white">
            <Meta title={'Login Page'} />
            <Toaster />
            <button id="go-home" title="Go to homepage" className="border border-2 border-warning rounded rounded-circle bg-warning p-3">
                <Link to='/' className="text-warning">
                    <FontAwesomeIcon icon={faHome} className="text-dark fs-2" />
                </Link>
            </button>
            {loading && <Spinner />}
            <div className="container py-5">
                <div className="row d-flex align-items-center justify-content-center h-100 w-100 mx-auto my-auto">
                    <div className="col-sm-10 col-md-7 col-lg-7 col-xl-6 mb-md-2 mb-sm-4">
                        <img src="./images/pass2.gif" className="img-fluid" alt="password" />
                    </div>
                    <div className="col-sm-9 col-md-5 col-lg-5 col-xl-5 offset-xl-1 mt-md-5">
                        <form onSubmit={submitHandler}>
                            <div className="form-outline mb-4">
                                <input type="email" placeholder='Enter email' id="form1Example13" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label className="form-label" htmlFor="form1Example13">Email address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label className="form-label" htmlFor="form1Example23">Password</label>
                            </div>

                            <div className="d-md-flex flex-md-column justify-content-md-start d-lg-flex flex-lg-row justify-content-lg-between d-sm-flex flex-sm-row justify-content-sm-between mb-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input bg-warning"
                                        type="checkbox"
                                        onChange={changeHandler}
                                        value=""
                                        id="form1Example3"
                                    />
                                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                </div>
                                <div className='row'>
                                    <div className="col">
                                        New User?{' '}
                                        <Link to='/register' className="text-warning">
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-outline-warning btn-lg btn-block w-100">Sign in</button>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <button type="button" className="btn btn-warning disabled btn-lg btn-block w-100 mb-1">Continue with Facebook</button>

                            <button type="button" className="btn btn-warning disabled btn-lg btn-block w-100 mt-1">Continue with Twitter</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SigninScreen;