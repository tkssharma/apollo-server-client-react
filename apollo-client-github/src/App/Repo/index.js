import React from 'react';

const SpaceX = ({repo}) => {
  const { edges } = repo.viewer.repositories;
  const userRepo = edges.map( ({node}, index) => {
      return <li style={{padding : '10px'}} key={index}><div><span>{node.name}</span> <a style={{color: 'blue', textDecoration : 'undeline'}} href={node.url}>Repo Link</a></div></li>
  })
  return (
    <div style={{margin: '20px'}}>
      <ul>{userRepo}</ul>
    </div>
  )
}
export default SpaceX;