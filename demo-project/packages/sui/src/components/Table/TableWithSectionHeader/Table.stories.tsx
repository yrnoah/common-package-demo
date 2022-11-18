import { useCallback, useState, useMemo } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RawTable, { PaddingStyle } from "./Table";
import { displayTooltip } from "../../Tooltip";
import type { TSuiTableColumns } from "./typings";

const MockData = require("./__MOCK__/data.json");
const copyData = Array.from({ length: 234 }, (_, i) => {
  return {
    ...MockData[0],
    order: {
      ...MockData[0].order,
      id: `${MockData[0].order.id}${i}`,
    },
  };
});
const ds = [...MockData, ...copyData];

export default {
  title: "Example/Table/TableWithSections",
  component: RawTable,
  argTypes: {
    rowKey: { control: "function" },
    total: { table: { disable: true } },
    currIndex: { table: { disable: true } },
    curPage: { table: { disable: true } },
    pageSize: { table: { disable: true } },
    // onPageSizeChange: { table: { disable: true } },
    // onSetPage: { table: { disable: true } },
  },
} as ComponentMeta<typeof RawTable>;

const Template: ComponentStory<typeof RawTable> = (args) => {
  const [curPage, setPage] = useState(2);
  const [pageSize, setPageSize] = useState(50);
  const onSetPage = useCallback((v: number) => setPage(v), []);
  const onSetPageSize = useCallback((v: number) => setPageSize(v), []);
  const tableDS = useMemo(() => {
    const start = (curPage - 1) * pageSize;
    return (args.ds || []).slice(start, start + pageSize);
  }, [curPage, pageSize, args.ds]);
  return (
    <div
      style={{
        height: "80vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        marginTop: 50,
      }}
    >
      <RawTable
        {...args}
        ds={tableDS}
        onSetPage={onSetPage}
        onPageSizeChange={onSetPageSize}
        curPage={curPage}
        pageSize={pageSize}
      />
    </div>
  );
};
export const TableWithSections = Template.bind({});
const columns: TSuiTableColumns[] = [
  {
    dataIndex: "id",
    key: "id",
    title: "Order ID",
    minWidth: 120,
    flex: 2,
    render: (_, row: any) => row?.order?.id || "-",
  },
  {
    dataIndex: "inventoryName",
    key: "inventoryName",
    title: "Workspace Name",
    minWidth: 168,
    flex: 2,
    render: (_, row: any) =>
      displayTooltip((row?.inventory?.name as string) || "-", 20, {
        wrapperStyle: { width: "100%" },
      }),
    renderRawData: (_, row: any) => row?.inventory?.name || "-",
    setRightClickCopy: true,
  },
  {
    dataIndex: "type",
    key: "type",
    title: "Workspace Type",
    minWidth: 168,
    flex: 1.5,
    render: (_, row: any) => row?.inventory?.type || "-",
  },
  {
    dataIndex: "location",
    key: "location",
    title: "Location Name",
    minWidth: 168,
    flex: 2,
    render: (_, row: any) =>
      displayTooltip((row?.inventory?.spaceName as string) || "-", 20, {
        wrapperStyle: { width: "100%" },
      }),
    renderRawData: (_, row: any) => row?.inventory?.spaceName || "-",
    setRightClickCopy: true,
  },
  {
    dataIndex: "mobile",
    key: "mobile",
    title: "User Phone Number",
    minWidth: 168,
    flex: 2,
    render: (_, row: any) =>
      row?.user?.mobile
        ? `${row?.user?.countryCode} ${row?.user?.mobile}`
        : "-",
  },
  {
    dataIndex: "checkInTime",
    key: "checkInTime",
    title: "CheckIn Date Time",
    minWidth: 188,
    flex: 3,
    render: (_, row: any) => row?.walkIn?.checkInTime || "-",
  },
  {
    dataIndex: "checkOutTime",
    key: "checkOutTime",
    title: "CheckOut Date Time",
    minWidth: 188,
    flex: 3,
    render: (_, row: any) => row?.walkIn?.checkOutTime || "-",
  },
  {
    dataIndex: "checkOutMethod",
    key: "checkOutMethod",
    title: "CheckOut Method",
    minWidth: 168,
    flex: 1,
    style: { textTransform: "capitalize" },
    render: (_, row: any) => row?.walkIn?.checkOutMethod || "-",
  },
  {
    dataIndex: "status",
    key: "status",
    title: "Payment Status",
    minWidth: 168,
    flex: 1,
    style: { textTransform: "capitalize" },
    render: (_, row: any) => row?.payment?.paymentStatus || "-",
  },
  {
    dataIndex: "amount",
    key: "amount",
    title: "Actual Payment Amount",
    minWidth: 208,
    flex: 1,
    hasCurrency: true,
    align: "right",
    render: (_, row: any) => `${parseFloat(row?.order?.actualAmount) || 0}`,
    explanation:
      "The most current user net payment amount. This includes voucher discounts, refunds and cancellation fees.",
  },
  {
    dataIndex: "actions",
    key: "actions",
    title: "",
    align: "center",
    width: 40,
    render: (_, row: any) => (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClickCapture={(e) => {
          e.stopPropagation();
          window.alert(`click action button of ${row.order.id}`);
        }}
      >
        ...
      </div>
    ),
    style: { position: "sticky", right: 0, height: "100%", padding: 0 },
  },
];
const ExtraHeader = () => {
  return (
    <div
      style={{
        backgroundColor: "#1DD1A1",
        boxSizing: "border-box",
        height: 100,
      }}
    >
      This block will not sticky to top when scroll
    </div>
  );
};
TableWithSections.args = {
  columns,
  ds,
  rowKey: (row: any) => row?.order?.id,
  total: ds.length,
  wrapperStyle: PaddingStyle,
  rowHeight: 52,
  extraHeader: <ExtraHeader />,
  onItemClick: (v) => window.alert(`click item: ${JSON.stringify(v)}`),
  loading: true,
  noDataContainerStyles: { height: "100%" },
  scrollHeight: 0,
  currItemStyle: { backgroundColor: "green" },
  bottomBorderLeft: 0,
  bottomBorderRight: 0,
};
