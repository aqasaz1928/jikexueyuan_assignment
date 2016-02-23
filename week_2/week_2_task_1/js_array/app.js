/**
 * Created by Joker on 2015/11/10.
 */
function btnOnClick() {
    //定义数组
    var arr = ['a', 'x', 'b', 'd', 'm', 'a', 'k', 'm', 'p', 'j', 'a'];
    //定义方法，给定元素和数组，给出元素在数组中出现的次数
    function countItem(n, arr) {
//            定义一个对象，存储某个字母在数组中的信息
        var resultArr = {
            itemName: n, //字母本身
            count: 0,    //出现次数
            countIndex: [] //出现的位置
        };

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == n) {
                resultArr.count++;
                resultArr.countIndex.push(i);
            }
        }

        return resultArr; //返回所有信息
    }

//        传入一个数组，对其每个元素遍历
    function countArr(arr) {
        var itemFind = []; //定义一个数组存储已经出现过的元素
        var maxItem = 0;   //出现次数最大值
        var finalResult = {}; //最终结果的信息
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] in itemFind) {
                continue;    //当一个字母之前出现过则跳过
            }
            itemFind.push(arr[i]);   //若没有出现过则将其加入出现过的集合中
            var result = countItem(arr[i], arr);  //每个字母都利用函数进行判断
            if (maxItem < result.count) {
                maxItem = result.count;  //当他出现的次数大于现在已知元素的次数，则将其设为最大
                finalResult = result;
            }
        }
        alert('出现最多的字符是 ' + finalResult.itemName + ' 出现次数是 ' + finalResult.count + ' 出现位置是 ' + finalResult.countIndex);
    }

    countArr(arr);
}