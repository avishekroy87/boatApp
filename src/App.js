import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';
import  ComplexSpreadMapDemo  from './components/ComplexSpreadMapDemo';
import UniqueRowsDataGrid from './components/UniqueRowsData';

const App = () => {
  return (
    <>
     <CommonProvider>
        <FiltersProvider>
          <CartProvider>
            <Header />
            <RouterRoutes />
            <Footer />
            <BackTop />
          </CartProvider>
        </FiltersProvider>
      </CommonProvider> 
     
      {/*  <ComplexSpreadMapDemo /><UniqueRowsDataGrid /> */}
    </>
  );
};

export default App;
