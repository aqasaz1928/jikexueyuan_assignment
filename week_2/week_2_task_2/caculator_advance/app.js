/**
 * Created by Joker on 2015/11/13.
 */
/*全局变量*/
var num1 = '';                  //第一个数字
var num2 = '';                  //第二个数字
var result = 0;                 //显示栏显示的数字
var oper = '';                  //运算符号
var equalPressed = false;       //在一次计算中是否按下过等于键
var caculated = false;          //是否进行过计算

//定义方法拿到输入框
function currentNumber() {
    return document.getElementById('number');
}

//定义方法输入数据
function getNum(num) {

    //当等于键按下进行计算之后，再按数字键，先进行归零
    if (equalPressed) {
        Clean();
    }

    //当数据错误时报错
    if (currentNumber().value === '') {
        alert('数据错误！\n 请点击C键继续...');
        return 0;
    }

    //当进行了非等于计算之后按下零键，相当于归零
    if (num.id == 'num0' && caculated) {
        Clean();
    }


    console.log(num2);
    if (caculated) { //如果进行过了计算，输入框需要清零
        currentNumber().value = '0';
        caculated = false;
    }

    if (currentNumber().value === '0') {//当输入框为零时
        if (num.id == 'dot') {  //输入点直接加在后面;
            currentNumber().value += num.innerHTML;
        } else {
            currentNumber().value = num.innerHTML;
        }
    } else {
        currentNumber().value += num.innerHTML;
    }

    setNum();


}


//定义方法把数据传给num
function setNum() {
    if (oper == '' && num2 === '') {
        num1 = currentNumber().value - 0;
    } else if (oper != '') {
        num2 = currentNumber().value - 0;
    }
}

//按下等于时进行计算
function getResult(part) {
    if (part.id == 'equal') {
        equalPressed = true;
    }
    //无运算符时按等于相当于归零
    if (oper == '') {
        Clean();
        return 0;
    }
    caculated = true;
    switch (oper) {
        case 1:  //返回一时为加法
            result = parseFloat(num1) + parseFloat(num2);
            currentNumber().value = result;
            break;
        case 2: //2为减法
            result = parseFloat(num1) - parseFloat(num2);
            currentNumber().value = result;
            break;
        case 3:
            result = parseFloat((num1 * num2).toFixed(12));  //三为乘法
            currentNumber().value = result;
            break;
        case 4:
            if (num2 == 0) {  //除法计算时除数不能为零
                alert("除数不能为零！！！！");
            }
            result = parseFloat((num1 / num2).toFixed(12));  //防止浮点精度溢出
            currentNumber().value = result;
            break;
        default :
            break;
    }
//        计算完毕后复位
    num1 = result;
    result = 0;
}

//按下计算符后进行判断
function caculateMethod(method) {
    method = method.innerHTML;   //拿到计算符
    currentNumber().value = '0';  //对输入框清零

    //没有按下等于键时相当于连续计算
    if (!equalPressed) {
        if (oper != 0) {
            getResult(method);
        }
    }
    //计算完毕后对num2清零
    num2 = '';

//        判断运算符号
    switch (method) {
        case '+':
            oper = 1;
            break;
        case '-':
            oper = 2;
            break;
        case 'X':
            oper = 3;
            break;
        case '除':
            oper = 4;
            break;
        default :
            oper = '';
            break;

    }
    equalPressed = false;

}

/*复位*/
function Clean() {
    currentNumber().value = '0';
    num1 = '';
    num2 = '';
    result = 0;
    oper = "";
    equalPressed = false;
    caculated = false;
}

//当按下退格键
function backSpace() {
    if (currentNumber().value.length > 1) {
        currentNumber().value = currentNumber().value.substr(0, currentNumber().value.length - 1);
    } else {
        currentNumber().value = '0';
    }
}
//求平方根的函数
function onSqrt() {
    if((currentNumber().value-0)<0){
        alert('负数不能求平方根！');
        Clean();
        return 0;
    }
    num1 = Math.sqrt(num1 - 0);
    currentNumber().value = num1;
    equalPressed = true;
}

//求倒数
function onReciprocal() {
    if(currentNumber().value =='0'){
        alert('分母不能为零！');
        Clean();
        return 0;
    }
    num1 = parseFloat((1 / num1).toFixed(12));
    currentNumber().value = num1;
    equalPressed = true;
}
//求平方
function onSquare() {
    num1 *= parseFloat(num1.toFixed(12));
    currentNumber().value = num1;
    equalPressed = true;
}


//求三角函数
function onSin() {
    num1 = parseFloat((Math.sin(num1 * 2 * Math.PI / 360)).toFixed(12));
    currentNumber().value = num1;
    equalPressed = true;
}
function onCos() {
    num1 = parseFloat((Math.cos(num1 * 2 * Math.PI / 360)).toFixed(12));
    currentNumber().value = num1;
    equalPressed = true;
}