// import AppLayout from '../src/layout/AppLayout'
// import AuthStateChanged from '../src/layout/AuthStateChanged'
import '../styles/globals.css'
import { AuthProvider } from '../src/auth/authContext';
import AuthStateChanged from '../src/auth/AuthStateChanged';
import { CreationProvider } from '../src/context/creationContext';
import { StripeProvider } from '../src/stripe/stripeContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <CreationProvider>
          <Component {...pageProps} />
        </CreationProvider>
      </AuthStateChanged>
    </AuthProvider>
  )
}

export default MyApp;
