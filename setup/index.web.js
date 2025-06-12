import { AppRegistry } from 'react-native';
import App from '../Frontend/App';
import appJson from './config.js';
const { name: appName } = appJson;

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});