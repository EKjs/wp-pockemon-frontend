import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

//import LoginContext from "./LoginContext";

const LeaderBoard = () => {

  const [leaderList, setLeaderList] = useState();
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState();

  useEffect(() => {
    const getLeaderBoard = async () => {
      setLoading(true);
      const { data: leaderes } = await axios.get(
        `${process.env.REACT_APP_POKEBACKEND_API}game/leaderboard`
      );
      setLeaderList(leaderes)
      setLoading(false);
    };
    getLeaderBoard();
  }, []);


  if (loading)
    return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
  /* if (error) return <>{error}</>; */
  return (
    <>
      <div className="col text-center">
        <h5>Leader board</h5>
        <div className="row">
          <div className="col">
            <h6>Player:</h6>
          </div>
          <div className="col">
            <h5>Wins</h5>
          </div>
        </div>
        
          {leaderList.map((leader,idx)=>(
            <div key={`leaderK${idx}`} className="row">
              <div className="col">
                {leader._id.name}
              </div>
              <div className="col">
                {leader.totalWins}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default LeaderBoard;
