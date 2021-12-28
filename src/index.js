import './css/main.css';

// If rIC isn't available, just immediately execute ¯\_(ツ)_/¯
const init = window.requestIdleCallback || ((callbackFn) => callbackFn());
init(() => document.body.focus());
