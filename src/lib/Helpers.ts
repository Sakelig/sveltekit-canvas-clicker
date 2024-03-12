export function checkClickedOnEnemy(clickedPosition: ClickedPosition, enemyArrayToCheck: Array<EnemyItem>){

    enemyArrayToCheck.forEach(enemy => {
        const xPos = getEnemyXpositionRange(enemy)
        const yPos = getEnemyYpositionRange(enemy)
        const withinXcordinates:boolean = clickedPosition.xPos > xPos.get("min")! && clickedPosition.xPos < xPos.get("max")!
        const withinYcordinates:boolean = clickedPosition.yPos > yPos.get("min")! && clickedPosition.yPos < yPos.get("max")!

        console.log(withinXcordinates, withinYcordinates, Date.now())
        
        if( withinXcordinates && withinYcordinates ){
            console.log("clicked on peepo pog")
        } else {
            console.log("missed peepo")
        }

    })
    console.log("wow?", enemyArrayToCheck)
}

function getEnemyXpositionRange(enemy: EnemyItem): Map<string, number>{
    const xPosMap: Map<string, number> = new Map()
    xPosMap.set("min", enemy.position.x)
    xPosMap.set("max", enemy.position.x + enemy.enemy.width)
    return xPosMap
}

function getEnemyYpositionRange(enemy: EnemyItem): Map<string, number>{
    const yPosMap: Map<string, number> = new Map()
    yPosMap.set("min", enemy.position.y)
    yPosMap.set("max", enemy.position.y + enemy.enemy.height)
    return yPosMap
}