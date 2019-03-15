import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import axios from "axios";
import {
  Button,
  // Form,
  // FormGroup,
  // Input,
  // Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
  // FormFeedback
} from "reactstrap";
//import { Link } from "react-router-dom";

export default class Form extends Component {
  state = {
    command: "cc:sale",
    amount: 65.95,
    amount_detail: {
      tax: 6.0,
      tip: 0.0
    },
    creditcard: {
      cardholder: "",
      number: "",
      expiration: "",
      cvc: "",
      avs_street: "",
      avs_zip: ""
    },
    invoice: 2356,
    showModal: false,
    result: "",
    authcode: "",
    invoiceResult: "",
    charge: "",
    cardnum: "",
    refnum: "",
    status: "",
    type: ""
  };

  formPost = () => {
    // const { cartTotal, cartTax, detailProduct } = value;
    //const { amount_detail, creditcard } = this.state;

    axios
      .post("/api/transact", {
        command: this.state.command,
        amount: this.state.amount,
        amount_detail: {
          tax: this.state.amount_detail.tax,
          tip: this.state.amount_detail.tip
        },
        creditcard: {
          cardholder: this.state.cardholder,
          number: this.state.number,
          expiration: this.state.expiration,
          cvc: this.state.cvc,
          avs_street: this.state.avs_street,
          avs_zip: this.state.avs_zip
        },
        invoice: this.state.invoice
      })
      .then(response => {
        console.log(response);
        this.toggle();
        this.setState({
          result: response.data.Item.result,
          invoiceResult: response.data.Item.invoice,
          authcode: response.data.Item.authcode,
          charge: response.data.Item.auth_amount,
          cardnum: response.data.Item.number,
          refnum: response.data.Item.refnum,
          status: response.data.Item.result,
          type: response.data.Item.trantype
        });
        // NotificationManager.success("Success!", "Reward Created");
      });
  };

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
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
    const showModal = !this.state.showModal;
    const result = this.state.result;
    const authcode = this.state.authcode;
    const invoiceResult = this.state.invoiceResult;
    const { refnum, cardnum, status, type, charge } = this.state;

    return (
      <ProductConsumer>
        {value => {
          const { cartTotal, detailProduct } = value;

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
                      <div />
                      Cart Total:
                      <input
                        type="text"
                        name="amount"
                        className="form-control"
                        readOnly
                        value={this.state.amount}
                        onChange={e => {
                          this.updateRoleInput(e);
                        }}
                      />
                      <form action="" autoComplete="false">
                        <br />
                        <br />
                        <h5>Payment Information</h5>
                        <div className="form-group">
                          <label>Card Holder Name</label>
                          <input
                            type="text"
                            // value={this.state.creditCard.cardHolder}
                            value={this.state.cardholder}
                            name="cardholder"
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
                            autoComplete="false"
                            name="number"
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
                            autoComplete="false"
                            value={this.state.expiration}
                            name="expiration"
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
                            name="avs_street"
                            value={this.state.avs_street}
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
                            value={this.state.avs_zip}
                            name="avs_zip"
                            className="form-control"
                            placeholder="Enter AVS Zip Code"
                            onChange={e => {
                              this.updateRoleInput(e);
                              // this.validateName(e);
                            }}
                          />
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.formPost}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {!showModal ? (
                <>
                  <Modal
                    isOpen={this.state.showModal}
                    toggle={this.toggle}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.toggle}>
                      Transaction {result}!
                    </ModalHeader>
                    <ModalBody>Authorization Code: {authcode}?</ModalBody>
                    <ModalBody>Invoice Number: {invoiceResult}</ModalBody>
                    <br />
                    <ModalHeader>Transaction Details</ModalHeader>

                    <ModalBody>
                      <div>
                        <h5>Amount Charged: {charge}</h5>
                        <h5>Credit Card Number: {cardnum}</h5>
                        <h5>Reference Number: {refnum}</h5>
                        <h5>Transaction Status: {status}</h5>
                        <h5>Transaction Type: {type}</h5>
                        <h5>Transaction Date: {Date.now()}</h5>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={this.toggle}>
                        {"  "}
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </>
              ) : (
                <div>
                  <p />
                </div>
              )}
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
