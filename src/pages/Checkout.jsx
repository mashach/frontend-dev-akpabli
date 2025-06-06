import { Link, Form, useOutletContext } from "react-router-dom";
import CheckoutCartContent from "../components/Checkout/CheckoutCartContent";
import { useState } from "react";
import SeeProductBtn from "../components/Shared/SeeProductBtn";

export default function Checkout() {
  const { cart, setCart } = useOutletContext();
  const [payed, setPayed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    
    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Pending",
      customer: {
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        address: formValues.address,
        city: formValues.city,
        zip: formValues.zip,
        country: formValues.country
      },
      payment: {
        method: formValues['payment-method'],
        ...(formValues['payment-method'] === 'emoney' && {
          number: formValues['emoney-number'],
          pin: formValues['emoney-pin']
        })
      },
      products: Object.values(cart),
      total: Object.values(cart).reduce(
        (sum, item) => sum + (item.price * item.quantity), 
        0
      )
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    
    // Clear cart
    localStorage.removeItem('cart');
    setCart({});
    
    // Mark as paid
    setPayed(true);
  }

  return (
    <div className="mx-auto px-6 py-6 lg:px-20 bg-slate-50 flex flex-col w-full mt-16">
      <div className="">
        <Link
          to={"../"}
          preventScrollReset={true}
          className="text-base opacity-50 hover:opacity-100"
        >
          Go back
        </Link>
      </div>

      <Form className="mt-4" onSubmit={handleSubmit}>
        <div className="lg:flex items-start lg:gap-6">
          <div className="p-6 flex-col rounded-lg bg-white mt-6 lg:w-2/3">
            <div>
              <h2 className="text-2xl font-bold">Checkout</h2>
              <p className="text-orange-400 mt-8 font-bold uppercase leading-[25px] tracking-wide">
                Billing details
              </p>
            </div>

            {/* Billing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 rounded-lg border border-stone-300"
                  id="name"
                  name="name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full py-3 px-4 rounded-lg border border-stone-300 invalid:border-orange-500 invalid:text-orange-600 focus:invalid:border-orange-500 focus:invalid:ring-orange-500"
                  id="email"
                  name="email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full py-3 px-4 rounded-lg border border-stone-300"
                  id="phone"
                  name="phone"
                  required
                />
              </div>
            </div>

            {/* Shipping Info */}
            <p className="text-orange-400 mt-8 mb-4 font-bold uppercase leading-[25px] tracking-wide">
              Shipping info
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Address
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 rounded-lg border border-stone-300"
                  id="address"
                  name="address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  title="ZIP Code should be a 5-digit number"
                  className="w-full py-3 px-4 rounded-lg border border-stone-300"
                  id="zip"
                  name="zip"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 rounded-lg border border-stone-300"
                  id="city"
                  name="city"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-4 rounded-lg border border-stone-300"
                  id="country"
                  name="country"
                  required
                />
              </div>
            </div>

            {/* Payment Details */}
            <p className="text-orange-400 mt-8 mb-4 font-bold uppercase leading-[25px] tracking-wide">
              Payment details
            </p>
            
            <div className="space-y-4">
              <p className="font-bold leading-[25px] tracking-wide">
                Payment Method
              </p>
              
              <div className="w-full flex items-center gap-4 py-3 px-4 rounded-lg border border-stone-300">
                <input
                  type="radio"
                  value="emoney"
                  name="payment-method"
                  id="emoney"
                  className="h-4 w-4"
                  defaultChecked
                />
                <label htmlFor="emoney" className="font-bold">e-Money</label>
              </div>
              
              <div className="w-full flex items-center gap-4 py-3 px-4 rounded-lg border border-stone-300">
                <input
                  type="radio"
                  value="cash"
                  name="payment-method"
                  id="cash"
                  className="h-4 w-4"
                />
                <label htmlFor="cash" className="font-bold">Cash on Delivery</label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emoney-number" className="block text-sm font-medium text-gray-700 mb-1">
                    e-Money Number
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 rounded-lg border border-stone-300"
                    id="emoney-number"
                    name="emoney-number"
                  />
                </div>
                
                <div>
                  <label htmlFor="emoney-pin" className="block text-sm font-medium text-gray-700 mb-1">
                    e-Money PIN
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 rounded-lg border border-stone-300"
                    id="emoney-pin"
                    name="emoney-pin"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-6 lg:w-1/3">
            <CheckoutCartContent
              cartData={cart}
              setCart={setCart}
              payed={payed}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}