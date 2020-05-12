import React, {useState} from 'react';
import {View, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Input, Form, Container, Buttom, ButtomText} from './style';
import api from '../config/api';

const Teacher = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [btn, setBtn] = useState(false);

  async function Login() {
    try {
      if (email === '' || password === '') {
        Alert.alert('Atenção!', 'Informe todos os dados!');
        return;
      }

      setloading(true);
      setBtn(true);
      const response = await api.post('authentication', {
        email,
        password,
      });
      if (
        response.data.user === 'e-mail não cadastrado' ||
        response.data.user === 'senha incorreta'
      ) {
        setloading(false);
        setBtn(false);
        Alert.alert('Atenção', response.data.user);
      } else {
        navigation.navigate('User', {user: response.data.users});
        setloading(false);
        setBtn(false);
      }
    } catch (err) {}
  }
  return (
    <LinearGradient
      colors={['#694AFF', '#F2BDFF', '#694AFF']}
      style={{flex: 1}}>
      <Container>
        <Form>
          <Icon style={{marginLeft: 8}} name="email" color="#694AFF" />
          <Input
            value={email}
            placeholder="E-mail"
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoFocus={true}
            returnKeyType="done"
            autoCapitalize="none"
          />
        </Form>
        <Form>
          <Icon style={{marginLeft: 8}} name="vpn-key" color="#694AFF" />
          <Input
            value={password}
            placeholder="Senha"
            onChangeText={text => setPassword(text)}
            secureTextEntry
            returnKeyType="done"
            keyboardType="default"
          />
        </Form>
        <Buttom onPress={() => Login()} disabled={btn}>
          {loading === true ? (
            <ActivityIndicator size="small" />
          ) : (
            <ButtomText>Entrar</ButtomText>
          )}
        </Buttom>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginLeft: '20%', marginRight: '20%'}}>
          <ButtomText>Não tem cadastro? cadastre-se!</ButtomText>
        </TouchableOpacity>
      </Container>
    </LinearGradient>
  );
};
export default Teacher;
