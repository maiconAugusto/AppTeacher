import React from 'react';
import {StatusBar, Text, ActivityIndicator} from 'react-native';
import {Container, Buttom, View, Box, Card, Row} from './style';
import {SearchBar, Icon, Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import api from '../config/api';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      loading: false,
      list: [],
      void: false,
      message: '',
    };
  }
  async SearchGet() {
    this.setState({loading: true, list: []});
    await api
      .get(`query/${this.state.search}`)
      .then(response => {
        this.setState({list: response.data.discipline, loading: false});
      })
      .catch(e => {
        this.setState({list: [], loading: false});
      });
  }
  render() {
    return (
      <>
        <StatusBar backgroundColor="#694AFF" />
        <LinearGradient
          colors={['#694AFF', '#F2BDFF', '#694AFF']}
          style={{flex: 1}}>
          <Container>
            <Text
              style={{
                marginTop: 50,
                color: 'white',
                margin: 14,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Procure a disciplina desejada, e te listaremos os melhores
              professores!
            </Text>
            <View>
              <SearchBar
                value={this.state.search}
                showLoading={this.state.loading}
                clearIcon={false}
                placeholder="Disciplina"
                onChangeText={text => this.setState({search: text})}
                containerStyle={{borderRadius: 6, width: '78%'}}
              />
              <Buttom onPress={() => this.SearchGet()}>
                <Icon name="search" />
              </Buttom>
            </View>
            <Box>
              {this.state.loading === true ? (
                <ActivityIndicator
                  size="large"
                  color="white"
                  style={{marginTop: 100}}
                />
              ) : null}
              {this.state.void === true ? (
                <Text>Nenhum resultado encontrado</Text>
              ) : null}
              {this.state.list.map(element => {
                return (
                  <Card key={element.id}>
                    <Avatar
                      size="xlarge"
                      containerStyle={{marginTop: 20}}
                      rounded
                      source={{uri: `${element.url_avatar}`}}
                    />
                    <Row>
                      <Text
                        style={{
                          marginTop: 14,
                          color: '#616161',
                          fontWeight: 'bold',
                        }}>
                        Nome:
                      </Text>
                      <Text style={{marginTop: 14, color: '#616161'}}>
                        {' '}
                        {element.name}
                      </Text>
                      <Text style={{marginTop: 14, color: '#616161'}}>
                        {' '}
                        {element.lastName}
                      </Text>
                    </Row>
                    <Row>
                      <Text
                        style={{
                          marginTop: 4,
                          color: '#616161',
                          fontWeight: 'bold',
                        }}>
                        Titulariade:
                      </Text>
                      <Text style={{marginTop: 4, color: '#616161'}}>
                        {' '}
                        {element.scholarity}
                      </Text>
                    </Row>
                    <Row>
                      <Text
                        style={{
                          marginTop: 4,
                          color: '#616161',
                          fontWeight: 'bold',
                        }}>
                        Disciplina:
                      </Text>
                      <Text style={{marginTop: 4, color: '#616161'}}>
                        {' '}
                        {element.discipline.name}
                      </Text>
                    </Row>
                    <Row>
                      <Text
                        style={{
                          marginTop: 4,
                          color: '#616161',
                          fontWeight: 'bold',
                        }}>
                        E-mail:
                      </Text>
                      <Text style={{marginTop: 4, color: '#616161'}}>
                        {' '}
                        {element.email}
                      </Text>
                    </Row>
                  </Card>
                );
              })}
            </Box>
          </Container>
          {console.log(this.state.list)}
        </LinearGradient>
      </>
    );
  }
}
export default Search;
