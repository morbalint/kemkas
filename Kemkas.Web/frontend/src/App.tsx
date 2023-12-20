import React from 'react';
import './App.css';
import CreateCharacter from "./first-edition/pages/CreateCharacter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Faro} from "@grafana/faro-web-sdk";

function App(props: {faro?: Faro}) {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <CreateCharacter faro={props.faro} />,
        },
        {
            path: "/:id",
            element: <CreateCharacter faro={props.faro} />,
            loader: args => fetch(`/Character/${args.params.id}`)
        }
    ]);

    return (
        <div className='container'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
