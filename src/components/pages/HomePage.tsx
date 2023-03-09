import { Navigate, useNavigate } from "react-router-dom";
import pfp from "../.././pfp.png"
import { Button, Box } from '@mui/material';
import { useContext } from 'react';
import ActiveUserContext from '../../Contexts/ActiveUserContext';
import * as jwt from 'jsonwebtoken';
import roles from "../../config/Roles";

export default function HomePage() {
  type JWTType = {
    iss: string;
    exp: number;
  };
  const activeUserContext = useContext(ActiveUserContext);
  const navigate = useNavigate();
  const goToBlogPage = () => {
  navigate("/blogs");
}
const goToYourProfile = () => {
  navigate("/aboutMe");
}

const isLoggedIn = () => {
  let tokenString = localStorage.getItem('token');
  if (!tokenString) {
    console.error('no token found');
    return false;
  }
  tokenString = tokenString.replace('Bearer ', '');
  const token: JWTType = jwt.decode(tokenString) as JWTType;
  // Check if token does not exist or doesn't have an expiration claim or is expired.
  if (!token || !token.exp || token.exp < Date.now() / 1000) {
    return false;
  }
  return true;
};

const isAdmin = () => {
  return activeUserContext.checkRole("ADMIN")
}

const goToLoginPage = () => {
  navigate('/login')
}

const goToAdminPage = () => {
  navigate('/users')
}
  return (
    <>
    {!isLoggedIn() && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={goToLoginPage}>Login</Button>
      </div>
    )}

      {isAdmin() && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{}} onClick={goToAdminPage}>Admin Page</Button>
      </div>
      )}
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection={'column'}
    >
      <h1>Welcome to OurSpace</h1>
      <img src={pfp} alt="" />
      <button onClick={goToYourProfile} style={{textAlign: "center"}} id={"profile"}>your profile</button>
      <br /><br /><br /><br />
      <button onClick={goToBlogPage} id={"blogs"}>Blogs</button>
    </Box>
    </>
  );
}
