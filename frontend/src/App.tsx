import * as React from "react";
import "./App.css";
import {Faro} from "@grafana/faro-web-sdk";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import CreateCharacter from "./first-edition/pages/CreateCharacter";
import CharacterList from "./shared/pages/CharacterList";
import ErrorBoundary from "./shared/ErrorBoundary";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import CreateCharacter2E from "./second-edition/pages/CreateCharacter2E";
import store, {AppDispatch, RootState} from './store'
import { Provider } from "react-redux"
import { useSelector, useDispatch } from 'react-redux'
import {load, setUser, unsetUser, userSelector} from './shared/domain-models/userSlice'

function Router(props: {faro?: Faro}) {
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const fetchedUser = useSelector.withTypes<RootState>()(userSelector)

    if (fetchedUser.state === "not-started") {
        dispatch(load())
        fetch(`${window.location.origin}/api/User/me`)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                console.log(response)
            })
            .then(userNameResponse => {
                if (userNameResponse && userNameResponse.length  > 0) {
                    dispatch(setUser(userNameResponse))
                } else {
                    dispatch(unsetUser())
                }

            })
            .catch(() => {
                dispatch(unsetUser())
            })
    }



    const router = createBrowserRouter([
        {
            path: "/",
            loader: () => fetchedUser.email == null ? redirect("/2e/karakter") : redirect("/karaktereim")
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
            element: <CreateCharacter2E faro={props.faro}/>,
            ErrorBoundary: ErrorBoundary,
        },
        {
            path: "/2e/karakter/:id",
            element: <CreateCharacter2E faro={props.faro}/>,
            loader: args => fetch(`${window.location.origin}/api/Character2E/${args.params.id}`),
            ErrorBoundary: ErrorBoundary,
        },
    ]);

    return (
        <div className='container'>
            <RouterProvider router={router}/>
        </div>
    )
}

function App(props: { faro?: Faro }) {

    return (
        <Provider store={store}>
            <Header/>
            <Router faro={props.faro} />
            <Footer />
        </Provider>
    );
}

export default App;
