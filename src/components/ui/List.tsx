import type { FC } from "react";

import { Item } from "./Item";
import type { UploadItem } from "../../global";

interface ListProps {
  uploads: UploadItem[];
  handleRemove: (idx: number) => void;
}

export const List: FC<ListProps> = ({ uploads, handleRemove }) => (
  <div className="mt-7">
    <h1 className="card-title">List</h1>
    <ul className="mt-2 space-y-3">
      {uploads.map(({ file: { name, size }, status, progress }, idx) => (
        <Item
          key={idx}
          idx={idx}
          filename={name}
          size={size}
          status={status}
          progress={progress}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  </div>
);
