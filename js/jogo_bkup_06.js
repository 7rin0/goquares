//####################// INICIO //####################
// Encoding: UTF-8
// declaração de variaveis
var conteudos,
	nivel_n;
	
/*document.oncontextmenu = function() {
    return false;
}*/

// recconhecer browser e sair ficheiros 
if(navigator.appName.search("Microsoft Internet Explorer") != -1){
	var fsb = ".mp3";
}
else{
	var fsb = ".ogg";
}
// Variaveis de som
	var som_salto = new Audio("/sons/salto"+fsb),
		som_caixa_azul = new Audio("/sons/caixa_azul"+fsb),
		som_caixa_laranja = new Audio("/sons/caixa_laranja"+fsb),
		som_caixa_vermelha = new Audio("/sons/caixa_vermelha"+fsb),
		som_caixa_dourada = new Audio("/sons/caixa_dourada"+fsb),
		som_tic_tac_bomba = new Audio("/sons/tic_tac_bomba"+fsb),
		som_tic_tac_verde = new Audio("/sons/tic_tac_verde"+fsb),
		som_bomba_rebenta = new Audio("/sons/bomba_rebenta"+fsb);

// funcao carregar conteudos
function loading_conteudos(){
	// Preload imagens
	var load_imagens = [],
		load_sons = [],
		loading_imagem,
		loading_som,
		a,
		b;

	// Array de Imagens
	load_imagens = ["personagem_inicio", "fundo","fundo_2","fundo_3","fundo_4","inactivo", "activo", "vermelho", "dourado","personagem_0_esq","personagem_0_dir"];

	// Loop de imagens
	for(a=0; a < load_imagens.length; a++){
		loading_imagem = new Image();
		loading_imagem.src = "/imagens/"+load_imagens[a]+".png";
	}
	
	
	// Array de Sons
	load_sons = ["salto", "fundo","caixa_azul", "caixa_dourada", "caixa_vermelha", "caixa_laranja"];

	// Loop de Sons
	for(b=0; b < load_sons.length; b++){
		loading_som = new Audio();
		loading_som.src = "/sons/"+load_sons[b]+fsb;
	}
}

// carregar conteudos
loading_conteudos();

// funções
function conteudos(nivel_n){
	"use strict";
	
	var body = document.getElementsByTagName("body")[0];

	// 1 - Adicionar Função On Rezise Centrar Jogo
	body.setAttribute("onresize", "centrar_janela_jogo()");
	body.style.cssText = "background:#000000;font-family:arial;";
	body.innerHTML = "";

	if(typeof(nivel_n) === "undefined" || nivel_n === 0 || nivel_n === 8){
		nivel_n = 7;
	}

	// 3 - Criar Janela de Jogo
	criacao_jogo(body,nivel_n);

	// Variaveis Principais
	var janela_jogo = document.getElementById("janela_jogo"),
		back_jogo = document.getElementById("background_jogo");

	// 3 - Centrar Janela de jogo
	centrar_janela_jogo();

	// 5.1 - Gerar blocos aventura
	nivel(nivel_n);

	// 7 - criar quadradinhos
	criar_q(nivel_n);
	
	var personagem = document.getElementById("personagem");

	// 9 Apresentação do Nivel
	espetaculo_nivel();
}
//#################### CRIAR JANELA DE JOGO ####################
function criacao_jogo(body,nivel_n) {
"use strict";

	// .adicionar janela de jogo
	var janela_global_largura = window.innerWidth,
		janela_global_altura = window.innerHeight,
		janela_jogo = document.createElement("div"),
		imagem_background;

		janela_jogo.setAttribute("id", "janela_jogo");
		janela_jogo.style.cssText = "background:#f0f0f0;color:#333333;width:650px;height:500px;position:absolute;display:block;overflow:hidden";
		body.appendChild(janela_jogo);
		
	switch(nivel_n){
	case 1:
		imagem_background = "url(\"/imagens/fundo_1.png\")";
	break;
	
	case 2:
		imagem_background = "url(\"/imagens/fundo_1.png\")";
	break;
	
	case 3:
		imagem_background = "url(\"/imagens/fundo_1.png\")";
	break;
	
	case 4:
		imagem_background = "url(\"/imagens/fundo_2.png\")";
	break;
	
	case 5:
		imagem_background = "url(\"/imagens/fundo_2.png\")";
	break;
	
	case 6:
		imagem_background = "url(\"/imagens/fundo_2.png\")";
	break;
	
	case 7:
		imagem_background = "url(\"/imagens/fundo_3.png\")";
	break;
	
	}

		// Variaveis
	var janela_jogo = document.getElementById("janela_jogo"),
		background_jogo = document.createElement("div"),
		dos_variaveis = document.createElement("button"),
		pontos = document.createElement("div"),
		quedas = document.createElement("div"),
		interrogacoes = document.createElement("div"),
		som = document.createElement("div"),
		nivel = document.createElement("div"),
		tempo = document.createElement("div"),
		
			segundos = 0,
			minutos = 0,
			restantes = 0;

		// .adicionar background jogo
		background_jogo.setAttribute("id", "background_jogo");
		background_jogo.style.cssText = "position:absolute;top:0px;left:0px;height:" + parseInt(janela_jogo.style.height) + "px;width:2000px;background:"+imagem_background+" left bottom;cursor:pointer;z-index:0;";
		janela_jogo.appendChild(background_jogo);
		
	//.adicionar DOS JOGO
		dos_variaveis.setAttribute("id", "dos_variaveis");
		dos_variaveis.setAttribute("onclick", "alert('personagem:'+document.getElementById(\"personagem\").getAttribute(\"class\")+'          janela_jogo:'+document.getElementById(\"janela_jogo\").getAttribute(\"class\"))");
		dos_variaveis.style.cssText = "position:absolute;top:10px;left:300px;z-index:2;";
		dos_variaveis.innerHTML = "DOS CLASSES";
		janela_jogo.appendChild(dos_variaveis);

	// .adicionar nivel
		nivel.setAttribute("id","nivel");
		nivel.style.cssText = "position:absolute;top:10px;left:10px;font-size:14px;color:#333333;line-height:20px;height:20px;font-weight:bold;font-family:arial";
		nivel.innerHTML = "LEVEL | 0";
		janela_jogo.appendChild(nivel);

	// .adicionar pontuação
		pontos.setAttribute("id","pontos");
		pontos.style.cssText = "position:absolute;top:70px;left:10px;font-size:14px;color:#333333;line-height:20px;height:20px;font-weight:bold;font-family:arial";
		pontos.innerHTML = "POINTS | 0";
		janela_jogo.appendChild(pontos);

		// .adicionar quedas
		quedas.setAttribute("id","quedas");
		quedas.style.cssText = "position:absolute;top:100px;left:10px;font-size:14px;color:#333333;line-height:20px;height:20px;font-weight:bold;font-family:arial";
		quedas.innerHTML = "FALLS | 0";
		janela_jogo.appendChild(quedas);
		
		// .adicionar interrogacoes
		interrogacoes.setAttribute("id","interrogacoes");
		interrogacoes.style.cssText = "position:absolute;top:130px;left:10px;font-size:14px;color:#333333;line-height:20px;height:20px;font-weight:bold;font-family:arial";
		interrogacoes.innerHTML = "QUESTION MARK | 0";
		janela_jogo.appendChild(interrogacoes);

	// .remover sons
		som.setAttribute("id","som");
		som.style.cssText = "position:absolute;top:10px;right:10px;font-size:14px;color:#333333;line-height:20px;height:20px;font-weight:bold;font-family:arial;";
		som.innerHTML = "<button onclick='removerSons()'> remover som </button>";
		janela_jogo.appendChild(som);

	// Tempo
		tempo.setAttribute("id","tempo");
		tempo.style.cssText = "position:absolute;top:40px;left:10px;font-size:14px;color:#333333;line-height:20px;height:20px;font-weight:bold;font-family:arial";
		tempo.innerHTML = "TIME | 00 : 00";
		janela_jogo.appendChild(tempo);

		// Temporizador, função que repetirá
		function temporizador(){
		"use strict";
			if(typeof(janela_jogo.getAttribute("class")) === "string" ){

					segundos++;

				minutos = parseInt(segundos/60);
				restantes = segundos-minutos*60;

				if(minutos<10){
					if(restantes<10){
						tempo.innerHTML = "TIME | 0"+minutos+" : 0"+restantes;
					}
					else if(restantes>9){
						tempo.innerHTML = "TIME | 0"+minutos+" : "+restantes;
					}
				}

				else if(minutos>9){
					if(restantes<10){
						tempo.innerHTML = "TIME | "+minutos+" : 0"+restantes;
					}
					else if(restantes>9){
						tempo.innerHTML = "TIME | "+minutos+" : "+restantes;
					}
				}
			}
		
			// Se janela jogo detectar classe parar o tempo para!
			if(typeof(janela_jogo.getAttribute("class")) === "string" && janela_jogo.getAttribute("class").search("inicio") === -1){
				clearInterval(temporizador_inicio);
			}
		}
		var temporizador_inicio = setInterval(temporizador,1000);
}

//#################### SEM SOM ####################
function removerSons(){
"use strict";
	document.getElementById("som").setAttribute("class","silencio");
}

//#################### CENTRAR JANELA DE JOGO ####################
function centrar_janela_jogo() {
"use strict";
	//ID janela jogo
	var janela_jogo = document.getElementById("janela_jogo"),

	// LARGURA ECRA e ALTURA
		janela_global_largura = window.innerWidth,
		janela_global_altura = window.innerHeight,

	//onload Centrar Div Janela de Jogo
		eixo_x = (janela_global_largura - parseInt(janela_jogo.style.width, 10)) / 2,
		eixo_y = (janela_global_altura - parseInt(janela_jogo.style.height, 10)) / 2;

	//Definir Margens em função do calculo
	janela_jogo.style.top = eixo_y + "px";
	janela_jogo.style.left = eixo_x + "px";
}

//#################### PERSONAGEM ####################
function criar_q(nivel_n) {
"use strict";
	// 1 - Detectar se existe cenario
	var background_jogo = document.getElementById("background_jogo"),
	//Contar e determinar ID de cada quadradinho

	// Variavel Janela de Jogo Principal
		janela_jogo = document.getElementById("janela_jogo"),
		
	// queda
		queda = "150px",

	// DIMENSOES DE ALEATORIAS A 35 PIXEIS #####
		dimencoes_aleatorias = 35,

	// Dimensoes Aleatorias quadradinho
		quadradinho_largura = dimencoes_aleatorias,
		quadradinho_altura = dimencoes_aleatorias;

	if(nivel_n === 5){
		queda = "100px";
	}
		
	//Criar sub quadrados
	var personagem = document.createElement("div");
	//Definir Atributos
	personagem.setAttribute("id", "personagem");
	personagem.style.cssText = "width:" + dimencoes_aleatorias + "px;height:" + dimencoes_aleatorias + "px;position:absolute;top:0px;left:"+queda+";text-align:center;line-height:" + dimencoes_aleatorias + "px;z-index:1;font-weight:bold;background:url(/imagens/personagem_inicio.png) #ff6600;z-index:10000000000000000" ;
	background_jogo.appendChild(personagem);
}

//############### GRAVIDADE ###############
function gravidade(personagem) {
"use strict";
	// Variavel que engloba o quadradinho
	var personagem = document.getElementById("personagem"),
		personagemClasses = personagem.getAttribute("class"),
		aumentador = 0,
		graus = 0,
		variavel = 3.12;

		espetaculo(1);

	// Função que os atirará para a terra
	function gravidade_accao() {
	"use strict";
		aumentador++;
		personagem.style.webkitTransform="rotate("+graus+"deg)";
		graus = variavel * aumentador;
		personagem.style.top = parseInt(personagem.style.top,10)+4+"px";
		if(parseInt(document.getElementById("janela_jogo").style.height)-parseInt(personagem.style.height)-30 <= parseInt(personagem.style.top)){
			clearInterval(correr_gravidade);
			personagem.setAttribute("class"," esq_p dir_p cima_p baixo_p");
			personagem.style.webkitTransform="";
			document.getElementById("janela_jogo").setAttribute("class", "inicio");

			// .mover personagem (função)
			mover_personagem(personagem);

		}
	}

	// Variavel que correrá a gravidade sobre o boneco
	var correr_gravidade = setInterval(gravidade_accao,20);
}


//####################MOVER QUADRADINHOS####################
function mover_personagem(personagem) {

	//# EVENTO TECLA SOLTA
	document.addEventListener('keyup',function teclaSolta(vars) {
	
		// se o dourado "disparou" remove os eventos
		if(document.getElementById("janela_jogo").getAttribute("class").search("inicio") === -1){
			document.removeEventListener('keyup',teclaSolta, false);
		}

		switch(vars.keyCode){
			case 37:
				// redefinir class
				personagem.setAttribute("class",personagem.getAttribute("class").replace("esq_i","esq_p"));
				
			break;

			case 38:

			break;

			case 39:
				// redefinir class
				personagem.setAttribute("class",personagem.getAttribute("class").replace("dir_i","dir_p"));
			break;
		}
	}, false);

	//# EVENTO TECLA PRESA
	document.addEventListener('keydown',function teclaPresa(event) {
		
		// se o dourado "disparou" remove os eventos
		if(document.getElementById("janela_jogo").getAttribute("class").search("inicio") === -1){
			document.removeEventListener('keydown',teclaPresa, false);
		}
		
		switch (event.keyCode) {
			// esquerda
			case 37:
				
				// se estiver parado, inicia esquerda
				if(personagem.getAttribute("class").search("esq_i") === -1){
					
					if(personagem.getAttribute("class").search("dir_i") != -1){
					// redefinir class
						personagem.setAttribute("class",personagem.getAttribute("class").replace("dir_i","dir_p"));
					}
					det_obj_pers( 37 , "nada" );
				}

			break;

			//# 1 - SALTO
			case 38:
			
				// se estiver no chão inicia salto
				if(personagem.getAttribute("class").search("cima_i") === -1){

						//. função do salto
						det_obj_pers( 38 , -23);

				}// FIM de SALTO

			break;


			// direita
				case 39:

				// se estiver parado, inicia direita
				if(personagem.getAttribute("class").search("dir_i") === -1){

					if(personagem.getAttribute("class").search("esq_i") != -1){
					// redefinir class
						personagem.setAttribute("class",personagem.getAttribute("class").replace("esq_i","esq_p"));
					}
					
					det_obj_pers( 39 , "nada");

				}

			break;
		}
	},false);
} // final da função



//############### SALTO ###############
function det_obj_pers(tecla,valor,objecto){

// Variaveis movimentos responsaveis
	var janela_jogo = document.getElementById("janela_jogo"),
		body = document.getElementsByTagName("body")[0],
		back_jogo = document.getElementById("background_jogo"),
		personagem = document.getElementById("personagem"),
		
		array_blocos = document.getElementsByClassName("bloco"),
		array_pedras = document.getElementsByClassName("pedra"),
		array_auxiliares = document.getElementsByClassName("auxiliar"),
		
		a,
		a_length = array_blocos.length,
		b,
		b_length,
		c,
		d,
		e,
		e_length = array_pedras.length,
		f,
		f_length = array_auxiliares.length,
		
		tecla,

		T1 = parseInt(personagem.style.top,10),
		T2,
		T3,
		T4,
		L1,
		L2,
		L3,
		L4,
		R1,
		R2,
		R3,
		R4,
		E1,
		E2,
		E3,
		E4,
		
		Tbase = parseInt(janela_jogo.style.height)-parseInt(personagem.style.height)-30,

		estado_som,
		estado_class_jj,
		estado_class_personagem = personagem.getAttribute("class"),

		blocos =[],
		quad_wh,
		quad_top,
		quad_left,
		quad_bottom,
		quad_rigth,
		bloco,

		pedras =[],
		pedra_wh,
		pedra_top,
		pedra_left,
		pedra_bottom,
		pedra_rigth,
		pedra,
		
		auxiliares =[],
		auxiliare_wh,
		auxiliare_top,
		auxiliare_left,
		auxiliare_bottom,
		auxiliare_rigth,
		auxiliar,

		teclaPresa,
		teclaSolta,

		pontos = document.getElementById("pontos"),
		quedas = document.getElementById("quedas"),
		interrogacoes = document.getElementById("interrogacoes"),
		
		pontuacao = parseInt(pontos.innerHTML.split("|")[1], 10),
		n_quedas = parseInt(quedas.innerHTML.split("|")[1], 10),
		n_interrogacoes = parseInt(interrogacoes.innerHTML.split("|")[1], 10),
		
		i_jogo_p,

		saltar = valor;
	
	
	
	//	.volume do som
	if(typeof(document.getElementById("som").getAttribute("class")) === "string" && document.getElementById("som").getAttribute("class").search("silencio") != -1){
		estado_som = 2;
	}
	else{
		estado_som = -1;
	}
	
	
	
	
	
	// RECEBER VALORES
	// .blocos
	for (a=0 ; a < a_length; a++){
		// Variaveis com dimensoes e posições do bloco
			quad_wh = parseInt(array_blocos[a].offsetWidth),
			quad_top = parseInt(array_blocos[a].offsetTop),
			quad_left = parseInt(array_blocos[a].style.left),
			quad_bottom = quad_top + quad_wh,
			quad_rigth = quad_left + quad_wh;
			bloco = array_blocos[a];

		// Cada Bloco terá as suas propriedades
			blocos[a] = [bloco,quad_top,quad_rigth,quad_bottom,quad_left];
	}
	
	// .pedras
	for (e=0 ; e < e_length; e++){
		// Variaveis com dimensoes e posições do bloco
			pedra_wh = parseInt(array_pedras[e].offsetWidth),
			pedra_top = parseInt(array_pedras[e].offsetTop),
			pedra_left = parseInt(array_pedras[e].style.left),
			pedra_bottom = pedra_top + pedra_wh,
			pedra_rigth = pedra_left + pedra_wh;
			pedra = array_pedras[e];

		// Cada Bloco terá as suas propriedades
			pedras[e] = [pedra,pedra_top,pedra_rigth,pedra_bottom,pedra_left];
	}

	
		// .auxiliares
	for (f=0 ; f < f_length; f++){
		// Variaveis com dimensoes e posições do bloco
			auxiliar_wh = parseInt(array_auxiliares[f].offsetWidth),
			auxiliar_top = parseInt(array_auxiliares[f].offsetTop),
			auxiliar_left = parseInt(array_auxiliares[f].style.left),
			auxiliar_bottom = auxiliar_top + auxiliar_wh,
			auxiliar_rigth = auxiliar_left + auxiliar_wh;
			auxiliar = array_auxiliares[f];

		// Cada Bloco terá as suas propriedades
			auxiliares[f] = [auxiliar,auxiliar_top,auxiliar_rigth,auxiliar_bottom,auxiliar_left];
	}
	
	// Redefinir valores for in loops
		b_length = blocos.length;
		e_length = pedras.length;
		f_length = auxiliares.length;
		
		
		
		
	// TECLAS
	// .esquerda 
	if(tecla === 37 && personagem.getAttribute("class").search("esq_i") === -1){
	
		// . classe de esq_p para esq_i
		personagem.setAttribute("class",personagem.getAttribute("class").replace("esq_p","esq_i"));
		
		// se back existe nao muda
		if(personagem.style.background.search("personagem_0_esq.png") === -1){
			personagem.style.background = "url(/imagens/personagem_0_esq.png)";
		}

		// função repeat avançar esquerda
		function i_esquerda(){
			T1 = parseInt(personagem.style.top,10);  
			L1 = parseInt(personagem.style.left,10); 
			detectar_bloco = false;
			
			//	minimos para move esquerda
			if(L1 > 0){
				//	DETECTAR BLOCOS
				// .pedras
				for(d=0 ; d < e_length; d++){
					// .dimensões pedra
					E3 = pedras[d][0]; //elemento pedra
					T3 = pedras[d][1]; //top pedra
					R3 = pedras[d][2]; //direita pedra
					L3 = pedras[d][4]; //esquerda pedra


					// tocar na pedra
					if(T1-T3 > -30 && T1-T3 < 45 && L1-R3 > -20 && L1-R3 < 6 && E3.style.display != "none"){
						// .ajustar personagem ao bloco
						personagem.style.left = L1-(L1-R3)+"px";
						if(L1>L3 && R1<R3){
							if(T1-T3<0){
								personagem.style.top = (T3-35)+"px";
							}
							else{
								personagem.style.top = (T3+50)+"px";
							}
						}
						
						// .se for dinamite
						if(E3.getAttribute("class").search("dinamite") != -1){
							// .apagar class dinamite
							E3.setAttribute("class",E3.getAttribute("class").replace("dinamite",""));
	
							// .aviso
							e_num_f("DANGER","perigo");
								
							// .função
							cenario_bomba(0,estado_som,E3);
						}
						
						detectar_bloco = true;
						break;
					}
					

					
					// .auxiliares
					if(d<f_length){
						E4 = auxiliares[d][0]; //top auxiliar
						T4 = auxiliares[d][1]; //top auxiliar
						R4 = auxiliares[d][2]; //direita auxiliar
						L4 = auxiliares[d][4]; //esquerda auxiliar
						
						var bloco_auxiliar_id = E4.getAttribute("id"),
							bloco_auxiliar_class = E4.getAttribute(
							"class");
							
						// . tocar em auxiliar
						if(E4.style.display != "none" && bloco_auxiliar_class.search("auxiliar") != -1 && T1-T4 > -30 && T1-T4 < 50 &&  L1-R4 > -20 && L1-R4 < 6){
							// .ajustar personagem ao bloco
							personagem.style.left = L1-(L1-R4)+"px";
							detectar_bloco = true;
							break;
						}
					}
				}
				
				
				if(detectar_bloco === false){
					// .mover personagem
					personagem.style.left = L1-6+"px";
					
					//	.se estiver acima do chão detecta solo
					/*
					if(T1<Tbase && personagem.getAttribute("class").search("cima_i") === -1 && personagem.getAttribute("class").search("baixo_i") === -1 && personagem.getAttribute("class").search("dir_i") === -1){
						//	detectar blocos (saltar,tecla)
							det_obj_pers( 0 , 1 );
					}*/

					//	.mover fundo
					if(parseInt(back_jogo.style.left,10) < 0 && L1 < parseInt(back_jogo.style.width,10)-300  && personagem.getAttribute("class").search("esq_p") === -1 && parseInt(personagem.style.left)+parseInt(back_jogo.style.left)<250){
						back_jogo.style.left = parseInt(back_jogo.style.left,10)+6+"px";
					}
				}
			}
			
			//	detectar stop esquerda
			if(personagem.getAttribute("class").search("esq_i") === -1 || janela_jogo.getAttribute("class").search("inicio") === -1 || personagem.getAttribute("class").search("dir_i") != -1){
				clearInterval(i_m_esquerda);
				personagem.setAttribute("class",personagem.getAttribute("class").replace("esq_i","esq_p"));
			}
		}
		var i_m_esquerda = setInterval(i_esquerda,30);
	}



	
	// .direita 
	if(tecla === 39 && personagem.getAttribute("class").search("esq_i") === -1){
	
		// . classe de dir_p para dir_i
		personagem.setAttribute("class",personagem.getAttribute("class").replace("dir_p","dir_i"));
		
		// se back existe nao muda
		if(personagem.style.background.search("personagem_0_dir.png") === -1){
			personagem.style.background = "url(/imagens/personagem_0_dir.png)";
		}

		// função repeat avançar direita
		function i_direita(){
			T1 = parseInt(personagem.style.top,10);
			R1 = parseInt(personagem.style.left,10)+parseInt(personagem.style.width,10);
			L1 = parseInt(personagem.style.left,10); 
			detectar_bloco = false;
			
			//	minimos para move direita
			if(L1 < parseInt(back_jogo.style.width,10)-parseInt(personagem.style.width,10)){
				//	DETECTAR BLOCOS
				// .pedras
				for(d=0 ; d < e_length; d++){
					// .dimensões pedra
					E3 = pedras[d][0]; //elemento pedra
					T3 = pedras[d][1]; //top pedra
					R3 = pedras[d][2]; //direita pedra
					L3 = pedras[d][4]; //esquerda pedra

					// tocar na pedra
					if(T1-T3 > -30 && T1-T3 < 45 && R1-L3 < 20 && R1-L3 > -8&& E3.style.display != "none"){
						// .ajustar personagem ao bloco
						personagem.style.left = L1-(R1-L3)+"px";
						
						// .se for dinamite
						if(E3.getAttribute("class").search("dinamite") != -1){
							// .apagar class dinamite
							E3.setAttribute("class",E3.getAttribute("class").replace("dinamite",""));
	
							// .aviso
							e_num_f("DANGER","perigo");
								
							// .função
							cenario_bomba(0,estado_som,E3);
						}
						
						detectar_bloco = true;
						break;
					}
					
					
					
					// .auxiliares
					if(d<f_length){
						E4 = auxiliares[d][0]; //top auxiliar
						T4 = auxiliares[d][1]; //top auxiliar
						R4 = auxiliares[d][2]; //direita auxiliar
						L4 = auxiliares[d][4]; //esquerda auxiliar
						
						var bloco_auxiliar_id = E4.getAttribute("id"),
							bloco_auxiliar_class = E4.getAttribute(
							"class");
						
					// . tocar em auxiliar
						if(bloco_auxiliar_class.search("auxiliar") != -1 && T1-T4 >= -30&& T1-T4 <= 50 &&  R1-L4 >= -6 && R1-L4 <= 6  && auxiliares[d][0].style.display != "none"){
							detectar_bloco = true;
							personagem.style.left = L1-(R1-L4)+"px";
							break;
						}
					}
				}
				
				if(detectar_bloco === false){
					// .mover personagem
					personagem.style.left = L1+6+"px";
					
					//	.se estiver acima do chão detecta solo
					/*
					if(T1 < Tbase && personagem.getAttribute("class").search("cima_i") === -1 && personagem.getAttribute("class").search("baixo_i") === -1 && personagem.getAttribute("class").search("esq_i") === -1){
						//	detectar blocos (saltar,tecla)
						det_obj_pers( 0 , 1 );
					}*/

					// .mover fundo
					if(L1 > 250 && -parseInt(back_jogo.style.left) < (parseInt(back_jogo.style.width)-650) && parseInt(personagem.style.left)+parseInt(back_jogo.style.left)<300 && parseInt(personagem.style.left)+parseInt(back_jogo.style.left)>250){
						back_jogo.style.left = parseInt(back_jogo.style.left,10)-6+"px";
					}
				}
			}
			
			//	detectar stop direita
			if(personagem.getAttribute("class").search("dir_i") === -1 || janela_jogo.getAttribute("class").search("inicio") === -1 || personagem.getAttribute("class").search("esq_i") != -1){
				clearInterval(i_m_direita);
				personagem.setAttribute("class",personagem.getAttribute("class").replace("dir_i","dir_p"));
			}
		}
		var i_m_direita = setInterval(i_direita,30);
	}
	
	
	
	
	
	// .cima e baixo
	if((tecla === 38 || tecla === 0 || tecla === "v") && personagem.getAttribute("class").search("cima_i") === -1 && personagem.getAttribute("class").search("baixo_i") === -1){		
		
		//	repeat subir e descer personagem
		function salto_tec_val(){
		//"use strict";
			
			// .se o dourado "disparou" remove os eventos
			if(janela_jogo.getAttribute("class").search("inicio") === -1){
				clearInterval(iniciar_vermelho);
				personagem.setAttribute("class", "");
			}
			

			
			// .dimensões personagem
			T1 = parseInt(personagem.style.top,10);
			R1 = parseInt(personagem.style.left,10)+parseInt(personagem.style.height,10);
			L1 = parseInt(personagem.style.left,10);

			// se x<0 sobre , x>0 desce
			saltar++;

			

			// .personagem a subir
			if(tecla != 0 & saltar < 1 && personagem.getAttribute("class").length != 0 && personagem.getAttribute("class").search("baixo_i") === -1){
				
				//	filtrar teclas
				if(personagem.getAttribute("class").search("cima_p") != -1 && (tecla === 38 || tecla === "v")){
				// .personagem no ar
					personagem.setAttribute("class",personagem.getAttribute("class").replace("cima_p","cima_i"));
					if(estado_som === -1 && tecla === 38){
						// .som salto
						som_salto.play();
					}
				}
				
				
				//	DETECTAR BLOCOS
				// .pedras
				for(d=0 ; d < e_length; d++){
					// .dimensões pedra
					E3 = pedras[d][0]; //elemento pedra
					T3 = pedras[d][1]; //top pedra
					R3 = pedras[d][2]; //direita pedra
					L3 = pedras[d][4]; //esquerda pedra
					
					
					// tocar na pedra
					if(T1-T3 < 56 && T1-T3 > 30 && R1-R3 < 30 && L1-L3 > -30){

						// .ajustar personagem ao bloco
						personagem.style.top = T1-(T1-T3-50)+"px";
						
						// .se for dinamite
						if(E3.getAttribute("class").search("dinamite") != -1){
							// .apagar class dinamite
							E3.setAttribute("class",E3.getAttribute("class").replace("dinamite",""));
	
							// .aviso
							e_num_f("DANGER","perigo");
								
							// .função
							cenario_bomba(0,estado_som,E3);
						}					
						
						// bloco true
						// saltar inicia movimento descendente
						detectar_bloco = true;
						saltar = 1;
						break;
					}
				}
				
				// . subir personagem
				personagem.style.top = T1 - 5 +"px";
			}

			
			
			
			// .personagem a descer
			else if(saltar > 0 && T1 < Tbase && personagem.getAttribute("class").length != 0 ){
				detectar_bloco = false;
				
				// iniciar baixo
				if(personagem.getAttribute("class").search("baixo_i") === -1){
					personagem.setAttribute("class",personagem.getAttribute("class").replace("cima_i","cima_p"));
					personagem.setAttribute("class",personagem.getAttribute("class").replace("baixo_p","baixo_i"));
				}
				else{
					// . descer personagem
					personagem.style.top = T1 + 5 +"px";
				}
			
				//	DETECTAR BLOCOS
				// .pedras
				for(d=0 ; d < e_length; d++){
					// .dimensões pedra
					E3 = pedras[d][0]; //elemento pedra
					T3 = pedras[d][1]; //top pedra
					R3 = pedras[d][2]; //direita pedra
					L3 = pedras[d][4]; //esquerda pedra
					
					// tocar na pedra
					if(T1-T3 < -30 && T1-T3 > -45 && L1-L3 > -35 && R1-R3 < 35 && E3.style.display != "none"){
						// .ajustar personagem ao bloco
						personagem.style.top = (T3-35)+"px";
						// .se for dinamite
						if(E3.getAttribute("class").search("dinamite") != -1){
							// .apagar class dinamite
							E3.setAttribute("class",E3.getAttribute("class").replace("dinamite",""));
	
							// .aviso
							e_num_f("DANGER","perigo");
								
							// .função
							cenario_bomba(0,estado_som,E3);
						}
						
						// parar intervalo
						clearInterval(iniciar_vermelho);
				
						// personagem para de descer
						personagem.setAttribute("class",personagem.getAttribute("class").replace("baixo_i","baixo_p"));
						
						detectar_bloco = true;
						break;
					}
				}
				
					
					
					

				// .auxiliares
				for(f=0 ; f < f_length; f++){
					// .dimensões auxiliar
					E4 = auxiliares[f][0]; //elemento auxiliar
					T4 = auxiliares[f][1]; //top auxiliar
					R4 = auxiliares[f][2]; //direita auxiliar
					L4 = auxiliares[f][4]; //esquerda auxiliar
					
					var bloco_auxiliar_id = E4.getAttribute("id"),
						bloco_auxiliar_class = E4.getAttribute(
							"class");
					
					// tocar no auxiliar
					if(bloco_auxiliar_class.search("auxiliar") != -1 && T1-T4 < -35 && T1-T4 > -45 && R1-L4 < 20 && R1-L4 > -6&& E3.style.display != "none"){
						// .ajustar personagem ao bloco
						personagem.style.top = (T4-35)+"px";
						
						// .auxiliar verde
						if(bloco_auxiliar_id === "aux_verde"){
							// ao activar muda de back							
							if(bloco_auxiliar.style.background.search("verde") === -1){
								bloco_auxiliar.style.background = "url(\"/imagens/verde.png\")";
								bloco_auxiliar.style.border = "solid 1px #ffffff";
							}
							
							// personagem para de descer
							personagem.setAttribute("class",personagem.getAttribute("class").replace("baixo_i","baixo_p"));
							
							// parar intervalo
							clearInterval(iniciar_vermelho);
						
							// auxiliar vermelho
							if(bloco_auxiliar_id === "aux_vermelho"){
								// .som
								if(estado_som === -1 || estado_som === null){
								// .som salto
									som_caixa_vermelha.play();
								}
								// novo intervalo
								det_obj_pers( "v" , -42);
							}
							
							detectar_bloco = true;
							e_bloco_verde(bloco_auxiliar);
							break;
						}
					}
				}
				
							
					
					

				// .blocos
				for(b=0 ; b < b_length; b++){

					// .dimensões blocos
					T2 = blocos[b][1]; //top bloco
					R2 = blocos[b][2]; //direita bloco
					L2 = blocos[b][4]; //esquerda bloco
						
					
					// se 50% jogo feito auxiliar aparece
					if(document.getElementById("aux_vermelho").style.display === "none" && blocos[parseInt(blocos.length/2)][0].getAttribute("class").search("b_activo") != -1 && bloco_auxiliar_id === "aux_vermelho"){
						// variaveis aparecer aux_vermelho
						var bloco_auxiliar = document.getElementById("aux_vermelho"),
							bloco_auxiliar_css = bloco_auxiliar.style.cssText,
							bloco_auxiliar_class = bloco_auxiliar.getAttribute("class");
							
							// função aparecer aux_vermelho
							e_blocos(bloco_auxiliar,bloco_auxiliar_css,bloco_auxiliar_class);
					}
						
					
					
					// . se encontrar bloco pousará em cima do mesmo
					if(T1-T2 < -30 && T1-T2 > -36 && R1-R2 < 35 && L1-L2 > -35 ){

						var caixa_azul = blocos[b][0].style.background.search("/imagens/inactivo.png"),
							caixa_dourada = blocos[b][0].getAttribute("class").search("dourado"),
							caixa_laranja_3 = blocos[b][0].getAttribute("class").search("laranja_3"),
							caixa_laranja_2 = blocos[b][0].getAttribute("class").search("laranja_2"),
							caixa_laranja_1 = blocos[b][0].getAttribute("class").search("laranja_1"),
							caixa_laranja = blocos[b][0].style.background.search("/imagens/activo.png"),
														
							caixa_vermelha = blocos[b][0].getAttribute("class").search("vermelho"),
							pontuacao = parseInt(document.getElementById("pontos").innerHTML.split("|")[1], 10);

							
							
							
							// apenas avancar se o bloco anterior estiver activo
							var id_bloco = parseInt(blocos[b][0].getAttribute("class").split(" ")[1].split("_")[1], 10),
							b_activo = blocos[b][0].getAttribute("class").search("b_activo");
							
							// se é o primeiro bloco
							if(b===0 && b_activo === -1){
								blocos[b][0].setAttribute("class",blocos[b][0].getAttribute("class")+" b_activo");
								var ligar_bloco = true;
								// iniciar efeito
								e_num_f(id_bloco);
							}
							
							// se ja está activo
							else if(b_activo != -1){
								var ligar_bloco = true;
							}

							// se é o segundo ou outro que não esteja activo
							else if(b > 0 && b_activo === -1){
								var id_bloco_ant = blocos[b-1][0].getAttribute("class").search("b_activo");

								if(id_bloco_ant != -1 && b_activo === -1){
								
									if(caixa_laranja_3 === -1 && caixa_laranja_2 === -1 && caixa_laranja_1 === -1){
										blocos[b][0].setAttribute("class",blocos[b][0].getAttribute("class")+" b_activo");
										var ligar_bloco = true;

										// iniciar efeito
										e_num_f(id_bloco);
									}
									
									if(caixa_laranja_3 != -1){
										blocos[b][0].setAttribute("class",blocos[b][0].getAttribute("class").replace("laranja_3","laranja_2"));
										var ligar_bloco = true;

										// iniciar efeito
										e_num_f(id_bloco);
									}
									else if(caixa_laranja_2 != -1 && tecla != 0 ){
										blocos[b][0].setAttribute("class",blocos[b][0].getAttribute("class").replace("laranja_2","laranja_1"));
										var ligar_bloco = true;

										// iniciar efeito
										e_num_f(id_bloco+1);
									}						else if(caixa_laranja_1 != -1 && tecla != 0){
										blocos[b][0].setAttribute("class",blocos[b][0].getAttribute("class").replace("laranja_1",""));
										blocos[b][0].setAttribute("class",blocos[b][0].getAttribute("class")+" b_activo");
										var ligar_bloco = true;

										// iniciar efeito
										e_num_f(id_bloco+2);
									}
									else if((caixa_laranja_1 != -1 || caixa_laranja_2 != -1 ) && tecla === 0){
										var detectar_bloco = true;
										
									}
								}

								else{
									var ligar_bloco = false;
									if(tecla === 38 || tecla === "v"){
										// iniciar efeito
										e_num_f("?");
										interrogacoes.innerHTML = "QUESTION MARK | "+(n_interrogacoes+1);
									}
								}
							}

						// se ERRADA a sequencia
						if(ligar_bloco === false && caixa_azul != -1){
							//som
							if((estado_som === -1 || estado_som === null) && (tecla === "v" || tecla === 38)){
								som_caixa_laranja.play();
							}
							//detectado bloco
								detectar_bloco = true;
						}
						
						
						
						
						
						
						// se:LARANJA 3
							if(caixa_laranja_3 != -1 && ligar_bloco === true){
							//detectado bloco
								detectar_bloco = true;
							// .background
								blocos[b][0].style.background = "url(\"/imagens/laranja_3.png\") #ffffff";
							// .border
								blocos[b][0].style.border = "1px dashed #ffffff";
							// .pontos
								pontos.innerHTML = "POINTS | "+(pontuacao+300);
							// .som
								if(estado_som === -1 || estado_som === null){
								// .som salto
									som_caixa_azul.play();
								}
							}
							
							// se:LARANJA 2
							if(caixa_laranja_2 != -1 && ligar_bloco === true){
							//detectado bloco
								detectar_bloco = true;
							// .background
								blocos[b][0].style.background = "url(\"/imagens/laranja_2.png\") #ffffff";
							// .border
								blocos[b][0].style.border = "1px dashed #ffffff";
							// .pontos
								pontos.innerHTML = "POINTS | "+(pontuacao+200);
							// .som
								if(estado_som === -1 || estado_som === null){
								// .som salto
									som_caixa_azul.play();
								}
							}
							
							// se:LARANJA 1
							if(caixa_laranja_1 != -1 && ligar_bloco === true){
							//detectado bloco
								detectar_bloco = true;
							// .background
								blocos[b][0].style.background = "url(\"/imagens/activo.png\") #ffffff";
							// .border
								blocos[b][0].style.border = "1px dashed #ffffff";
							// .pontos
								pontos.innerHTML = "POINTS | "+(pontuacao+100);
							// .som
								if(estado_som === -1 || estado_som === null){
								// .som salto
									som_caixa_azul.play();
								}
							}
							
						// se:AZUIS , se os quadradinhos são azuis padrao
							if(caixa_azul != -1 && caixa_dourada === -1 && caixa_vermelha === -1 && caixa_laranja_3 === -1 && ligar_bloco === true){
							//detectado bloco
								detectar_bloco = true;
							// .background
								blocos[b][0].style.background = "url(\"/imagens/activo.png\") #ffffff";
							// .border
								blocos[b][0].style.border = "1px dashed #ffffff";
							// .pontos
								pontos.innerHTML = "POINTS | "+(pontuacao+100);
							// .som
								if(estado_som === -1 || estado_som === null){
								// .som salto
									som_caixa_azul.play();
								}
							}

						// se:CAIXA LARANJA
							else if(caixa_laranja != -1){
							//detectado bloco
								detectar_bloco = true;
							}

						// se:VERMELHO , se o quadradinho é vermelho
							else if(caixa_vermelha != -1 && ligar_bloco === true){
								if(blocos[b][0].style.background.search("/imagens/vermelho.png") === -1){
							// .background
									blocos[b][0].style.background = "url(\"/imagens/vermelho.png\") #ffffff";
							// .border
									blocos[b][0].style.border = "1px dashed #ffffff";
								}
							//detectado bloco
								detectar_bloco = true;
							// .som
								if(estado_som === -1 || estado_som === null){
								// .som salto
									som_caixa_vermelha.play();
								}
							}
							
							// se:DOURADO , se o quadradinho é dourado
							else if(caixa_laranja === -1 && caixa_dourada != -1 && ligar_bloco === true){
								//detectado bloco
								detectar_bloco = true;
								// .background
								blocos[b][0].style.background = "url(\"/imagens/dourado.png\") #ffffff";
								// .border
								blocos[b][0].style.border = "1px dashed #ffffff";
								//.som
								if(estado_som === -1 || estado_som === null){
									// .som salto
									som_caixa_dourada.play();
								}
								// .pontos
								pontos.innerHTML = "POINTS | "+(pontuacao+1000);
								// .para tempo e remover eventos
								janela_jogo.setAttribute("class",janela_jogo.getAttribute("class").replace("inicio",""));
								espetaculo_pontos();
							}
							
						// se detectar bloco der "true" para tudo isto e a pesquisa inclusive
						if(detectar_bloco === true){
								
							// personagem para de descer
							personagem.setAttribute("class",personagem.getAttribute("class").replace("baixo_i","baixo_p"));
							personagem.setAttribute("class",personagem.getAttribute("class").replace("cima_i","cima_p"));
							
							// parar intervalo
							clearInterval(iniciar_vermelho);
							
							// mola
							if(caixa_vermelha != -1 && ligar_bloco === true){
									// parar intervalo
									clearInterval(iniciar_vermelho);
									
									// novo intervalo
									det_obj_pers( "v" , -42);
							}
							break;
						}
						
						// Ajustar personagem aos blocos
						personagem.style.top = (T2 - 35)+"px";
					} // fim da condição de blocos
				} // fim do for loops

			
			} // fim da condição " saltar > 0 && T1 < Tbase "

			
			// chegou ao solo
			else if(T1 > 430 ){
				// top base
				personagem.style.top = "435px";
				
				// personagem para de descer
				personagem.setAttribute("class",personagem.getAttribute("class").replace("baixo_i","baixo_p"));
				personagem.setAttribute("class",personagem.getAttribute("class").replace("cima_i","cima_p"));
				
				// parar intervalo
				clearInterval(iniciar_vermelho);
				
				if(blocos[0][0].style.background.search("/imagens/activo.png") != -1 && personagem.getAttribute("class").search("baixo_i") != -1){
					// .quedas
					quedas.innerHTML = "FALLS | "+(n_quedas+1);
				}
			}
		}

		var iniciar_vermelho = setInterval(salto_tec_val,20);
	}
}

//#################### NIVEIS ####################
function nivel(nivel_n){

if(nivel_n === 1){
	"use strict";
	function nivel_1(){

	// .adicionar nivel
	var texto_nivel = document.getElementById("nivel");
	texto_nivel.innerHTML = "LEVEL | 1";

	
	var blocos_jogaveis = [],
		auxiliares_jogaveis = [],
		bloco_left = [250,400,550,650,750,900,1100,1000,1000,1000],
		bloco_bottom = [70,70,70,115,170,220,220,320,120,220],
		numero_b = 0,
		a,
		a_length = bloco_left.length,
		c,
		
		// array auxiliares
		auxiliar_left = [(parseInt((bloco_left[0]+bloco_left[bloco_left.length-1])/2))],
		auxiliar_bottom = [30],
		
		numero_a = 0,
		id_auxiliar = 0,

		a,
		b,
		c,
		
		// comprimento das arrays
		a_length = bloco_left.length,
		// b_length = pedra_left.length,
		c_length = auxiliar_left.length,
		
		cor,
		border = "solid 1px #ffffff;",
		display = "block";
		
		// criar numeros de blocos
		for (a=0; a < a_length; a++){
			numero_b++;
			// .criar blocos
			blocos_jogaveis[a] = document.createElement("div");
			// .adicionar attributos
			blocos_jogaveis[a].setAttribute("class","bloco b_"+(a+1));
			// .definir CSS
			blocos_jogaveis[a].style.cssText = "position:absolute;left:"+bloco_left[a]+"px;bottom:"+bloco_bottom[a]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/inactivo.png\");border:solid 1px #2f0000;";
			// .adicionar blocos ao jogo
			document.getElementById("background_jogo").appendChild(blocos_jogaveis[a]);
				
			// .se for o ultimo elemento é o DOURADO
			if(a===(bloco_left.length-1)){
				blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+"bloco dourado");
			}
		}
		
		// AUXILIARES
		for (c=0; c < c_length; c++){
			// id_auxiliar
			id_auxiliar++;
		
			// .criar blocos
			auxiliares_jogaveis[c] = document.createElement("div");
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("class","auxiliar aux_"+id_auxiliar);

			
			if(c===0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_vermelho");
				cor = "vermelho";
				display = "display:none;";
			}
			
			if(c<c_length && c>0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_verde");
				cor = "inactivo";
				border = "solid 1px #333333;";
				display = "display:block;";
			}
			
			// .definir CSS
			auxiliares_jogaveis[c].style.cssText = "position:absolute;left:"+auxiliar_left[c]+"px;bottom:"+auxiliar_bottom[c]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/"+cor+".png\");"+display+"border:"+border;
			// .adicionar blocos ao jogo
			document.getElementById("background_jogo").appendChild(auxiliares_jogaveis[c]);
		}
	}
	nivel_1();
}

else if(nivel_n === 2){
	"use strict";
	function nivel_2(){

	// .adicionar nivel
	var texto_nivel = document.getElementById("nivel");
	texto_nivel.innerHTML = "LEVEL | 2";

	var blocos_jogaveis = [],
		auxiliares_jogaveis = [],
		bloco_left = [250,350,250,350,600,600,600,900,700,800,1060,1200,1300],
		bloco_bottom = [70,150,230,300,300,100,200,250,200,200,180,250,300],
		numero_b = 0,
		a,
		a_length = bloco_left.length,
		
		// array auxiliares
		auxiliar_left = [(parseInt((bloco_left[0]+bloco_left[bloco_left.length-1])/2))],
		auxiliar_bottom = [30],
		
		numero_a = 0,
		id_auxiliar = 0,

		b,
		c,
		
		// b_length = pedra_left.length,
		c_length = auxiliar_left.length,
		
		cor,
		border = "solid 1px #ffffff;",
		display = "block";

	// criar numeros de blocos
	for (a=0; a < a_length; a++){
		numero_b++;
		// .criar blocos
		blocos_jogaveis[a] = document.createElement("div");
		// .adicionar attributos
		blocos_jogaveis[a].setAttribute("class","bloco b_"+(a+1));
		// .definir CSS
		blocos_jogaveis[a].style.cssText = "position:absolute;left:"+bloco_left[a]+"px;bottom:"+bloco_bottom[a]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/inactivo.png\");border:solid 1px #2f0000;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(blocos_jogaveis[a]);
				
		// .se for o ultimo elemento é o DOURADO
		if(a===(bloco_left.length-1)){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+"bloco dourado");
		}
	}
	
		// AUXILIARES
		for (c=0; c < c_length; c++){
			// id_auxiliar
			id_auxiliar++;
		
			// .criar blocos
			auxiliares_jogaveis[c] = document.createElement("div");
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("class","auxiliar aux_"+id_auxiliar);

			
			if(c===0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_vermelho");
				cor = "vermelho";
				display = "display:none;";
			}
			
			if(c<c_length && c>0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_verde");
				cor = "inactivo";
				border = "solid 1px #333333;";
				display = "display:block;";
			}
			
			// .definir CSS
			auxiliares_jogaveis[c].style.cssText = "position:absolute;left:"+auxiliar_left[c]+"px;bottom:"+auxiliar_bottom[c]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/"+cor+".png\");"+display+"border:"+border;
			// .adicionar blocos ao jogo
			document.getElementById("background_jogo").appendChild(auxiliares_jogaveis[c]);
		}	
		
	}
	nivel_2();
}

// nivel 3
else if(nivel_n === 3){
	"use strict";
	function nivel_3(){

	// .adicionar nivel
	var texto_nivel = document.getElementById("nivel");
	texto_nivel.innerHTML = "LEVEL | 3";

	var blocos_jogaveis = [],
		auxiliares_jogaveis = [],
		bloco_left = [100,200,300,150,250,200,400,475,550,625,550,700,775,700,850,950,1050,1150,1400,1700],
		bloco_bottom = [74,74,74,150,150,220,350,250,350,250,150,350,250,150,350,300,250,200,250,300],
		numero_b = 0,
		a,
		a_length = bloco_left.length,
		
		// array auxiliares
		auxiliar_left = [(parseInt((bloco_left[0]+bloco_left[bloco_left.length-1])/2))],
		auxiliar_bottom = [30],
		
		numero_a = 0,
		id_auxiliar = 0,

		b,
		c,
		
		// b_length = pedra_left.length,
		c_length = auxiliar_left.length,
		
		cor,
		border = "solid 1px #ffffff;",
		display = "block";

	// criar numeros de blocos
	for (a=0; a < a_length; a++){
		numero_b++;
		// .criar blocos
		blocos_jogaveis[a] = document.createElement("div");
		// .adicionar attributos
		blocos_jogaveis[a].setAttribute("class","bloco b_"+(a+1));
		// .definir CSS
		blocos_jogaveis[a].style.cssText = "position:absolute;left:"+bloco_left[a]+"px;bottom:"+bloco_bottom[a]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/inactivo.png\");border:solid 1px #2f0000;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(blocos_jogaveis[a]);
				
		// .se for o ultimo elemento é o DOURADO
		if(a===(bloco_left.length-1)){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+"bloco dourado");
		}
				
		// .se for vermelho
		if(a===5 || a===17 || a===18){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" vermelho");
		}
	}
	
	// AUXILIARES
		for (c=0; c < c_length; c++){
			// id_auxiliar
			id_auxiliar++;
		
			// .criar blocos
			auxiliares_jogaveis[c] = document.createElement("div");
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("class","auxiliar aux_"+id_auxiliar);

			
			if(c===0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_vermelho");
				cor = "vermelho";
				display = "display:none;";
			}
			
			if(c<c_length && c>0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_verde");
				cor = "inactivo";
				border = "solid 1px #333333;";
				display = "display:block;";
			}
			
			// .definir CSS
			auxiliares_jogaveis[c].style.cssText = "position:absolute;left:"+auxiliar_left[c]+"px;bottom:"+auxiliar_bottom[c]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/"+cor+".png\");"+display+"border:"+border;
			// .adicionar blocos ao jogo
			document.getElementById("background_jogo").appendChild(auxiliares_jogaveis[c]);
		}		
	}
	nivel_3();
}


// nivel 4
else if(nivel_n === 4){
	"use strict";
	function nivel_4(){

	// NIVEL
	var texto_nivel = document.getElementById("nivel");
	texto_nivel.innerHTML = "LEVEL | 4";

	
	// VARIAVEIS
	var blocos_jogaveis = [],
		pedras_jogaveis = [],
		auxiliares_jogaveis = [],
		bloco_left = [100,150,250,250,330,330,450,450,530,530,490,650,650,730,730,700,800,900,950,1100,1200,1300,1400,1400,1300,1200,1100,1200,1300,1300,1200,1250],
		bloco_bottom = [210,210,210,290,290,210,110,190,190,110,330,310,390,390,310,190,190,190,190,240,340,340,240,140,40,40,140,240,240,140,140,190],
		
		pedra_left = [0,40,90,0,50,290,490,690,650,750,850,1150,1250,1350,1150,1350,1150,1250,1350],
		pedra_bottom = [30,120,120,210,210,250,150,350,190,190,190,290,290,290,190,190,90,90,90],
		
		numero_a = 0,
		numero_b = 0,
		a,
		b,
		a_length = bloco_left.length,
		b_length = pedra_left.length,
		
		// array auxiliares
		auxiliar_left = [(parseInt((bloco_left[0]+bloco_left[bloco_left.length-1])/2))],
		auxiliar_bottom = [30],
		
		numero_a = 0,
		id_auxiliar = 0,

		b,
		c,
		
		// b_length = pedra_left.length,
		c_length = auxiliar_left.length,
		
		cor,
		border = "solid 1px #ffffff;",
		display = "block";
		

	// AUXILIARES
		for (c=0; c < c_length; c++){
			// id_auxiliar
			id_auxiliar++;
		
			// .criar blocos
			auxiliares_jogaveis[c] = document.createElement("div");
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("class","auxiliar aux_"+id_auxiliar);

			
			if(c===0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_vermelho");
				cor = "vermelho";
				display = "display:none;";
			}
			
			if(c<c_length && c>0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_verde");
				cor = "inactivo";
				border = "solid 1px #333333;";
				display = "display:block;";
			}
			
			// .definir CSS
			auxiliares_jogaveis[c].style.cssText = "position:absolute;left:"+auxiliar_left[c]+"px;bottom:"+auxiliar_bottom[c]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/"+cor+".png\");"+display+"border:"+border;
			// .adicionar blocos ao jogo
			document.getElementById("background_jogo").appendChild(auxiliares_jogaveis[c]);
		}
		
		
	// CRIAR BLOCOS PONTOS
	for (a=0; a < a_length; a++){
		numero_a++;
		// .criar blocos
		blocos_jogaveis[a] = document.createElement("div");
		// .adicionar attributos
		blocos_jogaveis[a].setAttribute("class","bloco b_"+(a+1));
		// .definir CSS
		blocos_jogaveis[a].style.cssText = "position:absolute;left:"+bloco_left[a]+"px;bottom:"+bloco_bottom[a]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/inactivo.png\");border:solid 1px #2f0000;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(blocos_jogaveis[a]);
				
		// .se for o ultimo elemento é o DOURADO
		if(a===(bloco_left.length-1)){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+"bloco dourado");
		}
				
		// .se for vermelho
		if(a=== 10 ){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" vermelho");
		}
	}
	

	// CRIAR PEDRAS
	for (b=0; b < b_length; b++){
		numero_b++;
		// .criar blocos
		pedras_jogaveis[b] = document.createElement("div");
		// .adicionar attributos
		pedras_jogaveis[b].setAttribute("class","pedra");
		// .definir CSS
		pedras_jogaveis[b].style.cssText = "position:absolute;left:"+pedra_left[b]+"px;bottom:"+pedra_bottom[b]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/cinzento.png\");border:solid 1px #2f0000;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(pedras_jogaveis[b]);
	}		
	}
	nivel_4();
}

// nivel 5
else if(nivel_n === 5){
	"use strict";
	function nivel_5(){

	// NIVEL
	var texto_nivel = document.getElementById("nivel");
	texto_nivel.innerHTML = "LEVEL | 5";

	
	// VARIAVEIS
	var blocos_jogaveis = [],
		pedras_jogaveis = [],
		auxiliares_jogaveis = [],
		bloco_left = [20,30,40,30,20,130,200,300,340,400,500,350,550,600,560,640,650,200,200,850],
		bloco_bottom = [30,110,190,270,340,190,230,230,280,380,285,130,130,130,230,330,30,30,130,190],
		
		pedra_left = [200,250,300,350,400,450,500,550,600,650,0,0,0,0,0,0,0,0,0,0,50,100,150,150,150,150,150,150,150,150,150,250,250,250,250,250,250,250,350,350,350,350,450,300,400,450,500,350,450,550,550,550,550,500,450,450,550,550,650,650,650,650,650,650,700,750,750,750,750,750,750,750,750,750,800,800,850,900,900,900,900,850,800],
		pedra_bottom = [480,480,480,480,480,480,480,480,480,480,30,80,130,180,230,280,330,380,430,480,480,480,480,30,80,130,180,230,280,330,380,430,380,330,230,180,130,30,230,280,330,380,380,130,130,130,130,80,30,430,380,330,280,280,280,180,230,80,130,180,230,280,330,380,480,480,430,380,330,230,180,130,80,30,230,180,180,180,230,280,330,330,330],
		
		numero_a = 0,
		numero_b = 0,
		a,
		b,
		a_length = bloco_left.length,
		b_length = pedra_left.length,
		
		// array auxiliares
		auxiliar_left = [(parseInt((bloco_left[0]+bloco_left[bloco_left.length-1])/2))],
		auxiliar_bottom = [30],
		
		numero_a = 0,
		id_auxiliar = 0,

		c,
		
		// b_length = pedra_left.length,
		c_length = auxiliar_left.length,
		
		cor,
		border = "solid 1px #ffffff;",
		display = "block";
		

	// AUXILIARES
		for (c=0; c < c_length; c++){
			// id_auxiliar
			id_auxiliar++;
		
			// .criar blocos
			auxiliares_jogaveis[c] = document.createElement("div");
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("class","auxiliar aux_"+id_auxiliar);

			
			if(c===0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_vermelho");
				cor = "vermelho";
				display = "display:none;";
			}
			
			if(c<c_length && c>0){
				// .adicionar attributos
				auxiliares_jogaveis[c].setAttribute("id","aux_verde");
				cor = "inactivo";
				border = "solid 1px #333333;";
				display = "display:block;";
			}
			
			// .definir CSS
			auxiliares_jogaveis[c].style.cssText = "position:absolute;left:"+auxiliar_left[c]+"px;bottom:"+auxiliar_bottom[c]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/"+cor+".png\");"+display+"border:"+border;
			// .adicionar blocos ao jogo
			document.getElementById("background_jogo").appendChild(auxiliares_jogaveis[c]);
		}
		
		
		
	// CRIAR BLOCOS PONTOS
	for (a=0; a < a_length; a++){
		numero_a++;
		// .criar blocos
		blocos_jogaveis[a] = document.createElement("div");
		// .adicionar attributos
		blocos_jogaveis[a].setAttribute("class","bloco b_"+(numero_a));
		// .definir CSS
		blocos_jogaveis[a].style.cssText = "position:absolute;left:"+bloco_left[a]+"px;bottom:"+bloco_bottom[a]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/inactivo.png\");border:solid 1px #333333;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(blocos_jogaveis[a]);
				
		// .se for o ultimo elemento é o DOURADO
		if(a===(bloco_left.length-1)){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+"bloco dourado");
		}
				
		// .se for vermelho
		if( a === 5  || a === 8 || a === 10 || a=== 18){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" vermelho");
		}
		
		// laranja_pontos
		if(a=== 6 || a=== 9 || a=== 13 || a=== 14 || a===16){
		numero_a++;
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" laranja_3");
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" b_"+numero_a);
		numero_a++;
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" b_"+numero_a);
		}
	}
	

	// CRIAR PEDRAS
	for (b=0; b < b_length; b++){
		numero_b++;
		// .criar blocos
		pedras_jogaveis[b] = document.createElement("div");
		// .adicionar attributos
		pedras_jogaveis[b].setAttribute("class","pedra");
		// .definir CSS
		pedras_jogaveis[b].style.cssText = "position:absolute;left:"+pedra_left[b]+"px;bottom:"+pedra_bottom[b]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/cinzento.png\");border:solid 1px #000000;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(pedras_jogaveis[b]);
	}
		
	}
	nivel_5();
}

// nivel 6
else if(nivel_n === 6){
	"use strict";
	function nivel_6(){

	// NIVEL
	var texto_nivel = document.getElementById("nivel");
		texto_nivel.innerHTML = "LEVEL | 6";

	
	// VARIAVEIS
	var blocos_jogaveis = [],
		pedras_jogaveis = [],
		auxiliares_jogaveis = [],
		
		// array blocos pontos
		bloco_left = [150,200,250,150,400,500,450,450,650,650,950,1000,950,900,1000,1100,1150,1200,1250,1300,1350,1400],
		bloco_bottom = [80,80,80,180,130,130,130,300,80,275,380,180,180,30,30,30,80,130,130,230,280,30],
		
		// array pedras
		pedra_left = [100,100,100,200,200,200,300,300,300,450,450,450,
		
		600,700,600,650,700,850,850,850,850,850,850,850,850,850,900,950,1000,1050,1050,1050,1050,1050,1050,1050,1050,950,950,950,950,1050,1000,1300,1200,1350,1150,1200,1250,1300,1350,1450,1200,1250,1300,1350,1450,1300,1350,1450,1300,1350,1450,1350,1450,1450,1450,1450,1450,1450],
		pedra_bottom = [80,130,180,30,180,230,80,130,180,30,80,400,
		
		80,80,30,30,30,30,80,130,180,230,280,380,430,480,480,480,480,480,430,380,330,280,230,180,130,280,330,130,30,30,130,180,80,230,30,30,30,30,30,30,80,80,80,80,80,130,130,130,180,180,180,230,230,280,330,380,430,480],
		
		// array auxiliares
		auxiliar_left = [(parseInt((bloco_left[0]+bloco_left[bloco_left.length-1])/2)),515,800,650,900,1250,1400,1400,1400,1400,1400,1400],
		auxiliar_bottom = [30,300,330,130,280,180,80,130,180,230,280,330],
		
		numero_a = 0,
		id_auxiliar = 0,

		a,
		b,
		c,
		
		// comprimento das arrays
		a_length = bloco_left.length,
		b_length = pedra_left.length,
		c_length = auxiliar_left.length,
		
		cor,
		border = "solid 1px #ffffff;",
		display = "";

	
		// AUXILIARES
	for (c=0; c < c_length; c++){
		// id_auxiliar
		id_auxiliar++;
	
		// .criar blocos
		auxiliares_jogaveis[c] = document.createElement("div");
		// .adicionar attributos
		auxiliares_jogaveis[c].setAttribute("class","auxiliar aux_"+id_auxiliar);

		
		if(c===0){
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("id","aux_vermelho");
			cor = "vermelho";
			display = "display:none";
		}
		
		if(c<c_length && c>0){
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("id","aux_verde");
			cor = "inactivo";
			border = "solid 1px #333333;";
		}
		
		// .definir CSS
		auxiliares_jogaveis[c].style.cssText = "position:absolute;left:"+auxiliar_left[c]+"px;bottom:"+auxiliar_bottom[c]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/"+cor+".png\");"+display+"border:"+border;
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(auxiliares_jogaveis[c]);
	}
	
	
	
	// CRIAR BLOCOS PONTOS
	for (a=0; a < a_length; a++){
		numero_a++;

		// .criar blocos
		blocos_jogaveis[a] = document.createElement("div");
		// .adicionar attributos
		blocos_jogaveis[a].setAttribute("class","bloco b_"+(numero_a));
		// .definir CSS
		blocos_jogaveis[a].style.cssText = "position:absolute;left:"+bloco_left[a]+"px;bottom:"+bloco_bottom[a]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/inactivo.png\");border:solid 1px #333333;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(blocos_jogaveis[a]);
		
		// TIPOS DE BLOCOS
		// .dourado
		if(a===(bloco_left.length-1)){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+"bloco dourado");
		}
				
		// .vermelho
		if( a === 6 || a === 8 || a === 15){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" vermelho");
		}
		
		// 3 pontos
		if(a=== 1 || a=== 7 || a=== 10 || a===18 || a===20){
			numero_a++;
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" laranja_3");
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" b_"+numero_a);
			numero_a++;
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" b_"+numero_a);
		}
	}// fim blocos pontos
	

	// CRIAR PEDRAS
	for (b=0; b < b_length; b++){
		// .criar blocos
		pedras_jogaveis[b] = document.createElement("div");
		// .adicionar attributos
		pedras_jogaveis[b].setAttribute("class","pedra");
		// .definir CSS
		pedras_jogaveis[b].style.cssText = "position:absolute;left:"+pedra_left[b]+"px;bottom:"+pedra_bottom[b]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/cinzento.png\");border:solid 1px #000000;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(pedras_jogaveis[b]);
	}
		
	}
	nivel_6();
}

// nivel 7
else if(nivel_n === 7){
	"use strict";
	function nivel_7(){

	// NIVEL
	var texto_nivel = document.getElementById("nivel");
		texto_nivel.innerHTML = "LEVEL | 7";

	
	// VARIAVEIS
	var blocos_jogaveis = [],
		pedras_jogaveis = [],
		auxiliares_jogaveis = [],
		
	
		
		// array blocos pontos
		bloco_left = [400,350,300,500,450,500,450,400,350,600,
		700,750,700,600,800,900,1000,
		
		1000],
		bloco_bottom = [30,100,100,100,100,330,380,380,380,380,
		330,330,180,230,80,280,80,
		
		400],
		
		// array pedras
		pedra_left = [80,0,160,80,200,150,250,250,250,250,250,250,250,250,
		// 14 e 15
		250,250,	300,350,
		
		// 18
		400,	450,500,350,350,400,450,300,350,400,450,500,550,600,650,700,750,
		
		// 35
		550,	550,550,550,550,550,550,550,550,600,650,
		
		// 46
		700,	700,700,750,	700,800,850,850,850,850,850,850,
		
		// 58,59,60
		850,900,850,	850,850,800,750,700,650,600,
		
		// 69 e 72
		600,650,	750,800,	700,700,
		
		//74
		900,900,950,
		900,950,1000,1100,1150,
		900,950,1000,1050,1100,1150,1200,
		
		900,950,1000,1050,1100,1150,1200,1250,
		
		950,1000,1050,1100,1150,1200,1250,1300,
		900,950,1000,1050,1100,1150,1200,1250,1300,1350,
		900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,
		
		900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450
		
				
		],
		pedra_bottom = [140,240,240,340,390,490,80,130,180,230,330,380,430,480,
		// 14 e 15
		30,280,		230,230,
		
		// 18
		230, 230,	230,280,330,330,330,480,480,480,480,480,480,480,480,480,480,
		
		// 35
		430,	380,330,280,230,180,130,80,30,330,330,
		
		// 46
		380,	430,280,280,	330,480,480,430,380,330,280,230,
		
		// 58,59,60
		180,180,130,	80,30,30,30,30,30,30,
		
		// 69 e 72
		180,180,	180,180,	80,130,
		
		430,380,380,
		330,330,330,	330,330,
		280,280,	280,280,	280,280,	280,
		230,230,230,	230,230,	230,	230,230,
		
		180,180,180,180,180,180,180,180,
		130,130,	130,130,130,	130,130,130,130,130,
		80,80,	80,	80,80,80,80,80,80,80,80,
		
		30,30,30,30,30,30,30,30,30,30,30,30
		],
		
		
		
		
		// array auxiliares
		auxiliar_left = [(parseInt((bloco_left[0]+bloco_left[bloco_left.length-1])/2)),300,800,650,650],
		auxiliar_bottom = [30,330,330,80,380],
		
		
		
		numero_a = 0,
		id_auxiliar = 0,

		a,
		b,
		c,
		
		// comprimento das arrays
		a_length = bloco_left.length,
		b_length = pedra_left.length,
		c_length = auxiliar_left.length,
		
		cor,
		border = "solid 1px #ffffff;",
		display = "block";

	
		// AUXILIARES
	for (c=0; c < c_length; c++){
		// id_auxiliar
		id_auxiliar++;
	
		// .criar blocos
		auxiliares_jogaveis[c] = document.createElement("div");
		// .adicionar attributos
		auxiliares_jogaveis[c].setAttribute("class","auxiliar aux_"+id_auxiliar);

		
		if(c===0){
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("id","aux_vermelho");
			cor = "vermelho";
			display = "display:none;";
		}
		
		if(c<c_length && c>0){
			// .adicionar attributos
			auxiliares_jogaveis[c].setAttribute("id","aux_verde");
			cor = "inactivo";
			border = "solid 1px #333333;";
			display = "display:block;";
		}
		
		// .definir CSS
		auxiliares_jogaveis[c].style.cssText = "position:absolute;left:"+auxiliar_left[c]+"px;bottom:"+auxiliar_bottom[c]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/"+cor+".png\");"+display+"border:"+border;
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(auxiliares_jogaveis[c]);
	}
	
	
	
	// CRIAR BLOCOS PONTOS
	for (a=0; a < a_length; a++){
		numero_a++;

		// .criar blocos
		blocos_jogaveis[a] = document.createElement("div");
		// .adicionar attributos
		blocos_jogaveis[a].setAttribute("class","bloco b_"+(numero_a));
		// .definir CSS
		blocos_jogaveis[a].style.cssText = "position:absolute;left:"+bloco_left[a]+"px;bottom:"+bloco_bottom[a]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/inactivo.png\");border:solid 1px #333333;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(blocos_jogaveis[a]);
		
		// TIPOS DE BLOCOS
		// .dourado
		if(a===(bloco_left.length-1)){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+"bloco dourado");
		}
				
		// .vermelho
		if( a === 0 || a === 12 || a === 14){
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" vermelho");
		}
		
		// 3 pontos
		if(a=== 2 || a === 3 || a === 6 || a === 8 || a === 10 || a === 13 || a === 15){
			numero_a++;
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" laranja_3");
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" b_"+numero_a);
			numero_a++;
			blocos_jogaveis[a].setAttribute("class",blocos_jogaveis[a].getAttribute("class")+" b_"+numero_a);
		}
	}// fim blocos pontos
	

	// CRIAR PEDRAS
	for (b=0; b < b_length; b++){
		// .criar blocos
		pedras_jogaveis[b] = document.createElement("div");
		// .adicionar attributos
		pedras_jogaveis[b].setAttribute("class","pedra");
		// .definir CSS
		pedras_jogaveis[b].style.cssText = "position:absolute;left:"+pedra_left[b]+"px;bottom:"+pedra_bottom[b]+"px;z-index:10;width:50px;height:50px;background:url(\"/imagens/cinzento.png\");border:solid 1px #000000;";
		// .adicionar blocos ao jogo
		document.getElementById("background_jogo").appendChild(pedras_jogaveis[b]);
		
		// .bombas
		if(b === 14 || b === 15 || b === 18 || b === 35 || b === 46 || b === 50 || b === 58 || b === 59 || b === 60|| b === 69 || b === 72 || b=== 77 || b=== 78 || b=== 80|| b=== 82|| b=== 83|| b=== 86|| b=== 87|| b=== 89|| b=== 90|| b=== 91|| b=== 94|| b=== 98|| b=== 100|| b=== 101|| b=== 107|| b=== 108|| b=== 109|| b=== 117){
			pedras_jogaveis[b].setAttribute("class",pedras_jogaveis[b].getAttribute("class")+" dinamite");
		}
	}
		
	}
	nivel_7();
}
}

//############### ESPETACULO ###############
function espetaculo(eliminar_janela_nivel){
var janela_jogo = document.getElementById("janela_jogo");
	if(eliminar_janela_nivel != 1){
		var janela_nivel = document.createElement("div");
			janela_nivel.setAttribute("id","janela_nivel");
			janela_nivel.style.cssText = "position:absolute;width:300px;height:300px;left:175px;top:100px;background:#eeeeee;box-shadow:0 0 20px #777777;font-weight:bold";
			janela_nivel.innerHTML = "<p style=\line-height:50px;font-size:30px;text-align:center;color:#555555;font-family:arial;text-transform:lowercase;\">ARe you ready?</p><p style=\line-height:50px;font-size:25px;text-align:center;color:#fe9901;font-family:arial;text-transform:lowercase;\">level "+parseInt(document.getElementById("nivel").innerHTML.split("|")[1])+"</p><button onclick=\"gravidade()\" style=\"text-align:center;background:#dddddd;color:#555555;margin:0px auto;display:block;clear:both;cursor:pointer;box-shadow:0 0 5px #888888;border:2px solid #dddddd;font-size:40px;padding:10px;\">GO</button>"
			janela_jogo.appendChild(janela_nivel);
	}
		if(eliminar_janela_nivel === 1){
		var janela_nivel = document.getElementById("janela_nivel");
			janela_nivel.parentNode.removeChild(janela_nivel);
		}
}

//############### PROXIMO NIVEL ###############
function espetaculo_nivel(eliminar_janela_nivel){
var janela_jogo = document.getElementById("janela_jogo");
	if(eliminar_janela_nivel != 1){
		var janela_nivel = document.createElement("div");
			janela_nivel.setAttribute("id","janela_nivel");
			janela_nivel.style.cssText = "position:absolute;width:300px;height:300px;left:175px;top:100px;background:#eeeeee;box-shadow:0 0 20px #777777;font-weight:bold";
			janela_nivel.innerHTML = "<p style=\"line-height:50px;font-size:30px;text-align:center;color:#555555;font-family:arial;text-transform:lowercase;\">ARe you ready?</p><p style=\"line-height:50px;font-size:25px;text-align:center;color:#fe9901;font-family:arial;text-transform:lowercase;\">level "+parseInt(document.getElementById("nivel").innerHTML.split("|")[1])+"</p><button onclick=\"gravidade()\" style=\"text-align:center;background:#dddddd;color:#555555;margin:0px auto;display:block;clear:both;cursor:pointer;box-shadow:0 0 5px #888888;border:2px solid #dddddd;font-size:40px;padding:10px;\">GO</button>"
			janela_jogo.appendChild(janela_nivel);
			
			// adicionar event listener
			document.addEventListener('keyup',function menu_jogo(vars) {
				switch(vars.keyCode){
					case 32:
						gravidade();
						document.removeEventListener('keyup',menu_jogo,false);
					break;
					
					case 13:
						gravidade();
						document.removeEventListener('keyup',menu_jogo,false);
					break;
				}
			},false);
	}
		if(eliminar_janela_nivel === 1){
		var janela_nivel = document.getElementById("janela_nivel");
			janela_jogo.removeChild(janela_nivel);
		}
}

//############### PONTUAÇÃO ###############
function espetaculo_pontos(){
	// n do proximo nivel
	var n_nivel_n = parseInt(document.getElementById("nivel").innerHTML.split("|")[1], 10)+1;

	var janela_jogo = document.getElementById("janela_jogo"),
		tempo = document.getElementById("tempo"),
		pontos = parseInt(document.getElementById("pontos").innerHTML.split("|")[1]);

			janela_pontos = document.createElement("div");
			janela_pontos.setAttribute("id","janela_pontos");
			janela_pontos.style.cssText = "position:absolute;width:300px;height:300px;left:175px;top:100px;background:#eeeeee;box-shadow:0 0 20px #777777;font-weight:bold";
			janela_pontos.innerHTML = "<p style=\"line-height:50px;font-size:30px;text-align:center;color:#555555;font-family:arial;text-transform:lowercase;\">succeed</p><p style=\"line-height:50px;font-size:25px;text-align:center;color:#fe9901;font-family:arial;text-transform:lowercase;\">level "+parseInt(document.getElementById("nivel").innerHTML.split("|")[1])+" cleared!</p><button id=\"botao_pontos\" onclick=\"conteudos("+n_nivel_n+")\" style=\"text-align:center;background:#dddddd;color:#555555;margin:0px auto;display:block;clear:both;cursor:pointer;box-shadow:0 0 5px #888888;border:2px solid #dddddd;font-size:40px;line-heigth:20px;\">"+pontos+" points!</button>"
			janela_jogo.appendChild(janela_pontos);
			
			// adicionar event listener
			document.addEventListener('keyup',function menu_jogo(vars) {
				switch(vars.keyCode){
					case 32:
						conteudos(n_nivel_n);
						document.removeEventListener('keyup',menu_jogo,false);
					break;
					
					case 13:
						conteudos(n_nivel_n);
						document.removeEventListener('keyup',menu_jogo,false);
					break;
				}
			},false);
			
			var botao_pontos = document.getElementById("botao_pontos"),
				c_pontos = 1;

			// correr pontuação
			function correr_pontos(){
				if(0<=c_pontos && parseInt(pontos*0.1)>=c_pontos){
					c_pontos = c_pontos+2;
					botao_pontos.innerHTML = c_pontos+" points!"
				}

				else if(parseInt(pontos*0.1)+1<=c_pontos && c_pontos<=parseInt(pontos*0.3)){
					c_pontos=c_pontos+4;
					botao_pontos.innerHTML = c_pontos+" points!"
				}

				else if(parseInt(pontos*0.3)+1<=c_pontos && c_pontos<=parseInt(pontos*0.8)){
					c_pontos=c_pontos+6;
					botao_pontos.innerHTML = c_pontos+" points!"
				}

				else if(parseInt(pontos*0.8)+1<=c_pontos && c_pontos<=parseInt(pontos*0.9)){
					c_pontos=c_pontos+4;
					botao_pontos.innerHTML = c_pontos+" points!"
				}

				else if(c_pontos>=parseInt(pontos*0.9)+1 && c_pontos < pontos && (c_pontos + 2) < pontos){
					c_pontos = c_pontos+2;
					botao_pontos.innerHTML = c_pontos+" points!"
				}

				else{
					clearInterval(int_correr_pontos);
					botao_pontos.innerHTML = pontos+" points!"
				}
			}
			
			var int_correr_pontos = setInterval(correr_pontos, 1);
}

//############### Efeito reaparecer Bloco ###############
function e_blocos(bloco_auxiliar,bloco_auxiliar_css,bloco_auxiliar_class){

		var e_aum = 0;
		bloco_auxiliar.style.cssText = bloco_auxiliar_css+";opacity:0";
		
		bloco_auxiliar.style.display = "block";
		
		// aumentar opacidade
		function a_op(){
			e_aum = e_aum + 0.05;
			
			bloco_auxiliar.style.opacity = e_aum;

			// limpar intervalo
			if(bloco_auxiliar.style.opacity >= 0.90){
				clearInterval(i_a_op);
				bloco_auxiliar.style.opacity = 1;
				bloco_auxiliar.setAttribute("class",bloco_auxiliar_class);
			}
		}
		
		var i_a_op = setInterval(a_op,50);
}

//############### Cenario Bomba ###############
function cenario_bomba(bomba_bips,estado_som,pedra_tnt){
	function bomba(){
		bomba_bips++;
		// iniciar relogio bomba 3 segundos
		if(estado_som === -1){
			// .som salto
			som_tic_tac_bomba.play();
		}

		if(bomba_bips === 1){
			pedra_tnt.style.background = "url(\"/imagens/dinamite.png\")";
			e_num_f(3,"perigo");
		}
																				if(bomba_bips === 3){
			pedra_tnt.style.background = "url(\"/imagens/dinamite.png\")";
			e_num_f(1,"perigo");
		}
								
		if(bomba_bips === 2){
			pedra_tnt.style.background = "url(\"/imagens/cinzento.png\")";
			e_num_f(2,"perigo");
		}
								
		if(bomba_bips === 4){
			if(estado_som === -1){
				som_bomba_rebenta.play();
			}
			
			e_num_f("BOOOOOMMM","perigo");
			pedra_tnt.style.display = "none";
			clearInterval(i_bomba);
									
			// se a personagem estiver proóxima
			var v_proximidade = parseInt(personagem.style.left,10)-parseInt(pedra_tnt.style.left,10);
									
			// se ...
			if(v_proximidade > -100 && v_proximidade < 100){
				// efeito bomba
				e_bomba(v_proximidade);
				pedra_tnt.style.cssText = "";
			}
		}
	}
							
	var i_bomba = setInterval(bomba,1000);
}
//############### Efeito Bomba ###############
function e_bomba(v_proximidade){
	// salto para esquerda
	if(v_proximidade < 0){
		det_obj_pers( 38 , -23);
		//função afastar
		function afastar_bomba_e(){
			
			// redefinir class
				personagem.setAttribute("class",personagem.getAttribute("class").replace("dir_i","dir_p"));					
				det_obj_pers( 37 , "nada");

			// parar evento listener
			if(personagem.getAttribute("class").search("cima_i") === -1){
				clearInterval(i_afastar_bomba_e);
				// redefinir class
					personagem.setAttribute("class",personagem.getAttribute("class").replace("esq_i","esq_p"));
			}
		}
		var i_afastar_bomba_e = setInterval(afastar_bomba_e,30);
	}
	
	// salto para direita
	else if(v_proximidade > 0){
		// fazer saltar
		det_obj_pers( 38 , -23);
		//função afastar
		function afastar_bomba(){
			if(personagem.getAttribute("class").search("esq_i") != -1){
					// redefinir class
						personagem.setAttribute("class",personagem.getAttribute("class").replace("esq_i","esq_p"));
					}
					
			det_obj_pers( 39 , "nada");
			// parar evento listener
			if(personagem.getAttribute("class").search("cima_i") === -1){
				clearInterval(i_afastar_bomba);
				// redefinir class
					personagem.setAttribute("class",personagem.getAttribute("class").replace("dir_i","dir_p"));
			}
		}
		var i_afastar_bomba = setInterval(afastar_bomba,30);
	}
}

//############### Efeito Numerico ###############
function e_num_f(id_bloco,motivo){

	var e_numero = document.getElementById("e_numero");
	if(e_numero != null){
		e_numero.innerHTML ="";
		e_numero.parentNode.removeChild(e_numero);
	}
	
	if(document.getElementById("e_numero") === null){
		// Criar efeito
		var e_numero = document.createElement("span");
			e_numero.setAttribute("id","e_numero");
			e_numero.style.cssText = "position:absolute;color:#ffffff;font-weight:bold;right:"+(janela_jogo.offsetWidth/2)+"px;top:"+(janela_jogo.offsetHeight/2)+"px;z-index:100;opacity:1.0;font-size:60px;";
			e_numero.innerHTML = id_bloco;
			janela_jogo.appendChild(e_numero);
							
			e_numero = document.getElementById("e_numero");

			e_numero.style.left = ((janela_jogo.offsetWidth/2)-(e_numero.offsetWidth/2))+"px";
			e_numero.style.top = ((janela_jogo.offsetHeight/2)-(e_numero.offsetHeight/2))+"px";
		}
		
		if(id_bloco === "?" || motivo === "perigo"){
			e_numero.style.color = "red";
		}
	function e_num_i(){
		// novo width efeito
		e_numero.style.width = e_numero.innerHTML.length*parseInt(e_numero.style.fontSize)/2+"px";
		
		// novo left e novo top
		e_numero.style.left = ((janela_jogo.offsetWidth/2)-(e_numero.offsetWidth/2))+"px";
		e_numero.style.top = ((janela_jogo.offsetHeight/2)-(e_numero.offsetHeight/2))+"px";
		
		// novo font-size
		e_numero.style.fontSize = parseInt(e_numero.style.fontSize,10)+8+"px";
		
		// diminuir a opacidade 3*0.01
		e_numero.style.opacity = e_numero.style.opacity-0.03;
		
		// depois de concluido eliminar o efeito
		if(e_numero.style.opacity<0.05 || document.getElementById("e_numero") === null){
			clearInterval(i_e_font_pontos);
			e_numero.innerHTML ="";
			e_numero.parentNode.removeChild(e_numero);
		}
	}
	
	var i_e_font_pontos = setInterval(e_num_i,10);
}

//############### Efeito Bloco Verde ###############
function e_bloco_verde(bloco_verde){
	// bloco
	var bloco_auxiliar = bloco_verde,
	
	// gravar atributos e propriedades do bloco
		bloco_auxiliar_id = bloco_verde.getAttribute("id"),
		bloco_auxiliar_class = bloco_verde.getAttribute("class"),
		bloco_auxiliar_css = bloco_verde.style.cssText,
	// numero do auxiliar
		b_aux_id = bloco_verde.getAttribute("class").split(" ")[1].split("_")[1],
	// estado bloco auxiliar
		e_b_aux = bloco_auxiliar_class.search("activo");

	
	if(e_b_aux === -1){
		// actualizar estado do bloco
		bloco_auxiliar.setAttribute("class",bloco_auxiliar_class+" activo");
		
		function e_b_verde(){
			// se tiver 0 de height desaparece
			if(bloco_auxiliar.offsetHeight < 3){
				// actualizar estado do bloco
				bloco_auxiliar.setAttribute("class","");
				bloco_auxiliar.style.cssText = "";
				
				clearInterval(i_e_b_verde);
		
				//	actualizar detectar blocos
				det_obj_pers( 0 , 1 );
				
				var i_e_r_b_verde = setTimeout(function(){
					clearInterval(i_e_r_b_verde);

					// reintroduzir propriedades no bloco
					e_blocos(bloco_auxiliar,bloco_auxiliar_css,bloco_auxiliar_class);

				},5000);
			}
	
			// actualizar estado do bloco
			bloco_auxiliar.style.height = (parseFloat(bloco_auxiliar.style.height)-1)+"px";
			bloco_auxiliar.style.bottom = (parseFloat(bloco_auxiliar.style.bottom)+1)+"px";
		}
		
		var i_e_b_verde = setInterval(e_b_verde, 20);
	}
}

/* LOG DE ERROS

	classe gravidade e cima_i ainda , raramente, sao activas em pararelo
	
	detectar_bloco enviar false e detectar nas outras se é valido ou nao
	
	- objectos em display none afectam movimentos
	
	- actualizar todos os niveis com o novo sistema de auxiliares
	
	- SALTAR = 1  impede a troca de variaveis , aumenta performance e detecção do jogo
	
	LOG DE ERROS */