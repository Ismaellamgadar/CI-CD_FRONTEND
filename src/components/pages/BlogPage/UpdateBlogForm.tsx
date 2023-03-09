import React, { useContext, useEffect, useState } from 'react'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import BlogService from '../../../Services/BlogService';
import { useNavigate, useParams } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import Paper from '@mui/material/Paper';
import { Blog } from '../../../types/models/Blog.model';

const UpdateBlogForm = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const paperStyle = {
    padding: 25,
    width: 850,
    margin: '20px auto',
  };
  return (
    <div>
      <Paper style={paperStyle}>
          <div>
            <Formik
            initialValues={{title: "", text: "", category: ""}}
            onSubmit={(values) => {
              BlogService.updateBlog(String(id), {title: String(values.title), text: String(values.text), category: String(values.category)})
              .then((response) => {
                navigate( '/blogs', {replace: true} )
                console.log(values)
              })
            }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h1>BlogForm</h1>
                  <label>Title</label>
                  <Field type="title" name="title" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="Errormessage" 
                    /><br />
                  <label>Text</label>
                  <Field type="text" name="text" />
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="Errormessage" 
                    /><br />
                  <label>Category</label>
                  <Field type="category" name="category" />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="Errormessage" 
                  />
                  <br />
                  <button type='submit'>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Paper>
    </div>
  )
}

export default UpdateBlogForm