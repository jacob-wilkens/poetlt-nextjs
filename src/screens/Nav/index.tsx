import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { DarkModeMenu, DirectionsModal, StatsModal } from './components';

export const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg='dark' expand='sm' variant='dark'>
      <Container fluid>
        <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={() => setExpanded((prev) => !prev)} />
        <Navbar.Collapse in={expanded} id='basic-navbar-nav' className='mx-auto justify-content-center'>
          <Nav>
            <Nav.Item className={expanded ? 'mt-2' : ''}>
              <StatsModal />
            </Nav.Item>
            <Nav.Item>
              <DirectionsModal />
            </Nav.Item>
            <DarkModeMenu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
