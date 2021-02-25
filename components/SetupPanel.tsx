export default function MainHeader () {
    return (
        <div id="setup-panel" className="h-full flex flex-col justify-center items-center">
            <p className="text-3xl mb-4">Welcome to <span className="text-red-600">Family Feud</span> <span className="text-red-600">Zoom</span>!</p>
            <p className="text-xl mb-6">Start by selecting the number of players (excluding the host)</p>

            <select className="border border-gray-100 rounded px-4 py-2">
              <option>Select one</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
        </div>
    )
}