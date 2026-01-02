const statusMap = new Map();
statusMap.set(0, "未");
statusMap.set(1, "作業中");
statusMap.set(8, "保留");
statusMap.set(9, "完了");

const getStatus = (status) => {
    return statusMap.get(status);
}

export { statusMap, getStatus };