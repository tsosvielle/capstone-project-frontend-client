import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Link className="option" href="#change-password">Change Password</Nav.Link>
    <Nav.Link className="option" href="#sign-out">Sign Out</Nav.Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Nav.Link className="option" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="option" href="#sign-in">Sign In</Nav.Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <Navbar collapseOnSelect bg="primary" expand="md" variant="dark">
      <Navbar.Brand href="#">HOME</Navbar.Brand>
      <Nav className="conservator-title">Conservator</Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span className="text-light pt-2 pr-2">Welcome, {user.email}</span>}
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
)

export default Header
