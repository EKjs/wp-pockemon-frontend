import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import LoaderDots from "./LoaderDots";

//import LoginContext from "./LoginContext";

const CreateGame = () => {
  const hist = useHistory();
  const [userData, setUserData] = useState({
    userName: "",
    userId: "",
    token: "",
  });
  const [pokemonList, setPokemonList] = useState();
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [curPokemonData, setCurPokemonData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setUserData({
      userName: localStorage.getItem("userName"),
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    });
    const getPokemonList = async () => {
      setLoading(true);
      const { data: pokeDex } = await axios.get(
        `${process.env.REACT_APP_POKEBACKEND_API}pokemon/`
      );
      console.log(pokeDex);
      setPokemonList(pokeDex);
      setCurPokemonData(pokeDex[0]);
      setSelectedPokemon(pokeDex[0]._id);
      setLoading(false);
    };
    getPokemonList();
  }, []);

  const createGameClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const reqBody = { pokemonId: selectedPokemon };
      await axios.post(
        `${process.env.REACT_APP_POKEBACKEND_API}game/create`,
        reqBody,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      hist.push('/mygames')
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setLoading(false);
      } else {
        setError("Network error");
        setLoading(false);
      }
    }
  };

  const changePokemon = (e) => {
    setSelectedPokemon(e.target.value);
    const pokData = pokemonList.find((item) => item._id === e.target.value);
    console.log(pokData);
    setCurPokemonData(pokData);
  };

  if (loading) return <LoaderDots />;
  if (error) return <>{error}</>;
  return (
    <>
      <div className="col">
        <h5 className='text-center'>Create game</h5>
        <div className="row">
          <div className="col">
          <h6>Choose your pokemon</h6>
            <form onSubmit={createGameClick}>
              <select className="form-select" onChange={changePokemon}>
                {pokemonList.map((pokemon) => (
                  <option key={`key${pokemon._id}`} value={pokemon._id}>
                    {pokemon.name.english}
                  </option>
                ))}
              </select>
                    <br/>
              <button className="btn btn-lg btn-warning" type="submit">
                Create game
              </button>
            </form>
          </div>
          <div className="col">
            <h5 className='text-center'>Type</h5>
            <ul>
              {curPokemonData.type.map((v, i) => (
                <li key={`lik${i}`}>{v}</li>
              ))}
            </ul>
            <h5 className='text-center'>Base</h5>
            <ul>
              <li>HP: {curPokemonData.base["HP"]}</li>
              <li>Attack: {curPokemonData.base["Attack"]}</li>
              <li>Defense: {curPokemonData.base["Defense"]}</li>
              <li>Sp. Attack: {curPokemonData.base["SpAttack"]}</li>
              <li>Sp. Defense: {curPokemonData.base["SpDefense"]}</li>
              <li>Speed: {curPokemonData.base["Speed"]}</li>
            </ul>
          </div>
        </div>
        <div className="row">
            <div className="col">
                
            </div>
        </div>
      </div>
    </>
  );
};
export default CreateGame;
