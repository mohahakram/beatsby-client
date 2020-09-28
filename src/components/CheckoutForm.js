import React, { useState, useEffect, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import "../css/stripe.scss";

import APIHandler from "../config/api/APIHandler";
import UserContext from "../config/auth/UserContext";

const CheckoutForm = ({ cartTotal }) => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // as soon as the page loads get the client secret
        // from backend and store it
        const sendIntent = APIHandler.post("/checkout").then((res) =>
            setClientSecret(res.data.clientSecret)
        );
    }, []);

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (event) => {
        // prevent the page from refreshing on submiting form
        event.preventDefault();
        setProcessing(true);

        // final step after filling form
        // data is sent to stripe to be processed
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: currentUser.email,
                },
            },
        });

        //handle errors if any else set success to true
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }

        // The payment has been processed!
        // Show a success message to customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
    };

    return (
        <div className="checkout-form">
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" onChange={handleChange} />
                <button
                    // disable button if any of these cases is true
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                    <span id="button-text">
                        {/* show spinner if payment is processing */}
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Pay" + " " + cartTotal + "$"
                        )}
                    </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div id="card-error" role="alert">
                        {error}
                    </div>
                )}
                {/* Show a success message upon completion */}
                <p
                    className={
                        succeeded ? "result-message" : "result-message hidden"
                    }
                >
                    Payment succeeded, see the result in your
                    <a href={`https://dashboard.stripe.com/test/payments`}>
                        
                        Stripe dashboard.
                    </a>
                    Refresh the page to pay again.
                </p>
            </form>
        </div>
    );
};

export default CheckoutForm;
