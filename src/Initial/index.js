import React, {useState, useEffect} from 'react';
import {StatusBar, Animated, StyleSheet} from 'react-native';
import {Container, Form, Text, Buttom} from './style';
import LinearGradient from 'react-native-linear-gradient';

function Home({navigation}) {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 150}));

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 1,
      bounciness: 10,
    }).start();
  }, [offset.y]);

  return (
    <>
      <StatusBar backgroundColor="#694AFF" />
      <LinearGradient
        colors={['#694AFF', '#F2BDFF', '#694AFF']}
        style={{flex: 1}}>
        <Container>
          <Animated.View
            style={[style.fx, {transform: [{translateY: offset.y}]}]}>
            <Form>
              <Text style={{fontSize: 18, marginBottom: 48, color: 'white'}}>
                Você é professor e está buscando novas oportunidades? ou você ou
                está procurando um professor?
              </Text>
              <Buttom onPress={() => navigation.navigate('Teacher')}>
                <Text style={{textTransform: 'uppercase'}}>
                  Quero dar aulas
                </Text>
              </Buttom>
              <Buttom onPress={() => navigation.navigate('Search')}>
                <Text style={{textTransform: 'uppercase'}}>
                  Quero um professor
                </Text>
              </Buttom>
            </Form>
          </Animated.View>
        </Container>
      </LinearGradient>
    </>
  );
}
export default Home;
const style = StyleSheet.create({
  fx: {
    width: '100%',
  },
});
