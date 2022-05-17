import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faCompass, faEnvelope, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="rounded-0 mt-5">
                <div className="card rounded-0">
                    <div className="row g-0">
                        <div className="col-md-8 border-right">
                            <div className="border-bottom">
                                <div className="py-4 ms-sm-5 d-flex justify-content-between">
                                    <div className="col-sm-4">
                                        <ul className="item-list text-decoration-none list-unstyled">
                                            <li className="text-decoration-none text-warning fw-bold fs-5">Services</li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Web design</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Development</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Security</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Hosting</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <ul className="item-list list-unstyled">
                                            <li className="text-decoration-none fw-bold fs-5 text-warning">About</li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Team</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Legacy</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Refunds</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">FAQS</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-4">
                                        <ul className="item-list list-unstyled">
                                            <li className="text-decoration-none fw-bold fs-5 text-warning">Careers</li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Job openings</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Employee success</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Benefits</a></li>
                                            <li><a className="text-decoration-none text-secondary fs-6" href="#">Features</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom">
                                <div className="d-md-flex justify-content-md-center py-4">
                                    <div className="col-md-4 my-auto">
                                        <p className="d-flex flex-column align-items-center my-auto"><FontAwesomeIcon icon={faCompass} className="text-warning" /> Iran/Tehran </p>
                                    </div>
                                    <div className="col-md-4 my-auto">
                                        <p className="d-flex flex-column align-items-center my-auto"><FontAwesomeIcon icon={faPhone} className="text-warning" /> +98-9359866378 </p>
                                    </div>
                                    <div className="col-md-4 my-auto">
                                        <p className="d-flex flex-column align-items-center my-auto"><FontAwesomeIcon icon={faEnvelope} className="text-warning" /> AmirPJV@yahoo.com </p>
                                    </div>
                                </div>
                            </div>
                            <blockquote className="border-bottom py-4 text-center">
                                <p className="my-auto">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="text-warning" />
                                    {' '}
                                    We are here to help you by providing the best and useful information related to HTML/HTML5, CSS/CSS3, Bootstrap, JavaScript, React JS, React Natve, Android App Development and more.
                                    {' '}
                                    <FontAwesomeIcon icon={faQuoteRight} className="text-warning" />
                                </p>
                            </blockquote>
                            <div className="border-bottom pb-3 d-none d-md-block">
                                <div className="form-group d-flex justify-content-center">
                                    <div className="input-group my-auto d-flex align-items-center py-2 w-50">
                                        <input type="text" className="form-control rounded rounded-pill rounded-end" placeholder="Enter your email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        <button className="btn btn-warning w-25 rounded rounded-pill rounded-start" type="button" id="button-addon2">Join</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="border-bottom">
                                <div className="btn btn-warning border border-1 border-warning w-100 rounded rounded-0 bg-warning p-3" onClick={() => navigate('/chat')}>
                                    <div className="d-flex justify-content-between align-items-center"> <FontAwesomeIcon icon={faPhone} id="talk" className="btn-rotate bg-white text-warning rounded rounded-circle p-3 fs-6" /> <span className="text-white fs-3 fw-bold">Let's Talk</span> </div>
                                </div>
                                <div className="ratio ratio-4x3 mb-3">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12950.322674451922!2d51.30921413520722!3d35.76111017943114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snl!4v1649090640838!5m2!1sen!2snl"
                                        // width="600"
                                        // height="450"
                                        style={{ border: "0" }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                            <div className="border-bottom py-3 text-center list-unstyled">
                                <div className="d-flex justify-content-evenly">
                                    <a href="https://github.com/amirpjv" target="_blank"><img src="/images/github.png" className="rounded-circle" width="50" /></a>
                                    <a href="https://www.linkedin.com/in/amirpjv/" target="_blank"><img src="/images/linkedin.png" className="rounded-circle" width="50" /></a>
                                    <a href="https://wa.me/989359866378" target="_blank"><img src="/images/google.png" className="rounded-circle" width="50" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0">
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
            </div>
        </>
    );
}

export default Footer;
