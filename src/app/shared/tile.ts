import * as PIXI from "pixi.js";
import { default as data } from "./data";

export class Tile extends PIXI.Container {

    public id: number;
    private sprite: PIXI.Sprite;

    constructor( width: number, height: number ) {
        super();

        this.addSprite( width, height );
        this.swap();
    }

    public swap(): void {
        this.id = Math.floor( Math.random() * data.tiles.length );
        this.sprite.texture = PIXI.Texture.fromImage( data.tiles[this.id].file );
    }

    public addSprite( width: number, height: number ): void {
        this.sprite = new PIXI.Sprite();
        this.sprite.scale.set( 0.9, 0.9 );
        this.sprite.anchor.set( 0.5, 0.5 );
        this.sprite.position.set( width * 0.5, height * 0.5 );
        this.sprite.height = 105;
        this.sprite.width = 130; 
        this.addChild( this.sprite );
    }
}
