import React from "react";
import { Select } from "antd";
import type { EntrySelectInput } from "@/types/types";

type SelectInputProps = {
  items?: EntrySelectInput[];
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  items = [],
  placeholder = "Select...",
  onChange,
  value
}) => {
  const handleChange = (value: string) => {
    if (onChange) onChange(value);
    else console.log("selected", value);
  };

  return (
    <Select
      showSearch
      size="large"
      placeholder={placeholder}
      optionFilterProp="label"
      defaultValue={value}
      onChange={handleChange}
      filterOption={(input, option) =>
        String(option?.label)
          .toLowerCase()
          .includes(String(input).toLowerCase())
      }
      options={items.map((it) => ({
        value: it.value ?? "",
        label: it.label ?? it.value ?? "",
      }))}
      style={{ minWidth: 200 }}
    />
  );
};

export default SelectInput;
