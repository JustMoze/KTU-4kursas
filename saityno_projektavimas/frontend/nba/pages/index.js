import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from '../src/components/navbar/Navbar'
import dynamic from 'next/dynamic'
import { GetAllTeams } from './../service/teamService'
import Loader from '../src/components/Loader/Loader'
import Info from '../src/components/Team/Info'
import Footer from '../src/components/Footer/Footer'
import { useRouter } from 'next/router'
import { LoginUser, PostUser } from '../service/userService'
import { ToastContainer, toast } from 'react-toastify';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../src/components/Slider/Slider'),
  { ssr: false }
)

export default function Home({ teams }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false)
  const [nbaTeams, setNbaTeams] = useState([])
  const [currentTeam, setCurrentTeam] = useState(0)
  // register && login
  const [user, setUser] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
  })
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  })
  // -------------- navbar --------------------------------
  const [color, setColor] = useState('#000000')

  // -------------- authentification ----------------------
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [currentAuthMethod, setCurrentAuthMethod] = useState('')
  const [dataFetching, setDataFetching] = useState(false);

  const HandleCurrentTeamChange = (index) => {
    setCurrentTeam(nbaTeams[index]._id)
    setColor(nbaTeams[index].color)
  }

  const HandleCardClick = (id) => {
    console.log('team id -> ', id)
  }

  const HandleUserCredentialChange = (e) => {
    let { value, name } = e.target
    let key = name.slice(0, name.indexOf('_')).toLowerCase()
    name = GetName(name)
    switch (key) {
      case 'register':
        setUser({ ...user, [name]: value })
        break
      case 'login':
        setLoginUser({ ...loginUser, [name]: value })
        break
      default:
        break
    }
  }

  const GetName = (name) => {
    let index = name.indexOf('_')
    return name.slice(index + 1, name.length)
  }
  useEffect(() => {
    if (teams != undefined && teams.length > 0) {
      setNbaTeams(teams)
      setCurrentTeam(teams[0]._id)
      setLoaded(true)
    }
  }, [teams])

  const HanldeSubmit = (type) => {
    console.log("type", type);
    setDataFetching(true);
    switch (type) {
      case 'login':
        handleLogin().then(res => {
          setDataFetching(false)
          toast.success(`Welcome ${res}!`)
          console.log("register result", res)
        }).catch(ex => {
          setDataFetching(false)
          toast.error(ex)
          console.log('err', ex)
        })

        break
      default:
        handleRegister().then(res => {
          setDataFetching(false)
          toast.success(`Welcome ${res.username}!`)
          console.log("register result", res)
        }).catch(e => {
          setDataFetching(false)
          toast.error(e.msg)
          console.log('err', e)
        })
        break
    }
  }
  
  // login promise
  const handleLogin = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await LoginUser(user);
        // find user by token
        resolve(data);
      } catch (error) {
        reject({msg: error.message})
      }
    })
  }

  // register promise
  const handleRegister = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await PostUser(user);
        resolve(data);
      } catch (error) {
        reject({msg: error.message})
      }
    })
  }

  const handleLinkClick = (linkName) => {
    setCurrentAuthMethod(linkName)
  }
  return (
    <>
      <Head>
        <title>NBA_fantasy</title>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/nba_1.png" />
      </Head>
      <div style={{ width: '100%', height: '100%', overflowY: 'scroll' }}>
        <Navbar
          handleChange={HandleUserCredentialChange}
          handleClose={() => setOpenAuthModal(false)}
          handleOpen={() => {
            setOpenAuthModal(true)
          }}
          open={openAuthModal}
          handleLinkClick={handleLinkClick}
          handleSubmit={HanldeSubmit}
          user={currentAuthMethod === 'register' ? user : loginUser}
          loading={dataFetching}
          color={color}
        />
        {loaded ? (
          <div style={{ paddingTop: 20, overflowY: 'scroll' }}>
            <>
              <ToastContainer />
              <DynamicComponentWithNoSSR
                teams={nbaTeams}
                handleClick={HandleCardClick}
                handleChange={HandleCurrentTeamChange}
              />
              <div style={{ marginTop: 20 }}>
                <Info team_id={currentTeam} handleClick={(id) => {
                  router.push({
                    pathname: '/player/[id]',
                    query: {id: id, teamId: currentTeam}
                  })
                }}/>
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
      <Footer color={color} />
    </>
  )
}
export async function getStaticProps() {
  const { data: teams } = await GetAllTeams()
  return {
    props: { teams },
  }
}
