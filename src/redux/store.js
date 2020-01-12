import {createStore} from 'redux';
import reducer from './reducer';
import {devToolsEnhancer} from 'redux-devtools-extension'

export default createStore(reducer, devToolsEnhancer());