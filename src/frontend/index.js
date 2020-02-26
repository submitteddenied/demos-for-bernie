import React from "react"
import ReactDOM from "react-dom"
import CounterComponent from "./components/CounterComponent"

import './style/style.css'

const wrapper = document.getElementById('base')
wrapper && ReactDOM.render(<CounterComponent />, wrapper)