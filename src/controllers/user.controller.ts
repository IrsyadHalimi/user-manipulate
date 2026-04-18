// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { fetchAndTransformUsers } from '../services/user.service';

export const handleGetExternalUsers = async (req: Request, res: Response) => {
  try {
    const results = Number(req.query.results) || 10;
    const page = Number(req.query.page) || 1;

    // WAJIB pakai await
    const users = await fetchAndTransformUsers(results, page);

    return res.status(200).json(users);
  } catch (error: any) {
    console.error("DETAIL ERROR:", error.message); // Ini akan muncul di terminal node (backend)
    return res.status(500).json({ 
      message: 'Error fetching external API',
      detail: error.message 
    });
  }
  
};