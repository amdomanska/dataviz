import {Navbar, Container, Nav, NavDropdown, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';

export const MyNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <Image src={logo} alt="Logo" height={75}/>
                </Navbar.Brand>
                {/*<Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
                {/*<Navbar.Collapse id="basic-navbar-nav">*/}
                {/*    <Nav className="me-auto">*/}
                {/*        <Nav.Link as={Link} to="/">Home</Nav.Link>*/}
                {/*        <Nav.Link as={Link} to="/link">Link</Nav.Link>*/}
                {/*        <NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                {/*            <NavDropdown.Item as={Link} to="/action/3.1">Action</NavDropdown.Item>*/}
                {/*            <NavDropdown.Item as={Link} to="/action/3.2">Another action</NavDropdown.Item>*/}
                {/*            <NavDropdown.Item as={Link} to="/action/3.3">Something</NavDropdown.Item>*/}
                {/*            <NavDropdown.Divider/>*/}
                {/*            <NavDropdown.Item as={Link} to="/action/3.4">Separated link</NavDropdown.Item>*/}
                {/*        </NavDropdown>*/}
                {/*    </Nav>*/}
                {/*</Navbar.Collapse>*/}
            </Container>
        </Navbar>
    )
}