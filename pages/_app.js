// import AppLayout from '../src/layout/AppLayout'
// import AuthStateChanged from '../src/layout/AuthStateChanged'
import '../styles/globals.css'
import { AuthProvider } from '../src/auth/authContext';
import AuthStateChanged from '../src/auth/AuthStateChanged';
// import "../src/config/firebase.config";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
      </AuthStateChanged>
    </AuthProvider>
  )
}
// function MyApp({ Component, pageProps }) {
//   return (
//     <AuthProvider>
//       <AppLayout>
//         <AuthStateChanged>
//           <Component {...pageProps} />    
//         </AuthStateChanged>
//       </AppLayout>
//     </AuthProvider>
//   )
// }

export default MyApp;
