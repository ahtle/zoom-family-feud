import Fade from '../components/Transition';

type Props = {
    in: boolean,
    defaultNumberOfPlayers: number,
    ready: boolean,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    onClick: () => void,
}

export default function SetupPanel (props: Props) {
    function readyButton() {
        return (
            <Fade in={props.ready}>
                <button className="mt-10 px-6 py-4 bg-red-500 border-4 border-yellow-300 rounded-lg text-white font-bold animate-wiggle"
                    onClick={props.onClick}
                >
                    START GAME!
                </button>
            </Fade>
        )
    }

    return (
        <Fade in={props.in}>
            <div id="setup-panel" className="h-full flex flex-col items-center">
                <div className="mt-40 text-center">
                    <p className="text-3xl mb-4">Welcome to <span className="text-red-600">Family Feud</span> <span className="text-red-600">Zoom</span>!</p>
                    <p className="text-xl mb-6">Start by selecting the number of players (excluding the host)</p>

                    <select className="border border-gray-100 rounded px-4 py-2"
                        onChange={props.onChange}
                        value={props.defaultNumberOfPlayers}
                    >
                    <option value={0}>Select one</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    </select>
                </div>

                {readyButton()}
            </div>
        </Fade>
    )
}