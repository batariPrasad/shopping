import { useState } from "react"

const CreateAccount = ()=>{
    let[fname,setFname]=useState("")
    let[email,setEmail]=useState("")
    let[password,setPassword]=useState("")
    let[mobile,setMobile]=useState("")
    
    let[fnameError,setFnameError]=useState("")
    let[emaailError,setEmailError]=useState("")
    let[PasswordError,setPasswordError]=useState("")
    let[mobileError,setMobileError]=useState("")

    let[btn,handleBtn]=useState("")

    let[message,setMessage]=useState("Enter the Register Details")
    const register = ()=>{
       let formStatus = true;

       if(formStatus==true){
        let url = "http://localhost:1234/sellerapi";
        let input = {
            fullname:fname,
            semail:email,
            spassword:password,
            smobile:mobile
        }
        let postdata = {
            headers:{'content-Type':'application/json'},
            method :'post',
            body:JSON.stringify(input)
        }
        fetch(url,postdata)
        .then(ressponse=>ressponse.json())
        .then(info=>{
            setMessage(fname+" -  Registeration is completed")
            setFname("")
            setEmail("")
            setPassword("");
            setMobile("")
        })
       }
        let epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if( ! epattern . test(email)){
            formStatus=false;
            setEmailError("Invalid Email Error !");

        }else{
            setEmailError("");
        }
        if(fname==""){
            formStatus=false
            setFnameError("Invalid Name !");
        }else{
            setFnameError("");
        }

        if(password==""){
            formStatus=false;
            setPasswordError("Invalid Password !");
        }else{
            setPasswordError("");
        }
        if(mobile==""){
            formStatus=false
            setMobileError("Invalid Mobile No !");
        }else{
            setMobileError("")
        }
        if(formStatus==false){
            setMessage("Please fill the Details .......");
        }else{
            handleBtn(true)
            setMessage(" Please wait Processing .....");
        }

    }

    return(
        <div className="container">
        <div className="row mt-5">
            <div className="col-lg-4"> </div>
            <div className="col-lg-4">
                <p className="text-center text-info"> {message} </p>
                <div className="card">
                    <div className=" card-header text-center bg-danger text-white">
                        <i className="fa fa-user-plus"> </i>  Vendor   Create Account
                    </div>
                    <div className="card-body">
                      <div className="mt-2">
                      <label>  Your Full Name</label>
                      <input type="text" className="form-control"  title="enter name" onChange={obj=>setFname(obj.target.value)} value={fname} />
                      <small className="text-danger"> {fnameError}</small>
                      </div>
                       <div className="mt-2">
                       <label>  Your E-Mail Id </label>
                       <input type="email" className="form-control" onChange={obj=>setEmail(obj.target.value)} value={email} />
                       <small className="text-danger"> {emaailError} </small>
                       </div>
                       <div className="mt-2">
                       <label>  Your Password </label>
                       <input type="password" className="form-control" onChange={obj=>setPassword(obj.target.value)} value={password} />
                       <small className="text-danger"> {PasswordError} </small>
                       </div>
                       <div className="mt-2">
                       <label>  Your Mobile No  </label>
                       <input type="number" className="form-control" onChange={obj=>setMobile(obj.target.value)} value={mobile} />
                       <small className="text-danger">  {mobileError} </small>
                       </div>
                    </div>
                    <div className="card-footer text-center fs-5">
                       

                        <button disabled={btn} className="btn btn-danger " onClick={register}> Register <i className="fa-solid fa-user-tie "></i> </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}
export default CreateAccount