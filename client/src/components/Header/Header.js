import MobNav from "../Navbar/Mobile/MobNav"
import DeskNav from "../Navbar/Desktop/DeskNav";
import './Header.css'

const Header = () => {
    return ( 
        <div className='header'>
            <p className="logo">RR</p>
            <div className="navContainer">
                <DeskNav/>
                <MobNav/>   
            </div>
            
        </div>
     );
}
 
export default Header;
