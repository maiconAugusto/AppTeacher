import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.View`
  height: 60%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 12px;
`;
export const Text = styled.Text`
  color: #616161;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
export const Buttom = styled(RectButton)`
  height: 50px;
  background-color: white;
  width: 80%;
  justify-content: center;
  border-radius: 30px;
`;
