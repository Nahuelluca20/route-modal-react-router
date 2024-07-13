import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// routes
import Info, { infoLoader } from "./routes/info/index.tsx";
import Pokemons, { pokemonsLoader } from "./routes/pokemons/index.tsx";
import PokemonModal, {
  pokemonModaLoader,
} from "./routes/pokemons/pokemon-modal/index.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
