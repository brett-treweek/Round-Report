import Links from "../Links";
import '../Nav.css'

const DeskNav = () => {
    return ( 
        <nav className='deskNav'>
            <Links isMobile={false}/>
        </nav>
     );
}
 
export default DeskNav;