import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/signin">Sign In</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
