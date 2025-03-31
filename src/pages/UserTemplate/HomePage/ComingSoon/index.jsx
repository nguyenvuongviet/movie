import Movie from "./Movie";

export default function ComingSoon() {
  return (
    <div className="bg-cover w-screen h-screen overflow-hidden bg-[url('https://images2.thanhnien.vn/528068263637045248/2024/11/20/how-to-train-your-dragon-17320782951861470898809.png')]">
      <div className="bg-bg-opacity-1 py-10 w-full h-full">
        <div className="container mx-auto">
          <div className="max-w-[90%] mx-auto">
            <h2 className="border-b-4 mb-5 text-xl text-white border-orange-500 p-2 inline-block font-bold">
              Coming Soon
            </h2>
            <Movie />
          </div>
        </div>
      </div>
    </div>
  );
}
