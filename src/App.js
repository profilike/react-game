import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import Game from './containers/Game/Game'

class App extends Component {
	render() {
		return (
			<Layout>
				<Game></Game>
			</Layout>
		)
	}
}

export default App
