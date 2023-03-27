import React from "react";

const Select = ({ data, handler, defaultOption }) => {
  console.log("data >>> ", data);
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      defaultValue={"all"}
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
