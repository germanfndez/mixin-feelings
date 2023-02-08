# **Mixing Feelings 🎧** - Co:here [Hackathon](https://discord.com/channels/741237973663612969/1065935439380365322)

Dime como te sientes, y te recomendare 3 playlist de **Spotify**!

![cover-mixin](https://user-images.githubusercontent.com/65827956/217028600-05d3bb38-a5a8-4240-b5d0-cc7e0b961290.png)

<br/>

## **Características de la app** ⚙️

1. Clasificar tu estado de animo en base a lo que ingreses al input. (Usando la API de **Co:here**).

2. Mostrarte 3 listas de reproducciones en base a la clasificación de tus sentimientos. (Usando la API de **Spotify**).

3. Reproducir una canción de alguna de las 3 listas de reproducción.

4. Guardar tu feedback en base de datos para entrenar a la IA de **Co:here**.

## **Tecnologías principales** 🧪

- Astro
- React JS
- Svelte
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
