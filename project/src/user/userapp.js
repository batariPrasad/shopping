import { HashRouter, Routes, Route, Link } from "react-router-dom";
import MyHome from "./home";
import MyFooter from "./footer";
import MyHeader from "./userheader";
import MyCart from "./cart";
import MyLogin from "./login";
import CreateAccount from "./signup";
import Electronics from "./electroincs";
import Grocerys from "./grocery";
const UserModule = () => {
    return (
        <HashRouter>
            <MyHeader/>
            <Routes>
                <Route exact path="/" element={<MyHome/>} />
                <Route exact path="/cart" element={<MyCart/>}/>
                <Route exact path="/login" element={<MyLogin/>}/>
                <Route exact path="/signup" element={<CreateAccount/>}/>
                <Route exact path="/electronics" element={<Electronics/>}/>
                <Route exact path="/grocery" element={<Grocerys/>}/>
            </Routes>  

            <MyFooter />
        </HashRouter>
    )
}
export default UserModule