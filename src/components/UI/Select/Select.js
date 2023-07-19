import React from "react";

const Select = ({ data, handler, defaultOption, selected }) => {
  return (
    <select
      className="form-select"
      value={selected}
      onChange={(e) => handler(e.target.value)}
    >
      {defaultOption ? (
        <option value={defaultOption.id}>{defaultOption.name}</option>
      ) : null}
      {data.map((item) => {
        return (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
