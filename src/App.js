import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components';
import client from './graphql';

import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

const Logo = styled.img`
	display: block;
	margin: 0 auto;
	max-width: 200px;
`;

const Container = styled.div`
	max-width: 980px;
	margin: 0 auto;
`;

const Layout = styled.div`
	display: flex;
`;

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Container>
					<Logo src="https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554" />
					<Layout>
						<PokemonList />
						<PokemonDetails />
					</Layout>
				</Container>
			</ApolloProvider>
		);
	}
}

export default App;
