import { FC } from 'react'
import PageWithLayoutType from '../types/pageWithLayout'
import MainLayout from '../layouts/mainLayout'
import TeamPanel from '../components/TeamPanel'
import SetupPanel from '../components/SetupPanel'

const Home: FC = () => {
  return (
    <div id="home-page">
      <div className="grid grid-cols-6 gap-2 min-h-90vh">

        {/* left column */}
        <div className="border-8 border-yellow-900 bg-yellow-100 p-2">
          <TeamPanel
            teamName="TEAM ONE"
          />
        </div>

        {/* middle column */}
        <div className="col-span-4 flex flex-col justify-between">
          <div className="h-4/5">
            <SetupPanel />
          </div>

          <div className="h-32 bg-gray-700">
            <p></p>
          </div>
        </div>

        {/* right column */}
        <div className="border-8 border-yellow-900 bg-yellow-100 p-2">
          <TeamPanel
            teamName="TEAM TWO"
          />
        </div>


      </div>
    </div>
  )
};

(Home as PageWithLayoutType).layout = MainLayout

export default Home