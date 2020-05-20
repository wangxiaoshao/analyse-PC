const tableConfig = {
    orgName: {
        key: "orgName",
        tooltip: false,
        label: "单位名称",
        sortable: false,
        showOverflowTooltip: false,
        minWidth: 100,
    },
    month: {
        key: "month",
        tooltip: false,
        label: "确认月份",
        sortable: false,
        formatter(row, column, cellValue) {
            // 处理后段传输格式为201911 => 11(提出月份)
            cellValue = cellValue ? cellValue.toString() : "";
            let monthArr = cellValue.split("") || [];
            let len = monthArr.length;
            let newStr = "";
            newStr = monthArr.slice(len - 2);
            if (+monthArr[len - 2] === 0) {
                newStr = monthArr.slice(len - 1);
            }
            return newStr;
        },
        showOverflowTooltip: false,
        minWidth: 100,
    },
};
export default tableConfig;
