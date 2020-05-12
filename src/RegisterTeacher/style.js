import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  margin-top: 40px;
`;
export const View = styled.View`
  align-items: center;
`;
export const InputBox = styled.View`
  height: 55px;
  margin: 0px 20px 20px 20px;
  border-radius: 6px;
  flex-direction: row;
  justify-content: space-between;
`;
export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#616161',
})`
  height: 50px;
  background-color: white;
  margin: 0px 20px 20px 20px;
  border-radius: 6px;
  padding-left: 8px;
  font-size: 16px;
`;
export const Buttom = styled.TouchableOpacity`
  height: 55px;
  background-color: #00c593;
  margin: 0px 20px 10px 20px;
  border-radius: 6px;
  justify-content: center;
`;
export const ButtomText = styled.Text`
  color: white;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
`;
export const Picker = styled.Picker`
  height: 50px;
  background-color: white;
  margin: 0px 20px 20px 20px;
  border-radius: 6px;
  color: #616161;
`;
export const ButtomAdd = styled(RectButton)`
  height: 50px;
  width: 55px;
  background-color: white;
  border-radius: 6px;
`;
export const ViewDiscipline = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0px 20px 10px 20px;
`;
export const ViewDisciplineText = styled.View`
  flex-direction: row;
`;
export const Text = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 8px;
`;
