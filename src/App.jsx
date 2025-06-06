import { useState } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Details from "./pages/Details"
import Checkout from "./pages/Checkout"
import Dashboard from './components/admin/dashboard/dashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Orders from './components/admin/Order'
import OrderDetail from './components/admin/OrderDetail'
import Users from './components/admin/Users'
import Products from './components/admin/Products'
import Adminlogin from './components/admin/Adminlogin.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* Public routes */}
    <Route index element={<Home />} />
    <Route path="category/:name" element={<Category />} />
    <Route path="details/:id" element={<Details />} />
    <Route path="checkout" element={<Checkout />} />

    {/* Admin routes */}
    <Route path="admin">
      <Route path="login" element={<Adminlogin />} />
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
       <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="Users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="orders/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
    </Route>
  </Route>
))

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App