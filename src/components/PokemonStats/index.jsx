import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PokemonStats = ({ stats }) => (
	<Row>
		{stats.map(({ name, value }) => (
			<Col xs={6} key={`${name}_${value}`}>
				<Row>
					<Col>{name}</Col>
					<Col>{value}</Col>
				</Row>
			</Col>
		))}
	</Row>
);

export default PokemonStats;
