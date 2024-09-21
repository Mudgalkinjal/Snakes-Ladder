// src/components/Layout.tsx
import React from 'react';
import Logout from './Logout'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Logout />
            {children}
        </div>
    );
};

export default Layout;
