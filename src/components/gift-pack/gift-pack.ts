import { Component } from '../../assets/classes/component';
import * as cssModel from './gift-pack.scss';
import * as containerBgImg from 'Assets/imgs/gift-containerBg.png';
import * as template from './gift-pack.handlebars';


// declare const window: any;

export class GiftPackStatus {
    public containerBgImg = containerBgImg;
    public containerStyle = `
        position: absolute;
        z-index: 9999;
        top: 100px;
        left: 100px;
        width: 276px; 
        height: 287px; 
        background-image: url(${containerBgImg});
        background-position: top center;
        background-repeat: no-repeat;
    `;
    public innerStyle = `
        top: 100px;
        height: 178px;
    `;
    public style = {
        height: '238px',
        width: '',
        containerBgImg: 'Assets/imgs/gift-containerBg.png',
        btnBgImg: 'Assets/imgs/gift-btnBg.png',
        btnBgImgHover: 'Assets/imgs/gift-btnBg-hover.png',
        btnBgImgPress: 'Assets/imgs/gift-btnBg-press.png'
    };
    public btnText = '';
    public bottomTips = '礼包限量 5 万份，没人限购 1 份';
}
const status = new GiftPackStatus();

/**
 * 会员礼包组件
 */
export class GiftPack extends Component<GiftPackStatus> {

    constructor() {
        super({
            nodeSelector: '#app-gift-pack-container',
            template,
            cssModel,
            status
        });
    }

}
