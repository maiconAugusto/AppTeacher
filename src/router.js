import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Initial';
import Teacher from './Teacher';
import Register from './RegisterTeacher';
import Search from './Search';
import User from './Home';

const Router = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: {
      header: false,
    },
  },
  Teacher: {
    screen: Teacher,
    navigationOptions: {
      header: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: false,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      header: false,
    },
  },
  User: {
    screen: User,
    navigationOptions: {
      header: false,
    },
  }
});
export default createAppContainer(Router);
