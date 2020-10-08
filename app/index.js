import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './component/Popular'

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Popular />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)