import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Loader from "react-loader-spinner";

const FindGame = () => {
  const history = useHistory();
    
    const [gamesList,setGamesList] = useState();
    const [loading,setLoading] = useState(true);

    const [pokemonList,setPokemonList] = useState();
    const [selectedPokemon,setSelectedPokemon] = useState();
    const [curPokemonData,setCurPokemonData] = useState();
    const [error, setError] = useState();

    const joinGame = async (e) => {
      console.log(e.target.value);
      const gameId=e.target.value;
      const reqBody = {pokemonId:selectedPokemon}
      try {
            await axios.post(`${process.env.REACT_APP_POKEBACKEND_API}game/join/${gameId}`,reqBody,{
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}});
            history.push(`/play/${gameId}`)
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
          setLoading(false);
        } else {
          setError("Network error");
          setLoading(false);
        }
      }
    }
    const changePokemon = (e) => {
      setSelectedPokemon(e.target.value);
      const pokData = pokemonList.find(item=>item._id===e.target.value);
      console.log(pokData);
      setCurPokemonData(pokData);
  }

    useEffect(()=>{
        const getActiveGamesAndPokemonList = async () => {
          setLoading(true);
            const {data:games} = await axios.get( `${process.env.REACT_APP_POKEBACKEND_API}game/find`,{
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );
            console.log(games);
            setGamesList(games);

            const {data:pokeDex}= await axios.get(`${process.env.REACT_APP_POKEBACKEND_API}pokemon/`);
            setPokemonList(pokeDex);
            setCurPokemonData(pokeDex[0]);
            setSelectedPokemon(pokeDex[0]._id)
            console.log('pokedex',pokeDex);
            setLoading(false);
        }

        getActiveGamesAndPokemonList()
    },[]);

    if (loading)return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
    if (error)return <>{error}</>
    return (
  <div className="col">
    <h5 className='text-center'>Find and join a game</h5>
      <div className="row">
        <div className="col">
          <h6>Choose your pokemon</h6>
          <select className="form-select" onChange={changePokemon}>
                  {pokemonList.map(pokemon=>(
                      <option key={`key${pokemon._id}`} value={pokemon._id} >{pokemon.name.english}</option>
                  ))}
          </select>
        </div>
        <div className="col">
          <h5 className='text-center'>Type</h5>
          <ul>
              {curPokemonData.type.map((v,i)=><li key={`lik${i}`}>{v}</li>)}
          </ul>
          <h5 className='text-center'>Base</h5>
          <ul>
              <li>HP: {curPokemonData.base['HP']}</li>
              <li>Attack: {curPokemonData.base['Attack']}</li>
              <li>Defense: {curPokemonData.base['Defense']}</li>
              <li>Sp. Attack: {curPokemonData.base['SpAttack']}</li>
              <li>Sp. Defense: {curPokemonData.base['SpDefense']}</li>
              <li>Speed: {curPokemonData.base['Speed']}</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
        {gamesList.map(game=>(<div className="row"><hr/><div className="col">
        <h4>Player: {game.playerOne.name}</h4>
        <h4>his pokemon: {game.pokemonOne.name.english}</h4></div>
        <div className="col">
        <button className="btn btn-warning" value={game._id} onClick={joinGame}>Join</button>
        </div></div>))}
        </div>
      </div>
  </div>)
}
export default FindGame