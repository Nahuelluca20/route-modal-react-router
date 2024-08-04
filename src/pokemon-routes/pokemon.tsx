import { Link, Outlet, useLoaderData } from "react-router-dom";

type Pokemon = {
  name: string;
  url: string;
};

interface IPokemons {
  pokemons: Pokemon[];
}

export function Component() {
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
