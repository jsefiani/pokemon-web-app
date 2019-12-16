import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PokemonAvatar from '../PokemonAvatar';

const GET_POKEMON_SQUADLIST = gql`
	{
		pokemonSquadList @client
	}
`;

const PokemonSquadList = props => {
	const {
		data: { pokemonSquadList }
	} = useQuery(GET_POKEMON_SQUADLIST);
	const renderEmptyCards = () => {
		const numberOfEmptyCardsToRender = 6 - pokemonSquadList.length;
		const nodes = [];
		for (let i = 0; i < numberOfEmptyCardsToRender; i++) {
			nodes.push(<Col xs={2}>Empty</Col>);
		}
		return nodes;
	};
	return (
		<>
			<p>Selected squad list</p>
			<Row>
				{pokemonSquadList.map(({ id, name, image, selectedMoves }) => (
					<Col xs={2}>
						<Row>
							<Col xs={12}>
								<PokemonAvatar imageUrl={image} />
							</Col>
							<Col xs={12}>
								<h4>{name}</h4>
							</Col>
							<ul>
								{selectedMoves.map(pokemonMove => (
									<li key={id}>{pokemonMove.name}</li>
								))}
							</ul>
						</Row>
					</Col>
				))}
				{renderEmptyCards()}
			</Row>
		</>
	);
};

export default PokemonSquadList;
