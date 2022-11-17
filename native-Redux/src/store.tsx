import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createSlice,
  configureStore,
  type PayloadAction,
  createSelector,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

// Fetched data interface
export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

// Fetch data
const pokemonApi = createApi({
  // Name for store reducer
  reducerPath: "pokemonApi",
  // General path
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  // Extended endpoints, base + endpoint (ie - /pokemon.json)
  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon[], undefined>({
      query: () => "pokemon.json",
    }),
  }),
});

export const usePokemonQuery = pokemonApi.endpoints.getPokemon.useQuery;

// Save the search input box state
const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

// setSearch reducer
export const { setSearch } = searchSlice.actions;

// Store config, needs middleware!
export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    pokemonApi: pokemonApi.reducer,
  },
  // Concat the api.middleware
  middleware: (getDefaultMiddleware)  => getDefaultMiddleware().concat(pokemonApi.middleware),
});

// Create a new type with the type returned from store.getState
export type RootState = ReturnType<typeof store.getState>;

// Create search selector with the type returned from the store type
export const selectSearch = (state: RootState) => state.search.search;

// 
store.dispatch(pokemonApi.endpoints.getPokemon.initiate(undefined));

export const selectPokemon = createSelector(
  (state: RootState) =>
    pokemonApi.endpoints.getPokemon.select(undefined)(state)?.data,
  (state: RootState) => state.search.search,
  (pokemon, search) =>
    (pokemon || [])
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 10)
      .sort((a, b) => a.name.localeCompare(b.name))
);
