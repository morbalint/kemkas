import React from 'react';
import './App.css';
import CreateCharacter from "./pages/CreateCharacter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Faro} from "@grafana/faro-web-sdk";

function App(props: {faro?: Faro}) {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <CreateCharacter faro={props.faro} />,
        },
    ]);

    return (
        <div className='container'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
