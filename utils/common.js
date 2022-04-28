
module.exports.createJsonResult = (status, resMsg, data) => {
    const resJson = {};
    resJson['message'] = resMsg; 

    if (status === 200) {
        resJson['result'] = 'success';
        resJson['data'] = data;

    }  else if (status === 400) {
        resJson['result'] = 'fail';

    } else if (status === 500) {
        resJson['result'] = false;
    }

    return resJson;
}

module.exports.replaceAll = (str, searchStr, replaceStr) => {
    return str.split(searchStr).join(replaceStr);
}
