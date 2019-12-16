import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PokemonSelectedMoves = ({ selectedMoves }) => {
	console.log({ selectedMoves });
	return (
		<>
			<Row>
				<Col>
					<span>{selectedMoves[0]?.learnMethod}</span>
					<span>{selectedMoves[0]?.name}</span>
				</Col>
				<Col>
					<span>{selectedMoves[1]?.learnMethod}</span>
					<span>{selectedMoves[1]?.name}</span>
				</Col>
			</Row>
			<Row>
				<Col>
					<span>{selectedMoves[2]?.learnMethod}</span>
					<span>{selectedMoves[2]?.name}</span>
				</Col>
				<Col>
					<span>{selectedMoves[3]?.learnMethod}</span>
					<span>{selectedMoves[3]?.name}</span>
				</Col>
			</Row>
		</>
	);
};

export default PokemonSelectedMoves;
