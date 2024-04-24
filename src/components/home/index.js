import {Link} from 'react-router-dom'
import {Resume} from '../resume'
import {Projects} from '../projects'
import {Contact} from '../contact'

export const Home = () => {

    const line = <svg xmlns="http://www.w3.org/2000/svg" width="4" height="54" viewBox="0 0 4 54" fill="none">
        <path d="M2.07666 52L2.07666 2" stroke="#99D8FF" strokeWidth="3" strokeLinecap="round"/>
    </svg>

    return (
        <>
            <section className="homepage">
                <h1>aga m. domanska</h1>
                <h2><span>UI designer</span> {line} <span>frontend developer</span></h2>
                <h3>turning frontend expertise into captivating ui experience</h3>
                <div className="links">
                    <Link to='#resume'>Resume</Link>
                    <Link to='#projects'>Projects</Link>
                    <Link to='#contact' className="btn btn-primary">Contact Me</Link>
                </div>
            </section>
            <Resume/>
            <Projects />
            <Contact />
        </>
    )
}