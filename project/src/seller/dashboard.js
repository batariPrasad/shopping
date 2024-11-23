import { useState, useEffect } from "react"
import {Link} from 'react-router-dom';
const MyDashboard = () => {
    let [allproduct, setproduct] = useState([])

    let[allorder,setorder] = useState([])
    const getproduct = () => {

        fetch("http://localhost:1234/productapi")
            .then(response => response.json())
            .then(proarray => {
                setproduct(proarray);
            })
    }
    const getorder = () => {

        fetch("http://localhost:1234/orderapi")
            .then(response => response.json())
            .then(proarray => {
                setorder(proarray);
            })
    }
    useEffect(() => {
        getproduct()
        getorder()
    }, [])
    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-12">
                    <h1 className="text-center text-info "> Seller dashboard  </h1>
                </div>
            </div>


            <div className="row text-center">

                <div className="col-lg-4 text-center text-primary">
                    <Link to="/inventory" className="text-decoration-none">  
                    <i className="fa fa-suitcase fa-3x"> </i>
                    <h4> Total Product   {allproduct.length} </h4>
                    </Link>
                </div>

                <div className="col-lg-4 text-center ">
                <Link to="/order" className="text-decoration-none text-warning">  
                    <i className="fa fa-headset fa-3x"> </i>
                    <h4> order Received  {allorder.length}</h4>
                    </Link>
                </div>
                <div className="col-lg-4 text-center ">
                <Link to="/new-inventory" className="text-decoration-none text-success">  
                    <i className="fa fa-plus fa-3x"> </i>
                    <h4> Add Product </h4>
                    </Link>
                </div>

            </div>
        </div>
    )
}
export default MyDashboard;