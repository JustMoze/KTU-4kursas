import '../styles/globals.css';
// import '../node_modules/swiper/css/swiper.css'
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-toastify/dist/ReactToastify.css';

import * as Sentry from "@sentry/node";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://3936ef7f1f4a4807bdc0b2ebad31e3b2@o380079.ingest.sentry.io/5555193",
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
  });
  
  setTimeout(() => {
    try {
      // foo();
      console.log('All good')
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  }, 99);

  
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
