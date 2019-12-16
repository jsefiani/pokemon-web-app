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

	type PokemonSquadListMember {
		name: String!
		image: String!
		selectedMoves: [SelectedPokemonMove!]!
	}

	extend type Query {
		Pokemon(name: String!): Pokemon!
		selectedPokemonName: String!
		pokemonSquadList: [PokemonSquadListMember!]!
	}

	extend type Mutation {
		SetPokemonName(name: String!): selectedPokemonName!
		TogglePokemonMove(
			id: ID!
			name: String!
			selectedPokemonMove: SelectedPokemonMove!
		): [SelectedPokemonMove!]!
		AddPokemonToSquadList(
			name: String!
			id: ID!
		): [PokemonSquadListMember!]!
	}
`;
