/*
A stir fry text has the following form. It has gPassages (integer)
texts. This one has 5 passages. Each passage is chopped into gLength 
pieces. gLength is 29 in this stir fry. When the reader places the 
mouse over part n of text t, the program replaces that small text 
with part n of text t+1. 

Each of the gLength HTML elements with id's of j0 to j28, or jwhatever,
if gLength=whatever, holds HTML code. Not necessarily just text.
This means that a stir fry can also involve graphics or any
arbitrary HTML code, not just text. Marko Niemi made a stir fry,
for instance, that displays images, not texts. The stir fry is a
multi-media form. 

Let's look at how the gLength HTML elements j0 to j28 are coded. Below, 
we see an example.

<p id="j24" class="passage0" data-type="t" data-idnum="24">
  whatever<br><i data-type="c">See the data type?</i><br>That data type is important if the text is tagged.
</p>

This is a paragraph (p) element, but the elements can be span or
div or whatever. If an element starts out being a div, it will
remain a div; if it starts out being a p, it will remain a p, etc.

The id starts with j. And is followed by a number between 0 and gLength-1.

The style/class is initially passage0, a style coded in the stylesheet.
As the user stirs the text, the style and content cycle among the 
gPassages passages and styles.

The data-type of these elements must be "t". Note that in our example,
there is inner content like this:
<i data-type="c">Social Values and Poetic Acts</i>
Any tagged inner content must have data-type="c". This is important
for the touchscreen programming to work right.

*/

//****************************************************************
// GLOBALS
//****************************************************************

var gPassages=5;
// This stir fry has 5 passages, ie 5 main texts.
var gPassageStyles=["passage0","passage1","passage2","passage3","passage4"];
// An array of 5 style names, a style for each passage.
var gLength=31;
// Each passage in this stir fry is chopped into 31 pieces.
var gStateOfArt;
// An array of length gLength. Each passage is referred to by
// an index from 0 to gPassages-1. Each element of the gStateOfArt
// array is such an integer. In other words, element x of
// gStateOfArt tells us which passage is currently displayed by
// the HTML node with id='j'+x. All gLength elements are 
// initially 0.
var gTextArray;
// A 2-dimensional array that holds the texts. gTextArray[s][t]
// holds part t of passage s. 
var gCounter=2;
// When the user clicks the image at the bottom, the program
// displays an unstirred passage. This integer is an index
// between 0 and gPassages-1 that indicates which passage
// will be displayed when that button is clicked.

//****************************************************************
// INITIALIZATION
//****************************************************************

window.onload=initialize;  

function initialize() {
	// Runs after window has loaded. Initializes program.
	document.body.addEventListener('touchmove',function(e){
      e.preventDefault();
      // This prevents the body scrolling on the iPad as you
      // 'drag' touch.
  });
	gStateOfArt=[];
	for (var i=0; i<gLength; i++) {
	  gStateOfArt[i]=0;
	}
	// Initializes gStateOfArt to have gLength entries of 0.
	gTextArray = new Array(gPassages);
	for (var i=0; i < gPassages; i++) 
	{   
	  gTextArray[i] = new Array(gLength);  
	}
	// Initializes gTextArray to be a 2-dimensional array.
	gTextArray[0][0] = "Ik ga op vakantie om "
	gTextArray[0][1] = "mijn zintuigen "
	gTextArray[0][2] = "weer te gebruiken. Het idee dat ik op onbekende grond verkeer "
	gTextArray[0][3] = "verhoogt mijn hartslag. "
	gTextArray[0][4] = "In de verte razen vrachtwagens "
	gTextArray[0][5] = "voorbij. Als ik mij focus "
	gTextArray[0][6] = "op het geluid, "
	gTextArray[0][7] = "kan ik het niet meer onthoren en "
	gTextArray[0][8] = "hoor ik ook "
	gTextArray[0][9] = "alle geluiden om mij heen, "
	gTextArray[0][10] = "de afwezigheid van "
	gTextArray[0][11] = "stilte. Hoe zou volledige stilte klinken? Ik zie "
	gTextArray[0][12] = "een naaldbos. De wind "
	gTextArray[0][13] = "ontbreekt. Ik word rustig als "
	gTextArray[0][14] = "het dondert. Als een boom diep in het bos omvalt "
	gTextArray[0][15] = "en er is niemand "
	gTextArray[0][16] = "om hem te horen vallen, "
	gTextArray[0][17] = "is hij dan gevallen? Regen klettert neer op het dak "
	gTextArray[0][18] = "in de badkamer, de lekkende kraan, "
	gTextArray[0][19] = "geluid uit het verleden dat ik op het nu kleef. "
	gTextArray[0][20] = "Ik laat niet los, "
	gTextArray[0][21] = "stapel hoekige beelden op elkaar en druk aan "
	gTextArray[0][22] = "tot ze in elkaar passen. Iemand "
	gTextArray[0][23] = "speelt piano. Al is mijn kennis van "
	gTextArray[0][24] = "klassieke muziek "
	gTextArray[0][25] = "gebrekkig, ik vind het mooi, "
	gTextArray[0][26] = "mooier dan "
	gTextArray[0][27] = "als ik het zou herkennen, "
	gTextArray[0][28] = "dan zou ik niet meer echt luisteren. "
	gTextArray[0][29] = "Het dondert "
	gTextArray[0][30] = "nog steeds. "

	                        
	gTextArray[1][0] = "Ik leerde onlangs dat"
	gTextArray[1][1] = "het gebroken hart syndroom "
	gTextArray[1][2] = "bestaat, het hart daadwerkelijk "
	gTextArray[1][3] = "van vorm verandert als je aan liefdesverdriet lijdt. "
	gTextArray[1][4] = "In het Frans heet liefdesverdriet "
	gTextArray[1][5] = "le mal du coeur. Ik zou je kunnen vertellen over "
	gTextArray[1][6] = "de schommel in de tuin, "
	gTextArray[1][7] = "de plastieken go-kart waarmee we de berg af raceten, mijmeren op het dak "
	gTextArray[1][8] = "met muziek in mijn oren, het diepe rood van de avondlucht, "
	gTextArray[1][9] = "dat ik vroeg leerde "
	gTextArray[1][10] = "dat seks dingen kapot maakt "
	gTextArray[1][11] = "en dat ik me altijd geschaamd heb, over "
	gTextArray[1][12] = "tegelijkertijd te jong en te oud zijn. Leerde ik maar "
	gTextArray[1][13] = "de deur op een kier te zetten "
	gTextArray[1][14] = "in plaats van steeds "
	gTextArray[1][15] = "wijd open als "
	gTextArray[1][16] = "een zwart gat dat de hele wereld opslokt. Ik wil alles "
	gTextArray[1][17] = "in brand steken. Over mijn handpalmen lopen "
	gTextArray[1][18] = "nieuwe lijnen, "
	gTextArray[1][19] = "mijn hartlijn is krommer geworden, "
	gTextArray[1][20] = "mijn levenslijn korter. Op de rug van "
	gTextArray[1][21] = "mijn hand "
	gTextArray[1][22] = "staan kleine pigmentvlekken "
	gTextArray[1][23] = "daar gebrand door een zon "
	gTextArray[1][24] = "feller dan "
	gTextArray[1][25] = "de zon die "
	gTextArray[1][26] = "thuis in de hemel klimt. Ik wil iemand "
	gTextArray[1][27] = "die ik niet ken "
	gTextArray[1][28] = "bij de hand nemen "
	gTextArray[1][29] = "en samen "
	gTextArray[1][30] = "een huis in wandelen. "


	gTextArray[2][0] = "Eens alles ingepakt was, zat er niets anders op dan vertrekken, "
	gTextArray[2][1] = "de deur achter mij "
	gTextArray[2][2] = "dicht trekken, het slot omdraaien, de sleutel "
	gTextArray[2][3] = "veilig in mijn zak opbergen. "
	gTextArray[2][4] = "Hoe zal mijn stem klinken "
	gTextArray[2][5] = "als ik mijn mond opendoe, "
	gTextArray[2][6] = "hoe eenzaam "
	gTextArray[2][7] = "zal ik mij voelen, "
	gTextArray[2][8] = "zal dat gevoel "
	gTextArray[2][9] = "zich uitspreiden over mijn borstkas en "
	gTextArray[2][10] = "als wildgroei "
	gTextArray[2][11] = "gaan woekeren? "
	gTextArray[2][12] = "Als ik dit precies aanpak, "
	gTextArray[2][13] = "zal de onrust klein blijven, "
	gTextArray[2][14] = "zoals een balletje, een poppetje in een doosje. Ik weet niets "
	gTextArray[2][15] = "over het verhaal dat "
	gTextArray[2][16] = "ik wil vertellen, " 
	gTextArray[2][17] = "over een permanente zonsopgang "
	gTextArray[2][18] = "misschien. Ik kan gelukkig worden "
	gTextArray[2][19] = "vandaag, "
	gTextArray[2][20] = "een nieuw perspectief van "
	gTextArray[2][21] = "de straat rapen. Ik geloof niet in "
	gTextArray[2][22] = "mijn eigen woorden. Geloof "
	gTextArray[2][23] = "is niet noodzakelijk. Niet "
	gTextArray[2][24] = "altijd. Ik probeer me te herinneren "
	gTextArray[2][25] = "wanneer ik "
	gTextArray[2][26] = "voor het laatst gedanst heb. Zij "
	gTextArray[2][27] = "die mensen "
	gTextArray[2][28] = "aan durven te raken "
	gTextArray[2][29] = "veranderen "
	gTextArray[2][30] = "de wereld. "

	                          

	gTextArray[3][0] = "Ik wil op een man lijken die "
	gTextArray[3][1] = "iedere ochtend "
	gTextArray[3][2] = "de krant leest en hetzelfde ontbijt eet zonder "
	gTextArray[3][3] = "zichzelf van kant te willen maken. "
	gTextArray[3][4] = "Mijn huid kleeft aande bodem van "
	gTextArray[3][5] = "het moeras dat mijn leven is. Zo voelt het "
	gTextArray[3][6] = "soms. Soms voelt het alsof "
	gTextArray[3][7] = "ik vlieg. Al vlieg ik nog zelden "
	gTextArray[3][8] = "op eigen krachten, meestal komt er muziek bij kijken, "
	gTextArray[3][9] = "literatuur, koffie, sigaretten, alcohol, andere verdovende middelen. In vervaagde tijd "
	gTextArray[3][10] = "is het leven zelf mijn hallucinogeen: ik sta op, inhaleer "
	gTextArray[3][11] = "alle deeltjes van de wereld, "
	gTextArray[3][12] = "sta te trillen op mijn benen, overweldigd, "
	gTextArray[3][13] = "gelovig, vol. "
	gTextArray[3][14] = "Ik ben een kraantje dat ik open kan zetten, "
	gTextArray[3][15] = "maar niet meer "
	gTextArray[3][16] = "dicht kan draaien. "
	gTextArray[3][17] = "Als ik te lang nadenk over "
	gTextArray[3][18] = "wie ik geworden ben, "
	gTextArray[3][19] = "loop ik in een keer "
	gTextArray[3][20] = "leeg. Ik droom van "
	gTextArray[3][21] = "water dat uit een rivier op rotsen stroomt. Ik droom "
	gTextArray[3][22] = "dat ik die rotsen ben. Mijn lichaam "
	gTextArray[3][23] = "poreus en doordringbaar. Zoals wanneer ik woorden wil geven aan iets moois: "
	gTextArray[3][24] = "de zon door het raam "
	gTextArray[3][25] = "schuin op de muur, de spullen "
	gTextArray[3][26] = "netjes opgeborgen in de kast "
	gTextArray[3][27] = "om mijzelf het gevoel te geven "
	gTextArray[3][28] = "dat ik"
	gTextArray[3][29] = "hier"
	gTextArray[3][30] = "zal blijven. "


	                          
	gTextArray[4][0] = "Naakt sta ik voor de spiegel, zie waar "
	gTextArray[4][1] = "mijn buik "
	gTextArray[4][2] = "bolt bij iedere ademhaling, "
	gTextArray[4][3] = "hoe mijn schouders een beetje naar voren hellen. "
	gTextArray[4][4] = "De grote moedervlek als kind "
	gTextArray[4][5] = "lager op mijn heup. De ogen "
	gTextArray[4][6] = "turend, als "
	gTextArray[4][7] = "die van een onbekende. Wanneer ik lang genoeg kijk, "
	gTextArray[4][8] = "ben ik het spiegelbeeld "
	gTextArray[4][9] = "niet meer. Ik teken het landschap na, "
	gTextArray[4][10] = "de krommende bergen, "
	gTextArray[4][11] = "verre bomen, "
	gTextArray[4][12] = "de lucht die erboven hangt. Ergens "
	gTextArray[4][13] = "in mijn kijken "
	gTextArray[4][14] = "zit de tekening vervat. De hand die als antwoord op het kijken "
	gTextArray[4][15] = "een lijn trok, hem liet golven en "
	gTextArray[4][16] = "neerkomen onderaan de pagina. "
	gTextArray[4][17] = "Ik wou er graag "
	gTextArray[4][18] = "een punt achter zetten, maar "
	gTextArray[4][19] = "de tekening was "
	gTextArray[4][20] = "nooit af en was al niet "
	gTextArray[4][21] = "wat ik wilde dat hij werd "
	gTextArray[4][22] = "bij de eerste impuls "
	gTextArray[4][23] = "om iets op papier te zetten. Ik heb mezelf "
	gTextArray[4][24] = "weggerukt "
	gTextArray[4][25] = "om een reden die nu onbegrijpelijk lijkt: "
	gTextArray[4][26] = "om weg te zijn. De afstand katapulteert mij "
	gTextArray[4][27] = "alleen maar naar huis. Ik zie "
	gTextArray[4][28] = "ieder nietszeggend detail voor me als was het "
	gTextArray[4][29] = "de samenvatting van "
	gTextArray[4][30] = "mijn leven. "

	setBindings();
	resizeBrowser();
}; // end of initialize

function setBindings() {
  // Called once. Toward the end of initialize.
  window.addEventListener("resize", resizeBrowser, false);
  if (isEventSupported("touchmove")) {
    //set up touch handling
    var maintextobj=document.getElementById("maintext");
    document.body.addEventListener("touchstart", touchInProgress, false);
    document.body.addEventListener("touchmove", touchInProgress, false);
  }
  else {
    // Mouse handling
    for (var i=0; i<gLength; i++) {
      document.getElementById('j' + i).addEventListener("mouseover", cutupMouse, false);
    }
  }
} // end of setBindings

//****************************************************************
// FUNCTIONS
//****************************************************************

function resizeBrowser() {
	// Called at the beginning of the program and when the user resizes the browser.
	var bh=browserHeight();
	var mainTextHeight=bh - elementHeight(document.getElementById('title'));
	var textHeight=elementHeight('maintext');
	if (mainTextHeight>=textHeight) {
		document.getElementById('maintext').style.top=Math.round(0.5*(mainTextHeight-textHeight)/2) + 'px';
	}
	else {
			document.getElementById('maintext').style.top='0px';
	}
}

function cutupMouse() {
	// This gets called each time the mouseover event occurs over
	// one of the html elements with id such as j0 or j5 etc.
  var x=this.getAttribute("data-idnum");
  var xint=parseInt(x);
  gStateOfArt[xint]=(gStateOfArt[xint]+1) % gPassages;
  // When the reader places the mouse over part n of text t, the 
  //program replaces that small text with part n of text t+1. 
  cutup(this, gStateOfArt[xint], xint);
}

function cutup(Textian, jstate, jposition) {
	// Gets called each time the program stirs the text.
	// Textian is the html object. jstate is the number
	// of the passage. jposition is the number of the part.
  Textian.innerHTML=gTextArray[jstate][jposition];
  Textian.className=gPassageStyles[jstate];
}

function touchInProgress(e) {
	// Gets called each time the user stirs the text on a touchscreen.
	var touch = e.touches[0];
	var x = touch.pageX;
	var y = touch.pageY;
	var el= document.elementFromPoint(x,y); 
	//el is the topmost element the user is touching.
	if (el) {
    var dataType=el.getAttribute('data-type');
    // Each of the gLength HTML elements with id of j0 or j24
    // (or whatever) have data-type="t". Tagged inner content
    // of those elements must have data-type="c".
    if (dataType) {
    	// Then el is either one of our j0 to j24 elements or
    	// an element inside those.
    	while (dataType != 't') {
    		// This loop ensures that el ends up being one of our
    		// targeted j0 to j24 elements.
    		el=el.parentNode;
    		dataType=el.getAttribute('data-type');
    	}
    	var idnumasstring=el.getAttribute("data-idnum");
	    if (idnumasstring) {
	      var idnum=parseInt(idnumasstring);
	      gStateOfArt[idnum]=(gStateOfArt[idnum]+1)%gPassages;
	      cutup(el, gStateOfArt[idnum], idnum);
	    }

    }
	}
} // end of touchInProgress

function order() {
	// Called when the user clicks the button that
	// cycles through the texts.
	gCounter=(gCounter+1) % gPassages;
	for (var i=0; i<gLength; i++) {
		var el=document.getElementById("j"+i)
		el.innerHTML = gTextArray[gCounter][i];
		el.className=gPassageStyles[gCounter];
	}
	resizeBrowser();
}

/*
	var maintext=document.getElementById('maintext');
  for (var i=0; i<gLength; i++) {
	  var n=document.createElement('span');
	  n.setAttribute('id', 'j'+i);
	  n.setAttribute('class', gPassageStyles[gCounter]);
	  n.setAttribute('data-type', 't');
	  n.setAttribute('data-idnum', i.toString());
	  n.innerHTML=gTextArray[gCounter][i];
	  gObjArray[i]=n;
	  maintext.appendChild(n);
	}
	*/
