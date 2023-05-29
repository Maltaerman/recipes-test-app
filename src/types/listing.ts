export interface IMeta {
  currentPage: number;
  lastPage: number;
}
  
export interface IListing<T> {
  data: T[];
  meta: Readonly<IMeta>;
}
