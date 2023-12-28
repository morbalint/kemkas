import * as React from 'react';
import './App.css';
import {Faro} from "@grafana/faro-web-sdk";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateCharacter from "./first-edition/pages/CreateCharacter";
import CharacterList from "./first-edition/pages/CharacterList";
import ErrorBoundary from "./shared/ErrorBoundary";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import {useState} from "react";
import {UserContext, userDefaults} from './shared/contexts/UserContext';

function App(props: {faro?: Faro}) {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <CreateCharacter faro={props.faro} />,
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/karaktereim",
            element: <CharacterList />,
            loader: () => fetch(`api/Character`),
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/:id",
            element: <CreateCharacter faro={props.faro}/>,
            loader: args => fetch(`api/Character/${args.params.id}`),
            ErrorBoundary: ErrorBoundary,
        }
    ]);
    
    const [fetchedUser, setFetchedUser] = useState(userDefaults)

    if (fetchedUser.state === "not-started") {
        setFetchedUser({...fetchedUser, state: "loading"})
        fetch('api/User/me')
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
