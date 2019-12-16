import { gql } from 'apollo-boost';

export const typeDefs = gql`
	extend type Pokemon {
		selectedMoves: [SelectedPokemonMove!]!
		moves: [PokemonMove!]!
	}

	type SelectedPokemonMove {
		learningMethod: String!
		name: String!
	}

	type PokemonMove {
		learningMethod: String!
		name: String!
		isSelected: Boolean!
	}

	extend type Query {
		Pokemon(name: String!): Pokemon!
		selectedPokemonName: String!
	}

	extend type Mutation {
		setPokemonName(name: String!): selectedPokemonName!
		addPokemonMove(
			name: String!
			selectedPokemonMove: SelectedPokemonMove!
		): [SelectedPokemonMove!]!
	}
`;
