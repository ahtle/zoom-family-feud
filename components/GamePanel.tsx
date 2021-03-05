import Fade from './Transition';

type Props = {
    in: boolean,
    phase: string,
    question: any,
    answeredNames: Array<number>,
    answeredWrongCount: number,
    answerClicked: (answer: any) => void,
    stealAnswerClicked: (answer: any) => void,
}

export default function GamePanel (props: Props) {
    function handleAnswerClick(answer: any) {
        if (props.phase === 'SELECT_ANSWER') {
            props.answerClicked(answer);
        } else if (props.phase === 'STEAL_WAIT_FOR_ANSWER') {
            props.stealAnswerClicked(answer);
        }
    }

    function renderHiddenAnswer(answer: any, index: number) {
        return (
            <div onClick={() => handleAnswerClick(answer)} className="h-14 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500 m-2 border-2 border-white rounded flex justify-center items-center">
                <div className="w-8 h-8 rounded-3xl bg-blue-700 flex justify-center align-center text-center">
                    <span className="leading-8">{index}</span>
                </div>
            </div>
        )
    }
    function renderShownAnswer(answer: any, index: number) {
        return (
            <div className="h-14 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500 m-2 border-2 border-white rounded flex justify-between">
                <p className="uppercase px-2 flex-1 flex justify-center items-center">{answer.name}</p>
                <p className="px-2 bg-gradient-to-t from-blue-400 to-blue-500 w-12 flex justify-center items-center">{answer.points}</p>
            </div>
        )
    }

    function renderAnswers () {
        return props.question.answers.map((a, index) => {
            if ( props.answeredNames.indexOf(a.name) !== -1 ) {
                return (
                    <div key={index}>{renderShownAnswer(a, index)}</div>
                )
            } else {
                return (
                    <div key={index}>{renderHiddenAnswer(a, index)}</div>
                )
            }
        });
    }

    function renderX () {
        if (props.phase === 'SHOW_X') {
            if (props.answeredWrongCount === 0) {
                return (
                    <div className="text-red-500 text-9xl absolute top-32 flex">
                        <p className="mx-5">X</p>
                    </div>
                )
            }

            let arr = [];
            for (let i = 1; i <= props.answeredWrongCount ; i++) {
                arr.push(<p key={`x-${i}`} className="mx-5">X</p>)
            };
            return (
                <div className="text-red-500 text-9xl absolute top-32 flex">
                    {arr}
                </div>
            );
        } else if (props.phase === 'STEAL_SHOW_X') {
            return (
                <div className="text-red-500 text-9xl absolute top-32 flex">
                    <p className="mx-5">X</p>
                </div>
            )
        }
    }

    if (props.question) {
        return (
            <Fade in={props.in}>
                <div id="game-panel" className="relative h-full flex flex-col items-center py-4 text-white ">
                    <div className="w-full bg-blue-600 p-4 h-14">
                        <p className="uppercase text-center">{props.phase !== 'HEADS_UP_INFO' ? props.question.name : ''}</p>
    
                    </div>
    
                    <div className={`${props.phase === 'SELECT_ANSWER' ? 'animate-border' : ''} w-full grid grid-cols-2 gap-4 bg-gray-700 border-8 border-yellow-500 rounded-xl p-2 mt-4`}>
                        {renderAnswers()}
                    </div>
                
                    {renderX()}
                
                </div>
            </Fade>
        )
    }
    return <></>
}