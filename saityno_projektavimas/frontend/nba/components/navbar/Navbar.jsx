import React from 'react'
import NavLink from './NavLink'
import styled from 'styled-components';
import {NBA_blue} from '../../styles/globalStyle.module.scss';

import './style.module.scss'
const Container = styled.div`
    background-color: ${NBA_blue};
    height: 10vh;
    width: 100vw;
    margin: 0;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
`;
const LinkContainer = styled.div`
position: absolute;
right: 2vw;
@media (max-width: 380px) {
    flex-direction: column;
    align-items: flex-end;
}`;
const LogoContainer = styled.div`
position: absolute;
display: flex;
align-items: center;
left: 1vw;
width: 10vw;
height: 8vh;
@media (max-width: 380px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 3vw;
    padding-top: 2vh;
}`;

export default function Navbar() {
    return (
        <Container>
            <LogoContainer>
                <img src="https://ak-static.cms.nba.com/wp-content/uploads/logos/leagues/logo-nba.svg" height="100%"/>
            </LogoContainer>
            <LinkContainer>
                <NavLink to='/team'/>
                <NavLink to='/team'/>
                <NavLink to='/team'/>
            </LinkContainer>
        </Container>
    )
}

