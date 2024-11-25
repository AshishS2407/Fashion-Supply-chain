import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import CreateOrderPage from './pages/CreateOrderPage';
import ReadOrderPage from './pages/ReadOrderPage.jsx';
import CreateDressPage from './pages/CreateDressPage';
import MatchOrderPage from './pages/MatchOrder.jsx';
import ReadProductPage from './pages/ReadProductPage.jsx'
import CreateProductPage from './pages/CreateProductPage.jsx';
import RetailerDashboardPage from './pages/SupplierDashboardPage.jsx';
import RetailerDashboard from './pages/RetailerDashboard.jsx';
import DressHistoryPage from './pages/DressHistoryPage.jsx';
import CreateDressOrderPage from './pages/CreateDressOrderPage.jsx';
import ValidatorDashboard from './pages/ValidatorDashboard.jsx';
import ValidateDressQualityPage from './pages/ValidateDressQualityPage.jsx';
import GetDressHistoryPage from './pages/GetDressHIstoryPage.jsx';
import ReadDressPage from './pages/ReadDressPage.jsx';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/manufacturer" element={<ManufacturerDashboard />} />
      <Route path="/manufacturer/create-order" element={<CreateOrderPage />} />
      <Route path="/manufacturer/read-order" element={<ReadOrderPage />} />
      <Route path="/manufacturer/create-dress" element={<CreateDressPage />} />
      <Route path="/supplier" element={<RetailerDashboardPage />} />
      <Route path="/supplier/create-product" element={<CreateProductPage />} />
      <Route path="/supplier/product" element={<ReadProductPage />} />
      <Route path="/supplier/match-order" element={<MatchOrderPage />} />
      <Route path="/retailer" element={<RetailerDashboard />} />
      <Route path="/create-dress-order" element={<CreateDressOrderPage />} />
      <Route path="/dress-history" element={<DressHistoryPage />} />
      <Route path="/validator" element={<ValidatorDashboard />} />
      <Route path="/validate-dress-quality" element={<ValidateDressQualityPage />} />
      <Route path="/get-dress-history" element={<GetDressHistoryPage />} />
      <Route path="/manufacturer/read-dress" element={<ReadDressPage />} />


      


    </>
  ));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
