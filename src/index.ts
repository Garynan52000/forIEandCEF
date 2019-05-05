import { Component } from './assets/classes/component';
import { GiftPack } from './components/gift-pack/gift-pack';
import * as cssModel from './index.scss';
import * as template from './index.handlebars';
import '@babel/polyfill';

class App extends Component {

    private _giftPackComponent: GiftPack;
    // private _windowVar = 'VIP_GIFT_CONFIG';

    constructor() {
        super({
            nodeSelector: '#app',
            template,
            cssModel,
            status: {}
        });
    }
    
    public componentDidInit() {
        this._giftPackComponent = new GiftPack();
    }
}

(() => {
    
    const oDiv = document.createElement('div');
    const oBody = document.querySelector('body');
    let oApp: App;
    oDiv.setAttribute('id', 'app');
    oBody.appendChild(oDiv); 

    oApp = new App(); 
})();
