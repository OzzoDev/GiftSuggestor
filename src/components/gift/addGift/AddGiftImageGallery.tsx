import { useAddGiftContext } from "../../../hooks/contexts/useAddGiftContext";

const MAX_NUM_IMAGES = 5;

export default function AddGiftImageGallery() {
  const { state: addGiftState } = useAddGiftContext();
  const images = addGiftState.images;

  const getCalculatedStyles = () => {
    const numImages = images.length;

    const baseWidth = 60;
    const width = numImages === MAX_NUM_IMAGES ? 100 : baseWidth + 10 * (numImages - 2);

    return {
      display: "grid",
      gridTemplateColumns: `repeat(${numImages}, 1fr)`,
      width: `${width}%`,
      height: "100%",
    };
  };

  const styles = getCalculatedStyles();

  return (
    <div className="absolute top-0 w-full h-[14vh] md:h-[24vh]">
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
