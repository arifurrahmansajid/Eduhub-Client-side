import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import SectionHeader from "../../components/SectionHeader";
import useContexHooks from "../../useHooks/useContexHooks";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../useHooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PreLoader from "../../components/PreLoader";

const Checkout = ({ ids }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, enrollPrice } = useContexHooks();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { handleSubmit, reset } = useForm();

  const createPaymentIntent = async (price) => {
    const res = await axiosSecure.post("/create-payment-intent", { price });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },
    onError: (error) => {
      toast.error(`Error creating payment intent: ${error.message}`, {
        position: "top-center",
      });
    },
  });

  useEffect(() => {
    if (enrollPrice && !clientSecret) {
      mutation.mutate(parseInt(enrollPrice));
    }
  }, [enrollPrice, clientSecret]);

  if (!enrollPrice) {
    return <PreLoader />;
  }

  const onSubmit = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setIsProcessing(false);
      toast.error("Payment initialization failed. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setIsProcessing(false);
      toast.error("Card details are required.");
      return;
    }

    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentError) {
      setError(paymentError.message);
      setIsProcessing(false);
      return;
    } else {
      console.log(paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setIsProcessing(false);
    } else {
      setTransactionId(paymentIntent.id);
      toast.success("Payment successful!");
      reset();
      const info = {
        name: user?.displayName,
        email: user?.email,
        transactionId: paymentIntent.id,
      };
      await axiosSecure.patch(`/classenroll-update/${ids}`, info);
      navigate("/dashboard/enrollclass");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9ECEF] to-gray-100 py-12">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#388E3C] p-6 text-white">
            <SectionHeader 
              title="Complete Your Enrollment" 
              whiteText 
              subtitle={`Total: $${enrollPrice}`}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{user?.displayName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount to Pay
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xl font-semibold text-[#388E3C]">${enrollPrice}</p>
                </div>
              </div>

              {/* Card Element */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Details
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                          iconColor: "#388E3C",
                        },
                        invalid: {
                          color: "#e53e3e",
                        },
                      },
                      hidePostalCode: true,
                    }}
                  />
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-red-600">
                  {error}
                </div>
              )}

              {transactionId && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-green-700">
                  Transaction ID: {transactionId}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                  isProcessing 
                    ? "bg-[#388E3C]/70 cursor-not-allowed" 
                    : "bg-[#388E3C] hover:bg-[#2E7D32] hover:shadow-md"
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

Checkout.propTypes = {
  ids: PropTypes.string.isRequired,
};