/**
 * 组件生命周期
 */
export interface IComponentLifeCycle {
    /* 组件渲染前 */
    componentWillInit?: () => void;
    /* 组件渲染完成 */
    componentDidInit?: () => void;
    /* 组件即将更新 */
    componentWillUpdate?: () => void;
    /* 组件更新完成 */
    componentDidUpdate?: () => void;
}

/**
 * 组件
 */
export interface IComponent<Status = object> extends IComponentLifeCycle {
    /* 宿主选择器 */
    node: HTMLElement;
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
export class Component<Status = object> implements IComponent<Status> {

    public node: HTMLElement;
    public cssModel: object;
    public readonly status: Status;
    public template: (model: Status) => string;

    private _isInit: boolean = false;

    /**
     * 组件构造函数
     * @param dataSource 构建组件必须的数据 
     */
    constructor(dataSource: IComponent<Status>) {        
        Object.assign(this, dataSource);
        
        if (this.node && this.template) {
            setTimeout(() => {                
                if (this.componentWillInit) this.componentWillInit();
                this.render();
                if (this.componentDidInit) {
                    this.componentDidInit();
                    this._isInit = true;
                }        
            });
        }
    }
    
    public setStatus(status: object, target?: object, fn?: () => void) {
        Object.assign(target || this.status, status);
        if (fn) fn();
    }

    /**
     * 渲染函数
     * @param fn 回调
     */
    public render(fn?: () => void) {
        const oModel = Object.assign( this.status, {cssModel: this.cssModel} );
        
        if (!this._isInit && this.componentWillUpdate) this.componentWillUpdate();
        this.node.innerHTML = this.template(oModel);         
        if (!this._isInit && this.componentDidUpdate) this.componentDidUpdate();
        if (fn) fn();
    }
    
    
    public componentWillInit() {}
    public componentDidInit() {}
    public componentWillUpdate() {}
    public componentDidUpdate() {}
}
