const TattooShop = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Our Tattoo Shop</h1>
      </header>

      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <section id="home">
        <h2>About Us</h2>
        <p>Explore unique tattoo designs crafted by our talented artists.</p>
      </section>

      <section id="gallery">
        <h2>Tattoo Gallery</h2>
        {/* Add your gallery images and descriptions here */}
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>Reach out to us for appointments and inquiries.</p>
        {/* Add a contact form or contact information */}
      </section>

      <footer>
        <p>&copy; 2023 Tattoo Shop</p>
      </footer>
    </div>
  );
};

export default TattooShop;