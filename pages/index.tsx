import React, { FC } from 'react'
import PageWithLayoutType from '../types/pageWithLayout'
import MainLayout from '../layouts/mainLayout'

const Home: FC = () => {
  return (
    <p>Home</p>
  )
}

;(Home as PageWithLayoutType).layout = MainLayout

export default Home