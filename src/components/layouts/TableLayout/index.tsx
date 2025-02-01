import {
  TableLayoutContainer,
  TableTitle,
  TableTitleContainer,
} from "./TableLayout.styled";

interface TableLayoutProps {
  title: string;
  list: unknown[];
  data: unknown[];
  header: unknown[];
}

export const TableLayout = ({
  title,
  list,
  data,
  header,
}: TableLayoutProps) => {
  console.log(list);
  console.log(data);
  console.log(header);
  return (
    <TableLayoutContainer>
      <TableTitleContainer>
        <TableTitle>{title}</TableTitle>
      </TableTitleContainer>
    </TableLayoutContainer>
  );
};
