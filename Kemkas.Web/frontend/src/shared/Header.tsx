import * as React from "react";
import {useContext} from "react";
import axios from "axios";
import {Container, Nav, Navbar} from "react-bootstrap";
import { UserContext } from "./contexts/UserContext";

async function logout() {
    await axios.post("/Identity/Account/Logout")
    document.location.reload()
} 

function Header(props: {}) {

    const fetchedUser = useContext(UserContext);
    
    return <header>
        <Navbar expand="sm" className="navbar-light bg-white border-bottom box-shadow mb-3">
            <Container className="ps-4 pe-4">
                <Navbar.Brand href="/">Kemkas</Navbar.Brand>
                {fetchedUser.data != null && <Nav.Link className="text-dark" href="/karaktereim">Karaktereim</Nav.Link>}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-sm-inline-flex flex-sm-row-reverse">
                    <Nav>
                        {fetchedUser.state !== "finished" ? "Loading..." :
                            fetchedUser.data == null
                                ? <>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/Identity/Account/Register">Register</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/Identity/Account/Login">Login</a>
                                    </li>
                                </>
                                : <>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark"
                                           href="/Identity/Account/Manage">Hello {fetchedUser.data}!</a>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link nav text-dark" onClick={logout}>Logout</button>
                                    </li>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
}

export default Header;