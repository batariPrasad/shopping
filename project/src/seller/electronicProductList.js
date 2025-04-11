import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Carousel from "./carousel";

const ElectronicProductList = () => {
    let [allproduct, setproduct] = useState([]);

    let [ordericon, seticon] = useState("fa fa-arrow-up");

    let [order, setorder] = useState("asc");
    const getproduct = () => {
        fetch("http://localhost:1234/electronicsapi")
            .then(response => response.json())
            .then(proarray => {

                if (order == "asc") {
                    proarray.sort((a, b) => a.pprice - b.pprice);
                    setproduct(proarray);
                    setorder("desc");
                    seticon("fa fa-arrow-up");
                } else {
                    proarray.sort((a, b) => b.pprice - a.pprice);
                    setproduct(proarray);
                    setorder("asc");
                    seticon("fa fa-arrow-down");
                }
            });
    };
    
    const delpro = (pid) => {
        let url = "http://localhost:1234/electronicsapi/" + pid;
        let postdata = { method: 'delete' };
        fetch(url, postdata)
            .then(response => response.json())
            .then(pinfo => {
                alert(pinfo.pname + " Deleted Successfully");
                getproduct();
            });
    };

    useEffect(() => {
        getproduct();
    }, []);

    let [keyword, setkeyword] = useState("");
    const PER_PAGE = 5; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const filteredProducts = allproduct.filter(product =>
        (product.pname && product.pname.toLowerCase().includes(keyword.toLowerCase())) ||
        (product.pprice && product.pprice.toString().includes(keyword))
    );

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(filteredProducts.length / PER_PAGE);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-9">
                    <h3 className="text-center text-info"> {allproduct.length} : electronic Product inventory</h3>
                </div>
                <div className="col-lg-3">
                    <input type="search"
                        className="form-contorl"
                        placeholder="search.."
                        onChange={obj => setkeyword(obj.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 text-center">
                    <table className="table table-bordered shadow-lg text-start">
                        <thead>
                            <tr className="table-info">
                                <th> #ID </th>
                                <th> Product Name </th>
                                <th className="bg-warning mypointer" onClick={getproduct}>  <i className={ordericon}> </i>  Product Price </th>
                                <th> Product Details</th>
                                <th> Photo </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProducts.slice(offset, offset + PER_PAGE).map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {product.id}</td>
                                            <td> {product.pname}</td>
                                            <td>{product.pprice}</td>
                                            <td> {product.pdetails}</td>
                                            <td> <img src={product.photo} height={50} width={70} />  </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={delpro.bind(this, product.id)}>
                                                    <i className="fa fa-trash " >  </i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <div className="mt-4 text-center">

                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElectronicProductList;
