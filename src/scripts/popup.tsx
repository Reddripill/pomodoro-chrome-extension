import React from 'react'
import ReactDOM from "react-dom/client"
import App from '../components/App/App';
import '../style.scss'


const root = ReactDOM.createRoot(
	document.getElementById('root-pomadoro-extension') as HTMLElement
)

const port = chrome.runtime.connect({name: 'timer'})

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

