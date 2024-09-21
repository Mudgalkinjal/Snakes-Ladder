const Logout: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
