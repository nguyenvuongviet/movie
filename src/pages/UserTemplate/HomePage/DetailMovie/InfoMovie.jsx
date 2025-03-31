export default function InfoMovie({ data }) {
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  return (
    <div className="flex items-center justify-center my-5 w-[80%] mx-auto">
      <div className="flex gap-10 pt-3 w-full">
        {data && (
          <iframe
            className="rounded-xl mx-auto md:h-[400px] md:w-[680px]"
            width={340}
            height={200}
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              data.trailer
            )}`}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
