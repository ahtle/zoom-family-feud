
// This function gets called at build time
export async function getStaticPaths() {
    const APP_ENV = process.env.APP_ENV;
    const rootURL = APP_ENV === 'local' ?  'http://localhost:3000' : 'https://zoom-family-feud.vercel.app';
  
    const res = await fetch(`${rootURL}/api/questions`)
    const questions = await res.json()
  
    const paths = questions.map((question) => `/questions/${question.id}`)
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    const APP_ENV = process.env.APP_ENV;
    const rootURL = APP_ENV === 'local' ?  'http://localhost:3000' : 'https://zoom-family-feud.vercel.app';

    const res = await fetch(`${rootURL}/api/questions/${params.id}`)
    const question = await res.json()
  
    // Pass post data to the page via props
    return { props: { question } }
}


function QuestionPage (props) {
    return (
        <div id="question-page" className="container mx-auto mt-10">
            <h1 className="text-xl mb-4">Question: {props.question.name}</h1>
            <h1 className="text-xl">Answers:</h1>
            <ol className="pl-4">
                {props.question.answers.map((a, index) => {
                    return <li key={index} className="list-inside list-decimal">{a.name}</li>
                })}
            </ol>
        </div>
    )
}

export default QuestionPage;