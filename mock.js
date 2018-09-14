var Mock = require('mockjs')
var fs = require('fs')

var data = new Mock.mock({
    'user': [],
    'userlist': [],
    'musiclist': [],
    'alluser|20-100': [
        {
            'qqid|+1' : 1,
            'qq|290000000-300000000' : 100,
            'name' : '@cname()',
            'pwd|100000-999999' : 100,
            'headimg' : '@image(250x250,@color,@cword)'
        }
    ]
})
fs.writeFile('db.json', JSON.stringify(data, null, 2), function(err) {
    if (err) {
        console.error(err)
    } else {
        console.log('数据写入成功')
    }
})