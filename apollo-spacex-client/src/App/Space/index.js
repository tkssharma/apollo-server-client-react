import React from 'react';

const SpaceX = ({spacex, mock}) => {
  const spaceProgram = spacex.launchesPast && spacex.launchesPast.map(({mission_name}, index) => {
    return <li key={index}>{mission_name}</li>
  })
  return (
    <div style={{margin: '20px'}}>
      <h1>{mock ? 'Mock Data' : 'API Data'}</h1>
      <ul>{spaceProgram}</ul>
    </div>
  )
}

export default SpaceX;