import React, { useEffect } from 'react'
import './Game.css'
import Bird from './Bird'
import Pipe from './Pipe'
import { connect } from "react-redux";
import bird from '../reducers/bird';

let gameLoop
let pipeGenerator

const Game = ({status, start, fly}) => {
  if (status === 'game-over') {
    clearInterval(gameLoop)
    clearInterval(pipeGenerator)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 32) {
        fly()
      }
      if(status !== 'playing') {
        start()
      }
    }
    document.addEventListener('keypress', handleKeyPress)
  }, [])
  return (
    <div className='Game'>
      <Bird />                                          
      <Pipe /> 
    </div>
  )
}

const fly = () => {
  return (dispatch) => {
    dispatch({type: 'FLY'})
  }
} 

const start = () => {
  return (dispatch, getState) => {
    const {status} = getState().game
    
    if(status !== 'playing') {
      gameLoop = setInterval(() => {
        dispatch({type: 'FALL'})
        dispatch({type: 'RUNNING'})

        check(dispatch, getState)
      }, 180);

      pipeGenerator = setInterval(() => {
        dispatch({type: 'GENERATE'})
      }, 2780)
      console.log(getState)
      dispatch({type: 'START'})
    }
  }
}      

const check = (dispatch, getState) => {
  const wHeight = window.innerHeight
  const wWidth = window.innerWidth
  const state = getState()
  const birdY = state.bird.y
  const pipes = state.pipe.pipes
  const x = state.pipe.x
  const challenge = pipes.map(({topHeight}, index) => {
    return {
      x1: x + index * 230,
      y1: topHeight,
      x2: x + index * 230,
      y2: topHeight + 150
    }
  }).filter(({x1}) => {
    if(x1 > 280 && x1 < 360) {
      return true
    }
  })

  if(birdY > wHeight - 60 || birdY < 0) {
    dispatch({type: 'GAME_OVER'})
  }

  if(challenge.length) {
    const {x1, y1, x2, y2} = challenge[0]
    if(
      (x1 < 300 && 300 < x1 + 70 && birdY < y1 + 20) || 
      ((x1 < 300 && 300 < x1 + 70 && birdY > y2 - 20))) {
      dispatch({type: 'GAME_OVER'})
    }
  }
}

const mapStateToProps = ({game}) => ({status: game.status})
const mapDispatchToProps = {start, fly}

export default connect(mapStateToProps, mapDispatchToProps)(Game)