import * as PIXI from "pixi.js";

import { Machine } from "../shared/machine";

export class Game extends PIXI.Container {
    private machine: Machine;
    
    private renderer: PIXI.SystemRenderer;

    constructor( renderer: PIXI.SystemRenderer ) {
        super();

        this.renderer = renderer;
        this.preload();
        PIXI.loader.onComplete.add( () => this.onLoadGame() );
    }

    public update( delta: number ): void {
        if ( this.machine ) {
            this.machine.update( delta );
        }
    }
    
    protected preload(): void {
        PIXI.loader.add( "assets/img/item_1.png" );
        PIXI.loader.add( "assets/img/item_2.png" );
        PIXI.loader.add( "assets/img/item_3.png" );
        PIXI.loader.add( "assets/img/item_4.png" );
        PIXI.loader.add( "assets/img/item_5.png" );
        PIXI.loader.add( "assets/img/item_6.png" );
        PIXI.loader.add( "assets/img/item_7.png" );

        PIXI.loader.add( "assets/img/borders.png" );
    }

    protected create(): void {
        this.machine = new Machine();
        this.machine.position.set( 118, 150 );
        this.addChild( this.machine );

        document.querySelector( '.js-spin' ).addEventListener( 'click', this.machine.spinReels.bind( this.machine ) );
    }

    protected onLoadGame(): void {
        (document.querySelector( '.slot-control' ) as HTMLElement).style.display = 'block';
        (document.querySelector( '.preloader' ) as HTMLElement).style.display = 'none';
        this.create();
    }
}
