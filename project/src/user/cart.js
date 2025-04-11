import { useState, useEffect } from "react";
import QRCode from "qrcode"; // If you're using qrcode package for local QR generation
import CreateAccount from "./signup";
import MyLogin from "./login";

const MyCart = () => {
    let [allproduct, setproduct] = useState([]);
    let [msg, setmsg] = useState();
    let [couponCode, setCouponCode] = useState("");
    let [discount, setDiscount] = useState(0);
    let [validCoupons, setValidCoupons] = useState([
        { code: "20OFF", discount: 0.2 },
        { code: "30OFF", discount: 0.3 },
        { code: "50OFF", discount: 0.5 }
    ]);
    let [paymentMethod, setPaymentMethod] = useState("");
    let [upiQRCode, setUpiQRCode] = useState(""); // QR Code for UPI
    let [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });
    let [paymentStatus, setPaymentStatus] = useState(""); // To track payment status

    const calculateTotalCost = (products) => {
        return products.reduce((total, product) => total + (product.pprice * product.qty), 0);
    };

    const getproduct = () => {
        fetch("http://localhost:1234/cartapi")
            .then(response => response.json())
            .then(proarray => {
                const uniqueProducts = proarray.reduce((acc, current) => {
                    const x = acc.find(item => item.id === current.id);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        x.qty += current.qty;
                        return acc;
                    }
                }, []);
                setproduct(uniqueProducts);
            });
    };

    useEffect(() => {
        getproduct();
    }, []);

    const delitem = (id) => {
        let url = "http://localhost:1234/cartapi/" + id;
        let postdata = { method: "delete" };
        fetch(url, postdata)
            .then(response => response.json())
            .then(delinfo => {
                setmsg(delinfo.pname + " deleted Successfully!");
                getproduct();
            });
    };

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
            headers: { "content-Type": "application/json" },
            method: "put",
            body: JSON.stringify(product)
        };
        fetch(url, postdata)
            .then(res => res.json())
            .then(info => {
                getproduct();
            });
    };

    let [customer, setcustomer] = useState({});
    const pickValue = (obj) => {
        customer[obj.target.name] = obj.target.value;
        setcustomer(customer);
    };

    const save = () => {
        customer["myproduct"] = allproduct;
        customer["paymentMethod"] = paymentMethod;
        customer["cardDetails"] = cardDetails;
        console.log(customer);
        let date = new Date();
        customer["orderDate"] = date.toLocaleString();

        let url = "http://localhost:1234/orderapi";
        let postdata = {
            headers: { "content-Type": "application/json" },
            method: "post",
            body: JSON.stringify(customer)
        };
        fetch(url, postdata)
            .then(res => res.json())
            .then(info => {
                alert("Hi  " + customer.cname + " \n  Your order will be received soon.");
            });
    };

    const handleCouponChange = (e) => {
        const couponCode = e.target.value;
        const coupon = validCoupons.find(c => c.code === couponCode);
        if (coupon) {
            setDiscount(coupon.discount);
        } else {
            setDiscount(0);
        }
    };

    const handlePaymentMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setPaymentMethod(selectedMethod);

        if (selectedMethod === "UPI") {
            const upiId = "prasadbatari@oksbi";
            const merchantName = "Batari ";
            const amount = (calculateTotalCost(allproduct) - calculateTotalCost(allproduct) * discount).toFixed(2);
            const transactionNote = "Payment for order";

            const upiLink = `upi://pay?pa=${upiId}&pn=${merchantName}&mc=0000&tid=${Date.now()}&tn=${transactionNote}&am=${amount}&cu=INR`;

            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=200x200`;
            setUpiQRCode(qrCodeUrl);
        } else {
            setUpiQRCode(""); // Clear QR code for other payment methods
        }
    };

    const generateQRCode = (upiLink) => {
        QRCode.toDataURL(upiLink, { errorCorrectionLevel: 'H' }, (err, url) => {
            if (err) return console.error(err);
            setUpiQRCode(url);
        });
    };

    const handleCardDetailsChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentConfirmation = () => {
        // Simulate payment success (this can be replaced with actual payment gateway response)
        setPaymentStatus("Payment successful!");

        // After successful payment, proceed with order placement
        save();

        // Check payment status by transaction ID (mocked here)
        const transactionId = Date.now(); // Replace with actual transaction ID
        console.log("tid", transactionId)
        fetch(`http://localhost:1234/paymentStatus/${transactionId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    console.log("Payment completed!");
                    // Send confirmation message to the user's email
                    sendConfirmationMessage(customer.email);
                } else {
                    console.log("Payment failed!");
                }
            });
    };

    const sendConfirmationMessage = (userEmail) => {
        fetch("http://localhost:1234/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: userEmail, // Send the message to the user's email
                message: "Your payment has been successfully completed. Thank you!"
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Message sent successfully!");
            } else {
                console.error("Message sending failed!");
            }
        });
    };

    const totalCost = calculateTotalCost(allproduct);
    const finalPrice = totalCost - totalCost * discount;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4">
                    <div className="p-3 shadow">
                        <h3 className="mb-3">Customer Details</h3>
                        <div className="mb-4">
                            <label>Customer Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cname"
                                onChange={pickValue}
                            />
                        </div>
                        <div className="mb-4">
                            <label>Mobile No</label>
                            <input
                                type="text"
                                className="form-control"
                                name="mobile"
                                onChange={pickValue}
                            />
                        </div>
                        <div className="mb-4">
                            <label>E-Mail-Id</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={pickValue}
                            />
                        </div>
                        <div className="mb-4">
                            <label>Delivery Address</label>
                            <textarea
                                className="form-control"
                                name="address"
                                onChange={pickValue}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label>Coupon Code (Select a coupon below):</label>
                            <div>
                                {validCoupons.map((coupon, index) => (
                                    <div key={index} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={coupon.code}
                                            checked={discount === coupon.discount}
                                            onChange={handleCouponChange}
                                        />
                                        <label className="form-check-label">
                                            {coupon.code} - {coupon.discount * 100}% off
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment method selection */}
                        <div className="mb-4">
                            <label>Payment Method:</label>
                            <div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="upi"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="UPI"
                                        checked={paymentMethod === "UPI"}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="upi">
                                        UPI
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="cash"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="Cash"
                                        checked={paymentMethod === "Cash"}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="cash">
                                        Cash
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="debit"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="Debit Card"
                                        checked={paymentMethod === "Debit Card"}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="debit">
                                        Debit Card
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        id="credit"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="Credit Card"
                                        checked={paymentMethod === "Credit Card"}
                                        onChange={handlePaymentMethodChange}
                                    />
                                    <label className="form-check-label" htmlFor="credit">
                                        Credit Card
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Show card details form if Debit or Credit Card is selected */}
                        {(paymentMethod === "Debit Card" || paymentMethod === "Credit Card") && (
                            <div>
                                <div className="mb-4">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleCardDetailsChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label>Expiration Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleCardDetailsChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleCardDetailsChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="text-center">
                            <button className="btn btn-primary" onClick={handlePaymentConfirmation}>
                                Complete Payment
                            </button>
                        </div>

                        {/* Show UPI QR Code if UPI is selected */}
                        {paymentMethod === "UPI" && upiQRCode && (
                            <div className="mt-4 text-center">
                                <h5>Scan this QR code to pay via UPI</h5>
                                <img src={upiQRCode} alt="UPI QR Code" />
                            </div>
                        )}

                        {/* Show Payment Status */}
                        {paymentStatus && (
                            <div className="mt-4 text-success text-center">
                                <h5>{paymentStatus}</h5>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-lg-8 text-center">
                    <h3>{allproduct.length} - Items in My Cart</h3>
                    <small className="text-danger">{msg}</small>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allproduct.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.pname}</td>
                                        <td>
                                            <img src={product.photo} height="30" width="40" />
                                        </td>
                                        <td>{product.pprice}</td>
                                        <td className="input-group">
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => updataQty(product, "N")}
                                            >
                                                -
                                            </button>
                                            {product.qty}
                                            <button
                                                className="btn btn-info btn-sm ms-2"
                                                onClick={() => updataQty(product, "Y")}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>{product.pprice * product.qty}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => delitem(product.id)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan={6} className="text-primary text-end pe-5">
                                    <b> Final Price Rs : {finalPrice}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;
