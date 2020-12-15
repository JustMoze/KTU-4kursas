import React from 'react'
import styled from 'styled-components';

const CardContainer = styled.div`
    position: relative;
    min-width: 300px;
    width: 100%;
    min-height: 200px;
    border-radius: 15px;
    align-items: center;
    border: 1px solid #F5F5F5;
    background-color: ${props => props.color};
    padding-left: 5px;
    padding-top: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const DetailsCont = styled.div`
    height: 100%;
    width: 60%;
    padding: 3px;
`;
const ImageCont = styled.div`
    width: 40%;
    height: 100%;
    overflow: hidden;
    linear-gradient(to right, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628384.png')
    background-size: cover;
`;
const PlayerCard = () => {
    return (
        <CardContainer color="rgba(0, 0, 0, 0.7)">
            <div style={{flexDirection: 'row', flex: 1}}>
                <ImageCont>

                </ImageCont>
                <DetailsCont>
                    <p>
                        sadasdas
                        dasdasdsads
                    </p>
                </DetailsCont>
            </div>
        </CardContainer>
    )
}

export default PlayerCard;
