export type RequestState = 'Active' | 'Pending' | 'Cancelled' | 'Finished';

export interface ExpertRequest {
  state: RequestState;
  type_label: string;
  customer_name: string;
  customer_uuid: string;
  project_name: string;
  project_uuid: string;
  created: string;
  modified: string;
  description: string;
}
