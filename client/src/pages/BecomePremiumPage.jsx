import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  useParams,
  Link,
  Navigate
} from "react-router-dom";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51KK5CELeRAZuSlA6x2PMbkM4SRrSYXDqZrkRkt4tXQhNGEefqE7i0K11CZ6cb7bDsmiKgL6IF4z0TYQo7DsnOSV400p5ARXmtR");

export default function CheckoutForm(){
  const [clientSecret, setClientSecret] = useState('');

  const {ready, user, setUser} = useContext(UserContext);

  const {id} = useParams();

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    axios.post("/create-checkout-session", {
      method: "POST",
    }).then(response => {
      setClientSecret(response.data.clientSecret); 
    })
  }, []);

  if(id && user){
    return (
      <div id="checkout" className=''>
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{clientSecret}}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    )
  }
}

export function Return(){
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  const {ready, user, setUser} = useContext(UserContext);

  const {id} = useParams();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    axios.get(`/session-status?session_id=${sessionId}`, {
      method: 'POST'
    }).then(response => {
        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
    });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {

    async function becomePro(){
      await axios.post('/become-pro', {user});
    }

    if(!user.superUser){
      becomePro();
    }

    return (
      <div className='py-12 px-8 mx-auto my-auto'>
        <div className='text-center border border-gray-700 rounded-2xl py-8 px-6 my-auto' id="success">
          <h2 className='text-2xl mb-4'>Bem-vindo(a) ao lado PRO!</h2>
          <p className=''>Agora você é um usuário PRO e pode desfrutar de todos os melhores recursos disponíveis na plataforma.</p>
          <Link to={'/painel/'+user?._id}><button className='mt-8 py-2 px-4 rounded rounded-lg bg-[#0047AB] text-white max-w-sm hover:bg-white hover:text-black'>Avançar</button></Link>
        </div>
      </div>
    )
  }

  return null;
}