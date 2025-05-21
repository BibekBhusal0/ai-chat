import { cn, Slider, SliderProps } from "@heroui/react";

export default function Experimental() {
  const sliders: SliderProps[] = [
    { label: 'Temperature', maxValue: 1, defaultValue: 0.5, },
    { label: 'Max Length', maxValue: 4096, defaultValue: 1000, step : 2 },
    { label: 'Top P', maxValue: 1, defaultValue: 0.5, },
    { label: 'Frequency Penalty', maxValue: 2, defaultValue: 0, },
    { label: 'Presence Penalty', maxValue: 2, defaultValue: 0, },
  ]
  const defaultProps: SliderProps = { size: 'sm', step: 0.005, minValue: 0 }

  return (
    <div>
      {sliders.map((props) => <Slider {...defaultProps} {...props} className={cn(defaultProps.className, props.className)} />)}
    </div>
  )
}

