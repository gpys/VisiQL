import { ElevatorSharp } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/VisiQLLogo.png';
import styles from './scss/_index.scss';

const ProjectsPage = require('./ProjectsPage');

type NavbarProps = {
  isLoggedIn: Boolean;
  setCurrentUserId: Function;
  notSignedInPop: Boolean;
  setNotSignedInPop: Function;
};

const Navbar = ({
  isLoggedIn,
  setCurrentUserId,
  notSignedInPop,
  setNotSignedInPop,
}: NavbarProps) => {
  const navigate = useNavigate();

  const thisOrThat = () => {
    if (isLoggedIn) {
      return <Link to='/myprojects'>Projects</Link>;
    } else {
      return (
        <Link onClick={() => setNotSignedInPop(true)} to='/'>
          Projects
        </Link>
      );
    }
  };

  const signOut = async () => {
    try {
      setCurrentUserId('');
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigate('/logink');
    } catch (err) {
      console.log('error');
    }
  };
  const signInOut = () => {
    if (!isLoggedIn) {
      return <Link to='/login'>Sign In</Link>;
    } else {
      return (
        <Link to='/login' onClick={signOut}>
          Sign Out
        </Link>
      );
    }
  };
  // thisOrThat();
  return (
    <div id='navbar'>
      <img id='logo' src={logo} width='275px' height='92px' />
      <nav id='nav-menu'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>{thisOrThat()}</li>
          <li>
            <Button variant='outlined' size='large'>
              {signInOut()}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
