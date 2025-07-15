
export interface PaginationI<T>{
  meta: {page: number, limit: number,totalItems:number,totalPages:number},
  data : T[]
}


