// import { AuthProvider } from '../src/hooks/auth'
// import AppLayout from '../src/layout/AppLayout'
// import AuthStateChanged from '../src/layout/AuthStateChanged'
import '../styles/globals.css'
// import "../src/config/firebase.config";

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />    
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
