import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/home';
import AboutUs from './pages/aboutUs/aboutUs';
import OurCompanies from './pages/companies/ourCompanies/ourCompanies';
import OurCategories from './pages/categories/ourCategories/ourCategories';
import Category from './pages/categories/singleCategory/category';
import AboutCompany from './pages/companies/aboutCompany/aboutCompany';
import ProductCompanies from './pages/companies/productCompanies/productCompanies';
import Searchresults from './pages/searchResults/searchResults';
import CompanyList from './pages/admin/companies/companyList/companyList';
import ProductList from './pages/admin/products/productList/productList';
import CategoryList from './pages/admin/categories/categoryList/categoryList';
import Login from './pages/admin/login/login';
import AddCompany from './pages/admin/companies/addCompany/addCompany';
import EditCompany from './pages/admin/companies/editCompany/editCompany';
import ViewCompany from './pages/admin/companies/viewCompany/viewCompany';
import UnlinkedProducts from './pages/admin/companies/unlinkedProducts/unlinkedProducts';
import AddCategory from './pages/admin/categories/addCategory/addCategory';
import AddProduct from './pages/admin/products/addProduct/addProduct';

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/aboutUs',
      element:<AboutUs/>
    },
    {
      path:'/ourCompanies',
      element:<OurCompanies/>
    },
    {
      path:'/ourCategories',
      element:<OurCategories/>
    },
    {
      path:'/category/:categoryName/:categoryId',
      element:<Category/>
    },
    {
      path:'/aboutCompany/:companyName/:companyId',
      element:<AboutCompany/>
    },
    {
      path:'/productCompanies/:productName/:productId',
      element:<ProductCompanies/>
    },
    {
      path:'/search/:searchTerm',
      element:<Searchresults/>
    },
    {
      path:'/admin',
      element:<CompanyList/>
    },
    {
      path:'/admin/products',
      element:<ProductList/>
    },
    {
      path:'/admin/categories',
      element:<CategoryList/>
    },
    {
      path:'/admin/login',
      element: <Login/>
    },
    {
      path:'/admin/addCompany',
      element: <AddCompany/>
    },
    {
      path:'/admin/editCompany/:companyId',
      element: <EditCompany/>
    },
    {
      path:'/admin/viewCompany/:companyId',
      element: <ViewCompany/>
    },
    {
      path:'/admin/unlinkedproducts/:companyId/:companyName',
      element: <UnlinkedProducts/>
    },
    {
      path:'/admin/addCategory',
      element: <AddCategory/>
    },
    {
      path:'/admin/addProduct',
      element: <AddProduct/>
    }
  ])

  return <RouterProvider router = {router}/>
}

export default App
