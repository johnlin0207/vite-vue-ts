export interface Res {
  status: string;
  msg: string;
  data: any;
}

export interface Routes {
  path: string;
  name: string;
  component: string;
  redirect?: string;
  meta?: object;
}
