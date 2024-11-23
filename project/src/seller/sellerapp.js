import { HashRouter, Routes, Route, Link } from "react-router-dom";
import MyDashboard from "./dashboard";
import Manageproduct from "./productlist";
import NewProduct from "./newproduct";
import MyOrder from "./order";
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
                                <Link className="nav-link active" to="/"> <i className="fa fa-cogs"> </i> DashBoard </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/inventory"> <i className="fa fa-database"> </i> Inventary </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/new-inventory"> <i className="fa fa-plus"> </i> New Inventary </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/order"> <i className="fa fa-headset"> </i> Manage Order </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-warning" onClick={logout}> 
                                Welcome -  {localStorage.getItem('sellername')}  - <i className="fa fa-power-off"> </i> Logout </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <Routes>
                <Route  path="/" element={<MyDashboard />} />
                <Route exact path="/inventory" element={<Manageproduct />} />
                <Route exact path="/new-inventory" element={<NewProduct />} />
                <Route exact path="/order" element={<MyOrder />} />
            </Routes>
        </HashRouter>

    )
}

export default SellerModule;
const logout = ()=>{
    localStorage.clear()
    window.location.href="/#/login";
    window.location.reload()
}