import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <img
          width={100}
          height={100}
          src={viteLogo}
          className="w-[100px] h-[100px] mx-auto"
          alt="Vite logo"
        />
      </div>
      <h1 className="mt-2 mb-5">React Router Modals</h1>
      <Link to={"/pokemons"}>See pokemons</Link>
    </>
  );
}

export default App;
