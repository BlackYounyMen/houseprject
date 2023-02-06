// 设置水电数据
export const SET_MEUN_COMMIT = (state, seckills) => {
    console.log(seckills);
    state.meunitem = seckills;
};

// 设置水电数据
export const SET_Water_INFO = (state, seckills) => {
    state.page.totalpage = seckills.PageCount;
    console.log(state.page.totalpage)
    state.DeviveItem = seckills.Data;
    var list = [];
    let len = seckills.Data.length;
    let n = 6; //假设每行显示4个
    let lineNum = len % 6 === 0 ? len / 6 : Math.floor(len / 6 + 1);
    for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = seckills.Data.slice(i * n, i * n + n);
        list.push(temp);
    }
    state.DeviceList = list;
};
// 设置返回的状态值
export const SET_STATE_UPDATE = (state, seckills) => {
    state.BackState = seckills;
};

//获取第一个下拉框的数据
export const SET_FIRST_ITEM = (state, seckills) => {
    state.FirstSelectItem = seckills;
};

//获取第二个下拉框的数据
export const SET_SECOND_ITEM = (state, seckills) => {
    state.SecondSelectItem = seckills;
};
//获取客户信息的数据
export const SET_Customer_INFO = (state, seckills) => {
    state.CustomerList = [];
    state.page.totalpage = seckills.PageSize;
    state.page.total = seckills.PageCount;

    state.CustomerList = seckills.Data;
};
//获取行标题是否显示的数据
export const SET_CustomerState_INFO = (state, seckills) => {
    state.CustomerStateList = seckills;
};
//获取客户信息的数据
export const SET_PersonCharge_INFO = (state, seckills) => {
    state.PersonChargeList = [];
    state.page.totalpage = seckills.PageSize;
    state.page.total = seckills.PageCount;

    state.PersonChargeList = seckills.Data;
};

//获取客户全部信息的数据
export const SET_PerSonRecoillist_INFO = (state, seckills) => {

    console.log(seckills)
    state.AllPersonChargeList = seckills;
};

//
export const SET_HumanResource_Info = (state, seckills) => {
    state.HumanResourcesList = seckills;
};


