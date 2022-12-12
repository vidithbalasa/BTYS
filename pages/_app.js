// import AppLayout from '../src/layout/AppLayout'
// import AuthStateChanged from '../src/layout/AuthStateChanged'
import '../styles/globals.css'
import { AuthProvider } from '../src/auth/authContext';
import AuthStateChanged from '../src/auth/AuthStateChanged';
import { CreationProvider } from '../src/context/creationContext';
import { StripeProvider } from '../src/stripe/stripeContext';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <CreationProvider>
          {
            // if component is index page, don't render navbar
            Component.name.toLowerCase().startsWith('home') ? <Component {...pageProps} /> : (
              <Navbar>
                <Component {...pageProps} />
              </Navbar>
            )
          }
        </CreationProvider>
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default MyApp;
