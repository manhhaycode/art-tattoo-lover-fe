import AppRoutes from './routes';
import AppProvider from './providers';
import { Suspense } from 'react';

function App() {
    return (
        <div className="App">
            <AppProvider>
                <Suspense fallback={<div className="h-screen w-screen bg-dark-theme"></div>}>
                    <AppRoutes />
                </Suspense>
            </AppProvider>
        </div>
    );
}

export default App;
