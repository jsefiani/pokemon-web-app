import { gql } from 'apollo-boost';

export const resolvers = {
	Mutation: {
		setPokemonName: (_root, { name }, { cache }) => {
			const GET_POKEMON_NAME = gql`
				{
					selectedPokemonName @client
				}
			`;
			cache.writeData({
				query: GET_POKEMON_NAME,
				data: { selectedPokemonName: name }
			});

			return name;
		}
	}
};
