import React from 'react'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import { EPopularActionType, ILanguagesNavProps, IPopularState, IReposGridProps, LanguageKeys, languages, PopularAction } from '../types/popular'
import { BasicError } from '../types/global'

function LanguagesNav({ selected, onUpdateLanguage }: ILanguagesNavProps) {
    
    return (
        <ul className='flex-center'>
            { languages.map((language) => {
                const style: React.CSSProperties = language === selected ? { color: 'rgb(187, 46, 31)' } : {}
                
                return (
                    <li key={language}>
                        <button className='btn-clear nav-link'
                            onClick={() => onUpdateLanguage(language)}
                            style={style}>
                            {language}
                        </button>
                    </li>)
                })
            }
        </ul>
    )
}

function ReposGrid({ repos } : IReposGridProps) {
    return (
        <ul className='grid space-around'>
            {repos?.map((repo, index) => {
                const { owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url}>
                        <Card
                            header={`#${index + 1}`}
                            avatar={avatar_url}
                            href={html_url}
                            name={login}>
                            <ul className='card-list'>
                                <li>
                                    <Tooltip text='Github username'>
                                        <FaUser color='rgb(255, 191, 116)' size={22} />
                                        <a href={`https://github.com/${login}`} >
                                            {login}
                                        </a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <FaStar color='rgb(255, 215, 0)' size={22} />
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                    {open_issues.toLocaleString()} open issues
                                </li>
                            </ul>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}

function popularReducer(state: IPopularState, action: PopularAction): IPopularState {
    if (action.type === EPopularActionType.success) {
        return {
            ...state,
            [action.selectedLanguage]: action.repos,
            error: null
        }
    } else if (action.type === EPopularActionType.error) {
        return {
            ...state,
            error: action?.error?.message
        }
    } else {
        throw new Error('That action type is not supported')
    }
}

export default function Popular() {

    const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageKeys>('All')

    const [state, dispatch] = React.useReducer(
        popularReducer,
        { error: null }
    )

    const fetchedLanguages = React.useRef<string[]>([])

    React.useLayoutEffect(() => {
        if (fetchedLanguages.current.includes(selectedLanguage) === false) {
            fetchedLanguages.current.push(selectedLanguage)

            fetchPopularRepos(selectedLanguage)
                .then(repos => dispatch({ type: EPopularActionType.success, selectedLanguage, repos }))
                .catch((error: BasicError) => dispatch({ type: EPopularActionType.error, error }))
        }
    }, [fetchedLanguages, selectedLanguage])

    const isLoading = () => !state[selectedLanguage] && state.error === null

    return (
        <React.Fragment>
            <LanguagesNav
                selected={selectedLanguage}
                onUpdateLanguage={setSelectedLanguage}
            />

            {isLoading() && <Loading text='Fetching Repos' />}
            {state.error && <p className='center-text error'>{state.error}</p>}
            {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}

        </React.Fragment>
    )
}
