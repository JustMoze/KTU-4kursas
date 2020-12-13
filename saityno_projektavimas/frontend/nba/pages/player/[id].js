/* eslint no-use-before-define: 0 */
import React from 'react';
import styled from 'styled-components';
import { GetPlayer } from '../../service/playerService';
import { GetTeamById } from '../../service/teamService';
import { Row, Col } from 'react-grid-system';
import { Tbody, Tr, Th, Table } from 'react-super-responsive-table';
import {
    RobotoM400_italic,
    RobotoM400_underline,
    RobotoM500,
    RobotoM500_Details
} from '../../utils/fonts';
import { FcMoneyTransfer } from 'react-icons/fc';
import Footer from '../../src/components/Footer/Footer';
import SiteTable from '../../src/components/Charts/SiteTable';
import { useRouter } from 'next/router';
import { CgChevronLeftR } from 'react-icons/cg';
const PlayerNav = styled.div`
    height: 35vh;
    width: 100%;
    background-color: ${(props) => props.color};
    position: relative;
    overflow: hidden;
    border-bottom: 2px solid #ffffff;
`;
const MiniLogo = styled.div`
    position: absolute;
    left: 20vw;
    top: 0px;
    width: 12vw;
    min-width: 100px;
    height: 20vh;
    min-height: 230px;
    @media (max-width: 768px) {
        left: 15vw;
        top: 0px;
        width: 15vw;
        min-width: 150px;
        height: 20vh;
        min-height: 120px;
    }
`;
const BackgroundLogo = styled.div`
    position: absolute;
    left: 7%;
    top: -40%;
    width: 45%;
    height: 200%;
    @media (max-width: 768px) {
        width: 20vw;
        min-width: 400px;
    }
`;
const PlayerImageContainer = styled.div`
    position: absolute;
    left: 25%;
    z-index: 5;
    bottom: 0px;
    width: 25vw;
    min-width: 200px;
    height: 35vh;
    min-height: 230px;
    @media (max-width: 768px) {
        width: 20vw;
        min-width: 300px;
    }
`;
const MainDetailsContainer = styled.div`
    position: absolute;
    left: 50%;
    width: 100%;
    height: 100%;
    height: 35vh;
    padding-left: 2vw;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        display: none;
    }
`;
const StatsContainer = styled.div`
  position: relative;
  width: 100vw;
  z-index: 5;
  border-bottom: 2px solid #000000;
  height: 100%;
  margin-bottom: 50px;
  background-color: ${(props) => props.color}
  border-top: 1px solid #ffffff;
  
`;
const CustomTd = styled(Th)`
    height: 120px;
    min-width: 70px;
    cursor: pointer;
    border-right: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    width: 10vw;
    @media (max-width: 768px) {
        width: 20vw;
        display: flex;
    }
    &:hover {
        opacity: 0.2;
    }
`;
const CustomDetailTd = styled(Th)`
    height: 120px;
    min-width: 70px;
    cursor: pointer;
    border-left: 1px solid #ffffff;
    width: 10vw;
    @media (max-width: 768px) {
        display: none !important;
    }
    &:hover {
        opacity: 0.2;
    }
`;
const CustomTr = styled(Tr)`
    position: absolute;
    padding: 0px !important;
    left: 12vw;
    width: 100vw;
    top: 0px;
    bottom: 0px;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${(props) => props.color};
    @media (max-width: 768px) {
        left: 0px;
        border: none !important;
        display: flex !important;
    }
`;
const CustomBody = styled(Tbody)`
    width: 100vw;
    min-height: 123px;
    height: 10vh;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        min-height: 0px;
        height: 0vh;
    }
`;
const CustomTable = styled(Table)`
    background-color: ${(props) => props.color};
    min-height: 121px;
    height: 10vh;
    width: 100vw;
    border-spacing: 0px !important;
`;
const TableInfo = styled.div`
    display: block;
`;
const TdText = styled(RobotoM400_italic)`
    color: #ffffff;
    margin-bottom: 5px;
`;
const Minutes = styled.div`
    position: relative;
    width: 10vw;
    min-width: 80px;
    min-height: 37px;
    display: flex;
    justify-content: center;
    align-center: center;
    border-radius: 15px;
    border: 2px ${(props) => props.color} solid;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;
const CashContainer = styled.div`
    position: absolute;
    left: -40px;
    top: -20px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid ${(props) => props.color};
    cursor: pointer;
    z-index: 7;
    &:hover {
        background-color: #ffda77;
        border: 2px solid ${(props) => props.color};
    }
`;
const PriceContainer = styled.div`
    position: relative;
    width: 17vw;
    min-width: 310px;
    height: 60px;
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    align-items: center;
    background-color: ${(props) => props.color};
    cursor: pointer;
    margin-left: 50px;
    border-radius: 25px;
    top: 20px;
    z-index: 1;
    ${CashContainer}:hover & {
        background-color: #ffda77;
    }
    &:hover {
        background-color: #ffda77;
        border: 2px solid ${(props) => props.color};
    }
    @media (max-width: 900px) {
        margin-top: 50px;
    }
`;
const DetailsTitle = styled(RobotoM500_Details)`
    width: 100%;
    text-align: center;

    @media (max-width: 1000px) {
        padding-right: 10px;
    } ;
`;
const ContentCol = styled(Col)`
    margin-top: 5vh;
    margin-top: 15px;
    @media (max-width: 900px) {
        margin-top: 50px;
    }
`;
const ReturnContainer = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    width: 50px;
    height: 50px;
    cursor: pointer;
`;
function Player({ player, team }) {
    const router = useRouter();
    return (
        <>
            <PlayerNav color={team.color}>
                <ReturnContainer
                    onClick={() => {
                        router.push('/');
                    }}>
                    <CgChevronLeftR size={50} color="#ffffff" />
                </ReturnContainer>
                <BackgroundLogo>
                    <img
                        src={`https://images.weserv.nl/?url=${team.logo}&w=750&h=750`}
                        height="100%"
                        width="100%"
                        style={{ opacity: 0.3 }}
                    />
                </BackgroundLogo>
                <PlayerImageContainer>
                    <img
                        src={`https://images.weserv.nl/?url=${player.foto}&w=600&h=600`}
                        height="100%"
                        width="100%"
                    />
                </PlayerImageContainer>
                <MiniLogo>
                    <img
                        src={`https://images.weserv.nl/?url=${team.logo}&w=400&h=400`}
                        height="100%"
                        width="100%"
                    />
                </MiniLogo>
                <MainDetailsContainer>
                    <div style={{ display: 'block', width: '100%', position: 'relative' }}>
                        <RobotoM400_underline
                            style={{
                                fontSize: 27,
                                color: '#ffffff',
                                fontStyle: 'normal',
                                cursor: 'pointer'
                            }}>
                            {team.full_name} | {player.number} | {player.position}
                        </RobotoM400_underline>
                        <RobotoM500
                            style={{
                                fontSize: 50,
                                marginTop: 5,
                                textShadow: '4px 2px #000000'
                            }}>
                            {player.fullName.split(' ')[0]}
                        </RobotoM500>
                        <RobotoM500
                            style={{
                                fontSize: 50,
                                marginTop: 5,
                                textShadow: '4px 2px #000000'
                            }}>
                            {player.fullName.slice(
                                player.fullName.split(' ')[0].length,
                                player.fullName.length
                            )}
                        </RobotoM500>
                        <Minutes color="#ffffff">
                            <RobotoM400_italic style={{ color: '#ffffff' }}>
                                {player.mpg} MPG
                            </RobotoM400_italic>
                        </Minutes>
                    </div>
                </MainDetailsContainer>
            </PlayerNav>
            <StatsContainer color={team.color} style={{ opacity: 0.95 }}>
                <CustomTable color={team.color} style={{ opacity: 0.95 }}>
                    <CustomBody>
                        <CustomTr color={team.color} style={{ opacity: 0.95 }}>
                            <CustomTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>PPG</TdText>
                                    <TdText>{player.ppg}</TdText>
                                </TableInfo>
                            </CustomTd>
                            <CustomTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>RPG</TdText>
                                    <TdText>{player.rpg}</TdText>
                                </TableInfo>
                            </CustomTd>
                            <CustomTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>APG</TdText>
                                    <TdText>{player.apg}</TdText>
                                </TableInfo>
                            </CustomTd>
                            <CustomTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>FG %</TdText>
                                    <TdText>{player.fg}</TdText>
                                </TableInfo>
                            </CustomTd>
                            <CustomTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>FT %</TdText>
                                    <TdText>{player.ft}</TdText>
                                </TableInfo>
                            </CustomTd>
                            <CustomDetailTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>3 PT %</TdText>
                                    <TdText>{player.threePt}</TdText>
                                </TableInfo>
                            </CustomDetailTd>
                            <CustomDetailTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>Weight</TdText>
                                    <TdText>{player.weight}</TdText>
                                </TableInfo>
                            </CustomDetailTd>
                            <CustomDetailTd>
                                <TableInfo>
                                    <TdText style={{ fontStyle: 'normal' }}>Height</TdText>
                                    <TdText>{player.height}</TdText>
                                </TableInfo>
                            </CustomDetailTd>
                        </CustomTr>
                    </CustomBody>
                </CustomTable>
            </StatsContainer>
            <Row
                style={{
                    paddingTop: 20,
                    paddingLeft: 15,
                    paddingRight: 15,
                    position: 'relative',
                    paddingBottom: 150
                }}>
                <Col
                    sm={12}
                    md={12}
                    lg={6}
                    style={{ paddingRight: 5, paddingLeft: 35, position: 'relative' }}>
                    <Row style={{ marginBottom: 20, position: 'relative' }}>
                        <Col md={12} lg={12} xl={6} sm={12} style={{ marginTop: '1vh' }}>
                            <PriceContainer color={team.color}>
                                <CashContainer color={team.color}>
                                    <FcMoneyTransfer
                                        size={80}
                                        style={{ zIndex: 7, cursor: 'pointer' }}
                                    />
                                </CashContainer>
                                <RobotoM400_italic
                                    style={{
                                        color: '#ffffff',
                                        fontSize: 32,
                                        fontStyle: 'normal'
                                    }}>
                                    {player.price} $
                                </RobotoM400_italic>
                            </PriceContainer>
                        </Col>
                        <ContentCol md={12} lg={12} xl={6} sm={12}>
                            <DetailsTitle>Teamates:</DetailsTitle>
                        </ContentCol>
                    </Row>
                    <Row style={{ marginBottom: 30 }}>
                        <SiteTable
                            color={team.color}
                            handleClick={(id) => {
                                router.push({
                                    pathname: '/player/[id]',
                                    query: { id: id, teamId: team._id }
                                });
                            }}
                            abbreviation={team.abbreviation}
                            center={true}
                        />
                    </Row>
                </Col>
                <Col sm={12} md={12} lg={12} xl={6}>
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${player.videoId}`}
                        style={{ borderRadius: 17 }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </Col>
            </Row>
            <Footer color={team.color} />
        </>
    );
}
export async function getServerSideProps(context) {
    const { data: player } = await GetPlayer(context.query.id);
    const { data: team } = await GetTeamById(context.query.teamId);
    return {
        props: {
            player: player,
            team: team
        }
    };
}
export default Player;
