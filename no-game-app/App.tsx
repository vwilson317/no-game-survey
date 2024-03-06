import { store } from './store';
import { Provider } from 'react-redux';
import AppEntry from './AppEntry';

export default function App() {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}