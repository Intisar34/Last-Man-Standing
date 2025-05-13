import { AppRegistry } from 'react-native';
import App from '../Frontend/App.js';
import appJson from './config.js';
const { name: appName } = appJson;

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});