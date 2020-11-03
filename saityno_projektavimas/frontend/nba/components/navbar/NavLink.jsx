import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {roboto_m500, NBA_white, NBA_grey} from '../../styles/globalStyle.module.scss';

const LinkerContent = styled.a`
    cursor: pointer;
    font-family: ${roboto_m500};
    color: ${NBA_white};
    font-size: 3vh;
    margin-right: 20px;
    padding: 1vh, 1vw;
    width: 6vw;
    text-align: center;
    border-radius: 5px;
    @media (max-width: 380px) {
        margin-right: 3vw;
    }
    &:hover {
        color: ${NBA_grey};
    }
`;
export default function NavLink({to}) {
    return (
        <Link href={to}>
            <LinkerContent>Sveiki</LinkerContent>
        </Link>
    )
}

