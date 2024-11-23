import { useState, useEffect } from 'react'
const MyLogin = () => {
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")
    let [emailError, setemailError] = useState("")
    let [passwordError, setpasswordError] = useState("")

    let [message, setMessage] = useState("Enter the Login Details ")
    let[myBtn,handleBtn]=useState("")

    const loginCheck = () => {
        let formStatus = true;
        let epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        //prasad.@gmail.com
        //username + @ + domainname + . + extension

        if ( ! epattern.test(email)) {
            formStatus = false;
            setemailError("Invalid Email id ! ")
        } else {
            setemailError("");
        }

            if ( password=="") {
                formStatus = false;
                setpasswordError("Invalid Password  ! ")
            } else {
                setpasswordError("")
                
            }

       if( formStatus==false){
        setMessage("Please fill the details !")
       }else{
        handleBtn(true)
       
        setMessage("Please Wait Processing ........")
        fetch(  "http://localhost:1234/sellerapi")
        .then(response=>response.json())
        .then(accountArray=>{
            let loginstatus = false;
            for(let i=0; i<accountArray.length; i++){
                let seller = accountArray[i];
                if(seller.semail==email && seller.spassword==password){
                    loginstatus = true;
                    localStorage.setItem("sellerid",seller.id);
                    localStorage.setItem("sellername",seller.fullname)
                    window.location.reload();
                }
            } // for end
            if(loginstatus==false){
                setMessage("Fail : Invalid or Not Exist !")
                handleBtn(false)
            }
        })
       }
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-4"> </div>
                <div className="col-lg-4">
                    <p className='text-center text-primary'> {message}</p>
                    <div className="card">
                        <div className=" card-header text-center bg-danger text-white">
                            <i className="fa fa-lock"> </i>   Login

                        </div>
                        <div className="card-body">
                           <div className="mt-2" >
                           <label >  Your E-Mail Id </label>
                            <input type="email" className="form-control" onChange={obj => setemail(obj.target.value)} value={email} />
                            <small className='text-danger'> {emailError}</small>
                           </div>
                           <div className="mt-2" >
                           <label >  Your Password </label>
                            <input type="password" className="form-control" onChange={obj => setpassword(obj.target.value)} value={password} />
                            <small className='text-danger'> {passwordError}</small>
                           </div>
                        </div>
                        <div className="card-footer text-center fs-5">
                            <button disabled= {myBtn} className="btn btn-danger " onClick={loginCheck} > Login <i className="fa-solid fa-circle-arrow-right "></i> </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default MyLogin;