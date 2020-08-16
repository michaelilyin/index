export interface ApiEvent {
  id: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  status: string;
  htmlLink: string;
  visibility: string;
  iCalUID: string;
}
