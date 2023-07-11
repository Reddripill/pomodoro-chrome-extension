import React from 'react'
import ReactDOM from "react-dom/client"
import App from '../components/App/App';
import '../style.scss'


const root = ReactDOM.createRoot(
	document.getElementById('root-pomadoro-extension') as HTMLElement
)



root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

