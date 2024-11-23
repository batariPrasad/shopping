import { useState, useEffect } from "react"
import ReactPaginate  from "react-paginate"
const MyOrder = () => {


    let [allorder, setorder] = useState([])

    const getorder = () => {

        fetch("http://localhost:1234/orderapi")
            .then(response => response.json())
            .then(proarray => {
                const filteredOrders = proarray.filter(order => order && order.id && order.myproduct && order.myproduct.length > 0);

                const uniqueOrders = Array.from(new Set(filteredOrders.map(order => order.id)))
                    .map(id => {
                        return filteredOrders.find(order => order.id === id);
                    })
                setorder(uniqueOrders.reverse());
            })
    }
    useEffect(() => {
        getorder()
    }, [])

    let [keyword, setkeyword] = useState("");
    const PER_PAGE = 1; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allorder.length / PER_PAGE);

    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-12">
                    <h1 className="text-center text-info "> Mange Order : {allorder.length}  </h1>
                </div>
            </div>

            {
                allorder.slice(offset, offset + PER_PAGE).map((product, index) => {

                    return (
                        <div className="row mb-4" key={index}>
                            <div className="col-lg-3">
                                <p> {product.cname}</p>
                                <p> Mobile No {product.mobile}</p>
                                <p> E-Mail Id {product.email}</p>
                                <p> Address {product.address}</p>

                            </div>
                            <div className="col-lg-9">
                                <h5 className="text-center text-danger mb-5">
                                    Oredr id :{product.id},Date - {product.orderDate}
                                </h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th> Item Name </th>
                                            <th> Photo </th>
                                            <th> Price </th>
                                            <th> Quantity </th>
                                            <th> Total </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            product.myproduct.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td> {product.pname} </td>
                                                        <td> <img src={product.photo} height="30" width="40" /> </td>
                                                        <td> {product.pprice} </td>
                                                        <td>   {product.qty}</td>
                                                        <td> {product.pprice * product.qty}</td>


                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                              
                            </div>
                        </div>
                    )
                })
            }
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
    )

}
export default MyOrder;