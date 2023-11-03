export default function Footer() {
    const footerStyle = {
        backgroundColor: "#607d8b",
        color: "white",
        padding: "16px",
        marginTop: "auto",
    };

    const iconStyle = {
        fontSize: "2rem",
        margin: "0 8px",
    };

    return (
        <footer style={footerStyle}>
            <div className="container">
                <p style={{ textAlign: "center" }}>SOCIAL MEDIA</p>
                <p style={{ textAlign: "center" }}>
                    <a href="https://www.facebook.com"><i className="fab fa-facebook" style={iconStyle}></i></a>
                    <a href="https://www.instagram.com"><i className="fab fa-instagram" style={iconStyle}></i></a>
                    <a href="https://www.twitter.com"><i className="fab fa-twitter" style={iconStyle}></i></a>
                    <a href="https://www.pinterest.com"><i className="fab fa-pinterest" style={iconStyle}></i></a>
                    <a href="https://www.youtube.com"><i className="fab fa-youtube" style={iconStyle}></i></a>
                </p>
                <p style={{ textAlign: "center" }}>©Art Tatto Lover</p>
            </div>
        </footer>
    );
}
