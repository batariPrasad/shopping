import { useState, useEffect } from "react"
import MyCart from "./cart";
import { HashRouter, Routes, Route, Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

const MyHome = () => {
  let [allproduct, setproduct] = useState([])

  let [ordericon, seticon] = useState("fa fa-arrow-up")

  let [order, setorder] = useState("asc");
  const getproduct = () => {
    fetch("http://localhost:1234/productapi")
      .then(response => response.json())
      .then(proarray => {

        if (order == "asc") {
          proarray.sort((a, b) => a.pprice - b.pprice);
          setproduct(proarray);
          setorder("desc");
          seticon("fa fa-arrow-up")
        } else {
          proarray.sort((a, b) => b.pprice - a.pprice);
          setproduct(proarray);
          setorder("asc");
          seticon("fa fa-arrow-down")
        }

      })
  }

  useEffect(() => {
    getproduct()
  }, []);

  const addincart = (product) => {
    product["qty"] = 1;
    let url = "http://localhost:1234/cartapi"

    let postdata = {
      headers: { 'content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify(product)
    }

    try {
      fetch(url, postdata)
        .then(response => response.json())
        .then(pinfo => {
          alert(pinfo.pname + "Added in Your Cart ")
        })
    } catch (error) {
      alert("Technacial Error,Try in Sometime")
    }

  }
  let [keyword, setkeyword] = useState("");

  const filteredProducts = allproduct.filter(product =>
    product.pname.toLowerCase().includes(keyword.toLowerCase()) ||
    product.pprice.toString().includes(keyword)
  );

  const PER_PAGE = 8; //displays 5 items/records per page
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(filteredProducts.length / PER_PAGE);

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-lg-2">
        </div>
        <div className="col-lg-5 mb-2">
          <input type="text"
            className="form-control"
            placeholder="search.."
            onChange={obj => setkeyword(obj.target.value)}
          />
        </div>
        <div className="col-lg-1"> </div>
        <div className="col-lg-3">
          <select className="form-select" onChange={getproduct}>
            <option>  Price  Low TO High  </option>
            <option> Price High To Low   </option>
          </select>
        </div>
      </div>


      <div>



        <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="c1.png" height="400" width="100%" />
              <div class="container">
                <div class="carousel-caption text-start">
                  <h1>Example headline.</h1>
                  <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
                  <p>
                  
                  {/* <marquee width="40%" direction="up" height="200px" behavior="scroll" scrollamount="3">
                                  <div className="container mt-5">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="card">
                            <div className="card-harder text-center text-danger mt-3">   </div>
                            <div className="card-body">
                              <Link className=" text-danger" to="/cart"> <img src="6.png" width={50} height={80} /> </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="card">
                            <div className="card-body">  <img src="6.png" className="img-fluid" /> </div>
                            <Link >   </Link>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="card">
                            <div className="card-body">  <img src="8.png" className="img-fluid" /> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <marquee/> */}
 
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img src="c2.png" height="400" width="100%" />
              <div class="container">
                <div class="carousel-caption">
                  <h1>Another example headline.</h1>
                  <p>Some representative placeholder content for the second slide of the carousel.</p>
                  <p><a class="btn btn-lg btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#contact">Learn more</a></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <img src="c3.png" height="400" width="100%" />
              <div class="container">
                <div class="carousel-caption text-end">
                  <h1>One more for good measure.</h1>
                  <p>   </p>
                  <p><a class="btn btn-lg btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#contact">Browse gallery</a></p>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>


      </div>

      <div className="row mt-5">

        {
          filteredProducts.slice(offset, offset + PER_PAGE).map((product, index) => {

            return (
              <div className="col-xl-3  mb-4" key={index}>
                <div className="p-3 shadow">
                  <h4 className="text-primary mb-3"> {product.pname}</h4>
                  <p className="mb-3"> <img src={product.photo} className="rounded" height="180" width="100%" />  </p>
                  <p className="mb-3 text-danger fs-5">  <i className="fa fa-rupee text-primary"> </i>  {product.pprice}</p>
                  <p className="mb-3"> {product.pdetails.slice(0, 30)}</p>
                  <p className="mb-3 text-center" >
                    <button className="btn btn-warning btn-sm" onClick={addincart.bind(this, product)}> <i className="fa fa-shopping-cart"> </i> Add to cart </button>
                  </p>

                </div>
              </div>
            )
          })
        }

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

  )
}
export default MyHome;
