
const ArtistIntroduction = () => {
  // Replace with actual artist information
  const artistName = 'John Doe';
  const artistDescription = 'Talented artist specializing in digital and traditional art.';
  const artistImage = 'path/to/artist-image.jpg';
  
  // Replace with actual artwork images
  const artworkImages = [
    'path/to/artwork1.jpg',
    'path/to/artwork2.jpg',
    'path/to/artwork3.jpg',
  ];

  return (
    <div>
      <h1>{artistName}</h1>
      <p>{artistDescription}</p>
      <img src={artistImage} alt={`${artistName} - Artist`} />

      <h2>Artwork</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {artworkImages.map((image, index) => (
          <img key={index} src={image} alt={`Artwork ${index + 1}`} style={{ maxWidth: '30%' }} />
        ))}
      </div>
    </div>
  );
};

export default ArtistIntroduction;