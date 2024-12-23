// Need to use the React-specific entry point to import createApi
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom wrapper around fetchBaseQuery to add a delay
const delayedBaseQuery = async (args, api) => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds
  return fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" })(args, api);
};
// const delayedBaseQuery = async (args, api, extraOptions) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds
//   return fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" })(
//     args,
//     api,
//     extraOptions
//   );
// };

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: delayedBaseQuery,
  //   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    // Second endpoint: Get all Pokémon (for example, the first 20)
    getAllPokemon: builder.query({
      query: (limit) => `pokemon/?offset=${limit}&limit=${limit}`, // Query URL to fetch a list of Pokémon
    }),

    // Third endpoint: Create a new Pokémon (assuming the API supports POST requests)
    createPokemon: builder.mutation({
      query: (newPokemon) => ({
        url: "pokemon", // URL endpoint for creating a new Pokémon
        method: "POST", // HTTP method
        body: newPokemon, // The data to send in the request body
      }),
    }),

    // Add more endpoints as needed...
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useCreatePokemonMutation,
  useGetAllPokemonQuery,
} = pokemonApi;
