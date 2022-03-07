import React from 'react';
import ReactDOM from 'react-dom';
import IndexStyles from './index.css';
import AppStyles from './App.css';
import ComponentStyle from './styles/styles.css';
import ListStyle from './styles/list.css';
import App from './App';

// Comment in for webcomponent development only
// ReactDOM.render(<App />, document.getElementById('root'));

class ReactBrownbagWebComponent extends HTMLElement {
  connectedCallback() {
    // Create a ShadowDOM
    const root = this.attachShadow({mode: 'closed'});

    // Create a mount element
    const mountPoint = document.createElement('div');

    const style = document.createElement('style');
    style.textContent = AppStyles + IndexStyles + ComponentStyle + ListStyle;

    root.appendChild(mountPoint);
    root.appendChild(style);

    // You can directly use shadow root as a mount point
    ReactDOM.render(<App />, mountPoint);
  }
}

customElements.define('react-brownbag-webcomponent', ReactBrownbagWebComponent);
