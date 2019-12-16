import { gql } from 'apollo-boost';

export const typeDefs = gql`
	extend type Pokemon {
		selectedMoves: [SelectedPokemonMove!]!
		moves: [PokemonMove!]!
	}

	type SelectedPokemonMove {
		learnMethod: String!
		name: String!
	}

	type PokemonMove {
		learnMethod: String!
		name: String!
		isSelected: Boolean!
	}

	extend type Query {
		Pokemon(name: String!): Pokemon!
		selectedPokemonName: String!
	}

	extend type Mutation {
		SetPokemonName(name: String!): selectedPokemonName!
		TogglePokemonMove(
			name: String!
			selectedPokemonMove: SelectedPokemonMove!
		): [SelectedPokemonMove!]!
	}
`;
