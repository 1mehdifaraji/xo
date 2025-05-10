import type { ChangeEvent, DragEvent, FC, RefObject } from "react";

import boxSvg from "../../assets/box.svg";

interface UploadBoxProps {
  inputRef: RefObject<HTMLInputElement | null>;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}

export const UploadBox: FC<UploadBoxProps> = ({
  inputRef,
  handleFileSelect,
  handleDrop,
}) => (
  <div>
    <h1 className="card-title">File</h1>
    <input
      ref={inputRef}
      type="file"
      accept=".jpg,.jpeg,.png"
      multiple
      className="hidden"
      onChange={handleFileSelect}
    />
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="mt-2 flex flex-col px-2.5 py-7.5 justify-center items-center bg-diagonal-stripes border-[#B6B6B6] border-1 border-dashed rounded-[10px]"
    >
      <img className="w-[115px] translate-y-4" src={boxSvg} />
      <div className="pt-2.5 gap-2.5 flex flex-col items-center text-center relative z-10">
        <div className="tracking-neg-4 text-2xl text-error font-semibold text-center max-w-40 font-manrope">
          <span className="text-[#8E949D]">Drag & drop a</span> file{" "}
          <span className="text-[#8E949D]">or </span> browse{" "}
          <span className="text-[#8E949D]">to upload</span>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current!.click()}
          className="button"
        >
          Browse
        </button>
        <div className="font-medium text-xs">
          <p className="tracking-neg-2 text-[#8E949D]">
            File must be <span className="text-[#3D3D3D] uppercase">.jpg</span>{" "}
            or <span className="text-[#3D3D3D] uppercase">.png</span>
          </p>
          <p className="mt-1.5 tracking-neg-2 text-[#3D3D3D]">Max → 2MB</p>
        </div>
      </div>
    </div>
  </div>
);
