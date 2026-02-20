import { useRef } from "react";

type Props = {
  accept?: string;
  onPick: (file: File) => void;
};

export function ImagePickerInput({ accept = "image/*", onPick }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const trigger = () => inputRef.current?.click();

  return {
    trigger,
    input: (
      <input
        type="file"
        ref={inputRef}
        hidden
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
        }}
      />
    ),
  };
}
