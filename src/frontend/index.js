import React from "react"
import ReactDOM from "react-dom"
import CounterComponent from "./components/CounterComponent"

const wrapper = document.getElementById('base')
wrapper && ReactDOM.render(<CounterComponent />, wrapper)