import React from 'react'
import Loader from '../../src/components/Loader/Loader'

const MyTeam = () => {
    return (
        <div style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Loader size={50} />
        </div>
    )
}
export async function getServerSideProps(context) {
    //const { data: player } = await GetPlayer(context.query.id)
    // return {
    //   props: {
    //     player: player,
    //     team: team,
    //   },
    // }
  }
export default MyTeam;