import AppRoutes from './routes';
import AppProvider from './providers';

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
