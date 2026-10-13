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
    const list = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    list.push({ ...data, fechaRegistro: new Date().toISOString() });
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
    console.log(`[DB] Postulante guardado con éxito: ${data.nombre} (${data.codigo})`);
  } catch (err) {
    console.error('[DB Error]', err);
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

// Endpoint Webhook para recibir mensajes de GoWA
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body || {};
    console.log('[GoWA Webhook Recibido]:', JSON.stringify(body, null, 2));

    // Desempaquetar payload según formato GoWA MultiDevice
    const payload = body.payload || body;
    const isFromMe = payload.is_from_me || body.is_from_me || false;

    // Ignorar mensajes enviados por el propio bot para no crear bucle
    if (isFromMe) {
      return res.status(200).json({ status: 'Ignored own message' });
    }

    const senderRaw = payload.from || payload.sender || payload.phone || body.from || '';
    const sender = senderRaw.replace(/@.*$/, '').replace(/[^0-9]/g, '');
    const text = (payload.body || payload.message || payload.text || body.message || body.body || '').trim();

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

app.listen(PORT, () => {
  console.log(`🚀 Asistente San Simón Sucre GoWA corriendo en puerto ${PORT}`);
  console.log(`📌 Webhook URL para GoWA: http://tu-servidor:${PORT}/webhook`);
});
