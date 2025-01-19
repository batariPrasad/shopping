import { useState } from "react";

const NewProduct = () => {
let [productinfo, updateinfo] = useState({})

let[nameerror,setnameerror]=useState("");
let[priceerror,setpriceerror]=useState("")
let[photoerror,setphotoerror]=useState("")
let[detailserror,setdetailserror]=useState("")

    const pickvalue = (obj) => {
      productinfo[obj.target.name]=obj.target.value;
      updateinfo(productinfo);
      
    }
    const save = (obj) => {
        obj.preventDefault()     // it protect form page refresh
        let formstatus = true    //check field fill or not

        if( ! productinfo.pname || productinfo.pname==""){
            setnameerror("Enter product name !");
            formstatus = false;
        }else{
            setnameerror("")
        }
        // price validation

        if( ! productinfo.pprice || productinfo.pprice=="" || isNaN(productinfo.pprice)){
            setpriceerror("Enter valid pprice !");
            formstatus = false;
        }else{
            setpriceerror("")
        }

       //photo url validation
        if( ! productinfo.photo || productinfo.photo==""){
            setphotoerror("Enter photo  URL !");
            formstatus = false;
        }else{
            setphotoerror("")
        }
         

       //details validation
        if( ! productinfo.pdetails || productinfo.pdetails==""){
            setdetailserror("Enter product details  !");
            formstatus = false;
        }else{
            setdetailserror("")
        }
        //  alert(formstatus);

         if(formstatus==true){
       
            let url = "http://localhost:1234/productapi";
            let postdata ={
                headers:{'content-Type':'application/json'},
                method:'post',
                body:JSON.stringify(productinfo)
            }
            fetch(url,postdata)
            .then(response=>response.json())
            .then(info=>{
                alert(productinfo.pname + " Save Successfully !")
                obj.target.reset(); // it clear the form
                updateinfo({});
                
            })
         }
    }

    return (
        <div className="container mt-4">

            <form onSubmit={save}>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3 className="text-info"> Enter Product Details </h3>
                        <small className="text-danger"> The * Marked fields are Mandatory</small>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p>  Product Name <small className="text-danger "> * </small> </p>
                        <input type="text" className="form-control"  name="pname"  onChange={pickvalue}/>
                        <small className="text-danger"> {nameerror}</small>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <p>  Product Price  <small className="text-danger"> * </small> </p>
                        <input type="number" className="form-control"  name="pprice" onChange={pickvalue}/>
                        <small className="text-danger"> {priceerror}</small>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <p>  Product Photo URL  <small className="text-danger"> * </small> </p>
                        <input type="text" className="form-control"  name="photo" onChange={pickvalue}/>
                        <small className="text-danger"> {photoerror}</small>
                    </div>
                    <div className="col-lg-12 mb-4">
                        <p>  Product Description <small className="text-danger"> * </small> </p>
                       <textarea className="form-control" name="pdetails" onChange={pickvalue}> </textarea>
                       <small className="text-danger"> {detailserror}</small>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button className="btn btn-success m-2 " type="submit" > Save Product </button>
                        <button className="btn btn-warning m-2" type="reset"> Clear All </button> 
                    </div>

                </div>
            </form>

        </div>
    )
}
export default NewProduct