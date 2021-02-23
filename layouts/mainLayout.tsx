const MainLayout = ({ children }) => (
    <div id="MainLayout">
        <header>
            <p>header</p>
        </header>
        
        <div>{children}</div>

        <footer>
            <p>footer</p>
        </footer>
    </div>
);

export default MainLayout;