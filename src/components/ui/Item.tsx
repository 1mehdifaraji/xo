import type { FC } from "react";

import { LoadingDots } from "./LoadingDots";
import { cn } from "../../lib/hooks";
import { handleFileSize } from "../../lib/helpers";

import cancelSvg from "../../assets/cancel.svg";
import successSvg from "../../assets/success.svg";
import errorSvg from "../../assets/error.svg";
import refreshSvg from "../../assets/arrow-reload-horizontal-round.svg";

interface ItemProps {
  status: string;
  filename: string;
  progress: number;
  size: number;
  idx: number;
  handleRemove: (key: number) => void;
}

export const Item: FC<ItemProps> = ({
  status,
  filename,
  progress,
  size,
  idx,
  handleRemove,
}) => (
  <li className="border-1  relative overflow-hidden rounded-[6px] border-[#EDEDED] bg-[#fafafa] py-1.5 px-2.5 flex justify-between items-center">
    <div className="flex-1">
      <div className="flex items-center gap-1">
        {status === "completed" && <img src={successSvg} alt="success-icon" />}
        {status === "failed" && <img src={errorSvg} alt="error-icon" />}
        {status === "pending" && <LoadingDots />}
        <p className="text-sm font-light tracking-neg-2">{filename}</p>
        <p
          className={cn(
            "text-sm font-light text-[#9B9B9B]",
            status === "failed" && "text-[var(--error)]"
          )}
        >
          ({handleFileSize(size)} MB)
        </p>
      </div>
      {progress ? (
        <div
          style={{ width: `${progress - 4}%` }}
          className={cn(
            "h-1 transition-all absolute -bottom-[2px] bg-black rounded-full"
          )}
        />
      ) : null}
    </div>
    <div className="flex gap-[7px] items-center">
      <button className="button-status capitalize">
        <div
          className={cn(
            "w-[7px] h-[7px] rounded-[2px]",
            status === "completed" && "bg-[var(--success)]",
            status === "pending" && "bg-[var(--primary)]",
            status === "failed" && "bg-[var(--error)]"
          )}
        />
        {status === "completed" && "completed"}
        {status === "pending" && "uploading"}
        {status === "failed" && "failed — too large"}
      </button>
      <button className="button-secondary">
        {status === "failed" ? (
          <img alt="refresh-icon" src={refreshSvg} />
        ) : (
          <img
            onClick={() => handleRemove(idx)}
            alt="cancel-icon"
            src={cancelSvg}
          />
        )}
      </button>
    </div>
  </li>
);
