import express, { Request, Response, Express, response } from 'express';
import * as request from "supertest";
import supertest from 'supertest';

import { setupExpress } from "../../src/lib/express";
import { Lobby } from "../../src/lobby";
import { PlayerStore } from "../../src/models/player";

describe('Testing Express Server', () => {
    let app: Express;
    const lobby: Lobby = new Lobby();
    const playerStore: PlayerStore = new PlayerStore();

    beforeEach(() => {
        app = setupExpress(playerStore);
    })

    test('Test Login', () => {
        return supertest(app)
            .post('/login')
            .then(response => {
                expect(response.body.player.id).toEqual(expect.any(String));
                expect(response.body.player.name).toEqual(expect.any(String));
                expect(response.body.player.image_url).toEqual(expect.any(String));
                expect(response.statusCode).toBe(200);
            })
    })
})