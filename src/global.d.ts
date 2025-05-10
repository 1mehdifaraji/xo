import type { CancelTokenSource } from "axios";

export type UploadStatus =
  | "pending"
  | "uploading"
  | "completed"
  | "aborted"
  | "error"
  | "failed";

export interface UploadItem {
  file: File;
  progress: number;
  status: UploadStatus;
  cancelToken: CancelTokenSource | null;
}
