// import AppLayout from '../src/layout/AppLayout'
// import AuthStateChanged from '../src/layout/AuthStateChanged'
import '../styles/globals.css'
import '../styles/algolia.css'
import { AuthProvider } from '../src/auth/authContext';
import AuthStateChanged from '../src/auth/AuthStateChanged';
import { StripeProvider } from '../src/stripe/stripeContext';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
          {
            Component.displayName === 'Home' ? <Component {...pageProps} /> : (
              <Navbar>
                <Component {...pageProps} />
              </Navbar>
              )
          }
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default MyApp;
