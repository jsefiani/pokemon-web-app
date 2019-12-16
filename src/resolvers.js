import { gql } from 'apollo-boost';

export const resolvers = {
	Pokemon: {
		selectedMoves: () => []
	},
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
		},
		addPokemonMove: (
			_root,
			{ id, name, selectedPokemonMove },
			{ cache }
		) => {
			console.log('addPokemonMove', { id });
			const GET_POKEMON = gql`
				query GetPokemon($name: String!) {
					Pokemon(name: $name) @client {
						selectedMoves
					}
				}
			`;
			const { Pokemon } = cache.readQuery({
				id,
				query: GET_POKEMON,
				variables: { name }
			});

			if (Pokemon.selectedMoves.length > 3) return Pokemon.selectedMoves;

			const data = {
				Pokemon: {
					...Pokemon,
					selectedMoves: [
						...Pokemon.selectedMoves,
						{ ...selectedPokemonMove, __typename: 'PokemonMove' }
					]
				}
			};

			cache.writeData({
				id,
				query: GET_POKEMON,
				data,
				variables: { name }
			});

			console.log('addMove', {
				selectedPokemonMove,
				pokemon: Pokemon
			});
			return Pokemon.selectedMoves;
		}
	}
};
