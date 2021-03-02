import { FC, useContext, useState, useEffect } from 'react';
import TeamPanel from '../components/TeamPanel';
import SetupPanel from '../components/SetupPanel';
import GamePanel from '../components/GamePanel';
import ControlPanel from '../components/ControlPanel';
import { AppContext } from '../contexts/AppContext';

const Home: FC = () => {
  
  // methods
  function setTeamOnePlayer(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    let newArr = teamOne.slice();
    newArr[index] = e.target.value;
    setTeamOne(newArr);
  }

  function setTeamTwoPlayer(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    let newArr = teamTwo.slice();
    newArr[index] = e.target.value;
    setTeamTwo(newArr);
  }

  const startGameClick = async () => {
    let res = await fetch('/api/questions');
    const questions = await res.json();
    dispatch({type: 'START_GAME', payload: {teamOne, teamTwo, questions}});
  }

  // global state
  const {state, dispatch} = useContext(AppContext);

  // local state
  const [numberOfPlayers, setNumberOfPlayers] = useState(3);
  const [teamOne, setTeamOne] = useState(['a', 'b']);
  const [teamTwo, setTeamTwo] = useState(['c']);
  const [ready, setReady] = useState(false);

  // initiate team members
  useEffect(() => {
    let team_one_number = Math.floor(numberOfPlayers / 2);
    let team_two_number = Math.floor(numberOfPlayers / 2);
    if (team_one_number + team_two_number < numberOfPlayers) {
        team_one_number++;
    }

    let arr1 = [];
    let arr2 = [];
    for (let i = 0; i < team_one_number; i++) {
      if (i < teamOne.length) {
        arr1.push(teamOne[i]);
      } else {
        arr1.push('');
      }
    }
    for (let i = 0; i < team_two_number; i++) {
      if (i < teamTwo.length) {
        arr2.push(teamTwo[i]);
      } else {
        arr2.push('');
      }
    }
    setTeamOne(arr1);
    setTeamTwo(arr2);

    if (numberOfPlayers === 0) {
      setReady(false);
    }
  }, [numberOfPlayers]);

  // check all player have name
  useEffect(() => {
    if (numberOfPlayers > 0) {
      let ready = true;

      teamOne.forEach(name => {
        if (name === '') {
          ready = false;
        }
      });
      teamTwo.forEach(name => {
        if (name === '') {
          ready = false;
        }
      });
      setReady(ready);
    }
  }, [teamOne, teamTwo]);

  return (
    <div id="home-page" className="bg-yellow-100">
      <div className="grid grid-cols-6 gap-2 min-h-90vh">

        {/* left column */}
        <div className="border-8 border-yellow-900 bg-yellow-50 p-2">
          <TeamPanel
            teamName="TEAM ONE"
            members={teamOne}
            onChange={setTeamOnePlayer}
            phase={state.phase}
            team={state.teams[0]}
            teamTurn={state.teamTurn === 0}
          />
        </div>

        {/* middle column */}
        <div className="col-span-4 flex flex-col justify-between">
          <div className="h-2/3">

            <SetupPanel 
              in={state.phase === 'SET_UP'}
              defaultNumberOfPlayers={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(parseInt(e.target.value))}
              onClick={startGameClick}
              ready={ready}
            />

            <GamePanel
              in={state.phase !== 'SET_UP'}
              phase={state.phase}
              answeredNames={state.answeredNames}
              question={state.questions[state.questionIndex]}
              answerClicked={(answer) => dispatch({type: 'PROCESS_ANSWER', payload: answer})}
            />



          </div>

          <div className="h-1/3 bg-gray-700 p-4 flex">
            <ControlPanel
              state={state}
              startHeadsUp={() => dispatch({type: 'HEADS_UP'})}
              answeredFirst={(index) => dispatch({type: 'HEADS_UP_ANSWERED_FIRST', payload: index})}
              answeredCorrect={() => dispatch({type: 'ANSWERED_CORRECT'})}
              answeredFirstWrong={() => dispatch({type: 'HEADS_UP_WRONG'})}
            />
          </div>
        </div>

        {/* right column */}
        <div className="border-8 border-yellow-900 bg-yellow-50 p-2">
          <TeamPanel
            teamName="TEAM TWO"
            members={teamTwo}
            onChange={setTeamTwoPlayer}
            phase={state.phase}
            team={state.teams[1]}
            teamTurn={state.teamTurn === 1}
          />
        </div>

      </div>
    </div>
  )
};

export default Home