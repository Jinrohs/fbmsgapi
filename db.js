
var getUser = (id) => {
    return {
        id: id,
        type: 'S',
        timestamp: Date.now(),
        matched: true,
        matchedUserId: "1259907210715796"
    };
};

var seveUser = (userId, smType, timestamp) => {

};

module.exports = {
    getUser: getUser,
    saveUser: saveUser
};