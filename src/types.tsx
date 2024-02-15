
export type Activity = {
  id: string;
  name: string;
  action: string;
};export type WithAuth<P> = P & {
  auth: string;
};

