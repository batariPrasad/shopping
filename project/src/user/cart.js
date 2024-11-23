import { useState, useEffect } from "react";

const MyCart = () => {

    let [allproduct, setproduct] = useState([])
    let [msg, setmsg] = useState()


    const getproduct = () => {
        fetch("http://localhost:1234/cartapi")
            .then(response => response.json())

                .then(proarray => {
                    // Remove duplicates based on product id
                    const uniqueProducts = proarray.reduce((acc, current) => {
                        const x = acc.find(item => item.id === current.id);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            x.qty += current.qty; // Sum quantities if duplicate found
                            return acc;
                        }
                    }, []);
                    setproduct(uniqueProducts);
                });
    }

    useEffect(() => {
        getproduct()
    }, [])
    const delitem = (id) => {
        let url = "http://localhost:1234/cartapi/" + id;
        let postdata = { method: "delete" };
        fetch(url, postdata)
            .then(response => response.json())
            .then(delinfo => {
                setmsg(delinfo.pname + " deleted Successfully !")
                getproduct();
            })
    }
    let totalCost = 0;
    const updataQty = (product, action) => {
        if (action === "Y") {
            product["qty"] = product.qty + 1;
        } else {
            product["qty"] = product.qty - 1;
        }

        if (product.qty <= 0) {
            delitem(product.id);
        }

        let url = "http://localhost:1234/cartapi/" + product.id;
        let postdata = {
            headers: { 'content-Type': "application/json" },
            method: "put",
            body: JSON.stringify(product)
        }
        fetch(url, postdata)
            .then(res => res.json())
            .then(info => {
                getproduct();
            })

    }
    let[customer,setcustomer]=useState({});
    const pickValue =(obj)=>{
        customer[obj.target.name]=obj.target.value
        
        setcustomer(customer);
    }
    const save = ()=>{
         customer["myproduct"]=allproduct
         console.log(customer)
         let date = new Date();
         customer["orderDate"] = date.toLocaleString()
       
         let url = "http://localhost:1234/orderapi"
         let postdata = {
             headers: { 'content-Type': "application/json" },
             method: "post",
             body: JSON.stringify(customer)
         }
         fetch(url, postdata)
             .then(res => res.json())
             .then(info => {
                 alert("Hi  " + customer.cname +  " \n  to be received your order");
             })
 

}
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4">

                    <div className="p-3 shadow">
                        <h3 className="mb-3"> Coustomer Details  </h3>
                        <div className="mb-4">
                            <label> Coustomer Name </label>
                            <input type="text" className="form-control" name="cname" onChange={pickValue} />
                        </div>
                        <div className="mb-4">
                            <label> Mobile No  </label>
                            <input type="text" className="form-control" name="mobile" onChange={pickValue}/>
                        </div>
                        <div className="mb-4">
                            <label> E-Mail-Id  </label>
                            <input type="text" className="form-control" name="email"  onChange={pickValue}/>
                        </div>
                        <div className="mb-4">
                            <label> Delivery Address  </label>
                            <textarea  className="form-control" name="address" onChange={pickValue}>  </textarea>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={save}> Place Order</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 text-center"> <h3 >  {allproduct.length} - Items in My Cart </h3>
                    <small className="text-danger"> {msg}</small>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th> Item Name </th>
                                <th> Photo </th>
                                <th> Price </th>
                                <th> Quantity </th>
                                <th> Total </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                allproduct.map((product, index) => {
                                    totalCost = totalCost + (product.pprice * product.qty)
                                    return (
                                        <tr key={index}>
                                            <td> {product.pname} </td>
                                            <td> <img src={product.photo} height="30" width="40" /> </td>
                                            <td> {product.pprice} </td>
                                            <td className="input-group">
                                                <button className="btn btn-warning btn-sm me-2" onClick={obj => updataQty(product, "N")}>- </button>
                                                {product.qty}
                                                <button className="btn btn-info btn-sm ms-2" onClick={obj => updataQty(product, "Y")}> + </button>
                                            </td>
                                            <td> {product.pprice * product.qty}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={delitem.bind(this, product.id)}> <i className="fa fa-trash"></i></button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan={6} className="text-primary text-end pe-5">
                                    <b> Final Price Rs : {totalCost}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}
export default MyCart;