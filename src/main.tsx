/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes
import Info, { infoLoader } from "./routes/info/index.tsx";
import Pokemons, { pokemonsLoader } from "./routes/pokemons/index.tsx";
import PokemonModal, {
  pokemonModaLoader,
} from "./routes/pokemons/pokemon-modal/index.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from "./routes/remoteRoutes.tsx";

import App from "./App.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...routes],
  },
  // {
  //   ...rootRoute,
  //   id: "root",
  //   path: "/",
  //   children: [...routes],
  // },
  {
    path: "/info",
    loader: infoLoader,
    element: <Info />,
  },
  {
    path: "/pokemons",
    loader: pokemonsLoader,
    element: <Pokemons />,
    children: [
      {
        path: ":pokemon-name",
        element: <PokemonModal />,
        loader: pokemonModaLoader,
      },
    ],
  },
  // {
  //   path: "pokemons/:pokemon-name",
  //   element: <PokemonModal />,
  //   loader: pokemonModaLoader,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
