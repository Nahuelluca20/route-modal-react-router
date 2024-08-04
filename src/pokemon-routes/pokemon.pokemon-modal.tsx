import { Await, useLoaderData, useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import { Suspense } from "react";

type PokemonData = {
  capture_rate: number;
  is_legendary: boolean;
  is_mythical: boolean;
  color: string;
};

interface IPokemonData {
  name: string | undefined;
  info: PokemonData;
}

const PokemonSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
  </div>
);

const PokemonInfo = ({ info }: { info: PokemonData }) => (
  <>
    <h4>See Pokemon Info:</h4>
    <ul className="p-0">
      <li>
        <b>Capture rate:</b> {info.capture_rate}
      </li>
      <li>
        <b>Color:</b> {info.color}
      </li>
      <li>
        <b>Is Legendary:</b> {info.is_legendary ? "Yes" : "No"}
      </li>
      <li>
        <b>Is Mythical:</b> {info.is_mythical ? "Yes" : "No"}
      </li>
    </ul>
  </>
);

export function Component() {
  const navigate = useNavigate();
  const handleClose = () => navigate(-1);
  const pokemon = useLoaderData() as IPokemonData;

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Data about {pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<PokemonSkeleton />}>
          <Await
            resolve={pokemon.info}
            errorElement={<p>Error loading pokemon information!</p>}
          >
            <PokemonInfo info={pokemon.info} />
          </Await>
        </Suspense>
      </Modal.Body>
    </Modal>
  );
}
