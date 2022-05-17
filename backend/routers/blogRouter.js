import express from 'express'
import expressAsyncHandler from 'express-async-handler'
const blogRouter = express.Router()
import Blog from '../models/blogModel.js'
import User from '../models/userModel.js'
import { isAdmin, isAuth } from '../utils.js'

blogRouter.get('/', expressAsyncHandler(async (req, res) => {
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
    const name = req.query.name || ''
    const category = req.query.category || ''
    const nameFilter = name ? { blogName: { $regex: name, $options: 'i' } } : {}
    const categoryFilter = category ? { category } : {}
    const blogCount = await Blog.count()
    const userCount = await User.count()
    const blogFilterCount = await Blog.count({ ...nameFilter, ...categoryFilter })
    const blogs = await Blog.find({ ...nameFilter, ...categoryFilter })
        .skip(pageSize * (page - 1))
        .limit(pageSize)

    res.json({ blogs, blogCount, blogFilterCount, userCount, page, pages: Math.ceil(blogFilterCount / pageSize) })
}))
blogRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Blog.find().distinct('category')
    res.send(categories)
}))

blogRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.send(blog)
    } else {
        res.status(404).send({ message: "Blog not found" })
    }
}))
blogRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const blog = new Blog({
        blogName: 'Sample name',
        blogImage: '/images/blog.jpg',
        category: 'Sample category',
        blogSubDescription: 'Sample sub description',
        blogDescription: 'Sample description',
        htmlCode: 'Sample code',
        cssCode: 'Sample code',
        jsCode: 'Sample code',
    })
    const createdBlog = await blog.save()
    res.status(201).json({ message: 'Blog Created', blog: createdBlog })
}))

blogRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        blog.blogName = req.body.name
        blog.blogImage = req.body.image
        blog.category = req.body.category
        blog.blogSubDescription = req.body.subDescription
        blog.blogDescription = req.body.description
        blog.htmlCode = req.body.htmlCode
        blog.cssCode = req.body.cssCode
        blog.jsCode = req.body.jsCode
        const updatedBlog = await blog.save()
        res.json({ message: "Blog updated", blog: updatedBlog })
    } else {
        res.status(404).send({ message: "Blog not found" })
    }
}))

blogRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        const deleteBlog = await blog.remove()
        res.status(200).json({ message: 'Blog Deleted', blog: deleteBlog })
    } else {
        res.status(404).send({ message: 'Blog Not Found' })
    }
}))

export default blogRouter