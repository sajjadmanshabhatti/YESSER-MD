// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUVsMVNyL3pzRlF3Q1RweVNpcFRkRDUvcFlZNUtsOUtTNGpDbDZocTJuVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGRrT0xINzB4RGRFd0VDTkF2dDJsc0YzUkRvMnVvOWZZMk9Sa2grSEpBYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTHZ2TjNKOTZOTkhUVG5jamJmTENOTkY4MUpRY2FrZXpsbTRTaFJXRVhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOSlNTcWdzT25IWVl4NHp2OTNtMmNIM2pkN3BGQzhOK1BCQzIwcHR2dmpJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1EUGkzOFp2R2dPdGt6eDJiTTVwTmt0aXZKaVBvRVQrM0ZTUW05Ynh6V0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktidEtrZExRMXFSVHQyb0Nkd1FKaHlCS1dIY1BacVJ5Q3BneWhpZ0RBaEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0YxLzlPVDFhRnp4bWlRQko4THZZeUdxbVdSdHdWSU5JWkFhUDZYLysyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekkyQVVOczZLK05wMm1KaDFSY1RHU0huQitlanJDUW5MdW9tMXh6ZldnRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFLbXR2YUYwTEsrS3RibWFvV1dlQnBtc04vc05mNWJmb05BK0R2NzdLM0crZUVKNlMwKzVPZHBOSTVRTXhDK1B0ZUl2b2dtZnQ4U0dSdUFyYk8rTWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzEsImFkdlNlY3JldEtleSI6IkFiaDZVdHVwdjl2bFJCdFJZWk5kSnk1TTdzT01wcXhjTlVKSENpc3lqVU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InJHRDNkY2dqVGNPalJ1ZlIyNHlXMWciLCJwaG9uZUlkIjoiY2VlY2VmMzctOTk4My00ZWQ1LWI5ZTItMGJjNzAyMDY4ZDM4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9rUFZ6UktJbWZpTzEyb1RHSzVWdEIrRFA2QT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaZktEKzFBVDFXK2x3a1JDQ0t2czgxOG00Vzg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUFhFN1ZMOTIiLCJtZSI6eyJpZCI6IjkyMzA3Mjk0NjEyNzoxNUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFMxemFVR0VOSEdsTGtHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibEo4SEFUQ2NZaXd2ZEZmRzQrNzQxYnJxOG13QkpOWmlsMFdvUlkyT0ExQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOXhRWXgrTUhSVlZRY2pKV0ltM080YlRIdDVOZXdVME5KNTQxd1AzbmpIWVRlS2w3VDUwd0tnWWlGTlFQU1BIZDJHQmE5Q0t4SEVLVmM1MlJDZnlkQnc9PSIsImRldmljZVNpZ25hdHVyZSI6ImIySVB3T3k3anMrcGRaSW80UUhqcGZJY1ozUC9uVnAyczJJYUVEWUV4K3hHT1A5aTdMeFF1RjVOTnZtaGhrZ0JRWFBPSjM5OTZwOXJVMmVYakxmMGlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMDcyOTQ2MTI3OjE1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpTZkJ3RXduR0lzTDNSWHh1UHUrTlc2NnZKc0FTVFdZcGRGcUVXTmpnTlEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzA0ODcxMzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUHE0In0=",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'false' : false,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "Sajjad Mansha",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "03072946127",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
