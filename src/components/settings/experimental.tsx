import { cn, Slider, SliderProps } from "@heroui/react";

export default function Experimental() {
  const sliders: SliderProps[] = [
    { label: "Temperature", maxValue: 1, defaultValue: 0.5 },
    { label: "Max Length", maxValue: 4096, defaultValue: 1000, step: 2 },
    { label: "Top P", maxValue: 1, defaultValue: 0.5 },
    { label: "Frequency Penalty", maxValue: 2, defaultValue: 0 },
    { label: "Presence Penalty", maxValue: 2, defaultValue: 0 },
  ];
  const defaultProps: SliderProps = {
    size: "md",
    step: 0.005,
    minValue: 0,
    classNames: {
      label: 'text-md',
      value: 'text-md',
      base: 'pt-1'
    }
  };

  return (
    <div className='space-y-2 divide-divider'>
      {sliders.map((props, key) => (
        <Slider
          key={key}
          {...defaultProps}
          {...props}
          className={cn(defaultProps.className, props.className)}
        />
      ))}
    </div>
  );
}

