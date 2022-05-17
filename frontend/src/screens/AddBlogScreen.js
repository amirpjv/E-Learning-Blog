import React, { useState, useEffect } from 'react'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Spinner, Form, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { detailsBlog, updateBlog } from '../actions/blogActions';
import { BLOG_UPDATE_RESET } from '../constants/blogConstants';

const AddBlogScreen = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { id: blogId } = params;
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [subDescription, setSubDescription] = useState('');
    const [description, setDescription] = useState('');
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');

    const blogDetails = useSelector((state) => state.blogDetails);
    const { loading, error, blog } = blogDetails;

    const blogUpdate = useSelector((state) => state.blogUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = blogUpdate;

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/signin')
        }
        if (successUpdate) {
            navigate('/admin/bloglist');
        }
        if (!blog || blog._id !== blogId || successUpdate) {
            dispatch({ type: BLOG_UPDATE_RESET });
            dispatch(detailsBlog(blogId));
        } else {
            setName(blog.blogName);
            setImage(blog.blogImage);
            setCategory(blog.category);
            setSubDescription(blog.blogSubDescription);
            setDescription(blog.blogDescription);
            setHtmlCode(blog.htmlCode);
            setCssCode(blog.cssCode);
            setJsCode(blog.jsCode);
        }
    }, [blog, dispatch, blogId, successUpdate, navigate, userInfo, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateBlog({
                _id: blogId,
                name,
                image,
                category,
                subDescription,
                description,
                htmlCode,
                cssCode,
                jsCode
            })
        );
    };

    const uploadFileHandler = async (e) => {
        setErrorUpload(false);
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    return (
        <Container fluid id="addblog" className="min-vh-100">
            <Meta title={'Create Blog'} />
            <Toaster />
            <Row>
                <Col className="d-flex flex-row justify-content-between align-items-center">
                    <h3 className='my-3'>New Blog</h3>
                    <Link to='/admin/bloglist' className='btn btn-warning my-3'>
                        Go Back
                    </Link>
                </Col>
            </Row>
            {loadingUpdate && <Spinner />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? (
                <Spinner />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                        <Container>
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name' className="py-1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image' className="py-1">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter image url'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='imageFile' className="py-1">
                                    <Form.Label>Image File</Form.Label>
                                    <Form.Control
                                        type='file'
                                        label='Choose File'
                                        // custom
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={uploadFileHandler}
                                    ></Form.Control>
                                    {loadingUpload && <Spinner />}
                                    {errorUpload && (
                                        <Message variant="danger">{errorUpload}</Message>
                                    )}
                                </Form.Group>

                                <Form.Group controlId='category' className="py-1">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='subdescription' className="py-1">
                                    <Form.Label>Sub Description</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter sub description'
                                        value={subDescription}
                                        onChange={(e) => setSubDescription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                {/* <Form.Group controlId='description' className="py-1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group> */}
                                <div controlId='description' className="form-group py-1">
                                    <Form.Label>Description</Form.Label>
                                    {/* <label htmlFor="exampleTextarea">Description</label> */}
                                    <textarea
                                        className="form-control"
                                        id="exampleTextarea"
                                        rows="3"
                                        placeholder='Enter description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div controlId='htmlCode' className="form-group py-1">
                                    <Form.Label>HTML Code</Form.Label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder='Enter html code'
                                        value={htmlCode}
                                        onChange={(e) => setHtmlCode(e.target.value)}
                                    ></textarea>
                                </div>

                                <div controlId='cssCode' className="form-group py-1">
                                    <Form.Label>CSS Code</Form.Label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder='Enter css code'
                                        value={cssCode}
                                        onChange={(e) => setCssCode(e.target.value)}
                                    ></textarea>
                                </div>

                                <div controlId='jsCode' className="form-group py-1">
                                    <Form.Label>JS Code</Form.Label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder='Enter js code'
                                        value={jsCode}
                                        onChange={(e) => setJsCode(e.target.value)}
                                    ></textarea>
                                </div>

                                <Button type='submit' variant='warning' className="my-3 bg-warning w-100 text-black border-0">
                                    Update
                            </Button>
                            </Form>
                        </Container>
                    )}
        </Container>
    );
}

export default AddBlogScreen;