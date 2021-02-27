import { Team } from '../reducers/reducer'

type Props = {
    teamName: string,
    members: Array<string>,
    team: Team,
    phase: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

export default function TeamPanel (props: Props) {
    function renderTeam() {
        if (props.phase === 'SET_UP') {
            return props.members.map((member, index) => {
                return <input className="w-full my-2 p-2 rounded" type="text" placeholder="Player name" 
                    key={index}
                    value={member}
                    onChange={e => props.onChange(e, index)}
                />
            });
        } else {
            const List = props.team.members.map((member, index) => {
                return <p key={index} className="my-2 p-2 rounded bg-blue-500 text-white">{member}</p>
            });
            return (
                <div className="my-4">
                    {List}
                    <p className="my-4 p-2 rounded bg-gradient-to-r from-pink-400 to-red-500 text-white font-bold border-2 border-white text-center">{props.team.points}</p>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center bg-blue-500 py-2">
                <p className="text-2xl text-yellow-400">{props.teamName}</p>
            </div>

            {renderTeam()}
        </div>
    )
}