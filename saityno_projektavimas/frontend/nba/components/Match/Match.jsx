import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NBA_grey } from '../../styles/globalStyle.module.scss'
import { Row, Col } from 'react-grid-system'
import Modal from '@material-ui/core/Modal'
import { GetUsers } from '../../service/userService'
import Loader from '../Loader/Loader'
import { CalculateWinner } from '../../utils/VictoryAlgorithm'

const CustomModal = styled(Modal)`
  position: absolute;
  background-color: #ffffff;
  z-index: 10;
  width: 70vw;
  height: 80vh;
  left: 15vw !important;
  top: 12vh !important;
  min-height: 500px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 94vw;
    left: 3vw !important;
    overflowy: 'scroll';
  }
`
const MatchRow = styled(Row)`
  position: relative;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  margin-left: 0px !important;
  margin-right: 0px !important;
  overflow: hidden;
`
const MatchCol = styled(Col)`
  height: 100%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    height: 50%;
  }
`
const MatchColLeft = styled(MatchCol)`
  border-right: 2px solid black;
  @media (max-width: 768px) {
    border-right: 0px solid black;
  }
`
const RotateSquareUserTeam = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  width: 5vw;
  height: 5vw;
  border: 2px solid black;
  transform: rotate(45deg);
  z-index: 2;
  left: 0px;
  background-color: ${(props) => props.color};
  @media (max-width: 1000px) {
    display: none;
  }
`
const MatchButtonContainer = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20%;
  @media (max-width: 768px) {
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
  }
`
const MatchButton = styled.div`
  width: 10%;
  min-width: 150px;
  border-radius: 20px;
  cursor: pointer;
  min-height: 45px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 7;
  background-color: ${(props) => props.color};
  @media (max-width: 768px) {
  }
`
const LogoContainer = styled.div`
  height: 10vh;
  min-height: 100px;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: start;
    align-items: center;
  }
`
const LoaderContainer = styled.div`
    width: 100%; 
    height: 100%;
    display: flex; 
    justify-content: center; 
    align-items: center;
`
const LogoDiv = styled.div`
  width: 300px;
  margin-top: 150px;
  @media (max-width: 768px) {
    width: 170px;
    margin-top: 30px;
  }
`
export default function Match({ open, handleClose, team }) {
  const [allPlayers, setAllPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [prevOpponent, setPrevOpponent] = useState('')
  const [result, setResult] = useState({})
  const [resultLoading, setResultLoading] = useState(true)
  const [battleLoading, setBattleLoading] = useState(false)
  useEffect(() => {
    async function LoadUser() {
      const { data: users } = await GetUsers(currentPage)
      if (users) {
        setAllPlayers(users)
        setLoading(false)
      }
    }
    LoadUser()
    console.log('result in useEffect', result)
  }, [currentPage, result])
  return (
    <CustomModal
      open={open}
      onBackdropClick={handleClose}
      onEscapeKeyDown={handleClose}
      onClose={handleClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {resultLoading ? (
          <MatchRow>
            {battleLoading ? (
              <LoaderContainer><Loader size={25} /></LoaderContainer>
            ) : (
              <>
                <RotateSquareUserTeam color="#aee6e6" style={{ top: '10%' }} />
                <RotateSquareUserTeam
                  color="#aee6e6"
                  style={{ bottom: '10%' }}
                />
                <RotateSquareUserTeam
                  color="#aee6e6"
                  style={{ bottom: '44%' }}
                />
                <MatchColLeft lg={6} md={12} sm={12}>
                  <div
                    style={{
                      width: '100%',
                      height: '95%',
                      position: 'relative',
                    }}
                  >
                    <LogoContainer>
                      <LogoDiv>
                        <img
                          src={`https://images.weserv.nl/?url=https://www.nba.com/assets/logos/teams/primary/web/MIA.svg&w=600&h=600`}
                          alt="1"
                          height="100%"
                          width="100%"
                        />
                      </LogoDiv>
                    </LogoContainer>
                  </div>
                </MatchColLeft>
                <MatchCol
                  lg={6}
                  md={12}
                  sm={12}
                  color="#aee6e6"
                  style={{ zIndex: 6 }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '95%',
                      position: 'relative',
                      backgroundColor: '#a8dda8',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <>
                      {loading ? (
                        <LoaderContainer>
                            <Loader size={60} />
                        </LoaderContainer>
                      ) : (
                        <div>
                          <h2>JISAD</h2>
                        </div>
                      )}
                    </>
                  </div>
                </MatchCol>
                <MatchButtonContainer>
                  <MatchButton
                    color="#892cdc"
                    onClick={() => {
                      //setResult(CalculateWinner('5fad20feefc6ac159cfc566d', '5f6b240fd432c92a30ca5159'));
                      // setResultLoading(false);
                      setBattleLoading(true);
                      CalculateWinner(
                        '5fad20feefc6ac159cfc566d',
                        '5f6b240fd432c92a30ca5159'
                      )
                        .then((res) => {
                          setResult(res)
                          setTimeout(() => {
                            setResultLoading(false)
                            setBattleLoading(false)
                          }, 1500)
                        })
                        .catch((err) => {
                          console.log('err', err)
                        })
                    }}
                  >
                    <img
                      src="https://ak-static.cms.nba.com/wp-content/uploads/logos/leagues/logo-nba.svg"
                      height="100%"
                    />
                  </MatchButton>
                </MatchButtonContainer>
              </>
            )}
          </MatchRow>
        ) : (
        <MatchRow>       
                <RotateSquareUserTeam color="#aee6e6" style={{ top: '10%' }} />
                <RotateSquareUserTeam
                  color="#aee6e6"
                  style={{ bottom: '10%' }}
                />
                <RotateSquareUserTeam
                  color="#aee6e6"
                  style={{ bottom: '44%' }}
                />
                <MatchColLeft lg={6} md={12} sm={12}>
                  <div
                    style={{
                      width: '100%',
                      height: '95%',
                      position: 'relative',
                    }}
                  >
                    <LogoContainer>
                      <LogoDiv>
                        <img
                          src={`https://images.weserv.nl/?url=https://www.nba.com/assets/logos/teams/primary/web/MIA.svg&w=600&h=600`}
                          alt="1"
                          height="100%"
                          width="100%"
                        />
                      </LogoDiv>
                    </LogoContainer>
                  </div>
                </MatchColLeft>
                <MatchCol
                  lg={6}
                  md={12}
                  sm={12}
                  color="#aee6e6"
                  style={{ zIndex: 6 }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '95%',
                      position: 'relative',
                      backgroundColor: '#a8dda8',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                        <div>
                             <LoaderContainer>
         <h1>{result.left}  -  {result.right}</h1> 
             </LoaderContainer>
                        </div>
                  </div>
                </MatchCol>
                <MatchButtonContainer>
                  <MatchButton
                    color="#892cdc"
                    onClick={() => {
                      //setResult(CalculateWinner('5fad20feefc6ac159cfc566d', '5f6b240fd432c92a30ca5159'));
                      // setResultLoading(false);
                      setBattleLoading(true);
                      CalculateWinner(
                        '5fad20feefc6ac159cfc566d',
                        '5f6b240fd432c92a30ca5159'
                      )
                        .then((res) => {
                          setResult(res)
                          setTimeout(() => {
                            setResultLoading(false)
                            setBattleLoading(false)
                          }, 1500)
                        })
                        .catch((err) => {
                          console.log('err', err)
                        })
                    }}
                  >
                    <img
                      src="https://ak-static.cms.nba.com/wp-content/uploads/logos/leagues/logo-nba.svg"
                      height="100%"
                    />
                  </MatchButton>
                </MatchButtonContainer>
          </MatchRow>
        )}
      </div>
    </CustomModal>
  )
}
