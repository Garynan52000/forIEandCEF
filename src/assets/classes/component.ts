/**
 * 组件生命周期
 */
export interface IComponentLifeCycle {
    /* 组件渲染前 */
    componentWillInit: () => void;
    /* 组件渲染完成 */
    componentDidInit: () => void;
    /* 组件即将更新 */
    componentWillUpdate: () => void;
    /* 组件更新完成 */
    componentDidUpdate: () => void;
}

/**
 * 组件
 */
export interface IComponent<Status = object> {
    /* 宿主选择器 */
    nodeSelector: string;
    /* cssModel */
    cssModel: object;
    /* 模板 model 数据对象 */
    readonly status: Status;
    /* html 模板 */
    template: (model: Status) => string;
}

/**
 * 组件实现类
 */
export class Component<Status = object> implements IComponent<Status>, IComponentLifeCycle {

    public nodeSelector: string;
    public cssModel: object;
    public readonly status: Status;
    public $el: HTMLElement;

    private _isInit: boolean = false;

    /**
     * 组件构造函数
     * @param dataSource 构建组件必须的数据 
     */
    constructor(dataSource: IComponent<Status>) {
        debugger
        
        Object.assign(this, dataSource);
        
        setTimeout(() => {
            if (this.componentWillInit) this.componentWillInit();
            this.$el = document.querySelector(this.nodeSelector);
            if (this.$el && this.template) {
                this.render();
                if (this.componentDidInit) {
                    this.componentDidInit();
                    this._isInit = true;
                }        
            }
        });
    }
    
    public setStatus(status: object, target?: object, fn?: () => void) {
        Object.assign(target || this.status, status);
        if (fn) fn();
    }
    public render(fn?: () => void) {
        debugger
        const oModel = Object.assign( this.status, {cssModel: this.cssModel} );
        
        if (!this._isInit && this.componentWillUpdate) this.componentWillUpdate();
        this.$el.innerHTML = this.template(oModel);         
        if (!this._isInit && this.componentDidUpdate) this.componentDidUpdate();
        if (fn) fn();
    }
    
    public template: (model: Status) => string;
    public componentWillInit() {};
    public componentDidInit() {};
    public componentWillUpdate() {};
    public componentDidUpdate() {};
}