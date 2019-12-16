import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
	PokemonListContainer,
	PokemonListItemContainer,
	Container
} from './PokemonList.styles';

const GET_POKEMONS = gql`
	{
		Pokemons {
			id
			name
		}
	}
`;

const SET_POKEMON_NAME = gql`
	mutation SetPokemonName($name: String!) {
		setPokemonName(name: $name) @client
	}
`;

const PokemonList = props => {
	const [filter, setFilter] = useState('');

	const { data, loading } = useQuery(GET_POKEMONS);
	// ? This mutation sets the pokemon name so that we can later query it and make an API call with that value
	const [setPokemonName] = useMutation(SET_POKEMON_NAME);

	// ? Client-side filtering
	let filteredPokemons = [];
	if (!loading) {
		filteredPokemons = data.Pokemons.filter(pokemon =>
			pokemon.name.startsWith(filter.toLowerCase())
		);
	}

	return (
		<Container>
			<p>Select a pokemon</p>
			<input
				placeholder="TYPE TO FILTER"
				onChange={({ target: { value } }) => setFilter(value)}
			/>
			<PokemonListContainer>
				{loading ? (
					<p>Loading...</p>
				) : (
					filteredPokemons.map(({ id, name }) => (
						<PokemonListItemContainer
							key={id}
							onClick={() =>
								setPokemonName({ variables: { name } })
							}
						>
							{name}
						</PokemonListItemContainer>
					))
				)}
			</PokemonListContainer>
		</Container>
	);
};

export default PokemonList;
