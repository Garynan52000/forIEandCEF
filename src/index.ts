import { Component } from "./assets/classes/component";
import * as styles  from './index.scss';


class App extends Component {

    public nodeSelector = '#app';
    public template = require('./index.handlebars');
    public status = {
        title: '30分钟',
        styles,
    }
    public model = {
    }

    constructor() {
        super();
        this.createRoot();
    }
    
    /**
     * 生成根元素
     */
    private createRoot() {
        const oDiv = document.createElement('div');
        const oBody = document.querySelector('body');
        oDiv.setAttribute('id', 'app');
        oBody.appendChild(oDiv);        
    }
}

new App(); 