/**
 * Created by wangxiaoshao on 2020/10/31.
 */

export default {
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                },
                shortcuts: null,
            },
            pickerMounthOptions: {},
            selectDate: "",
        };
    },
    methods: {
        pickDateOptionRules() {
            const that = this;
            this.pickerOptions = {
                onPick({ maxDate, minDate }) {
                    if (maxDate && minDate) {
                    } else {
                        const date = maxDate || minDate;
                        that.selectDate = date;
                    }
                },
                disabledDate(time) {
                    const { selectDate } = that;
                    if (selectDate) {
                        return (
                            selectDate.getMonth() !== time.getMonth() ||
                            time.getTime() > Date.now() - 8.64e6
                        );
                    }
                    return time.getTime() > Date.now() - 8.64e6;
                },
            };
        },
        pickMounthOptionRules() {
            const that = this;
            this.pickerMounthOptions = {
                onPick({ maxDate, minDate }) {
                    if (maxDate && minDate) {
                    } else {
                        const date = maxDate || minDate;
                        that.selectDate = date;
                    }
                },
                disabledDate(time) {
                    const { selectDate } = that;
                    if (selectDate) {
                        return (
                            selectDate.getYear() !== time.getYear() ||
                            time.getTime() > Date.now() - 8.64e6
                        );
                    }
                    return time.getTime() > Date.now() - 8.64e6;
                },
            };
        },
        onDateBlur() {
            this.selectDate = "";
        },
    },
    disabledDate(now) {
        return now.getTime() > Date.now();
    },
    shortcuts: [
        {
            text: "今天",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime());
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "近三天",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "近一周",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "近一个月",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "近三个月",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "近半年",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                picker.$emit("pick", [start, end]);
            },
        },
    ],
};
