import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PokemonStats from '../PokemonStats';
import PokemonSelectedMoves from '../PokemonSelectedMoves';
import PokemonAvatar from '../PokemonAvatar';
import { PokemonDetailsHeading } from '../_common/_common.styles';
import { PokemonDetailsMovesContainer } from './PokemonDetails.styles';

const GET_SELECTED_POKEMON_NAME = gql`
	{
		selectedPokemonName @client
	}
`;

const GET_POKEMON = gql`
	query GetPokemon($name: String!) {
		Pokemon(name: $name) {
			id
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
			moves {
				learnMethod
				name
			}
			selectedMoves @client
		}
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

const PokemonDetails = props => {
	const {
		data: { selectedPokemonName }
	} = useQuery(GET_SELECTED_POKEMON_NAME);

	const { data } = useQuery(GET_POKEMON, {
		variables: { name: selectedPokemonName }
	});

	const [togglePokemonMove] = useMutation(TOGGLE_POKEMON_MOVE);

	if (!data?.hasOwnProperty('Pokemon')) return null;

	return (
		<Container fluid={true}>
			<Row>
				<Col>
					<div>
						<PokemonAvatar imageUrl={data.Pokemon.image} />
						<h2>{data.Pokemon.name}</h2>
						<button>Save Pokemon</button>
					</div>
				</Col>
				<Col xs={6}>
					<PokemonDetailsHeading>Stats</PokemonDetailsHeading>
					<PokemonStats stats={data.Pokemon.stats} />
					<PokemonDetailsHeading>
						Selected moves
					</PokemonDetailsHeading>
					<PokemonSelectedMoves
						selectedMoves={data.Pokemon.selectedMoves}
					/>
				</Col>
				<Col>
					<PokemonDetailsHeading>Moves</PokemonDetailsHeading>
					<PokemonDetailsMovesContainer>
						{data.Pokemon.moves.map(
							({ name, learnMethod }, index) => (
								<li
									key={index}
									onClick={() =>
										togglePokemonMove({
											variables: {
												id: data.Pokemon.id,
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
							)
						)}
					</PokemonDetailsMovesContainer>
				</Col>
			</Row>
		</Container>
	);
};

export default PokemonDetails;
