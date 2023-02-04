# **Mixing Feelings 🎧** - Co:here [Hackathon](https://discord.com/channels/741237973663612969/1065935439380365322)

Dime como te sientes, y te recomendare 3 playlist de **Spotify**!

![cover](https://imgs.search.brave.com/cOmY9J1uxhH7w4uV_rF00I3Si517rT8fzsXjks5tyME/rs:fit:1000:675:1/g:ce/aHR0cDovL21wbWNv/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOC8wMi9wbGFj/ZWhvbGRlci5qcGc)

<br/>

## **Características de la app** ⚙️

1. Clasificar tu estado de animo en base a lo que ingreses al input. (Usando la API de **Co:here**).

2. Mostrarte 3 listas de reproducciones en base a la clasificación de tus sentimientos. (Usando la API de **Spotify**).

3. Reproducir una canción de alguna de las 3 listas de reproducción.

4. Guardar tu feedback en base de datos para entrenar a la IA de **Co:here**.

## **Tecnologías principales** 🧪

- Astro
- React JS
- TypeScript
- Tailwind CSS
- Supabase

## **Instalación 🧰**

1. Clona el repositorio ( Necesitas tener instalado [Git](https://git-scm.com) ).

```shell
    git clone https://github.com/Germancitoz/mixin-feelings.git
```

2.  Instala las dependencias del proyecto con el siguiente comando:

```shell
    npm install
```

3. Antes de levantar el servidor de desarrollo necesitas lo siguiente:

   - Crear un archivo `.env` en la raíz del proyecto y agregar las siguientes variables

   ```
   PUBLIC_COHERE_API_KEY=
   PUBLIC_SPOTIFY_TOKEN=
   PUBLIC_SUPABASE_URL=
   PUBLIC_SUPABASE_ANON_KEY=
   PUBLIC_RAPIDAPI_KEY=
   PUBLIC_RAPIDAPI_HOST=
   ```

4. Levanta el servidor de desarrollo.

```shell
    npm run dev
```

&nbsp;

## **Demostración en vivo ⛓️**

[mixin-feelings.vercel.app](https://mixin-feelings.vercel.app/)

<br/>

## **Integrantes del proyecto** 👥

- [Germán Fernández](https://github.com/Germancitoz)
- [Felipe Ossandon](https://github.com/felipetodev)
- [Franko Martinez](https://github.com/Franklin361)
