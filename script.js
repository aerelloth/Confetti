/******************************************************************************/
/********************************* VARIABLES **********************************/
/******************************************************************************/

var SCORE = 0;
var MAXSCORE = 0;
var $CADRE, $BUTTON, $CIBLE1, $CIBLE2, $CIBLE3, $CIBLE4, $CIBLE5, $CIBLE6, $CIBLES, $CLONES, FRAMEWIDTH, TARGETWIDTH, MAXWIDTH, FRAMEHEIGHT, TARGETHEIGHT, MAXHEIGHT;


/******************************************************************************/
/********************************* FONCTIONS **********************************/
/******************************************************************************/

//obtenir un entier compris entre min et max inclus
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

//initialiser la partie
function init() {
	moveAll();	//déplacement aléatoire de toutes les cibles originales
	$CIBLES.css('display','block');	//affichage de toutes les cibles
}

//au clic sur la cible verte
function move() {
	//déplacement aléatoire
	var $left = getRandomIntInclusive(0, MAXWIDTH);
	var $top = getRandomIntInclusive(0, MAXHEIGHT);
	$(this).css({left:$left,top:$top});
	//augmentation du score et affichage
	SCORE++;	
	$('#score').html('Score = '+SCORE+'<br>Meilleur score : '+MAXSCORE);
	//ajout de nouvelles cibles leurres
	duplicate();
}

//déplacement aléatoire de toutes les cibles originales
function moveAll() {
	for (i=0; i<$CIBLES.length; i++)
	{
		var $left = getRandomIntInclusive(0, MAXWIDTH);
		var $top = getRandomIntInclusive(0, MAXHEIGHT);
		$($CIBLES[i]).css({left:$left,top:$top});
	}
}

//déplacement aléatoire des 20 premières cibles leurres
function moveClones() {
	for (i=0; i<20; i++)
	{
		var $left = getRandomIntInclusive(0, MAXWIDTH);
		var $top = getRandomIntInclusive(0, MAXHEIGHT);
		$($CLONES[i]).css({left:$left,top:$top});
	}
}

//obtention du résultat
function result() 
{
	//suppression des timers
	clearInterval(moveTimer);
	clearInterval(moveClonesTimer);
	clearInterval(newTimer);
	//définition du meilleur score
	if (SCORE>MAXSCORE) 
		{
			MAXSCORE=SCORE
		};
	//affichage du score
	$('#score').html('Score = '+SCORE+'<br>Meilleur score : '+MAXSCORE);
	alert('Votre score est de : '+SCORE);
	//masquage des cibles
	$CIBLES.css('display','none');
	//remise à zéro du score
	SCORE = 0;	
	//suppression des cibles leurres ajoutées
	for (i=0; i<$CLONES.length; i++)
	{
		$CLONES[i].remove();
	}
	$CLONES=[];
	//affichage du score remis à zéro et du bouton "go"
	$('#score').html('Score = '+SCORE+'<br>Meilleur score : '+MAXSCORE);
	$BUTTON.css('display','inline-block');
}

//ajout de nouvelles cibles leurres
function duplicate()
{
	//création des cibles leurres par copie
	var clone2 = $CIBLE2.clone(true).insertBefore($CIBLE2.next()); 
	var clone3 = $CIBLE3.clone(true).insertBefore($CIBLE3.next()); 
	var clone4 = $CIBLE4.clone(true).insertBefore($CIBLE4.next()); 
	var clone5 = $CIBLE5.clone(true).insertBefore($CIBLE5.next()); 
	var clone6 = $CIBLE6.clone(true).insertBefore($CIBLE6.prev()); 
	//ajout des cibles au tableau $CLONES (à supprimer à la fin de la partie)
	$CLONES.push(clone2, clone3, clone4, clone5, clone6);
}

//ajout d'une nouvelle cible verte
function addNew()
{
	//copie de la cible verte
	var clone1 = $CIBLE1.clone(true).insertBefore($CIBLE1.next());
	//ajout de la cible au tableau $CLONES (à supprimer à la fin de la partie)
	$CLONES.push(clone1);
}

function startTimer()
{	
	moveTimer = setInterval(moveAll, 1000); //déplacement de la cible verte toutes les 1s
	moveClonesTimer = setInterval(moveClones, 1000); //déplacement des 20 premières cibles leurres toutes les 1s
	newTimer = setInterval(addNew, 2000); //ajout d'une nouvelle cible toutes les 2s
	scoreTimer = setTimeout(result, 30000); //affichage du score au bout de 30s
}


/******************************************************************************/
/******************************* CODE PRINCIPAL *******************************/
/******************************************************************************/

//lorsque le DOM est chargé
$(function()
{
	//récupération des éléments HTML
	$CADRE = $('#cadre');
	$BUTTON = $('button');
	$CIBLE1 = $('#cible1');
	$CIBLE2 = $('#cible2');
	$CIBLE3 = $('#cible3');
	$CIBLE4 = $('#cible4');
	$CIBLE5 = $('#cible5');
	$CIBLE6 = $('#cible6');
	$CIBLES = $('#cadre div');
	$CLONES = [];

	//déplacement de la cible verte au clic
	$CIBLE1.on('click', move);

	//récupération de la largeur du cadre et définition de l'amplitude de mouvement horizontale pour les cibles
	FRAMEWIDTH = parseInt($CADRE.css('width'));
	TARGETWIDTH = parseInt($CIBLE1.css('width'));
	MAXWIDTH = parseInt(FRAMEWIDTH - TARGETWIDTH);

	//récupération de la hauteur du cadre et définition de l'amplitude de mouvement verticale pour les cibles
	FRAMEHEIGHT = parseInt($CADRE.css('height'));
	TARGETHEIGHT = parseInt($CIBLE1.css('height'));	
	MAXHEIGHT = parseInt(FRAMEHEIGHT - TARGETHEIGHT);

	//lancement de la partie au clic sur le bouton
	$BUTTON.on('click', function() {
		init();
		startTimer();
		$BUTTON.css('display','none'); //masquage du bouton
	});
});