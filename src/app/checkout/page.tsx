"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from '../../../types/products';
import { getCartItems } from '../actions/act';
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";
 

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    fetchCartItems();
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.stockLevel,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      Swal.fire("Warning", "Please fill in all the fields", "warning");
      return;
    }

    Swal.fire({
      title: "Processing your order...",
      text: "Please wait...",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(validateForm()){
          localStorage.removeItem('appliedDiscount');
          Swal.fire("Success!", "Order placed successfully!", "success");
        }else{
          Swal.fire("Error", "Order could not be placed", "error");
        }
      }
    });
        const orderData = {
          _type: "order",
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          address: formValues.address,
          city: formValues.city,
          zipCode: formValues.zipCode,
          phone: formValues.phone,
          email: formValues.email,
          cartItems: cartItems.map((item) => ({
            _type: "reference",
            _ref: item._id,
          })),
          total: total,
          discount: discount,
          orderDate: new Date().toISOString(),
        };

        try {
          await client.create(orderData);
          localStorage.removeItem("appliedDiscount");
          
          } catch (error) {
          console.error("Failed to place order:", error);
          
          } 
  
        }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link href="/cart" className="text-gray-600 hover:text-black transition text-sm">
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Checkout</span>
          </nav>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Order Summary */}
    
<div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 py-3 border-b">
            {item.image && (
              <Image src={urlFor(item.image).url()} alt={item.name} width={64} height={64} className="object-cover" />
            )}
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-xs text-gray-500">Quantity: {item.stockLevel}</p>
            <p className="text-sm font-medium">${item.price * item.stockLevel}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      )}
      <div className="text-right pt-4">
        <p className="text-sm">
          Subtotal: <span className="font-medium">${subtotal}</span>
        </p>
        <p className="text-sm">
          Discount: <span className="font-medium">-${discount}</span>
        </p>
        <p className="text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </div>
        
        
    {/* Billing Form */}

    {/* Checkout Form */}
     <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
      <form className="space-y-4">
        {["firstName", "lastName", "address", "city", "zipCode", "phone", "email"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              id={field}
              value={formValues[field as keyof typeof formValues]}
              onChange={handleInputChange}
              className={`mt-1 block w-full border ${
                formErrors[field as keyof typeof formErrors] ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
            />
            {formErrors[field as keyof typeof formErrors] && (
              <p className="text-xs text-red-500">This field is required.</p>
            )}
          </div>
        ))}

<div>
      <button
        type="button"
        onClick={handlePlaceOrder}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Place Order
      </button>
      {orderSuccess && <p className="text-green-600 mt-4">Order Placed Successfully!</p>}
    </div>

    </form> 
    </div>
  

        </div>
      </div>
    </div>
   </div>
 </div>
   );
 };

 export default Checkout; 

