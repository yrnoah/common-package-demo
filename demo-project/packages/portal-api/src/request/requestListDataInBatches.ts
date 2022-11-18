import request, { ListRequestMaxLength } from "./index";
import type { IRequestParams } from "./request";

export type IRequestParamsInBatches = IRequestParams & {
  data: { size: number; page: number };
};

export async function requestListDataInBatches<
  T extends { total: number; items: any }
>(params: IRequestParamsInBatches, oriSize: number) {
  const size = ListRequestMaxLength;
  const totalPage = Math.ceil(oriSize / size);
  const services = [];
  for (let i = 1; i <= totalPage; i++) {
    const newParams = JSON.parse(JSON.stringify(params));
    newParams.data.page = i;
    newParams.data.size = size;
    services.push(request(newParams));
  }
  let items: any = [];
  let _total: number = 0;
  await Promise.all(services).then((values) => {
    (values as T[]).forEach((v: T) => {
      items = [...items, ...v.items];
      if (v.total > 0) {
        _total = v.total;
      }
    });
  });
  return { items, total: _total } as unknown as T;
}
