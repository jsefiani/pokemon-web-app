import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PokemonStats from '../PokemonStats';
import PokemonSelectedMoves from '../PokemonSelectedMoves';
import PokemonAvatar from '../PokemonAvatar';
import PokemonMoves from '../PokemonMoves';
import { PokemonDetailsHeading } from '../_common/_common.styles';

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

const ADD_POKEMON_TO_SQUADLIST = gql`
	mutation AddPokemonToSquadList($name: String, $id: ID!) {
		addPokemonToSquadList(name: $name, id: $id) @client
	}
`;

const PokemonDetails = props => {
	const {
		data: { selectedPokemonName }
	} = useQuery(GET_SELECTED_POKEMON_NAME);

	const { data } = useQuery(GET_POKEMON, {
		variables: { name: selectedPokemonName }
	});

	const [addPokemonToSquadList] = useMutation(ADD_POKEMON_TO_SQUADLIST);

	if (!data?.hasOwnProperty('Pokemon')) return null;

	return (
		<Container fluid={true}>
			<Row>
				<Col>
					<div>
						<PokemonAvatar imageUrl={data.Pokemon.image} />
						<h2>{data.Pokemon.name}</h2>
						<button
							onClick={() =>
								addPokemonToSquadList({
									variables: { name: selectedPokemonName }
								})
							}
						>
							Save Pokemon
						</button>
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
					<PokemonMoves moves={data.Pokemon.moves} />
				</Col>
			</Row>
		</Container>
	);
};

export default PokemonDetails;
