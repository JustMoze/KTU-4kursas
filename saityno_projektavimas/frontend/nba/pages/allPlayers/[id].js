import React, { useEffect, useState } from 'react'
import { GetPlayers } from '../../service/playerService'
import { Row, Col } from 'react-grid-system';
import { GetAllTeams } from '../../service/teamService';
import CircleCard from '../../src/components/CircleCard/CircleCard';
import Loader from '../../src/components/Loader/Loader';
import { useRouter } from 'next/router'
import Footer from '../../src/components/Footer/Footer';
import Navbar from '../../src/components/navbar/Navbar';
import {CgArrowLeftR, CgArrowRightR} from 'react-icons/cg'

export default function Players({players, teams}) {
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    let random = Math.floor(Math.random() * teams.length) + 1;
    const router = useRouter();
    useEffect(() => {
        setloading(false);
    }, [players, teams])

    const handlePageChange = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data: players } = await GetPlayers(currentPage);
                resolve({ players: players});
            } catch (error) {
                reject({ msg: error.message });
            }
        });
    }; 
    
    const returnTeamProps = (abr) => {
        let abrTeam = teams.find(team => team.abbreviation === abr);
        return [abrTeam.color, abrTeam.logo, abrTeam._id]
    }
    return (
        <div style={{width: "100vw", height: "100vh", justifyContent: 'center', alignItems: 'center'}}>
            {loading ? <div style={{marginLeft: "48vw", marginTop: "48vh"}}>
                <Loader />
            </div> : 
            <>
                <Navbar empty={true} color={teams[random].color}/>
                <Row style={{paddingLeft: 15, paddingRight: 15, paddingBottom: "5vh", marginTop: 20, width: '100%', height: '80%', overflowY: 'scroll'}}>
                {players.map(player => {
                    return <Col key={`${player.fullName}`} sm={6} md={4} lg={3} style={{justifyContent: 'center', alignItems: 'center', overflow: 'hidden', padding: 10}}>
                        <CircleCard color={returnTeamProps(player.team)[0]} player={player} logo={returnTeamProps(player.team)[1]} handleImgClick={(id) => {
                            router.push({
                                pathname: '/player/[id]',
                                query: { id: id, teamId: returnTeamProps(player.team)[2] }
                            });
                        }}  />
                    </Col>
                })}
            </Row>
            <div style={{marginTop: 15, marginBottom: 30, width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <CgArrowLeftR size={40} color={teams[random].color} style={{marginRight: 10}}/>
                    <CgArrowRightR size={40} color={teams[random].color} />
            </div>
            </>
        }

        <Footer color={teams[random].color} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { data: players } = await GetPlayers(context.query.id);
    const { data: teams} = await GetAllTeams();
    return {
        props: {
            players: players,
            teams: teams
        }
    }
}