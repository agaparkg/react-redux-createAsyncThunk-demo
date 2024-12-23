import { Provider } from "react-redux";
import "./App.css";
import { ItemsList } from "./components/ItemsList-1";
import { store } from "./redux-store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ItemsList />
        {/* <SinglePokemon /> */}
        {/* <Pokemons /> */}
      </Provider>
    </>
  );
}

export default App;
