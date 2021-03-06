interface ReportSection {
  header: string;
  body: string;
}

export type Report = ReportSection[];

type OfferingState = 'OK' | 'Requested' | 'Terminated';

export interface Offering {
  state: OfferingState;
  name: string;
  type_label: string;
  unit_price: number;
  issue_key?: string;
  issue_status?: string;
  issue_link?: string;
  issue_description: string;

}
