import { Component } from '../../assets/classes/component';
import * as template from './child.handlebars';
import * as cssModel from './child.scss';
import * as indexCssModel from '../../index.scss';

export class ChildStatus {
    public btnName: string = '点我！';
}
const status = new ChildStatus();

/**
 * 会员礼包组件
 */
export class Child extends Component<ChildStatus> {

    private _btn: HTMLElement;
    
    constructor() {
        super({
            node: document.getElementById(indexCssModel.child),
            template,
            cssModel,
            status
        });
    }

    /**
     * 生命钩子 - 组件加载完成
     */
    public componentDidInit() {
        this._btn = document.getElementById(cssModel.clickme);
        this._btn.onclick = () => {
            alert('hello workd!');
        };
    }
    
    
}
