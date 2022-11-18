import { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasePagination from "./Pagination";

export default {
  title: "Example/Table/Pagination",
  component: BasePagination,
  argTypes: {
    pageSize: { table: { disable: true } },
    ref: { table: { disable: true } },
    key: { table: { disable: true } },
  },
} as ComponentMeta<typeof BasePagination>;

const Template: ComponentStory<typeof BasePagination> = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const [pageSize, setPageSize] = useState(args.pageSize);

  const onPageSizeChange = useCallback((value) => {
    setCurrentPage(1);
    setPageSize(value);
  }, []);
  const onPageChange = useCallback((v) => setCurrentPage(v), []);

  return (
    <BasePagination
      {...args}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageSizeChange={onPageSizeChange}
      onSetPage={onPageChange}
    />
  );
};

const mockOptions = [5, 10, 20, 50, 100];

export const Pagination = Template.bind({});
Pagination.args = {
  totalSize: 200,
  pageSize: mockOptions[2],
  currentPage: 1,
  options: mockOptions,
  style: { marginTop: "60vh", border: "1px solid #f0f0f0" },
};
