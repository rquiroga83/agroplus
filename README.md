# 🌾 AgroPlus

Bienvenido a **AgroPlus**, la aplicación super-app diseñada con React y Vite para revolucionar la toma de decisiones agrícolas. Nuestro objetivo es darle a los agricultores de pequeña y mediana escala análisis comparativos con Inteligencia Artificial, seguimiento satelital de predios y recomendaciones financieras y agronómicas de alta calidad.

## 🚀 Características Principales

### 1. 🗺️ Análisis Satelital e Interactivo
- **Buscador Dinámico**: Incorporación de `leaflet-geosearch` para volar instantáneamente a cualquier municipio o sección geográfica tecleando su nombre.
- **Herramientas de Dibujo (Geoman)**: A través de `@geoman-io/leaflet-geoman-free`, puedes dibujar exactamente los linderos de tu lote directamente sobre el mapa satelital.
- **Cálculo de Área Inteligente**: Integración del motor de geometría geolocalizada `@turf/turf` para calcular matemáticamente áreas de polígonos dibujados y auto-convertirlos a hectáreas en tiempo real.

### 2. 🤖 Asistente Histórico con IA (DeepSeek)
- **Chat Conversacional Inteligente**: A través de un bot embebido en el registro de predios, la IA realiza preguntas personalizadas al agricultor sobre el historial y rendimiento de sus tierras.
- **Verificación Asistida**: En lugar de simples cajas de texto, la información agronómica no fluye al sistema hasta que la IA da "luz verde" y confirma explícitamente haber recopilado suficiente contexto.
- **Backend Seguro (Serverless)**: Vercel Serverless Functions (`/api/chat`) actúan como un proxy que resguarda de forma encriptada las llaves de API y realiza validaciones de _Rate Limiting_.

### 3. 📈 Paneles y Tableros Estratégicos (Dashboard)
- Opciones de recomendación de cultivos con cronogramas fenológicos interactivos que cambian la visualización de datos según el producto (p. ej., Papa vs. Maíz).
- Rastreo inteligente del clima, los riesgos de plagas y proyecciones de mercado a través del tiempo.

### 4. 🔔 Sistema de Alertas
- Pantalla modular tipo timeline para seguir y marcar recordatorios cruciales de tareas operativas (siembra, control de fertilización y fumigado).

## 🛠️ Stack Tecnológico

- **Frontend**: React.js 18 + Vite
- **Mapas**: Leaflet + React Leaflet
- **Utilidades Geoespaciales**: Turf.js, Geoman, GeoSearch
- **Estilos CSS**: Vanilla CSS (Variables, Glassmorphism)
- **Despliegue y Backend**: Vercel + Vercel Serverless Functions (Node.js)
- **Inteligencia Artificial**: API de DeepSeek V3/R1.

## ⚙️ Configuración y Ejecución Local

Para correr AgroPlus localmente, sigue estos pasos:

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/agroplus.git
cd agroplus
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las Variables de Entorno**
Crea un archivo local `.env.local` en la matriz (raíz) del proyecto con las siguientes entradas (sustitúyelas con las correspondientes):
```env
DEEPSEEK_API_KEY=tu_api_key_secreta_aqui
RATE_LIMIT_PER_MINUTE=10
RATE_LIMIT_PER_DAY=50
```

4. **Arranca el Entorno Local (Importante)**
Dado que hacemos uso de **Vercel Serverless Functions** (`/api/**`) para esconder la API de la IA, el servidor _vanilla_ de Vite (`npm run dev`) no será capaz de procesar nuestro backend localmente. Para probar **ambos**, el frontend y el backend, DEBES usar el CLI de Vercel:

```bash
npx vercel dev
```

Esto correrá tu aplicación (normalmente puerto 3000), pero inyectará el middleware necesario para que `/api/chat` cobre vida.

## 📦 Despliegue en Producción

El proyecto está óptimamente configurado para desplegarse mediante Vercel con un solo comando:
```bash
npx vercel --prod
```
Recuerda configurar las mismas variables de entorno mencionadas en el paso 3 dentro de tu panel o *Settings* en Vercel.

---
`AgroPlus - Tomando el control de la tierra.`
