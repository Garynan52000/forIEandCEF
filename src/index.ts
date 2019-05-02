import { Component } from "./assets/classes/component";
import * as styles  from './index.scss';


class App extends Component {

    public nodeSelector = '#app';
    public template = require('./index.handlebars');
    public status = {
        title: 'hello world',
        styles,
    }
    public model = {
    }

    constructor() {
        super();
    }
}

new App(); 