import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar'
import dynamic from 'next/dynamic'
import { GetAllTeams } from './../service/teamService'
import Loader from '../components/Loader/Loader'
import Info from '../components/Team/Info'
// import Slider from '../components/Slider/Slider'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Slider/Slider'),
  { ssr: false }
)

export default function Home({ teams }) {
  const [loaded, setLoaded] = useState(false)
  const [nbaTeams, setNbaTeams] = useState([])
  const [currentTeam, setCurrentTeam] = useState(0)
  const [user, setUser] = useState({})

  // -------------- authentification ----------------------
  const [openAuthModal, setOpenAuthModal] = useState(false)

  const HandleCurrentTeamChange = (index) => {
    setCurrentTeam(nbaTeams[index]._id)
  }

  const HandleCardClick = (id) => {
    console.log('team id -> ', id)
  }
  useEffect(() => {
    if (teams != undefined && teams.length > 0) {
      setNbaTeams(teams)
      setCurrentTeam(teams[0]._id)
      setLoaded(true)
    }
  }, [teams])

  const handleSubmit = (obj) => {
    console.log('Object -> ', object)
  }
  return (
    <>
      <Head>
        <title>NBA_fantasy</title>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossorigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/nba_1.png" />
      </Head>
      <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
        <Navbar
          handleOpen={() => {
            setOpenAuthModal(true)
          }}
          user={user}
          open={openAuthModal}
          handleClose={() => setOpenAuthModal(false)}
        />
        {loaded ? (
          <div style={{ paddingTop: 20, overflowY: 'scroll' }}>
            <>
              <DynamicComponentWithNoSSR
                teams={nbaTeams}
                handleClick={HandleCardClick}
                handleChange={HandleCurrentTeamChange}
              />
              <div style={{ marginTop: 20 }}>
                <Info team_id={currentTeam} />
              </div>
            </>
          </div>
        ) : (
          <div
            style={{
              height: '80vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader size={60} />
          </div>
        )}
      </div>
    </>
  )
}
export async function getStaticProps() {
  const { data: teams } = await GetAllTeams()
  return {
    props: { teams },
  }
}
