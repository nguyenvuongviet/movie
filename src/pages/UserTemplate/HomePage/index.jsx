import Carousel from "./Carousel";
import ComingSoon from "./ComingSoon";
import ShowingMovie from "./ShowingMovie";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Carousel />
      <ShowingMovie />
      <ComingSoon />
    </div>
  );
}
