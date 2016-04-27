// START Application

// Globals
var body = document.getElementsByTagName('body')[0],
    window_game = document.getElementById('window_game'),
    window_level = document.getElementById('window_level'),
    background_game = document.getElementById('background_game'),
    hero = document.getElementById('hero'),
    time_value = document.getElementById('time_value'),
    points_value = document.getElementById('points_value'),
    falls_value = document.getElementById('falls_value'),
    fails_value = document.getElementById('fails_value'),
    level_value = document.getElementById('level_value'),
    sound = document.getElementById('sound'),
    pvi = parseInt(points_value.innerHTML),
    qvi = parseInt(falls_value.innerHTML),
    fvi = parseInt(fails_value.innerHTML),
    nvi = parseInt(level_value.innerHTML),
    sound_salto = new Audio('src/fx/mp3/salto.mp3'),
    sound_caixa_azul = new Audio('src/fx/mp3/caixa_azul.mp3'),
    sound_caixa_laranja = new Audio('src/fx/mp3/caixa_laranja.mp3'),
    sound_caixa_vermelha = new Audio('src/fx/mp3/caixa_vermelha.mp3'),
    sound_caixa_dourada = new Audio('src/fx/mp3/caixa_dourada.mp3'),
    sound_tic_tac_bomb = new Audio('src/fx/mp3/tic_tac_bomba.mp3'),
    sound_bomb_rebenta = new Audio('src/fx/mp3/bomba_rebenta.mp3'),

    // Application
    gosquares = {

        start: function () {
            // Criar game
            this.criacao_game(body, nvi);

            // Centrar game
            this.centrar_window_game();

            // Criar level
            this.level(nvi);

            // Criar hero
            this.hero(nvi);

            // Effeitos do level
            this.espetaculo_level(nvi);
        },

        loading_conteudos: function () {

            // Preload src/images
            var load_images = [],
                load_fx = [],
                loading_pic,
                loading_sound,
                a,
                b;

            // Array de src/images
            load_images = [
                'hero_inicio',
                'fundo',
                'fundo_2',
                'fundo_3',
                'fundo_4',
                'inactivo',
                'activo',
                'vermelho',
                'dourado',
                'hero_0_esq',
                'hero_0_dir'
            ];

            // Loop de src/images
            for (a = 0; a < load_images.length; a++) {
                loading_pic = new Image();
                loading_pic.src = 'src/min/images/' + load_images[a] + '.png';
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
                loading_sound = new Audio();
                loading_sound.src = 'src/fx/mp3/' + load_fx[b] + '.mp3';
            }
        },

        criacao_game: function (body, nvi) {
            // adicionar window de game
            var pic_background = '';

            switch (nvi) {
                case 1:
                    pic_background = "url('src/min/images/fundo_1.png')";
                    break;
                case 2:
                    pic_background = "url('src/min/images/fundo_1.png')";
                    break;
                case 3:
                    pic_background = "url('src/min/images/fundo_1.png')";
                    break;
                case 4:
                    pic_background = "url('src/min/images/fundo_2.png')";
                    break;
                case 5:
                    pic_background = "url('src/min/images/fundo_2.png')";
                    break;
                case 6:
                    pic_background = "url('src/min/images/fundo_2.png')";
                    break;
                case 7:
                    pic_background = "url('src/min/images/fundo_3.png')";
                    break;
            }

            // adicionar background do level
            background_game.style.cssText += 'background: ' + pic_background + ' left bottom;';
            hero.style.cssText += 'background: url("src/min/images/personagem_0_dir.png"); ';
        },

        removerfx: function () {
            sound.setAttribute('class', 'silencio');
        },

        centrar_window_game: function () {
            // ID window game
            var eixo_x = (window.innerWidth - window_game.offsetWidth) / 2,
                eixo_y = (window.innerHeight - window_game.offsetHeight) / 2;

            // Definir Margens em function do calculo
            window_game.style.top = eixo_y + 'px';
            window_game.style.left = eixo_x + 'px';

            // Display window
            window_game.style.opacity = '1';
        },

        game_events: function () {
            var movimentos = 0,
                i_f_game = window_game.getAttribute('class').search('inicio'),
                teclaSolta,
                teclaPresa,
                segundos = 0,
                minutos = 0,
                restantes = 0;

            // Init time counter
            if (i_f_game !== -1) {
                segundos++;
                minutos = parseInt(segundos / 60);
                restantes = segundos - minutos * 60;
                if (minutos < 10) {
                    if (restantes < 10) {
                        time_value.innerHTML = '0' + minutos + ' : 0' + restantes;
                    } else if (restantes > 9) {
                        time_value.innerHTML = '0' + minutos + ' : ' + restantes;
                    }
                } else if (minutos > 9) {
                    if (restantes < 10) {
                        time_value.innerHTML = minutos + ' : 0' + restantes;
                    } else if (restantes > 9) {
                        time_value.innerHTML = minutos + ' : ' + restantes;
                    }
                }
            }

            // se a classe inicio for declarada
            if (movimentos === 0 && i_f_game !== -1 || segundos > 0 && i_f_game === -1) {
                movimentos = -1;

                // Listen when stop left or right keys/moves
                document.addEventListener('keyup', function teclaSolta(vars) {
                    switch (vars.keyCode) {
                        case 37:
                            // redefinir class
                            hero.setAttribute('class', hero.getAttribute('class').replace('right_init', 'right_stop'));
                            break;
                        case 39:
                            // redefinir class
                            hero.setAttribute('class', hero.getAttribute('class').replace('left_init', 'left_stop'));
                            break;
                    }
                }, false);

                // Listen when start top, right and left keys/moves
                document.addEventListener('keydown', function teclaPresa(event) {
                    if (hero.getAttribute('class') !== null) {
                        var up_init = hero.getAttribute('class').search('up_init'),
                            left_init = hero.getAttribute('class').search('left_init'),
                            down_init = hero.getAttribute('class').search('down_init'),
                            right_init = hero.getAttribute('class').search('right_init'),
                            up_stop = hero.getAttribute('class').search('up_stop'),
                            left_stop = hero.getAttribute('class').search('left_stop'),
                            down_stop = hero.getAttribute('class').search('down_stop'),
                            right_stop = hero.getAttribute('class').search('right_stop');

                        switch (event.keyCode) {
                            // esquerda
                            case 37:
                                // se estiver parado, inicia esquerda
                                if (right_init === -1) {
                                    if (left_init !== -1) {
                                        hero.setAttribute('class', hero.getAttribute('class').replace('left_init', 'left_stop'));
                                    }
                                    hero.setAttribute('class', hero.getAttribute('class').replace('right_stop', 'right_init'));
                                }
                                break;
                            // salto
                            case 38:
                            case 32:
                                // se estiver no cho inicia salto
                                if (up_init === -1 && down_init === -1) {
                                    hero.setAttribute('class', hero.getAttribute('class').replace('up_stop', 'up_init'));
                                }
                                break;
                            // direita
                            case 39:
                                // se estiver parado, inicia direita
                                if (left_init === -1) {
                                    if (right_init !== -1) {
                                        hero.setAttribute('class', hero.getAttribute('class').replace('right_init', 'right_stop'));
                                    }
                                    // redefinir class
                                    hero.setAttribute('class', hero.getAttribute('class').replace('left_stop', 'left_init'));
                                }
                                break;
                        }
                    }
                }, false);
                if (segundos > 0 && i_f_game === -1) {
                    // se game acabar
                    document.removeEventListener('keyup', teclaSolta, false);
                    document.removeEventListener('keydown', teclaPresa, false);
                }
            }

            // Se window game detectar classe parar o time para!
            if (i_f_game === -1 && segundos > 0) {
                clearInterval(gosquares.timerizador_inicio);
            }
        },

        hero: function (nvi) {

            if (nvi === 5) {
                hero.style.left = '100px';
            } else {
                hero.style.left = '150px';
            }
        },

        gravity: function () {
            // Variavel que engloba o quadradinho
            var aumentador = 0,
                graus = 0,
                variavel = 3.12;

            // Remove presentation window
            window_level.parentNode.removeChild(window_level);

            // function que os atirar para a terra
            var gravity_accao = function () {
                aumentador++;
                hero.style.webkitTransform = 'rotate(' + graus + 'deg)';
                graus = variavel * aumentador;
                hero.style.top = (hero.offsetTop + 4) + 'px';

                if (window_game.offsetHeight - hero.offsetHeight - 30 <= hero.offsetTop) {
                    clearInterval(correr_gravity);
                    hero.setAttribute('class', 'right_stop left_stop up_stop down_stop');
                    hero.style.webkitTransform = '';
                    window_game.setAttribute('class', 'inicio');

                    // Loop to verify user actions
                    gosquares.timerizador_inicio = setInterval(gosquares.game_events(), 1000);

                    // mover hero (function)
                    gosquares.realtime_game_fps();
                }
            };

            // Variavel que correr a gravity sobre o boneco
            var correr_gravity = setInterval(gravity_accao, 20);
        },

        realtime_game_fps: function () {

            // Variaveis movimentos responsaveis
            var array_blocks = document.getElementsByClassName('block'),
                array_stones = document.getElementsByClassName('stone'),
                array_aux_s = document.getElementsByClassName('aux'),
                a,
                a_length = array_blocks.length,
                b,
                b_length,
                c,
                d,
                e,
                e_length = array_stones.length,
                f,
                f_length = array_aux_s.length,
                tecla,
                T1 = hero.offsetTop,
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
                Tbase = window_game.offsetHeight - hero.offsetHeight - 30,
                state_sound,
                state_class_jj,
                state_class_hero = hero.getAttribute('class'),
                blocks = [],
                quad_wh,
                quad_top,
                quad_left,
                quad_bottom,
                quad_rigth,
                block,
                stones = [],
                stone_wh,
                stone_top,
                stone_left,
                stone_bottom,
                stone_rigth,
                stone,
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
                up_init,
                left_init,
                down_init,
                right_init,
                up_stop,
                left_stop,
                down_stop,
                right_stop,
                per_back_esq_s,
                per_back_dir_s,
                per_back_esq,
                per_back_dir,
                L_background_game,
                W_background_game,
                W_per,
                i_game_p, valor_cima = -27,
                det_block,
                caixa_azul,
                caixa_dourada,
                caixa_laranja_3,
                caixa_laranja_2,
                caixa_laranja_1,
                caixa_laranja,
                caixa_vermelha,
                id_block,
                b_activo,
                ligar_block,
                id_block_ant,
                primeiro_block = 0,
                ultimo_block = 0,
                tipo_salto,
                block_aux_id,
                block_aux_class,
                d_stones,
                d_blocks,
                d_aux_s,
                colisao;

            // RECEBER VALORES
            // blocks
            for (a = 0; a < a_length; a++) {
                // Variaveis com dimensoes e posies do block
                quad_wh = array_blocks[a].offsetWidth;
                quad_top = array_blocks[a].offsetTop;
                quad_left = array_blocks[a].offsetLeft;
                quad_bottom = quad_top + quad_wh;
                quad_rigth = quad_left + quad_wh;
                block = array_blocks[a];
                // Cada block ter as suas propriedades
                blocks[a] = [
                    block,
                    quad_top,
                    quad_rigth,
                    quad_bottom,
                    quad_left
                ];
            }
            // stones
            for (e = 0; e < e_length; e++) {
                // Variaveis com dimensoes e posies do block
                stone_wh = array_stones[e].offsetWidth;
                stone_top = array_stones[e].offsetTop;
                stone_left = array_stones[e].offsetLeft;
                stone_bottom = stone_top + stone_wh;
                stone_rigth = stone_left + stone_wh;
                stone = array_stones[e];
                // Cada block ter as suas propriedades
                stones[e] = [
                    stone,
                    stone_top,
                    stone_rigth,
                    stone_bottom,
                    stone_left
                ];
            }
            // aux_s
            for (f = 0; f < f_length; f++) {
                // Variaveis com dimensoes e posies do block
                aux_wh = array_aux_s[f].offsetWidth;
                aux_top = array_aux_s[f].offsetTop;
                aux_left = array_aux_s[f].offsetLeft;
                aux_bottom = aux_top + aux_wh;
                aux_rigth = aux_left + aux_wh;
                aux = array_aux_s[f];
                // Cada block ter as suas propriedades
                aux_s[f] = [
                    aux,
                    aux_top,
                    aux_rigth,
                    aux_bottom,
                    aux_left
                ];
            }
            // Redefinir valores for in loops
            b_length = blocks.length;
            e_length = stones.length;
            f_length = aux_s.length;
            id_metade_blocks = parseInt(b_length / 2, 10);

            // function GERAL
            var fps_game = function () {
                
                // VARIAVEIS
                // aces de game
                up_init = hero.getAttribute('class').search('up_init');
                left_init = hero.getAttribute('class').search('left_init');
                down_init = hero.getAttribute('class').search('down_init');
                right_init = hero.getAttribute('class').search('right_init');
                up_stop = hero.getAttribute('class').search('up_stop');
                left_stop = hero.getAttribute('class').search('left_stop');
                down_stop = hero.getAttribute('class').search('down_stop');
                right_stop = hero.getAttribute('class').search('right_stop');
                // dimenses hero
                T1 = hero.offsetTop;
                R1 = hero.offsetLeft + hero.offsetHeight;
                B1 = hero.offsetLeft + hero.offsetHeight;
                L1 = hero.offsetLeft;
                // estilo
                per_back_esq_s = hero.style.background.search('hero_0_esq.png');
                per_back_dir_s = hero.style.background.search('hero_0_dir.png');
                per_back_esq = 'url(src/min/images/personagem_0_esq.png)';
                per_back_dir = 'url(src/min/images/personagem_0_dir.png)';
                // background
                L_background_game = background_game.offsetLeft;
                W_background_game = background_game.offsetWidth;
                W_per = hero.offsetWidth;
                // se o dourado "disparou" remove os eventos
                if (ultimo_block === 1) {
                    clearInterval(i_fps_game);
                    hero.setAttribute('class', '');
                }
                //	.volume do sound
                if (typeof sound.getAttribute('class') === 'string' && sound.getAttribute('class').search('silencio') !== -1) {
                    state_sound = 2;
                } else {
                    state_sound = -1;
                }
                // salto
                if (up_init !== -1) {
                    // fx saltos
                    if (state_sound === -1) {
                        if (valor_cima === -27 && tipo_salto === 'normal') {
                            // sound salto
                            sound_salto.play();
                        }  // se o valor  -40 o que significa , deteco de mola
                        else if (valor_cima === -54) {
                            // sound salto
                            sound_caixa_vermelha.play();
                        }
                    }
                    // aumenta o valor de subida
                    valor_cima++;
                    // pra subida
                    if (valor_cima === 0 || det_block === true) {
                        // repor valores de origem
                        valor_cima = -27;
                        tipo_salto = 'normal';
                        hero.setAttribute('class', hero.getAttribute('class').replace('up_init', 'up_stop'));
                        // iniciar baixo
                        hero.setAttribute('class', hero.getAttribute('class').replace('down_stop', 'down_init'));
                    } else {
                        hero.style.top = (T1 - 4) + 'px';
                    }
                }  // fall
                else if (down_init !== -1 || down_init !== -1 && det_block === false || down_init !== -1 && det_block === 'ajustado') {
                    // est em cima de um block
                    // acabou de tocar num block
                    // chegou ao cho
                    if (T1 + 6 > 435 || det_block === true || det_block === 'ajustado') {
                        // se chegou ao cho
                        if (T1 + 6 > 435) {
                            // repor valores de origem
                            hero.style.top = '435px';
                            // primeiro block concluido
                            // falls
                            if (primeiro_block === 1) {
                                falls_value.innerHTML = qvi = qvi + 1;
                            }
                        }
                        hero.setAttribute('class', hero.getAttribute('class').replace('down_init', 'down_stop'));
                        det_block = false;
                    } else {
                        if (T1 + 6 < 436 && det_block === false) {
                            hero.style.top = (T1 + 6) + 'px';
                        }
                    }
                }
                // direita
                if (left_init !== -1 && colisao !== 'direita') {
                    colisao = 0;
                    // verificar background
                    if (per_back_dir_s === -1) {
                        hero.style.background = per_back_dir;
                    }
                    // se o left PER  menor que width do game
                    if (L1 < W_background_game - W_per) {
                        // move PER para direita
                        hero.style.left = (L1 + 5) + 'px';
                        // mover fundo
                        if (L1 > 250 && -L_background_game < W_background_game - 650 && L1 + L_background_game < 300 && L1 + L_background_game > 250) {
                            background_game.style.left = (L_background_game - 5) + 'px';
                        }
                    }
                    // se block for falso iniciar fall
                    if (det_block === false && down_init === -1 && up_init === -1 && T1 !== 435) {
                        hero.setAttribute('class', hero.getAttribute('class').replace('down_stop', 'down_init'));
                    }
                }  // esquerda
                else if (right_init !== -1 && colisao !== 'esquerda') {
                    colisao = 0;
                    // verificar background
                    if (per_back_esq_s === -1) {
                        hero.style.background = per_back_esq;
                    }
                    // se o left PER  menor que width do game
                    if (L1 > 0) {
                        // move PER para esquerda
                        hero.style.left = (L1 - 5) + 'px';
                        // mover fundo
                        if (L1 > 250 && L_background_game < 0 && L1 + 250 < W_background_game) {
                            background_game.style.left = (L_background_game + 5) + 'px';
                        }
                    }
                    // se block for falso iniciar fall
                    if (det_block === false && down_init === -1 && up_init === -1 && T1 !== 435) {
                        hero.setAttribute('class', hero.getAttribute('class').replace('down_stop', 'down_init'));
                    }
                }
                // se existirem stones
                if (e_length !== 0) {
                    // stones
                    for (d = 0; d < e_length; d++) {
                        // dimenses stone
                        E3 = stones[d][0];
                        // elemento stone
                        T3 = stones[d][1];
                        // top stone
                        R3 = stones[d][2];
                        // direita stone
                        L3 = stones[d][4];
                        // esquerda stone
                        // toca no cimo da stone
                        if (T1 - T3 > -36 && T1 - T3 < -28 && R1 - R3 < 30 && L1 - L3 > -30) {
                            // se o top nao estiver ajustado f-lo-
                            // primeiro toque no stone
                            if (T1 !== T3 - 35) {
                                hero.style.top = (T3 - 35) + 'px';
                                det_block = true;
                                // se for dinamite
                                if (E3.getAttribute('class').search('dinamite') !== -1) {
                                    // apagar class dinamite
                                    E3.setAttribute('class', E3.getAttribute('class').replace('dinamite', ''));
                                    // aviso
                                    this.e_num_f('DANGER', 'perigo');
                                    // function
                                    cenario_bomb(0, state_sound, E3);
                                }
                            }  // se estiver no mesmo block simplesmente continua a circular sem deteces
                            else {
                                det_block = 'ajustado';
                            }
                            // ultima linha
                            d_stones = 1;
                            break;
                        }  // toca na base da stone
                        else if (T1 - T3 > 46 && T1 - T3 < 54 && R1 - R3 < 30 && L1 - L3 > -30) {
                            // primeiro toque na stone
                            if (T1 !== T3 + 50 && det_block === false) {
                                hero.style.top = (T3 + 50) + 'px';
                                det_block = true;
                                d_stones = 1;
                            }  // segundo toque ou deteco
                            else {
                                det_block = false;
                                d_stones = 0;
                            }
                            break;
                        }  // se depois de todas as verificaes nao detectar stone determina false e inicia descida
                        else {
                            d_stones = 0;
                        }
                        // toca de lado direito da stone
                        if (T1 - T3 > -35 && T1 - T3 < 50 && L1 - R3 > -6 && L1 - R3 < 1) {
                            // primeiro toque na stone
                            if (L1 !== R3) {
                                hero.style.left = R3 + 'px';
                                colisao = 'esquerda';
                            }
                            break;
                        }  // toca de lado esquerdo da stone
                        else if (T1 - T3 > -35 && T1 - T3 < 50 && R1 - L3 > -1 && R1 - L3 < 16) {
                            // primeiro toque na stone
                            if (L1 !== L3 - 35) {
                                hero.style.left = L3 - 35 + 'px';
                                colisao = 'direita';
                            }
                            break;
                        }  // se depois de todas as verificaes nao detectar stone determina false e inicia descida
                        else if (d === e_length - 1) {
                            d_stones = 0;
                            colisao = 0;
                        }
                    }
                }  // se no existirem stones envia sinal
                else {
                    d_stones = 0;
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
                 hero.style.top = (T1 - 35) + "px"
                 det_block = true
                 // variaveis
                 block_aux_id = E4.getAttribute("id")
                 block_aux_class = E4.getAttribute(
                 "class")
                 // aux verde
                 if(block_aux_id === "aux_verde"){
                 // ao activar muda de back
                 if(E4.style.background.search("verde") === -1){
                 E4.style.background = "url(\"src/min/images/verde.png\")"
                 E4.style.border = "solid 1px #ffffff"
                 }
                 // iniciar efeito
                 e_block_verde(E4)
                 break
                 }
                 // aux vermelho
                 else if(block_aux_id === "aux_vermelho"){
                 break
                 }
                 }
                 }
                 // se depois de todas as verificaes nao detectar block determina false e inicia descida
                 else{
                 det_block = false
                 }
                 }*/
                // Verificao de blocks
                for (b = 0; b < b_length; b++) {
                    // dimenses blocks
                    E2 = blocks[b][0];
                    // top block
                    T2 = blocks[b][1];
                    // top block
                    R2 = blocks[b][2];
                    // direita block
                    L2 = blocks[b][4];
                    // esquerda block
                    //  se encontrar block pousar em cima do mesmo
                    if (T1 - T2 > -36 && T1 - T2 < -28 && R1 - R2 < 30 && L1 - L2 > -30) {
                        // se o top nao estiver ajustado f-lo-
                        // basicamente se for a primeira vez que toca depois de um salto ou fall
                        if (T1 !== T2 - 35) {
                            hero.style.top = (T2 - 35) + 'px';
                            det_block = true;
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
                            id_block = parseInt(E2.getAttribute('class').split(' ')[1].split('_')[1], 10);
                            b_activo = E2.getAttribute('class').search('b_activo');
                            // ligar_block sera true ou false
                            // se no for primeiro block
                            if (b > 0) {
                                id_block_ant = blocks[b - 1][0].getAttribute('class').search('b_activo');
                            }
                            // se for o primeiro block
                            //  no procurara anterior activo
                            if (b === 0 && b_activo === -1) {
                                // activa-lo, com classe
                                ligar_block = true;
                                primeiro_block = 1;
                                E2.setAttribute('class', E2.getAttribute('class') + ' b_activo');
                                // iniciar efeito
                                this.e_num_f(id_block);
                            }  // se no  o primeiro e o anterior NO esta activo
                            else if (b > 0 && id_block_ant === -1) {
                                ligar_block = false;
                            }  // se no  o primeiro e o anterior esta activo
                            else if (b > 0 && id_block_ant !== -1 && b_activo === -1) {
                                // agrupamento de 3 blocks
                                if (caixa_laranja_3 === -1 && caixa_laranja_2 === -1 && caixa_laranja_1 === -1) {
                                    E2.setAttribute('class', E2.getAttribute('class') + ' b_activo');
                                    ligar_block = true;
                                    // iniciar efeito
                                    this.e_num_f(id_block);
                                } else if (caixa_laranja_3 !== -1) {
                                    E2.setAttribute('class', E2.getAttribute('class').replace('laranja_3', 'laranja_2'));
                                    ligar_block = true;
                                    // iniciar efeito
                                    this.e_num_f(id_block);
                                } else if (caixa_laranja_2 !== -1) {
                                    E2.setAttribute('class', E2.getAttribute('class').replace('laranja_2', 'laranja_1'));
                                    ligar_block = true;
                                    // iniciar efeito
                                    this.e_num_f(id_block + 1);
                                } else if (caixa_laranja_1 !== -1) {
                                    E2.setAttribute('class', E2.getAttribute('class').replace('laranja_1', ''));
                                    E2.setAttribute('class', E2.getAttribute('class') + ' b_activo');
                                    ligar_block = true;
                                    // iniciar efeito
                                    this.e_num_f(id_block + 2);
                                }
                            }
                            // sequencia errada
                            if (ligar_block === false && b_activo === -1) {
                                // sound
                                if (state_sound === -1 || state_sound === null) {
                                    sound_caixa_laranja.play();
                                }
                                // iniciar efeito
                                this.e_num_f('?');
                                fails_value.innerHTML = fvi = fvi + 1;
                            }  // sequencia correcta
                            else if (ligar_block === true && (b_activo === -1 || caixa_vermelha !== -1)) {
                                // block azul
                                if (caixa_azul !== -1 && caixa_dourada === -1 && caixa_vermelha === -1 && caixa_laranja_3 === -1) {
                                    // background
                                    E2.style.background = 'url("src/min/images/activo.png") #ffffff';
                                    // border
                                    E2.style.border = '1px dashed #ffffff';
                                    // points
                                    pvi = points_value.innerHTML = pvi + 100;
                                    // sound
                                    if (state_sound === -1 || state_sound === null) {
                                        // sound salto
                                        sound_caixa_azul.play();
                                    }
                                }  // block vermelho
                                else if (caixa_vermelha !== -1) {
                                    if (E2.style.background.search('src/min/images/vermelho.png') === -1) {
                                        // background
                                        E2.style.background = 'url("src/min/images/vermelho.png") #ffffff';
                                        // border
                                        E2.style.border = '1px dashed #ffffff';
                                    }
                                    // se no estiver em "up_init" , f-lo-
                                    // repor valores de origem
                                    valor_cima = -54;
                                    hero.setAttribute('class', hero.getAttribute('class').replace('up_stop', 'up_init'));
                                    det_block = false;
                                    tipo_salto = 'vermelho';
                                }  // block dourado
                                else if (caixa_dourada !== -1) {
                                    // parar game
                                    ultimo_block = 1;
                                    // background
                                    E2.style.background = 'url("src/min/images/dourado.png") #ffffff';
                                    // border
                                    E2.style.border = '1px dashed #ffffff';
                                    // sound
                                    if (state_sound === -1 || state_sound === null) {
                                        // sound salto
                                        sound_caixa_dourada.play();
                                    }
                                    // points
                                    pvi = points_value.innerHTML = pvi + 100;
                                    // para time e remover eventos
                                    window_game.setAttribute('class', window_game.getAttribute('class').replace('inicio', 'fim'));
                                    this.espetaculo_points();
                                }
                            }
                            // se metade dos blocks estiverem concluidos d sinal
                            if (blocks[id_metade_blocks][0].getAttribute('class').search('b_activo') !== -1 && document.getElementById('aux_vermelho').style.display === 'none') {
                                // variaveis aparecer aux_vermelho
                                var block_aux = document.getElementById('aux_vermelho'), block_aux_css = block_aux.style.cssText, block_aux_class = block_aux.getAttribute('class');
                                // function aparecer aux_vermelho
                                e_blocks(block_aux, block_aux_css, block_aux_class);
                            }
                        }  // se estiver no mesmo block simplesmente continua a circular sem deteces
                        else {
                            det_block = 'ajustado';
                        }
                        // ultima linha
                        d_blocks = 1;
                        break;
                    } else {
                        d_blocks = 0;
                    }
                }
                if (d_stones === 0 && d_blocks === 0) {
                    // se depois de todas as verificaes nao detectar block determina false e inicia descida
                    det_block = false;
                }
            };

            // variavel de intervalo fps_game
            var i_fps_game = setInterval(fps_game, 20);
        },

        level: function (nvi) {

            // Set current level
            level_value.innerHTML = nvi = (nvi !== undefined) ? nvi : 1;

            if (nvi === 1) {
                var level_1 = function () {
                    // adicionar level
                    var blocks_jogaveis = [], aux_s_jogaveis = [], block_left = [
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
                        ], block_bottom = [
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
                        aux_left = [parseInt((block_left[0] + block_left[block_left.length - 1]) / 2)], aux_bottom = [30], numero_a = 0, id_aux = 0,
                    // comprimento das arrays
                        a_length = block_left.length,
                    // b_length = stone_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // criar numeros de blocks
                    for (a = 0; a < a_length; a++) {
                        numero_b++;
                        // criar blocks
                        blocks_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocks_jogaveis[a].setAttribute('class', 'block b_' + (a + 1));
                        // definir CSS
                        blocks_jogaveis[a].style.cssText = 'position:absolute;left:' + block_left[a] + 'px;bottom:' + block_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocks ao game
                        background_game.appendChild(blocks_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === block_left.length - 1) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + 'block dourado');
                        }
                    }
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocks
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
                        // adicionar blocks ao game
                        background_game.appendChild(aux_s_jogaveis[c]);
                    }
                };
                level_1();
            } else if (nvi === 2) {
                var level_2 = function () {
                    var blocks_jogaveis = [], aux_s_jogaveis = [], block_left = [
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
                        ], block_bottom = [
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
                        ], numero_b = 0, a, a_length = block_left.length,
                    // array aux_s
                        aux_left = [parseInt((block_left[0] + block_left[block_left.length - 1]) / 2)], aux_bottom = [30], numero_a = 0, id_aux = 0, b, c,
                    // b_length = stone_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // criar numeros de blocks
                    for (a = 0; a < a_length; a++) {
                        numero_b++;
                        // criar blocks
                        blocks_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocks_jogaveis[a].setAttribute('class', 'block b_' + (a + 1));
                        // definir CSS
                        blocks_jogaveis[a].style.cssText = 'position:absolute;left:' + block_left[a] + 'px;bottom:' + block_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocks ao game
                        background_game.appendChild(blocks_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === block_left.length - 1) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + 'block dourado');
                        }
                    }
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocks
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
                        // adicionar blocks ao game
                        background_game.appendChild(aux_s_jogaveis[c]);
                    }
                };
                level_2();
            } else if (nvi === 3) {
                var level_3 = function () {
                    var blocks_jogaveis = [], aux_s_jogaveis = [], block_left = [
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
                        ], block_bottom = [
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
                        ], numero_b = 0, a, a_length = block_left.length,
                    // array aux_s
                        aux_left = [parseInt((block_left[0] + block_left[block_left.length - 1]) / 2)], aux_bottom = [30], numero_a = 0, id_aux = 0, b, c,
                    // b_length = stone_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // criar numeros de blocks
                    for (a = 0; a < a_length; a++) {
                        numero_b++;
                        // criar blocks
                        blocks_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocks_jogaveis[a].setAttribute('class', 'block b_' + (a + 1));
                        // definir CSS
                        blocks_jogaveis[a].style.cssText = 'position:absolute;left:' + block_left[a] + 'px;bottom:' + block_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocks ao game
                        background_game.appendChild(blocks_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === block_left.length - 1) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + 'block dourado');
                        }
                        // se for vermelho
                        if (a === 5 || a === 17 || a === 18) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                    }
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocks
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
                        // adicionar blocks ao game
                        background_game.appendChild(aux_s_jogaveis[c]);
                    }
                };
                level_3();
            } else if (nvi === 4) {
                var level_4 = function () {
                    // VARIAVEIS
                    var blocks_jogaveis = [], stones_jogaveis = [], aux_s_jogaveis = [], block_left = [
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
                        ], block_bottom = [
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
                        ], stone_left = [
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
                        ], stone_bottom = [
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
                        ], numero_a = 0, numero_b = 0, a, b, c, a_length = block_left.length, b_length = stone_left.length,
                    // array aux_s
                        aux_left = [parseInt((block_left[0] + block_left[block_left.length - 1]) / 2)], aux_bottom = [30], id_aux = 0,
                    // b_length = stone_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocks
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
                        // adicionar blocks ao game
                        background_game.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR blockS pointS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocks
                        blocks_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocks_jogaveis[a].setAttribute('class', 'block b_' + (a + 1));
                        // definir CSS
                        blocks_jogaveis[a].style.cssText = 'position:absolute;left:' + block_left[a] + 'px;bottom:' + block_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #2f0000;';
                        // adicionar blocks ao game
                        background_game.appendChild(blocks_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === block_left.length - 1) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + 'block dourado');
                        }
                        // se for vermelho
                        if (a === 10) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                    }
                    // CRIAR stoneS
                    for (b = 0; b < b_length; b++) {
                        numero_b++;
                        // criar blocks
                        stones_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        stones_jogaveis[b].setAttribute('class', 'stone');
                        // definir CSS
                        stones_jogaveis[b].style.cssText = 'position:absolute;left:' + stone_left[b] + 'px;bottom:' + stone_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #2f0000;';
                        // adicionar blocks ao game
                        background_game.appendChild(stones_jogaveis[b]);
                    }
                };
                level_4();
            } else if (nvi === 5) {
                var level_5 = function () {
                    // VARIAVEIS
                    var blocks_jogaveis = [], stones_jogaveis = [], aux_s_jogaveis = [], block_left = [
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
                        ], block_bottom = [
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
                        ], stone_left = [
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
                        ], stone_bottom = [
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
                        ], numero_a = 0, numero_b = 0, a, b, c, a_length = block_left.length, b_length = stone_left.length,
                    // array aux_s
                        aux_left = [parseInt((block_left[0] + block_left[block_left.length - 1]) / 2)], aux_bottom = [30], id_aux = 0,
                    // b_length = stone_left.length,
                        c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocks
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
                        // adicionar blocks ao game
                        background_game.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR blockS pointS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocks
                        blocks_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocks_jogaveis[a].setAttribute('class', 'block b_' + numero_a);
                        // definir CSS
                        blocks_jogaveis[a].style.cssText = 'position:absolute;left:' + block_left[a] + 'px;bottom:' + block_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #333333;';
                        // adicionar blocks ao game
                        background_game.appendChild(blocks_jogaveis[a]);
                        // se for o ultimo elemento  o DOURADO
                        if (a === block_left.length - 1) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + 'block dourado');
                        }
                        // se for vermelho
                        if (a === 5 || a === 8 || a === 10 || a === 18) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                        // laranja_points
                        if (a === 6 || a === 9 || a === 13 || a === 14 || a === 16) {
                            numero_a++;
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' laranja_3');
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                            numero_a++;
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                        }
                    }
                    // CRIAR stoneS
                    for (b = 0; b < b_length; b++) {
                        numero_b++;
                        // criar blocks
                        stones_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        stones_jogaveis[b].setAttribute('class', 'stone');
                        // definir CSS
                        stones_jogaveis[b].style.cssText = 'position:absolute;left:' + stone_left[b] + 'px;bottom:' + stone_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #000000;';
                        // adicionar blocks ao game
                        background_game.appendChild(stones_jogaveis[b]);
                    }
                };
                level_5();
            } else if (nvi === 6) {
                var level_6 = function () {
                    // VARIAVEIS
                    var blocks_jogaveis = [], stones_jogaveis = [], aux_s_jogaveis = [],
                    // array blocks points
                        block_left = [
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
                        ], block_bottom = [
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
                    // array stones
                        stone_left = [
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
                        ], stone_bottom = [
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
                            parseInt((block_left[0] + block_left[block_left.length - 1]) / 2),
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
                        a_length = block_left.length, b_length = stone_left.length, c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = '';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocks
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
                        // adicionar blocks ao game
                        background_game.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR blockS pointS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocks
                        blocks_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocks_jogaveis[a].setAttribute('class', 'block b_' + numero_a);
                        // definir CSS
                        blocks_jogaveis[a].style.cssText = 'position:absolute;left:' + block_left[a] + 'px;bottom:' + block_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #333333;';
                        // adicionar blocks ao game
                        background_game.appendChild(blocks_jogaveis[a]);
                        // TIPOS DE blockS
                        // dourado
                        if (a === block_left.length - 1) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + 'block dourado');
                        }
                        // vermelho
                        if (a === 6 || a === 8 || a === 15) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                        // 3 points
                        if (a === 1 || a === 7 || a === 10 || a === 18 || a === 20) {
                            numero_a++;
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' laranja_3');
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                            numero_a++;
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                        }
                    }
                    // fim blocks points
                    // CRIAR stoneS
                    for (b = 0; b < b_length; b++) {
                        // criar blocks
                        stones_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        stones_jogaveis[b].setAttribute('class', 'stone');
                        // definir CSS
                        stones_jogaveis[b].style.cssText = 'position:absolute;left:' + stone_left[b] + 'px;bottom:' + stone_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #000000;';
                        // adicionar blocks ao game
                        background_game.appendChild(stones_jogaveis[b]);
                    }
                };
                level_6();
            } else if (nvi === 7) {
                var level_7 = function () {
                    // VARIAVEIS
                    var blocks_jogaveis = [], stones_jogaveis = [], aux_s_jogaveis = [],
                    // array blocks points
                        block_left = [
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
                        ], block_bottom = [
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
                    // array stones
                        stone_left = [
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
                        ], stone_bottom = [
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
                            parseInt((block_left[0] + block_left[block_left.length - 1]) / 2),
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
                        a_length = block_left.length, b_length = stone_left.length, c_length = aux_left.length, cor, border = 'solid 1px #ffffff;', display = 'block';
                    // AUXILIARES
                    for (c = 0; c < c_length; c++) {
                        // id_aux
                        id_aux++;
                        // criar blocks
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
                        // adicionar blocks ao game
                        background_game.appendChild(aux_s_jogaveis[c]);
                    }
                    // CRIAR blockS pointS
                    for (a = 0; a < a_length; a++) {
                        numero_a++;
                        // criar blocks
                        blocks_jogaveis[a] = document.createElement('div');
                        // adicionar attributos
                        blocks_jogaveis[a].setAttribute('class', 'block b_' + numero_a);
                        // definir CSS
                        blocks_jogaveis[a].style.cssText = 'position:absolute;left:' + block_left[a] + 'px;bottom:' + block_bottom[a] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/inactivo.png");border:solid 1px #333333;';
                        // adicionar blocks ao game
                        background_game.appendChild(blocks_jogaveis[a]);
                        // TIPOS DE blockS
                        // dourado
                        if (a === block_left.length - 1) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + 'block dourado');
                        }
                        // vermelho
                        if (a === 0 || a === 12 || a === 14) {
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' vermelho');
                        }
                        // 3 points
                        if (a === 2 || a === 3 || a === 6 || a === 8 || a === 10 || a === 13 || a === 15) {
                            numero_a++;
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' laranja_3');
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                            numero_a++;
                            blocks_jogaveis[a].setAttribute('class', blocks_jogaveis[a].getAttribute('class') + ' b_' + numero_a);
                        }
                    }
                    // fim blocks points
                    // CRIAR stoneS
                    for (b = 0; b < b_length; b++) {
                        // criar blocks
                        stones_jogaveis[b] = document.createElement('div');
                        // adicionar attributos
                        stones_jogaveis[b].setAttribute('class', 'stone');
                        // definir CSS
                        stones_jogaveis[b].style.cssText = 'position:absolute;left:' + stone_left[b] + 'px;bottom:' + stone_bottom[b] + 'px;z-index:10;width:50px;height:50px;background:url("src/min/images/cinzento.png");border:solid 1px #000000;';
                        // adicionar blocks ao game
                        background_game.appendChild(stones_jogaveis[b]);
                        // bombs
                        if (b === 14 || b === 15 || b === 18 || b === 35 || b === 46 || b === 50 || b === 58 || b === 59 || b === 60 || b === 69 || b === 72 || b === 77 || b === 78 || b === 80 || b === 82 || b === 83 || b === 86 || b === 87 || b === 89 || b === 90 || b === 91 || b === 94 || b === 98 || b === 100 || b === 101 || b === 107 || b === 108 || b === 109 || b === 117) {
                            stones_jogaveis[b].setAttribute('class', stones_jogaveis[b].getAttribute('class') + ' dinamite');
                        }
                    }
                };
                level_7();
            }
        },

        espetaculo_level: function (level) {

            // adicionar event listener
            document.addEventListener('keyup', function menu_game(vars) {
                switch (vars.keyCode) {
                    case 32:
                        gosquares.gravity();
                        document.removeEventListener('keyup', menu_game, false);
                        break;
                    case 13:
                        gosquares.gravity();
                        document.removeEventListener('keyup', menu_game, false);
                        break;
                }
            }, false);
        },

        espetaculo_points: function () {
            // n do proximo level
            window_points = document.createElement('div');
            window_points.setAttribute('id', 'window_points');
            window_points.style.cssText = 'position:absolute;width:300px;height:300px;left:175px;top:100px;background:#eeeeee;box-shadow:0 0 20px #777777;font-weight:bold';
            window_points.innerHTML = '<p style="line-height:50px;font-size:30px;text-align:center;color:#555555;font-family:arial;text-transform:lowercase;">succeed</p><p style="line-height:50px;font-size:25px;text-align:center;color:#fe9901;font-family:arial;text-transform:lowercase;">level ' + nvi + ' cleared!</p><button id="botao_points" onclick="gosquares.conteudos()" style="text-align:center;background:#dddddd;color:#555555;margin:0px auto;display:block;clear:both;cursor:pointer;box-shadow:0 0 5px #888888;border:2px solid #dddddd;font-size:40px;line-heigth:20px;">' + pvi + ' points!</button>';
            window_game.appendChild(window_points);
            // adicionar event listener
            document.addEventListener('keyup', function menu_game(vars) {
                nvi++;
                switch (vars.keyCode) {
                    case 32:
                        gosquares.start();
                        document.removeEventListener('keyup', menu_game, false);
                        break;
                    case 13:
                        gosquares.start();
                        document.removeEventListener('keyup', menu_game, false);
                        break;
                }
            }, false);
            var botao_points = document.getElementById('botao_points'),
                c_points = 1;

            // correr pontuao
            function correr_points() {
                if (0 <= c_points && parseInt(pvi * 0.1) >= c_points) {
                    c_points = c_points + 2;
                    botao_points.innerHTML = c_points + ' points!';
                } else if (parseInt(pvi * 0.1) + 1 <= c_points && c_points <= parseInt(pvi * 0.3)) {
                    c_points = c_points + 4;
                    botao_points.innerHTML = c_points + ' points!';
                } else if (parseInt(pvi * 0.3) + 1 <= c_points && c_points <= parseInt(pvi * 0.8)) {
                    c_points = c_points + 6;
                    botao_points.innerHTML = c_points + ' points!';
                } else if (parseInt(pvi * 0.8) + 1 <= c_points && c_points <= parseInt(pvi * 0.9)) {
                    c_points = c_points + 4;
                    botao_points.innerHTML = c_points + ' points!';
                } else if (c_points >= parseInt(pvi * 0.9) + 1 && c_points < pvi && c_points + 2 < pvi) {
                    c_points = c_points + 2;
                    botao_points.innerHTML = c_points + ' points!';
                } else {
                    clearInterval(int_correr_points);
                    botao_points.innerHTML = pvi + ' points!';
                }
            }

            var int_correr_points = setInterval(correr_points, 1);
        },

        e_blocks: function (block_aux, block_aux_css, block_aux_class) {
            var e_aum = 0;
            block_aux.style.cssText = block_aux_css + ';opacity:0';
            block_aux.style.display = 'block';
            // aumentar opacidade
            var a_op = function () {
                e_aum = e_aum + 0.05;
                block_aux.style.opacity = e_aum;
                // limpar intervalo
                if (block_aux.style.opacity >= 0.9) {
                    clearInterval(i_a_op);
                    block_aux.style.opacity = 1;
                    block_aux.setAttribute('class', block_aux_class);
                }
            };

            var i_a_op = setInterval(a_op, 50);
        },

        cenario_bomb: function (bomb_bips, state_sound, stone_tnt) {
            var bomb = function () {
                bomb_bips++;
                // iniciar relogio bomb 3 segundos
                if (state_sound === -1) {
                    // sound salto
                    sound_tic_tac_bomb.play();
                }
                if (bomb_bips === 1) {
                    stone_tnt.style.background = 'url("src/min/images/dinamite.png")';
                    this.e_num_f(3, 'perigo');
                }
                if (bomb_bips === 3) {
                    stone_tnt.style.background = 'url("src/min/images/dinamite.png")';
                    this.e_num_f(1, 'perigo');
                }
                if (bomb_bips === 2) {
                    stone_tnt.style.background = 'url("src/min/images/cinzento.png")';
                    this.e_num_f(2, 'perigo');
                }
                if (bomb_bips === 4) {
                    if (state_sound === -1) {
                        sound_bomb_rebenta.play();
                    }
                    this.e_num_f('BOOOOOMMM', 'perigo');
                    stone_tnt.style.display = 'none';
                    clearInterval(i_bomb);
                    // se a hero estiver proxima
                    var v_proximidade = hero.offsetLeft - stone_tnt.offsetLeft;
                    // se ...
                    if (v_proximidade > -100 && v_proximidade < 100) {
                        // efeito bomb
                        e_bomb(v_proximidade);
                        stone_tnt.style.cssText = '';
                    }
                }
            };

            var i_bomb = setInterval(bomb, 1000);
        },

        e_bomb: function (v_proximidade) {
            // salto para esquerda
            if (v_proximidade < 0) {
                det_obj_pers(38, -23);
                // function afastar
                var afastar_bomb_e = function () {
                    // redefinir class
                    hero.setAttribute('class', hero.getAttribute('class').replace('left_init', 'left_stop'));
                    det_obj_pers(37, 'nada');
                    // parar evento listener
                    if (hero.getAttribute('class').search('up_init') === -1) {
                        clearInterval(i_afastar_bomb_e);
                        // redefinir class
                        hero.setAttribute('class', hero.getAttribute('class').replace('right_init', 'right_stop'));
                    }
                };
                var i_afastar_bomb_e = setInterval(afastar_bomb_e, 30);
            }  // salto para direita
            else if (v_proximidade > 0) {
                // fazer saltar
                det_obj_pers(38, -23);
                // function afastar
                var afastar_bomb = function () {
                    if (hero.getAttribute('class').search('right_init') !== -1) {
                        // redefinir class
                        hero.setAttribute('class', hero.getAttribute('class').replace('right_init', 'right_stop'));
                    }
                    det_obj_pers(39, 'nada');
                    // parar evento listener
                    if (hero.getAttribute('class').search('up_init') === -1) {
                        clearInterval(i_afastar_bomb);
                        // redefinir class
                        hero.setAttribute('class', hero.getAttribute('class').replace('left_init', 'left_stop'));
                    }
                };
                var i_afastar_bomb = setInterval(afastar_bomb, 30);
            }
        },

        e_num_f: function (id_block, motive) {
            var e_numero = document.getElementById('e_numero');
            if (e_numero !== null) {
                e_numero.innerHTML = '';
                e_numero.parentNode.removeChild(e_numero);
            } else {
                // Criar efeito
                e_numero = document.createElement('span');
                e_numero.setAttribute('id', 'e_numero');
                e_numero.style.cssText = 'position:absolute;color:#ffffff;font-weight:bold;right:' + window_game.offsetWidth / 2 + 'px;top:' + window_game.offsetHeight / 2 + 'px;z-index:100;opacity:1.0;font-size:60px;';
                e_numero.innerHTML = id_block;
                window_game.appendChild(e_numero);
                e_numero = document.getElementById('e_numero');
                e_numero.style.left = window_game.offsetWidth / 2 - e_numero.offsetWidth / 2 + 'px';
                e_numero.style.top = window_game.offsetHeight / 2 - e_numero.offsetHeight / 2 + 'px';
            }
            if (id_block === '?' || motive === 'perigo') {
                e_numero.style.color = 'red';
            }
            var e_num_i = function () {
                // novo width efeito
                e_numero.style.width = e_numero.innerHTML.length * parseInt(e_numero.style.fontSize) / 2 + 'px';
                // novo left e novo top
                e_numero.style.left = window_game.offsetWidth / 2 - e_numero.offsetWidth / 2 + 'px';
                e_numero.style.top = window_game.offsetHeight / 2 - e_numero.offsetHeight / 2 + 'px';
                // novo font-size
                e_numero.style.fontSize = parseInt(e_numero.style.fontSize, 10) + 8 + 'px';
                // diminuir a opacidade 3*0.01
                e_numero.style.opacity = e_numero.style.opacity - 0.03;
                // depois de concluido eliminar o efeito
                if (e_numero.style.opacity < 0.05 || document.getElementById('e_numero') === null) {
                    clearInterval(i_e_font_points);
                    e_numero.innerHTML = '';
                    if (document.getElementById('e_numero') !== null) {
                        e_numero.parentNode.removeChild(e_numero);
                    }
                }
            };

            var i_e_font_points = setInterval(e_num_i, 10);
        },

        e_block_verde: function (block_verde) {
            // block
            var block_aux = block_verde,
            // gravar atributos e propriedades do block
                block_aux_id = block_verde.getAttribute('id'), block_aux_class = block_verde.getAttribute('class'), block_aux_css = block_verde.style.cssText,
            // numero do aux
                b_aux_id = block_verde.getAttribute('class').split(' ')[1].split('_')[1],
            // state block aux
                e_b_aux = block_aux_class.search('activo');
            if (e_b_aux === -1) {
                // actualizar state do block
                block_aux.setAttribute('class', block_aux_class + ' activo');
                var e_b_verde = function () {
                    // se tiver 0 de height desaparece
                    if (block_aux.offsetHeight < 3) {
                        // actualizar state do block
                        block_aux.setAttribute('class', '');
                        block_aux.style.cssText = '';
                        clearInterval(i_e_b_verde);
                        //	actualizar detectar blocks
                        det_obj_pers(0, 1);
                        var i_e_r_b_verde = setTimeout(function () {
                            clearInterval(i_e_r_b_verde);
                            // reintroduzir propriedades no block
                            e_blocks(block_aux, block_aux_css, block_aux_class);
                        }, 5000);
                    }
                    // actualizar state do block
                    block_aux.style.height = (block_aux.offsetHeight - 1) + 'px';
                    block_aux.style.bottom = (block_aux.offsetBottom + 1) + 'px';
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