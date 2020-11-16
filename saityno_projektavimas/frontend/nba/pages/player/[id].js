import React from 'react'

function Player({ context }) {
  return (
    <div>
      <h1>{context}</h1>
    </div>
  )
}
export async function getStaticProps(context) {
  console.log('context', context)
  return {
    props: {
      message: 'context got ',
    },
  }
}
export default Player
