/**
 * Galerinha,
 * aqui é onde configuramos toda nossa api REST,
 * basicamente é onde temos as configurações do express 
 * bem como da nossa rota get news.
 */

import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';

import api from './app/services/api';
import PostGenerator from './app/utils/PostGenerator';

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware(){
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
			'/files',
			express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
		);
  }

  routes(){
    this.server.get('/news', async (req, res) =>{
      const {data} = await api.get(null, {
        params: { Category: 'Business',  mkt: 'pt-BR'  },
      });
      
      const lastNews = data.value[0];

      const thumbnail= lastNews.image.thumbnail.contentUrl; 

      const originalImg = await thumbnail.substring(0, thumbnail.length - 9);

      const post = await PostGenerator(originalImg, lastNews.name, lastNews.provider[0].name);
     
      return res.json({post: `${process.env.APP_URL}/files/${post}`});
    });
  }

}

export default new App().server;