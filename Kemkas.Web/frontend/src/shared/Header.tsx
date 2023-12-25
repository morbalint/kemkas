import * as React from "react";
import axios from "axios";
import {useState} from "react";

type LoadingState = "not-started" | "loading" | "finished"

function logout() {
    return axios.post("/Identity/Account/Logout?returnUrl=%2F")
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
        <nav
            className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container ps-4 pe-4">
                <a className="navbar-brand" href={userName == null ? "/" : "/karaktereim"}>Kemkas</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {loading !== "finished" ? "Loading..." :
                    userName == null
                        ? <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/Identity/Account/Register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/Identity/Account/Login">Login</a>
                                </li>
                            </ul>
                        </div>
                        : <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/Identity/Account/Manage">Hello {userName}!</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/Identity/Account/Logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                }
            </div>
        </nav>
    </header>
}

export default Header;