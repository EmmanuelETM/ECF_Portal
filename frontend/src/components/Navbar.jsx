import { Menu } from "lucide-react";

export function Navbar({ setRoute, setSidebarOpen }) {
  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-green-600">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-green-600 h-16 justify-between items-center mx-auto px-4 flex">
              <div className="text-3xl font-bold py-4 flex items-center justify-center gap-3">
                <button
                  className="sm:hidden text-white pt-1"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu />
                </button>
                <button
                  className="cursor-pointer text-white"
                  onClick={() => setRoute("start")}
                >
                  Portal FE
                </button>
              </div>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <div className="justify-center items-center flex relative">
                  <img className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
