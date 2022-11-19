const initialState = {
  x: window.innerWidth - 150,
  pipes: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, {type} = {}) => {
  const wHeight = window.innerHeight
  switch (type) {
    case 'RUNNING':
      if (!state.pipes.length) {
        return state
      }
      return {...state, x: state.x - 15}
    case 'GENERATE':
      let randomHeight = Math.round(Math.random() * 200) 
      while(randomHeight < 100 || 2 * randomHeight > wHeight - 160) {
        randomHeight = Math.round(Math.random() * 200) 
      }
      const topHeight = randomHeight// Math.round(Math.random() * 200) + 110
      return {...state, pipes: [...state.pipes, {topHeight}]}
    case 'GAME_OVER':
      return initialState
    default:
      return state
  }
}
