import React from 'react'
import { useState } from 'react'

const Player = ({initialName,symbol , highlightedActive , onNameChange}) => {

    const [isEditing , setIsEditing] = useState(false)
    const [playerName , setPlayerName] = useState(initialName)
    

    const handleClick = ()=>{
        setIsEditing((editing)=>!editing)
        
        if(isEditing){
          onNameChange(symbol,playerName)
        }
    }

    const handleChange = (e)=>{
      setPlayerName(e.target.value)
    }

  

  return (
    <li className={highlightedActive ? 'active' : undefined} >
            <span className="player">
            {isEditing ? (<input placeholder='Enter Name' value={playerName} onChange={handleChange} />) :(<span className="player-name">{playerName}</span>)} 
            <span className="player-symbol">{symbol}</span> 
            </span>
            <button onClick={handleClick} >{isEditing ? 'Save' : 'Edit'}</button>
          </li>
  )
}

export default Player