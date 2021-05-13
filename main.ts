namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const mode = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . 9 9 9 9 5 9 . . . . 
        . 9 9 9 9 9 9 9 5 5 9 9 . . . . 
        . . . . . . . 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    if (doublefiremode && doublefiremode.lifespan > 0) {
        projectile.y += -5
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 9 9 9 9 . . . . 
            . . . . . . 9 9 9 9 5 9 . . . . 
            . 9 9 9 9 9 9 9 5 5 9 9 . . . . 
            . . . . . . . 9 9 9 9 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 200, 0)
        projectile.y += 5
    }
})
function EnemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(25)) {
        PowerUp = sprites.create(img`
            . . . 8 8 8 8 8 8 8 . . . . . . 
            . 8 8 8 8 8 8 8 8 8 8 8 . . . . 
            8 8 8 8 8 8 8 8 8 8 8 8 8 . . . 
            8 8 8 7 7 7 7 7 7 7 8 8 8 . . . 
            8 8 8 7 7 7 7 7 7 7 8 8 8 8 . . 
            8 8 8 7 7 8 8 8 7 7 8 8 8 8 . . 
            8 8 8 7 7 8 8 8 7 7 8 8 8 8 . . 
            8 8 8 7 7 8 8 8 7 7 8 8 8 8 . . 
            8 8 8 7 7 7 7 7 7 7 8 8 8 8 . . 
            8 8 8 7 7 7 7 7 7 7 8 8 8 8 . . 
            8 8 8 7 7 8 8 8 8 8 8 8 8 8 . . 
            8 8 8 7 7 8 8 8 8 8 8 8 8 . . . 
            8 8 8 7 7 8 8 8 8 8 8 8 8 . . . 
            . 8 8 7 7 8 8 8 8 8 8 8 . . . . 
            . . . 8 8 8 8 8 8 8 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PowerUp)
        PowerUp.x = enemy.x
        PowerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    doublefiremode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 . . . 
        . . . . . . . 9 9 9 9 5 9 . . . 
        . . 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 . . . 
        . . . . . . . 9 9 9 9 5 9 . . . 
        . . 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.mode)
    doublefiremode.setPosition(48, 7)
    doublefiremode.lifespan = 10000
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    EnemyDeath(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    EnemyDeath(otherSprite)
})
let statusbar: StatusBarSprite = null
let EnemyShip: Sprite = null
let PowerUp: Sprite = null
let doublefiremode: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 6 4 4 4 
    . . . . . . . . . . 6 6 6 6 6 . 
    . . . . . . . . 6 6 6 6 6 . . . 
    . . . . . . . 6 6 6 6 6 6 . . . 
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . 8 8 8 8 8 8 8 8 8 a . . . . 
    6 6 6 6 6 6 6 6 6 6 a a a . . . 
    . 6 6 6 6 6 6 6 6 6 a a a . . . 
    . . 8 8 8 8 8 8 8 8 8 a . . . . 
    . . . . 6 6 6 6 6 6 6 6 6 6 . . 
    . . . . . . . . . . 6 6 6 6 6 . 
    . . . . . . . . . . . . . 4 4 4 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(5)
let enemy_speed = 20
let enemyspawntime = 2000
game.onUpdateInterval(5000, function () {
    enemy_speed += 5
    enemy_speed = Math.min(enemy_speed, 50)
    enemyspawntime += -200
    enemyspawntime = Math.max(enemyspawntime, 500)
})
forever(function () {
    EnemyShip = sprites.create(img`
        . . . . . . . . 2 2 . . . . . . 
        . . . . . . . . 3 2 . . . . . . 
        . . . . . . . . 3 2 4 . . . . . 
        . . . . . . . 3 3 2 . . . . . . 
        . . . . . . . 3 2 2 . . . . . . 
        . . . . . . 3 2 2 2 . . . . . . 
        . . . . . 3 3 2 2 2 . . . . . . 
        . . . 2 3 3 2 2 2 2 . . . . . . 
        . . 2 2 2 2 2 2 2 2 . . . . . . 
        . . . . . 3 2 2 2 2 . . . . . . 
        . . . . . 3 3 2 2 2 . . . . . . 
        . . . . . . . 3 3 2 4 . . . . . 
        . . . . . . . . 3 2 . . . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    EnemyShip.x = scene.screenWidth()
    EnemyShip.vx = 0 - enemy_speed
    EnemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.setColor(7, 2)
    statusbar.max = 100
    statusbar.attachToSprite(EnemyShip)
    pause(enemyspawntime)
})
