import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Product } from './pages/Product.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { Support } from './pages/Support.jsx';
import { Cart } from './pages/Cart.jsx';
import { Layout } from './pages/Layout.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { CheckoutInfo } from './pages/CheckoutInfo.jsx';
import { AuthProvider } from './context/AuthContext.js';
import { ProductProvider } from './context/ProductContext.js';
import { CartProvider } from './context/CartContext.js';
import { ProtectedPageRoute } from './pages/ProtectedPageRoute.js';
import { PayResult } from './pages/PayResult.jsx';
import { createCsrfToken } from './feature/csrf/manageCsrfToken.js';

import './styles/shoppy.css';
import './styles/commons.css';
import './styles/cgv.css';

// : <- 패스배리어블( 경로 변수 설정)
export default function App() {

    // App이 최초로 호출되면 CSRF 토큰 발급
    useEffect(() => {
        createCsrfToken();
    },[]);

    // CartProvider로 범위 지정
    // <ExProvider> <<= 추가로 쓸 프로바이더 설정
    return (
    <AuthProvider>
    <ProductProvider>
    <CartProvider>
      <BrowserRouter>
         <Routes>
           <Route path="/" element={<Layout />}>
             <Route index element={<Home />} />
             <Route path='/all' element={<Product />} />
             <Route path='/login' element={<Login />} />
             <Route path='/signup' element={<Signup />} />
             <Route path='/support' element={<ProtectedPageRoute><Support /></ProtectedPageRoute>} />
             <Route path='/cart' element={<Cart />}/>
             <Route path='/products/:pid' element={<ProductDetail />} />
             <Route path='/payResult' element={<PayResult/>} />
             <Route path='/checkout' element={<ProtectedPageRoute><CheckoutInfo /></ProtectedPageRoute>}/>
           </Route>
         </Routes>
       </BrowserRouter>
     </CartProvider>
     </ProductProvider>
     </AuthProvider>
    );
}