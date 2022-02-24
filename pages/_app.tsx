import '../styles/app.css';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  require('@xstate/inspect').inspect({
    iframe: false,
  });
}

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
