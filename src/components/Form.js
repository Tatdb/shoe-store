import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import axios from "axios";
//import { Link } from "react-router-dom";

export default class Form extends Component {
  state = {
    command: "cc:sale",
    amount: 0,
    tax: 0,
    tip: 0,
    cardHolder: "",
    number: "",
    expiration: "",
    cvc: "",
    avsStreet: "",
    avsZip: "",
    invoice: 2356
  };

  formPost = e => {
    // const { cartTotal, cartTax, detailProduct } = value;
    // const { amountDetail } = this.state;

    axios
      .post("/api/transact", {
        command: this.state.command,
        amount: this.state.amount,
        tax: this.state.tax,
        tip: this.state.tip,
        cardHolder: this.state.cardHolder,
        number: this.state.number,
        expiration: this.state.expiration,
        cvc: this.state.cvc,
        avsStreet: this.state.avsStreet,
        avsZip: this.state.avsZip,
        invoice: this.state.invoice
      })
      .then(response => {
        console.log(response);
        // NotificationManager.success("Success!", "Reward Created");
      });
  };

  updateRoleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <ProductConsumer>
        {value => {
          const { cartTotal, detailProduct } = value;
          console.log(detailProduct);

          return (
            <FormContainer>
              <div className="card">
                <div className="container">
                  <div className="row">
                    <div
                      id="form"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    >
                      <h4>{detailProduct.title}</h4>
                      {/* <br /> */}
                      <img
                        src={detailProduct.img}
                        style={{ width: "5rem", height: "5rem" }}
                        className="img-fluid"
                        alt="product"
                      />{" "}
                      {/* <h6>Price: ${detailProduct.price}</h6> */}
                      {/* <h6> Tax: ${cartTax}</h6> */}
                      <h6 value={cartTotal}> Cart Total: ${cartTotal}</h6>
                      <form>
                        <br />
                        <br />
                        <h5>Credit Card Information</h5>
                        <div className="form-group">
                          <label>Card Holder Name</label>
                          <input
                            type="text"
                            // value={this.state.creditCard.cardHolder}
                            value={this.state.cardHolder}
                            name="cardName"
                            className="form-control"
                            placeholder="Enter Name on Credit Card"
                            onChange={e => {
                              this.updateRoleInput(e);
                              // this.validateName(e);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Card Number</label>
                          <input
                            type="text"
                            value={this.state.number}
                            name="cardNumber"
                            className="form-control"
                            placeholder="Enter Credit Card Number"
                            onChange={e => {
                              this.updateRoleInput(e);
                              // this.validateName(e);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Card Expiration</label>
                          <input
                            type="text"
                            value={this.state.expiration}
                            name="cardExpire"
                            className="form-control"
                            placeholder="Enter Expiration - MMYY"
                            onChange={e => {
                              this.updateRoleInput(e);
                              // this.validateName(e);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>CVC Number</label>
                          <input
                            type="text"
                            value={this.state.cvc}
                            name="cvc"
                            className="form-control"
                            placeholder="Enter CVC Number"
                            onChange={e => {
                              this.updateRoleInput(e);
                              // this.validateName(e);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>AVS Street</label>
                          <input
                            type="text"
                            name="avsStreet"
                            value={this.state.avsStreet}
                            className="form-control"
                            placeholder="Enter AVS Street"
                            onChange={e => {
                              this.updateRoleInput(e);
                              // this.validateName(e);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>AVS Zip</label>
                          <input
                            type="text"
                            value={this.state.avsZip}
                            name="avsZip"
                            className="form-control"
                            placeholder="Enter AVS Zip Code"
                            onChange={e => {
                              this.updateRoleInput(e);
                              // this.validateName(e);
                            }}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={this.formPost()}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </FormContainer>
          );
        }}
      </ProductConsumer>
    );
  }
}

const FormContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: lightRed;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 70%;
  }
`;
