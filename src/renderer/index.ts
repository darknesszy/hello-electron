import './bootstrap-grid.min.css'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(App(), document.getElementById('app'))

if ((module as any).hot) {
    (module as any).hot.accept('./app', () => {
        ReactDOM.render(App(), document.getElementById('app'))
    })
}
