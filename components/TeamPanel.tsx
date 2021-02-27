type Props = {
    teamName: string,
    members: Array<string>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

export default function TeamPanel (props: Props) {
    return (
        <div>
            <div className="flex justify-center items-center bg-blue-400 py-2">
                <p className="text-2xl text-yellow-400">{props.teamName}</p>
            </div>

            {props.members.map((member, index) => {
                return (
                    <input className="w-full my-2 p-2 rounded" type="text" placeholder="Player name" 
                        key={index}
                        onChange={e => props.onChange(e, index)}
                    />
                )
            })}
        </div>
    )
}