import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Use useHistory for navigation
import { Button } from './Button';
import '../css/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isloginned, setLoginStatus] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchInputRef = useRef(null);
  const history = useHistory(); // Initialize useHistory

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  var user = JSON.parse(localStorage.getItem('user-info'));

  const checkLogin = () => {
    var current = Math.round(Date.now() / 1000);

    if (user != null) {
      if (current > user.token.exp) {
        setLoginStatus(false);
        localStorage.removeItem('user-info');
      } else {
        setLoginStatus(true);
      }
    }
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener('resize', showButton);
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      // Redirect to a route based on the search query
      history.push(`/subjects/${searchQuery.toLowerCase()}`);
    }
  };

  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  window.onclick = function (event) {
    if (!event.target.matches('.circle') || event.target.parentNode.matches('.circle')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <Link to="/" className="navbar-logo">
            LetsProgramify
          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                {!button && <i className="fas fa-home"></i>} Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/courses' className='nav-links' onClick={closeMobileMenu}>
                {!button && <i className="fas fa-book"></i>} Courses
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/blog' className='nav-links' onClick={closeMobileMenu}>
                {!button && <i className="fas fa-blog"></i>} Blog
              </Link>
            </li>
          </ul>
          <div className='nav-menu-right'>
            {/* Search Icon and Input */}
            <i className="fas fa-search" onClick={handleSearchClick}></i>
            {isSearchActive && (
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress} // Handle Enter key
                placeholder="Search for courses..."
              />
            )}

            {/* Bell Icon */}
            <i className="far fa-bell"></i>

            {/* Login & Signup Buttons */}
            <Link to='/login' className='login-link'>
              {button && !isloginned && <Button buttonStyle="btn--secondary" to="/login">Login</Button>}
            </Link>
            <Link to='/signup' className='signup-link'>
              {button && !isloginned && <Button>Signup</Button>}
            </Link>

            {/* User Profile Dropdown */}
            <div className="dropdown">
              {isloginned && <button className="circle" onClick={myFunction}>{user.token.data.name[0]}</button>}
              {!isloginned && !button && <button className="circle" onClick={myFunction}><i className="fas fa-user"></i></button>}
              <div id="myDropdown" className="dropdown-content">
                {!isloginned && <Link to='/login' className='login-link'>Login</Link>}
                {!isloginned && <Link to='/signup' className='login-link'>Sign Up</Link>}
                {isloginned && <Link to='/instructor/mycourses' className='login-link'>Instructor</Link>}
                {isloginned && <Link to='/myaccount' className='login-link'>My Account</Link>}
                {isloginned && <Link to='/logout' className='login-link'>Logout</Link>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

