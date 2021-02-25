type Props = {
    teamName: String
}

export default function MainHeader (props: Props) {
    return (
        <div className="flex justify-center items-center bg-blue-300 py-3">
            <p className="text-lg text-white">{props.teamName}</p>
        </div>
    )
}