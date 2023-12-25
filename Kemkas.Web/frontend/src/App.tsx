import * as React from 'react';
import './App.css';
import {Faro} from "@grafana/faro-web-sdk";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateCharacter from "./first-edition/pages/CreateCharacter";
import CharacterList from "./first-edition/pages/CharacterList";
import ErrorBoundary from "./shared/ErrorBoundary";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

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

    
    return (
        <>
            <Header/>
            <div className='container'>
                <RouterProvider router={router}/>
            </div>
            <Footer />
        </>
    );
}

export default App;
