export const deviceType = [
    {
        type: 1,
        value: '有限FM终端'
    },
    {
        type: 2,
        value: '无线接收终端'
    },
    {
        type: 3,
        value: '村级接收器'
    }
]

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })()
  
  /**
   * @description 解绑事件 off(element, event, handler)
   */
  export const off = (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()


  //格式化地区
  export const formatRegion = (tree) => {
    let result = tree.map(item => {
      return {
        value: item.orgCodea,
        label: item.name,
        gbCode: item.gbCode,
        children: formatRegion(item.children) || []
      }
    })
    return result;
  }


  //绕原型轨迹运动 使用move2
  export class Move {
    constructor(x, y, a, b) {
      this.uid="move_"+Math.random();
      this.uid = this.uid.replace(".","");
      //eval(this.uid+"=this;");
      this._x=x;
      this._y=y;
      this._a=a;
      this._b=b;
      this.items=[];
      this.dxrad=0.05;
      this.radian = 0;

      this.time = 5000;
      this.timer = null;
      this.n;
      this.loop;
    }
    setPostion(obj,rad){
      obj.style.left=this._a*Math.cos(rad)+this._x+"px";
      obj.style.top=this._b*Math.sin(rad)+this._y+"px";
      if(Math.sin(rad)>0) obj.style.zIndex=3;
      else obj.style.zIndex=2;
    }
    setAlpha(obj,rad){   
      var p =(Math.sin(rad) < 0) ? 2*this._a-Math.abs(this._a*Math.cos(rad)) :this._a*Math.abs(Math.cos(rad));
      p =100-40*p/this._a+20;
      obj.style.filter='alpha(opacity='+p+')';
      obj.style.opacity=p/100;
      obj.style.transform = `scale(${p/100})`;
    }
    play(n, dxrad){
      for(let i=0;i<this.items.length;i++){
        this.items[i].radian = this.items[i].radian + dxrad;
        //if(this.items[i].radian>=2*Math.PI) this.items[i].radian = 0;
        this.setPostion(this.items[i],this.items[i].radian);
        this.setAlpha(this.items[i],this.items[i].radian);
      }
      // this.dxrad=this.dxrad+0.03;
      // if(this.dxrad>=Math.PI) this.dxrad=this.dxrad-Math.PI;
      // window.setTimeout(this.uid+".play("+n+")",120);
    }
    clearTimer() {
      window.clearTimeout(this.timer);
    }
    setInt() {
      this.timer = setInterval(()=>{
        this.play(this.n, Math.PI/6);
      }, this.time);
    }
    init(n, parent){
      this.n = n;

      for(let i=1;i<=n;i++)
      {
          let img = new Image();
          img.src = require("@/assets/img/divbg.png");
          img.className="object";
          let title = new Image();
          title.src = require("@/assets/img/title.png");
          title.className = "title"
          img.radian = 2*Math.PI*i/n;
          this.items[i-1]=img;
          this.setPostion(img,2*Math.PI*i/n);
          this.setAlpha(img,2*Math.PI*i/n);
          parent.appendChild(img);
          let _this = this;
          img.onclick=function() {
            if(this.offsetLeft - _this._x >= 0) {
              _this.play(n, 2*Math.PI/n)
            }else {
              _this.play(n, -2*Math.PI/n)
            }
          };
      }
      // this.timer = setInterval(()=>{
      //   this.play(n, Math.PI/6);
      // }, 10000);
      //this.play(n);
    }
  }


  //绕原型轨迹运动2
  export class Move2 {
    constructor(x, y, a, b) {
      this.uid="move_"+Math.random();
      this.uid = this.uid.replace(".","");
      this._x=x;
      this._y=y;
      this._a=a;
      this._b=b;
      this.items=[];
      //this.dxrad= 0.05;
      this.radian = 0;
      this.data = [];
      this.selectData = [];

      this.time = 5000;
      this.timer = null;
      this.n;
      this.loop;
    }
    setPostion(obj,rad){
      obj.style.left=this._a*Math.cos(rad)+this._x+"px";
      obj.style.top=this._b*Math.sin(rad)+this._y+"px";
      if(Math.sin(rad)>0) obj.style.zIndex=3;
      else obj.style.zIndex=2;
    }
    setAlpha(obj,rad){
      var p =(Math.sin(rad) < 0) ? 2*this._a-Math.abs(this._a*Math.cos(rad)) :this._a*Math.abs(Math.cos(rad));
      p =100-40*p/this._a+20;
      obj.style.filter='alpha(opacity='+p+')';
      obj.style.opacity=p/100;
      obj.style.transform = `scale(${p/100})`;
    }
    play(n, dxrad){
      for(let i=0;i<this.items.length;i++){
        this.items[i].radian = this.items[i].radian + dxrad;
        if(this.items[i].radian >= 2*Math.PI) {
          this.items[i].radian = this.items[i].radian - 2*Math.PI;
        }
        if(this.items[i].radian.toFixed(2) == (Math.PI/2).toFixed(2)) {
          this.selectData = {...this.data[i]};
        }
        this.setPostion(this.items[i],this.items[i].radian);
        this.setAlpha(this.items[i],this.items[i].radian);
      }
    }
    clearTimer() {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    setInt() {
      window.clearTimeout(this.timer);
      this.timer = setInterval(()=>{
        this.play(this.n, 2*Math.PI/this.n);
      }, this.time);
    }
    next() {
      this.play(this.n, 2*Math.PI/this.n);
    }
    prev() {
      this.play(this.n, -2*Math.PI/this.n);
    }
    init(data, parent){
      this.n = data.length;
      this.data = data;
      this.selectData = this.data[0];
      for(let i=1;i<=data.length;i++)
      {
          let oDiv = document.createElement("div");
          oDiv.className = "parent";
          let img = new Image();
          img.src = require("@/assets/img/divbg.png");
          img.className="object";
          oDiv.appendChild(img);

          let title = new Image();
          title.src = require("@/assets/img/title.png");
          title.className = "title";
          oDiv.appendChild(title);
          
          let span = document.createElement('span');
          span.innerHTML = data[i-1].name;
          span.className = "title-content";
          oDiv.appendChild(span);

          oDiv.radian = 2*Math.PI*(i-1)/this.n + Math.PI/2;
          this.items[i-1]=oDiv;
          parent.appendChild(oDiv);

          this.setPostion(oDiv,oDiv.radian);
          this.setAlpha(oDiv,oDiv.radian);
          let _this = this;
          oDiv.onclick=function() {
            _this.play(_this.n, Math.PI/2 - this.radian);
            if(_this.timer) {
              _this.clearTimer(this.timer);
              _this.timer = null;
              _this.setInt();
            }
          };
      }
    }
  }


  //格式化geoJSON
  export const setGeoJSON = (data) => {
    let geoJSON = {
      features: []
    }
    data.forEach(item => {
      let arr = item.boundary.split(" ").map(item => item.split(","))
      let jsonChild = {
        type: 'Feature',
        properties: {
          name: item.name,
        },
        geometry:{
          type: 'MultiPolygon',
          coordinates: [
            [
              arr
            ]
          ]
        }
      }
      geoJSON.features.push(jsonChild);
    })
    return geoJSON;
  }