
import {Link} from 'react-router-dom'

const MyHeader =()=>{
  return(
    <nav className="navbar navbar-expand-lg mybg sticky-top" >
    <div className="container ">
    <a className="navbar-brand text-white">  <i className='fa fa-shopping-bag fa-lg'> </i>  Shop Online </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
 
        <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item me-4">
                    <Link className="nav-link active text-white" to="/"> <i className="fa fa-home"> </i> Home </Link>
                </li>
                <li className="nav-item me-4">
                    <Link className="nav-link active text-white" to="/cart"> <i className="fa fa-shopping-cart"> </i> My Cart </Link>
                </li>
                <li className="nav-item me-4">
                    <Link className="nav-link active text-white" to="/login"> <i className="fa fa-lock"> </i>  Vendor Login </Link>
                </li>
                <li className="nav-item me-4">
                    <Link className="nav-link active text-white" to="/signup"> <i className="fa fa-user-plus"> </i> New Vendor </Link>
                </li>
              
                
            </ul>
        </div>
    </div>
</nav>
  )
}
export default MyHeader