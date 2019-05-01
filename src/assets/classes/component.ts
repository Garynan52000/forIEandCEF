export interface IComponent {
    nodeSelector: string;
    model: object;
    status: object;
    
    template: (model: object) => string;
    componentWillInit: () => void;
    componentDidInit: () => void;
    componentWillUpdate: () => void;
    componentDidUpdate: () => void;
}

export class Component implements IComponent {

    public nodeSelector: string;
    public $el: HTMLElement;
    public model: object = {};
    public readonly status: object = {};

    private _isInit: boolean = false;

    constructor() {
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

    public setStatus(status: object, fn?: () => void) {
        Object.assign(this.status, status);
        if (fn) fn();
    }
    public render(model: object = this.model, fn?: () => void) {
        if (!this._isInit && this.componentWillUpdate) this.componentWillUpdate();
        
        const oModel = Object.assign({}, this.status, model);
        this.$el.innerHTML = this.template(oModel); 

        if (!this._isInit && this.componentDidUpdate) this.componentDidUpdate();
        if (fn) fn();
    }
    
    public template: (model: object) => string;
    public componentWillInit: () => void;
    public componentDidInit: () => void;
    public componentWillUpdate: () => void;
    public componentDidUpdate: () => void;
}