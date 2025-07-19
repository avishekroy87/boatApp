import React, { useState } from 'react';


const Checkout = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
    };


return (
    
    <div className="container py-5">
        <h1 className="mb-4">Checkout</h1>
        <div className="row">
        {/* Billing Details */}
        <div className="col-md-8 mb-4">
            <div className="card p-4">
            <h2 className="h4 mb-4">Billing Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" required />
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" required />
                </div>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" required />
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" required />
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="zip" className="form-label">Zip Code</label>
                    <input type="text" className="form-control" id="zip" required />
                </div>
                </div>
                <h2 className="h4 mb-3 mt-4">Payment Information</h2>
                <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <input type="text" className="form-control" id="cardNumber" required />
                </div>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="expiry" className="form-label">Expiry Date</label>
                    <input type="text" className="form-control" id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input type="text" className="form-control" id="cvv" required />
                </div>
                </div>
            </form>
            </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
            <div className="card p-4">
            <h2 className="h4 mb-4">Order Summary</h2>
            <div className="d-flex justify-content-between mb-2">
                <span>Product 1</span>
                <span>$29.99</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <span>Product 2</span>
                <span>$19.99</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
                <strong>Subtotal</strong>
                <strong>$49.98</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>$5.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>$54.98</strong>
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>
                Place Order
            </button>
            </div>
        </div>
        </div>
    </div>
);
}

export default Checkout;