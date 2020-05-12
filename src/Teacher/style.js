import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
export const Form = styled.View`
  flex-direction: row;
  align-items: center;
  height: 55px;
  background-color: white;
  margin: 10px 20px 20px 20px;
  border-radius: 6px;
`;
export const Input = styled.TextInput`
  flex: 1;
`;
export const Buttom = styled.TouchableOpacity`
  height: 55px;
  background-color: #00C593;
  margin: 0px 20px 40px 20px;
  border-radius: 6px;
  justify-content: center;
`;
export const ButtomText = styled.Text`
  color: white;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;