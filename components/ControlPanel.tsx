import React from 'react';
import Flex from '../components/Transition';

type Props = {
    state: any,
    startHeadsUp: () => void,
    answeredFirst: (index: number) => void,
    answeredCorrect: () => void,
    answeredFirstWrong: () => void,
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
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={props.startHeadsUp}>START!</button>
        } else if (props.state.phase === 'HEADS_UP') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.answeredFirst(0)}>{props.state.teams[0].members[props.state.teams[0].member_turn]}</button>
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST' || props.state.phase === 'WAIT_FOR_ANSWER') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={props.answeredCorrect}>Yes!</button>
        }  
    }

    function renderRightBtn() {
        if (props.state.phase === 'HEADS_UP') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.answeredFirst(1)}>{props.state.teams[1].members[props.state.teams[1].member_turn]}</button>
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST'  || props.state.phase === 'WAIT_FOR_ANSWER') {
            return <button className="py-4 px-6 bg-red-400 rounded-xl m-4 w-32" onClick={props.answeredFirstWrong}>No :(</button>
        }
    }

    return (
        <Flex in={props.state.phase !== 'SET_UP'}>
            <div id="control-panel" className="w-full grid grid-cols-4 gap-4">
                <div className="flex flex-col justify-between items-center">
                    <div className="flex justify-center overflow-hidden">
                        <img src={imagePath()} width="150" alt="Steve Harvey"/>
                    </div>

                    <a className=" bg-gradient-to-r from-pink-400 to-red-500 text-white px-4 py-2 rounded">Click to see answers in another window</a>
                </div>

                <div className="col-span-3 bg-white rounded-2xl p-2 text-center flex flex-col justify-between">
                    <div>
                        <p className="text-yellow-500 text-xl mb-4">{headerText()} {props.state.phase}</p>
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