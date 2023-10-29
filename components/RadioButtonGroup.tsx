import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
// import Button from "@/components/Button"; // Import the Button component from Material-UI

interface RadioButtonItemProps {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  items: RadioButtonItemProps[];
  onClick?: (value: string) => void; // Change the prop name to onClick
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({ items, onClick }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleClick = (value: string) => {
    setSelectedValue(items.findIndex((item) => item.value === value)); // Find the index of the clicked item
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <div className="flex gap-4">
      {items.map((item) => (
        <Button key={item.value} onClick={() => handleClick(item.value)}>
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
