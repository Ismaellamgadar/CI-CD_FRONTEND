import React, { useContext, useState } from 'react'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import BlogService from '../../../Services/BlogService';
import { useNavigate } from 'react-router-dom';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import Paper from '@mui/material/Paper';

import './BlogPage.css'

const AddBlogForm = () => {
  const navigate = useNavigate();
  const activeUserContext = useContext(ActiveUserContext);

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
              BlogService.createBlog( {title: values.title, text: values.text, author: activeUserContext.user!, category: values.category} )
              .then((response) => {
                navigate( '/blogs', {replace: true} )
              })
            }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h1>Write Blog</h1>

                  <h4>Title</h4>
                  <Field type="title" name="title" className="field" id="title"/>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="Errormessage" 
                    /><br />
                  <h4>Text</h4>
                  <Field type="text" name="text" className="textField" id="text"/>
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="Errormessage" 
                    /><br />
                  <h4>Category</h4>
                  <Field type="category" name="category" className="field" id="category"/>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="Errormessage" 
                  />
                  <br />
                  <br />
                  <br />
                  <button className='button' type='submit'>
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

export default AddBlogForm