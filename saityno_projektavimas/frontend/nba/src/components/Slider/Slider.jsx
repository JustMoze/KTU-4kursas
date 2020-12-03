import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NBA_disable, NBA_dark } from '../../../styles/globalStyle.module.scss'

import { NoSsr } from '@material-ui/core'
import Carousel from 'react-spring-3d-carousel'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

import Loader from './../Loader/Loader'

const SliderContainer = styled.div`
  position: relative;
  flex: 1;
  margin: auto;
  width: 70vw;
  height: 50vh;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 90vw;
    height: 22vh;
    min-height: 300px;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 10;
  }
`
const LoaderContainer = styled.div`
  position: relative;
  margin: auto;
  width: 70vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LeftArrContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7vw;
  height: '100%';
  @media (max-width: 768px) {
    left: 10px;
  }
`
const RightArrContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7vw;
  height: '100%';
  @media (max-width: 768px) {
    right: 10px;
  }
`
const ImageContainer = styled.div`
  height: 60vh;
  width: 30vw;
  cursor: pointer;
`
const ArrowsContainer = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
  background-color: ${NBA_disable};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`
const Slider = ({ teams, handleClick, handleChange }) => {
  const [sliderData, setSliderData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [slideNumber, setSlideNumber] = useState(0)
  const [leftDisable, setLeftDisable] = useState(true)
  const [rightDisable, setRightDisable] = useState(false)
  useEffect(() => {
    if (teams) {
      let teamsArr = []
      teams.map((team) => {
        teamsArr.push({
          key: team._id,
          content: (
            <ImageContainer onClick={() => handleClick(team._id)}>
              <img
                src={`https://images.weserv.nl/?url=${team.logo}&w=600&h=600`}
                alt="1"
                height="100%"
                width="100%"
              />
            </ImageContainer>
          ),
        })
      })
      setSliderData(teamsArr)
      setDataLoaded(true)
    }
  }, [teams])
  const ChangeColor = (side) => {
    switch (side.toLowerCase()) {
      case 'left':
        setLeftDisable(true)
        setTimeout(() => {
          setLeftDisable(false)
        }, 500)
        break
      default:
        setRightDisable(true)
        setTimeout(() => {
          setRightDisable(false)
        }, 500)
    }
  }
  const HanldeClickRight = () => {
    if (slideNumber < sliderData.length - 1) {
      ChangeColor('right')
      if (leftDisable) {
        setLeftDisable(false)
      }
      setSlideNumber(slideNumber + 1)
      handleChange(slideNumber + 1)
    } else if (slideNumber == sliderData.length - 1) {
      setRightDisable(true)
    } else {
      setRightDisable(true)
    }
  }
  const HandleClickLeft = () => {
    if (slideNumber > 1) {
      ChangeColor('left')
      setSlideNumber(slideNumber - 1)
      handleChange(slideNumber - 1)
      if (rightDisable) {
        setRightDisable(false)
      }
    } else if (slideNumber == 1) {
      setLeftDisable(true)
      setSlideNumber(slideNumber - 1)
      handleChange(slideNumber - 1)
    } else {
      setLeftDisable(true)
    }
  }
  return (
    <NoSsr>
      {dataLoaded ? (
        <>
          <SliderContainer>
            <Carousel
              slides={sliderData}
              offsetRadius={4}
              goToSlide={slideNumber}
            />
            <LeftArrContainer>
              <ArrowsContainer
                onClick={() => {
                  HandleClickLeft()
                }}
              >
                <RiArrowLeftSLine
                  size={80}
                  color={leftDisable ? NBA_disable : '#ffffff'}
                  style={{ cursor: leftDisable ? null : 'pointer', zIndex: 2, borderWidth: 1 }}
                />
              </ArrowsContainer>
            </LeftArrContainer>
            <RightArrContainer>
              <ArrowsContainer
                onClick={() => {
                  HanldeClickRight()
                }}
              >
                <RiArrowRightSLine
                  size={80}
                  color={rightDisable ? NBA_disable : '#ffffff'}
                  style={{
                    cursor: rightDisable ? null : 'pointer',
                    zIndex: 2,
                    flex: 1, borderWidth: 1
                  }}
                />
              </ArrowsContainer>
            </RightArrContainer>
          </SliderContainer>
        </>
      ) : (
        <LoaderContainer>
          <Loader size={40} />
        </LoaderContainer>
      )}
    </NoSsr>
  )
}

export default Slider
