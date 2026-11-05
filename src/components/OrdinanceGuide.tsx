import React from 'react';
import { 
  FileText, 
  Scale, 
  Users, 
  HelpCircle, 
  Eye, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  HeartHandshake
} from 'lucide-react';

export const OrdinanceGuide: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'ordenanza' | 'mozos' | 'marco_legal'>('ordenanza');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Title Header */}
      <div className="mb-8 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Marco Normativo y Buenas Prácticas
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-xs font-semibold text-stone-500">
            Municipalidad de Vicuña Mackenna (Córdoba)
          </span>
        </div>
        <h1 className="text-3xl font-black text-stone-900 tracking-tight">
          Ordenanza de Carta o Menú Inclusivo
        </h1>
        <p className="text-sm text-stone-600 max-w-3xl mt-2 leading-relaxed">
          Iniciativa legislativa impulsada por la Concejal Analía Chiappe para garantizar la accesibilidad comunicacional, la autonomía personal y la eliminación de barreras en bares, restaurantes, confiterías y heladerías.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('ordenanza')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'ordenanza'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Contenido de la Ordenanza (Artículos Clave)</span>
        </button>

        <button
          onClick={() => setActiveTab('mozos')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'mozos'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Guía de Atención para Personal Gastronómico</span>
        </button>

        <button
          onClick={() => setActiveTab('marco_legal')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'marco_legal'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Fundamentos y Leyes Nacionales</span>
        </button>
      </div>

      {/* TAB 1: Key Articles */}
      {activeTab === 'ordenanza' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Art 1 & 2 */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">
                Artículo 1º y 2º
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Obligatoriedad y Alcance Universal
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Establece que en todos los establecimientos gastronómicos (bares, confiterías, heladerías, cafés, restaurantes, etc.) del ejido de Vicuña Mackenna deberán ofrecer cartas y menús inclusivos impresos con <strong>pictogramas</strong> y en <strong>sistema Braille</strong>. Dirigido a toda la población, con especial foco en TEA, diversidad cognitiva, afasia, barreras de idioma y discapacidad visual.
              </p>
            </div>

            {/* Art 3 & 8 */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">
                Artículo 3º y 8º
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Beneficios Municipales y Oblea Inclusiva
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                El Municipio establecerá acuerdos con los comercios que se adhieran, otorgando <strong>reducciones en el pago de tasas de higiene y seguridad</strong> u otros beneficios tributarios. Los locales adheridos recibirán una <strong>Oblea Oficial</strong> para su vidriera y serán difundidos en las redes y folletería turística del Municipio.
              </p>
            </div>

            {/* Art 4 & 5 */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">
                Artículo 4º y 5º
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Paridad de Precios y Actualización Periódica
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                La carta accesible debe ser <strong>idéntica a la carta ordinaria</strong>, conteniendo exactamente los mismos productos y precios vigentes. Deberá actualizarse tanto en pictogramas como en Braille cada vez que sufra modificaciones en precios o platos.
              </p>
            </div>

            {/* Art 6 & 7 */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">
                Artículo 6º y 7º
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Requisitos Técnicos de Confección
              </h3>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                <li><strong>Papel:</strong> no deslizante, no brillante ni plastificado para evitar reflejos, alto gramaje.</li>
                <li><strong>Contraste:</strong> alto contraste entre letra y fondo liso.</li>
                <li><strong>Tipografía:</strong> tamaño mínimo 14pt, fuentes legibles como Verdana, Helvética o similares.</li>
                <li><strong>Idioma español claro:</strong> si se emplean términos extranjeros, traducción obligatoria entre paréntesis (ej: <em>Croissant (Medialuna)</em>).</li>
                <li><strong>Disponibilidad:</strong> ejemplares disponibles en cada mesa y barra de atención.</li>
              </ul>
            </div>

            {/* Art 10 & 11 */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">
                Artículo 10º y 11º
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Autoridad de Aplicación y Plazo de 90 Días
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                La autoridad de aplicación es la Secretaría de Desarrollo Social a través del área de Bromatología. Los establecimientos existentes cuentan con <strong>90 días corridos</strong> para adecuarse. Para nuevas habilitaciones comerciales, será requisito previo indispensable.
              </p>
            </div>

            {/* Art 14 */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block mb-1">
                Artículo 14º
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Definición de Pictogramas y Braille
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Define el pictograma como signo icónico que representa de forma directa un objeto o significado (CAA). Y define el Braille como sistema táctil en celdas de seis puntos en relieve organizados en matriz de 3 filas por 2 columnas numeradas de arriba hacia abajo y de izquierda a derecha.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Waiter & Server Guide */}
      {activeTab === 'mozos' && (
        <div className="space-y-6">
          <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl">
            <h2 className="text-base font-bold text-amber-950 flex items-center gap-2 mb-1">
              <HeartHandshake className="w-5 h-5 text-amber-700" />
              <span>Cultura de la Empatía y Trato Digno en la Mesa</span>
            </h2>
            <p className="text-xs text-amber-900">
              La inclusión no es solo tener la carta física: la calidez, la paciencia y la comprensión del personal de atención son el factor decisivo para que toda persona disfrute plenamente de su salida gastronómica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TEA */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 bg-blue-50 text-blue-800 rounded-lg font-bold text-xs">
                  Autismo (TEA)
                </span>
                <h3 className="text-sm font-bold text-stone-900">
                  Personas con Trastorno del Espectro Autista
                </h3>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
                <li>• <strong>Dar tiempo para responder:</strong> El procesamiento de estímulos puede requerir unos segundos adicionales. Evitá apurar o interrumpir.</li>
                <li>• <strong>Respetar el Tablero CAA:</strong> Si el comensal te señala pictogramas o muestra la pantalla del celular con su pedido armado, asentí con amabilidad y confirmá sin juzgar.</li>
                <li>• <strong>Control de estímulos:</strong> Si el local cuenta con música fuerte o luces intermitentes, ofrecé una mesa más tranquila alejada de parlantes o cocina si está disponible.</li>
                <li>• <strong>Previsibilidad:</strong> Si un ingrediente se agotó, explicalo de manera directa y ofrecé una alternativa visual inmediata.</li>
              </ul>
            </div>

            {/* Afasia */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 bg-emerald-50 text-emerald-800 rounded-lg font-bold text-xs">
                  Afasia y Habla
                </span>
                <h3 className="text-sm font-bold text-stone-900">
                  Dificultades en la Comunicación y el Habla
                </h3>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
                <li>• <strong>Nunca infantillizar:</strong> Una persona con afasia (por ejemplo tras un ACV) comprende perfectamente lo que escucha; la dificultad radica en encontrar la palabra hablada. Tratala como el adulto que es.</li>
                <li>• <strong>Preguntas cerradas:</strong> Hacé preguntas concretas que puedan responderse con "sí", "no" o señalando (ej: "¿Café con leche o café solo?").</li>
                <li>• <strong>Apoyo visual:</strong> Mantené a mano la carta con pictogramas para que el comensal pueda señalar lo que desea.</li>
              </ul>
            </div>

            {/* Discapacidad Visual */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 bg-purple-50 text-purple-800 rounded-lg font-bold text-xs">
                  Visual / Ceguera
                </span>
                <h3 className="text-sm font-bold text-stone-900">
                  Personas Ciegas o con Baja Visión
                </h3>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
                <li>• <strong>Ofrecer la Carta en Braille:</strong> Preguntá al comensal si prefiere leer en Braille o si desea que le leas las opciones principales.</li>
                <li>• <strong>Orientación del plato (Técnica del reloj):</strong> Al apoyar el plato en la mesa, describí la posición de los alimentos como si fuera un reloj: "La carne está a las 6, las papas a las 12 y la ensalada a las 3".</li>
                <li>• <strong>Avisar la ubicación de la bebida:</strong> Indicá con precisión dónde queda apoyado el vaso o la botella (ej: "El vaso con agua está arriba a tu derecha").</li>
                <li>• <strong>Identificate al acercarte:</strong> Saludá con voz clara diciendo tu nombre ("Hola, soy Martín, tu mozo").</li>
              </ul>
            </div>

            {/* Discapacidad Cognitiva */}
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 bg-amber-50 text-amber-800 rounded-lg font-bold text-xs">
                  Cognitivo / Lectura Fácil
                </span>
                <h3 className="text-sm font-bold text-stone-900">
                  Diversidad Funcional Cognitiva
                </h3>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
                <li>• <strong>Lenguaje sencillo:</strong> Explicá los platos con ingredientes conocidos (ej: "Es un sándwich tostado con jamón y queso fundido").</li>
                <li>• <strong>Confirmación sin abrumar:</strong> Repetí el pedido en voz pausada para dar tranquilidad.</li>
                <li>• <strong>Atención al precio:</strong> Indicá el importe con claridad antes de cobrar para evitar momentos de incertidumbre.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Legal Basis */}
      {activeTab === 'marco_legal' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">
                Jerarquía Constitucional
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Convención sobre los Derechos de las Personas con Discapacidad
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-2">
                Aprobada por <strong>Ley Nacional Nº 26.378</strong> y con jerarquía constitucional por <strong>Ley Nº 27.044</strong> (Art. 75 inc. 22 de la Constitución Nacional).
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Obliga a los Estados y municipios a asegurar el acceso a la información y a las comunicaciones en igualdad de condiciones, haciendo de la accesibilidad un derecho humano fundamental.
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">
                Defensa del Consumidor
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Ley Nacional Nº 24.240 y DNU Nº 274/19
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Establecen el derecho de los consumidores y usuarios a recibir información adecuada, veraz y accesible, y a gozar de condiciones de trato equitativo y digno en todos los locales gastronómicos.
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">
                Constitución de Córdoba
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Artículo 27 de la Constitución Provincial
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dispone que las personas con discapacidad tienen derecho a la protección integral del Estado que garantice su inserción en la vida social y la promoción de la toma de conciencia comunitaria.
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block mb-1">
                Ordenanza Municipal
              </span>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Proyecto Concejo Deliberante de Vicuña Mackenna
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Iniciativa legislativa 2025 para el ejido urbano de Vicuña Mackenna, pionera en el sur de Córdoba para la implementación de cartas con pictogramas y sistema Braille en cada mesa.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
