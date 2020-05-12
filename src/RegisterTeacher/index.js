import React, {useState} from 'react';
import {Icon, Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  Input,
  View,
  Container,
  Buttom,
  ButtomText,
  Picker,
  InputBox,
  ButtomAdd,
  ViewDiscipline,
  ViewDisciplineText,
  Text,
} from './style';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import api from '../config/api';
import {Alert, ActivityIndicator} from 'react-native';

const titularidade = ['Bacharel', 'Mestrado', 'Doutorado', 'Phd'];
const Teacher = ({navigation}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [scholarity, setScholarity] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [listDiscipline, setListDiscipline] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [video, setVideo] = useState('');
  const [pdf, setPdf] = useState('');
  const [avatarSee, setAvatarSee] = useState('');
  const [loading, setLoadin] = useState(false);
  const [btn, setBtn] = useState(false);

  const options = {
    title: 'Selecione ou grave um video de até no maximo 6 minutos!',
    durationLimit: 300,
    mediaType: 'video',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const optionPicker = {
    title: 'Selecione uma foto!',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  function getTake() {
    ImagePicker.showImagePicker(optionPicker, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setAvatarSee(source);
        setAvatar(response);
      }
    });
  }
  async function sendAvatar(id) {
    RNFetchBlob.fetch(
      'POST',
      `http://localhost/update-avatar/${id}`,
      {
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [{name: 'file', filename: avatar.fileName, data: avatar.data}],
    );
  }

  async function Video(id) {
    RNFetchBlob.fetch(
      'POST',
      `http://localhost/update-apresentation/${id}`,
      {
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: 'myvidoe.mp4',
          data: RNFetchBlob.wrap(video.uri),
        },
      ],
    );
  }

  async function Pdf(id) {
    RNFetchBlob.fetch(
      'POST',
      `http://localhost/update-curriculum/${id}`,
      {
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: 'x.pdf',
          data: RNFetchBlob.wrap(pdf.uri),
        },
      ],
    );
  }

  function insertDiscipline() {
    if (discipline === '') {
      return;
    }
    if (listDiscipline.length === 5) {
      return;
    }
    setListDiscipline(state => [...state, discipline]);
    setDiscipline('');
  }
  function removeDiscipline(index) {
    const list = listDiscipline.filter((element, indice) => {
      return indice !== index;
    });
    setListDiscipline(list);
  }

  async function uploadVideo() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      setVideo(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  function RecordVideo() {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setVideo(response);
      }
    });
  }
  async function uploadPdf() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setPdf(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  async function submitAPI() {
    try {
      if (
        name === '' ||
        email === '' ||
        cpf === '' ||
        listDiscipline.length === 0 ||
        scholarity === '' ||
        password === ''
      ) {
        Alert.alert('Atenção!', 'Todos os campos devem ser preenchidos!');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Atenção', 'Sua senha deve conter no minímo 6 caracteres');
        return;
      }
      setLoadin(true);
      setBtn(true);
      const response = await api.post('register/teacher', {
        name,
        lastName,
        email,
        password,
        cpf,
        scholarity,
      });
      const {id} = response.data.user;

      listDiscipline.map(async element => {
        await api.post('http://localhost/discipline', {
          name: element,
          userId: id,
        });
      });
      sendAvatar(id);
      Video(id);
      Pdf(id);
      setLoadin(false);
      setBtn(false);
      setName('');
      setLastName('');
      setEmail('');
      setpassword('');
      setAvatarSee('');
      setListDiscipline('');
      setScholarity('');
      Alert.alert('Parabéns!', 'Seu cadastro foi realizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      setLoadin(false);
      setBtn(false);
    }
  }
  return (
    <LinearGradient
      colors={['#694AFF', '#F2BDFF', '#694AFF']}
      style={{flex: 1}}>
      <Container>
        <View>
          <Avatar
            size="large"
            rounded
            source={avatarSee}
            showAccessory
            onPress={() => getTake()}
            containerStyle={{marginBottom: 40, backgroundColor: 'white'}}
          />
        </View>
        <Input
          value={name}
          keyboardType="default"
          onChangeText={text => setName(text)}
          placeholder="Nome"
          autoFocus={true}
          returnKeyType="done"
          autoCapitalize="none"
        />
        <Input
          value={lastName}
          keyboardType="default"
          onChangeText={text => setLastName(text)}
          placeholder="SobreNome"
        />
        <Input
          value={cpf}
          onChangeText={text => setCpf(text)}
          keyboardType="numeric"
          placeholder="Cpf"
          maxLength={11}
        />
        <Input
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          placeholder="E-mail"
        />
        <InputBox>
          <Input
            value={discipline}
            maxLength={30}
            style={{marginLeft: 0, width: '80%'}}
            placeholder="Adicione até 5 matérias"
            onChangeText={text => setDiscipline(text)}
          />
          <ButtomAdd
            onPress={() => insertDiscipline()}
            style={{justifyContent: 'center'}}>
            <Icon name="add" />
          </ButtomAdd>
        </InputBox>
        <ViewDiscipline>
          {listDiscipline.map((element, index) => {
            return (
              <ViewDisciplineText>
                <Icon
                  onPress={() => removeDiscipline(index)}
                  name="delete"
                  color="red"
                  size={24}
                />
                <Text>{element}</Text>
              </ViewDisciplineText>
            );
          })}
        </ViewDiscipline>
        <Picker
          mode="dialog"
          selectedValue={scholarity}
          onValueChange={value => setScholarity(value)}>
          <Picker.Item value="" label="Titulariade" />
          {titularidade.map(element => {
            return (
              <Picker.Item key={element} value={element} label={element} />
            );
          })}
        </Picker>
        <Input
          value={password}
          onChangeText={text => setpassword(text)}
          placeholder="Senha"
          secureTextEntry
        />
        <View>
          <Text style={{textAlign: 'center', marginBottom: 40}}>
            Selecione ou grave um video de sua apresentação!
          </Text>
          <InputBox style={{width: '60%'}}>
            <Icon
              name="perm-media"
              color="white"
              onPress={() => uploadVideo()}
              size={30}
            />
            <Icon
              name="local-see"
              color="white"
              onPress={() => RecordVideo()}
              size={30}
            />
          </InputBox>
          {video === '' ? null : (
            <Icon
              name="done"
              size={40}
              color="green"
              style={{marginBottom: 50}}
            />
          )}
        </View>
        <View>
          <Text>Selecione um currículo</Text>
        </View>
        <Icon
          name="cloud-upload"
          color="white"
          size={30}
          onPress={() => uploadPdf()}
          containerStyle={{marginBottom: 20}}
        />
        {pdf === '' ? null : (
          <Icon
            name="done"
            size={40}
            color="green"
            style={{marginBottom: 20}}
          />
        )}
        <Buttom onPress={() => submitAPI()} disabled={btn}>
          {loading === true ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <ButtomText>Cadastrar</ButtomText>
          )}
        </Buttom>
      </Container>
    </LinearGradient>
  );
};
export default Teacher;
