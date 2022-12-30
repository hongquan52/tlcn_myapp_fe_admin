import React from "react";

const Selection = (props) => {
  return (
    <select
      id={props.id}
      name={props.name}
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      onChange={props.onChange}
    >
      {props.isDefault && <option value={""}>Mục lớn</option>}
      {props.data.map((item, index) => (
        <option
          value={item.id}
          key={index}
          selected={props.parentId === item.id}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Selection;
