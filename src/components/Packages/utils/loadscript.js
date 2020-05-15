/**
 * Created by Luoxie on 2019-09-19.
 */
import tool from "./index";

const regionUrlPath =
    "https://sisp.servyou.com.cn/apiweb/sisp/1/xzqh/getXzqhFile?code=";
const regionParamCodes = {
    province: "xzqh_province_ex",
    city: "xzqh_city_ex",
    area: "xzqh_county_ex",
};
const regionUrlSuffix = "_url";

let loadTool = {
    /**
     * @param {string|function} url - 脚本地址
     * @param {object} [options] - script标签属性 { defer: "", async: "", type: ""}
     * @param {function} [callback] - 回调地址
     * @param {function} [errorCallback] - 错误回调
     * @return {Promise}
     * */
    load(url, options, callback, errorCallback) {
        if (tool.isFunction(options)) {
            errorCallback = callback;
            callback = options;
            options = {};
        }
        if (tool.isFunction(url)) {
            url = url();
        }
        return new Promise((resolve, reject) => {
            let scriptDom = document.createElement("script");
            Object.assign(scriptDom, options);
            scriptDom.onload = () => {
                resolve();
                callback && callback();
            };
            scriptDom.onerror = (error) => {
                reject(error);
                errorCallback && errorCallback();
            };
            scriptDom.src = url;
            document.head.appendChild(scriptDom);
        });
    },
    /**
     * @return {Promise}
     * */
    loadAllRegionData() {
        return Promise.all([
            loadTool.loadProvinceData(),
            loadTool.loadCityData(),
            loadTool.loadAreaData(),
        ]);
    },
    /**
     * @param {function} [callback]
     * @return {Promise}
     * */
    loadProvinceData(callback) {
        return loadTool.loadRegionData(regionParamCodes.province, callback);
    },
    /**
     * @param {function} [callback]
     * @return {Promise}
     * */
    loadCityData(callback) {
        return loadTool.loadRegionData(regionParamCodes.city, callback);
    },
    /**
     * @param {function} [callback]
     * @return {Promise}
     * */
    loadAreaData(callback) {
        return loadTool.loadRegionData(regionParamCodes.area, callback);
    },
    /**
     * @description 加载propertyName指定的行政区划地址
     * @param {string} propertyName
     * @param {function} [callback]
     * @return {Promise}
     * */
    loadRegionData(propertyName, callback) {
        if (window[propertyName]) {
            return Promise.resolve(window[propertyName]);
        }
        return loadTool
            .load(regionUrlPath + propertyName + regionUrlSuffix)
            .then(() => {
                callback && callback(window[propertyName]);
                return window[propertyName];
            });
    },
};

export default loadTool;
