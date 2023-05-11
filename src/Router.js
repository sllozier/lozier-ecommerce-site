import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  PageNotFound,
  Home,
  ViewAllAlbums,
  ViewSingleAlbum,
  AccountPortal,
  WishList,
  LogIn,
  SignUp,
  Cart,
  Checkout,
  PaymentConfirmation,
  AdminDashboard,
  ContactForm,
  FAQ,
  PrivacyPolicy,
  ReturnPolicy,
  RewardsProg,
  Terms,
  About,
  OrderHistory,
} from "./components";

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route index path="/" element={<Home />} />
      <Route path="/albums" element={<ViewAllAlbums />} />
      <Route path="/albums/:id" element={<ViewSingleAlbum />} />
      <Route path="/account" element={<AccountPortal />} />
      <Route path="/orderHistory" element={<OrderHistory />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation" element={<PaymentConfirmation />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/contactForm" element={<ContactForm />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/returnPolicy" element={<ReturnPolicy />} />
      <Route path="/rewards" element={<RewardsProg />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Router;
