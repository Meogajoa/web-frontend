import { Dropdown } from '@/components/Dropdown';
import { type Optional } from '@/types/misc';
import { cn } from '@/utils/classname';
import React from 'react';

type ExampleOption = Optional<{
  id: number;
  value: string;
  label: string;
}>;

const myOptions: ExampleOption[] = [
  {
    id: 1,
    value: 'Option 1',
    label: 'Option 1',
  },
  {
    id: 2,
    value: 'Option 2',
    label: 'Option 2',
  },
  {
    id: 3,
    value: 'Option 3',
    label: 'Option 3',
  },
];

type Props = {
  className?: string;
};

const DropdownExample: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<ExampleOption>();

  return (
    <Dropdown value={selectedOption} onOptionClick={handleOptionClick}>
      <Dropdown.Button className={cn('', className)}>
        {children}
      </Dropdown.Button>
      <Dropdown.Options>
        {myOptions.map((option) => (
          <Dropdown.Option key={option?.id} value={option}>
            {option?.label}
          </Dropdown.Option>
        ))}
      </Dropdown.Options>
    </Dropdown>
  );

  function handleOptionClick(value: ExampleOption) {
    setSelectedOption(value);
    console.log(`Selected Option: ${value?.label}`);
    alert(`Selected Option: ${value?.label}`);
  }
};

export default DropdownExample;
