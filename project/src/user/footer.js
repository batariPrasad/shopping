import { Link } from "react-router-dom"
const   MyFooter = ()=>{
return(
    <footer className="bg-dark p-5 text-white mt-5">
        <div className="container">
            <div className="row">
                <div className="col-xl-4">
                    <h5 className="text-danger"> About Us </h5>
                    <div>
                        asdf asdf adf asdf asdf afad dfa adsf asdf asdf asdf df asdf asdf asdf asdf
                        asdf asdf adf asdf asdf afad dfa adsf asdf asdf asdf df asdf asdf asdf asdf
                       
                    </div>
                </div>
                <div className="col-xl-4">
                    <h5 className="text-warning">  Our Address </h5>
                    <p> #1,2nd Cross, Outer Ring Road Marathahalli Bangalore 560037</p>
                    <div>  E-Mail Id = asdf@gmail.com </div>
                    <div>  Mobile = +91 - 7894563215 </div>
                </div>
                <div className="col-xl-3">
                    <h5 className="text-warning"> In Social Media </h5>
                    <div> <i className="fab fa-facebook"> </i> www.facebook.com</div>
                    
                    <div> <i className="fab fa-instagram"> </i> www.instagram.com</div>
                    <div> <i className="fab fa-linkedin"> </i> www.linkedin.com</div>
                </div>
            </div>
        </div>
    </footer>
)
}
export default MyFooter