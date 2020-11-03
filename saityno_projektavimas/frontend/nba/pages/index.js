import React, {useEffect, useState} from 'react';
import Head from 'next/head'
import Navbar from '../components/navbar/Navbar';
import dynamic from 'next/dynamic'
import { GetAllTeams } from './../service/teamService';
import Loader from '../components/Loader/Loader';
// import Slider from '../components/Slider/Slider'

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Slider/Slider'),
  { ssr:
 false }
)

export default function Home({teams}) {
  const [loaded, setLoaded] = useState(false);
  const [nbaTeams, setNbaTeams] = useState([]);

  useEffect(() => {
    if(teams != undefined && teams.length > 0){
      setNbaTeams(teams);
      setLoaded(true);
    }
  }, [teams]);
  return (
      <>
      <Head>
        <title>NBA_fantasy</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
        <link rel="icon" href="/nba_1.png" />
      </Head>
      <Navbar />
      {loaded ? <div style={{marginTop: 20}}>
        <DynamicComponentWithNoSSR teams={nbaTeams} data="cha cha"/>
      </div> : 
        <div style={{height: '80vh', display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Loader size={60} />
        </div>
      } 
      
      </>
  )
}
export async function getStaticProps() {
  const {data: teams} = await GetAllTeams();
  return {
    props: {teams}
  };
}
