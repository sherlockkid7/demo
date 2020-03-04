// 该js分为三部分

var oPrev = document.getElementsByClassName('lt')[0],
    oNext = document.getElementsByClassName('gt')[0],
    oMod = document.getElementsByClassName('mod')[0],
    oBanner = document.getElementsByClassName('banner')[0];

var oList = document.getElementsByClassName('modlist')[0],
    oLi = oList.getElementsByTagName('li'), 
    oLiLength = oLi.length,
    index = 0;

var timer,timer2,
    flag = true;//可以轮播


// 移动图片函数  (每小次移动是为了实现滑动效果)
function moveImg(dis) {
    flag = false; //运动状态，停止轮播
    var time = 400; //每次轮播需要的时间
    var eachTime = 20;   //每小次移动的时间
    var eachDis = dis / (time / eachTime);//每小次移动的距离 [输入的距离 除以 移动的次数]
    var newLeft = oMod.offsetLeft + dis ;//目标点位置
    function eachMove() {
        if (dis > 0 && oMod.offsetLeft < newLeft || dis < 0 && oMod.offsetLeft > newLeft) {
            oMod.style.left = oMod.offsetLeft + eachDis + 'px';//图片移动距离等于当前图片距离加上每小次移动距离
        } else {
            clearInterval(timer);
            oMod.style.left = newLeft + 'px'; //强制移动到目标点位置 

            // 实现无缝连接
            if (newLeft == -3120) {
                oMod.style.left = -520 + 'px';
            }
            if (newLeft == 0) {
                oMod.style.left = -2600 + 'px';
            }
            flag = true;
        }
    } //每小次移动函数
    timer = setInterval(eachMove, eachTime);
}
// 向上翻页函数
oPrev.onclick = function () {
    if(flag == false) return; 判断是否执行以下函数
    moveImg(520);
    // 圆点对应向上翻
    if(index == 0){
        index = 4;
     }else{
        index --;
     }
     oListyle();
    
}
// 向下翻页函数
oNext.onclick = function () {
    if(flag == false) return;
    moveImg(-520);
    // 圆点对应向下翻
    if(index == 4){
        index = 0;
    }else{
        index ++;
    }
    oListyle();
}

// 实现圆点的功能
// 改变圆点的样式
function oListyle() {
    oList.getElementsByClassName('active')[0].className = '';//找到类名为active的li,并清空属性
    oLi[index].className = 'active';
}
// 使用循环函数绑定每个小圆点
for (var i = 0; i < oLiLength; i++) {
    // oLi[i].onclick = function (){
    //    index = i;
    // }形成了闭包（绑定完所有圆点，才执行）

    // 立即执行函数
    (function (j) {
        oLi[j].onclick = function () {
            var offset= (j - index) * -520; //圆点对应图片的移动(向上、向下)
            moveImg(offset);
            index = j;
            oListyle(); 
        }
    })(i);
}

// 自动轮播
timer2 = setInterval(oNext.onclick,2000);//每隔两秒向下轮播


oBanner.onmouseover = function(){
    clearInterval(timer2);
}
oBanner.onmouseout = function(){
    timer2 = setInterval(oNext.onclick,2000);
}


// 轮播图

// 动画效果
// 封装动画函数
var timerId = null;
function animate (element,target){
    // element传入的当前元素 target 需要移动的距离
    // 通过判断，保证页面上只有一个定时器在执行动画,让动画匀速进行
    if(element.timerId){
        clearInterval(element.timerId);
        element.timerId = null;

    }
    var time = 400;
    var eachTime = 30;
    var eachDis = target / (time / eachTime);
    var newLeft = element.offsetLeft + target;
    // 每次移动函数
    function eachMove(){
        if(target > 0 && element.offsetLeft < newLeft || target < 0 && element.offsetLeft > newLeft){
            element.style.left = element.offsetLeft + eachDis + 'px';
        }else{
            clearInterval(timerId);
            element.style.left = newLeft + 'px';
        }

    }
    element.timerId = setInterval(eachMove,eachTime);
}

