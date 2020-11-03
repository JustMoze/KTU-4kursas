import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NBA_blue, NBA_red, NBA_disable, NBA_dark } from '../../styles/globalStyle.module.scss';

import { NoSsr } from '@material-ui/core';
import Carousel from 'react-spring-3d-carousel';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import Loader from './../Loader/Loader';
console.log(RiArrowLeftSLine);

const SliderContainer = styled.div`
	position: relative;
    flex: 1;
	margin: auto;
	width: 70vw;
	height: 45vh;
`;
const LoaderContainer = styled.div`
    position: relative;
	margin: auto;
	width: 70vw;
	height: 80vh;
    display: flex;
    justify-content:  center;
    align-items: center;
`;
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
`;
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
`;
const ImageContainer = styled.div`
    height: 50vh;
    width: 25vw;
`;
const Slider = ({ data, teams }) => {
	const slidesData = [
		{
			key: 'asadasdfasdsadasdasd12',
			content: <img src="https://e7.pngegg.com/pngimages/1012/196/png-clipart-golden-state-warriors-nba-logo-cleveland-cavaliers-oakland-nba-logo-sticker.png" alt="1" height={350} width="100%" />,
		},

		{
			key: 'asadasdfasdsadasdasd564',
			content: <ImageContainer>
                <img src="https://e7.pngegg.com/pngimages/1012/196/png-clipart-golden-state-warriors-nba-logo-cleveland-cavaliers-oakland-nba-logo-sticker.png" alt="1" height="100%" width="100%" />
            </ImageContainer>
		},

		{
			key: 'asadasdfasdsadasdasd45',
			content: <ImageContainer>
                <img src="https://e7.pngegg.com/pngimages/1012/196/png-clipart-golden-state-warriors-nba-logo-cleveland-cavaliers-oakland-nba-logo-sticker.png" alt="1" height="100%" width="100%" />
            </ImageContainer>
		},

		{
			key: 'asadasdfasdsadasdasd98',
			content: <ImageContainer>
               <img src="https://e7.pngegg.com/pngimages/1012/196/png-clipart-golden-state-warriors-nba-logo-cleveland-cavaliers-oakland-nba-logo-sticker.png" alt="1" height="100%" width="100%" /> 
            </ImageContainer>
		}
    ];
    const [sliderData, setSliderData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [ slideNumber, setSlideNumber ] = useState(1);
    const [ leftDisable, setLeftDisable ] = useState(true);
    const [ rightDisable, setRightDisable ] = useState(false);
	useEffect(
		() => {
            if (teams) {
                let teamsArr = [];
                teams.map(team => {
                    teamsArr.push({
                        key: team._id,
                        content: <ImageContainer>
                            <img src={`https://images.weserv.nl/?url=${team.logo}&w=450&h=450`} alt="1" height="100%" width="100%" /> 
                        </ImageContainer>
                    })
                });
                setSliderData(teamsArr);
                setDataLoaded(true);
            }           
		},
		[ teams ]
    );
    console.log("data loaded", sliderData);
    const ChangeColor = (side) => {
        switch (side.toLowerCase()){
            case 'left': 
            setLeftDisable(true);
            setTimeout(() => {
                setLeftDisable(false);
            }, 500);
            break;
            default: 
                setRightDisable(true);
                setTimeout(() => {
                    setRightDisable(false);
                }, 500);
        }
        
    }
    const HanldeClickRight = () => {
        if(slideNumber < sliderData.length-1){
            ChangeColor('right');
            if(leftDisable){
                setLeftDisable(false);
            }
            setSlideNumber(slideNumber+1);
        }else if(slideNumber == sliderData.length-1 ){
            setRightDisable(true);
            setSlideNumber(slideNumber+1);
        } else {
            setRightDisable(true);
        }
    }
    const HandleClickLeft = () => {
        if(slideNumber > 1){
            ChangeColor('left');
            setSlideNumber(slideNumber-1);
            if(rightDisable){
                setRightDisable(false);
            }
        }else if(slideNumber == 1){ 
            setLeftDisable(true);
            setSlideNumber(slideNumber-1);

        } else {
            setLeftDisable(true);
        }
    }
	return (
		<NoSsr>
			{dataLoaded ? (
                <>
                    <SliderContainer>
                        <Carousel slides={sliderData} offsetRadius={5} goToSlide={slideNumber} />
                        <LeftArrContainer>
                            <RiArrowLeftSLine size={80} color={leftDisable ? NBA_disable : NBA_dark } style={{cursor: leftDisable ?  null : 'pointer', zIndex: 2}} onClick={() => {
                                HandleClickLeft()
                            }}/>
                        </LeftArrContainer>
                        <RightArrContainer>
                            <RiArrowRightSLine size={80} color={rightDisable ? NBA_disable : NBA_dark } style={{cursor: rightDisable ?  null : 'pointer', zIndex: 2}} onClick={() => {
                                HanldeClickRight()
                            }}/>
                        </RightArrContainer>
                    </SliderContainer>
                </>
			) : (
				<LoaderContainer>
					<Loader size={40} />
				</LoaderContainer>
			)}
		</NoSsr>
	);
}

export default Slider;
