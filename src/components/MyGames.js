import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

const MyGames = () => {
    const [gamesList,setGamesList] = useState();
    const [loading,setLoading] = useState(true);

    const loadMyGames = useCallback(()=>{
      const getMyGames = async () => {
        setLoading(true);
          const {data:games} = await axios.get( `${process.env.REACT_APP_POKEBACKEND_API}game/my`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
          console.log(games);
          setGamesList(games);
          setLoading(false);
      }
      getMyGames()
    },[])

    useEffect(()=>{
      loadMyGames();
    },[loadMyGames]);

const updateStatus = () => {
  loadMyGames()
}

    if (loading)return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
    //if (error)return <>{error}</>
    return (<>
    <div className='col'>
    {gamesList.map((game,idx)=>(<div key={`gmK${idx}`} className='row mt-4'>
    <div className='col'>
      <div className='row'>
        <div className='col text-center'> 
        <h5>Player 1: {game.playerOne.name}</h5>
          <h6>pokemon: {game.pokemonOne.name.english}</h6>
        </div>
        <div className='col text-center'> 
        <h3>VS</h3>
        {game.gameIsOver ? "Game over!" : game.playerTwo && game.pokemonTwo ? <Link className='btn btn-primary' to={`/play/${game._id}`}>Continue</Link> : 
        <>
        <button className='btn btn-info' onClick={updateStatus}>refresh</button>
        </> }
        </div>
        <div className='col text-center'> 
        <h5>Player 2: {game.playerTwo ? game.playerTwo.name : "<empty slot>"}</h5>
          <h6>pokemon: {game.pokemonTwo ? game.pokemonTwo.name.english : "<empty slot>"}</h6>
        </div>
      </div>
      <div className='row'>
        <div className='col'> 
        
        </div>
      </div>
    </div></div>
     ))}
    </div>

    </>)
}
export default MyGames