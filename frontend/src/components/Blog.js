import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const Blog = ({ blog }) => {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate(`/blog/${blog._id}`)
    }
    const monthNames = ["Jan", "Febr", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const newDate = new Date(blog.updatedAt);
    const formattedDate = monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear();
    //multiple fade in
    // const [isVisible, setVisible] = useState(true);
    // const domRef = useRef();
    // useEffect(() => {
    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => setVisible(entry.isIntersecting));
    //     });
    //     observer.observe(domRef.current);
    //     return () => observer.unobserve(domRef.current);
    // }, []);
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(entry.isIntersecting);
                }
            });
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            <div className="card text-white bg-primary mb-3 w-100">
                <div className="card-body d-flex flex-column justify-content-evenly">
                    <div className="card-img position-relative h-100 mb-1 w-100">
                        <img variant="top" src={blog.blogImage} alt={blog.blogName} className='img-fluid overflow-hidden w-100 position-relative' />
                        <div className="position-absolute text-warning" style={{ left: "15px", bottom: "10px" }}>
                            <button className="btn btn-outline-warning disabled d-none d-md-flex">Created by Admin on {formattedDate}</button>
                            <button className="btn btn-outline-warning disabled d-sm-flex d-md-none" style={{ fontSize: "3vw" }}>Created by Admin on {formattedDate}</button>
                        </div>
                    </div>
                    <h4 className="card-title">{blog.blogName}</h4>
                    <h6 className="card-subtitle text-muted mb-4">{blog.blogSubDescription}</h6>
                    <button type="button" className="btn btn-warning w-50 ms-0 text-center border-0 rounded-0" id="readmore-btn" onClick={clickHandler}><span>READ MORE </span></button>
                </div>
            </div>
        </div>
    );
}
export default Blog;