import AppRoutes from './routes';
import AppProvider from './providers';
import { Suspense } from 'react';

function App() {
    return (
        <div className="App">
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </div>
    );
}

export default App;
