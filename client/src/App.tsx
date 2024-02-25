import { FetchPostListView } from '@/components/PostListView';
import { Account } from './components/Account/Account';

import '@/App.css';

function App() {
  return (
    <div className="app">
      <Account />

      <FetchPostListView />
    </div>
  );
}

export default App;
