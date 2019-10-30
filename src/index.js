import React from 'react'
import { render } from 'react-dom'
import Header from './components/Header'
import Projects from './components/Projects'
import './components/App.css'

const App = () => (
  <div>
    <Header/>
    <Projects/>
  </div>
)

render(<App/>,document.getElementById('app'))