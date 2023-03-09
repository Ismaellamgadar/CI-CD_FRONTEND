import React, { useEffect } from 'react'
import { Blog } from '../../../types/models/Blog.model'
import BlogService from '../../../Services/BlogService';
import { useNavigate } from 'react-router-dom';

import './BlogPage.css'

import {
    Paper,
    Grid,
    TextField,
    Button,
    Typography,
    Link,
    Pagination,
  } from '@mui/material';
import { fontSize } from '@mui/system';
import { Form, Formik } from 'formik';

const BlogPage = () => {
    const paperStyle = {
        padding: 25,
        width: 850,
        margin: '20px auto',
    };
    const blogPaperStyle = {
        padding: 25,
        width: 700,
        margin: '20px auto',
    };
    const navigate = useNavigate();
    const [blogs, setBlog] = React.useState<Blog[]>([]);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    
    
    const goToForm = () => {
        navigate('/blogs/addBlog');
    }
    
    useEffect(() => {
        BlogService.getPageCount()
        .then((count: any) => setCount(count))
        .catch((error: any) => console.log(error));

        BlogService.findAll(page)
        .then((blogs: any) => setBlog(blogs.data))
        .catch((error: any) => console.log(error));
    }, [page])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value -1);
      };

  return (
    <div>
        <Paper  style={paperStyle}>
            <h1 style={{ textAlign: 'center'}}>Blogs</h1>
            <div style={{textAlign: 'center'}}>
            <button className="button" onClick={goToForm} id="addblog">add blog</button>
            </div>
            <br />
            {blogs.map((blog : Blog) => {
                return <div style={{textAlign: 'left'}}>
                    <Paper style={blogPaperStyle}>
                    <h2>{blog.title}</h2>
                    <h4>{blog.category}</h4>
                    <h3>{blog.text}</h3>
                    <h4>{blog.author.lastName}, {blog.author.firstName}</h4>
                    <Formik
                    initialValues={{}}
                    onSubmit={() => {
                      BlogService.deleteBlog(blog.id)
                        .then(() => {
                          window.location.reload();
                        });
                    }}>
                    {() => (
                      <Form>
                        <button type="submit">
                          Delete
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <Formik
                    initialValues={{}}
                    onSubmit={() => {
                      navigate(`/blogs/${blog.id}`)
                    }}>
                    {() => (
                      <Form>
                        <button type="submit">
                          Update
                        </button>
                      </Form>
                    )}
                    </Formik> 
                    <br />
                </Paper></div>
            })}
        </Paper>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2vh"}}>
        <Pagination count={count} page={page + 1} onChange={handleChange} />
        </div>
    </div>
  )
}

export default BlogPage