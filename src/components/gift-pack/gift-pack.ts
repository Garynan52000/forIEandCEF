import { Component } from '../../assets/classes/component';
import * as template from './gift-pack.handlebars';
import * as cssModel from './gift-pack.scss';
import * as indexCssModel from '../../index.scss';
import * as containerBgImg from 'Assets/imgs/gift-containerBg.png';
import * as normalBtnBgImg from 'Assets/imgs/buy-normal.png';
import * as pressBtnBgImg from 'Assets/imgs/buy-press.png';
import * as hoverBtnBgImg from 'Assets/imgs/buy-hover.png';
import * as gift1Img from 'Assets/imgs/gift1.png';
import * as gift2Img from 'Assets/imgs/gift2.png';
import * as buyAndGiftImg from 'Assets/imgs/buy-and-gift.png';


// declare const window: any;

export class GiftPackStatus {
    public containerBgImg = containerBgImg;
    public normalBtnBgImg = normalBtnBgImg;
    public pressBtnBgImg = pressBtnBgImg;
    public hoverBtnBgImg = hoverBtnBgImg;
    public containerStyle = `
        position: absolute;
        z-index: 9999;
        top: 100px;
        left: 100px;
        width: 276px; 
        height: 287px; 
        background-image: url(${this.containerBgImg});
        background-position: top center;
        background-repeat: no-repeat;
        cursor: pointer;
    `;
    public innerStyle = `
        position: absolute;
        top: 82px;
        left: 50%;
        width: 236px;
        height: 194px;
        margin-left: -118px;
    `;
    public giftsListStyle = `
        position: absolute;
        top: 0;
        left: 50%;
        width: 188px;
        margin-left: -94px;
    `;
    public buyBtnStyle = `
        position: absolute;
        bottom: 34px;
        left: 50%;
        width: 216px;
        height: 46px;
        margin-left: -108px;
        background-image: url(${this.normalBtnBgImg});
        background-position: top center;
        background-repeat: no-repeat;
    `;
    public bottomTipsStyle = `
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 12px;
        color: #ffe8d6;
    `;
    public isShow: boolean = false;
    public bottomTips = '礼包限量 5 万份，每人限购 1 份';
    public gifts = [
        {
            title: '3天YY会员',
            logo: gift1Img,
            href: 'javascript:;',
            tagImg: false,
            clsss: cssModel.gitf
        },
        {
            title: '0.5个Y 币',
            logo: gift2Img,
            href: 'javascript:;',
            tagImg: buyAndGiftImg,
            clsss: cssModel.gitf
        }
    ];
}
const status = new GiftPackStatus();

/**
 * 会员礼包组件
 */
export class GiftPack extends Component<GiftPackStatus> {

    private oBuyButton: HTMLElement;

    constructor() {
        super({
            node: document.getElementById(indexCssModel.giftPack),
            template,
            cssModel,
            status
        });
    }

    /**
     * 生命钩子 - 组件渲染完毕
     */
    public componentDidInit() {
        this._saveElement();
        this._bindEvent();
    }
    
    /**
     * API: 显示组件
     */
    public show() {
        this.setStatus({isShow: true});
        this.render(() => {
            this._saveElement();
            this._bindEvent();
        });
    }
    
    /**
     * API: 隐藏组件
     */
    public hide() {
        this.setStatus({isShow: false});
        this.render();
    }
    
    /**
     * 保存需要用到的 dom node
     */
    private _saveElement() {
        if (!this.oBuyButton) this.oBuyButton = document.getElementById(cssModel.buyBtn) as HTMLElement;
    }
    
    /**
     * 绑定事件
     */
    private _bindEvent() {
        if (this.oBuyButton) {
            this.oBuyButton.onclick = this._onBuyBtnClick;
            this._bindBuyBtnBgChange();
        }
    }

    /**
     * 购买按钮点击
     */
    private _onBuyBtnClick = () => {
        alert('buy!');
    }

    /**
     * 绑定事件让按钮背景图片变化
     */
    private _bindBuyBtnBgChange = () => {
        this.oBuyButton.onmouseover = () => {
            this.oBuyButton.style.backgroundImage = `url(${this.status.hoverBtnBgImg})`;
        };
        this.oBuyButton.onmouseout = () => {
            this.oBuyButton.style.backgroundImage = `url(${this.status.normalBtnBgImg})`;
        };
        this.oBuyButton.onmousedown = () => {
            this.oBuyButton.style.backgroundImage = `url(${this.status.pressBtnBgImg})`;
        };
    }
}
