import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { resolvers } from './resolvers';
import { typeDefs } from './schema';

// ? Configure Apollo
const cache = new InMemoryCache();
export default new ApolloClient({
	uri: process.env.REACT_APP_POKE_ENDPOINT,
	clientState: {
		cache,
		defaults: {
			selectedPokemonName: '',
			pokemonSquadList: []
		},
		resolvers
	},
	typeDefs
});
