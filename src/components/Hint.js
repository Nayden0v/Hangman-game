import React from 'react'

const Hint = ({selectedHint}) => {
  return (
    <div>
      <p style={{color:"lightgreen"}}>Hint : <span>{selectedHint}</span></p>
    </div>
  )
}

export default Hint
