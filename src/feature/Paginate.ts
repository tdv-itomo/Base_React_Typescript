import { PaginatorPageChangeEvent } from 'primereact/paginator';

export interface PaginateProps {
  setFirst: React.Dispatch<React.SetStateAction<number>>;
  setRows: React.Dispatch<React.SetStateAction<number>>;
}

export const onPageChange = (
  { setFirst, setRows }: PaginateProps,
  event: PaginatorPageChangeEvent
) => {
  setFirst(event.first);
  setRows(event.rows);
};
