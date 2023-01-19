import React from 'react'

const PersonInfo = ({ address, openMenu, index, stateOfMenu }) => {
  const { streetAddress, city, state, zip } = address
  console.log(index)
  return index === stateOfMenu ? (
    <div className="eInfo">
      {`State: ${state}`}, {`City: ${city}`},{' '}
      {`Street address: ${streetAddress}`}, {`Zip code: ${zip}`}
    </div>
  ) : (
    ''
  )
}

export default PersonInfo
