export function Navbar({ setRoute }) {
  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-between items-center mx-auto px-4 flex">
              <h1 className="text-3xl font-bold py-4">
                <button
                  className="cursor-pointer"
                  onClick={() => setRoute("start")}
                >
                  Portal FE
                </button>
              </h1>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <div className="justify-center items-center flex relative">
                  <img className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300" />
                  <p className="font-semibold text-sm">User Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
