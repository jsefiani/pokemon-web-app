import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { PokemonDetailsMovesContainer } from './PokemonMoves.styles';

const GET_SELECTED_POKEMON_NAME = gql`
	{
		selectedPokemonName @client
	}
`;

const TOGGLE_POKEMON_MOVE = gql`
	mutation TogglePokemonMove(
		$name: String
		$selectedPokemonMove: SelectedPokemonMove!
		$id: ID!
	) {
		togglePokemonMove(
			name: $name
			selectedPokemonMove: $selectedPokemonMove
			id: $id
		) @client
	}
`;

const PokemonMoves = ({ moves }) => {
	const {
		data: { selectedPokemonName }
	} = useQuery(GET_SELECTED_POKEMON_NAME);
	const [togglePokemonMove] = useMutation(TOGGLE_POKEMON_MOVE);

	return (
		<PokemonDetailsMovesContainer>
			{moves.map(({ name, learnMethod }, index) => (
				<li
					key={index}
					onClick={() =>
						togglePokemonMove({
							variables: {
								name: selectedPokemonName,
								selectedPokemonMove: {
									name,
									learnMethod
								}
							}
						})
					}
				>
					{name}
				</li>
			))}
		</PokemonDetailsMovesContainer>
	);
};

export default PokemonMoves;
