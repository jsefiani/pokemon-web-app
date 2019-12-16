import { gql } from 'apollo-boost';

export const resolvers = {
	Pokemon: {
		// ? Adding this property to existing Pokemon type
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
		togglePokemonMove: (
			_root,
			{ id, name, selectedPokemonMove },
			{ cache }
		) => {
			const GET_POKEMON = gql`
				query GetPokemon($name: String!) {
					Pokemon(name: $name) @client {
						id
						selectedMoves
					}
				}
			`;
			const { Pokemon } = cache.readQuery({
				id,
				query: GET_POKEMON,
				variables: { name }
			});

			// ? Here we check whether the pokemon move has been selected before in order to determine whether we need to remove it or not
			const hasBeenSelected = Pokemon.selectedMoves.some(
				({ name }) => name === selectedPokemonMove.name
			);

			if (!hasBeenSelected && Pokemon.selectedMoves.length > 3)
				return Pokemon.selectedMoves;

			const data = hasBeenSelected
				? {
						Pokemon: {
							...Pokemon,
							selectedMoves: [
								...Pokemon.selectedMoves.filter(
									({ name }) =>
										name !== selectedPokemonMove.name
								)
							]
						}
				  }
				: {
						Pokemon: {
							...Pokemon,
							selectedMoves: [
								...Pokemon.selectedMoves,
								{
									...selectedPokemonMove,
									__typename: 'PokemonMove'
								}
							]
						}
				  };

			cache.writeQuery({
				id,
				query: GET_POKEMON,
				data,
				variables: { name }
			});

			return data.Pokemon.selectedMoves;
		},
		addPokemonToSquadList: (_root, { name, id }, { cache }) => {
			const GET_POKEMON = gql`
				query GetPokemon($name: String!) {
					Pokemon(name: $name) @client {
						id
						name
						image
						selectedMoves
					}
				}
			`;

			const GET_POKEMON_SQUADLIST = gql`
				{
					pokemonSquadList @client
				}
			`;

			const { Pokemon } = cache.readQuery({
				query: GET_POKEMON,
				variables: { name }
			});

			const { pokemonSquadList } = cache.readQuery({
				query: GET_POKEMON_SQUADLIST
			});

			if (pokemonSquadList.length > 5) return pokemonSquadList;

			const newPokemonSquadList = [...pokemonSquadList, Pokemon];

			cache.writeQuery({
				query: GET_POKEMON_SQUADLIST,
				data: { pokemonSquadList: newPokemonSquadList }
			});

			return newPokemonSquadList;
		}
	}
};
