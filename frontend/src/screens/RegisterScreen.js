import React, { useState, useEffect } from 'react'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions'
import Message from '../components/Message';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'react-bootstrap'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate({ pathname: '/' }, { replace: true })
        }
    }, [navigate, userInfo, check])

    const submitHandler = (e) => {
        e.preventDefault()
        toast.dismiss()
        if (check) {
            if (password !== confirmPassword) {
                toast.error('Password and confirm password are not match')
            } else {
                dispatch(register(name, email, password))
            }
        } else {
            toast.error('Please check Terms & Conditions')
        }
    }

    return (
        <section id="register">
            <Meta title={'SignUp Page'} />
            <Toaster />
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Spinner />}
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="content p-5 w-50 h-75">
                <div className="main-w3layouts wrapper">
                    <h1 className="text-white fs-4">SignUp Form</h1>
                    <div className="main-agileinfo">
                        <div className="agileits-top">
                            <form onSubmit={submitHandler}>
                                <input className="text text-white w-100 rounded-0" value={name} onChange={(e) => setName(e.target.value)} type="text" name="Username" placeholder="Username" required={true} />
                                <input className="text email text-white w-100 rounded-0" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required={true} />
                                <input className="text w-100 text-white w-100 rounded-0" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required={true} />
                                <input className="text w3lpass text-white w-100 rounded-0" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" placeholder="Confirm Password" required={true} />
                                <fieldset className="form-group wthree-text">
                                    <div className="form-check d-flex justify-content-start align-items-start">
                                        <input className="form-check-input checkbox my-auto" type="checkbox" id="flexCheckChecked" value={check} onClick={(e) => setCheck(!check)} required={true} />
                                        <label className="form-check-label checkbox-text" htmlFor="flexCheckChecked">
                                            &nbsp;I Agree To The Terms & Conditions
                                        </label>
                                    </div>
                                </fieldset>
                                {/* <div className="d-flex justify-content-start align-items-start my-3">
                                    <input type="checkbox" className="checkbox my-auto" required={true} />
                                    <span className="checkbox-text">&nbsp;I Agree To The Terms & Conditions</span>
                                </div> */}
                                <button type="submit" className="btn btn-warning w-100 text-center border-0 rounded rounded-2" id="register-btn"><span>SIGNUP </span></button>
                            </form>
                            <p className="mt-2 link-go-home">Do you have an Account?<Link to='/signin' id="link-reg-home"> Login Now!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterScreen;