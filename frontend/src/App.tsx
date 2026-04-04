import * as React from "react";
import "./App.css";
import {Faro} from "@grafana/faro-web-sdk";
import {createBrowserRouter, LoaderFunctionArgs, Navigate, Outlet, redirect, RouterProvider} from "react-router-dom";
import CreateCharacter from "./first-edition/pages/CreateCharacter";
import CharacterList, {CharacterListItemDto} from "./shared/pages/CharacterList";
import ErrorBoundary from "./shared/ErrorBoundary";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import CreateCharacter2E from "./second-edition/pages/CreateCharacter2E";
import store, {AppDispatch, RootState} from './store'
import { Provider } from "react-redux"
import { useSelector, useDispatch } from 'react-redux'
import {load, setUser, unsetUser, userSelector} from './shared/domain-models/userSlice'
import {setCharacter} from "./second-edition/domain-models/characterSlice";
import {getJson, getText} from "./shared/api/http";
import {KarakterInputs} from "./first-edition/domain-models/karakter";
import {Karakter2E} from "./second-edition/domain-models/karakter2E";

const FaroContext = React.createContext<Faro | undefined>(undefined)

function RootLayout() {
    return (
        <>
            <Header />
            <div className='container'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

function IndexRedirect() {
    const fetchedUser = useSelector.withTypes<RootState>()(userSelector)

    if (fetchedUser.state !== "finished") {
        return null;
    }

    return <Navigate replace to={fetchedUser.email == null ? "/2e/karakter" : "/karaktereim"} />
}

function CreateCharacter1ERoute() {
    const faro = React.useContext(FaroContext)
    return <CreateCharacter faro={faro} />
}

function CreateCharacter2ERoute() {
    const faro = React.useContext(FaroContext)
    return <CreateCharacter2E faro={faro} />
}

function UserBootstrap() {
    const dispatch = useDispatch.withTypes<AppDispatch>()()
    const fetchedUser = useSelector.withTypes<RootState>()(userSelector)

    React.useEffect(() => {
        if (fetchedUser.state !== "not-started") {
            return;
        }

        let isCancelled = false;
        dispatch(load())
        getText("/api/User/me")
            .then(userNameResponse => {
                if (isCancelled) {
                    return;
                }

                if (userNameResponse && userNameResponse.length  > 0) {
                    dispatch(setUser(userNameResponse))
                } else {
                    dispatch(unsetUser())
                }
            })
            .catch(() => {
                if (isCancelled) {
                    return;
                }

                dispatch(unsetUser())
            })

        return () => {
            isCancelled = true;
        }
    }, [dispatch, fetchedUser.state])

    return null;
}

const loadCharacterList = () => getJson<CharacterListItemDto[]>("/api/Character")

const loadCharacter1E = ({params}: LoaderFunctionArgs) => getJson<KarakterInputs & { isPublic: boolean }>(`/api/Character1E/${params.id}`)

const loadCharacter2E = async ({params}: LoaderFunctionArgs) => {
    try {
        const loaded2Echaracter = await getJson<Karakter2E & { isPublic: boolean }>(`/api/Character2E/${params.id}`)
        store.dispatch(setCharacter(loaded2Echaracter))
        return loaded2Echaracter;
    } catch (error) {
        return {
            isPublic: false,
            error: error instanceof Error ? error.message : "Failed to load character",
        };
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <IndexRedirect />,
            },
            {
                path: "karaktereim",
                element: <CharacterList />,
                loader: loadCharacterList,
                ErrorBoundary: ErrorBoundary,
            },
            {
                path: "1e",
                loader: () => redirect("/1e/karakter")
            },
            {
                path: "1e/karakter",
                element: <CreateCharacter1ERoute />,
                ErrorBoundary: ErrorBoundary,
            },
            {
                path: "1e/karakter/:id",
                element: <CreateCharacter1ERoute />,
                loader: loadCharacter1E,
                ErrorBoundary: ErrorBoundary,
            },
            {
                path: "2e",
                loader: () => redirect("/2e/karakter")
            },
            {
                path: "2e/karakter",
                element: <CreateCharacter2ERoute />,
                ErrorBoundary: ErrorBoundary,
            },
            {
                path: "2e/karakter/:id",
                element: <CreateCharacter2ERoute />,
                loader: loadCharacter2E,
                ErrorBoundary: ErrorBoundary,
            },
        ],
    },
]);

function App(props: { faro?: Faro }) {

    return (
        <Provider store={store}>
            <FaroContext.Provider value={props.faro}>
                <UserBootstrap />
                <RouterProvider router={router}/>
            </FaroContext.Provider>
        </Provider>
    );
}

export default App;
