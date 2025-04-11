import { HashRouter, Routes, Route, Link } from "react-router-dom";
import MyDashboard from "./dashboard";
import Manageproduct from "./productlist";
import NewProduct from "./newproduct";
import MyOrder from "./order";
import ElectronicProduct from "./electronicProducts";
import ElectronicProductList from "./electronicProductList";

import GroceryProduct from "./groceryProduct";
import GroceryProductList from "./groceryProductList";

const sellername = localStorage.getItem("sellername")
const logout = ()=>{
    localStorage.clear()
    window.location.href="/";

}
const SellerModule = () => {
    return (
        <HashRouter>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" href="#"> Navbar </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/dashboard"> <i className="fa fa-cogs"> </i> DashBoard </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/inventory"> <i className="fa fa-database"> </i> Inventary </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/new-inventory"> <i className="fa fa-plus"> </i> New Inventary </Link>
                            </li>
                            {/* <li className="nav-item me-4">
                                <Link className="nav-link active" to="/electronic-inventory"> <i className="fa fa-plus"> </i> ELE </Link>
                            </li> */}
                            {/* <li className="nav-item me-4">
                                <Link className="nav-link active" to="/electroniclist"> <i className="fa fa-plus"> </i> ELELIST </Link>
                            </li> */}
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/order"> <i className="fa fa-headset"> </i> Manage Order </Link>
                            </li>
                            <li className="nav-item">
                                {sellername? <Link className="nav-link text-warning" onClick={logout}> 
                                Welcome -  {sellername}  - <i className="fa fa-power-off"> </i> Logout </Link>
                           :<Link to="/login"> Login </Link>}
                                </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <Routes>
                <Route  path="/dashboard" element={<MyDashboard />} />
                <Route exact path="/inventory" element={<Manageproduct />} />
                <Route exact path="/new-inventory" element={<NewProduct />} />
                <Route exact path="/electronic-inventory" element={<ElectronicProduct/>} />
                <Route exact path="/grocery-inventory" element={<GroceryProduct/>} />
                <Route exact path="/groceryList" element={<GroceryProductList/>} />
            
                <Route exact path="/electroniclist" element={<ElectronicProductList/>} />
                <Route exact path="/order" element={<MyOrder />} />

            </Routes>
        </HashRouter>

    )
}

export default SellerModule;
