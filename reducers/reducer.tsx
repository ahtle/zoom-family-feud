export type Team = {
    members: Array<string>,
    member_turn: number,
    points: number,
}

export type reducerState = {
    phase: string,
    round: number,
    questions: Array<any>,
    questionIndex: number,
    answeredIDs: Array<number>,
    teamTurn: number,
    teams: Array<Team>,
}

export const initialState = {
    phase: 'SET_UP',
    round: 1,
    questions: [],
    questionIndex: 0,
    answeredIDs: [],
    teamTurn: 0,
    teams: [
        {
            members: [],
            member_turn: 0,
            points: 0,
        },
        {
            members: [],
            member_turn: 0,
            points: 0,
        },
    ],
}

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_NUMBER_OF_PLAYERS': {
            return {...state, numberOfPlayers: action.payload};
        }
        case 'START_GAME': {
            let teams = [...state.teams];
            teams[0].members = action.payload.teamOne;
            teams[1].members = action.payload.teamTwo;

            return {...state, teams, questions: action.payload.questions, phase: 'HEADS_UP_INFO'};
        }
        case 'HEADS_UP': {
            return {...state, phase: 'HEADS_UP'};
        }
        case 'HEADS_UP_ANSWERED_FIRST': {
            return {...state, teamTurn: action.payload, phase: 'HEADS_UP_ANSWERED_FIRST'};
        }
        case 'HEADS_UP_CORRECT': {
            return {...state, phase: 'SELECT_ANSWER'};
        } case 'HEADS_UP_WRONG': {
            let teamTurn = state.teamTurn === 0 ? 1 : 0;
            return {...state, teamTurn, phase: 'WAIT_FOR_ANSWER'};
        }

        default:
            return state ;
    }
}
