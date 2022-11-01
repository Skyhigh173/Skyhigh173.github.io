function rad(e,o){
    if (e != Math.floor(e)) return rad(Math.floor(e),o);
    if (o != Math.floor(o)) return rad(e,Math.floor(o));
    let rd = 0;
    while(rd == 0){ rd = Math.floor(Math.random()*(o-e+1)+e); }
    return rd;
}
function radList(a,e,o){let r=[];for(let i=0;i<a;i++){r.push(rad(e,o))}return r}
var savelist = ''
function genQ(negP,posP){
    let n = radList(5,negP,posP);
    let t=n[0],a=n[1],b=n[2],c=n[3],d=n[4];
    let z0=a*c*t,z1=t*(a*d+b*c),z2=b*d*t;
    if(z0 == 1) z0 = '';if(z1 == 1) z1 = '';
    let o = `$$${z0}x^2`;
    o += ((t*(a*d+b*c) >= 0) ? '+': '');
    o += `${z1}x`
    o += ((t*b*d >= 0) ? '+': '');
    o += `${z2}$$`
    addTextDisplay(o)
    savelist += `${o.slice(2,-2)} `
}



function addTextDisplay(texts){
    var i = document.createElement("p");
    i.setAttribute("id", "");
    i.innerHTML = texts;
    document.getElementById("gen").appendChild(i);
    MathJax.typeset(); 
}

var diff = 6
function change(){
    let z = prompt("enter new random gen val: ", "6");
    if (Number(z) == NaN || z < 1) return;
    diff = z
}

function multi(t){
    for (let k = 0; k < t; k++){
        genQ(-diff,diff);
    }
}

function save(){
    var saveData = (function () {
        var a = document.createElement("a");
        return function (data, fileName) {
            var json = JSON.stringify(data),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
        }());
    var data = savelist,fileName = "quad-eq-question.txt";
    saveData(data, fileName);
}

multi(15)
window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 20) {
        multi(1)
    }
};