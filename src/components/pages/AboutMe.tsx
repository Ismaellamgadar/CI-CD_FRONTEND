import React, { useContext } from 'react'
import ActiveUserContext from '../../Contexts/ActiveUserContext';

const AboutMe = () => {
const activeUserContext = useContext(ActiveUserContext);
  return (
    <div>
        <h1>About me</h1>
        <h2>Name: {activeUserContext.user?.firstName} {activeUserContext.user?.lastName}</h2>
        <h2>e-Mail: {activeUserContext.user?.email}</h2>
        <h2>Role: {activeUserContext.user?.roles.map((role) => role.name + ", ")}</h2>
    </div>
  )
}

export default AboutMe