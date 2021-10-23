import { IRepo } from "../types/popular"
import { IPlayer } from "../types/results"

const id = 'a2a67e2d963b9c7991c2'
const secret = '31cbac0541791d580146e4553857cf123f174487'
const params = `?client_id=${id}&client_secret=${secret}`

function getErrorMsg(message: string, username: string) {
    if (message === 'Not Found') {
        return `${username} doesn't exist`
    }

    return message
}

function getProfile (username: string) {
    return fetch(`https://api.github.com/users/${username}${params}`)
        .then((res) => res.json())
        .then((profile) => {
            if (profile.message) {
                throw new Error(getErrorMsg(profile.message, username))
            }

            return profile
        })
}

function getRepos(username: string) {
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
        .then((res) => res.json())
        .then((repos) => {
            if (repos.message) {
                throw new Error(getErrorMsg(repos.message, username))
            }

            return repos
        })
}

function getStarCount(repos: Array<IRepo>) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
}

function calculateScore(followers: number, repos: IRepo[]) {
    return (followers * 3) + getStarCount(repos)
}

function getUserData(player: string) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}

function sortPlayers(players: IPlayer[]): IPlayer[] {
    return players.sort((a, b) => b.score - a.score)
}

export function battle(players: string[]) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results) => sortPlayers(results))
}

export function fetchPopularRepos(language: string) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items){
                throw new Error(data.message)
            }

            return data.items
        });
}