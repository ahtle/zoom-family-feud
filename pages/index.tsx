import { FC, useContext, useState, useEffect } from 'react';
// import PageWithLayoutType from '../types/pageWithLayout';
// import MainLayout from '../layouts/MainLayout';
import TeamPanel from '../components/TeamPanel';
import SetupPanel from '../components/SetupPanel';
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

  function startGameClick() {
    dispatch({type: 'START_GAME', payload: {teamOne, teamTwo}});
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
    <div id="home-page">
      <div className="grid grid-cols-6 gap-2 min-h-90vh">

        {/* left column */}
        <div className="border-8 border-yellow-900 bg-yellow-100 p-2">
          <TeamPanel
            teamName="TEAM ONE"
            members={teamOne}
            onChange={setTeamOnePlayer}
            phase={state.phase}
            team={state.teams[0]}
          />
        </div>

        {/* middle column */}
        <div className="col-span-4 flex flex-col justify-between">
          <div className="h-4/5">
            <SetupPanel 
              defaultNumberOfPlayers={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(parseInt(e.target.value))}
              onClick={startGameClick}
              ready={ready}
            />
          </div>

          <div className="h-32 bg-gray-700">
          </div>
        </div>

        {/* right column */}
        <div className="border-8 border-yellow-900 bg-yellow-100 p-2">
          <TeamPanel
            teamName="TEAM TWO"
            members={teamTwo}
            onChange={setTeamTwoPlayer}
            phase={state.phase}
            team={state.teams[1]}
          />
        </div>

      </div>
    </div>
  )
};

// (Home as PageWithLayoutType).layout = MainLayout

export default Home