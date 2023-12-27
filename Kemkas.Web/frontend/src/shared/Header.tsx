import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {Container, Nav, Navbar} from "react-bootstrap";

type LoadingState = "not-started" | "loading" | "finished"

async function logout() {
    await axios.post("/Identity/Account/Logout")
    document.location.reload()
} 

function Header(props: {}) {
    
    let [loading, setLoading] = useState("not-started" as LoadingState);
    let [userName, setUserName] = useState(null as string | null);

    if (loading === "not-started") {
        setLoading("loading");
        fetch('api/User/me')
            .then(response => {
                response.ok
                    ? response.text()
                        .then(userName => userName?.length > 0 ? setUserName(userName) : setUserName(null))
                    : console.log(response)
            })
            .finally(() => setLoading("finished"))
    }
    
    return <header>
        <Navbar expand="sm" className="navbar-light bg-white border-bottom box-shadow mb-3">
            <Container className="ps-4 pe-4">
                <Navbar.Brand href="/">Kemkas</Navbar.Brand>
                <Nav.Link className="text-dark" href="/karaktereim">Karaktereim</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-sm-inline-flex flex-sm-row-reverse">
                    <Nav>
                        {loading !== "finished" ? "Loading..." :
                            userName == null
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
                                           href="/Identity/Account/Manage">Hello {userName}!</a>
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