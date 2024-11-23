
import SellerModule from './seller/sellerapp';
import UserModule from './user/userapp';

function App() {

  if( localStorage.getItem("sellerid") == null){
    return(  <UserModule/>)
  
  }else{
    return( <SellerModule/>)
  }
 
}

export default App;
