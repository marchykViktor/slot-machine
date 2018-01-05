import * as PIXI from "pixi.js";

import { Game } from "./core/game";

export class Main extends PIXI.Application {
    public view: HTMLCanvasElement;
    public stage: PIXI.Container;

    constructor(){
        super( 1020, 450, {transparent: true} )
        
        document.querySelector( '.canvas-wrap' ).appendChild( this.view );
        
        const game: Game = new Game( this.renderer );
        this.ticker.add( game.update.bind( game ) );
        this.stage.addChild( game );
        PIXI.loader.load();
    }
};

window.onload = () => {
    const main: Main = new Main();
};
