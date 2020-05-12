import React from 'react';
import {Container, Text} from './style';

const Home = ({navigation}) => {
  return (
    <Container>
      <Text>Parabéns!</Text>
      <Text>
        {navigation.getParam('user').name}
        {'você está logado!'}
      </Text>
    </Container>
  );
};
export default Home;
