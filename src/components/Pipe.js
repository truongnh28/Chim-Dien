import React from 'react'
import './Pipe.css'
import { connect } from 'react-redux'
import TopPipeImage from '../image/pipe-top.png'
import BottomPipeImage from '../image/pipe-bottom.png'

const Pipe = ({x, pipes}) => {
  const wHeight = window.innerHeight;
  return (
    <div
      style={{
        position: 'relative',
      }}>
      {pipes.map(({topHeight}, i) => (
        <div
          key={`pipe-${i}`}
          style={{
            position: 'relative',
          }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: (x + i * 230 > window.innerWidth - 80) ? window.innerWidth - 80 : x + i * 230,
              width: 70,
              height: topHeight,
              background: `url(${TopPipeImage})`,
              backgroundPosition: 'bottom',
              transition: 'left 300ms',
							backgroundSize: 'cover',
        			backgroundRepeat: 'no-repeat',
            }}></div>
          <div
            style={{
              position: 'absolute',
              top: topHeight + 150,
              left: (x + i * 230 > window.innerWidth - 80) ? window.innerWidth - 80 : x + i * 230,
              width: 70,
              height: wHeight - topHeight - 150,
              background: `url(${BottomPipeImage})`,
              transition: 'left 300ms',
							backgroundSize: 'cover',
        			backgroundRepeat: 'no-repeat',
            }}></div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = ({pipe}) => ({x: pipe.x, pipes: pipe.pipes})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Pipe)
