import type { RouteObject } from "react-router-dom";
import { pokemonsLoader } from "./pokemons";
import { pokemonModaLoader } from "./pokemons/pokemon-modal/index";

export const routes: RouteObject[] = [
  {
    path: "/remote",
    loader: () => "hola",
    lazy: () => import("../proof-routes/remote"),
    children: [
      {
        index: true,
        lazy: () => import("../proof-routes/remote.index"),
      },
      {
        path: "nested-remote-link",
        lazy: () => import("../proof-routes/remote.nested-remote-link"),
      },
      {
        path: "pokemons",
        loader: pokemonsLoader,
        lazy: () => import("../pokemon-routes/pokemon"),
        children: [
          {
            index: true,
            path: ":pokemon-name",
            loader: pokemonModaLoader,
            lazy: () => import("../pokemon-routes/pokemon.pokemon-modal"),
          },
        ],
      },
    ],
  },
];
