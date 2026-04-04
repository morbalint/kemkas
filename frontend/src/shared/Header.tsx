import * as React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {unsetUser, userSelector} from "./domain-models/userSlice";
import {AppDispatch, RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {postVoid} from "./api/http";

function Header() {

    const dispatch = useDispatch.withTypes<AppDispatch>()();
    const navigate = useNavigate();
    const fetchedUser = useSelector.withTypes<RootState>()(userSelector);

    const logout = async () => {
        await postVoid("/Identity/Account/Logout")
        dispatch(unsetUser())
        navigate("/")
    }
    
    return <header>
        <Navbar expand="sm" className="navbar-light bg-white border-bottom box-shadow mb-3">
            <Container className="ps-4 pe-4">
                <Navbar.Brand as={Link} to="/">Kemkas</Navbar.Brand>
                {fetchedUser.email != null && <Nav.Link as={Link} className="text-dark" to="/karaktereim">Karaktereim</Nav.Link>}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-sm-inline-flex flex-sm-row-reverse">
                    <Nav>
                        {fetchedUser.state !== "finished" ? "Loading..." :
                            fetchedUser.email == null
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
                                           href="/Identity/Account/Manage">Hello {fetchedUser.email}!</a>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="nav-link nav text-dark" onClick={logout}>Logout</button>
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