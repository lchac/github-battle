import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './component/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './component/Loading'
import { ETheme } from './types/global'

const Popular = React.lazy(() => import('./component/Popular'))
const Battle = React.lazy(() => import('./component/Battle'))
const Results = React.lazy(() => import('./component/Results'))

function App() {
    const [theme, setTheme] = React.useState(ETheme.light)
    const toggleTheme = () => setTheme((theme) => theme === ETheme.light ? ETheme.dark : ETheme.light)

    return (
        <Router>
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className='container'>
                        <Nav toggleTheme={toggleTheme} />
                        <React.Suspense fallback={<Loading />}>
                            <Switch>
                                <Route exact path='/' component={Popular} />
                                <Route exact path='/battle' component={Battle} />
                                <Route path='/battle/results' component={Results} />
                                <Route render={() => (<h1>404</h1>)} />
                            </Switch>
                        </React.Suspense>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)