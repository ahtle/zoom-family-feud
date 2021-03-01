import React from 'react';
import Flex from '../components/Transition';

type Props = {
    state: any,
    startHeadsUp: () => void,
    answeredFirst: (index: number) => void,
    answeredFirstCorrect: () => void,
    answeredFirstWrong: () => void,
}

export default function ControlPanel (props: Props) {
    function headerText() {
        if (props.state.phase === 'HEADS_UP_INFO' || props.state.phase === 'HEADS_UP') {
            return 'HEADS UP!'
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST' || props.state.phase === 'SELECT_ANSWER') {
            return 'SURVEY SAY...'
        }
    }

    function instructionText() {
        if (props.state.phase === 'HEADS_UP_INFO') {
            return (
                <><strong>{props.state.teams[0].members[props.state.teams[0].member_turn]}</strong> and <strong>{props.state.teams[1].members[props.state.teams[1].member_turn]}</strong> will go head-to-head. When the question is revealed, fastest person to give an answer have the chance to control the board!</>
            )
        } else if (props.state.phase === 'HEADS_UP') {
            return 'Who answered first?';
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST') {
            let team = props.state.teams[props.state.teamTurn];
            return `Did ${team.members[team.member_turn]} answered right?`
        } else if (props.state.phase === 'SELECT_ANSWER') {
            return 'YAY! Select the answer above';
        }
    }

    function renderLeftBtn() {
        if (props.state.phase === 'HEADS_UP_INFO') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={props.startHeadsUp}>START!</button>
        } else if (props.state.phase === 'HEADS_UP') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.answeredFirst(0)}>{props.state.teams[0].members[props.state.teams[0].member_turn]}</button>
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={props.answeredFirstCorrect}>Yes!</button>
        }
    }

    function renderRightBtn() {
        if (props.state.phase === 'HEADS_UP') {
            return <button className="py-4 px-6 bg-blue-400 rounded-xl m-4 w-32" onClick={() => props.answeredFirst(1)}>{props.state.teams[1].members[props.state.teams[1].member_turn]}</button>
        } else if (props.state.phase === 'HEADS_UP_ANSWERED_FIRST') {
            return <button className="py-4 px-6 bg-red-400 rounded-xl m-4 w-32" onClick={props.answeredFirstWrong}>No :(</button>
        }
    }

    return (
        <Flex in={props.state.phase !== 'SET_UP'}>
            <div id="control-panel" className="w-full grid grid-cols-4 gap-4">
                <div className="flex flex-col justify-around items-center">
                    <div className="w-full h-2/3 overflow-hidden flex justify-center">
                        <img src="/steve-harvey-2.png" width="200" alt="Steve Harvey"/>
                    </div>

                    <a className="bg-gradient-to-r from-pink-400 to-red-500 text-white px-8 py-2 rounded">Click to see answers in another window</a>
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