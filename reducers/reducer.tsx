export type Team = {
    name: string,
    members: Array<string>,
    member_turn: number,
    points: number,
    roundsWon: number,
}

export type Question = {
    id: number,
    name: string,
    answers: Array<{
        name: string,
        points: number
    }>
}

export type reducerState = {
    phase: string,
    questions: Array<Question>,
    questionIndex: number,
    answeredNames: Array<number>,
    answeredWrongCount: number,
    teamTurn: number,
    teams: Array<Team>,
}

export const initialState = {
    phase: 'SET_UP',
    questions: [],
    questionIndex: 0,
    answeredNames: [],
    answeredWrongCount: 0,
    teamTurn: 0,
    teams: [
        {
            name: 'TEAM ONE',
            members: [],
            member_turn: 0,
            points: 0,
            roundsWon: 0,
        },
        {
            name: 'TEAM TWO',
            members: [],
            member_turn: 0,
            points: 0,
            roundsWon: 0,
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
        case 'HEADS_UP_WRONG': {
            let teamTurn = state.teamTurn === 0 ? 1: 0;
            ++state.teams[teamTurn].member_turn;
            return {...state, teamTurn, phase: 'SHOW_X'};
        } 
        case 'ANSWERED_CORRECT': {
            return {...state, phase: 'SELECT_ANSWER'};
        } 
        case 'ANSWERED_WRONG': {
            let teams = state.teams.slice();
            let currentTeam = teams[state.teamTurn];

            let answeredWrongCount = ++state.answeredWrongCount;
            let phase = 'SHOW_X';
            if (answeredWrongCount  < 3) {
                if (currentTeam.members.length === currentTeam.member_turn + 1) {
                    currentTeam.member_turn = 0;
                } else {
                    currentTeam.member_turn ++;
                }
            }
            return {...state, answeredWrongCount, teams, phase};
        } 
        case 'WAIT_FOR_ANSWER': {
            return {...state, phase: 'WAIT_FOR_ANSWER'};
        } 
        case 'STEAL': {
            return {...state, phase: 'STEAL'};
        } 
        case 'STEAL_ANSWERED_CORRECT': {
            return {...state, phase: 'STEAL_WAIT_FOR_ANSWER'};
        } 
        case 'STEAL_ANSWERED_WRONG': {
            return {...state, phase: 'STEAL_SHOW_X'};
        } 
        case 'STEAL_PROCESS_ANSWER': {
            let answeredNames = state.answeredNames.slice();
            answeredNames.push(action.payload.name);

            let phase = 'STEAL';

            let teamIndex = state.teamTurn === 0 ? 1 : 0;
            let teams = state.teams.slice();
            teams[teamIndex].points += action.payload.points;

            if (answeredNames.length === state.questions[state.questionIndex].answers.length) {
                if (teams[0].points > teams[1].points) {
                    teams[0].roundsWon++;
                } else {
                    teams[1].roundsWon++;
                }

                if (state.questionIndex === 2) {
                    phase = 'END_GAME';
                } else {
                    phase = 'END_ROUND';
                }
            }

            return {...state, answeredNames, teams, phase};
        } 
        case 'STEAL_OVER': {
            
            let teams = state.teams.slice();
            if (teams[0].points > teams[1].points) {
                teams[0].roundsWon++;
            } else {
                teams[1].roundsWon++;
            }

            let phase = 'END_ROUND';
            if (state.questionIndex === 2) {
                phase = 'END_GAME';
            }

            return {...state, teams, phase};
        } 
        case 'PROCESS_ANSWER': {
            let answeredNames = state.answeredNames.slice();
            answeredNames.push(action.payload.name);
            let teams = state.teams.slice();
            teams[state.teamTurn].points += action.payload.points;
            
            let phase = 'WAIT_FOR_ANSWER';

            if (answeredNames.length === state.questions[state.questionIndex].answers.length) {
                if (teams[0].points > teams[1].points) {
                    teams[0].roundsWon++;
                } else {
                    teams[1].roundsWon++;
                }

                if (state.questionIndex === 2) {
                    phase = 'END_GAME';
                } else {
                    phase = 'END_ROUND';
                }
            } else {
                if (teams[state.teamTurn].members.length === teams[state.teamTurn].member_turn + 1) {
                    teams[state.teamTurn].member_turn = 0;
                } else {
                    teams[state.teamTurn].member_turn ++;
                }
            }
            
            return {...state, answeredNames, teams, phase}
        } 
        case 'START_NEXT_ROUND': {
            let teamTurn = state.teamTurn === 0 ? 1 : 0;
            let teams = state.teams.slice();
            teams[0].points = 0;
            teams[1].points = 0;
            if (teams[teamTurn].members.length === teams[teamTurn].member_turn + 1) {
                teams[teamTurn].member_turn = 0;
            } else {
                teams[teamTurn].member_turn ++;
            }
            let questionIndex = ++state.questionIndex;
            return {...state, teams, questionIndex, teamTurn, answeredWrongCount: 0, answeredNames: [], phase: 'WAIT_FOR_ANSWER'}
        }
        case 'RESTART': {
            return {...initialState};
        }

        default:
            return state ;
    }
}
