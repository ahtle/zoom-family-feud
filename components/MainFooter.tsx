import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MainFooter () {
    return (
        <footer className="bg-blue-400 flex justify-center p-2">
            <a href="https://github.com/ahtle/zoom-family-feud" target="_blank"><FontAwesomeIcon icon={faGithub} className="w-7"/></a>
        </footer>
    )
}