const initialState = {
  y: 200,
  r: 0,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, {type} = {}) => {
  switch (type) {
    case 'FLY':
      return {...state, y: state.y - 50, r: -30}
    case 'FALL':
      return {...state, y: state.y + 20, r: 0}
    case 'GAME_OVER':
      return initialState
    default:
      return state
  }
}
     
