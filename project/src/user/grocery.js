import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Grocerys = () => {
  let [allproduct, setproduct] = useState([]);
  let [ordericon, seticon] = useState("fa fa-arrow-up");
  let [order, setorder] = useState("asc");

  const getproduct = () => {
    fetch("http://localhost:1234/groceryapi")
      .then(response => response.json())
      .then(proarray => {
        if (order === "asc") {
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

  useEffect(() => {
    getproduct();
  }, []);

  const addincart = (product) => {
    product["qty"] = 1;
    let url = "http://localhost:1234/cartapi";

    let postdata = {
      headers: { 'content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify(product),
    };

    try {
      fetch(url, postdata)
        .then(response => response.json())
        .then(pinfo => {
          alert(pinfo.pname + " Added in Your Cart ");
        });
    } catch (error) {
      alert("Technical Error, Try Again Later");
    }
  };

  let [keyword, setkeyword] = useState("");

  const filteredProducts = allproduct.filter(product => {
    // Ensure pname and pprice exist before attempting to use methods like toLowerCase or toString
    const pname = product.pname || ""; // Use empty string if pname is undefined
    const pprice = product.pprice !== undefined ? product.pprice.toString() : ""; // Ensure pprice is a string

    return pname.toLowerCase().includes(keyword.toLowerCase()) ||
           pprice.includes(keyword);
  });

  const PER_PAGE = 8; // displays 8 items/records per page
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(filteredProducts.length / PER_PAGE);

  return (
    <div className="container-fluid mt-4">
      <div className="row mb-4">
        <div className="col-lg-2"></div>
        <div className="col-lg-5 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="search.."
            onChange={obj => setkeyword(obj.target.value)}
          />
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-3">
          <select className="form-select" onChange={getproduct}>
            <option>Price Low TO High</option>
            <option>Price High To Low</option>
          </select>
        </div>
      </div>

      {/* <Carousel /> */}

      <div className="row mt-5">
        {filteredProducts.slice(offset, offset + PER_PAGE).map((product, index) => {
          return (
            <div className="col-xl-3 mb-4" key={index}>
              <div className="p-3 shadow">
                <h4 className="text-primary mb-3">{product.pname}</h4>
                <p className="mb-3">
                  <img
                    src={product.photo}
                    className="rounded"
                    height="180"
                    width="100%"
                    alt={product.pname} // Add alt attribute for accessibility
                  />
                </p>
                <p className="mb-3 text-danger fs-5">
                  <i className="fa fa-rupee text-primary"></i> {product.pprice}
                </p>
                <p className="mb-3">
                  {/* Check if product.pdetails is defined before calling slice */}
                  {product.pdetails ? product.pdetails.slice(0, 30) : "No description available"}
                </p>
                <p className="mb-3 text-center">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={addincart.bind(this, product)}
                  >
                    <i className="fa fa-shopping-cart"></i> Add to cart
                  </button>
                </p>
              </div>
            </div>
          );
        })}
      </div>

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
  );
};

export default Grocerys;
