import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router";
import Modal from "react-bootstrap/Modal";
import { Suspense } from "react";

type pokemonData = {
  capture_rate: number;
  is_legendary: boolean;
  is_mythical: boolean;
  color: string;
};

interface IPokemonData {
  name: string | undefined;
  info: pokemonData;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function pokemonModaLoader({
  params,
}: LoaderFunctionArgs): Promise<ReturnType<typeof defer>> {
  await sleep(3000);
  const pokemonName = params["pokemon-name"];
  const pokemonInfo = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
  )
    .then((response) => response.json())
    .then((data) => ({
      capture_rate: data.capture_rate,
      is_legendary: data.is_legendary,
      is_mythical: data.is_mythical,
      color: data.color.name,
    }));

  return defer({
    name: pokemonName,
    info: pokemonInfo,
  });
}

export default function PokemonModal() {
  const navigation2 = useNavigation();
  console.log(navigation2);
  const navigation = useNavigate();
  const handleClose = () => navigation(-1);
  const pokemon = useLoaderData() as IPokemonData;

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data abount {pokemon.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<p>Loading package location...</p>}>
            <Await
              resolve={pokemon.info}
              errorElement={<p>Error loading package location!</p>}
            >
              <h4>See Pokemon Info:</h4>
              <ul className="p-0">
                <li>
                  <b>Capture rate:</b> {pokemon.info.capture_rate}
                </li>
                <li>
                  <b>Color:</b> {pokemon.info.color}
                </li>
                <li>
                  <b>Is Legendary:</b>{" "}
                  {pokemon.info.is_legendary ? "Yes" : "No"}
                </li>
                <li>
                  <b>Is Mysthical:</b> {pokemon.info.is_mythical ? "Yes" : "No"}
                </li>
              </ul>
            </Await>
          </Suspense>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
