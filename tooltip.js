class ToolTip extends HTMLElement {

    constructor() {
        super();
        this._toolTipContainer;
        this._toolTipIcon;
        this._toolTipContent = '';
        this._toolTipVisible = false;
        this.attachShadow({
            mode: 'open'
        })
    }

    connectedCallback() {
        const template = document.querySelector('#tooltip-template');
        this.shadowRoot.innerHTML = `
        <style>
        p {
            background-color:#ccc;
            color:#000;
            position : absolute;
            top:10px;
            left:0;
            z-index: 100
        }

        ::slotted(.tooltip-icon-text){
            opacity:0.7;
            text-decoration:underline
        }

        :host{
            background:var(--color-primary, #ccc);
            position:relative
        }
        
        </style>
        <span><slot></slot> (?)
        </span>`;
        if (this.hasAttribute('toolTipContent')) {
            this._toolTipContent = this.getAttribute('toolTipContent')
        }
        this._toolTipIcon = this.shadowRoot.querySelector('span')
        this._toolTipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._toolTipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    }

    //update attribute/passed data as attribute
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }

        if (name === 'tooltipcontent') {
            this._toolTipContent = newValue;
        }
    }

    //enable data change
    static get observedAttributes() {
        return ['tooltipcontent']
    }


    //cleanup work
    disconnectedCallback() {
        this._toolTipIcon.removeEventListener('mouseenter', this._showTooltip)
        this._toolTipIcon.removeEventListener('mouseleave', this._hideTooltip)
    }


    _render() {
        if (this._toolTipVisible) {
            this._toolTipContainer = document.createElement('p')
            this._toolTipContainer.textContent = this._toolTipContent;
            this.shadowRoot.appendChild(this._toolTipContainer);
        }
        else {
            if (this._toolTipContainer) {
                this.shadowRoot.removeChild(this._toolTipContainer);
            }

        }
    }

    _showTooltip() {
        this._toolTipVisible = true;
        this._render()
    }

    _hideTooltip() {
        this._toolTipVisible = false;
        this._render()
    }


}

customElements.define('avs-tooltip', ToolTip)