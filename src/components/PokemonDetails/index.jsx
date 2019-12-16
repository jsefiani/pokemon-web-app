import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_SELECTED_POKEMON_NAME = gql`
	{
		selectedPokemonName @client
	}
`;

const GET_POKEMON = gql`
	query GetPokemon($name: String!) {
		Pokemon(name: $name) {
			name
			image
			types(first: 1) {
				name
			}
			abilities {
				name
			}
			stats {
				name
				value
			}
		}
	}
`;

const PokemonDetails = props => {
	const {
		data: { selectedPokemonName }
	} = useQuery(GET_SELECTED_POKEMON_NAME);
	const { data } = useQuery(GET_POKEMON, {
		variables: { name: selectedPokemonName }
	});

	if (!data?.hasOwnProperty('Pokemon')) return null;
	return <h2>{data.Pokemon.name}</h2>;
};

export default PokemonDetails;
