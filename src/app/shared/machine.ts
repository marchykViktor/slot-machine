import * as PIXI from "pixi.js";
import { Reel } from "./reel";

export class Machine extends PIXI.Container {

    private static readonly width: number = 950;
    private static readonly height: number = 350;
    private reels: Reel[];
    private currentReel: number;

    constructor() {
        super();
        
        const numberOfReels: number = 5;
        const slicedWidth: number = ( Machine.width / numberOfReels ) - 3;
        const borders: PIXI.Sprite = PIXI.Sprite.fromImage( "assets/img/borders.png" );
        borders.width = 998;
        borders.height = 538;
        borders.x = -100;
        borders.y = -150;           
        this.addChild(borders);
        this.reels = [];

        for (let i: number = 0; i < numberOfReels; i++) {
            const reel: Reel = new Reel( slicedWidth, Machine.height, i );
            reel.position.set( ( slicedWidth * i ) - 75, -100 );
            this.addChild( reel );
            this.reels.push( reel );
            reel.on( "spincomplete", this.onReelSpinComplete.bind( this ) );
        }
        
    }

    private onReelSpinComplete( event: Event ): void {
        this.currentReel++;
        if ( this.currentReel < this.reels.length ) {
            this.reels[this.currentReel].stop();
        } else {
            this.btnHandler( 'off' )
        }
    }

    public spinReels(): void {
        this.currentReel = 0;
        let timeout: number = 0;
        for ( const reel of this.reels ) {
            setTimeout( reel.spin.bind( reel ), timeout );
            timeout += 300;
        }
        setTimeout( this.stopReels.bind(this), 1500 );
        if ( this.currentReel === 0 ) this.btnHandler( 'on' );
    }

    public stopReels(): void {
        this.reels[0].stop();
    }

    public update( delta: number ): void {
        for ( const reel of this.reels ) {
            reel.update( delta );
        }
    }

    private btnHandler( toggle: string ): void {
        const btn = ( document.querySelector( '.js-spin__off' ) as HTMLElement );

        if( toggle === 'on' ) {
            btn.style.display = 'inline-block';
        } else {
            btn.style.display = 'none';
        }
    }
}