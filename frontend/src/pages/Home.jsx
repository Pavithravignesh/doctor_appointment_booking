import React from 'react'
import { Banner, Footer, Header, SpecialityMenu, TopDoctor } from '../components'

function Home() {
    return (
        <div>
            <Header />
            <SpecialityMenu />
            <TopDoctor />
            <Banner />
        </div>
    )
}

export default Home
