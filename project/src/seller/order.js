import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"

const MyOrder = () => {
    let [allorder, setorder] = useState([])

    // Fetch order data
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

    // Pagination setup
    const PER_PAGE = 1; // Number of records per page
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allorder.length / PER_PAGE);

    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-12">
                    <h1 className="text-center text-info "> Manage Orders : {allorder.length} </h1>
                </div>
            </div>

            {/* Loop through all orders */}
            {
                allorder.slice(offset, offset + PER_PAGE).map((order, index) => {

                    // Calculate the total price for the order before discount
                    const totalPrice = order.myproduct.reduce((total, product) => total + (product.pprice * product.qty), 0);
                    
                    // Assuming order.discount exists as a percentage (e.g., 0.2 for 20%)
                    const discountPercentage = order.discount || 0; // If no discount, it defaults to 0
                    const discountAmount = totalPrice * discountPercentage; // Apply discount
                    const finalPrice = totalPrice - discountAmount; // Final price after discount
                    
                    return (
                        <div className="row mb-4" key={index}>
                            <div className="col-lg-3">
                                <p> {order.cname}</p>
                                <p> Mobile No: {order.mobile}</p>
                                <p> E-Mail Id: {order.email}</p>
                                <p> Address: {order.address}</p>
                                <p><b>Payment Method: </b>{order.paymentMethod}</p> {/* Display Payment Method */}
                                <p><b>Total Price: </b>₹{totalPrice}</p> {/* Display Total Price */}
                                <p><b>Discount: </b>₹{discountAmount}</p> {/* Display Discount Amount */}
                                <p><b>Final Price (After Discount): </b>₹{finalPrice}</p> {/* Display Final Price after discount */}
                            </div>
                            <div className="col-lg-9">
                                <h5 className="text-center text-danger mb-5">
                                    Order ID: {order.id}, Date: {order.orderDate}
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
                                            order.myproduct.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{product.pname}</td>
                                                        <td><img src={product.photo} height="30" width="40" alt={product.pname} /></td>
                                                        <td>{product.pprice}</td>
                                                        <td>{product.qty}</td>
                                                        <td>{product.pprice * product.qty}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }

            {/* Pagination */}
            <div className="mt-4 text-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
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
