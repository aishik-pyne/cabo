import cors from 'cors';
import express, { Request, Response, Express } from 'express';
import { PlayerStore } from '../models/player';
import { generateToken } from '../utils/jwt';

export function setupExpress(playerStore: PlayerStore): Express {
    const app = express();

    // Setup Cors
    app.use(cors());

    app.use(express.json())

    app.post('/login', (req: Request, res: Response) => {
        const player = req.body ? playerStore.createPlayer(req.body.name) : playerStore.createPlayer();
        const token: string = generateToken(player.id);
        res.json({
            player: player,
            token: token,
        })
    })
    return app;
}