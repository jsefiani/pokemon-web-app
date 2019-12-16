import { gql } from 'apollo-boost';

export const typeDefs = gql`
	extend type Pokemon {
		id: ID!
		name: String!
	}

	type Query {
		Pokemons: [Pokemon!]!
		selectedPokemonName: String!
	}

	type Mutation {
		setPokemonName(name: String!): selectedPokemonName!
	}
`;
