import { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Map from '../../components/Map/map'
// import CreateHazard from '../CreateHazard/CreateHazard';
import './Home.css'

const Home = () => {

    return ( 
        <Fragment>
            <div className="mapContainer">
              <Map/>  
            </div>
            
            <div className="buttonContainer">
                <Link className='btn addHazard' exact='true' to='/create-hazard'>Add Hazard</Link>
                <button className='btn viewOptions'>View Options</button>
            </div>
            
        </Fragment>
     );
}
 
export default Home;
