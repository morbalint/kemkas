import React from 'react';
import './App.css';
import CreateCharacter from "./pages/CreateCharacter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <CreateCharacter />,
    },
]);

function App() {
  return (
      <div className='container'>
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
