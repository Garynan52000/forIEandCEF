import 'core-js/modules/es6.object.seal';
import { Component } from './assets/classes/component';
import * as template from './index.handlebars';
import * as cssModel from './index.scss';
import { Child } from './components/child/child';

class AppStatus {
    public title: string = 'Home';
}
const status = new AppStatus();

/**
 * 入口类
 */
class App extends Component {
    
    /* 子组件 */
    private _child: Child;

    constructor() {
        super({
            node: document.getElementById('app'),
            template,
            cssModel,
            status
        });
    }
    
    /**
     * 生命钩子 - 组件加载完成
     */
    public componentDidInit() {
      this._child = new Child();
    }

    
}

/* 启动函数 */
(() => {
    const oApp: App = new App(); 
})();

