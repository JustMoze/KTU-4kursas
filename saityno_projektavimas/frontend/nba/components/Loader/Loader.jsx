import React from 'react';
import ReactLoading from 'react-loading';
import colors from '../../styles/globalStyle.module.scss';


export default function Loader({size}) {
    return (
        <ReactLoading type="spin" color={colors.NBA_blue} height={size} width={size} />
    )
}

