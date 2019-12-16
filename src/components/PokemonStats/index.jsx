import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PokemonStats = ({ stats }) => (
	<>
		<Row>
			<Col>
				<span>{stats[0].name}</span>
				<span>{stats[0].value}</span>
			</Col>
			<Col>
				<span>{stats[1].name}</span>
				<span>{stats[1].value}</span>
			</Col>
		</Row>
		<Row>
			<Col>
				<span>{stats[2].name}</span>
				<span>{stats[2].value}</span>
			</Col>
			<Col>
				<span>{stats[3].name}</span>
				<span>{stats[3].value}</span>
			</Col>
		</Row>
		<Row>
			<Col>
				<span>{stats[4].name}</span>
				<span>{stats[4].value}</span>
			</Col>
			<Col>
				<span>{stats[5].name}</span>
				<span>{stats[5].value}</span>
			</Col>
		</Row>
	</>
);

export default PokemonStats;
