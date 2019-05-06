import 'core-js/modules/es6.object.seal';
import { Component } from './assets/classes/component';
import { GiftPack } from './components/gift-pack/gift-pack';
import * as cssModel from './index.scss';
import * as template from './index.handlebars';

declare var window: any;

class App extends Component {
    
    private _giftPackComponent: GiftPack;

    constructor() {
        super({
            node: document.getElementById('app'),
            template,
            cssModel,
            status: {}
        });
    }
    
    public componentDidInit() {
        window.GIFT_PACK_COMPONENT = this._giftPackComponent = new GiftPack();
    }
}

(() => {
    const oDiv = document.createElement('div');
    const oBody = document.body || document.getElementsByTagName('body')[0];
    let oApp: App;
    oDiv.setAttribute('id', 'app');
    oBody.appendChild(oDiv); 

    oApp = new App(); 
})();
