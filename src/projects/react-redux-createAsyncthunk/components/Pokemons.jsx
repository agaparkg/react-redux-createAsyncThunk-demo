import { useState } from "react";
import {
  useCreatePokemonMutation,
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
} from "../redux-store/services/pokemon";

const Pokemons = () => {
  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonByNameQuery("pikachu");
  const { data: allPokemon, isLoading: isLoadingAll } = useGetAllPokemonQuery();
  const [createPokemon] = useCreatePokemonMutation();
  const [newPokemon, setNewPokemon] = useState("");

  const handleCreatePokemon = async () => {
    const newPokemonData = { name: newPokemon }; // Example structure for new Pokemon
    await createPokemon(newPokemonData);
    setNewPokemon(""); // Reset the input after creating a new Pokémon
  };

  console.log("allPokemon", allPokemon);

  return (
    <div>
      <h1>Pokemon: {isLoading ? "Loading..." : pokemon?.name}</h1>
      {error && <p>Error: {error.message}</p>}

      <h2>All Pokemon</h2>
      {isLoadingAll ? (
        <p>Loading Pokémon...</p>
      ) : (
        <ul>
          {allPokemon?.results.map((poke) => (
            <li key={poke.name}>{poke.name}</li>
          ))}
        </ul>
      )}

      <div>
        <input
          type="text"
          value={newPokemon}
          onChange={(e) => setNewPokemon(e.target.value)}
          placeholder="Enter new Pokémon name"
        />
        <button onClick={handleCreatePokemon}>Create Pokémon</button>
      </div>
    </div>
  );
};

export default Pokemons;
