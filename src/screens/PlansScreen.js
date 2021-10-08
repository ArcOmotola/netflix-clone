import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlansScreen.css';
import { loadStripe } from '@stripe/stripe-js';
import { subscribed, unsubscribed, selectSubscriptionStatus } from '../features/subscriptionStatus';

export default function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const subscription = useSelector(selectSubscriptionStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection("customers")                                        //to get subscription details from firestore
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                if (subscription) {
                    dispatch(
                        subscribed({
                            role: subscription.data().role,
                            current_period_end: subscription.data().current_period_end.seconds,
                            current_period_start: subscription.data().current_period_start.seconds,
                        })
                    )
                } else {
                    dispatch(unsubscribed());
                }
            })
        })
    }, [user.uid, dispatch])

    useEffect(() => {
        db.collection("products")
        .where("active", "==", true)                                //to get products from firestore
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        })
    }, []);

    console.log("products>>>",products);
    console.log("subscription>>>",subscription);

    const loadCheckout  = async (priceId) => {
        const docRef = await db
            .collection("customers")                                   //gets the user logged in from redux store
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            }); 
            
        docRef.onSnapshot(async(snap) => {
            const {error, sessionId } = snap.data(); 
            
            if(error) {
                //show an error to your customer and
                //inspect your cloud function logs in the firebase console.
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId) {
                //We have a session, let's redirect to Checkout
                //Init Stripe

                const stripe = await loadStripe(
                    "pk_test_51JhkKMLxrBdtcApGadbEeBGzzWyOmLCEoqk6r8WMSa5RUjBJ4CpwXMF2D0865aCFADkS7BVYIwwU4WVz5MfqzgKv00qmkefbfH"
                );
                stripe.redirectToCheckout({ sessionId });
            }
        })
    };

    return (
        <div className="plansScreen">
            <br />
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
               //add some logic to check if user's subscription is active
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

                return (
                    <div key={productId} className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`}>
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage? "Current Package" : "Subscribe"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
