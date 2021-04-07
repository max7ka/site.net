// skrollr мобильная проверка
// https://askdev.ru/q/otklyuchit-skrollr-dlya-mobilnogo-ustroystva-333592/

export function cssa({def=null}){
    return def;
}

let colors = [ 
    {name:'color1', h:210, s:17, ldefault:35},// dark l=35
    {name:'color2', h:215, s:27, ldefault:47},// dark sky l=47
    {name:'color3', h:208, s:52, ldefault:83},// light sky l=83
    {name:'color4', h:240, s:100, ldefault:98},// moloko l=98
    {name:'color400', h:240, s:0, ldefault:98},// moloko l=98
    {name:'color5', h:4, s:99, ldefault:66},// red l=66
    {name:'color6', h:360, s:0, ldefault:100},// white
    {name:'color7', h:360, s:0, ldefault:0},// black
]
/*export function themes(){
    return {color100 : "123"};
}*/

// https://coderlessons.com/articles/veb-razrabotka-articles/kak-rasschitat-bolee-svetlye-ili-bolee-temnye-shestnadtsaterichnye-tsveta-v-javascript
/*export function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}*/

// https://html5book.ru/funkciya-hsl/
// https://www.w3schools.com/css/css_colors_hsl.asp
function hslcolor (colorname,light=0){
    let ret = "hsl(0,0%,0%)";
    colors.forEach(function(color){
        let l = color.ldefault+light;
        if (l<0) l=0;
        if (l>100) l=100;
        if (color.name==colorname){
            ret = `hsl(${color.h},${color.s}%,${l}%)`;
        }
        //console.log(`--- ${colorname} ${light} ${color.name}`);
    });
    //console.log(colors);
    //console.log(`${colorname} ${light}`);
    return ret;
}


export function w(text,page=0){
    var retHtml = "";
    var words = text.split(' ');
    var first = true;
    words.forEach( word => {
        retHtml =  retHtml + (!first?' ':'') + '<span class="word" page="'+page+'">' + word + '</span>';
        first = false;
    });
    return retHtml;
}

export function cs({w=null,l=null,h=null,bc=null,c=null,ts=null,o=null,br=null,t=null,
ml=null,mt=null,b=null,pl=null,pt=null}){

    //console.log(`cs1 bc=${bc} ${bc.indexOf("rgb")} ${bc.indexOf("hsl")}`);

    if ( bc!=null ){
        if ( bc.indexOf("rgb")==-1 && bc.indexOf("hsl")==-1 ){

            let light = 0;
            if (bc.indexOf("+")!=-1){
                let bcs = bc.split("+");
                bc = bcs[0];
                light = Number.parseInt(bcs[1]);
            }
            if (bc.indexOf("-")!=-1){
                let bcs = bc.split("-");
                bc = bcs[0];
                light = -Number.parseInt(bcs[1]);                
            }

            bc = hslcolor(bc,light);
            
        }
    }
    if ( c!=null ){
        if ( c.indexOf("rgb")==-1 && c.indexOf("hsl")==-1 ){

            let light = 0;
            if (c.indexOf("+")!=-1){
                let cs = c.split("+");
                c = cs[0];
                light = Number.parseInt(cs[1]);
            }
            if (c.indexOf("-")!=-1){
                let cs = c.split("-");
                c = cs[0];
                light = -Number.parseInt(cs[1]);                
            }

            c = hslcolor(c,light);
        }
    }    
    //console.log(`cs2 bc=${bc}`);

    //if (bc as string=="colordark100") bc = "rgba(0,0,254,1)";

    return (w!=null?("width:"+w+";"):"")
        +(l!=null?"left:"+l+";":"")
        +(t!=null?"top:"+t+";":"")
        +(b!=null?"bottom:"+b+";":"")
        +(h!=null?"height:"+h+";":"")
        +(bc!=null?"background-color:"+bc+";":"")
        +(c!=null?"color:"+c+";":"")
        +(ts!=null?"transform:scale("+ts+");":"")
        +(br!=null?"border-radius:"+br+";":"")
        +(o!=null?"opacity:"+o+";":"")
        +(ml!=null?"margin-left:"+ml+";":"")
        +(mt!=null?"margin-top:"+mt+";":"")
        +(pl!=null?"padding-left:"+pl+";":"")
        +(pt!=null?"padding-top:"+pt+";":"");
}

/*export function colora(color){
    switch (color) {
        case "dark100":
            
            break;
    
        default:
            break;
    }
}*/

/*export class MyClass {         
    static myProp = "Hello";

    static doSomething(): string {
      return "World";
    }
}*/

/*export class themes{
    coldark: string;
    constructor(){

    }
}

class Grid {
    static origin = { x: 0, y: 0 };
  
    calculateDistanceFromOrigin(point: { x: number; y: number }) {
      let xDist = point.x - Grid.origin.x;
      let yDist = point.y - Grid.origin.y;
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
  
    constructor(public scale: number) {}
  }
  
  let grid1 = new Grid(1.0); // 1x scale
  let grid2 = new Grid(5.0); // 5x scale
  
  console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
  console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));*/



/*export class theme {
    export function sum(x, y) {
        return x + y;
    }

    export var pi = 3.141593;

    // Не видна снаружи
    function internal() {
    }

    function css({ def=null, l = null, t = null, h = null, w = null, bg = null, }){
        return def;
    }
}*/

/*class cssAtrr {
    def_;
    constructor({ def=null, l = null, t = null, h = null, w = null, bg = null, }) {
        this.def_=def;
    }
    get (){
        return this.def_;
    }
}*/