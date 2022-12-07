export interface Res {
  status: string;
  msg: string;
  data: any;
}

export interface Routes {
  path: string;
  name: string;
  id: string;
  parentId: string | null;
  component: string | object;
  children?: Array<Routes>;
  redirect?: string;
  hidden?: boolean;
  meta?: object | null;
}
