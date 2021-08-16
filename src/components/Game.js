import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "react-loader-spinner";
import axios from "axios";

const Game = () => {
    const {gameId} = useParams();
    const [gameOverInfo,setGameOverInfo] = useState(null);
    const [curGameStatus,setCurGameStatus] = useState();
    const [gameInfo,setGameInfo] = useState();
    const [loading,setLoading] = useState(true);
   // const [error,setError] = useState();


    useEffect(()=>{
        const getPlayerInformation = async () => {
            setLoading(true);
            //get information about the game, players and pokemons
            const {data:info} = await axios.get(
                `${process.env.REACT_APP_POKEBACKEND_API}game/info/${gameId}`,
                {
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
              );
            setGameInfo(info);
            console.log('got game info',info);
            
            const {data:gStat} = await axios.get(
                `${process.env.REACT_APP_POKEBACKEND_API}game/getmoves/${gameId}`,
                {
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
              );
            setCurGameStatus(gStat);
            console.log('game status',gStat);

            setLoading(false);
        }
        getPlayerInformation();
    
    },[gameId]);

    const makeMove = async () => {
        setLoading(true);
        const {data:resp} = await axios.get(
            `${process.env.REACT_APP_POKEBACKEND_API}game/makemove/${gameId}`,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );
          console.log('new game status',resp);
          if (resp.winner && resp.looser && resp.gameId){ //game is over
            setGameOverInfo(resp[0]);
            console.log('gameover');
        }else{
            setCurGameStatus(resp);
        }
        setLoading(false);
    };

    const refreshMoves = async () => {
        setLoading(true);
        const {data:gStat} = await axios.get(
            `${process.env.REACT_APP_POKEBACKEND_API}game/getmoves/${gameId}`,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );
        if (gStat[0].winner && gStat[0].looser && gStat[0].gameId){ //game is over
            console.log('gameover');
            setGameOverInfo(gStat[0]);
        }else{
            setCurGameStatus(gStat);
        }
        setLoading(false);
        console.log(gameOverInfo);
        console.log('refr',gStat[0]);
    }

    if (loading)return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
    /* if (error)return <>{error}</> */
    if (gameOverInfo)return (
    <div className='col'>
        <h4 className='text-center'>Game is over!</h4>
        <div className='row mt-5'>
            <div className='col text-center'>
                <h4>Winner: {gameOverInfo.winner.name}</h4>
                <h5>his pokemon: {gameOverInfo.winnerPokemon.name.english}</h5>
                <p>points: <span className='text text-danger'>{gameOverInfo.winnerPoints}</span></p>
            </div>
            <div className='col text-center'>
                <h4>Game finished on: {new Date(gameOverInfo.date).toLocaleString()}</h4>
                <h5>Total moves made: {gameOverInfo.totalMoves}</h5>
            </div>
            <div className='col text-center'>
                <h4>Looser: {gameOverInfo.looser.name}</h4>
                <h5>his pokemon: {gameOverInfo.looserPokemon.name.english}</h5>
                <p>points: <span className='text text-danger'>{gameOverInfo.looserPoints}</span></p>
            </div>
        </div>
    </div>
    )

    return (
    <div className='col'>
        <div className='row mt-5'>
            <div className='col text-center'>
                <h4>{gameInfo.playerOne.name} {localStorage.getItem("userId")===gameInfo.playerOne._id && "(you)"}</h4>
                <h5>pokemon: {gameInfo.pokemonOne.name.english}</h5>
                <p>points: <span className='text text-danger'>{curGameStatus.pointsOne}</span></p>
            </div>
            <div className='col text-center'>
                {curGameStatus.nextMove===localStorage.getItem("userId") ? 
                <button className='btn btn-primary mb-3' onClick={makeMove}>Attack!</button> : 
                <button className='btn btn-info mb-3' onClick={refreshMoves}>Refresh</button>} 
                
                <h5>Next move: {curGameStatus.nextMove===localStorage.getItem("userId") ? "You" : "Enemy"} </h5>
                <p>Last points: <span className='text text-danger'>{curGameStatus.rolled}</span></p>
            </div>
            <div className='col text-center'>
                <h4>{gameInfo.playerTwo.name} {localStorage.getItem("userId")===gameInfo.playerTwo._id && "(you)"}</h4>
                <h5>pokemon: {gameInfo.pokemonTwo.name.english}</h5>
                <p>points: <span className='text text-danger'>{curGameStatus.pointsTwo}</span></p>
            </div>
        </div>
    </div>
    )
}
export default Game