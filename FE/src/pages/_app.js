import '@/styles/globals.css';
import '@/styles/radio.css';
import PropTypes from 'prop-types';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ModalContextProvider } from '@/contexts/ModalContextProvider';
import { NotificationsProvider } from '@mantine/notifications';
import { SearchInputCTX } from '@/contexts/SearchInputContext';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        <NotificationsProvider position='bottom-right'>
          <ModalContextProvider>
            <SearchInputCTX>
              <Component {...pageProps} />
            </SearchInputCTX>
          </ModalContextProvider>
        </NotificationsProvider>
      </AuthProvider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  pageProps: PropTypes.object,
};

App.defaultProps = {
  Component: null,
  pageProps: null,
};

export default App;
