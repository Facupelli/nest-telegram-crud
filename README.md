# NEST.js Telegram API CRUD

Este proyecto es parte de un desafío desarrollado para la empresa Fidoo. Consiste en una API creada con Nest.js y Typescript que se conecta con la API de Telegram y almacena datos en una base de datos Firestore.

## Tech Stack

**Server:** Node, Nest, Typescript

## Cómo usar

1. Acceder al bot de telegram: **nest_telegram_crud_bot**, mediante el siguiente enlace https://t.me/nest_telegram_crud_bot/ (probar desde el celular si no abre el chat)

2. Enviar el siguiente commando: **/start**

3. El bot te responderá con el ID de tu chat, el cual necesitarás para interactuar con la API.

4. Una vez que obtengas el chat_id, puedes realizar las siguientes solicitudes a la API en la ruta **/messages** utilizando la URL de la API: https://nest-telegram-crud.adaptable.app

<br>

https://nest-telegram-crud.adaptable.app/messages

<br>

**Enviar un mensaje**. Realiza una solicitud **POST** a la api para enviar un mensaje, deben proporcionar el siguiente body:

<pre>
{
  chat_id: tu-chat-id,
  text: "el texto de tu mensaje"
}
</pre>

<br>

La API escucha los webhooks enviados por la API de Telegram, de modo que los mensajes que envíes al bot se almacenarán en la base de datos. Asimismo, los mensajes enviados por el bot también se guardarán en la base de datos.

<br>

**Ver los mensajes guardados en la db**. Realiza una solicitud **GET** a la api para obtener los mensajes de tu chat. Deben proporcionar el siguiente query param: chat_id="tu-chat-id"

<br>

**Borrar un mensaje**. Realiza una solicitud **DELETE** a la api para borrar un mensaje, deben proporcionar el siguiente body:

<pre>
{
  chat_id: tu-chat-id,
  message_id: "el ID del mensaje a eliminar"
}
</pre>

**Editar un mensaje**. Realiza una solicitud **PUT** a la api para editar un mensaje. Es importante destacar que solo se pueden editar los mensajes enviados por el Bot, y dentro de un periodo limitado de tiempo. Deben proporcionar el siguiente body:

<pre>
{
  chat_id: tu-chat-id,
  message_id: "el ID del mensaje a eliminar",
  text: "el nuevo texto del mensaje"
}
</pre>

### Lista de comandos:

- /start
- /info
