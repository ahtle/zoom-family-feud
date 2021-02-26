type Props = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SetupPanel ({onChange}: Props) {
    return (
        <div id="setup-panel" className="h-full flex flex-col justify-center items-center">
            <p className="text-3xl mb-4">Welcome to <span className="text-red-600">Family Feud</span> <span className="text-red-600">Zoom</span>!</p>
            <p className="text-xl mb-6">Start by selecting the number of players (excluding the host)</p>

            <select className="border border-gray-100 rounded px-4 py-2"
                onChange={onChange}
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
            </select>
        </div>
    )
}