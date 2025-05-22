import { LanguageSelector, SettingSelect } from "./select";

export default function Audio() {
  const voiceItems = [
    { key: "1", label: "voice 1" },
    { key: "2", label: "voice 2" },
    { key: "3", label: "voice 3" },
    { key: "4", label: "voice 4" },
  ];

  const playbackSpeedItems = [
    { key: "0.5", label: "0.5x" },
    { key: "0.75", label: "0.75x" },
    { key: "1", label: "1x" },
    { key: "1.25", label: "1.25x" },
    { key: "1.5", label: "1.5x" },
    { key: "2", label: "2x" },
  ];

  return (
    <div className="space-y-2 divide-y-1 divide-divider">
      <SettingSelect items={voiceItems} label="Voice" defaultSelectedKeys={["1"]} />
      <SettingSelect
        items={playbackSpeedItems}
        label="Playback Speed"
        defaultSelectedKeys={["1"]}
      />
      <LanguageSelector />
    </div>
  );
}
