export interface Res {
  status: string;
  msg: string;
  data: any;
}

export interface Routes {
  path: string;
  name: string;
  children?: Array<Routes>;
  component: any;
  redirect?: string;
  meta?: object;
}
