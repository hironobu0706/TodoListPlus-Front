const priorityMap = new Map();
priorityMap.set(0, "ー");
priorityMap.set(1, "低");
priorityMap.set(2, "中");
priorityMap.set(3, "高");

const getPriority = (priority) => {
    return priorityMap.get(priority);
}

export { getPriority };