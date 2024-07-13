import { json, Outlet, useLoaderData } from "react-router";
import { Link } from "react-router-dom";

type Pokemon = {
  name: string;
  url: string;
};

interface IPokemons {
  pokemons: Pokemon[];
}

export async function pokemonsLoader() {
  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  )
    .then((data) => data.json())
    .then((data) => data.results);

  return json<IPokemons>({ pokemons: pokemons }, { status: 200 });
}

export default function Pokemons() {
  const { pokemons } = useLoaderData() as IPokemons;

  return (
    <section>
      <h2 className="text-2xl font-bold">See the first 20 pokemons</h2>
      <ul className="text-start list-disc pl-5">
        {pokemons.map((pokemon) => (
          <li className="my-2" key={pokemon.name}>
            <Link to={`${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </section>
  );
}
