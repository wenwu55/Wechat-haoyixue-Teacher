// 兼容key , completeFetchData({data: {id:1,orgno:2}, keyMap: [['id','Id'], ['orgno','orgNo']]})   > {id:1,Id:1,orgno:2,orgNo:2}
export const completeFetchData = ({
  data,
  keyMap = []
}) => {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    throw new Error('data is not an Object')
  }
  if (Object.prototype.toString.call(keyMap) !== '[object Array]') {
    throw new Error('keyMap is not an Array')
  }

  return keyMap.reduce((data, keys) => {
    const keyList = keys.filter(key => {
      return data.hasOwnProperty(key)
    })
    if (keyList.length > 0) {
      const key = keyList[0]
      const value = data[key]
      keys.forEach(keyItem => {
        if (keyItem === key) return
        data[keyItem] = value
      })
    }
    return data
  }, data)
}

export const completeKeyMap = 
[
  ['productName', 'productname'],
  ['senderid', 'senderId'],
  ['discountprice', 'discountPrice'],
  ['createtime', 'createTime'],
  ['updatetime', 'updateTime'],
  ['sale_sum', 'saleSum'],
  ['orgno', 'orgNo'],
  ['billid', 'billId'],
  ['orgname', 'orgName'],
  ['studentname', 'studentName'],
  ['orderno', 'orderNo'],
  ['createtime', 'createTime'],
  ['billname', 'billName'],
  ['billobject', 'billObject'],
  ['userid', 'userId'],
  ['username', 'userName'],
  ['groupId', 'groupid'],
  ['schoolId', 'schoolid'],
  ['senderid', 'senderId'],
  ['buyerid', 'buyerId'],
  ['sellerid', 'sellerId'],
  ['productid', 'productId'],
  ['productnum', 'productNum'],
  ['orderprice', 'orderPrice'],
  ['paychannel', 'payChannel'],
  ['ordertype', 'orderType'],
  ['updatetime', 'updateTime']
]