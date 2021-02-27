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
    team_turn: number,
    teams: Array<Team>,
}

export const initialState = {
    phase: 'SET_UP',
    round: 1,
    questions: [],
    questionIndex: 0,
    team_turn: 0,
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
            return {...state, numberOfPlayers: action.payload}
        }
        case 'START_GAME': {
            let teams = [...state.teams];
            teams[0].members = action.payload.teamOne;
            teams[1].members = action.payload.teamTwo;
            return {...state, teams, phase: 'HEADS_UP'}
        }
        
    }
}
