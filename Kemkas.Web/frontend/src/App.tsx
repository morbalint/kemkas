import * as React from 'react';
import './App.css';
import {Faro} from "@grafana/faro-web-sdk";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import CreateCharacter from "./first-edition/pages/CreateCharacter";
import CharacterList from "./first-edition/pages/CharacterList";
import ErrorBoundary from "./shared/ErrorBoundary";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import {useState} from "react";
import {UserContext, userDefaults} from './shared/contexts/UserContext';
import CreateCharacter2E from "./second-edition/pages/CreateCharacter2E";

function App(props: {faro?: Faro}) {

    const [fetchedUser, setFetchedUser] = useState(userDefaults)

    if (fetchedUser.state === "not-started") {
        setFetchedUser({...fetchedUser, state: "loading"})
        fetch(`${window.location.origin}/api/User/me`)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                console.log(response)
            })
            .then(userNameResponse => {
                const userName = userNameResponse && userNameResponse.length  > 0 ? userNameResponse : null;
                setFetchedUser({
                    data: userName,
                    state: "finished"
                });
            })
            .catch(() => {
                setFetchedUser({
                    data: null,
                    state: "finished"
                })
            })
    }
    
    const router = createBrowserRouter([
        {
            path: "/",
            loader: () => fetchedUser.data == null ? redirect("/1e/karakter") : redirect("/karaktereim")
        },
        {
            path: "/karaktereim",
            element: <CharacterList />,
            loader: () => fetch(`${window.location.origin}/api/Character`),
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/1e",
            loader: () => redirect("/1e/karakter")
        },
        {
            path: "/1e/karakter",
            element: <CreateCharacter faro={props.faro} />,
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/1e/karakter/:id",
            element: <CreateCharacter faro={props.faro}/>,
            loader: args => fetch(`${window.location.origin}/api/Character1E/${args.params.id}`),
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/2e",
            loader: () => redirect("/2e/karakter")
        },
        {
            path: "/2e/karakter",
            element: <CreateCharacter2E />,
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/2e/karakter/:id",
            element: <CreateCharacter faro={props.faro}/>,
            loader: args => fetch(`${window.location.origin}/api/Character2E/${args.params.id}`),
            ErrorBoundary: ErrorBoundary,
        },
    ]);
    
    return (
        <UserContext.Provider value={fetchedUser}>
            <Header/>
            <div className='container'>
                <RouterProvider router={router}/>
            </div>
            <Footer />
        </UserContext.Provider>
    );
}

export default App;
