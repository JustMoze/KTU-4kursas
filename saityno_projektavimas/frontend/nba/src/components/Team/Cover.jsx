import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-grid-system'
import styled from 'styled-components'
import { RobotoM400, RobotoM500 } from '../../../utils/fonts'
import Loader from '../Loader/Loader'

const CoverContainer = styled.div`
  position: relative;
  margin-left: 5px;
  width: 100%;
  overflow: hidden;
  min-height: 350px;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px 0px 50px 50px;
  @media (max-width: 768px) {
    overflow: scroll;
  }
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;
  marginbottom: 10 @media (max-width: 768px) {
    display: flex;
    background-color: aqua;
    justify-content: center;
  }
`
const BluredImageContainer = styled.div`
  position: absolute;
  clear: both;
  top: -45%;
  right: -7%;
  width: 70%;
  height: 190%;
  zindex: 1;
  @media (max-width: 768px) {
    display: none;
  }
`
const Logo = styled.img`
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    position: absolute;
    top: -50px;
    width: 60%;
    min-height: 250px;
    right: -25px;
    opacity: 0.6
  }
`;
const LogoContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  @media (max-width: 768px) {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 100%;
    height: 100%; 
    opacity: 0.5;
    z-index: 10;
  }
`;
function Cover({ team: { color, logo, full_name, conference, coach, record } }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (logo) {
      setLoading(false)
    }
  }, [logo])
  return (
    <>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader size={40} />
        </div>
      ) : (
        <>
          <CoverContainer
            style={{ backgroundColor: color, position: 'relative' }}
          >
            <Row style={{ width: '100%', zIndex: 2 }}>
              <Col
                sm={12}
                md={6}
                lg={6}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <LogoContainer>
                  <Logo
                    src={`https://images.weserv.nl/?url=${logo}&w=400&h=400`}
                    style={{ transform: 1.5 }}
                  />
                </LogoContainer>
              </Col>
              <Col style={{zIndex: 10}}>
                <StyledRow style={{ marginTop: 25, zIndex: 3 }}>
                  <RobotoM500 style={{ fontSize: 40 }}>{full_name}</RobotoM500>
                </StyledRow>
                <StyledRow style={{ marginBottom: 10, zIndex: 3 }}>
                  <RobotoM400 style={{ fontSize: 25 }}>
                    Conference: {conference}
                  </RobotoM400>
                </StyledRow>
                <StyledRow>
                  <RobotoM400
                    style={{
                      textDecoration: 'underline',
                      fontStyle: 'italic',
                      fontSize: 22,
                    }}
                  >
                    {record}
                  </RobotoM400>
                </StyledRow>
                <StyledRow>
                <RobotoM400
                    style={{
                      marginTop: 10,
                      fontStyle: 'italic',
                      fontSize: 22,
                      fontWeight: "bold",
                      marginRight: 10
                    }}
                  >
                    Coach: 
                  </RobotoM400>
                <RobotoM400
                    style={{
                      marginTop: 10,
                      fontStyle: 'italic',
                      fontSize: 22,
                    }}
                  >
                    {coach}
                  </RobotoM400>
                </StyledRow>
              </Col>
            </Row>
            <BluredImageContainer>
              <img
                src={`https://images.weserv.nl/?url=${logo}&w=750&h=750`}
                height="100%"
                width="100%"
                style={{ opacity: 0.3 }}
              />
            </BluredImageContainer>
          </CoverContainer>
        </>
      )}
    </>
  )
}

export default Cover
