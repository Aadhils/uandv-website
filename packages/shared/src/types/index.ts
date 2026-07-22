export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  details?: unknown;
  requestId?: string;
  timestamp: string;
  path: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface AuthenticatedUserPayload {
  clerkId: string;
  userId: string;
  email: string;
  role: string;
}
