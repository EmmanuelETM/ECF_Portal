export const DropDownCard = ({ data = [] }) => {
  return (
    <div className="shadow h-auto w-56 absolute">
      <ul className="text-right">
        {data.map((item, index) => (
          <li
            key={index}
            className="p-3 border text-gray-700 hover:text-white cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
