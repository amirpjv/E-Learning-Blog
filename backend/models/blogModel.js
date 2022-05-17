import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    blogName: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    blogSubDescription: {
      type: String,
      required: true,
    },
    blogDescription: {
      type: String,
      required: true,
    },
    htmlCode: {
      type: String,
    },
    cssCode: {
      type: String,
    },
    jsCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
