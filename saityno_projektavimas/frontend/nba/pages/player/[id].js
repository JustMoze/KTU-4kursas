import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { GetPlayer } from '../../service/playerService'
import { GetTeamById } from '../../service/teamService';
import { Row, Col } from 'react-grid-system';
import { Tbody, Tr, Th, Table } from 'react-super-responsive-table'

const PlayerNav = styled.div`
  height: 35vh;
  width: 100%;
  background-color: ${props => props.color};
  position: relative;
  overflow: hidden;

`;
const MiniLogo = styled.div`
  position: absolute;
  left: 20vw;
  top: 0px;
  width: 12vw;
  min-width: 100px;
  height: 20vh;
  min-height: 200px;
  @media (max-width: 768px) {
    left: 15vw;
    top: 0px;
    width: 12vw;
    min-width: 70px;
    height: 20vh;
    min-height: 100px;
  }
`;
const BackgroundLogo = styled.div`
  position: absolute;
  left: 7%;
  top: -40%;
  width: 45%;
  height: 200%;
`;
const PlayerImageContainer = styled.div`
  position: absolute;
  left: 25%;
  bottom: 0px;
  width: 20vw;
  min-width: 150px;
  height: 31vh;
  min-height: 200px;
`;
const MainDetailsContainer = styled.div`
  
`;
const StatsContainer = styled.div`
  position: relative;
  width: 100vw;
  z-index: 5;
  height: 10vh;
  min-height: 150px;
  background-color: ${props => props.color}
  border-top: 1px solid #ffffff;
`;
const CustomTd = styled(Th)`
  height: 120px;
  min-width: 70px;
  border: 1px solid #ffffff;
  width: 10vw;
  @media (max-width: 768px) {
    width: 20vw;
  }
`;
const CustomTr = styled(Tr)`
  position: absolute;
  left: 12vw;
  width: 50vw;
  top: 0px;
  bottom: 0px;
  height: 10vh;
  background-color: ${props => props.color};
  @media (max-width: 768px) {
    left: 0px;
    width: 100vw;
  }
`;
const CustomBody = styled(Tbody)`
  width: 100vw;
  min-height: 123px;
  height: 10vh;
`;
const CustomTable = styled(Table)`
  background-color: ${props => props.color};
  width: 100vw;
  min-height: 123px;
  height: 10vh;
`;
function Player({ player, team }) {
  const [video, setVideo] = useState('');
  useEffect(() => {
   
  })
  return (
    <>
      <PlayerNav color={team.color}>
        <BackgroundLogo>
          <img src={`https://images.weserv.nl/?url=${team.logo}&w=750&h=750`}
                  height="100%"
                  width="100%"
                  style={{ opacity: 0.3 }}
                  />
        </BackgroundLogo>
        <PlayerImageContainer>
        <img src={`https://images.weserv.nl/?url=${player.foto}&w=600&h=600`}
                  height="100%"
                  width="100%"
                  />
        </PlayerImageContainer>
        <MiniLogo>
            <img src={`https://images.weserv.nl/?url=${team.logo}&w=400&h=400`}
                  height="100%"
                  width="100%"
                  />
        </MiniLogo>
      </PlayerNav>
      <StatsContainer color={team.color} style={{opacity: 0.85 }}>
          <CustomTable color={team.color} style={{opacity: 0.85}}>
            <CustomBody>
              <CustomTr color={team.color} style={{opacity: 0.85}}>
                <CustomTd>

                </CustomTd>
                <CustomTd>

                </CustomTd>
                <CustomTd>

                </CustomTd>
                <CustomTd>

                </CustomTd>
                <CustomTd>

                </CustomTd>
              </CustomTr>
            </CustomBody>
          </CustomTable>
      </StatsContainer>
      <Row style={{
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        position: "relative",
        paddingBottom: 20
      }}>
        <Col  sm={12}
                md={12}
                lg={6}>
                  
        </Col>
        <Col  sm={12}
                md={12}
                lg={6}>
                  <iframe width="100%" height="500" src={`https://www.youtube.com/embed/${player.videoId}`} style={{borderRadius: 17}} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        
        </iframe>
        </Col>
      </Row>
      
    </>
  )
}
export async function getServerSideProps(context) {
  const {data: player} = await GetPlayer(context.query.id);
  const {data: team} = await GetTeamById(context.query.teamId)
  return {
    props: {
      player: player,
      team: team
    },
  }
}
export default Player
