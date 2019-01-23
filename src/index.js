import React, {Component} from "react";
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import styles from './styles.css'
const socket = io.connect('ws://localhost:3004')
socket.on('ping', (d) => console.log(d))

class App extends Component {
  socket = null
  state = {
    x: 0,
    y: 0,
    hexValue: '#000'
  }
  
  onMouseMove = ({clientX, clientY}) => {
    socket.emit('inputData', {x: clientX, y: clientY})
    this.setState({x: clientX, y: clientY})
  }

  componentDidMount(){
    socket.on('outputData', data => {
      const {hexValue} = data
      console.log(hexValue, data)
      this.setState({ hexValue})
    })

    window.addEventListener('mousemove', this.onMouseMove)
  }

  componentWillUnmount(){
    window.removeEventListener('mousemove', this.onMouseMove)
  }
  
  render () {
    const {x, y, hexValue} = this.state
    
    return (
      <div className={styles.stats} style={{background: hexValue}}>
        <h1>Move the mouse around</h1>
        <div><strong>X: </strong>{x}</div>
        <div><strong>Y: </strong>{y}</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));