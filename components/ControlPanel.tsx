import React, {Dispatch } from 'react';
import Flex from '../components/Transition';

type Props = {
    state: any,
    dispatch: Dispatch<{type: string; payload?: any}>
}

export default function ControlPanel (props: Props) {
    let activeTeam = props.state.teams[props.state.teamTurn];
    let activeMember = activeTeam.members[activeTeam.member_turn];

    function headerText() {
        if (props.state.phase === 'HEADS_UP_INFO' || props.state.phase === 'HEADS_UP') {
            return 'HEADS UP!';
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST' || props.state.phase === 'SELECT_ANSWER') {
            return 'SURVEY SAY...';
        } else if (props.state.phase === 'WAIT_FOR_ANSWER') {
            return `${activeMember}'s TURN!`
        } else if (props.state.phase === 'SHOW_X' || props.state.phase === 'STEAL_SHOW_X') {
            return `OOPS...`
        } else if (props.state.phase === 'STEAL') {
            let team = props.state.teamTurn === 0 ? props.state.teams[1] : props.state.teams[0];
            return `${team.name}'S CHANGE TO STEAL THE BOARD`;
        } else if (props.state.phase === 'STEAL_WAIT_FOR_ANSWER') {
            return `SELECT ANSWER ABOVE`;
        } else if (props.state.phase === 'END_ROUND') {
            let teamWon = props.state.teams[0].points  > props.state.teams[1].points ? 'TEAM ONE' : 'TEAM TWO';
            return `${teamWon} WON THE ROUND!`;
        } else if (props.state.phase === 'END_GAME') {
            let teamWon = props.state.teams[0].roundsWon  > props.state.teams[1].roundsWon ? 'TEAM ONE' : 'TEAM TWO';
            return `CONGRATULATION ${teamWon}!`
        }
    }

    function instructionText() {
        if (props.state.phase === 'HEADS_UP_INFO') {
            return (
                <><strong>{props.state.teams[0].members[props.state.teams[0].member_turn]}</strong> and <strong>{props.state.teams[1].members[props.state.teams[1].member_turn]}</strong> will go head-to-head. When the question is revealed, fastest person to give an answer have the chance to control the board!</>
            )
        } else if (props.state.phase === 'HEADS_UP') {
            return 'Who answered first?';
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST' || props.state.phase === 'WAIT_FOR_ANSWER') {
            return `Did ${activeMember} answered right?`
        } else if (props.state.phase === 'SELECT_ANSWER') {
            return 'YAY! Select the answer above';
        } else if (props.state.phase === 'STEAL') {
            let team = props.state.teamTurn === 0 ? props.state.teams[1] : props.state.teams[0];
            return `Answer as a team. Did ${team.name} answered correctly?`;
        } else if (props.state.phase === 'END_ROUND') {
            if (props.state.questionIndex < 1)
                return `Ready for round 2?`;
            return `Ready for last round?`;
        } else if (props.state.phase === 'END_GAME') {
            let team = props.state.teams[0].roundsWon  > props.state.teams[1].roundsWon ? props.state.teams[0] : props.state.teams[1];
            return `${team.name} won ${team.roundsWon} rounds`;
        }
    }

    function imagePath () {
        if (props.state.phase === 'SELECT_ANSWER') {
            return '/steve-harvey-1.png';
        }
        return '/steve-harvey-2.png';
    }

    function renderLeftBtn() {
        if (props.state.phase === 'HEADS_UP_INFO') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'HEADS_UP'})}>START!</button>
        } else if (props.state.phase === 'HEADS_UP') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'HEADS_UP_ANSWERED_FIRST', payload: 0})}>{props.state.teams[0].members[props.state.teams[0].member_turn]}</button>
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST' || props.state.phase === 'WAIT_FOR_ANSWER') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'ANSWERED_CORRECT'})}>Yes!</button>
        } else if (props.state.phase === 'STEAL') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'STEAL_ANSWERED_CORRECT'})}>Yes!</button>
        } else if (props.state.phase === 'END_ROUND') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'START_NEXT_ROUND'})}>START!</button>
        } else if (props.state.phase === 'END_GAME') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'RESTART'})}>PLAY AGAIN!</button>
        }
    }

    function renderRightBtn() {
        if (props.state.phase === 'HEADS_UP') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'HEADS_UP_ANSWERED_FIRST', payload: 1})}>{props.state.teams[1].members[props.state.teams[1].member_turn]}</button>
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST') {
            return <button className="py-4 px-6 bg-red-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'HEADS_UP_WRONG'})}>No :(</button>
        }  else if (props.state.phase === 'WAIT_FOR_ANSWER') {
            return <button className="py-4 px-6 bg-red-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'ANSWERED_WRONG'})}>No :(</button>
        } else if (props.state.phase === 'STEAL') {
            return <button className="py-4 px-6 bg-red-400 rounded-xl m-4 w-32" onClick={() => props.dispatch({type: 'STEAL_ANSWERED_WRONG'})}>No :(</button>
        }
    }

    if (props.state.questions.length > 0) {
        return (
            <Flex in={props.state.phase !== 'SET_UP'}>
                <div id="control-panel" className="w-full grid grid-cols-4 gap-4">
                    <div className="flex flex-col justify-between items-center">
                        <div className="flex justify-center overflow-hidden">
                            <img src={imagePath()} width="150" alt="Steve Harvey"/>
                        </div>
    
                        <a className=" bg-gradient-to-r from-pink-400 to-red-500 text-white px-4 py-2 rounded" href={`/questions/${props.state.questions[props.state.questionIndex].id}`} target="_blank">Click to see answers in another window</a>
                    </div>
    
                    <div className="col-span-3 bg-white rounded-2xl p-2 text-center flex flex-col justify-between">
                        <div>
                            <p className="text-yellow-500 text-xl mb-4">{headerText()}</p>
                            <p className="text-lg">{instructionText()}</p>
                        </div>
    
                        <div>
                            {renderLeftBtn()}
                            {renderRightBtn()}
                        </div>
                    </div>
                </div>
            </Flex>
        )
    }
    return null;
}