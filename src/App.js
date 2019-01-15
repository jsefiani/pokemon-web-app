import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import styled from "styled-components";
import client from "./graphql";

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 200px;
`;

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Logo src="https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554" />

          <div>BUILD YOUR APP here</div>
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
