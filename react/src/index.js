import React from 'react';
import ReactDOM from 'react-dom';
import { createClient } from '@supabase/supabase-js';
import App from './App';
import { SessionContextProvider } from '@supabase/auth-helpers-react';


const supabase = createClient(
    "https://ybxzuppnjrkiaethqqpd.supabase.co",
    // https://ybxzuppnjrkiaethqqpd.supabase.co/auth/v1/callback',
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlieHp1cHBuanJraWFldGhxcXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4ODgxMjEsImV4cCI6MjAxNzQ2NDEyMX0.UsEIjHkgEck8uURlQtrC0Khlkjk3ijqKm4-cA3kc3ic"
);
const root = ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <React.StrictMode>
        <SessionContextProvider supabaseClient={supabase}>
            <App/>
        </SessionContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);