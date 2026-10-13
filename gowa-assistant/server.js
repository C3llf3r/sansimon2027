import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Configuraciones (se pueden sobreescribir con variables de entorno)
const PORT = process.env.PORT || 4005;
const GOWA_API_URL = process.env.GOWA_API_URL || 'http://127.0.0.1:3333';
const GOWA_DEVICE_ID = process.env.GOWA_DEVICE_ID || 'SanSimonSucre';
const GRUPO_WHATSAPP_LINK = process.env.GRUPO_WHATSAPP_LINK || 'https://chat.whatsapp.com/ENLACE-PRUEBA-SIMON-2027';

// Archivo local de respaldo de postulaciones
const DB_FILE = path.join(__dirname, 'postulantes.json');

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
}

function guardarPostulante(data) {
  try {
    let list = [];
    if (fs.existsSync(DB_FILE)) {
      list = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
    const estado = data.estado || 'Pendiente';
    const index = list.findIndex(p => (p.codigo && p.codigo === data.codigo) || (p.telefono && data.telefono && p.telefono === data.telefono && p.codigo === data.codigo));
    if (index >= 0) {
      list[index] = { ...list[index], ...data, estado: list[index].estado || estado, fechaActualizacion: new Date().toISOString() };
    } else {
      list.unshift({ ...data, estado, fechaRegistro: new Date().toISOString() });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
    console.log(`[DB] Postulante guardado/actualizado con éxito: ${data.nombre} (${data.codigo})`);
    return true;
  } catch (err) {
    console.error('[DB Error]', err);
    return false;
  }
}

// Función para enviar estado de presencia en WhatsApp ("Escribiendo...")
async function setChatPresence(to, action = 'start') {
  try {
    const cleanPhone = to.replace(/[^0-9]/g, '');
    await fetch(`${GOWA_API_URL}/send/chat-presence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': GOWA_DEVICE_ID,
      },
      body: JSON.stringify({
        phone: cleanPhone,
        action: action, // 'start' (escribiendo) o 'stop' (pausado)
      }),
    });
  } catch (err) {
    console.error('[Chat Presence Error]:', err.message);
  }
}

// Función para simular comportamiento humano (escribiendo 3-5s) y enviar mensaje
async function enviarMensajeHumanoGoWA(to, message) {
  try {
    const cleanPhone = to.replace(/[^0-9]/g, '');
    console.log(`[GoWA Anti-Ban] Simulando presencia para: ${cleanPhone}`);

    // 1. Activar estado oficial de WhatsApp: "Escribiendo..."
    await setChatPresence(cleanPhone, 'start');

    // 2. Demora humana aleatoria entre 3 y 5 segundos
    const delayMs = Math.floor(3000 + Math.random() * 2000);
    console.log(`[GoWA Anti-Ban] Escribiendo durante ${(delayMs / 1000).toFixed(1)}s antes de enviar...`);
    await new Promise(resolve => setTimeout(resolve, delayMs));

    // 3. Detener estado de escritura
    await setChatPresence(cleanPhone, 'stop');

    // 4. Enviar mensaje oficial
    const res = await fetch(`${GOWA_API_URL}/send/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': GOWA_DEVICE_ID,
      },
      body: JSON.stringify({
        phone: cleanPhone,
        message: message,
      }),
    });

    const data = await res.json();
    console.log('[GoWA Sent Response]:', data);
    return data;
  } catch (err) {
    console.error('[GoWA Send Error]:', err.message);
  }
}

// Función para extraer campos de mensajes estructurados (soporta emojis, asteriscos de WhatsApp y saltos de línea)
function extractField(rawText, pattern) {
  const regex = new RegExp('(?:^|[\\r\\n]).*?' + pattern + '.*?[:\\*]+\\s*([^\\r\\n*]+)', 'i');
  const match = rawText.match(regex);
  if (match && match[1]) {
    const val = match[1].replace(/^[*_~]+|[*_~]+$/g, '').trim();
    if (val.length > 0) return val;
  }
  return null;
}

// ========================================================
// SISTEMA DE SEGURIDAD MULTICAPA: ANTI-LOOP & ANTI-SPAM
// ========================================================

// 1. Números del propio bot/servidor para prevenir auto-respuestas
const BOT_NUMBERS = new Set(['59170322221']);

// 2. Caché en memoria para deduplicación estricta y limitación de frecuencia
const processedMessageIds = new Map(); // id -> timestamp
const recentUserActivity = new Map(); // phone -> { lastText, lastResponseTime, windowStart, countInWindow, circuitBreakerUntil }

function isDuplicateOrSpam(sender, messageId, text) {
  const now = Date.now();

  // Limpieza periódica de memoria (entradas > 15 minutos)
  for (const [id, time] of processedMessageIds.entries()) {
    if (now - time > 15 * 60 * 1000) processedMessageIds.delete(id);
  }
  for (const [phone, data] of recentUserActivity.entries()) {
    if (now - data.windowStart > 60 * 1000 && data.circuitBreakerUntil < now) {
      recentUserActivity.delete(phone);
    }
  }

  // Capa A: Deduplicación exacta por ID de Mensaje de WhatsApp
  if (messageId) {
    if (processedMessageIds.has(messageId)) {
      console.log(`[Anti-Loop Bloqueado] MessageID ya procesado anteriormente: ${messageId}`);
      return true;
    }
    processedMessageIds.set(messageId, now);
  }

  // Capa B: Control de actividad y Rate Limiting por Remitente
  const user = recentUserActivity.get(sender) || {
    lastText: '',
    lastResponseTime: 0,
    windowStart: now,
    countInWindow: 0,
    circuitBreakerUntil: 0,
  };

  // Disyuntor activo (Circuit Breaker activado por ráfagas excesivas)
  if (user.circuitBreakerUntil > now) {
    const remainingSec = Math.ceil((user.circuitBreakerUntil - now) / 1000);
    console.warn(`[Anti-Spam Circuit Breaker] Usuario ${sender} silenciado temporalmente (${remainingSec}s restantes).`);
    return true;
  }

  // Capa C: Prevención de repetición inmediata del mismo texto exacto (< 10 segundos)
  if (user.lastText === text && now - user.lastResponseTime < 10000) {
    console.warn(`[Anti-Loop Bloqueado] Mismo texto repetido en menos de 10s de ${sender}`);
    return true;
  }

  // Capa D: Debounce de seguridad (Mínimo 3.5 segundos entre respuestas al mismo usuario)
  if (now - user.lastResponseTime < 3500) {
    console.warn(`[Anti-Spam Debounce] Mensaje recibido demasiado rápido de ${sender} (< 3.5s). Ignorado.`);
    return true;
  }

  // Capa E: Umbral de ráfaga (Máximo 5 respuestas en una ventana móvil de 1 minuto)
  if (now - user.windowStart < 60000) {
    user.countInWindow += 1;
    if (user.countInWindow > 5) {
      user.circuitBreakerUntil = now + 5 * 60 * 1000; // Bloqueo de seguridad de 5 minutos
      console.error(`🚨 [CIRCUIT BREAKER ACTIVADO] ${sender} superó 5 mensajes en 1 min. Silenciado por 5 minutos.`);
      recentUserActivity.set(sender, user);
      return true;
    }
  } else {
    user.windowStart = now;
    user.countInWindow = 1;
  }

  user.lastText = text;
  user.lastResponseTime = now;
  recentUserActivity.set(sender, user);

  return false;
}

// Endpoint Webhook para recibir mensajes de GoWA
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body || {};
    const event = body.event || '';

    // 1. Filtrar estrictamente: SOLO procesar eventos 'message'
    if (event !== 'message') {
      return res.status(200).json({ status: `Ignored non-message event: ${event}` });
    }

    // Desempaquetar payload según formato GoWA MultiDevice
    const payload = body.payload || body;

    // 2. Ignorar eventos de confirmación de entrega o lectura (ack, receipt, delivered)
    if (payload.receipt_type || payload.ids || body.event === 'message.ack' || payload.broadcast) {
      return res.status(200).json({ status: 'Ignored delivery receipt/ack' });
    }

    // 3. Ignorar mensajes enviados por el propio bot (chequeo multinivel exhaustivo)
    const isFromMe = 
      payload.is_from_me === true || 
      body.is_from_me === true || 
      payload.fromMe === true || 
      payload.key?.fromMe === true;

    if (isFromMe) {
      return res.status(200).json({ status: 'Ignored own message (isFromMe)' });
    }

    // 4. Ignorar mensajes grupales para no responder en grupos comunitarios
    const chatId = payload.chat_id || body.chat_id || '';
    if (chatId.endsWith('@g.us')) {
      return res.status(200).json({ status: 'Ignored group message' });
    }

    // 5. Validar remitente y asegurar que no sea el propio número del bot
    const senderRaw = payload.from || payload.sender || payload.phone || body.from || '';
    const sender = senderRaw.replace(/@.*$/, '').replace(/[^0-9]/g, '');
    const deviceNumber = (body.device_id || '').replace(/@.*$/, '').replace(/[^0-9]/g, '');

    if (!sender) {
      return res.status(200).json({ status: 'Ignored missing sender' });
    }

    if (BOT_NUMBERS.has(sender) || (deviceNumber && sender === deviceNumber)) {
      return res.status(200).json({ status: 'Ignored bot own phone number' });
    }

    // 6. Validar que contenga texto real
    const text = (payload.body || payload.message || payload.text || body.message || body.body || '').trim();
    if (!text || text.length === 0) {
      return res.status(200).json({ status: 'Ignored empty message' });
    }

    // 7. Deduplicación por ID de mensaje y Circuit Breaker
    const messageId = payload.id || body.id || null;
    if (isDuplicateOrSpam(sender, messageId, text)) {
      return res.status(200).json({ status: 'Ignored duplicate or rate-limited message' });
    }

    console.log(`[GoWA Webhook Procesando]: De ${sender} | MsgID: ${messageId || 'N/A'} | Texto: "${text}"`);

    // Normalizar texto para análisis conversacional
    const cleanText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    // 1. Mensaje de Postulación Oficial
    if (text.includes('ADM-2027') || cleanText.includes('postulacion oficial') || cleanText.includes('carnaval de oruro 2027')) {
      // Extraer datos directamente del texto del formulario enviado por WhatsApp
      const parsedCodigo = extractField(text, 'C[OÓ]DIGO');
      const parsedNombre = extractField(text, 'NOMBRE');
      const parsedTropa = extractField(text, 'BLOQUE');
      const parsedSede = extractField(text, 'SEDE');

      const postulante = {
        codigo: parsedCodigo || '#ADM-2027-PENDIENTE',
        nombre: parsedNombre || 'Postulante',
        tropa: parsedTropa || 'Por Asignar',
        sede: parsedSede || 'Sucre',
        telefono: sender,
      };

      guardarPostulante(postulante);

      const respuesta = 
        `🔴🔵 *¡CONFIRMACIÓN DE POSTULACIÓN - SAN SIMÓN SUCRE!* 🔴🔵\n\n` +
        `¡Hola *${postulante.nombre}*! Hemos registrado y validado tu postulación para el bloque *${postulante.tropa}* con el código oficial *${postulante.codigo}*.\n\n` +
        `📋 *INDICACIONES PARA TU ENTREVISTA:* \n` +
        `🗓 *Fechas:* 12 y 13 de Noviembre de 2026.\n` +
        `📍 *Sede:* ${postulante.sede} (El horario y salón específico se enviará por el grupo oficial).\n` +
        `👟 *Indumentaria:* Ropa deportiva cómoda para la prueba de coordinación y ritmo.\n` +
        `🪪 *Requisitos:* Cédula de Identidad original + 1 fotocopia.\n\n` +
        `📲 *SIGUIENTE PASO OBLIGATORIO:*\n` +
        `Únete ahora mismo al *Grupo Oficial de Postulantes Oruro 2027* donde publicaremos el rol de entrevistas y comunicados:\n` +
        `🔗 ${GRUPO_WHATSAPP_LINK}\n\n` +
        `_¡No es magia, es Sucre! Rumbo al Carnaval de Oruro 2027._ 🔵🔴`;

      enviarMensajeHumanoGoWA(sender, respuesta);
      return res.status(200).json({ status: 'OK' });
    }

    // 2. Consulta de Credencial / PIN / Secretaría / Portal Fraterno
    if (
      cleanText.includes('credencial') ||
      cleanText.includes('pin') ||
      cleanText.includes('secretaria') ||
      cleanText.includes('portal') ||
      cleanText.includes('carnet') ||
      cleanText.includes('login') ||
      cleanText.includes('acceso')
    ) {
      const respCredencial = 
        `🔴🔵 *PORTAL FRATERNO - CONSULTA DE CREDENCIAL & PIN* 🔴🔵\n\n` +
        `¡Hola! Hemos recibido tu solicitud para consultar tu credencial de fraterno o solicitar tu PIN para acceder al portal oficial de *San Simón Sucre*.\n\n` +
        `📋 *INDICACIONES PARA FRATERNOS:*\n` +
        `1️⃣ *Acceso con Carnet:* Puedes ingresar al portal digitando tu Cédula de Identidad (C.I.) o tu Código de Fraterno.\n` +
        `2️⃣ *PIN Inicial:* Si no cuentas con un PIN asignado o es tu primer ingreso, utiliza provisionalmente: *2027*.\n` +
        `3️⃣ *Validación con Secretaría:* Si tu registro no figura en el sistema o deseas actualizar tus datos, por favor responde a este mensaje enviando:\n` +
        `   • *Nombre Completo*\n` +
        `   • *Cédula de Identidad (C.I.)*\n` +
        `   • *Tropa o Bloque / Año de Ingreso*\n\n` +
        `Un encargado de Secretaría validará tus datos en el padrón oficial a la brevedad posible. 🔵🔴\n\n` +
        `👉 *Ingresa al portal aquí:*\n` +
        `https://sansimonsucre.nerosystem.solutions`;

      enviarMensajeHumanoGoWA(sender, respCredencial);
      return res.status(200).json({ status: 'OK' });
    }

    // 3. Saludo Inicial / Menú Principal
    const esSaludo = 
      /^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|que tal|menu|inicio|ayuda|info|informacion|empezar)\b/i.test(cleanText) ||
      cleanText === '0' ||
      cleanText.startsWith('hola') ||
      cleanText.startsWith('buenas') ||
      cleanText === 'menu' ||
      cleanText === 'ayuda';

    if (esSaludo) {
      const menu = 
        `🔴🔵 *¡HOLA! BIENVENIDO A CAPORALES SAN SIMÓN SUCRE* 🔴🔵\n` +
        `_30 años de magia y pasión rumbo al Carnaval de Oruro 2027._ 🔵🔴\n\n` +
        `Soy el Asistente Virtual Oficial. ¿En qué te podemos ayudar hoy?\n\n` +
        `Por favor, responde con el *NÚMERO* de la opción que necesitas:\n\n` +
        `1️⃣ *Quiero Postular a Oruro 2027* (Requisitos y pase digital)\n` +
        `2️⃣ *Horarios y Lugares de Ensayo* (Sede Sucre)\n` +
        `3️⃣ *Conocer las Tropas y Bloques* (Machos, Cholitas, Figuras)\n` +
        `4️⃣ *Directorio de Filiales* (Bolivia, América y Europa)\n` +
        `5️⃣ *Hablar con un Coordinador / Directiva*\n` +
        `🔑 *Portal Fraterno / PIN / Credencial* (Escribe *CREDENCIAL* o *PIN*)\n\n` +
        `🌐 También puedes ingresar a nuestro portal web oficial:\n` +
        `👉 https://sansimonsucre.nerosystem.solutions`;

      enviarMensajeHumanoGoWA(sender, menu);
      return res.status(200).json({ status: 'OK' });
    }

    // 4. Opción 1: Convocatoria y Postulación
    if (cleanText === '1' || cleanText.includes('postular') || cleanText.includes('postulacion')) {
      const resp1 = 
        `🪪 *CONVOCATORIA Y POSTULACIÓN - ORURO 2027* 🪪\n\n` +
        `Para postular a la fraternidad rumbo al Carnaval de Oruro 2027 sigue estos pasos:\n\n` +
        `1. Ingresa a nuestra web oficial:\n` +
        `👉 https://sansimonsucre.nerosystem.solutions\n\n` +
        `2. Haz clic en el botón *POSTULAR AHORA*.\n` +
        `3. Completa tus datos y selecciona tu tropa o figura preferida.\n` +
        `4. Se generará tu pase digital con tu código único oficial (*#ADM-2027-XXXX*).\n\n` +
        `🗓 *Fechas de Audición:* 12 y 13 de Noviembre de 2026.\n` +
        `📍 *Sede Principal:* Sucre (también en filiales autorizadas).\n\n` +
        `_¡Te esperamos para hacer historia juntos!_ 🔵🔴`;

      enviarMensajeHumanoGoWA(sender, resp1);
      return res.status(200).json({ status: 'OK' });
    }

    // 5. Opción 2: Horarios y Ensayos
    if (cleanText === '2' || cleanText.includes('ensayo') || cleanText.includes('horario')) {
      const resp2 = 
        `👟 *HORARIOS Y LUGARES DE ENSAYO - SEDE SUCRE* 📍\n\n` +
        `Nuestros ensayos de preparación rumbo a Oruro 2027 son:\n\n` +
        `🗓 *Sábados:* 15:00 a 18:00 hrs\n` +
        `🗓 *Domingos:* 09:30 a 12:30 hrs\n\n` +
        `📍 *Puntos de Encuentro:* Parque Bolívar / Canchas del Coliseo Universitario (Sucre).\n` +
        `👕 *Indumentaria:* Ropa deportiva cómoda, zapatillas adecuadas y muchas ganas de bailar.\n\n` +
        `*(Para ensayar en otra filial, responde 4 para ver el directorio).*`;

      enviarMensajeHumanoGoWA(sender, resp2);
      return res.status(200).json({ status: 'OK' });
    }

    // 6. Opción 3: Tropas y Bloques
    if (cleanText === '3' || cleanText.includes('tropa') || cleanText.includes('bloque') || cleanText.includes('figura')) {
      const resp3 = 
        `⚔️ *TROPAS Y BLOQUES OFICIALES* 💃\n\n` +
        `Contamos con diversas agrupaciones para todos los niveles y estilos:\n\n` +
        `• ⚔️ *Tropa Machos:* Fuerza, sincronización y cascabeles imponentes.\n` +
        `• 💃 *Tropa Cholitas:* Gracia, cadencia y pollera al viento.\n` +
        `• 👑 *Figuras (Chinas y Machas):* Elegancia, donaire y liderazgo escénico.\n` +
        `• 🤸 *Kachas & Charcas:* Acrobacias, saltos y energía desbordante.\n\n` +
        `📸 Puedes ver la galería de fotos y trajes en alta definición aquí:\n` +
        `👉 https://sansimonsucre.nerosystem.solutions/#bloques`;

      enviarMensajeHumanoGoWA(sender, resp3);
      return res.status(200).json({ status: 'OK' });
    }

    // 7. Opción 4: Filiales
    if (cleanText === '4' || cleanText.includes('filial')) {
      const resp4 = 
        `🌎 *DIRECTORIO DE FILIALES SAN SIMÓN SUCRE* 🌍\n\n` +
        `La magia de Sucre está presente en 14 sedes oficiales:\n\n` +
        `🇧🇴 *Bolivia:* Sucre (Matriz), La Paz, Cochabamba, Santa Cruz, Oruro, Potosí, Tarija.\n` +
        `🌎 *América:* Buenos Aires, Santiago de Chile, São Paulo, Virginia (EE.UU.).\n` +
        `🇪🇺 *Europa:* Madrid, Barcelona, Bérgamo (Italia).\n\n` +
        `📲 Encuentra los contactos y redes de tu filial más cercana aquí:\n` +
        `👉 https://sansimonsucre.nerosystem.solutions/#filiales`;

      enviarMensajeHumanoGoWA(sender, resp4);
      return res.status(200).json({ status: 'OK' });
    }

    // 8. Opción 5: Contacto con Coordinador
    if (cleanText === '5' || cleanText.includes('coordinador') || cleanText.includes('directiva') || cleanText.includes('humano')) {
      const resp5 = 
        `👤 *ATENCIÓN PERSONALIZADA - DIRECTIVA SAN SIMÓN SUCRE* 🔴🔵\n\n` +
        `Un miembro del equipo de coordinación revisará este chat a la brevedad posible.\n\n` +
        `Por favor, déjanos tu consulta específica, nombre y número aquí abajo:\n` +
        `👇 *(Escribe tu mensaje a continuación y te responderemos pronto)*`;

      enviarMensajeHumanoGoWA(sender, resp5);
      return res.status(200).json({ status: 'OK' });
    }

    // 9. Fallback Inteligente (Para consultas libres o no clasificadas - Nunca dejar en visto)
    const fallbackResp = 
      `🔴🔵 *CAPORALES SAN SIMÓN SUCRE* 🔴🔵\n\n` +
      `¡Hola! Hemos recibido tu mensaje.\n\n` +
      `Un miembro de nuestra directiva o secretaría revisará tu consulta a la brevedad.\n\n` +
      `Si deseas consultar información inmediata de nuestro sistema, responde con el número de opción:\n\n` +
      `1️⃣ *Postulación Oruro 2027*\n` +
      `2️⃣ *Horarios de Ensayos*\n` +
      `3️⃣ *Tropas y Bloques*\n` +
      `4️⃣ *Filiales Oficiales*\n` +
      `5️⃣ *Contacto con Coordinador*\n` +
      `🔑 *Portal Fraterno / Credencial / PIN*\n\n` +
      `🌐 Portal Oficial: https://sansimonsucre.nerosystem.solutions`;

    enviarMensajeHumanoGoWA(sender, fallbackResp);
    return res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('[Webhook Error]:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint para ver la lista de postulantes en vivo (Dashboard liviano)
app.get('/postulantes', (req, res) => {
  try {
    const list = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    res.json({ total: list.length, postulantes: list });
  } catch {
    res.json({ total: 0, postulantes: [] });
  }
});

// Endpoint para registrar postulante desde el formulario web
app.post('/postulantes', (req, res) => {
  try {
    const data = req.body || {};
    if (!data.nombre || !data.telefono) {
      return res.status(400).json({ error: 'Nombre y teléfono son requeridos' });
    }
    const cleanPhone = (data.telefono || '').replace(/[^0-9]/g, '');
    const postulante = {
      codigo: data.codigo || `#ADM-2027-${Math.floor(1000 + Math.random() * 9000)}`,
      nombre: data.nombre.trim(),
      telefono: cleanPhone,
      email: (data.email || '').trim(),
      sede: data.sede || data.ciudad || 'Sucre',
      tropa: data.tropa || 'Por Asignar',
      experiencia: data.experiencia || 'No especificada',
      estado: data.estado || 'Pendiente',
      origen: data.origen || 'Formulario Web Oficial'
    };
    guardarPostulante(postulante);
    res.status(201).json({ status: 'OK', postulante });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para que secretaría actualice el estado de un postulante
app.patch('/postulantes/:codigo/estado', (req, res) => {
  try {
    const { codigo } = req.params;
    const { estado, notas } = req.body;
    if (!estado) {
      return res.status(400).json({ error: 'El estado es requerido' });
    }
    let list = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    const index = list.findIndex(p => p.codigo === codigo);
    if (index === -1) {
      return res.status(404).json({ error: 'Postulante no encontrado' });
    }
    list[index].estado = estado;
    if (notas !== undefined) list[index].notas = notas;
    list[index].fechaActualizacion = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
    res.json({ status: 'OK', postulante: list[index] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para eliminar postulante (pruebas/depuración)
app.delete('/postulantes/:codigo', (req, res) => {
  try {
    const { codigo } = req.params;
    let list = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    const initialLength = list.length;
    list = list.filter(p => p.codigo !== codigo);
    if (list.length === initialLength) {
      return res.status(404).json({ error: 'Postulante no encontrado' });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
    res.json({ status: 'OK', total: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Asistente San Simón Sucre GoWA corriendo en puerto ${PORT}`);
  console.log(`📌 Webhook URL para GoWA: http://tu-servidor:${PORT}/webhook`);
});
