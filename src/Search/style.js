import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
`;
export const View = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
`;
export const Buttom = styled(RectButton)`
  height: 65px;
  width: 12%;
  background-color: #00c593;
  border-radius: 6px;
  justify-content: center;
`;
export const Box = styled.View`
  flex-direction: column;
`;
export const Card = styled.View`
  background-color: white;
  border-radius: 6px;
  align-items: center;
  flex-direction: column;
  margin: 14px;
  height: 300px;
`;
export const Row = styled.View`
  flex-direction: row;
`;
