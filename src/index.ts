import { Component } from "./assets/classes/component";
import * as styles  from './index.scss';

declare const window: any;

class AppStatus {
    title = '31分钟1';
    config = {
        gift: {
            style: {
                width: '276px',
                height: '238px',
                containerBgImg: 'Assets/imgs/gift-containerBg.png',
                btnBgImg: 'Assets/imgs/gift-btnBg.png',
                btnBgImgHover: 'Assets/imgs/gift-btnBg-hover.png',
                btnBgImgPress: 'Assets/imgs/gift-btnBg-press.png',
            },
            btnText: '',
            bottomTips: '礼包限量 5 万份，没人限购 1 份'
        }
    }
}
const status = new AppStatus();

class App extends Component<AppStatus> {

    private _windowVar = 'VIP_GIFT_CONFIG';

    constructor() {
        super({
            nodeSelector: '#app',
            template: require('./index.handlebars'),
            cssModel: styles,
            status
        });
    }

    public componentWillInit() {
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

    /**
     * 设置 window 下的环境变量
     */
    private _setWindowConfiguration() {
        window[this._windowVar] = Object.assign(this.status.config, window[this._windowVar] || {}); 
    }
}

new App(); 