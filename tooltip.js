class ToolTip extends HTMLElement {

    constructor() {
        super();
        this._toolTipContainer;
        this._toolTipContent = '';
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
        
        </style>
        <span><slot></slot> ...more
        </span>`;
        if (this.hasAttribute('toolTipContent')) {
            this._toolTipContent = this.getAttribute('toolTipContent')
        }
        const toolTipIcon = this.shadowRoot.querySelector('span')
        toolTipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        toolTipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(toolTipIcon);
        this.style.position = 'relative'
    }

    _showTooltip() {
        this._toolTipContainer = document.createElement('p')
        this._toolTipContainer.textContent = this._toolTipContent;
        this.shadowRoot.appendChild(this._toolTipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._toolTipContainer);
    }


}

customElements.define('avs-tooltip', ToolTip)