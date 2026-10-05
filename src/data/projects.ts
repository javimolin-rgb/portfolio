/* Proyectos del portfolio.
   Cada pieza se referencia como 'proyecto/archivo' → src/assets/work/proyecto/archivo.(jpg|png).
   Ver DESIGN.md §8 para la biblioteca de bloques. */

export type Piece = {
  ref: string;
  name: string;
  format?: string;
  /** Video en /public/video/<video>.mp4; la imagen de ref sirve de póster. */
  video?: string;
  /** Solo fotos: punto focal para recortes (object-position). */
  focus?: string;
  /** Medida real en cm [ancho, alto] para el bloque de escala. */
  cm?: [number, number];
  round?: boolean;
  alt?: string;
};

export type Surface = 'field' | 'ground' | 'dark' | 'alt';

export type Block =
  | { kind: 'notes'; heading?: string; text: string[]; decisions?: string[] }
  | { kind: 'bleed'; piece: Piece; caption?: string; surface?: Surface }
  | { kind: 'piece'; piece: Piece; surface?: Surface; size?: 's' | 'm' | 'l' }
  | { kind: 'row'; heading?: string; pieces: Piece[]; size?: 's' | 'm' | 'l'; surface?: Surface; note?: string }
  | { kind: 'grid'; heading?: string; pieces: Piece[]; cols: 2 | 3; surface?: Surface; note?: string }
  | { kind: 'stack'; heading?: string; pieces: Piece[]; surface?: Surface; note?: string }
  | { kind: 'scale'; heading?: string; pieces: Piece[]; surface?: Surface; note?: string }
  | { kind: 'sequence'; heading?: string; steps: { piece: Piece; title: string; text: string; fit?: 'cover' | 'contain' }[]; surface?: Surface }
  | { kind: 'swatches'; heading?: string; text?: string; colors: { hex: string; name: string; ink: string }[]; piece?: Piece }
  | { kind: 'statement'; text: string; note?: string; pieces?: Piece[]; surface?: Surface }
  | { kind: 'anatomy'; heading?: string; piece: Piece; zones: { x: number; y: number; w: number; h: number; title: string; text: string }[]; surface?: Surface; note?: string }
  | { kind: 'markers'; heading?: string; piece: Piece; points: { x: number; y: number; title: string; text: string }[]; surface?: Surface }
  | { kind: 'pair'; heading?: string; a: Piece; b: Piece; text?: string; surface?: Surface };

export type Project = {
  slug: string;
  title: string;
  /** Tipo de proyecto, tal como se describe en el resumen. */
  category: string;
  /** Título partido en líneas para el índice y el caso. */
  lines?: string[];
  client: string;
  year: string;
  role: string;
  status?: string;
  formats: string[];
  /** Formato emblemático: define el ancho tipográfico del título. */
  format: { name: string; ratio: number };
  field: string;
  ink: string;
  alt?: { bg: string; ink: string };
  summary: string;
  cover: Piece;
  hero: { piece: Piece; mode: 'bleed' | 'piece'; surface?: Surface };
  blocks: Block[];
  credits?: string[];
};

const p = (ref: string, name: string, format?: string, extra: Partial<Piece> = {}): Piece => ({ ref, name, format, ...extra });

export const stretchFor = (ratio: number) => Math.round(Math.min(150, Math.max(50, 100 + 60 * Math.log2(ratio))));

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'dia-del-nino',
    title: 'Día del Niño',
    category: 'Evento en tienda',
    lines: ['Día del', 'Niño'],
    client: 'Ripley y Banco Ripley',
    year: '2025',
    role: 'Espacio, gráfica, paleta para proveedores, impresos y merchandising',
    formats: ['Arcos', 'Floorgraphics', 'Counter', 'Forro de pilares', 'Tarjetas de canje', 'Merchandising'],
    format: { name: 'Arco de entrada', ratio: 0.75 },
    field: '#FFCD00',
    ink: '#101010',
    alt: { bg: '#FF0094', ink: '#FFFFFF' },
    summary: 'Un evento para familias dentro de la tienda abierta, en Ripley Costanera Center. Diseñé el espacio y sus elementos, definí la paleta para todos los proveedores y preparé impresos y merchandising.',
    cover: p('dia-del-nino/ddn_f1346', 'Arco de entrada instalado', 'Foto de montaje', { focus: '50% 45%' }),
    hero: { piece: p('dia-del-nino/ddn_f1346', 'Arco de entrada y pasillo de franjas', 'Ripley Costanera Center, 3 de agosto de 2025', { focus: '50% 42%', alt: 'Arco de entrada del Día del Niño con franjas rosadas, naranjas y amarillas, seguido por un pasillo de piso a rayas dentro de la tienda.' }), mode: 'bleed' },
    blocks: [
      {
        kind: 'notes',
        text: [
          'El evento ocurría dentro de la tienda abierta, un domingo, con zonas para juegos, mesas, un rincón creativo, una piscina de pelotas y un counter de popcorn.',
          'Arcos, pisos, módulos e impresos los fabricaban proveedores distintos. Todo tenía que salir del mismo tono y leerse como un solo recorrido.',
        ],
        decisions: [
          'Una paleta cerrada de seis colores, con Pantone, CMYK y HEX, compartida con la productora en julio de 2025.',
          'Un vocabulario de formas (arcos, ondas, estrellas, cubos) que solo usa esos seis colores.',
          'El pasillo de franjas sigue desde el arco hasta el fondo de la tienda: la entrada y el recorrido son una sola pieza.',
        ],
      },
      {
        kind: 'swatches',
        heading: 'Seis colores para todos los proveedores',
        colors: [
          { hex: '#FF0094', name: 'Pantone 225 C', ink: '#FFFFFF' },
          { hex: '#FFCD00', name: 'Pantone 116 C', ink: '#101010' },
          { hex: '#DFABFF', name: 'Pantone 3543 C', ink: '#101010' },
          { hex: '#FF80CF', name: 'Pantone 237 C', ink: '#101010' },
          { hex: '#FF8D1F', name: 'Pantone 151 C', ink: '#101010' },
          { hex: '#53565A', name: 'Cool Gray 11 C', ink: '#FFFFFF' },
        ],
        piece: p('dia-del-nino/d_formas', 'Formas del sistema', 'Arcos, ondas, estrellas y cubos'),
      },
      {
        kind: 'sequence',
        heading: 'Del plano al montaje',
        surface: 'ground',
        steps: [
          { piece: p('dia-del-nino/ddn_plano2', 'Planta del evento', 'Zonas, medidas y circulación'), title: 'Planta', text: 'Zonas, medidas y circulación dentro de la tienda.' },
          { piece: p('dia-del-nino/ddn_3d1', 'Torre de cubos en 3D', 'Revisión de volumen'), title: 'Volumen', text: 'La torre de cubos modelada para revisar proporciones con la productora.' },
          { piece: p('dia-del-nino/ddn_f1354', 'Torre de cubos instalada', 'Foto de montaje', { focus: '50% 55%' }), title: 'Montaje', text: 'La torre instalada, con el piso de ondas.', fit: 'cover' },
        ],
      },
      {
        kind: 'pair',
        heading: 'El arco de entrada',
        a: p('dia-del-nino/ddn_arco', 'Frente del arco', 'Original de impresión'),
        b: p('dia-del-nino/ddn_3d4', 'Arco en volumen', 'Revisión con la productora'),
        text: 'El frente plano y su versión en volumen. El arco abre un pasillo de franjas que atraviesa la tienda.',
      },
      {
        kind: 'markers',
        heading: 'El counter de popcorn',
        surface: 'dark',
        piece: p('dia-del-nino/ddn_f1353', 'Counter de popcorn instalado', 'Foto de montaje'),
        points: [
          { x: 47, y: 33, title: 'Arco con letrero', text: 'Misma familia de arcos que la entrada.' },
          { x: 38, y: 51, title: 'Faldón de franjas', text: 'Rosa y magenta de la paleta.' },
          { x: 38, y: 79, title: 'Floorgraphic de ondas', text: 'Une el counter con el recorrido.' },
        ],
      },
      {
        kind: 'grid',
        heading: 'Zonas del evento',
        cols: 2,
        surface: 'ground',
        pieces: [
          p('dia-del-nino/ddn_f1350', 'Rincón creativo', 'Foto de montaje'),
          p('dia-del-nino/ddn_f1370', 'Piscina de pelotas', 'Foto de montaje'),
          p('dia-del-nino/ddn_f1349', 'Mesas', 'Foto de montaje'),
          p('dia-del-nino/ddn_f1355', 'Recorrido', 'Foto de montaje'),
        ],
      },
      {
        kind: 'row',
        heading: 'Originales de gran formato',
        surface: 'dark',
        size: 'l',
        pieces: [
          p('dia-del-nino/d_pop', 'Counter de popcorn', 'Frente'),
          p('dia-del-nino/d_pop2', 'Counter de popcorn', 'Lateral'),
          p('dia-del-nino/d_pilar1', 'Forro de pilares', 'Lunares de la paleta'),
        ],
        note: 'Originales de impresión para los módulos del evento.',
      },
      {
        kind: 'row',
        heading: 'Impresos del día',
        size: 'm',
        pieces: [
          p('dia-del-nino/d_donut', 'Tarjeta de canje', 'Donut'),
          p('dia-del-nino/d_jug', 'Tarjeta de canje', 'Juguete sorpresa'),
          p('dia-del-nino/d_pinta', 'Tarjeta', 'Actividad de pintura'),
        ],
      },
      {
        kind: 'grid',
        heading: 'Merchandising y staff',
        cols: 3,
        surface: 'ground',
        pieces: [
          p('dia-del-nino/ddn_hood2', 'Polerón de staff', 'Maqueta'),
          p('dia-del-nino/ddn_hood1', 'Polerón', 'Variante'),
          p('dia-del-nino/ddn_hood3', 'Polerón', 'Variante'),
          p('dia-del-nino/ddn_lany', 'Lanyard', 'Maqueta'),
          p('dia-del-nino/ddn_globos', 'Globos', 'Maqueta'),
          p('dia-del-nino/ddn_pop', 'Caja de popcorn', 'Maqueta'),
        ],
      },
    ],
    credits: ['Fotos de montaje: MacroMKT.'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'campeones-sin-limites',
    title: 'Campeones Sin Límites',
    category: 'Evento deportivo y campaña',
    lines: ['Campeones', 'Sin Límites'],
    client: 'Ripley, Teletón y Canal 13',
    year: '2025',
    role: 'Piezas de implementación del evento, cierre de originales y campaña en Metro',
    formats: ['Lienzo 5 × 1 m', 'Bastidores 3 × 1 m', 'Banderas vela', 'Arco y pera inflables', 'Carpas', 'Poleras', 'Metro: muros, vagones y pisos'],
    format: { name: 'Lienzo colgante 500 × 100 cm', ratio: 5 },
    field: '#E4007C',
    ink: '#FFFFFF',
    summary: 'Encuentro deportivo paralímpico de Teletón en el Estadio Nacional, con delegaciones de Santiago, Concepción, Temuco, Valdivia y Aysén. Diseñé las piezas que vistieron las sedes y preparé los originales; un mes después, la campaña en Metro con deportistas del Team Para Chile.',
    cover: p('campeones-sin-limites/c_kv1', 'Key visual de Metro', 'Campaña en Metro'),
    hero: { piece: p('campeones-sin-limites/c_kv1', 'Key visual de la campaña en Metro', 'Formato horizontal', { alt: 'Key visual: una nadadora con gorra y antiparras, las letras de Ripley de fondo y la frase "No somos una historia, hacemos historia".' }), mode: 'piece' },
    blocks: [
      {
        kind: 'notes',
        text: [
          'El evento ocupaba varias sedes dentro del estadio (básquetbol, piscina, pista atlética y tenis de mesa) y sumaba más de diez auspiciadores.',
          'Todo tenía que leerse como un mismo evento, y cada pieza tenía que llegar a producción con la medida correcta.',
        ],
        decisions: [
          'Bastidores en dos familias: una de marca, en fucsia, y otra blanca para auspiciadores, con dos logos por paño para que ninguno se perdiera a distancia.',
          'Un borde de color y una franja con el nombre del evento en cada paño, para que las piezas se lean como una sola línea cuando se instalan juntas.',
          'Las piezas se trabajaron sobre fotomontajes de la productora y se ajustaron con ellos: área útil de las carpas, bolsillo de las banderas, gráfica de poleras según talla.',
          'Una planilla compartida con la productora para seguir el estado de cada elemento y dejar el enlace a su original.',
        ],
      },
      {
        kind: 'scale',
        heading: 'Las piezas a escala real',
        surface: 'ground',
        pieces: [
          p('campeones-sin-limites/s_csl_01', 'Lienzo colgante', '500 × 100 cm', { cm: [500, 100] }),
          p('campeones-sin-limites/c_b6', 'Bastidor de marca', '300 × 100 cm', { cm: [300, 100] }),
          p('campeones-sin-limites/c_b1', 'Bastidor de auspiciadores', '300 × 100 cm', { cm: [300, 100] }),
          p('campeones-sin-limites/s_csl_07', 'Tótem', '100 × 180 cm', { cm: [100, 180] }),
          p('campeones-sin-limites/s_csl_05', 'Bandera vela', '100 × 300 cm', { cm: [100, 300] }),
        ],
        note: 'Proporciones reales entre piezas. El mismo borde y la misma franja las unen cuando se instalan juntas.',
      },
      {
        kind: 'grid',
        heading: 'Implementación del estadio',
        cols: 3,
        surface: 'ground',
        pieces: [
          p('campeones-sin-limites/c_frame', 'Frame de prensa', 'Fotomontaje'),
          p('campeones-sin-limites/c_pagoda', 'Carpa', 'Fotomontaje'),
          p('campeones-sin-limites/csl_arco', 'Arco de entrada', 'Fotomontaje'),
          p('campeones-sin-limites/csl_pera', 'Pera inflable', 'Fotomontaje'),
          p('campeones-sin-limites/c_bandera', 'Banderas vela', 'Fotomontaje'),
          p('campeones-sin-limites/csl_carpa2', 'Carpa araña', 'Fotomontaje'),
        ],
        note: 'Gráfica aplicada sobre los fotomontajes 3D de la productora.',
      },
      {
        kind: 'pair',
        heading: 'Una polera por delegación',
        surface: 'dark',
        a: p('campeones-sin-limites/c_pol', 'Poleras de las cinco delegaciones', 'Frente y espalda'),
        b: p('campeones-sin-limites/c_vol', 'Polera de voluntarios', 'Misma base'),
        text: 'Cinco delegaciones (Concepción, Aysén, Santiago, Valdivia y Temuco), un degradé por ciudad y el nombre en la manga para reconocer a cada equipo en cancha.',
      },
      {
        kind: 'statement',
        text: 'No somos una historia, hacemos historia.',
        note: 'La frase de la campaña en Metro. Cada pieza pone al deportista primero y la marca a la altura de la vista.',
        pieces: [p('campeones-sin-limites/c_ht1', 'Tótem de mano', 'Metro')],
      },
      {
        kind: 'grid',
        heading: 'Un deportista por pieza',
        cols: 2,
        surface: 'dark',
        pieces: [
          p('campeones-sin-limites/c_kv3', 'Key visual', 'Tenis de mesa'),
          p('campeones-sin-limites/c_kv4', 'Key visual', 'Tenis de mesa'),
          p('campeones-sin-limites/c_kv5', 'Key visual', 'Básquetbol en silla de ruedas'),
          p('campeones-sin-limites/c_kv6', 'Key visual', 'Atletismo'),
        ],
        note: 'Fotos de deportistas: material de campaña.',
      },
      {
        kind: 'stack',
        heading: 'Franjas interiores de vagón',
        surface: 'dark',
        pieces: [
          p('campeones-sin-limites/c_v1', 'Franja de vagón', 'Atletismo'),
          p('campeones-sin-limites/c_v2', 'Franja de vagón', 'Natación'),
          p('campeones-sin-limites/c_v3', 'Franja de vagón', 'Tenis de mesa'),
        ],
        note: 'Formato angosto de las líneas 3 y 6: retrato y foto en acción de un deportista distinto en cada franja.',
      },
      {
        kind: 'pair',
        heading: 'Muro de andén, estación Plaza de Maipú',
        surface: 'ground',
        a: p('campeones-sin-limites/csl_muro2', 'Muro de andén', 'Fotomontaje para la presentación a Metro'),
        b: p('campeones-sin-limites/csl_muro3', 'Muro de andén', 'Variante'),
        text: 'La foto a escala real, sobre las bancas de la estación.',
      },
      {
        kind: 'row',
        heading: 'Floorgraphics de cancha',
        size: 'm',
        pieces: [
          p('campeones-sin-limites/c_floor', 'Pista atlética', 'Vinilo de piso'),
          p('campeones-sin-limites/csl_piso1', 'Cancha de básquetbol', 'Vinilo de piso'),
          p('campeones-sin-limites/csl_piso2', 'Cancha de básquetbol', 'Variante'),
        ],
      },
      {
        kind: 'row',
        heading: 'Propuestas y cierre',
        size: 'm',
        surface: 'ground',
        pieces: [
          p('campeones-sin-limites/csl_avion', 'Avión LATAM', 'Propuesta de ploteo'),
          p('campeones-sin-limites/c_mail', 'Mailing de agradecimiento', 'Teletón y Ripley'),
          p('campeones-sin-limites/f_gccsl', 'Gift cards del evento', 'Pliego de impresión'),
        ],
      },
    ],
    credits: ['Fotomontajes 3D: productora del evento (MacroMKT).', 'Fotos de deportistas: material de campaña.', 'El logo Campeones Sin Límites viene de ediciones anteriores.'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'toys-r-us',
    title: 'Toys"R"Us llega a Ripley',
    category: 'Lanzamiento',
    lines: ['Toys"R"Us', 'llega a Ripley'],
    client: 'Ripley',
    year: '2025',
    role: 'Invitaciones, piezas de inauguración, punto de venta, gift cards y animación',
    formats: ['Save the date', 'Invitaciones', 'Arcos', 'Tallímetro', 'Merchandising', 'Gift cards', 'Stories animadas'],
    format: { name: 'Post 1:1', ratio: 1 },
    field: '#E2231A',
    ink: '#FFFFFF',
    alt: { bg: '#F7C6D6', ink: '#101010' },
    summary: 'La juguetería Toys"R"Us llegó a Ripley Parque Arauco y Mall Marina. Sobre el concepto gráfico de la agencia ODN hice invitaciones, piezas de la inauguración, el torneo de Beyblade, piezas de tienda y las gift cards de Navidad.',
    cover: p('toys-r-us/t_std', 'Save the date', 'Post 1:1'),
    hero: { piece: p('toys-r-us/t_std', 'Save the date de la inauguración', 'Post 1:1', { alt: 'Save the date de Toys"R"Us en Ripley: franjas rosadas y rojas, el logo de la juguetería, la jirafa Geoffrey y el oso Ripley asomándose por los bordes, y la fecha 8.11.25.' }), mode: 'piece', surface: 'alt' },
    blocks: [
      {
        kind: 'notes',
        text: [
          'La campaña tenía que sentirse Toys"R"Us sin dejar de ser Ripley: dos marcas con códigos muy distintos en un mismo espacio, y un calendario de aperturas en Marina y Parque Arauco.',
          'Trabajé con las guías de marca de Toys"R"Us y de su personaje, la jirafa Geoffrey.',
        ],
        decisions: [
          'Franjas rosadas y rojas; Geoffrey y el oso Ripley se asoman desde los bordes. Fecha y hora mandan, los personajes acompañan.',
          'El tallímetro usa a Geoffrey como regla: el cuello marca de 0,90 a 2,00 m, y la frase "¡Me fascina verte crecer!" une el "me fascina" de Ripley con la marca de juguetes.',
          'Stories animadas con Geoffrey en la ciudad para invitar a conocerlo en cada tienda.',
        ],
      },
      {
        kind: 'grid',
        heading: 'Un save the date, cuatro versiones',
        cols: 2,
        surface: 'alt',
        pieces: [
          p('toys-r-us/tru_std1', 'Save the date', 'Post'),
          p('toys-r-us/tru_std2', 'Save the date', 'Variante'),
          p('toys-r-us/tru_std3', 'Save the date', 'Variante'),
          p('toys-r-us/tru_std4', 'Save the date', 'WhatsApp'),
        ],
      },
      {
        kind: 'row',
        heading: 'Invitaciones por público',
        size: 'm',
        surface: 'ground',
        pieces: [
          p('toys-r-us/t_ig', 'Invitación', 'Genérica'),
          p('toys-r-us/t_ie', 'Invitación', 'Con nombre'),
          p('toys-r-us/t_ir', 'Invitación', 'Retiro'),
          p('toys-r-us/t_id', 'Invitación', 'Formato vertical'),
        ],
        note: 'La misma pieza, con el texto ajustado a quién la recibe.',
      },
      {
        kind: 'row',
        heading: 'Arcos de bienvenida',
        size: 'm',
        surface: 'alt',
        pieces: [
          p('toys-r-us/tru_arco1', 'Frente del arco', 'Remate de estrellas'),
          p('toys-r-us/tru_arco2', 'Frente del arco', 'Remate de logo'),
          p('toys-r-us/tru_arco3', 'Frente del arco', 'Bienvenida'),
          p('toys-r-us/tru_arco3d', 'Arco en volumen', 'Vista para producción'),
        ],
      },
      {
        kind: 'pair',
        heading: 'Tallímetro',
        surface: 'ground',
        a: p('toys-r-us/s_tru_01', 'Tallímetro', '0,90 a 2,00 m'),
        b: p('toys-r-us/s_tru_05v', 'Invitación animada', 'Story 9:16', { video: 'tru05' }),
        text: 'El cuello de Geoffrey es la regla. Al lado, la story animada que invitaba a conocerlo en cada tienda.',
      },
      {
        kind: 'row',
        heading: 'Merchandising y piezas de mesa',
        size: 's',
        surface: 'dark',
        pieces: [
          p('toys-r-us/tru_lany', 'Lanyard', 'Maqueta'),
          p('toys-r-us/tru_don1', 'Sticker', 'Troquelado'),
          p('toys-r-us/tru_don2', 'Sticker', 'Troquelado'),
          p('toys-r-us/tru_palet', 'Vale Palettas', 'Impreso'),
          p('toys-r-us/t_cucu', 'Cucurucho', 'Troquel'),
          p('toys-r-us/t_counter', 'Counter', 'Frente'),
        ],
      },
      {
        kind: 'row',
        heading: 'Gift cards',
        size: 's',
        surface: 'ground',
        pieces: [
          p('toys-r-us/tru_gct1', 'Gift card', 'Ilustración 1'),
          p('toys-r-us/tru_gct2', 'Gift card', 'Ilustración 2'),
          p('toys-r-us/tru_gct3', 'Gift card', 'Ilustración 3'),
          p('toys-r-us/t_gc', 'Gift card $20.000', 'Evento'),
          p('toys-r-us/t_fila', 'Número de fila', '20 × 20 cm'),
        ],
      },
      {
        kind: 'row',
        heading: 'Torneo Beyblade X',
        size: 'l',
        surface: 'dark',
        pieces: [
          p('toys-r-us/t_bb', 'Inscripción', 'Story'),
          p('toys-r-us/t_bbg', 'Aviso a participantes', 'Post'),
          p('toys-r-us/t_bbs', 'Aviso a suplentes', 'Post'),
        ],
        note: '22 de noviembre, Toys"R"Us Ripley Parque Arauco. Tres piezas, un mismo fondo de trompos en choque.',
      },
      {
        kind: 'row',
        heading: 'Navidad en la juguetería',
        size: 'm',
        surface: 'alt',
        pieces: [
          p('toys-r-us/tru_nav', 'Ilustración de temporada', 'Post'),
          p('toys-r-us/tru_gcv', 'Mailing', 'Los primeros 100 reciben gift card'),
          p('toys-r-us/tru_tata', 'Cantacuentos', 'Invitación'),
        ],
      },
    ],
    credits: ['Concepto gráfico: agencia ODN.', 'Fotos de tienda: MacroMKT.'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'new-romantic',
    title: 'New Romantic y moda',
    category: 'Campaña de temporada',
    lines: ['New Romantic', 'y moda'],
    client: 'Ripley · marcas de moda',
    year: '2025',
    role: 'Dirección de arte, retoque, tipografía y piezas de lanzamiento',
    formats: ['Gráficas de tienda 40 × 60 y 35 × 45 cm', 'Redes sociales', 'WhatsApp', 'Pantallas'],
    format: { name: 'Gráfica de tienda 40 × 60 cm', ratio: 0.667 },
    field: '#D9CDBB',
    ink: '#101010',
    summary: 'Campaña de temporada para moda mujer. No había key visual, así que propuse la tipografía y el tratamiento de las fotos, y después lo adapté a redes y a gráficas de tienda. Junto a ella, lanzamientos y contenidos para marcas de moda.',
    cover: p('new-romantic/s_nr_01', 'Key visual New Romantic', 'Gráfica de tienda'),
    hero: { piece: p('new-romantic/s_nr_01', 'Key visual New Romantic', 'Gráfica de tienda', { alt: 'Modelo con blusa rosada tejida sobre papel mural floral, con el título "new Romantic" en serif fina y letra manuscrita.' }), mode: 'piece' },
    blocks: [
      {
        kind: 'notes',
        text: [
          'Las fotos de producción venían sobre un fondo blanco de estudio. La colección pedía un tono romántico que las fotos no tenían.',
        ],
        decisions: [
          'Integré a las modelos sobre un papel mural floral. Cada foto necesitó retoque de bordes y color para que el recorte se viera natural sobre un fondo con textura.',
          'Una serif fina para "new" y una manuscrita para "Romantic": la palabra de la colección manda y la otra la acompaña.',
          'La primera versión tapaba la ropa con el título. La ajusté más chica y al costado, para que el producto siguiera siendo el protagonista.',
          'Cinco fotos en dos medidas de tienda, más las versiones para redes.',
        ],
      },
      {
        kind: 'sequence',
        heading: 'Del estudio al papel mural',
        surface: 'ground',
        steps: [
          { piece: p('new-romantic/s_nr_04', 'Retoque', 'Cambio de fondo'), title: 'Retoque', text: 'Recorte y cambio de fondo desde la foto de estudio.' },
          { piece: p('new-romantic/s_nr_02', 'Tipografía', 'Serif fina y manuscrita'), title: 'Tipografía', text: 'Serif fina para "new", manuscrita para "Romantic".' },
          { piece: p('new-romantic/s_nr_03', 'Sistema', '40 × 60 y 35 × 45 cm'), title: 'Sistema', text: 'Cinco fotos en dos medidas de tienda.' },
        ],
      },
      {
        kind: 'row',
        heading: 'Lanzamientos de marca',
        size: 'l',
        surface: 'ground',
        pieces: [
          p('new-romantic/s_lanz_02', 'Spavaldi Milano', 'Post'),
          p('new-romantic/s_lanz_01', 'Spavaldi Milano', 'WhatsApp'),
          p('new-romantic/s_lanz_04v', 'María Paz Blanco × Marquis', 'Pantalla animada', { video: 'lanz04' }),
          p('new-romantic/s_lanz_03', 'María Paz Blanco × Marquis', 'WhatsApp'),
        ],
        note: 'Spavaldi: tipografía espaciada y mucho aire sobre la foto, casi sin fucsia, para el tono italiano de la marca. María Paz Blanco × Marquis: la foto manda y el concurso va en una sola franja.',
      },
      {
        kind: 'bleed',
        surface: 'dark',
        piece: p('new-romantic/m_marq', 'Marquis', 'Exclusivo para clientas gold, silver y plus'),
      },
      {
        kind: 'row',
        heading: 'Me fascina: marcas de temporada',
        size: 'm',
        surface: 'dark',
        pieces: [
          p('new-romantic/m_beach', 'Beach Club', 'Clientas gold'),
          p('new-romantic/fl_sfera', 'Sfera', 'Post'),
          p('new-romantic/fl_tat1', 'Tatienne', 'Post'),
          p('new-romantic/fl_tat2', 'Tatienne', 'Carrusel'),
        ],
        note: 'La foto de campaña ordena la pieza y el "me fascina" de Ripley firma en una esquina.',
      },
      {
        kind: 'row',
        heading: 'Denim y contenidos',
        size: 'l',
        pieces: [
          p('new-romantic/m_flip', 'Flip your Denim', 'Pendón'),
          p('new-romantic/m_ganador', 'Flip your Denim', 'Ganador'),
          p('new-romantic/s_moda_01', 'Relaxed Denim', 'Post 4:5'),
          p('new-romantic/s_moda_02', 'Vainilla & Mocha', 'Invitación interna'),
          p('new-romantic/s_moda_03v', 'New In Marquis', 'WhatsApp', { video: 'moda03' }),
        ],
        note: 'New In: las prendas entran como polaroids junto a la foto principal. Se probó en video y GIF, y salió como imagen fija porque WhatsApp obligaba a hacer clic para reproducir.',
      },
    ],
    credits: ['Fotos de modelos: material de campaña de cada marca.'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ventas-privadas',
    title: 'Ventas Privadas y Days',
    category: 'Sistema de piezas',
    lines: ['Ventas', 'Privadas', 'y Days'],
    client: 'Ripley, Banco Ripley y Ripley Puntos',
    year: '2025',
    role: 'Sistema de piezas y adaptación a formatos',
    formats: ['Pendón 100 × 200 cm', 'Pantalla vertical', 'Invitación WhatsApp', 'Mailing HTML', 'Gift card', 'Número de fila', 'Cupones'],
    format: { name: 'Pendón 100 × 200 cm', ratio: 0.5 },
    field: '#141414',
    ink: '#FFFFFF',
    alt: { bg: '#EC008C', ink: '#141414' },
    summary: 'Eventos de venta exclusiva en tiendas de Santiago y regiones. Cada uno necesitaba el mismo paquete de piezas, con descuentos y legales que cambiaban hasta el último día.',
    cover: p('ventas-privadas/s_vp_08', 'Tótem en tienda', 'Foto de tienda', { focus: '70% 40%' }),
    hero: { piece: p('ventas-privadas/s_vp_08', 'Tótem de Venta Exclusiva en tienda', 'Foto de tienda', { focus: '72% 40%', alt: 'Interior de una tienda Ripley con un tótem vertical negro y fucsia de Venta Exclusiva junto a los percheros.' }), mode: 'bleed' },
    blocks: [
      {
        kind: 'notes',
        text: [
          'Diseñar una vez y adaptar muchas: que una misma grilla sirviera para pendón, pantalla, invitación y mailing, y que cambiar un descuento no obligara a rehacer la pieza.',
        ],
        decisions: [
          'Una grilla modular de descuentos: cada categoría es una caja con el porcentaje en grande y la letra chica debajo. Sumar una exclusión o mover una categoría es cambiar una caja.',
          'La misma retícula pasa del pendón de 1 × 2 m a la pantalla vertical y a la invitación por WhatsApp.',
          'Cada Day regional tiene su variación de color y conserva la misma estructura.',
          'El mailing se entregó en HTML, listo para que el equipo de envíos lo copiara y pegara sin que se pixelara.',
        ],
      },
      {
        kind: 'anatomy',
        heading: 'Anatomía de una invitación',
        surface: 'field',
        piece: p('ventas-privadas/v_trebol', 'Invitación Venta Privada Mall Plaza Trébol', 'WhatsApp'),
        zones: [
          { x: 62, y: 14.5, w: 37, h: 8.5, title: 'Fecha, hora y tienda', text: 'El único dato que cambia de tienda en tienda.' },
          { x: 7.5, y: 34, w: 41, h: 10, title: 'Caja de categoría', text: 'Porcentaje grande, legal chico debajo.' },
          { x: 50.5, y: 32, w: 43, h: 50, title: 'Columnas iguales', text: 'Sumar una categoría es sumar una caja.' },
          { x: 7, y: 89, w: 42, h: 4, title: 'Confirmación', text: 'Botón al link de inscripción.' },
        ],
        note: 'Venta Privada Mall Plaza Trébol, 29 de agosto, 19:30 a 21:30.',
      },
      {
        kind: 'scale',
        heading: 'Del pendón a la gift card, a escala',
        surface: 'ground',
        pieces: [
          p('ventas-privadas/s_vp_04', 'Pendón Quilpué Day', '100 × 200 cm', { cm: [100, 200] }),
          p('ventas-privadas/s_vp_03', 'Número de fila', '20 × 20 cm', { cm: [20, 20] }),
          p('ventas-privadas/s_vp_02', 'Gift card', '20 × 15 cm', { cm: [20, 15] }),
        ],
        note: 'Proporción real entre el pendón, el número de fila y la gift card: el mismo sistema, de dos metros a veinte centímetros.',
      },
      {
        kind: 'row',
        heading: 'Misma estructura, una tienda por pieza',
        size: 'l',
        surface: 'ground',
        pieces: [
          p('ventas-privadas/v_chillan', 'Chillán Day', 'Pendón'),
          p('ventas-privadas/v_quilpue', 'Quilpué Day', 'Pendón'),
          p('ventas-privadas/v_curico', 'Curicó Day', 'Pendón'),
          p('ventas-privadas/v_conce', 'Conce Day', 'Pendón'),
          p('ventas-privadas/v_marinad', 'Marina Days', 'Pendón'),
          p('ventas-privadas/v_valpo', 'Valparaíso Day', 'Pendón'),
        ],
      },
      {
        kind: 'row',
        heading: 'Temporada de Navidad',
        size: 'l',
        surface: 'alt',
        pieces: [
          p('ventas-privadas/v_mar1', 'Venta Privada Marina', 'Post'),
          p('ventas-privadas/v_mar2', 'Venta Privada Marina', 'Story'),
          p('ventas-privadas/v_marpen', 'Venta Exclusiva Marina', 'Pendón'),
          p('ventas-privadas/v_marpan', 'Venta Exclusiva Marina', 'Pantalla'),
          p('ventas-privadas/v_iqq', 'Iquique Day', 'Pantalla'),
        ],
        note: 'La grilla pasó a franjas rojas y rosadas; la estructura siguió igual.',
      },
      {
        kind: 'row',
        heading: 'Cupones y convenios',
        size: 'm',
        surface: 'ground',
        pieces: [
          p('ventas-privadas/v_cup1', 'Cupón Mall Plaza', 'Barra de descuentos'),
          p('ventas-privadas/v_cup2', 'Cupones de descuento', 'Post'),
          p('ventas-privadas/v_cupnav', 'Cupón de Navidad', 'Impreso'),
        ],
      },
    ],
    credits: ['Foto de tienda: MacroMKT.', 'Fotos de modelos: material de campaña.'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'me-fascinan-las-sandalias',
    title: 'Me fascinan las sandalias',
    category: 'Video para pantallas',
    lines: ['Me fascinan', 'las sandalias'],
    client: 'Ripley · Calzado',
    year: '2025',
    role: 'Diseño y animación para pantallas digitales',
    formats: ['Pantalla Metro 16:9', 'Pantalla Metro 9:16'],
    format: { name: 'Pantalla 16:9', ratio: 1.78 },
    field: '#EDE6DD',
    ink: '#101010',
    summary: 'Video de temporada para las pantallas digitales de Metro de Santiago. Presenta las tendencias (cangrejeras, toe post, strappy, gladiadoras y hawaianas) y se adaptó a los distintos formatos de pantalla.',
    cover: p('me-fascinan-las-sandalias/s_sand_01v', 'Pantalla horizontal', '16:9'),
    hero: { piece: p('me-fascinan-las-sandalias/s_sand_01v', 'Loop para pantallas de Metro', 'Horizontal 16:9', { video: 'sand01', alt: 'Video: piernas de modelos con distintas sandalias y el título "me fascinan las sandalias", con la "a" en fucsia.' }), mode: 'piece' },
    blocks: [
      {
        kind: 'notes',
        text: ['Un loop corto que se entendiera sin sonido y en pocos segundos, con fotos que venían de producciones distintas.'],
        decisions: [
          'Neutralicé el fondo de las fotos que no eran de estudio para que todas convivieran en la misma secuencia.',
          'La "a" fucsia dentro de "sandalias" es el único acento de color; el resto lo pone el producto.',
          'Saqué el cierre con logo animado porque cortaba el loop continuo de las pantallas.',
        ],
      },
      {
        kind: 'pair',
        heading: 'Dos pantallas, una secuencia',
        surface: 'ground',
        a: p('me-fascinan-las-sandalias/s_sand_02v', 'Pantalla vertical', 'Andén 9:16', { video: 'sand02' }),
        b: p('me-fascinan-las-sandalias/s_sand_03', 'Cuadro de la secuencia', 'Detalle'),
        text: 'La versión vertical para los andenes conserva el orden del horizontal: producto, título, marca.',
      },
    ],
    credits: ['Fotos de producto y modelos: material de campaña.'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'ripley-beauty',
    title: 'Ripley Beauty',
    category: 'Inauguración y eventos',
    lines: ['Ripley', 'Beauty'],
    client: 'Ripley Beauty',
    year: '2025',
    role: 'Save the dates, invitaciones, gift cards de premios, piezas con marcas y gran formato',
    formats: ['Save the date', 'Versión clientas', 'Gift cards', 'Stories', 'Lienzos y muros'],
    format: { name: 'Save the date 2:3', ratio: 0.66 },
    field: '#F4C9D6',
    ink: '#2B1B22',
    alt: { bg: '#2B1B22', ink: '#F4C9D6' },
    summary: 'Inauguración de los espacios Ripley Beauty en Marina Arauco y Costanera Center, y eventos con marcas de belleza: save the dates, una versión para clientas, gift cards de premios y gráficas de gran formato.',
    cover: p('ripley-beauty/r_stdc', 'Save the date', 'Costanera Center'),
    hero: { piece: p('ripley-beauty/r_stdc', 'Save the date, inauguración Costanera Center', 'Story', { alt: 'Save the date de Ripley Beauty: modelo sosteniendo un labial rojo sobre fondo rosado y el título en bloque.' }), mode: 'piece', surface: 'alt' },
    blocks: [
      {
        kind: 'notes',
        text: ['Anunciar dos aperturas con fechas distintas manteniendo una sola pieza reconocible.'],
        decisions: [
          'Título "Save the date" en bloque, sobre la foto de campaña, con fecha y lugar como único dato variable.',
          'Para clientas, una banda vertical ("Porque eres una clienta especial") que personaliza la misma pieza sin rediseñarla.',
          'Para los ganadores de concursos, una familia de gift cards: la modelo de la campaña, el monto grande y el legal en una línea.',
        ],
      },
      {
        kind: 'pair',
        heading: 'Una banda que personaliza la pieza',
        surface: 'ground',
        a: p('ripley-beauty/r_stdc', 'General', 'Save the date'),
        b: p('ripley-beauty/r_clic', 'Clientas', 'Con banda vertical'),
        text: '"Porque eres una clienta especial": la banda convierte el save the date general en invitación sin rediseñar la pieza.',
      },
      {
        kind: 'row',
        heading: 'Gift cards de premios',
        size: 's',
        surface: 'alt',
        pieces: [
          p('ripley-beauty/r_gc100', 'Gift card', '$100.000'),
          p('ripley-beauty/r_gc50', 'Gift card', '$50.000'),
          p('ripley-beauty/r_gc25', 'Gift card', '$25.000'),
        ],
      },
      {
        kind: 'row',
        heading: 'Experiencias en tienda',
        size: 'l',
        surface: 'ground',
        pieces: [
          p('ripley-beauty/rb_exp', 'Agenda Marina', 'Story'),
          p('ripley-beauty/r_master', 'Masterclass', 'Story'),
          p('ripley-beauty/r_shak', 'Sorteo de fragancias', 'Story'),
          p('ripley-beauty/r_temuco', 'Renovación Portal Temuco', 'Pantalla horizontal'),
        ],
      },
      {
        kind: 'row',
        heading: 'Piezas con marcas',
        size: 'm',
        pieces: [
          p('ripley-beauty/r_labial', 'Día del labial', 'Cartel'),
          p('ripley-beauty/r_lgc', 'Lancôme', 'Gift card ganadora'),
          p('ripley-beauty/r_caja', 'Tus must de primavera', 'Caja'),
        ],
      },
      {
        kind: 'row',
        heading: 'Nueva colección CLO',
        size: 'l',
        surface: 'ground',
        pieces: [
          p('ripley-beauty/r_clov', 'CLO', 'Vespucio, 5 de diciembre'),
          p('ripley-beauty/r_clot', 'CLO', 'Trébol, 9 de diciembre'),
          p('ripley-beauty/r_gcclo', 'Gift card ganadora', '$10.000'),
        ],
      },
      {
        kind: 'stack',
        heading: 'Lienzos y muros de inauguración',
        surface: 'field',
        pieces: [
          p('ripley-beauty/r_lienzo', 'Lienzo', 'Gran formato'),
          p('ripley-beauty/s_rb_04', 'Muro', 'Costanera Center'),
          p('ripley-beauty/s_rb_05', 'Muro', 'Variante'),
        ],
        note: 'Productos y paleta rosa de Ripley Beauty en paños de gran formato para el espacio de inauguración.',
      },
    ],
    credits: ['Fotos de modelos: material de campaña.'],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'gamer-week',
    title: 'Gamer Week',
    category: 'Propuesta de identidad',
    lines: ['Gamer', 'Week'],
    client: 'Ripley Perú',
    year: '2025',
    status: 'Propuesta, no producida',
    role: 'Propuesta de identidad',
    formats: ['Logo', 'Uso del logo', 'Paleta', 'Elementos gráficos', 'Tipografía'],
    format: { name: 'Mini manual 16:9', ratio: 1.78 },
    field: '#3B0A6B',
    ink: '#FFFFFF',
    summary: 'Propuesta de identidad para una semana de ofertas gamer de Ripley Perú, desarrollada como mini manual. No se produjo.',
    cover: p('gamer-week/s_gw_01', 'Portada del manual', '16:9'),
    hero: { piece: p('gamer-week/s_gw_01', 'Portada del mini manual Gamer Week', '16:9', { alt: 'Portada del manual: íconos de controles en neón sobre un fondo oscuro y el logo "gamer week" con la firma "me fascina".' }), mode: 'piece', surface: 'dark' },
    blocks: [
      {
        kind: 'notes',
        text: ['Darle a la semana una identidad propia que se reconociera como gamer y siguiera siendo Ripley.'],
        decisions: [
          'Una estética neón para hablar de lo gamer y tecnológico, que aprovecha el fucsia de la marca como luz.',
          'Logo con firma "me fascina" y versión con Ripley para convivir con la marca madre.',
          'Paleta principal de Ripley más secundarios neón, y un set de íconos de línea que se usan con resplandor.',
        ],
      },
      {
        kind: 'grid',
        cols: 2,
        surface: 'dark',
        pieces: [
          p('gamer-week/s_gw_02', 'Uso del logo', 'Manual'),
          p('gamer-week/s_gw_03', 'Colores', 'Manual'),
          p('gamer-week/s_gw_04', 'Elementos gráficos', 'Manual'),
          p('gamer-week/s_gw_05', 'Tipografía', 'Manual'),
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'fiestas-patrias',
    title: 'Fiestas Patrias y gift cards',
    category: 'Piezas de temporada',
    lines: ['Fiestas Patrias', 'y gift cards'],
    client: 'Ripley',
    year: '2025',
    role: 'Ilustración y diseño de piezas de temporada',
    formats: ['Set de íconos', 'Gift cards', 'Redes sociales', 'Stories'],
    format: { name: 'Gift card', ratio: 1.57 },
    field: '#1E3A8A',
    ink: '#FFFFFF',
    summary: 'Piezas de temporada que se repiten en muchos formatos: un set de íconos ilustrados para Fiestas Patrias, gift cards por categoría y campañas para otros equipos de Ripley.',
    cover: p('fiestas-patrias/sep1', 'Set de íconos', 'Ilustración'),
    hero: { piece: p('fiestas-patrias/sep1', 'Set de íconos de Fiestas Patrias', 'Ilustración vectorial', { alt: 'Ilustraciones de Fiestas Patrias: chupalla, banderines, banderas de Chile, empanada, guitarra, escarapela y mote con huesillo, con el título "18 de septiembre".' }), mode: 'piece' },
    blocks: [
      {
        kind: 'notes',
        text: ['Dibujé los íconos del 18 (chupalla, banderines, empanada, guitarra, mote con huesillo) y los usé como sistema: en la gift card, en la trama y en redes.'],
      },
      {
        kind: 'row',
        heading: 'De los íconos a la gift card',
        size: 'm',
        surface: 'ground',
        pieces: [
          p('fiestas-patrias/sep2', 'Gift card', '18 de septiembre'),
          p('fiestas-patrias/sep3', 'Gift card', 'Variante'),
          p('fiestas-patrias/sep4', 'Gift card', 'Fiestas patrias'),
        ],
      },
      {
        kind: 'grid',
        heading: 'Gift cards por categoría',
        cols: 2,
        pieces: [
          p('fiestas-patrias/gc_v1', 'Gift card', 'Vestuario'),
          p('fiestas-patrias/gc_v2', 'Gift card', 'Calzado'),
          p('fiestas-patrias/gc_v3', 'Gift card', 'Vestuario y calzado'),
          p('fiestas-patrias/gc_calz', 'Gift card', 'Calzado, ilustración'),
        ],
        note: 'La misma foto y la categoría en grande. La de calzado cambia la foto por una ilustración de zapatillas.',
      },
      {
        kind: 'row',
        heading: 'Campañas para otros equipos',
        size: 'l',
        surface: 'ground',
        pieces: [
          p('fiestas-patrias/f_rappi', 'Ripley en Rappi', 'Post'),
          p('fiestas-patrias/f_cl1', 'Día del cambio climático', 'Story 1 de 4'),
          p('fiestas-patrias/f_cl2', 'Día del cambio climático', 'Story 2 de 4'),
          p('fiestas-patrias/f_cl3', 'Día del cambio climático', 'Story 3 de 4'),
          p('fiestas-patrias/f_cl4', 'Día del cambio climático', 'Story 4 de 4'),
        ],
        note: 'Una secuencia de cuatro stories para Sostenibilidad y una pieza para e-commerce, dentro de la misma firma de Ripley.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'activaciones',
    title: 'Activaciones en tienda',
    category: 'Activaciones con marcas',
    lines: ['Activaciones', 'en tienda'],
    client: 'Ripley con marcas invitadas',
    year: '2025',
    role: 'Módulos, piezas digitales y señalética',
    formats: ['Counter 200 × 75 cm', 'Posts y stories', 'Tótems', 'Stickers Ø 12 cm', 'Señalética'],
    format: { name: 'Counter 200 × 75 cm', ratio: 2.67 },
    field: '#FF5F1F',
    ink: '#101010',
    summary: 'Eventos cortos con marcas dentro de Ripley: un espacio para sneakers, la llegada de la pelota del Mundial, degustaciones, marcas nuevas y piezas chicas que ordenan la tienda.',
    cover: p('activaciones/a_ch', 'Puma Challenge', 'Post'),
    hero: { piece: p('activaciones/a_ch', 'Puma Challenge', 'Post', { alt: 'Pieza Puma Challenge: zapatillas rosadas y calcetines granate sobre fondo oscuro, con el título en blanco.' }), mode: 'piece', surface: 'dark' },
    blocks: [
      {
        kind: 'pair',
        heading: 'Sneakerheads: del plano al counter',
        surface: 'ground',
        a: p('activaciones/sh_counter', 'Counter', '200 × 75 y 180 × 75 cm'),
        b: p('activaciones/sh_foto', 'Counter producido', 'Foto antes de instalar'),
        text: 'Con Puma y ReparaLab, en Ripley Costanera Center.',
      },
      {
        kind: 'row',
        heading: 'Piezas del espacio',
        size: 'l',
        pieces: [
          p('activaciones/a_cust', 'Customization spot', 'Post'),
          p('activaciones/a_limp', 'Limpieza gratis', 'Post'),
          p('activaciones/a_totem', 'Personaliza tus sneakers', 'Tótem'),
        ],
      },
      {
        kind: 'row',
        heading: 'Trionda: la pelota del Mundial',
        size: 'l',
        surface: 'dark',
        pieces: [
          p('activaciones/tri1', 'Trionda', 'Anuncio'),
          p('activaciones/tri2', 'Trionda', 'Actividades'),
          p('activaciones/tri3', 'Trionda', 'Experiencia'),
          p('activaciones/tri4', 'Trionda', 'Story'),
        ],
        note: 'Dos días de actividades en Costanera Center. La pelota sobre la cabeza del jugador ordena todo: arriba el nombre, abajo la fecha y lo que hay que hacer.',
      },
      {
        kind: 'row',
        heading: 'Degustaciones y marcas nuevas',
        size: 'm',
        surface: 'ground',
        pieces: [
          p('activaciones/a_th2', 'Mejor del Café con Thomas', 'Pantalla, Temuco'),
          p('activaciones/a_th1', 'Thomas', 'Story'),
          p('activaciones/totto', 'Maletas Totto', 'Afiche'),
          p('activaciones/volk', 'Volkano', 'Post'),
        ],
      },
      {
        kind: 'row',
        heading: 'Eventos para marcas propias',
        size: 'm',
        pieces: [
          p('activaciones/a_lin', 'Maison Linett', 'Invitación'),
          p('activaciones/a_taller1', 'Taller de velas', 'Flyer'),
          p('activaciones/a_taller2', 'La Loca de las Velas', 'Flyer'),
          p('activaciones/a_tymo', 'Tymo Beauty', 'Lanzamiento'),
        ],
      },
      {
        kind: 'row',
        heading: 'Punto de venta y señalética',
        size: 'm',
        surface: 'ground',
        pieces: [
          p('activaciones/s_pdv_01', 'Edición exclusiva', 'Sticker Ø 12 cm'),
          p('activaciones/s_pdv_02', 'Sticker en tienda', 'Foto de instalación'),
          p('activaciones/s_pdv_05', 'Atención preferencial', 'Vertical'),
          p('activaciones/s_pdv_04', 'Atención preferencial', 'Versión final'),
        ],
        note: 'Pictogramas de trazo grueso en un círculo fucsia. En la versión final saqué la cruz del círculo, para que no se leyera como una prohibición.',
      },
    ],
  },
];

/* Marco de formatos de la portada: una pieza por formato, en orden de ancho. */
export const formatsReel: { piece: Piece; project: string; ratio: number }[] = [
  { piece: p('ventas-privadas/v_valpo', 'Pendón', '100 × 200 cm'), project: 'ventas-privadas', ratio: 0.5 },
  { piece: p('toys-r-us/t_bb', 'Story', '9:16'), project: 'toys-r-us', ratio: 0.5625 },
  { piece: p('toys-r-us/t_std', 'Post', '1:1'), project: 'toys-r-us', ratio: 1 },
  { piece: p('ripley-beauty/r_gc100', 'Gift card', '3:2'), project: 'ripley-beauty', ratio: 1.5 },
  { piece: p('campeones-sin-limites/s_csl_01', 'Lienzo colgante', '500 × 100 cm'), project: 'campeones-sin-limites', ratio: 5 },
  { piece: p('toys-r-us/s_tru_03', 'Sticker', 'Ø 12 cm', { round: true }), project: 'toys-r-us', ratio: 1 },
];

/* Banda "a escala" de la portada: piezas de distintos proyectos con su medida real. */
export const scaleBand: { piece: Piece; project: string }[] = [
  { piece: p('campeones-sin-limites/s_csl_01', 'Lienzo colgante', '500 × 100 cm', { cm: [500, 100] }), project: 'campeones-sin-limites' },
  { piece: p('campeones-sin-limites/s_csl_05', 'Bandera vela', '100 × 300 cm', { cm: [100, 300] }), project: 'campeones-sin-limites' },
  { piece: p('ventas-privadas/s_vp_04', 'Pendón', '100 × 200 cm', { cm: [100, 200] }), project: 'ventas-privadas' },
  { piece: p('campeones-sin-limites/c_b6', 'Bastidor', '300 × 100 cm', { cm: [300, 100] }), project: 'campeones-sin-limites' },
  { piece: p('campeones-sin-limites/s_csl_07', 'Tótem', '100 × 180 cm', { cm: [100, 180] }), project: 'campeones-sin-limites' },
  { piece: p('ventas-privadas/s_vp_03', 'Número de fila', '20 × 20 cm', { cm: [20, 20] }), project: 'ventas-privadas' },
  { piece: p('ventas-privadas/s_vp_02', 'Gift card', '20 × 15 cm', { cm: [20, 15] }), project: 'ventas-privadas' },
  { piece: p('toys-r-us/s_tru_03', 'Sticker', 'Ø 12 cm', { cm: [12, 12], round: true }), project: 'toys-r-us' },
];
