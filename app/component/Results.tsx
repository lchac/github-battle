import React from 'react';
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { EResultsActionType, IProfileListProps, IResultsProps, IResultsState, ResultsAction } from '../types/results';

function ProfileList({ profile }: IProfileListProps) {
    if (profile === undefined) {
        return <></>
    }

    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239,115,115)' size={22} />
                {profile.name}
            </li>
            {profile.location && (
                <li>
                    <Tooltip text="User's location">
                        <FaCompass color='rgb(144,115,255)' size={22} />
                        {profile.location}
                    </Tooltip>
                </li>
            )}
            {profile.company && (
                <li>
                    <Tooltip text="User's company">
                        <FaBriefcase color='#795548' size={22} />
                        {profile.company}
                    </Tooltip>
                </li>
            )}
            <li>
                <FaUsers color='rgb(129,195,245)' size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64,183,95)' size={22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}


function battleReducer(state: IResultsState, action: ResultsAction): IResultsState {
    if (action.type === EResultsActionType.success) {
        return {
            winner: action.winner,
            loser: action.loser,
            error: null,
            loading: false
        }
    } else if (action.type === EResultsActionType.error) {
        return {
            ...state,
            error: action.message,
            loading: false
        }
    } else {
        throw new Error('That action type is not supported')
    }
}

export default function Results({ location }: IResultsProps) {
    const [state, dispatch] = React.useReducer(
            battleReducer,
            { winner: undefined, loser: undefined, error: null, loading: true }
        )
    const { playerOne, playerTwo } = queryString.parse(location.search)

    React.useEffect(() => {
        if (typeof playerOne === 'string' && typeof playerTwo === 'string') {
            battle([playerOne, playerTwo])
                .then(players => dispatch({ type: EResultsActionType.success, winner: players[0], loser: players[1] }))
                .catch((message: string) => dispatch({ type: EResultsActionType.error, message }))
        }
    }, [playerOne, playerTwo])

    const { winner, loser, error, loading } = state

    if (loading === true) {
        return <Loading text='Battling' />
    }

    if (error) {
        return (
            <p className='center-text error'>{error}</p>
        )
    }

    return (
        <React.Fragment>
            <div className='grid space-around container-sm'>
                <Card
                    header={winner?.score === loser?.score ? 'Tie' : 'Winner'}
                    subheader={`Score: ${winner?.score.toLocaleString()}`}
                    avatar={winner?.profile.avatar_url}
                    href={winner?.profile.html_url}
                    name={winner?.profile.login}>
                    <ProfileList profile={winner?.profile} />
                </Card>
                <Card
                    header={winner?.score === loser?.score ? 'Tie' : 'Loser'}
                    subheader={`Score: ${loser?.score.toLocaleString()}`}
                    avatar={loser?.profile.avatar_url}
                    href={loser?.profile.html_url}
                    name={loser?.profile.login}>
                    <ProfileList profile={loser?.profile} />
                </Card>
            </div>
            <Link
                to='/battle'
                className='btn dark-btn btn-space'>
                Reset
            </Link>
        </React.Fragment>
    )
}
