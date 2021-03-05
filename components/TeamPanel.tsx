import { Team } from '../reducers/reducer';
import Fade from './Transition';

type Props = {
    members: Array<string>,
    team: Team,
    phase: string,
    teamTurn: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

export default function TeamPanel (props: Props) {
    function renderInputs() {
        return (
            <Fade
                in={props.phase === 'SET_UP'}
                >
                    <div>
                        {props.members.map((member, index) => {
                            return (
                                <input className="w-full my-2 p-2 rounded" type="text" placeholder="Player name" 
                                    key={index}
                                    value={member}
                                    onChange={e => props.onChange(e, index)}
                                />
                                )
                            })}
                    </div>
            </Fade> 
        )
    }

    function activePlayer(index: number) {
        if (props.phase === 'HEADS_UP_INFO' || props.phase === 'HEADS_UP') {
            if (props.team.member_turn === index) {
                return 'border-4 border-red-500';
            }
        } else if (props.phase === 'STEAL' || props.phase === 'STEAL_WAIT_FOR_ANSWER') {
            if (!props.teamTurn) {
                return 'border-4 border-red-500';
            }
        } else {
            if (props.teamTurn) {
                if (props.team.member_turn === index) {
                    return 'border-4 border-red-500';
                }
            }
        }

    }

    function renderPlayers() {
        return (
            <Fade
                in={props.phase !== 'SET_UP'}
            >
                <div className="my-4">
                    {props.team.members.map((member, index) => {
                        return <p key={index} className={`${activePlayer(index)} my-2 p-2 rounded bg-blue-500 text-white`}>{member}</p>
                    })}
                    <p className="my-4 p-2 rounded bg-gradient-to-r from-pink-400 to-red-500 text-white font-bold border-2 border-white text-center">{props.team.points}</p>
                </div>
            </Fade>
        )
    }

    return (
        <div>
            <div className="flex justify-center items-center bg-blue-500 py-2">
                <p className="text-2xl text-yellow-400">{props.team.name}</p>
            </div>

            {renderInputs()}
            {renderPlayers()}
        </div>
    )
}