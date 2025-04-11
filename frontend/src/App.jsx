export default function App() {
  return (
    <>
      <div className="h-screen ">
        <div className="border h-[70px]"></div>

        <div className="ml-[100px] mt-[150px] flex flex-col display relative ">
          <h1 className="text-9xl font-sans font-stretch-expanded main-title">
            ScoreBoard
          </h1>
          <p className="text-4xl ml-2 font-mono main-promoline ">
            Get Score of your Favourite Team
          </p>
          <div className="h-[100px] w-[100px] border-2 shadow-2xl shadow-gray-400 rounded-full main-ballAni  absolute"></div>
        </div>
      </div>
    </>
  );
}
