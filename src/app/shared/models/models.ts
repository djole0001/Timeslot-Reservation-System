export interface Treatment {
  id?: number;
  name: string;
  price: number;
  durationForClient: number;
  durationForWorker: number;
}

export interface SelectedTreatment {
  id?: number;
  name: string;
  price: number;
  duration: number;
  treatment: Treatment;
}

export enum AppointmentState {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
}

export interface Absence {
  id?: number;
  fromDate?: Date;
  toDate?: Date;
  wholeDay: boolean;
  comment?: string;
}

export interface AppointmentOverview {
  id?: number;
  name: string;
  email: string;
  instagramNumber: string;
  comment: string;
  selectedTime: Date;
  selectedTreatments: SelectedTreatment[];
  state: AppointmentState;
  createdAt: Date;
}

export interface TreatmentWithSelected extends Treatment {
  isSelected: boolean;
}

export interface FreeAppointment {
  date: Date;
}

export interface FreeWeekAppointments {
  week: {
    [key: string]: FreeAppointment[];
  };
}

export interface PendingWeekAppointments {
  week: Map<string, AppointmentOverview[]>;
}

export interface ConfirmedWeekAppointments {
  week: Map<string, AppointmentOverview[]>;
}

export interface DynamicItem {
  header: DynamicContentItem;
  items?: DynamicContentItem[];
  date?: Date;
}

export interface DynamicContentItem {
  content: string | undefined;
  rightContent?: string;
}
