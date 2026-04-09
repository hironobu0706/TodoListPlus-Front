const statusMap = new Map();
statusMap.set(0, "未");
statusMap.set(1, "作業中");
statusMap.set(8, "保留");
statusMap.set(9, "完了");

export function getStatus(status:number) {
    return statusMap.get(status);
}
