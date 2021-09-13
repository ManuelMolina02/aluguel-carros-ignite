// Extensões
import crypto from 'crypto';
import { request } from 'express';
import multer from 'multer';
import { resolve } from 'path';

export default {
  // Fazer upload
  upload(folder: string) {
    return {
      // local de registro
      storage: multer.diskStorage({
        // destino
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          // gerar criptografia de 16 bytes randomicos usando strings hexagonais
          const fileHash = crypto.randomBytes(16).toString('hex');
          // concatenar id com nome original do arquivo
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
