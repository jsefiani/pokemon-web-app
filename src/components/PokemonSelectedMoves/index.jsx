import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PokemonSelectedMoves = ({ selectedMoves }) => (
	<Row>
		{selectedMoves.map(({ learnMethod, name }) => (
			<Col xs={6} key={`${learnMethod}_${name}`}>
				{learnMethod}
				<Col>{name}</Col>
			</Col>
		))}
	</Row>
);

export default PokemonSelectedMoves;
