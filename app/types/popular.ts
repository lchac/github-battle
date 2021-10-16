import { BasicError } from "./global";

export const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
export type LanguageKeys = 'All' | 'JavaScript' | 'Ruby' | 'Java' | 'CSS' | 'Python'

export interface ILanguagesNavProps {
    selected: string,
    onUpdateLanguage: (language: LanguageKeys) => void
}

export interface IOwner {
    login: string
    avatar_url: string
}

export interface IRepo {
    owner: IOwner
    html_url: string
    stargazers_count: number
    forks: number
    open_issues: number
}

export interface IReposGridProps {
    repos: IRepo[]
}

export interface IPopularAction {
    type: 'success' | 'error'
    selectedLanguage: LanguageKeys
    repos?: IRepo[]
    error?: BasicError | null
}

export type IPopularState = unknown[]