import { ApiResponse, ApiSchemas } from "@/lib/types/api";
import { ToFirestoreObject } from "@/lib/types/misc";

// Re-export OpenAPI generated types directly from the backend
export type BgJob = ApiResponse<"GetBgJob">;
export type BgJobType = ApiSchemas["BgJobType"];
export type BgJobStatus = ApiSchemas["BgJobStatus"];

export type BgJobFirestore = ToFirestoreObject<BgJob> & {
  resultDetails?: {
    progress?: number;
    completedAt?: string;
    duration?: number;
  };
};
