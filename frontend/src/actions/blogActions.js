import Axios from 'axios'
import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL,
    BLOG_DELETE_SUCCESS,
    BLOG_DELETE_REQUEST,
    BLOG_DELETE_FAIL,
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL,
    BLOG_CATEGORY_LIST_SUCCESS,
    BLOG_CATEGORY_LIST_REQUEST,
    BLOG_CATEGORY_LIST_FAIL,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL,
}
    from "../constants/blogConstants"
import { logout } from './userActions'

export const listBlogs = ({
    pageNumber = '',
    name = '',
    category = ''
}) => async (dispatch) => {
    dispatch({ type: BLOG_LIST_REQUEST })
    try {
        const { data } = await Axios.get(
            `/api/blogs?pageNumber=${pageNumber}&name=${name}&category=${category}`
        );
        dispatch({ type: BLOG_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: BLOG_LIST_FAIL, payload: error.message })
    }
}

export const listBlogCategories = () => async (dispatch) => {
    dispatch({
        type: BLOG_CATEGORY_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/blogs/categories`);
        dispatch({ type: BLOG_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: BLOG_CATEGORY_LIST_FAIL, payload: error.message });
    }
};

export const detailsBlog = (blogId) => async (dispatch) => {
    dispatch({ type: BLOG_DETAILS_REQUEST, payload: blogId })
    try {
        const { data } = await Axios.get(`/api/blogs/${blogId}`)
        dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: BLOG_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const createBlog = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_CREATE_REQUEST,
        })

        const {
            userSignin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.post(`/api/blogs`, {}, config)

        dispatch({
            type: BLOG_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: BLOG_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateBlog = (blog) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_UPDATE_REQUEST,
            payload: blog
        })

        const {
            userSignin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await Axios.put(
            `/api/blogs/${blog._id}`,
            blog,
            config
        )

        dispatch({
            type: BLOG_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: BLOG_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const deleteBlog = (blogId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_DELETE_REQUEST,
            payload: blogId
        })

        const {
            userSignin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await Axios.delete(`/api/blogs/${blogId}`, config)

        dispatch({
            type: BLOG_DELETE_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: BLOG_DELETE_FAIL,
            payload: message,
        })
    }
}
