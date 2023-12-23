import React, {useEffect, useState} from 'react';
import './App.css';
import {Faro} from "@grafana/faro-web-sdk";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateCharacter from "./first-edition/pages/CreateCharacter";
import CharacterList from "./first-edition/pages/CharacterList";
import ErrorBoundary from "./shared/ErrorBoundary";

type LoadingState = "not-started" | "loading" | "finished"

function App(props: {faro?: Faro}) {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <CreateCharacter faro={props.faro} />,
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/karaktereim",
            element: <CharacterList faro={props.faro} />,
            loader: () => fetch(`api/Character`),
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/:id",
            element: <CreateCharacter faro={props.faro} />,
            loader: args => fetch(`api/Character/${args.params.id}`),
            ErrorBoundary: ErrorBoundary,
        }
    ]);
    
    let [loading, setLoading] = useState("not-started" as LoadingState);
    let [userName, setUserName] = useState(null as string | null);

    useEffect(() => {
        let ignore = false;
        if (loading === "not-started") {
            setLoading("loading");
            fetch('api/User/me')
                .then(response => {
                    if (response.ok) {
                        response.text()
                            .then((data) => data?.length > 0 ? setUserName(data) : setUserName(null))
                            .catch((err) => {
                                console.log(err)
                                !ignore && setUserName(null);
                            })
                    } else {
                        console.log(response)
                        !ignore && setUserName(null);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    !ignore && setUserName(null)
                })
                .finally(() => {
                    setLoading("finished"); 
                })
        }
        return () => {
            ignore = true
        }
    }, [loading, setLoading, userName, setUserName])
    
    return (
        <>
            <header>
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
            <div className='container'>
                <RouterProvider router={router}/>
            </div>
            <footer>
                <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                    A Kard és Mágiát Lux Gábor alkotta. A szerzői jogok őt illetik. Ez az oldal egy "rajongói
                    hozzájárulás", célja a Kard és Mágia népszerűsítése. Ha többet akarsz tudni a Kard és Mágiáról
                    látogass el a <a href="https://fomalhaut.lfg.hu/">hivatalos honlapjára</a>. A Kard és Mágia az Open
                    Gaming Licence 1.0a alatt lett kiadva, melynek szövege <a href="ogl.html">itt található</a>
                </div>
            </footer>
        </>
    );
}

export default App;
