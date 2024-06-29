import React, { useEffect } from 'react';
import './Pickups.css';
import Global from '../../utils/Global';
import axios from 'axios';
export const Pickups = () => {
    const [pickups, setPickups] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    useEffect(() => {
        Global.httpGet('/recycler/pickups')
            .then((res) => {
                setPickups(res.data.pickups);
                setLoaded(true);
                console.log(res.data.pickups);
            })
            .catch((err) => {
                alert(err);
            })
    }, [])
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const displayRazorpay = async (pickupId) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            // alert("Razorpay SDK failed to load. Are you online?");
            // return;
            setDesc("Razorpay SDK failed to load. Are you online?");
            return setShow(true);
        }

        // creating a new order
        const result = await Global.httpPost("/razorpay/orders", {
            rupees: 1000
        });

        if (!result) {
            // alert("Server error. Are you online?");
            // return;
            setDesc("Server error. Are you online?");
            return setShow(true);
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Jalay Movaliya",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    pickupId: pickupId
                };

                const result = await Global.httpPost("/razorpay/success", data);
                alert(result.data.msg);
            },
            prefill: {
                name: "Jalay Movaliya",
                email: "jalaym123@gmail.com",
                contact: "8780279011",
            },
            notes: {
                address: "Surat",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            {
                !loaded ? <p>Loading...</p>
                    :
                    <section className="recycler-dashboard">
                        <h2>Scheduled Collections</h2>
                        <div className="order-list">
                            {
                                pickups.length === 0 ? <p>No scheduled collections</p> :
                                    pickups.map((pickup, index) => {
                                        return (
                                            <div className={`order-item ${pickup.status === 'COMPLETED' ? 'completed' : ''}`} key={index}>
                                                <div className="order-details">
                                                    <p><strong>User:</strong> {pickup.user.name}</p>
                                                    <p><strong>Waste Type:</strong> {pickup.items.map((item) => `${item.item.name} (${item.quantity} pcs)`).join(', ')}</p>
                                                    <p><strong>Address:</strong> {pickup.user.zipCode}</p>
                                                    <p><strong>Date:</strong> {formatDate(pickup.preferredPickupDate)}</p>
                                                    <p><strong>Time:</strong> {formatTime(pickup.preferredPickupDate)}</p>
                                                    <p className="status">
                                                        <strong>Status:</strong> {pickup.status === 'PENDING' ? 'Pending' : 'Completed'}
                                                    </p>
                                                    {
                                                        pickup.status === 'PENDING' &&
                                                        <button className="complete-btn" onClick={() => displayRazorpay(pickup.id)}>Mark as Collected</button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                            }                        </div>
                    </section>
            }
        </>
    );
};