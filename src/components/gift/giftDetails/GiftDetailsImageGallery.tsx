const MAX_NUM_IMAGES = 5;

interface GiftDetailsImageGalleryProps {
  images: string[];
}

export default function GiftDetailsImageGallery({ images }: GiftDetailsImageGalleryProps) {
  const getCalculatedStyles = () => {
    const numImages = images.length;

    const baseWidth = 80;
    const width = numImages === MAX_NUM_IMAGES ? 100 : baseWidth + 5 * (numImages - 2);

    return {
      display: "grid",
      gridTemplateColumns: `repeat(${numImages}, 1fr)`,
      width: `${width}%`,
      height: "100%",
    };
  };

  const styles = getCalculatedStyles();

  return (
    <div className="px-4 w-full h-[20vh] md:h-[30vh]">
      <ul style={styles} className="m-auto h-full">
        {images.map((img, ind) => (
          <li key={img + ind} style={{ height: "100%", overflow: "hidden" }}>
            <img
              src={img}
              alt={`Image ${ind}`}
              className="object-fill w-full h-full"
              style={{ height: "100%", width: "100%", objectFit: "fill" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
