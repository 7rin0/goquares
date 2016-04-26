// START Application

// Globals
var body = document.getElementsByTagName('body')[0],
    janela_jogo = document.getElementById('janela_jogo'),
    janela_nivel = document.getElementById('janela_nivel'),
    background_jogo = document.getElementById('background_jogo'),
    personagem = document.getElementById('personagem'),
    tempo_value = document.getElementById('tempo_value'),
    pontos_value = document.getElementById('pontos_value'),
    quedas_value = document.getElementById('quedas_value'),
    fails_value = document.getElementById('fails_value'),
    nivel_value = document.getElementById('nivel_value'),
    som = document.getElementById('som'),
    pvi = parseInt(pontos_value.innerHTML),
    qvi = parseInt(quedas_value.innerHTML),
    fvi = parseInt(fails_value.innerHTML),
    nvi = parseInt(nivel_value.innerHTML),
    som_salto = new Audio('src/fx/mp3/salto.mp3'),
    som_caixa_azul = new Audio('src/fx/mp3/caixa_azul.mp3'),
    som_caixa_laranja = new Audio('src/fx/mp3/caixa_laranja.mp3'),
    som_caixa_vermelha = new Audio('src/fx/mp3/caixa_vermelha.mp3'),
    som_caixa_dourada = new Audio('src/fx/mp3/caixa_dourada.mp3'),
    som_tic_tac_bomba = new Audio('src/fx/mp3/tic_tac_bomba.mp3'),
    som_bomba_rebenta = new Audio('src/fx/mp3/bomba_rebenta.mp3'),

    // Application
    gosquares = {

        start: function () {
            // Criar jogo
            this.criacao_jogo(body, nvi);

            // Centrar jogo
            this.centrar_janela_jogo();

            // Criar nivel
            this.nivel(nvi);

            // Criar hero
            this.hero(nvi);

            // Effeitos do nivel
            this.espetaculo_nivel(nvi);
        },

        // funcao carregar conteudos
        loading_conteudos: function () {

            // Preload src/images
            var load_images = [],
                load_fx = [],
                loading_imagem,
                loading_som,
                a,
                b;

            // Array de src/images
            load_images = [
                'personagem_inicio',
                'fundo',
                'fundo_2',
                'fundo_3',
                'fundo_4',
                'inactivo',
                'activo',
                'vermelho',
                'dourado',
                'personagem_0_esq',
                'personagem_0_dir'
            ];

            // Loop de src/images
            for (a = 0; a < load_images.length; a++) {
                loading_imagem = new Image();
                loading_imagem.src = 'src/min/images/' + load_images[a] + '.png';
            }

            // Array de fx
            load_fx = [
                'salto',
                'fundo',
                'caixa_azul',
                'caixa_dourada',
                'caixa_vermelha',
                'caixa_laranja'
            ];

            // Loop de fx
            for (b = 0; b < load_fx.length; b++) {
                loading_som = new Audio();
                loading_som.src = 'src/fx/mp3/' + load_fx[b] + '.mp3';
            }
        },

        criacao_jogo: function (body, nvi) {
            // adicionar janela de jogo
            var imagem_background = '';

            switch (nvi) {
                case 1:
                    imagem_background = "url('src/min/images/fundo_1.png')";
                    break;
                case 2:
                    imagem_background = "url('src/min/images/fundo_1.png')";
                    break;
                case 3:
                    imagem_background = "url('src/min/images/fundo_1.png')";
                    break;
                case 4:
                    imagem_background = "url('src/min/images/fundo_2.png')";
                    break;
                case 5:
                    imagem_background = "url('src/min/images/fundo_2.png')";
                    break;
                case 6:
                    imagem_background = "url('src/min/images/fundo_2.png')";
                    break;
                case 7:
                    imagem_background = "url('src/min/images/fundo_3.png')";
                    break;
            }

            // adicionar background do nivel
            background_jogo.style.cssText += 'background: ' + imagem_background + ' left bottom;';
        },

        removerfx: function () {
            som.setAttribute('class', 'silencio');
        },

        centrar_janela_jogo: function () {
            // ID janela jogo
            var eixo_x = (window.innerWidth - janela_jogo.offsetWidth) / 2,
                eixo_y = (window.innerHeight - janela_jogo.offsetHeight) / 2;

            // Definir Margens em function do calculo
            janela_jogo.style.top = eixo_y + 'px';
            janela_jogo.style.left = eixo_x + 'px';

            // Display window
            janela_jogo.style.opacity = '1';
        },

        // Temporizador, funo que repetir
        game_events: function () {
            var movimentos = 0,
                i_f_jogo = janela_jogo.getAttribute('class').search('inicio'),
                teclaSolta,
                teclaPresa,
                segundos = 0,
                minutos = 0,
                restantes = 0;

            // Init time counter
            if (i_f_jogo !== -1) {
                segundos++;
                minutos = parseInt(segundos / 60);
                restantes = segundos - minutos * 60;
                if (minutos < 10) {
                    if (restantes < 10) {
                        tempo_value.innerHTML = '0' + minutos + ' : 0' + restantes;
                    } else if (restantes > 9) {
                        tempo_value.innerHTML = '0' + minutos + ' : ' + restantes;
                    }
                } else if (minutos > 9) {
                    if (restantes < 10) {
                        tempo_value.innerHTML = minutos + ' : 0' + restantes;
                    } else if (restantes > 9) {
                        tempo_value.innerHTML = minutos + ' : ' + restantes;
                    }
                }
            }

            // se a classe inicio for declarada
            if (movimentos === 0 && i_f_jogo !== -1 || segundos > 0 && i_f_jogo === -1) {
                movimentos = -1;

                // Listen when stop left or right keys/moves
                document.addEventListener('keyup', function teclaSolta(vars) {
                    switch (vars.keyCode) {
                        case 37:
                            // redefinir class
                            personagem.setAttribute('class', personagem.getAttribute('class').replace('esq_i', 'esq_p'));
                            break;
                        case 39:
                            // redefinir class
                            personagem.setAttribute('class', personagem.getAttribute('class').replace('dir_i', 'dir_p'));
                            break;
                    }
                }, false);

                // Listen when start top, right and left keys/moves
                document.addEventListener('keydown', function teclaPresa(event) {
                    if (personagem.getAttribute('class') !== null) {
                        var cima_i = personagem.getAttribute('class').search('cima_i'),
                            dir_i = personagem.getAttribute('class').search('dir_i'),
                            baixo_i = personagem.getAttribute('class').search('baixo_i'),
                            esq_i = personagem.getAttribute('class').search('esq_i'),
                            cima_p = personagem.getAttribute('class').search('cima_p'),
                            dir_p = personagem.getAttribute('class').search('dir_p'),
                            baixo_p = personagem.getAttribute('class').search('baixo_p'),
                            esq_p = personagem.getAttribute('class').search('esq_p');

                        switch (event.keyCode) {
                            // esquerda
                            case 37:
                                // se estiver parado, inicia esquerda
                                if (esq_i === -1) {
                                    if (dir_i !== -1) {
                                        personagem.setAttribute('class', personagem.getAttribute('class').replace('dir_i', 'dir_p'));
                                    }
                                    personagem.setAttribute('class', personagem.getAttribute('class').replace('esq_p', 'esq_i'));
                                }
                                break;
                            // salto
                            case 38:
                            case 32:
                                // se estiver no cho inicia salto
                                if (cima_i === -1 && baixo_i === -1) {
                                    personagem.setAttribute('class', personagem.getAttribute('class').replace('cima_p', 'cima_i'));
                                }
                                break;
                            // direita
                            case 39:
                                // se estiver parado, inicia direita
                                if (dir_i === -1) {
                                    if (esq_i !== -1) {
                                        personagem.setAttribute('class', personagem.getAttribute('class').replace('esq_i', 'esq_p'));
                                    }
                                    // redefinir class
                                    personagem.setAttribute('class', personagem.getAttribute('class').replace('dir_p', 'dir_i'));
                                }
                                break;
                        }
                    }
                }, false);
                if (segundos > 0 && i_f_jogo === -1) {
                    // se jogo acabar
                    document.removeEventListener('keyup', teclaSolta, false);
                    document.removeEventListener('keydown', teclaPresa, false);
                }
            }

            // Se janela jogo detectar classe parar o tempo para!
            if (i_f_jogo === -1 && segundos > 0) {
                clearInterval(gosquares.temporizador_inicio);
            }
        },

        hero: function (nvi) {

            if (nvi === 5) {
                personagem.style.left = '100px';
            } else {
                personagem.style.left = '150px';
            }
        },

        gravidade: function () {
            // Variavel que engloba o quadradinho
            var aumentador = 0,
                graus = 0,
                variavel = 3.12;

            // Remove presentation window
            janela_nivel.parentNode.removeChild(janela_nivel);

            // function que os atirar para a terra
            var gravidade_accao = function () {
                aumentador++;
                personagem.style.webkitTransform = 'rotate(' + graus + 'deg)';
                graus = variavel * aumentador;
                personagem.style.top = (personagem.offsetTop + 4) + 'px';

                if (janela_jogo.offsetHeight - personagem.offsetHeight - 30 <= personagem.offsetTop) {
                    clearInterval(correr_gravidade);
                    personagem.setAttribute('class', 'esq_p dir_p cima_p baixo_p');
                    personagem.style.webkitTransform = '';
                    janela_jogo.setAttribute('class', 'inicio');

                    // Loop to verify user actions
                    gosquares.temporizador_inicio = setInterval(gosquares.game_events(), 1000);

                    // mover personagem (function)
                    gosquares.realtime_game_fps();
                }
            };

            // Variavel que correr a gravidade sobre o boneco
            var correr_gravidade = setInterval(gravidade_accao, 20);
        },

        realtime_game_fps: function () {

            // Variaveis movimentos responsaveis
            var array_blocos = document.getElementsByClassName('bloco'),
                array_pedras = document.getElementsByClassName('pedra'),
                array_aux_s = document.getElementsByClassName('aux'),
                a,
                a_length = array_blocos.length,
                b,
                b_length,
                c,
                d,
                e,
                e_length = array_pedras.length,
                f,
                f_length = array_aux_s.length,
                tecla,
                T1 = personagem.offsetTop,
                B1,
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
                Tbase = janela_jogo.offsetHeight - personagem.offsetHeight - 30,
                estado_som,
                estado_class_jj,
                estado_class_personagem = personagem.getAttribute('class'),
                blocos = [],
                quad_wh,
                quad_top,
                quad_left,
                quad_bottom,
                quad_rigth,
                bloco,
                pedras = [],
                pedra_wh,
                pedra_top,
                pedra_left,
                pedra_bottom,
                pedra_rigth,
                pedra,
                aux_s = [],
                auxe_wh,
                auxe_top,
                auxe_left,
                auxe_bottom,
                auxe_rigth,
                aux,
                teclaPresa,
                teclaSolta,
                inicio,
                cima_i,
                dir_i,
                baixo_i,
                esq_i,
                cima_p,
                dir_p,
                baixo_p,
                esq_p,
                per_back_esq_s,
                per_back_dir_s,
                per_back_esq,
                per_back_dir,
                L_background_jogo,
                W_background_jogo,
                W_per,
                i_jogo_p, valor_cima = -27,
                det_bloco,
                caixa_azul,
                caixa_dourada,
                caixa_laranja_3,
                caixa_laranja_2,
                caixa_laranja_1,
                caixa_laranja,
                caixa_vermelha,
                id_bloco,
                b_activo,
                ligar_bloco,
                id_bloco_ant,
                primeiro_bloco = 0,
                ultimo_bloco = 0,
                tipo_salto,
                bloco_aux_id,
                bloco_aux_class,
                d_pedras,
                d_blocos,
                d_aux_s,
                colisao;

            // RECEBER VALORES
            // blocos
            for (a = 0; a < a_length; a++) {
                // Variaveis com dimensoes e posies do bloco
                quad_wh = array_blocos[a].offsetWidth;
                quad_top = array_blocos[a].offsetTop;
                quad_left = array_blocos[a].offsetLeft;
                quad_bottom = quad_top + quad_wh;
                quad_rigth = quad_left + quad_wh;
                bloco = array_blocos[a];
                // Cada Bloco ter as suas propriedades
                blocos[a] = [
                    bloco,
                    quad_top,
                    quad_rigth,
                    quad_bottom,
                    quad_left
                ];
            }
            // pedras
            for (e = 0; e < e_length; e++) {
                // Variaveis com dimensoes e posies do bloco
                pedra_wh = array_pedras[e].offsetWidth;
                pedra_top = array_pedras[e].offsetTop;
                pedra_left = array_pedras[e].offsetLeft;
                pedra_bottom = pedra_top + pedra_wh;
                pedra_rigth = pedra_left + pedra_wh;
                pedra = array_pedras[e];
                // Cada Bloco ter as suas propriedades
                pedras[e] = [
                    pedra,
                    pedra_top,
                    pedra_rigth,
                    pedra_bottom,
                    pedra_left
                ];
            }
            // aux_s
            for (f = 0; f < f_length; f++) {
                // Variaveis com dimensoes e posies do bloco
                aux_wh = array_aux_s[f].offsetWidth;
                aux_top = array_aux_s[f].offsetTop;
                aux_left = array_aux_s[f].offsetLeft;
                aux_bottom = aux_top + aux_wh;
                aux_rigth = aux_left + aux_wh;
                aux = array_aux_s[f];
                // Cada Bloco ter as suas propriedades
                aux_s[f] = [
                    aux,
                    aux_top,
                    aux_rigth,
                    aux_bottom,
                    aux_left
                ];
            }
            // Redefinir valores for in loops
            b_length = blocos.length;
            e_length = pedras.length;
            f_length = aux_s.length;
            id_metade_blocos = parseInt(b_length / 2, 10);

            // function GERAL
            var fps_jogo = function () {
                
                // VARIAVEIS
                // aces de jogo
                cima_i = personagem.getAttribute('class').search('cima_i');
                dir_i = personagem.getAttribute('class').search('dir_i');
                baixo_i = personagem.getAttribute('class').search('baixo_i');
                esq_i = personagem.getAttribute('class').search('esq_i');
                cima_p = personagem.getAttribute('class').search('cima_p');
                dir_p = personagem.getAttribute('class').search('dir_p');
                baixo_p = personagem.getAttribute('class').search('baixo_p');
                esq_p = personagem.getAttribute('class').search('esq_p');
                // dimenses personagem
                T1 = personagem.offsetTop;
                R1 = personagem.offsetLeft + personagem.offsetHeight;
                B1 = personagem.offsetLeft + personagem.offsetHeight;
                L1 = personagem.offsetLeft;
                // estilo
                per_back_esq_s = personagem.style.background.search('personagem_0_esq.png');
                per_back_dir_s = personagem.style.background.search('personagem_0_dir.png');
                per_back_esq = 'url(src/min/images/personagem_0_esq.png)';
                per_back_dir = 'url(src/min/images/personagem_0_dir.png)';
                // background
                L_background_jogo = background_jogo.offsetLeft;
                W_background_jogo = background_jogo.offsetWidth;
                W_per = personagem.offsetWidth;
                // se o dourado "disparou" remove os eventos
                if (ultimo_bloco === 1) {
                    clearInterval(i_fps_jogo);
                    personagem.setAttribute('class', '');
                }
                //	.volume do som
                if (typeof som.getAttribute('class') === 'string' && som.getAttribute('class').search('silencio') !== -1) {
                    estado_som = 2;
                } else {
                    estado_som = -1;
                }
                // salto
                if (cima_i !== -1) {
                    // fx saltos
                    if (estado_som === -1) {
                        if (valor_cima === -27 && tipo_salto === 'normal') {
                            // som salto
                            som_salto.play();
                        }  // se o valor  -40 o que significa , deteco de mola
                        else if (valor_cima === -54) {
                            // som salto
                            som_caixa_vermelha.play();
                        }
                    }
                    // aumenta o valor de subida
                    valor_cima++;
                    // pra subida
                    if (valor_cima === 0 || det_bloco === true) {
                        // repor valores de origem
                        valor_cima = -27;
                        tipo_salto = 'normal';
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('cima_i', 'cima_p'));
                        // iniciar baixo
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('baixo_p', 'baixo_i'));
                    } else {
                        personagem.offsetTop = (T1 - 4) + 'px';
                    }
                }  // queda
                else if (baixo_i !== -1 || baixo_i !== -1 && det_bloco === false || baixo_i !== -1 && det_bloco === 'ajustado') {
                    // est em cima de um bloco
                    // acabou de tocar num bloco
                    // chegou ao cho
                    if (T1 + 6 > 435 || det_bloco === true || det_bloco === 'ajustado') {
                        // se chegou ao cho
                        if (T1 + 6 > 435) {
                            // repor valores de origem
                            personagem.style.top = '435px';
                            // primeiro bloco concluido
                            // quedas
                            if (primeiro_bloco === 1) {
                                quedas_value.innerHTML = qvi = qvi + 1;
                            }
                        }
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('baixo_i', 'baixo_p'));
                        det_bloco = false;
                    } else {
                        if (T1 + 6 < 436 && det_bloco === false) {
                            personagem.style.top = (T1 + 6) + 'px';
                        }
                    }
                }
                // direita
                if (dir_i !== -1 && colisao !== 'direita') {
                    colisao = 0;
                    // verificar background
                    if (per_back_dir_s === -1) {
                        personagem.style.background = per_back_dir;
                    }
                    // se o left PER  menor que width do Jogo
                    if (L1 < W_background_jogo - W_per) {
                        // move PER para direita
                        personagem.style.left = (L1 + 5) + 'px';
                        // mover fundo
                        if (L1 > 250 && -L_background_jogo < W_background_jogo - 650 && L1 + L_background_jogo < 300 && L1 + L_background_jogo > 250) {
                            background_jogo.style.left = (L_background_jogo - 5) + 'px';
                        }
                    }
                    // se bloco for falso iniciar queda
                    if (det_bloco === false && baixo_i === -1 && cima_i === -1 && T1 !== 435) {
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('baixo_p', 'baixo_i'));
                    }
                }  // esquerda
                else if (esq_i !== -1 && colisao !== 'esquerda') {
                    colisao = 0;
                    // verificar background
                    if (per_back_esq_s === -1) {
                        personagem.style.background = per_back_esq;
                    }
                    // se o left PER  menor que width do Jogo
                    if (L1 > 0) {
                        // move PER para esquerda
                        personagem.style.left = (L1 - 5) + 'px';
                        // mover fundo
                        if (L1 > 250 && L_background_jogo < 0 && L1 + 250 < W_background_jogo) {
                            background_jogo.style.left = (L_background_jogo + 5) + 'px';
                        }
                    }
                    // se bloco for falso iniciar queda
                    if (det_bloco === false && baixo_i === -1 && cima_i === -1 && T1 !== 435) {
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('baixo_p', 'baixo_i'));
                    }
                }
                // se existirem pedras
                if (e_length !== 0) {
                    // pedras
                    for (d = 0; d < e_length; d++) {
                        // dimenses pedra
                        E3 = pedras[d][0];
                        // elemento pedra
                        T3 = pedras[d][1];
                        // top pedra
                        R3 = pedras[d][2];
                        // direita pedra
                        L3 = pedras[d][4];
                        // esquerda pedra
                        // toca no cimo da pedra
                        if (T1 - T3 > -36 && T1 - T3 < -28 && R1 - R3 < 30 && L1 - L3 > -30) {
                            // se o top nao estiver ajustado f-lo-
                            // primeiro toque no pedra
                            if (T1 !== T3 - 35) {
                                personagem.style.top = (T3 - 35) + 'px';
                                det_bloco = true;
                                // se for dinamite
                                if (E3.getAttribute('class').search('dinamite') !== -1) {
                                    // apagar class dinamite
                                    E3.setAttribute('class', E3.getAttribute('class').replace('dinamite', ''));
                                    // aviso
                                    e_num_f('DANGER', 'perigo');
                                    // function
                                    cenario_bomba(0, estado_som, E3);
                                }
                            }  // se estiver no mesmo bloco simplesmente continua a circular sem deteces
                            else {
                                det_bloco = 'ajustado';
                            }
                            // ultima linha
                            d_pedras = 1;
                            break;
                        }  // toca na base da pedra
                        else if (T1 - T3 > 46 && T1 - T3 < 54 && R1 - R3 < 30 && L1 - L3 > -30) {
                            // primeiro toque na pedra
                            if (T1 !== T3 + 50 && det_bloco === false) {
                                personagem.style.top = (T3 + 50) + 'px';
                                det_bloco = true;
                                d_pedras = 1;
                            }  // segundo toque ou deteco
                            else {
                                det_bloco = false;
                                d_pedras = 0;
                            }
                            break;
                        }  // se depois de todas as verificaes nao detectar pedra determina false e inicia descida
                        else {
                            d_pedras = 0;
                        }
                        // toca de lado direito da pedra
                        if (T1 - T3 > -35 && T1 - T3 < 50 && L1 - R3 > -6 && L1 - R3 < 1) {
                            // primeiro toque na pedra
                            if (L1 !== R3) {
                                personagem.style.left = R3 + 'px';
                                colisao = 'esquerda';
                            }
                            break;
                        }  // toca de lado esquerdo da pedra
                        else if (T1 - T3 > -35 && T1 - T3 < 50 && R1 - L3 > -1 && R1 - L3 < 16) {
                            // primeiro toque na pedra
                            if (L1 !== L3 - 35) {
                                personagem.style.left = L3 - 35 + 'px';
                                colisao = 'direita';
                            }
                            break;
                        }  // se depois de todas as verificaes nao detectar pedra determina false e inicia descida
                        else if (d === e_length - 1) {
                            d_pedras = 0;
                            colisao = 0;
                        }
                    }
                }  // se no existirem pedras envia sinal
                else {
                    d_pedras = 0;
                    colisao = 0;
                }
                /* Verificao de aux_s
                 for(f=0 ; f < f_length; f++){
                 // dimenses aux
                 E4 = aux_s[f][0] //elemento aux
                 T4 = aux_s[f][1] //top aux
                 R4 = aux_s[f][2] //direita aux
                 L4 = aux_s[f][4] //esquerda aux
                 //  se pousar em cima do aux
                 if(T1-T4 > -36 && T1-T4 < -28 && R1-R4 < 30 && L1-L4 > -30 ){
                 // se o top nao estiver ajustado f-lo-
                 // primeiro toque no aux
                 if(T1 !== (T4 - 35)){
                 personagem.style.top = (T1 - 35) + "px"
                 det_bloco = true
                 // variaveis
                 bloco_aux_id = E4.getAttribute("id")
                 bloco_aux_class = E4.getAttribute(
                 "class")
                 // aux verde
                 if(bloco_aux_id === "aux_verde"){
                 // ao activar muda de back
                 if(E4.style.background.search("verde") === -1){
                 E4.style.background = "url(\"src/min/images/verde.png\")"
                 E4.style.border = "solid 1px #ffffff"
                 }
                 // iniciar efeito
                 e_bloco_verde(E4)
                 break
                 }
                 // aux vermelho
                 else if(bloco_aux_id === "aux_vermelho"){
                 break
                 }
                 }
                 }
                 // se depois de todas as verificaes nao detectar bloco determina false e inicia descida
                 else{
                 det_bloco = false
                 }
                 }*/
                // Verificao de blocos
                for (b = 0; b < b_length; b++) {
                    // dimenses blocos
                    E2 = blocos[b][0];
                    // top bloco
                    T2 = blocos[b][1];
                    // top bloco
                    R2 = blocos[b][2];
                    // direita bloco
                    L2 = blocos[b][4];
                    // esquerda bloco
                    //  se encontrar bloco pousar em cima do mesmo
                    if (T1 - T2 > -36 && T1 - T2 < -28 && R1 - R2 < 30 && L1 - L2 > -30) {
                        // se o top nao estiver ajustado f-lo-
                        // basicamente se for a primeira vez que toca depois de um salto ou queda
                        if (T1 !== T2 - 35) {
                            personagem.style.top = (T2 - 35) + 'px';
                            det_bloco = true;
                            // Super-Importante
                            // estes codigos esto aqui para que sejam lidos, apenas se houver um primeiro contacto com o objecto em questo
                            // verificao de sequencia
                            caixa_azul = E2.style.background.search('src/min/images/inactivo.png');
                            caixa_dourada = E2.getAttribute('class').search('dourado');
                            caixa_laranja_3 = E2.getAttribute('class').search('laranja_3');
                            caixa_laranja_2 = E2.getAttribute('class').search('laranja_2');
                            caixa_laranja_1 = E2.getAttribute('class').search('laranja_1');
                            caixa_laranja = E2.style.background.search('src/min/images/activo.png');
                            caixa_vermelha = E2.getAttribute('class').search('vermelho');
                            id_bloco = parseInt(E2.getAttribute('class').split(' ')[1].split('_')[1], 10);
                            b_activo = E2.getAttribute('class').search('b_activo');
                            // ligar_bloco sera true ou false
                            // se no for primeiro bloco
                            if (b > 0) {
                                id_bloco_ant = blocos[b - 1][0].getAttribute('class').search('b_activo');
                            }
                            // se for o primeiro bloco
                            //  no procurara anterior activo
                            if (b === 0 && b_activo === -1) {
                                // activa-lo, com classe
                                ligar_bloco = true;
                                primeiro_bloco = 1;
                                E2.setAttribute('class', E2.getAttribute('class') + ' b_activo');
                                // iniciar efeito
                                e_num_f(id_bloco);
                            }  // se no  o primeiro e o anterior NO esta activo
                            else if (b > 0 && id_bloco_ant === -1) {
                                ligar_bloco = false;
                            }  // se no  o primeiro e o anterior esta activo
                            else if (b > 0 && id_bloco_ant !== -1 && b_activo === -1) {
                                // agrupamento de 3 blocos
                                if (caixa_laranja_3 === -1 && caixa_laranja_2 === -1 && caixa_laranja_1 === -1) {
                                    E2.setAttribute('class', E2.getAttribute('class') + ' b_activo');
                                    ligar_bloco = true;
                                    // iniciar efeito
                                    e_num_f(id_bloco);
                                } else if (caixa_laranja_3 !== -1) {
                                    E2.setAttribute('class', E2.getAttribute('class').replace('laranja_3', 'laranja_2'));
                                    ligar_bloco = true;
                                    // iniciar efeito
                                    e_num_f(id_bloco);
                                } else if (caixa_laranja_2 !== -1) {
                                    E2.setAttribute('class', E2.getAttribute('class').replace('laranja_2', 'laranja_1'));
                                    ligar_bloco = true;
                                    // iniciar efeito
                                    e_num_f(id_bloco + 1);
                                } else if (caixa_laranja_1 !== -1) {
                                    E2.setAttribute('class', E2.getAttribute('class').replace('laranja_1', ''));
                                    E2.setAttribute('class', E2.getAttribute('class') + ' b_activo');
                                    ligar_bloco = true;
                                    // iniciar efeito
                                    e_num_f(id_bloco + 2);
                                }
                            }
                            // sequencia errada
                            if (ligar_bloco === false && b_activo === -1) {
                                // som
                                if (estado_som === -1 || estado_som === null) {
                                    som_caixa_laranja.play();
                                }
                                // iniciar efeito
                                e_num_f('?');
                                fails_value.innerHTML = fvi = fvi + 1;
                            }  // sequencia correcta
                            else if (ligar_bloco === true && (b_activo === -1 || caixa_vermelha !== -1)) {
                                // bloco azul
                                if (caixa_azul !== -1 && caixa_dourada === -1 && caixa_vermelha === -1 && caixa_laranja_3 === -1) {
                                    // background
                                    E2.style.background = 'url("src/min/images/activo.png") #ffffff';
                                    // border
                                    E2.style.border = '1px dashed #ffffff';
                                    // pontos
                                    pvi = pontos_value.innerHTML = pvi + 100;
                                    // som
                                    if (estado_som === -1 || estado_som === null) {
                                        // som salto
                                        som_caixa_azul.play();
                                    }
                                }  // bloco vermelho
                                else if (caixa_vermelha !== -1) {
                                    if (E2.style.background.search('src/min/images/vermelho.png') === -1) {
                                        // background
                                        E2.style.background = 'url("src/min/images/vermelho.png") #ffffff';
                                        // border
                                        E2.style.border = '1px dashed #ffffff';
                                    }
                                    // se no estiver em "cima_i" , f-lo-
                                    // repor valores de origem
                                    valor_cima = -54;
                                    personagem.setAttribute('class', personagem.getAttribute('class').replace('cima_p', 'cima_i'));
                                    det_bloco = false;
                                    tipo_salto = 'vermelho';
                                }  // bloco dourado
                                else if (caixa_dourada !== -1) {
                                    // parar jogo
                                    ultimo_bloco = 1;
                                    // background
                                    E2.style.background = 'url("src/min/images/dourado.png") #ffffff';
                                    // border
                                    E2.style.border = '1px dashed #ffffff';
                                    // som
                                    if (estado_som === -1 || estado_som === null) {
                                        // som salto
                                        som_caixa_dourada.play();
                                    }
                                    // pontos
                                    pvi = pontos_value.innerHTML = pvi + 100;
                                    // para tempo e remover eventos
                                    janela_jogo.setAttribute('class', janela_jogo.getAttribute('class').replace('inicio', 'fim'));
                                    this.espetaculo_pontos();
                                }
                            }
                            // se metade dos blocos estiverem concluidos d sinal
                            if (blocos[id_metade_blocos][0].getAttribute('class').search('b_activo') !== -1 && document.getElementById('aux_vermelho').style.display === 'none') {
                                // variaveis aparecer aux_vermelho
                                var bloco_aux = document.getElementById('aux_vermelho'), bloco_aux_css = bloco_aux.style.cssText, bloco_aux_class = bloco_aux.getAttribute('class');
                                // function aparecer aux_vermelho
                                e_blocos(bloco_aux, bloco_aux_css, bloco_aux_class);
                            }
                        }  // se estiver no mesmo bloco simplesmente continua a circular sem deteces
                        else {
                            det_bloco = 'ajustado';
                        }
                        // ultima linha
                        d_blocos = 1;
                        break;
                    } else {
                        d_blocos = 0;
                    }
                }
                if (d_pedras === 0 && d_blocos === 0) {
                    // se depois de todas as verificaes nao detectar bloco determina false e inicia descida
                    det_bloco = false;
                }
            };

            // variavel de intervalo fps_jogo
            var i_fps_jogo = setInterval(fps_jogo, 20);
        },

        nivel: function (nvi) {

            // Set current level
            nivel_value.innerHTML = nvi = (nvi !== undefined) ? nvi : 1;

            if (nvi === 1) {
                var nivel_1 = function () {
                    // adicionar nivel
                    var blocos_jogaveis = [], aux_s_jogaveis = [], bloco_left = [
                            250,
                            400,
                            550,
                            650,
                            750,
                            900,
                            1100,
                            1000,
                            1000,
                            1000
                        ], bloco_bottom = [
                            70,
                            70,
                            70,
                            115,
                            170,
                            220,
                            220,
                            320,
                            120,
                            220
                        ], numero_b = 0, a, b, c,
                    // array aux_s
                        aux_left = [parseInt((bloco_left[0] + bloco_left[bloco_left.length - 1]) / 2)], aux_bottom = [30], numero_a = 0, id_aux = 0,
                    // comprimento das arrays
                        a_length = bloco_left.length,
                    // b_length = pedra_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // criar numeros de blocos
                    for (a = 0; a < a_length; a++) {
                        numero_b++;
                        // criar blocos
                        blocos_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocos_jogaveis[a].setAttribute('class', 'bloco b_' + (a + 1));
                        // definir CSS
                        blocos_jogaveis[a].style.cssText = 'position:absolute;left:' + bloco_left[a] + 'px;bottom:' + bloco_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(blocos_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === bloco_left.length - 1) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + 'bloco dourado');
                        }
                    }
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocos
                        aux_s_jogaveis[c] = document.createElement('div');
                        // adicionar attributos
                        aux_s_jogaveis[c].setAttribute('class', 'aux aux_' + id_aux);
                        if (c === 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_vermelho');
                            cor = 'vermelho';
                            display = 'display:none;';
                        }
                        if (c < c_length && c > 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_verde');
                            cor = 'inactivo';
                            border = 'solid 1px #333333;';
                            display = 'display:block;';
                        }
                        // definir CSS
                        aux_s_jogaveis[c].style.cssText = 'position:absolute;left:' + aux_left[c] + 'px;bottom:' + aux_bottom[c] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/' + cor + '.png");' + display + 'border:' + border;
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(aux_s_jogaveis[c]);
                    }
                };
                nivel_1();
            } else if (nvi === 2) {
                var nivel_2 = function () {
                    var blocos_jogaveis = [], aux_s_jogaveis = [], bloco_left = [
                            250,
                            350,
                            250,
                            350,
                            600,
                            600,
                            600,
                            900,
                            700,
                            800,
                            1060,
                            1200,
                            1300
                        ], bloco_bottom = [
                            70,
                            150,
                            230,
                            300,
                            300,
                            100,
                            200,
                            250,
                            200,
                            200,
                            180,
                            250,
                            300
                        ], numero_b = 0, a, a_length = bloco_left.length,
                    // array aux_s
                        aux_left = [parseInt((bloco_left[0] + bloco_left[bloco_left.length - 1]) / 2)], aux_bottom = [30], numero_a = 0, id_aux = 0, b, c,
                    // b_length = pedra_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // criar numeros de blocos
                    for (a = 0; a < a_length; a++) {
                        numero_b++;
                        // criar blocos
                        blocos_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocos_jogaveis[a].setAttribute('class', 'bloco b_' + (a + 1));
                        // definir CSS
                        blocos_jogaveis[a].style.cssText = 'position:absolute;left:' + bloco_left[a] + 'px;bottom:' + bloco_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(blocos_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === bloco_left.length - 1) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + 'bloco dourado');
                        }
                    }
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocos
                        aux_s_jogaveis[c] = document.createElement('div');
                        // adicionar attributos
                        aux_s_jogaveis[c].setAttribute('class', 'aux aux_' + id_aux);
                        if (c === 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_vermelho');
                            cor = 'vermelho';
                            display = 'display:none;';
                        }
                        if (c < c_length && c > 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_verde');
                            cor = 'inactivo';
                            border = 'solid 1px #333333;';
                            display = 'display:block;';
                        }
                        // definir CSS
                        aux_s_jogaveis[c].style.cssText = 'position:absolute;left:' + aux_left[c] + 'px;bottom:' + aux_bottom[c] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/' + cor + '.png");' + display + 'border:' + border;
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(aux_s_jogaveis[c]);
                    }
                };
                nivel_2();
            } else if (nvi === 3) {
                var nivel_3 = function () {
                    var blocos_jogaveis = [], aux_s_jogaveis = [], bloco_left = [
                            100,
                            200,
                            300,
                            150,
                            250,
                            200,
                            400,
                            475,
                            550,
                            625,
                            550,
                            700,
                            775,
                            700,
                            850,
                            950,
                            1050,
                            1150,
                            1400,
                            1700
                        ], bloco_bottom = [
                            74,
                            74,
                            74,
                            150,
                            150,
                            220,
                            350,
                            250,
                            350,
                            250,
                            150,
                            350,
                            250,
                            150,
                            350,
                            300,
                            250,
                            200,
                            250,
                            300
                        ], numero_b = 0, a, a_length = bloco_left.length,
                    // array aux_s
                        aux_left = [parseInt((bloco_left[0] + bloco_left[bloco_left.length - 1]) / 2)], aux_bottom = [30], numero_a = 0, id_aux = 0, b, c,
                    // b_length = pedra_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // criar numeros de blocos
                    for (a = 0; a < a_length; a++) {
                        numero_b++;
                        // criar blocos
                        blocos_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocos_jogaveis[a].setAttribute('class', 'bloco b_' + (a + 1));
                        // definir CSS
                        blocos_jogaveis[a].style.cssText = 'position:absolute;left:' + bloco_left[a] + 'px;bottom:' + bloco_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(blocos_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === bloco_left.length - 1) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + 'bloco dourado');
                        }
                        // se for vermelho
                        if (a === 5 || a === 17 || a === 18) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                    }
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocos
                        aux_s_jogaveis[c] = document.createElement('div');
                        // adicionar attributos
                        aux_s_jogaveis[c].setAttribute('class', 'aux aux_' + id_aux);
                        if (c === 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_vermelho');
                            cor = 'vermelho';
                            display = 'display:none;';
                        }
                        if (c < c_length && c > 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_verde');
                            cor = 'inactivo';
                            border = 'solid 1px #333333;';
                            display = 'display:block;';
                        }
                        // definir CSS
                        aux_s_jogaveis[c].style.cssText = 'position:absolute;left:' + aux_left[c] + 'px;bottom:' + aux_bottom[c] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/' + cor + '.png");' + display + 'border:' + border;
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(aux_s_jogaveis[c]);
                    }
                };
                nivel_3();
            } else if (nvi === 4) {
                var nivel_4 = function () {
                    // VARIAVEIS
                    var blocos_jogaveis = [], pedras_jogaveis = [], aux_s_jogaveis = [], bloco_left = [
                            100,
                            150,
                            250,
                            250,
                            330,
                            330,
                            450,
                            450,
                            530,
                            530,
                            490,
                            650,
                            650,
                            730,
                            730,
                            700,
                            800,
                            900,
                            950,
                            1100,
                            1200,
                            1300,
                            1400,
                            1400,
                            1300,
                            1200,
                            1100,
                            1200,
                            1300,
                            1300,
                            1200,
                            1250
                        ], bloco_bottom = [
                            210,
                            210,
                            210,
                            290,
                            290,
                            210,
                            110,
                            190,
                            190,
                            110,
                            330,
                            310,
                            390,
                            390,
                            310,
                            190,
                            190,
                            190,
                            190,
                            240,
                            340,
                            340,
                            240,
                            140,
                            40,
                            40,
                            140,
                            240,
                            240,
                            140,
                            140,
                            190
                        ], pedra_left = [
                            0,
                            40,
                            90,
                            0,
                            50,
                            290,
                            490,
                            690,
                            650,
                            750,
                            850,
                            1150,
                            1250,
                            1350,
                            1150,
                            1350,
                            1150,
                            1250,
                            1350
                        ], pedra_bottom = [
                            30,
                            120,
                            120,
                            210,
                            210,
                            250,
                            150,
                            350,
                            190,
                            190,
                            190,
                            290,
                            290,
                            290,
                            190,
                            190,
                            90,
                            90,
                            90
                        ], numero_a = 0, numero_b = 0, a, b, c, a_length = bloco_left.length, b_length = pedra_left.length,
                    // array aux_s
                        aux_left = [parseInt((bloco_left[0] + bloco_left[bloco_left.length - 1]) / 2)], aux_bottom = [30], id_aux = 0,
                    // b_length = pedra_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocos
                        aux_s_jogaveis[c] = document.createElement('div');
                        // adicionar attributos
                        aux_s_jogaveis[c].setAttribute('class', 'aux aux_' + id_aux);
                        if (c === 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_vermelho');
                            cor = 'vermelho';
                            display = 'display:none;';
                        }
                        if (c < c_length && c > 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_verde');
                            cor = 'inactivo';
                            border = 'solid 1px #333333;';
                            display = 'display:block;';
                        }
                        // definir CSS
                        aux_s_jogaveis[c].style.cssText = 'position:absolute;left:' + aux_left[c] + 'px;bottom:' + aux_bottom[c] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/' + cor + '.png");' + display + 'border:' + border;
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR BLOCOS PONTOS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocos
                        blocos_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocos_jogaveis[a].setAttribute('class', 'bloco b_' + (a + 1));
                        // definir CSS
                        blocos_jogaveis[a].style.cssText = 'position:absolute;left:' + bloco_left[a] + 'px;bottom:' + bloco_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(blocos_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === bloco_left.length - 1) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + 'bloco dourado');
                        }
                        // se for vermelho
                        if (a === 10) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                    }
                    // CRIAR PEDRAS
                    for (b = 0; b < b_length; b++) {
                        numero_b++;
                        // criar blocos
                        pedras_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        pedras_jogaveis[b].setAttribute('class', 'pedra');
                        // definir CSS
                        pedras_jogaveis[b].style.cssText = 'position:absolute;left:' + pedra_left[b] + 'px;bottom:' + pedra_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #2f0000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(pedras_jogaveis[b]);
                    }
                };
                nivel_4();
            } else if (nvi === 5) {
                var nivel_5 = function () {
                    // VARIAVEIS
                    var blocos_jogaveis = [], pedras_jogaveis = [], aux_s_jogaveis = [], bloco_left = [
                            20,
                            30,
                            40,
                            30,
                            20,
                            130,
                            200,
                            300,
                            340,
                            400,
                            500,
                            350,
                            550,
                            600,
                            560,
                            640,
                            650,
                            200,
                            200,
                            850
                        ], bloco_bottom = [
                            30,
                            110,
                            190,
                            270,
                            340,
                            190,
                            230,
                            230,
                            280,
                            380,
                            285,
                            130,
                            130,
                            130,
                            230,
                            330,
                            30,
                            30,
                            130,
                            190
                        ], pedra_left = [
                            200,
                            250,
                            300,
                            350,
                            400,
                            450,
                            500,
                            550,
                            600,
                            650,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            50,
                            100,
                            150,
                            150,
                            150,
                            150,
                            150,
                            150,
                            150,
                            150,
                            150,
                            250,
                            250,
                            250,
                            250,
                            250,
                            250,
                            250,
                            350,
                            350,
                            350,
                            350,
                            450,
                            300,
                            400,
                            450,
                            500,
                            350,
                            450,
                            550,
                            550,
                            550,
                            550,
                            500,
                            450,
                            450,
                            550,
                            550,
                            650,
                            650,
                            650,
                            650,
                            650,
                            650,
                            700,
                            750,
                            750,
                            750,
                            750,
                            750,
                            750,
                            750,
                            750,
                            750,
                            800,
                            800,
                            850,
                            900,
                            900,
                            900,
                            900,
                            850,
                            800
                        ], pedra_bottom = [
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            30,
                            80,
                            130,
                            180,
                            230,
                            280,
                            330,
                            380,
                            430,
                            480,
                            480,
                            480,
                            480,
                            30,
                            80,
                            130,
                            180,
                            230,
                            280,
                            330,
                            380,
                            430,
                            380,
                            330,
                            230,
                            180,
                            130,
                            30,
                            230,
                            280,
                            330,
                            380,
                            380,
                            130,
                            130,
                            130,
                            130,
                            80,
                            30,
                            430,
                            380,
                            330,
                            280,
                            280,
                            280,
                            180,
                            230,
                            80,
                            130,
                            180,
                            230,
                            280,
                            330,
                            380,
                            480,
                            480,
                            430,
                            380,
                            330,
                            230,
                            180,
                            130,
                            80,
                            30,
                            230,
                            180,
                            180,
                            180,
                            230,
                            280,
                            330,
                            330,
                            330
                        ], numero_a = 0, numero_b = 0, a, b, c, a_length = bloco_left.length, b_length = pedra_left.length,
                    // array aux_s
                        aux_left = [parseInt((bloco_left[0] + bloco_left[bloco_left.length - 1]) / 2)], aux_bottom = [30], id_aux = 0,
                    // b_length = pedra_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocos
                        aux_s_jogaveis[c] = document.createElement('div');
                        // adicionar attributos
                        aux_s_jogaveis[c].setAttribute('class', 'aux aux_' + id_aux);
                        if (c === 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_vermelho');
                            cor = 'vermelho';
                            display = 'display:none;';
                        }
                        if (c < c_length && c > 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_verde');
                            cor = 'inactivo';
                            border = 'solid 1px #333333;';
                            display = 'display:block;';
                        }
                        // definir CSS
                        aux_s_jogaveis[c].style.cssText = 'position:absolute;left:' + aux_left[c] + 'px;bottom:' + aux_bottom[c] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/' + cor + '.png");' + display + 'border:' + border;
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR BLOCOS PONTOS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocos
                        blocos_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocos_jogaveis[a].setAttribute('class', 'bloco b_' + numero_a);
                        // definir CSS
                        blocos_jogaveis[a].style.cssText = 'position:absolute;left:' + bloco_left[a] + 'px;bottom:' + bloco_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #333333;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(blocos_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === bloco_left.length - 1) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + 'bloco dourado');
                        }
                        // se for vermelho
                        if (a === 5 || a === 8 || a === 10 || a === 18) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                        // laranja_pontos
                        if (a === 6 || a === 9 || a === 13 || a === 14 || a === 16) {
                            numero_a++;
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' laranja_3');
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                            numero_a++;
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                        }
                    }
                    // CRIAR PEDRAS
                    for (b = 0; b < b_length; b++) {
                        numero_b++;
                        // criar blocos
                        pedras_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        pedras_jogaveis[b].setAttribute('class', 'pedra');
                        // definir CSS
                        pedras_jogaveis[b].style.cssText = 'position:absolute;left:' + pedra_left[b] + 'px;bottom:' + pedra_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #000000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(pedras_jogaveis[b]);
                    }
                };
                nivel_5();
            } else if (nvi === 6) {
                var nivel_6 = function () {
                    // VARIAVEIS
                    var blocos_jogaveis = [], pedras_jogaveis = [], aux_s_jogaveis = [],
                    // array blocos pontos
                        bloco_left = [
                            150,
                            200,
                            250,
                            150,
                            400,
                            500,
                            450,
                            450,
                            650,
                            650,
                            950,
                            1000,
                            950,
                            900,
                            1000,
                            1100,
                            1150,
                            1200,
                            1250,
                            1300,
                            1350,
                            1400
                        ], bloco_bottom = [
                            80,
                            80,
                            80,
                            180,
                            130,
                            130,
                            130,
                            300,
                            80,
                            275,
                            380,
                            180,
                            180,
                            30,
                            30,
                            30,
                            80,
                            130,
                            130,
                            230,
                            280,
                            30
                        ],
                    // array pedras
                        pedra_left = [
                            100,
                            100,
                            100,
                            200,
                            200,
                            200,
                            300,
                            300,
                            300,
                            450,
                            450,
                            450,
                            600,
                            700,
                            600,
                            650,
                            700,
                            850,
                            850,
                            850,
                            850,
                            850,
                            850,
                            850,
                            850,
                            850,
                            900,
                            950,
                            1000,
                            1050,
                            1050,
                            1050,
                            1050,
                            1050,
                            1050,
                            1050,
                            1050,
                            950,
                            950,
                            950,
                            950,
                            1050,
                            1000,
                            1300,
                            1200,
                            1350,
                            1150,
                            1200,
                            1250,
                            1300,
                            1350,
                            1450,
                            1200,
                            1250,
                            1300,
                            1350,
                            1450,
                            1300,
                            1350,
                            1450,
                            1300,
                            1350,
                            1450,
                            1350,
                            1450,
                            1450,
                            1450,
                            1450,
                            1450,
                            1450
                        ], pedra_bottom = [
                            80,
                            130,
                            180,
                            30,
                            180,
                            230,
                            80,
                            130,
                            180,
                            30,
                            80,
                            400,
                            80,
                            80,
                            30,
                            30,
                            30,
                            30,
                            80,
                            130,
                            180,
                            230,
                            280,
                            380,
                            430,
                            480,
                            480,
                            480,
                            480,
                            480,
                            430,
                            380,
                            330,
                            280,
                            230,
                            180,
                            130,
                            280,
                            330,
                            130,
                            30,
                            30,
                            130,
                            180,
                            80,
                            230,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            80,
                            80,
                            80,
                            80,
                            80,
                            130,
                            130,
                            130,
                            180,
                            180,
                            180,
                            230,
                            230,
                            280,
                            330,
                            380,
                            430,
                            480
                        ],
                    // array aux_s
                        aux_left = [
                            parseInt((bloco_left[0] + bloco_left[bloco_left.length - 1]) / 2),
                            515,
                            800,
                            650,
                            900,
                            1250,
                            1400,
                            1400,
                            1400,
                            1400,
                            1400,
                            1400
                        ], aux_bottom = [
                            30,
                            300,
                            330,
                            130,
                            280,
                            180,
                            80,
                            130,
                            180,
                            230,
                            280,
                            330
                        ], numero_a = 0, id_aux = 0, a, b, c,
                    // comprimento das arrays
                        a_length = bloco_left.length, b_length = pedra_left.length, c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = '';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocos
                        aux_s_jogaveis[c] = document.createElement('div');
                        // adicionar attributos
                        aux_s_jogaveis[c].setAttribute('class', 'aux aux_' + id_aux);
                        if (c === 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_vermelho');
                            cor = 'vermelho';
                            display = 'display:none';
                        }
                        if (c < c_length && c > 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_verde');
                            cor = 'inactivo';
                            border = 'solid 1px #333333;';
                        }
                        // definir CSS
                        aux_s_jogaveis[c].style.cssText = 'position:absolute;left:' + aux_left[c] + 'px;bottom:' + aux_bottom[c] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/' + cor + '.png");' + display + 'border:' + border;
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR BLOCOS PONTOS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocos
                        blocos_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocos_jogaveis[a].setAttribute('class', 'bloco b_' + numero_a);
                        // definir CSS
                        blocos_jogaveis[a].style.cssText = 'position:absolute;left:' + bloco_left[a] + 'px;bottom:' + bloco_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #333333;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(blocos_jogaveis[a]);
                        // TIPOS DE BLOCOS
                        // dourado
                        if (a === bloco_left.length - 1) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + 'bloco dourado');
                        }
                        // vermelho
                        if (a === 6 || a === 8 || a === 15) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                        // 3 pontos
                        if (a === 1 || a === 7 || a === 10 || a === 18 || a === 20) {
                            numero_a++;
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' laranja_3');
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                            numero_a++;
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                        }
                    }
                    // fim blocos pontos
                    // CRIAR PEDRAS
                    for (b = 0; b < b_length; b++) {
                        // criar blocos
                        pedras_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        pedras_jogaveis[b].setAttribute('class', 'pedra');
                        // definir CSS
                        pedras_jogaveis[b].style.cssText = 'position:absolute;left:' + pedra_left[b] + 'px;bottom:' + pedra_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #000000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(pedras_jogaveis[b]);
                    }
                };
                nivel_6();
            } else if (nvi === 7) {
                var nivel_7 = function () {
                    // VARIAVEIS
                    var blocos_jogaveis = [], pedras_jogaveis = [], aux_s_jogaveis = [],
                    // array blocos pontos
                        bloco_left = [
                            400,
                            350,
                            300,
                            500,
                            450,
                            500,
                            450,
                            400,
                            350,
                            600,
                            700,
                            750,
                            700,
                            600,
                            800,
                            900,
                            1000,
                            1000
                        ], bloco_bottom = [
                            30,
                            100,
                            100,
                            100,
                            100,
                            330,
                            380,
                            380,
                            380,
                            380,
                            330,
                            330,
                            180,
                            230,
                            80,
                            280,
                            80,
                            400
                        ],
                    // array pedras
                        pedra_left = [
                            80,
                            0,
                            160,
                            80,
                            200,
                            150,
                            250,
                            250,
                            250,
                            250,
                            250,
                            250,
                            250,
                            250,
                            // 14 e 15
                            250,
                            250,
                            300,
                            350,
                            // 18
                            400,
                            450,
                            500,
                            350,
                            350,
                            400,
                            450,
                            300,
                            350,
                            400,
                            450,
                            500,
                            550,
                            600,
                            650,
                            700,
                            750,
                            // 35
                            550,
                            550,
                            550,
                            550,
                            550,
                            550,
                            550,
                            550,
                            550,
                            600,
                            650,
                            // 46
                            700,
                            700,
                            700,
                            750,
                            700,
                            800,
                            850,
                            850,
                            850,
                            850,
                            850,
                            850,
                            // 58,59,60
                            850,
                            900,
                            850,
                            850,
                            850,
                            800,
                            750,
                            700,
                            650,
                            600,
                            // 69 e 72
                            600,
                            650,
                            750,
                            800,
                            700,
                            700,
                            // 74
                            900,
                            900,
                            950,
                            900,
                            950,
                            1000,
                            1100,
                            1150,
                            900,
                            950,
                            1000,
                            1050,
                            1100,
                            1150,
                            1200,
                            900,
                            950,
                            1000,
                            1050,
                            1100,
                            1150,
                            1200,
                            1250,
                            950,
                            1000,
                            1050,
                            1100,
                            1150,
                            1200,
                            1250,
                            1300,
                            900,
                            950,
                            1000,
                            1050,
                            1100,
                            1150,
                            1200,
                            1250,
                            1300,
                            1350,
                            900,
                            950,
                            1000,
                            1050,
                            1100,
                            1150,
                            1200,
                            1250,
                            1300,
                            1350,
                            1400,
                            900,
                            950,
                            1000,
                            1050,
                            1100,
                            1150,
                            1200,
                            1250,
                            1300,
                            1350,
                            1400,
                            1450
                        ], pedra_bottom = [
                            140,
                            240,
                            240,
                            340,
                            390,
                            490,
                            80,
                            130,
                            180,
                            230,
                            330,
                            380,
                            430,
                            480,
                            // 14 e 15
                            30,
                            280,
                            230,
                            230,
                            // 18
                            230,
                            230,
                            230,
                            280,
                            330,
                            330,
                            330,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            480,
                            // 35
                            430,
                            380,
                            330,
                            280,
                            230,
                            180,
                            130,
                            80,
                            30,
                            330,
                            330,
                            // 46
                            380,
                            430,
                            280,
                            280,
                            330,
                            480,
                            480,
                            430,
                            380,
                            330,
                            280,
                            230,
                            // 58,59,60
                            180,
                            180,
                            130,
                            80,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            // 69 e 72
                            180,
                            180,
                            180,
                            180,
                            80,
                            130,
                            430,
                            380,
                            380,
                            330,
                            330,
                            330,
                            330,
                            330,
                            280,
                            280,
                            280,
                            280,
                            280,
                            280,
                            280,
                            230,
                            230,
                            230,
                            230,
                            230,
                            230,
                            230,
                            230,
                            180,
                            180,
                            180,
                            180,
                            180,
                            180,
                            180,
                            180,
                            130,
                            130,
                            130,
                            130,
                            130,
                            130,
                            130,
                            130,
                            130,
                            130,
                            80,
                            80,
                            80,
                            80,
                            80,
                            80,
                            80,
                            80,
                            80,
                            80,
                            80,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30,
                            30
                        ],
                    // array aux_s
                        aux_left = [
                            parseInt((bloco_left[0] + bloco_left[bloco_left.length - 1]) / 2),
                            300,
                            800,
                            650,
                            650
                        ], aux_bottom = [
                            30,
                            330,
                            330,
                            80,
                            380
                        ], numero_a = 0, id_aux = 0, a, b, c,
                    // comprimento das arrays
                        a_length = bloco_left.length, b_length = pedra_left.length, c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocos
                        aux_s_jogaveis[c] = document.createElement('div');
                        // adicionar attributos
                        aux_s_jogaveis[c].setAttribute('class', 'aux aux_' + id_aux);
                        if (c === 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_vermelho');
                            cor = 'vermelho';
                            display = 'display:none;';
                        }
                        if (c < c_length && c > 0) {
                            // adicionar attributos
                            aux_s_jogaveis[c].setAttribute('id', 'aux_verde');
                            cor = 'inactivo';
                            border = 'solid 1px #333333;';
                            display = 'display:block;';
                        }
                        // definir CSS
                        aux_s_jogaveis[c].style.cssText = 'position:absolute;left:' + aux_left[c] + 'px;bottom:' + aux_bottom[c] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/' + cor + '.png");' + display + 'border:' + border;
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR BLOCOS PONTOS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocos
                        blocos_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocos_jogaveis[a].setAttribute('class', 'bloco b_' + numero_a);
                        // definir CSS
                        blocos_jogaveis[a].style.cssText = 'position:absolute;left:' + bloco_left[a] + 'px;bottom:' + bloco_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #333333;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(blocos_jogaveis[a]);
                        // TIPOS DE BLOCOS
                        // dourado
                        if (a === bloco_left.length - 1) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + 'bloco dourado');
                        }
                        // vermelho
                        if (a === 0 || a === 12 || a === 14) {
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                        // 3 pontos
                        if (a === 2 || a === 3 || a === 6 || a === 8 || a === 10 || a === 13 || a === 15) {
                            numero_a++;
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' laranja_3');
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                            numero_a++;
                            blocos_jogaveis[a].setAttribute('class', blocos_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                        }
                    }
                    // fim blocos pontos
                    // CRIAR PEDRAS
                    for (b = 0; b < b_length; b++) {
                        // criar blocos
                        pedras_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        pedras_jogaveis[b].setAttribute('class', 'pedra');
                        // definir CSS
                        pedras_jogaveis[b].style.cssText = 'position:absolute;left:' + pedra_left[b] + 'px;bottom:' + pedra_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #000000;';
                        // adicionar blocos ao jogo
                        background_jogo.appendChild(pedras_jogaveis[b]);
                        // bombas
                        if (b === 14 || b === 15 || b === 18 || b === 35 || b === 46 || b === 50 || b === 58 || b === 59 || b === 60 || b === 69 || b === 72 || b === 77 || b === 78 || b === 80 || b === 82 || b === 83 || b === 86 || b === 87 || b === 89 || b === 90 || b === 91 || b === 94 || b === 98 || b === 100 || b === 101 || b === 107 || b === 108 || b === 109 || b === 117) {
                            pedras_jogaveis[b].setAttribute('class', pedras_jogaveis[b].getAttribute('class') + ' dinamite');
                        }
                    }
                };
                nivel_7();
            }
        },

        espetaculo_nivel: function (nivel) {

            // adicionar event listener
            document.addEventListener('keyup', function menu_jogo(vars) {
                switch (vars.keyCode) {
                    case 32:
                        gosquares.gravidade();
                        document.removeEventListener('keyup', menu_jogo, false);
                        break;
                    case 13:
                        gosquares.gravidade();
                        document.removeEventListener('keyup', menu_jogo, false);
                        break;
                }
            }, false);
        },

        espetaculo_pontos: function () {
            // n do proximo nivel
            janela_pontos = document.createElement('div');
            janela_pontos.setAttribute('id', 'janela_pontos');
            janela_pontos.style.cssText = 'position:absolute;width:300px;height:300px;left:175px;top:100px;background:#eeeeee;box-shadow:0 0 20px #777777;font-weight:bold';
            janela_pontos.innerHTML = '<p style="line-height:50px;font-size:30px;text-align:center;color:#555555;font-family:arial;text-transform:lowercase;">succeed</p><p style="line-height:50px;font-size:25px;text-align:center;color:#fe9901;font-family:arial;text-transform:lowercase;">level ' + nvi + ' cleared!</p><button id="botao_pontos" onclick="gosquares.conteudos()" style="text-align:center;background:#dddddd;color:#555555;margin:0px auto;display:block;clear:both;cursor:pointer;box-shadow:0 0 5px #888888;border:2px solid #dddddd;font-size:40px;line-heigth:20px;">' + pvi + ' points!</button>';
            janela_jogo.appendChild(janela_pontos);
            // adicionar event listener
            document.addEventListener('keyup', function menu_jogo(vars) {
                nvi++;
                switch (vars.keyCode) {
                    case 32:
                        gosquares.start();
                        document.removeEventListener('keyup', menu_jogo, false);
                        break;
                    case 13:
                        gosquares.start();
                        document.removeEventListener('keyup', menu_jogo, false);
                        break;
                }
            }, false);
            var botao_pontos = document.getElementById('botao_pontos'),
                c_pontos = 1;

            // correr pontuao
            function correr_pontos() {
                if (0 <= c_pontos && parseInt(pvi * 0.1) >= c_pontos) {
                    c_pontos = c_pontos + 2;
                    botao_pontos.innerHTML = c_pontos + ' points!';
                } else if (parseInt(pvi * 0.1) + 1 <= c_pontos && c_pontos <= parseInt(pvi * 0.3)) {
                    c_pontos = c_pontos + 4;
                    botao_pontos.innerHTML = c_pontos + ' points!';
                } else if (parseInt(pvi * 0.3) + 1 <= c_pontos && c_pontos <= parseInt(pvi * 0.8)) {
                    c_pontos = c_pontos + 6;
                    botao_pontos.innerHTML = c_pontos + ' points!';
                } else if (parseInt(pvi * 0.8) + 1 <= c_pontos && c_pontos <= parseInt(pvi * 0.9)) {
                    c_pontos = c_pontos + 4;
                    botao_pontos.innerHTML = c_pontos + ' points!';
                } else if (c_pontos >= parseInt(pvi * 0.9) + 1 && c_pontos < pvi && c_pontos + 2 < pvi) {
                    c_pontos = c_pontos + 2;
                    botao_pontos.innerHTML = c_pontos + ' points!';
                } else {
                    clearInterval(int_correr_pontos);
                    botao_pontos.innerHTML = pvi + ' points!';
                }
            }

            var int_correr_pontos = setInterval(correr_pontos, 1);
        },

        e_blocos: function (bloco_aux, bloco_aux_css, bloco_aux_class) {
            var e_aum = 0;
            bloco_aux.style.cssText = bloco_aux_css + ';opacity:0';
            bloco_aux.style.display = 'block';
            // aumentar opacidade
            var a_op = function () {
                e_aum = e_aum + 0.05;
                bloco_aux.style.opacity = e_aum;
                // limpar intervalo
                if (bloco_aux.style.opacity >= 0.9) {
                    clearInterval(i_a_op);
                    bloco_aux.style.opacity = 1;
                    bloco_aux.setAttribute('class', bloco_aux_class);
                }
            };

            var i_a_op = setInterval(a_op, 50);
        },

        cenario_bomba: function (bomba_bips, estado_som, pedra_tnt) {
            var bomba = function () {
                bomba_bips++;
                // iniciar relogio bomba 3 segundos
                if (estado_som === -1) {
                    // som salto
                    som_tic_tac_bomba.play();
                }
                if (bomba_bips === 1) {
                    pedra_tnt.style.background = 'url("src/min/images/dinamite.png")';
                    e_num_f(3, 'perigo');
                }
                if (bomba_bips === 3) {
                    pedra_tnt.style.background = 'url("src/min/images/dinamite.png")';
                    e_num_f(1, 'perigo');
                }
                if (bomba_bips === 2) {
                    pedra_tnt.style.background = 'url("src/min/images/cinzento.png")';
                    e_num_f(2, 'perigo');
                }
                if (bomba_bips === 4) {
                    if (estado_som === -1) {
                        som_bomba_rebenta.play();
                    }
                    e_num_f('BOOOOOMMM', 'perigo');
                    pedra_tnt.style.display = 'none';
                    clearInterval(i_bomba);
                    // se a personagem estiver proxima
                    var v_proximidade = personagem.offsetLeft - pedra_tnt.offsetLeft;
                    // se ...
                    if (v_proximidade > -100 && v_proximidade < 100) {
                        // efeito bomba
                        e_bomba(v_proximidade);
                        pedra_tnt.style.cssText = '';
                    }
                }
            };

            var i_bomba = setInterval(bomba, 1000);
        },

        e_bomba: function (v_proximidade) {
            // salto para esquerda
            if (v_proximidade < 0) {
                det_obj_pers(38, -23);
                // function afastar
                var afastar_bomba_e = function () {
                    // redefinir class
                    personagem.setAttribute('class', personagem.getAttribute('class').replace('dir_i', 'dir_p'));
                    det_obj_pers(37, 'nada');
                    // parar evento listener
                    if (personagem.getAttribute('class').search('cima_i') === -1) {
                        clearInterval(i_afastar_bomba_e);
                        // redefinir class
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('esq_i', 'esq_p'));
                    }
                };
                var i_afastar_bomba_e = setInterval(afastar_bomba_e, 30);
            }  // salto para direita
            else if (v_proximidade > 0) {
                // fazer saltar
                det_obj_pers(38, -23);
                // function afastar
                var afastar_bomba = function () {
                    if (personagem.getAttribute('class').search('esq_i') !== -1) {
                        // redefinir class
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('esq_i', 'esq_p'));
                    }
                    det_obj_pers(39, 'nada');
                    // parar evento listener
                    if (personagem.getAttribute('class').search('cima_i') === -1) {
                        clearInterval(i_afastar_bomba);
                        // redefinir class
                        personagem.setAttribute('class', personagem.getAttribute('class').replace('dir_i', 'dir_p'));
                    }
                };
                var i_afastar_bomba = setInterval(afastar_bomba, 30);
            }
        },

        e_num_f: function (id_bloco, motivo) {
            var e_numero = document.getElementById('e_numero');
            if (e_numero !== null) {
                e_numero.innerHTML = '';
                e_numero.parentNode.removeChild(e_numero);
            } else {
                // Criar efeito
                e_numero = document.createElement('span');
                e_numero.setAttribute('id', 'e_numero');
                e_numero.style.cssText = 'position:absolute;color:#ffffff;font-weight:bold;right:' + janela_jogo.offsetWidth / 2 + 'px;top:' + janela_jogo.offsetHeight / 2 + 'px;z-index:100;opacity:1.0;font-size:60px;';
                e_numero.innerHTML = id_bloco;
                janela_jogo.appendChild(e_numero);
                e_numero = document.getElementById('e_numero');
                e_numero.style.left = janela_jogo.offsetWidth / 2 - e_numero.offsetWidth / 2 + 'px';
                e_numero.style.top = janela_jogo.offsetHeight / 2 - e_numero.offsetHeight / 2 + 'px';
            }
            if (id_bloco === '?' || motivo === 'perigo') {
                e_numero.style.color = 'red';
            }
            var e_num_i = function () {
                // novo width efeito
                e_numero.style.width = e_numero.innerHTML.length * parseInt(e_numero.style.fontSize) / 2 + 'px';
                // novo left e novo top
                e_numero.style.left = janela_jogo.offsetWidth / 2 - e_numero.offsetWidth / 2 + 'px';
                e_numero.style.top = janela_jogo.offsetHeight / 2 - e_numero.offsetHeight / 2 + 'px';
                // novo font-size
                e_numero.style.fontSize = parseInt(e_numero.style.fontSize, 10) + 8 + 'px';
                // diminuir a opacidade 3*0.01
                e_numero.style.opacity = e_numero.style.opacity - 0.03;
                // depois de concluido eliminar o efeito
                if (e_numero.style.opacity < 0.05 || document.getElementById('e_numero') === null) {
                    clearInterval(i_e_font_pontos);
                    e_numero.innerHTML = '';
                    if (document.getElementById('e_numero') !== null) {
                        e_numero.parentNode.removeChild(e_numero);
                    }
                }
            };

            var i_e_font_pontos = setInterval(e_num_i, 10);
        },

        e_bloco_verde: function (bloco_verde) {
            // bloco
            var bloco_aux = bloco_verde,
            // gravar atributos e propriedades do bloco
                bloco_aux_id = bloco_verde.getAttribute('id'), bloco_aux_class = bloco_verde.getAttribute('class'), bloco_aux_css = bloco_verde.style.cssText,
            // numero do aux
                b_aux_id = bloco_verde.getAttribute('class').split(' ')[1].split('_')[1],
            // estado bloco aux
                e_b_aux = bloco_aux_class.search('activo');
            if (e_b_aux === -1) {
                // actualizar estado do bloco
                bloco_aux.setAttribute('class', bloco_aux_class + ' activo');
                var e_b_verde = function () {
                    // se tiver 0 de height desaparece
                    if (bloco_aux.offsetHeight < 3) {
                        // actualizar estado do bloco
                        bloco_aux.setAttribute('class', '');
                        bloco_aux.style.cssText = '';
                        clearInterval(i_e_b_verde);
                        //	actualizar detectar blocos
                        det_obj_pers(0, 1);
                        var i_e_r_b_verde = setTimeout(function () {
                            clearInterval(i_e_r_b_verde);
                            // reintroduzir propriedades no bloco
                            e_blocos(bloco_aux, bloco_aux_css, bloco_aux_class);
                        }, 5000);
                    }
                    // actualizar estado do bloco
                    bloco_aux.style.height = (bloco_aux.offsetHeight - 1) + 'px';
                    bloco_aux.style.bottom = (bloco_aux.offsetBottom + 1) + 'px';
                };
                var i_e_b_verde = setInterval(e_b_verde, 20);
            }
        },

        // Init, constructor
        init: function () {
            // Start from the first level
            this.start();
        }
    };